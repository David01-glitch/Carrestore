#!/usr/bin/env node
/**
 * Crawls the built HTML and fails on broken internal links, placeholder hrefs,
 * localhost/staging leakage and missing accessible link text.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
if (!existsSync(dist)) { console.error('  ✗ dist/ not found. Run the build first.'); process.exit(1) }

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
const routes = new Set(pages.map((p) => p.route))
const errors = []
const warnings = []
let linkCount = 0

for (const { route, file } of pages) {
  const html = readFileSync(file, 'utf8')
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]

  for (const [, attrs, inner] of anchors) {
    const hrefMatch = attrs.match(/href="([^"]*)"/i)
    if (!hrefMatch) { errors.push(`${route}: <a> element with no href.`); continue }
    const href = hrefMatch[1].trim()
    linkCount++

    // A link's accessible name can come from its text, an aria-label, or the alt text
    // of an image it contains. Image-only links are fine provided the alt describes them.
    const text = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const aria = attrs.match(/aria-label="([^"]*)"/i)?.[1]?.trim()
    const imgAlt = [...inner.matchAll(/<img\b[^>]*\balt="([^"]*)"/gi)].map((m) => m[1].trim()).filter(Boolean)
    const accessibleName = text || aria || imgAlt[0] || ''
    if (!accessibleName) errors.push(`${route}: link to "${href}" has no accessible text, aria-label or image alt.`)
    else if (/^(click here|here|read more|link|more)$/i.test(text) && !aria) {
      warnings.push(`${route}: link text "${text}" is not descriptive out of context.`)
    }

    if (href === '#' || href === '') { errors.push(`${route}: placeholder link href="${href}".`); continue }
    if (/^(javascript:|data:)/i.test(href)) { errors.push(`${route}: unsafe href "${href}".`); continue }
    if (/localhost|127\.0\.0\.1|:3000|:5173|:4173|\.local\b|staging\.|\.vercel\.app|\.netlify\.app/i.test(href)) {
      errors.push(`${route}: link points at a local or staging host — "${href}".`)
      continue
    }
    if (/^(mailto:|tel:)/i.test(href) || href.startsWith('#')) continue

    if (/^https?:\/\//i.test(href)) {
      // External links must open safely.
      if (/target="_blank"/i.test(attrs) && !/rel="[^"]*noopener/i.test(attrs)) {
        errors.push(`${route}: external link "${href}" opens in a new tab without rel="noopener".`)
      }
      continue
    }

    // Internal link — must resolve to a prerendered page or a real asset.
    const clean = href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/'
    if (routes.has(clean)) continue
    if (existsSync(resolve(dist, clean.slice(1)))) continue
    errors.push(`${route}: internal link to "${href}" does not resolve to a built page.`)
  }
}

// Required files
for (const f of ['sitemap.xml', 'robots.txt', 'manifest.json', '404/index.html']) {
  if (!existsSync(resolve(dist, f))) errors.push(`Missing required file: dist/${f}`)
}

// Sitemap sanity
const smPath = resolve(dist, 'sitemap.xml')
if (existsSync(smPath)) {
  const sm = readFileSync(smPath, 'utf8')
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  if (!locs.length) errors.push('sitemap.xml contains no URLs.')
  for (const loc of locs) {
    if (/[?&]/.test(loc)) errors.push(`sitemap.xml contains a query string: ${loc}`)
    if (/\/404\b/.test(loc)) errors.push('sitemap.xml lists the 404 page.')
    try {
      const path = new URL(loc).pathname.replace(/\/$/, '') || '/'
      if (!routes.has(path)) errors.push(`sitemap.xml lists ${loc}, which was not built.`)
    } catch { errors.push(`sitemap.xml contains an invalid URL: ${loc}`) }
  }
  if (locs.length && new Set(locs).size !== locs.length) errors.push('sitemap.xml contains duplicate URLs.')
}

console.log(`\n  Link validation — ${pages.length} pages, ${linkCount} links`)
for (const w of warnings.slice(0, 8)) console.log(`  \x1b[33m•\x1b[0m ${w}`)
if (warnings.length > 8) console.log(`  \x1b[33m•\x1b[0m …and ${warnings.length - 8} more notes`)
if (errors.length) {
  console.error(`\n  \x1b[31mFAILED — ${errors.length} problem(s):\x1b[0m`)
  for (const e of [...new Set(errors)].slice(0, 40)) console.error(`  \x1b[31m✗\x1b[0m ${e}`)
  process.exit(1)
}
console.log('  \x1b[32m✓\x1b[0m all internal links resolve; no placeholder or staging links\n')
