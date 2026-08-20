#!/usr/bin/env node
/** Generates dist/sitemap.xml from the canonical route list. No 404s, no query strings. */
import { writeFileSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const fileEnv = {}
if (existsSync(resolve(root, '.env'))) {
  for (const line of readFileSync(resolve(root, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) fileEnv[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
const SITE_URL = (process.env.SITE_URL || fileEnv.SITE_URL || 'http://localhost:4173').replace(/\/+$/, '')

/** Priority and change frequency by section — a hint, not a guarantee. */
const rank = (route) => {
  if (route === '/') return { p: '1.0', c: 'weekly' }
  if (/^\/(restoration-guides|classic-cars|blog|muscle-cars|car-care|automotive-history)$/.test(route)) return { p: '0.9', c: 'weekly' }
  if (/^\/(blog|classic-cars|restoration-guides)\//.test(route)) return { p: '0.8', c: 'monthly' }
  if (/^\/(about|community|contact)$/.test(route)) return { p: '0.6', c: 'monthly' }
  return { p: '0.3', c: 'yearly' }
}

// Discover every prerendered page rather than trusting a hand-maintained list.
import { readdirSync } from 'node:fs'
function walk(dir, base = '') {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name.startsWith('.')) continue
      out.push(...walk(resolve(dir, entry.name), `${base}/${entry.name}`))
    } else if (entry.name === 'index.html') {
      out.push(base === '' ? '/' : base)
    }
  }
  return out
}

if (!existsSync(dist)) {
  console.error('  ✗ dist/ does not exist. Run the build first.')
  process.exit(1)
}

const EXCLUDE = new Set(['/404'])
const routes = walk(dist)
  .filter((r) => !EXCLUDE.has(r))
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

const lastmod = (route) => {
  const f = resolve(dist, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`)
  return statSync(f).mtime.toISOString().slice(0, 10)
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const { p, c } = rank(r)
    return `  <url>
    <loc>${SITE_URL}${r === '/' ? '/' : r}</loc>
    <lastmod>${lastmod(r)}</lastmod>
    <changefreq>${c}</changefreq>
    <priority>${p}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), xml)
console.log(`  ✓ sitemap.xml — ${routes.length} URLs at ${SITE_URL}`)
if (SITE_URL.includes('localhost')) console.log('    note: SITE_URL is localhost. Set the real domain before deploying.')
