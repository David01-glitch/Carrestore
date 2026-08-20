#!/usr/bin/env node
/**
 * Fails the build if any expected image is missing, empty, corrupted, mistyped or
 * lacking alt text. Runs against the manifest, so a page can never reference an
 * image that was never downloaded.
 */
import { readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { images, WIDTHS } from './image-manifest.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const IMG = resolve(root, 'src/assets/images')
const errors = []
const warnings = []

const MAGIC = {
  jpg: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  webp: (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP',
}
const MAX_BYTES = 900 * 1024
const MIN_BYTES = 1024

/** JPEG dimensions straight from the SOF marker — no image library needed. */
function jpegSize(buf) {
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue }
    const marker = buf[i + 1]
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  return null
}

let checked = 0
for (const entry of images) {
  if (!entry.alt || entry.alt.trim().length < 20) {
    errors.push(`${entry.slug}: alt text is missing or too short to be descriptive.`)
  }
  if (/^(car|image|photo|picture|classic car)$/i.test((entry.alt || '').trim())) {
    errors.push(`${entry.slug}: alt text is a generic word rather than a description.`)
  }

  for (const w of WIDTHS) {
    for (const ext of ['jpg', 'webp']) {
      const file = resolve(IMG, entry.folder, `${entry.slug}-${w}.${ext}`)
      const rel = `${entry.folder}/${entry.slug}-${w}.${ext}`
      if (!existsSync(file)) { errors.push(`${rel}: file is missing. Run "npm run fetch:images".`); continue }

      const size = statSync(file).size
      if (size === 0) { errors.push(`${rel}: file is zero bytes.`); continue }
      if (size < MIN_BYTES) { errors.push(`${rel}: only ${size} bytes — almost certainly corrupt.`); continue }
      if (size > MAX_BYTES) warnings.push(`${rel}: ${(size / 1024).toFixed(0)} KB is larger than expected for a ${w}px derivative.`)

      const buf = readFileSync(file)
      const head = buf.subarray(0, 200).toString('latin1').toLowerCase()
      if (head.includes('<!doctype') || head.includes('<html')) { errors.push(`${rel}: contains an HTML document, not an image.`); continue }
      if (!MAGIC[ext](buf)) { errors.push(`${rel}: file signature does not match a valid ${ext.toUpperCase()}.`); continue }

      if (ext === 'jpg') {
        const dim = jpegSize(buf)
        if (!dim || !dim.width || !dim.height) errors.push(`${rel}: could not read image dimensions — file may be truncated.`)
        else if (dim.width !== w) errors.push(`${rel}: expected ${w}px wide but the file is ${dim.width}px.`)
      }
      checked++
    }
  }
}

// Attribution must exist for every manifest entry.
const attrPath = resolve(IMG, 'attribution.json')
if (!existsSync(attrPath)) {
  errors.push('attribution.json is missing. Run "npm run fetch:images".')
} else {
  const attr = JSON.parse(readFileSync(attrPath, 'utf8'))
  const known = new Set(attr.map((a) => a.slug))
  for (const e of images) if (!known.has(e.slug)) errors.push(`${e.slug}: no attribution record. Run "npm run fetch:images".`)
  for (const a of attr) {
    if (!a.source?.licence) errors.push(`${a.slug}: attribution record has no licence.`)
    if (a.source?.attributionRequired && !a.source?.author) errors.push(`${a.slug}: licence requires attribution but no creator is recorded.`)
    if (/\b(nc|non-commercial|nd|no-deriv)\b/i.test(a.source?.licence ?? '') && !/^cc[ -]by([ -]sa)?/i.test(a.source.licence)) {
      errors.push(`${a.slug}: licence "${a.source.licence}" is not usable on this website.`)
    }
  }
}

if (!existsSync(resolve(root, 'IMAGE-LICENSES.md'))) errors.push('IMAGE-LICENSES.md is missing. Run "npm run fetch:images".')

console.log(`\n  Image validation — ${images.length} images, ${checked} files verified`)
for (const w of warnings.slice(0, 10)) console.log(`  \x1b[33m•\x1b[0m ${w}`)
if (warnings.length > 10) console.log(`  \x1b[33m•\x1b[0m …and ${warnings.length - 10} more size notes`)
if (errors.length) {
  console.error(`\n  \x1b[31mFAILED — ${errors.length} problem(s):\x1b[0m`)
  for (const e of errors.slice(0, 40)) console.error(`  \x1b[31m✗\x1b[0m ${e}`)
  process.exit(1)
}
console.log('  \x1b[32m✓\x1b[0m every image present, valid and described\n')
