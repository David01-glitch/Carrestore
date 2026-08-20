#!/usr/bin/env node
/**
 * robots.txt. Deliberately permissive: Google AdsBot and Search must be able to reach
 * every landing page, and CSS/JS/images must not be blocked.
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fileEnv = {}
if (existsSync(resolve(root, '.env'))) {
  for (const line of readFileSync(resolve(root, '.env'), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) fileEnv[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
const SITE_URL = (process.env.SITE_URL || fileEnv.SITE_URL || 'http://localhost:4173').replace(/\/+$/, '')

const txt = `# robots.txt for ${SITE_URL}
#
# Everything is open to crawling. Nothing that matters for rendering — CSS, JavaScript,
# images, fonts — is blocked, and no landing page is disallowed.

User-agent: *
Allow: /

# Google AdsBot crawls landing pages to check destination quality. It must not be blocked.
User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

User-agent: AdsBot-Google-Mobile-Apps
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
writeFileSync(resolve(root, 'dist/robots.txt'), txt)
console.log(`  ✓ robots.txt — sitemap points at ${SITE_URL}/sitemap.xml`)
