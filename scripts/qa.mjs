#!/usr/bin/env node
/**
 * End-to-end QA against the built output.
 *
 * Checks each prerendered page for the things a search crawler, an AdsBot fetch, an
 * accessibility tool and a human reviewer would each look for — and fails loudly rather
 * than reporting a green tick it has not earned.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
if (!existsSync(dist)) { console.error('  ✗ dist/ not found. Run "npm run build" first.'); process.exit(1) }

const fail = []
const warn = []
const note = (arr, route, msg) => arr.push(`${route}: ${msg}`)

function walk(dir, base = '') {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name === 'assets' || e.name.startsWith('.')) continue
      out.push(...walk(resolve(dir, e.name), `${base}/${e.name}`))
    } else if (e.name === 'index.html') out.push({ route: base || '/', file: resolve(dir, e.name) })
  }
  return out
}

const pages = walk(dist)
const stripScripts = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')

/** Visible text only — attribute values (Tailwind classes included) must not be scanned as copy. */
const visibleText = (h) => stripScripts(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1]

/** Finds a <meta>/<link> tag by one of its attributes, regardless of attribute order. */
function findTag(html, tagName, keyAttr, keyValue) {
  for (const [tag] of html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))) {
    if ((attr(tag, keyAttr) || '').toLowerCase() === keyValue.toLowerCase()) return tag
  }
  return null
}
const visibleWords = (h) => stripScripts(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length

const MIN_WORDS = { '/': 500, default: 300 }
const seenTitles = new Map()
const seenDescriptions = new Map()

for (const { route, file } of pages) {
  const html = readFileSync(file, 'utf8')

  /* ---- Rendering: meaningful content must exist before JavaScript runs ---- */
  const words = visibleWords(html)
  const min = MIN_WORDS[route] ?? MIN_WORDS.default
  if (words < min) note(fail, route, `only ${words} words of prerendered text (expected at least ${min}). Content may be JavaScript-only.`)
  if (/<div id="root">\s*<\/div>/.test(html)) note(fail, route, 'the app container is empty in the served HTML — this page is not prerendered.')

  /* ---- Headings ---- */
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  if (h1s.length === 0) note(fail, route, 'no <h1>.')
  if (h1s.length > 1) note(fail, route, `${h1s.length} <h1> elements — there must be exactly one.`)
  if (h1s[0] && !h1s[0][1].replace(/<[^>]+>/g, '').trim()) note(fail, route, '<h1> is empty.')
  if (!/<h2\b/i.test(html)) note(warn, route, 'no <h2> — page may lack section structure.')

  /* ---- Title & description ---- */
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()
  if (!title) note(fail, route, 'no <title>.')
  else {
    if (title.length < 15) note(warn, route, `title is very short (${title.length} chars).`)
    if (title.length > 70) note(warn, route, `title is ${title.length} chars and will be truncated in results.`)
    if (seenTitles.has(title)) note(fail, route, `duplicate <title>, also used by ${seenTitles.get(title)}.`)
    else seenTitles.set(title, route)
  }

  const desc = attr(findTag(html, 'meta', 'name', 'description') ?? '', 'content')?.trim()
  if (!desc) note(fail, route, 'no meta description.')
  else {
    if (desc.length < 60) note(warn, route, `meta description is short (${desc.length} chars).`)
    if (desc.length > 175) note(warn, route, `meta description is ${desc.length} chars and will be truncated.`)
    if (seenDescriptions.has(desc)) note(fail, route, `duplicate meta description, also used by ${seenDescriptions.get(desc)}.`)
    else seenDescriptions.set(desc, route)
  }

  /* ---- Canonical & social ---- */
  const canonical = attr(findTag(html, 'link', 'rel', 'canonical') ?? '', 'href')
  if (!canonical) note(fail, route, 'no canonical URL.')
  else {
    try {
      const u = new URL(canonical)
      const expected = route === '/' ? '/' : route
      if (u.pathname.replace(/\/$/, '') !== expected.replace(/\/$/, '')) {
        note(fail, route, `canonical points at ${u.pathname} but this page is ${expected}.`)
      }
    } catch { note(fail, route, `canonical is not an absolute URL: ${canonical}`) }
  }

  for (const [prop, label] of [['og:title', 'Open Graph title'], ['og:description', 'Open Graph description'], ['og:url', 'Open Graph URL'], ['og:type', 'Open Graph type']]) {
    if (!findTag(html, 'meta', 'property', prop)) note(fail, route, `missing ${label}.`)
  }
  if (!findTag(html, 'meta', 'name', 'twitter:card')) note(fail, route, 'missing Twitter card.')
  if (route !== '/404' && !findTag(html, 'meta', 'property', 'og:image')) note(warn, route, 'no Open Graph image.')

  /* ---- Robots ---- */
  const robots = attr(findTag(html, 'meta', 'name', 'robots') ?? '', 'content') ?? ''
  if (route === '/404') {
    if (!/noindex/.test(robots)) note(fail, route, 'the 404 page should be noindex.')
  } else if (/noindex/.test(robots)) {
    note(fail, route, 'page is marked noindex but appears in the sitemap set.')
  }

  /* ---- Images ---- */
  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=/.test(tag)) note(fail, route, `an <img> has no alt attribute: ${tag.slice(0, 90)}`)
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) note(warn, route, 'an <img> is missing width/height (layout shift risk).')
    const src = tag.match(/\bsrc="([^"]*)"/)?.[1] ?? ''
    if (/^https?:\/\//i.test(src)) note(fail, route, `image is hot-linked from an external host: ${src}`)
    const alt = tag.match(/\balt="([^"]*)"/)?.[1] ?? ''
    if (alt && /^(car|image|photo|picture|mustang|classic car)$/i.test(alt.trim())) {
      note(fail, route, `image alt text is a bare keyword: "${alt}"`)
    }
  }

  /* ---- Accessibility basics ---- */
  if (!/<html[^>]+\blang=/i.test(html)) note(fail, route, '<html> has no lang attribute.')
  if (!/Skip to main content/i.test(html)) note(fail, route, 'no skip link.')
  if (!/<main\b/i.test(html)) note(fail, route, 'no <main> landmark.')
  if (!/id="main"/.test(html)) note(fail, route, 'skip link target #main is missing.')
  if ((html.match(/<main\b/gi) ?? []).length > 1) note(fail, route, 'more than one <main> landmark.')

  /* ---- Structured data ---- */
  const ld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
  if (!ld.length) note(warn, route, 'no JSON-LD structured data.')
  for (const [, body] of ld) {
    try {
      const parsed = JSON.parse(body)
      const flat = JSON.stringify(parsed)
      for (const banned of ['aggregateRating', 'ratingValue', 'reviewCount', 'award', 'Review']) {
        if (flat.includes(`"${banned}"`)) note(fail, route, `structured data contains "${banned}", which this site cannot substantiate.`)
      }
    } catch (e) { note(fail, route, `invalid JSON-LD: ${e.message}`) }
  }

  /* ---- Destination experience & honesty ---- */
  if (/<dialog[^>]*\bopen\b/i.test(html)) note(fail, route, 'a modal dialog is open on load.')
  if (/window\.open\s*\(/.test(html)) note(fail, route, 'page contains window.open, which can produce pop-ups.')
  if (/\bautoplay\b/i.test(html)) note(fail, route, 'autoplaying media detected.')
  if (/download=/.test(html)) note(warn, route, 'a download attribute is present — confirm it is not a forced download.')
  const copy = visibleText(html)
  if (/lorem ipsum/i.test(copy)) note(fail, route, 'Lorem Ipsum placeholder text found.')
  if (/\b(TODO|FIXME|YOUR-DOMAIN|coming soon)\b/i.test(copy)) note(fail, route, 'placeholder text found in visible content.')
  if (/\b555[-.\s]?\d{4}\b/.test(copy)) note(fail, route, 'a reserved 555 telephone number appears in the page.')
  if (/(#1\s|america's number one|best in america|guaranteed results|award[- ]winning|trusted by millions|world's leading)/i.test(copy)) {
    note(fail, route, 'unsupported superlative or guarantee claim found in visible copy.')
  }
  // Claims of scale must not appear unless they can be evidenced.
  if (/\b\d{1,3},\d{3}\+?\s+(readers|subscribers|customers|members|restorations)\b/i.test(copy)) {
    note(fail, route, 'an unverified audience or volume figure appears in visible copy.')
  }
}

/* ---- Site-level files ---- */
for (const f of ['robots.txt', 'sitemap.xml', 'manifest.json']) {
  if (!existsSync(resolve(dist, f))) fail.push(`dist/${f} is missing.`)
}
const robotsTxt = existsSync(resolve(dist, 'robots.txt')) ? readFileSync(resolve(dist, 'robots.txt'), 'utf8') : ''
if (robotsTxt) {
  if (!/Sitemap:\s*https?:\/\//i.test(robotsTxt)) fail.push('robots.txt has no absolute Sitemap line.')
  if (/^\s*Disallow:\s*\/\s*$/m.test(robotsTxt)) fail.push('robots.txt disallows the entire site.')
  if (/Disallow:\s*\/(assets|static)/i.test(robotsTxt)) fail.push('robots.txt blocks assets needed for rendering.')
  if (!/AdsBot-Google/i.test(robotsTxt)) fail.push('robots.txt does not explicitly allow AdsBot-Google.')
}

/* ---- Report ---- */
const bold = (s) => `\x1b[1m${s}\x1b[0m`
console.log(bold(`\n  QA — ${pages.length} prerendered pages checked`))
console.log(`  unique titles: ${seenTitles.size}/${pages.length}   unique descriptions: ${seenDescriptions.size}/${pages.length}`)
if (warn.length) {
  console.log(`\n  ${warn.length} note(s):`)
  for (const w of warn.slice(0, 15)) console.log(`  \x1b[33m•\x1b[0m ${w}`)
  if (warn.length > 15) console.log(`  \x1b[33m•\x1b[0m …and ${warn.length - 15} more`)
}
if (fail.length) {
  console.error(bold(`\n\x1b[31m  QA FAILED — ${fail.length} problem(s):\x1b[0m`))
  for (const f of fail.slice(0, 40)) console.error(`  \x1b[31m✗\x1b[0m ${f}`)
  if (fail.length > 40) console.error(`  \x1b[31m✗\x1b[0m …and ${fail.length - 40} more`)
  process.exit(1)
}
console.log('\n  \x1b[32m✓\x1b[0m every page is crawlable, unique, accessible and free of misleading markup\n')
