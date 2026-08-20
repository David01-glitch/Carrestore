#!/usr/bin/env node
/**
 * Build gate for business identity + environment.
 *
 * The website must never ship placeholder identity information. This script runs
 * before every production build and exits non-zero when it finds a value that is
 * unverified, obviously fabricated, or structurally invalid.
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const warnings = []

/* ------------------------------------------------------------------ *
 * Patterns that indicate fabricated or template-derived identity data.
 * ------------------------------------------------------------------ */
const PLACEHOLDER_PATTERNS = [
  { re: /\b555[-.\s]?\d{4}\b/, why: 'uses a reserved "555" fictional phone number' },
  { re: /\b(123|1234)\s+(main|elm|oak|park|first)\b/i, why: 'looks like a textbook example street address' },
  { re: /\b(lorem|ipsum|dolor sit amet)\b/i, why: 'contains Lorem Ipsum filler' },
  { re: /\b(your[-\s]?(company|business|domain|address|phone|name))\b/i, why: 'contains a "YOUR-…" template token' },
  { re: /\b(tbd|todo|fixme|xxx+|placeholder|change[-\s]?me|replace[-\s]?me|insert[-\s]?here|coming soon)\b/i, why: 'contains a placeholder token' },
  { re: /example\.(com|org|net)/i, why: 'references the reserved example.com domain' },
  { re: /\b(anytown|somewhere|某|n\/a)\b/i, why: 'contains a generic stand-in location' },
  { re: /^\s*$/, why: 'is empty or whitespace only' },
]

function checkPlaceholder(label, value) {
  if (typeof value !== 'string') return
  for (const { re, why } of PLACEHOLDER_PATTERNS) {
    if (re.test(value)) {
      errors.push(`identity.${label}: value ${why}. Remove it or replace it with a verified value.\n    got: ${JSON.stringify(value)}`)
      return
    }
  }
}

/* ------------------------------------------------------------------ *
 * 1. Identity file
 * ------------------------------------------------------------------ */
const identityPath = resolve(root, 'site.identity.json')
if (!existsSync(identityPath)) {
  errors.push('site.identity.json is missing. It is required — the site cannot assert an identity without it.')
} else {
  let identity
  try {
    identity = JSON.parse(readFileSync(identityPath, 'utf8'))
  } catch (e) {
    errors.push(`site.identity.json is not valid JSON: ${e.message}`)
  }

  if (identity) {
    if (!identity.displayName || typeof identity.displayName !== 'string') {
      errors.push('identity.displayName is required.')
    }
    checkPlaceholder('displayName', identity.displayName)

    // Email is the one contact channel this site genuinely has. It must be present.
    const email = identity.email
    if (!email || typeof email !== 'object') {
      errors.push('identity.email block is required.')
    } else {
      if (!email.value) errors.push('identity.email.value is required — the site must offer at least one real way to make contact.')
      else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.value)) errors.push(`identity.email.value is not a valid email address: ${email.value}`)
      if (email.value && email.verified !== true) errors.push('identity.email.verified must be true for the address to be published.')
      checkPlaceholder('email.value', email.value)
    }

    // Every optional identity field follows the same contract:
    // a value may only be published once it has been explicitly marked verified.
    for (const field of ['legalName', 'phone', 'address', 'businessHours', 'responseTime']) {
      const block = identity[field]
      if (!block || typeof block !== 'object') {
        errors.push(`identity.${field} block is missing. Keep the block with value:null rather than deleting it.`)
        continue
      }
      if (block.value === null || block.value === undefined) {
        warnings.push(`identity.${field} is not set — the website will omit it entirely. This is safe and expected until the value is verified.`)
        continue
      }
      if (typeof block.value !== 'string') {
        errors.push(`identity.${field}.value must be a string or null.`)
        continue
      }
      checkPlaceholder(`${field}.value`, block.value)
      if (block.verified !== true) {
        errors.push(
          `identity.${field} has a value but verified is not true.\n` +
          `    Refusing to publish unverified identity information.\n` +
          `    Either set "verified": true after confirming the value against a primary source, or set "value": null.`,
        )
      }
      if (block.verified === true && (!block.source || String(block.source).trim().length < 8)) {
        errors.push(`identity.${field}.source must record where the value was verified (registry, official listing, owner confirmation).`)
      }
    }

    if (Array.isArray(identity.social?.profiles)) {
      for (const [i, p] of identity.social.profiles.entries()) {
        if (!p?.url || !/^https:\/\//.test(p.url)) errors.push(`identity.social.profiles[${i}].url must be an absolute https URL.`)
        if (p?.verified !== true) errors.push(`identity.social.profiles[${i}] must be marked verified:true before it is published.`)
      }
    }

    if (identity.organizationType && identity.organizationType !== 'Organization') {
      const hasAddress = identity.address?.value && identity.address?.verified === true
      if (!hasAddress) {
        errors.push(
          `identity.organizationType is "${identity.organizationType}" but no verified address exists.\n` +
          `    Place-based schema.org types assert a physical business location. Keep "Organization" until an address is verified.`,
        )
      }
    }
  }
}

/* ------------------------------------------------------------------ *
 * 2. Environment
 * ------------------------------------------------------------------ */
const envFile = resolve(root, '.env')
const fileEnv = {}
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) fileEnv[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
const SITE_URL = process.env.SITE_URL || fileEnv.SITE_URL || ''
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production')

if (!SITE_URL) {
  const msg = 'SITE_URL is not set. Canonical URLs, Open Graph tags, the sitemap and robots.txt all derive from it.'
  if (isProduction) errors.push(msg)
  else warnings.push(`${msg} Falling back to http://localhost:4173 for this non-production build.`)
} else {
  try {
    const u = new URL(SITE_URL)
    if (isProduction && u.protocol !== 'https:') errors.push(`SITE_URL must use https in production. Got: ${SITE_URL}`)
    if (isProduction && /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(u.hostname)) {
      errors.push(`SITE_URL points at localhost (${SITE_URL}). A production build must use the real public domain, or canonicals and the sitemap will be wrong.`)
    }
    if (/example\.(com|org|net)$/i.test(u.hostname)) errors.push(`SITE_URL uses the reserved example domain: ${SITE_URL}`)
    if (u.pathname !== '/' ) errors.push(`SITE_URL must be a bare origin with no path. Got: ${SITE_URL}`)
    if (SITE_URL.endsWith('/')) warnings.push('SITE_URL has a trailing slash; it will be stripped automatically.')
  } catch {
    errors.push(`SITE_URL is not a valid absolute URL: ${SITE_URL}`)
  }
}

const GA4_ID = process.env.GA4_ID || fileEnv.GA4_ID || ''
if (GA4_ID && !/^G-[A-Z0-9]{6,}$/.test(GA4_ID)) {
  errors.push(`GA4_ID does not look like a GA4 measurement ID (expected G-XXXXXXXXXX). Got: ${GA4_ID}`)
}
if (!GA4_ID) {
  warnings.push('GA4_ID is not set — analytics stays switched off and no analytics cookies are used. The privacy and cookie policies describe this state accurately.')
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */
const bold = (s) => `\x1b[1m${s}\x1b[0m`
console.log(bold('\n  Identity & environment validation'))
for (const w of warnings) console.log(`  \x1b[33m•\x1b[0m ${w}`)
if (errors.length) {
  console.error(bold('\x1b[31m\n  BUILD BLOCKED — ' + errors.length + ' problem(s) must be fixed:\x1b[0m'))
  for (const e of errors) console.error(`  \x1b[31m✗\x1b[0m ${e}`)
  console.error('\n  Nothing about a business may be guessed. Fix site.identity.json / your environment and re-run.\n')
  process.exit(1)
}
console.log(`  \x1b[32m✓\x1b[0m identity and environment are publishable${warnings.length ? ` (${warnings.length} note(s) above)` : ''}\n`)
