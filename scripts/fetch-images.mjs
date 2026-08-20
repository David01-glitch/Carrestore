#!/usr/bin/env node
/**
 * Downloads every manifest image from Wikimedia Commons, re-verifying its licence
 * before anything touches the disk, then renders responsive JPEG + WebP derivatives.
 *
 * Nothing is hot-linked at runtime: the built site serves only these local files.
 * Run with `npm run fetch:images`. Re-running is cheap — existing files are skipped
 * unless --force is passed.
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { images, WIDTHS } from './image-manifest.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const IMG_ROOT = resolve(root, 'src/assets/images')
const FORCE = process.argv.includes('--force')
const UA = 'USCarRestoration/1.0 (static site build; contact Uscarrestoration@gmail.com)'

/** Licences that permit reuse on a commercial website, with attribution where required. */
const LICENCE_RULES = [
  { re: /^cc0/i,                       needsAttribution: false, family: 'CC0' },
  { re: /^public domain/i,             needsAttribution: false, family: 'Public domain' },
  { re: /^pd[- ]/i,                    needsAttribution: false, family: 'Public domain' },
  { re: /^no restrictions/i,           needsAttribution: false, family: 'No known restrictions' },
  { re: /^cc[ -]by[ -]sa/i,            needsAttribution: true,  family: 'CC BY-SA' },
  { re: /^cc[ -]by(?![ -]nc|[ -]nd)/i, needsAttribution: true,  family: 'CC BY' },
  { re: /^attribution/i,               needsAttribution: true,  family: 'Attribution' },
]
/** Explicitly rejected: non-commercial and no-derivatives terms are incompatible with this site. */
const FORBIDDEN = /nc|non[- ]commercial|nd\b|no[- ]deriv|fair use|copyright|all rights reserved/i

const strip = (v) => (v?.value ?? '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
const exists = (p) => access(p).then(() => true, () => false)

async function commonsInfo(fileName) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('format', 'json')
  url.searchParams.set('titles', `File:${fileName}`)
  url.searchParams.set('prop', 'imageinfo')
  url.searchParams.set('iiprop', 'url|size|mime|extmetadata')
  url.searchParams.set('iiurlwidth', String(Math.max(...WIDTHS)))
  url.searchParams.set('iiextmetadatafilter', 'LicenseShortName|UsageTerms|LicenseUrl|Artist|Credit|ImageDescription|DateTimeOriginal|Permission')

  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`Commons API returned ${res.status}`)
  const page = Object.values((await res.json())?.query?.pages ?? {})[0]
  if (!page || page.missing !== undefined) throw new Error('file does not exist on Commons')
  const ii = page.imageinfo?.[0]
  if (!ii) throw new Error('no imageinfo returned')

  const md = ii.extmetadata ?? {}
  const licence = strip(md.LicenseShortName) || strip(md.UsageTerms)
  if (!licence) throw new Error('no licence metadata — refusing to use')
  if (FORBIDDEN.test(licence) && !/^cc[ -]by([ -]sa)?[ -]?[0-9.]*$/i.test(licence)) {
    throw new Error(`licence "${licence}" is not usable on this site`)
  }
  const rule = LICENCE_RULES.find((r) => r.re.test(licence))
  if (!rule) throw new Error(`licence "${licence}" is not on the allow-list — refusing to use`)

  return {
    licence,
    licenceFamily: rule.family,
    needsAttribution: rule.needsAttribution,
    licenceUrl: strip(md.LicenseUrl),
    author: strip(md.Artist) || 'Unknown',
    credit: strip(md.Credit),
    description: strip(md.ImageDescription),
    date: strip(md.DateTimeOriginal),
    descriptionUrl: ii.descriptionurl,
    thumbUrl: ii.thumburl,
    originalUrl: ii.url,
    width: ii.width,
    height: ii.height,
    mime: ii.mime,
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function download(url, attempt = 0) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  // Commons rate-limits bursts. Back off politely rather than giving up on the image.
  if ((res.status === 429 || res.status >= 500) && attempt < 5) {
    const wait = Number(res.headers.get('retry-after')) * 1000 || 1500 * 2 ** attempt
    await sleep(Math.min(wait, 20000))
    return download(url, attempt + 1)
  }
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length === 0) throw new Error('downloaded zero bytes')
  // Guard against an error page being written to disk as if it were a photograph.
  const head = buf.subarray(0, 200).toString('latin1').toLowerCase()
  if (head.includes('<!doctype html') || head.includes('<html')) throw new Error('server returned an HTML document, not an image')
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8
  const isPng = buf[0] === 0x89 && buf[1] === 0x50
  if (!isJpeg && !isPng) throw new Error('downloaded bytes are not a JPEG or PNG')
  return buf
}

const results = []
const failures = []
let done = 0

/** Small worker pool — Commons is happy with this rate and it keeps the build brisk. */
async function pool(items, limit, worker) {
  const queue = [...items.entries()]
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    for (;;) {
      const next = queue.shift()
      if (!next) return
      await worker(next[1])
    }
  })
  await Promise.all(runners)
}

await pool(images, 4, async (entry) => {
  const outDir = resolve(IMG_ROOT, entry.folder)
  await mkdir(outDir, { recursive: true })
  const marker = resolve(outDir, `${entry.slug}-${WIDTHS[WIDTHS.length - 1]}.jpg`)

  try {
    const info = await commonsInfo(entry.file)

    if (!FORCE && (await exists(marker))) {
      const meta = await sharp(marker).metadata()
      results.push(buildRecord(entry, info, meta))
      process.stdout.write(`\r  cached ${++done}/${images.length}`)
      return
    }

    const buf = await download(info.thumbUrl || info.originalUrl)
    const base = sharp(buf, { failOn: 'error' }).rotate()
    const meta = await base.metadata()
    if (!meta.width || meta.width < 900) throw new Error(`source too small (${meta.width}px)`)

    let widest = null
    for (const w of WIDTHS) {
      if (w > meta.width) continue
      const pipe = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true })
      await pipe.clone().jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(resolve(outDir, `${entry.slug}-${w}.jpg`))
      await pipe.clone().webp({ quality: 78 })
        .toFile(resolve(outDir, `${entry.slug}-${w}.webp`))
      widest = w
    }
    if (widest !== WIDTHS[WIDTHS.length - 1]) {
      // Always guarantee the canonical widest derivative exists so imports never dangle.
      const pipe = sharp(buf).rotate().resize({ width: WIDTHS[WIDTHS.length - 1], withoutEnlargement: false })
      await pipe.clone().jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(marker)
      await pipe.clone().webp({ quality: 78 }).toFile(resolve(outDir, `${entry.slug}-${WIDTHS[WIDTHS.length - 1]}.webp`))
    }

    const finalMeta = await sharp(marker).metadata()
    results.push(buildRecord(entry, info, finalMeta))
    process.stdout.write(`\r  fetched ${++done}/${images.length}`)
  } catch (err) {
    failures.push({ slug: entry.slug, file: entry.file, reason: err.message })
    process.stdout.write(`\r  FAILED  ${++done}/${images.length}`)
  }
})
process.stdout.write('\n')

function buildRecord(entry, info, meta) {
  return {
    slug: entry.slug,
    folder: entry.folder,
    alt: entry.alt,
    width: meta.width,
    height: meta.height,
    aspect: Number((meta.width / meta.height).toFixed(4)),
    widths: WIDTHS.filter((w) => w <= Math.max(meta.width, WIDTHS[WIDTHS.length - 1])),
    source: {
      platform: 'Wikimedia Commons',
      file: entry.file,
      pageUrl: info.descriptionUrl,
      author: info.author,
      credit: info.credit,
      date: info.date,
      licence: info.licence,
      licenceFamily: info.licenceFamily,
      licenceUrl: info.licenceUrl,
      attributionRequired: info.needsAttribution,
    },
  }
}

results.sort((a, b) => (a.folder + a.slug).localeCompare(b.folder + b.slug))
await writeFile(resolve(IMG_ROOT, 'attribution.json'), JSON.stringify(results, null, 2) + '\n')

/* ---------------- IMAGE-LICENSES.md ---------------- */
const byFolder = new Map()
for (const r of results) {
  if (!byFolder.has(r.folder)) byFolder.set(r.folder, [])
  byFolder.get(r.folder).push(r)
}
const attributionCount = results.filter((r) => r.source.attributionRequired).length
let md = `# Image licences and attribution

Every photograph on this website is stored locally in \`src/assets/images/\`. Nothing is
hot-linked from an external image host at runtime.

All source files come from **Wikimedia Commons** and were each re-checked against the
licence allow-list in \`scripts/fetch-images.mjs\` at download time. Licences that forbid
commercial use or derivative works are rejected by that script and can never enter the build.

- Total images: **${results.length}**
- Requiring visible attribution (CC BY / CC BY-SA): **${attributionCount}**
- Public domain / CC0 / no known restrictions: **${results.length - attributionCount}**

Images that require attribution display their credit in the caption or credit line beside
the image on the website, and are listed again here. Public-domain images are credited here
for provenance even though attribution is not legally required.

Derivatives (resizing to ${WIDTHS.join(', ')} px wide and conversion to WebP) are permitted by
every licence used here. CC BY-SA derivatives remain under the same licence as their source.

> If you are a rights holder and believe an image is credited incorrectly, email
> Uscarrestoration@gmail.com and it will be corrected or removed.

`
for (const [folder, rows] of [...byFolder.entries()].sort()) {
  md += `\n## \`${folder}/\`\n\n`
  md += `| File | Source file on Commons | Creator | Licence | Attribution required |\n`
  md += `| --- | --- | --- | --- | --- |\n`
  for (const r of rows) {
    const files = `${r.slug}-{${WIDTHS.join(',')}}.{jpg,webp}`
    const author = (r.source.author || 'Unknown').replace(/\|/g, '\\|').slice(0, 70)
    const link = r.source.pageUrl ? `[${r.source.file.replace(/\|/g, '\\|')}](${r.source.pageUrl})` : r.source.file
    const lic = r.source.licenceUrl ? `[${r.source.licence}](${r.source.licenceUrl})` : r.source.licence
    md += `| \`${files}\` | ${link} | ${author} | ${lic} | ${r.source.attributionRequired ? 'Yes' : 'No'} |\n`
  }
}
md += `\n---\n\nGenerated by \`npm run fetch:images\`. Do not edit by hand — edit \`scripts/image-manifest.mjs\` and re-run.\n`
await writeFile(resolve(root, 'IMAGE-LICENSES.md'), md)

console.log(`\n  ${results.length} image(s) ready, ${attributionCount} require visible attribution.`)
if (failures.length) {
  console.error(`\n  ${failures.length} FAILED:`)
  for (const f of failures) console.error(`   ✗ ${f.slug} — ${f.file}\n       ${f.reason}`)
  process.exitCode = 1
}
