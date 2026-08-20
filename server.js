#!/usr/bin/env node
/**
 * Production static server.
 *
 * Serves the prerendered site from dist/. Every route is a real HTML file, so pages
 * are returned with full content on first byte — no client-side routing fallback is
 * used for known routes, and unknown paths return a genuine 404 status.
 */
import express from 'express'
import compression from 'compression'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, normalize } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, 'dist')
const PORT = Number(process.env.PORT) || 4173
const HOST = process.env.HOST || '0.0.0.0'

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run "npm run build" first.')
  process.exit(1)
}

const app = express()
app.disable('x-powered-by')
app.set('etag', 'strong')

app.use(compression({ threshold: 1024 }))

/** Security headers. No CSP report-only theatre — these are the real values used. */
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      // Google Analytics is loaded only after consent; allowed here so it can run when enabled.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  )
  if (process.env.ENABLE_HSTS === 'true') {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }
  next()
})

/* Fingerprinted assets are immutable; HTML must always be revalidated. */
app.use(
  '/assets',
  express.static(join(DIST, 'assets'), {
    immutable: true,
    maxAge: '1y',
    fallthrough: true,
    index: false,
    redirect: false,
  }),
)

app.use(
  express.static(DIST, {
    index: false,
    extensions: false,
    // Never 301 to a trailing slash — the catch-all below resolves clean URLs to a
    // 200 directly, so crawlers (AdsBot included) get content on the first request.
    redirect: false,
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache, must-revalidate')
      else if (/\.(xml|txt|webmanifest|json)$/.test(filePath)) res.setHeader('Cache-Control', 'public, max-age=3600')
      else res.setHeader('Cache-Control', 'public, max-age=604800')
    },
  }),
)

/** Health endpoint for uptime checks and container orchestration. */
app.get('/healthz', (_req, res) => res.type('text/plain').send('ok'))

/**
 * Clean-URL resolution. A request for /about serves dist/about/index.html directly —
 * no redirect, so there is no chance of a redirect loop and AdsBot sees a 200 first time.
 */
app.get('*', (req, res) => {
  const raw = decodeURIComponent(req.path)
  const safe = normalize(raw).replace(/^(\.\.[/\\])+/, '')
  const candidate = resolve(DIST, '.' + safe, 'index.html')

  // Never serve outside dist/.
  if (candidate.startsWith(DIST) && existsSync(candidate)) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate')
    return res.status(200).type('html').send(readFileSync(candidate))
  }

  // A path with a trailing slash resolves to the same file; normalise without redirecting.
  const notFound = resolve(DIST, '404', 'index.html')
  res.status(404)
  res.setHeader('Cache-Control', 'no-cache')
  if (existsSync(notFound)) return res.type('html').send(readFileSync(notFound))
  return res.type('text/plain').send('404 Not Found')
})

/** Errors never leak stack traces to the visitor. */
app.use((err, _req, res, _next) => {
  console.error('[server]', err?.message ?? err)
  if (res.headersSent) return
  res.status(500).type('html').send(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Temporarily unavailable</title></head>' +
      '<body style="font-family:system-ui;margin:4rem auto;max-width:34rem;padding:0 1rem;color:#111d31">' +
      '<h1>Temporarily unavailable</h1><p>Something went wrong on our side. Please try again shortly.</p>' +
      '<p><a href="/">Return to the homepage</a></p></body></html>',
  )
})

app.listen(PORT, HOST, () => {
  console.log(`US Car Restoration — serving dist/ on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`)
})
