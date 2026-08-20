#!/usr/bin/env node
/**
 * Discovery helper (development-time only, not part of the build).
 * Searches Wikimedia Commons and prints only files whose licence permits reuse.
 * Usage: node scripts/commons-search.mjs "1969 Dodge Charger" [limit]
 */
const UA = 'USCarRestoration-ImageAudit/1.0 (static site build; contact Uscarrestoration@gmail.com)'

const ALLOWED = [
  /^cc0/i, /^public domain/i, /^pd/i, /^cc[ -]by(-sa)?[ -]?[1-4]?/i,
  /^attribution/i, /^no restrictions/i,
]

export async function search(term, limit = 20) {
  const url = new URL('https://commons.wikimedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('format', 'json')
  url.searchParams.set('generator', 'search')
  url.searchParams.set('gsrsearch', `filetype:bitmap ${term}`)
  url.searchParams.set('gsrnamespace', '6')
  url.searchParams.set('gsrlimit', String(limit))
  url.searchParams.set('prop', 'imageinfo')
  url.searchParams.set('iiprop', 'url|size|extmetadata|mime')
  url.searchParams.set('iiextmetadatafilter', 'LicenseShortName|UsageTerms|Artist|Credit|LicenseUrl|ImageDescription|DateTimeOriginal|Attribution')

  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`Commons API ${res.status}`)
  const json = await res.json()
  const pages = json?.query?.pages ?? {}
  const out = []
  for (const p of Object.values(pages)) {
    const ii = p.imageinfo?.[0]
    if (!ii) continue
    const md = ii.extmetadata ?? {}
    const strip = (v) => (v?.value ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const licence = strip(md.LicenseShortName) || strip(md.UsageTerms)
    out.push({
      title: p.title,
      licence,
      free: ALLOWED.some((re) => re.test(licence)),
      author: strip(md.Artist).slice(0, 90),
      credit: strip(md.Credit).slice(0, 60),
      licenceUrl: strip(md.LicenseUrl),
      w: ii.width, h: ii.height, mime: ii.mime,
      desc: strip(md.ImageDescription).slice(0, 110),
    })
  }
  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const term = process.argv[2]
  const limit = Number(process.argv[3] || 20)
  const rows = await search(term, limit)
  const free = rows.filter((r) => r.free && r.w >= 1200 && /jpeg|png/.test(r.mime))
  console.log(`\n### "${term}" — ${free.length} reusable of ${rows.length}\n`)
  for (const r of free) {
    console.log(`${r.title}`)
    console.log(`   ${r.w}x${r.h} | ${r.licence} | ${r.author || 'n/a'}`)
    if (r.desc) console.log(`   "${r.desc}"`)
  }
}
