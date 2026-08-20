import attribution from '../assets/images/attribution.json'

/**
 * Local image resolution.
 *
 * Every derivative under src/assets/images is pulled in eagerly at build time, so the
 * bundler fingerprints and copies the files it actually needs. Nothing is fetched from an
 * external image host at runtime — there are no remote image URLs anywhere in this app.
 */
const urls = import.meta.glob('../assets/images/**/*.{jpg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const lookup = new Map<string, string>()
for (const [path, url] of Object.entries(urls)) {
  // '../assets/images/hero/hero-belair-station-960.webp' -> 'hero/hero-belair-station-960.webp'
  lookup.set(path.replace('../assets/images/', ''), url)
}

export interface ImageSource {
  platform: string
  file: string
  pageUrl: string
  author: string
  credit: string
  date: string
  licence: string
  licenceFamily: string
  licenceUrl: string
  attributionRequired: boolean
}

export interface ImageRecord {
  slug: string
  folder: string
  alt: string
  width: number
  height: number
  aspect: number
  widths: number[]
  source: ImageSource
}

const records = new Map<string, ImageRecord>()
for (const r of attribution as ImageRecord[]) records.set(r.slug, r)

export const getImage = (slug: string): ImageRecord | undefined => records.get(slug)

export const allImages = (): ImageRecord[] => [...records.values()]

/** Throws at build time if a page references an image that was never downloaded. */
export function requireImage(slug: string): ImageRecord {
  const r = records.get(slug)
  if (!r) {
    throw new Error(
      `Unknown image "${slug}". Add it to scripts/image-manifest.mjs and run "npm run fetch:images".`,
    )
  }
  return r
}

export function assetUrl(image: ImageRecord, width: number, ext: 'jpg' | 'webp'): string {
  const key = `${image.folder}/${image.slug}-${width}.${ext}`
  const url = lookup.get(key)
  if (!url) throw new Error(`Missing image derivative: ${key}`)
  return url
}

/** Widest available derivative — used for Open Graph and as the <img src> fallback. */
export function primaryUrl(image: ImageRecord): string {
  const widest = Math.max(...image.widths)
  return assetUrl(image, widest, 'jpg')
}

export function srcSet(image: ImageRecord, ext: 'jpg' | 'webp'): string {
  return image.widths.map((w) => `${assetUrl(image, w, ext)} ${w}w`).join(', ')
}

/** Human-readable credit line. Rendered wherever the licence requires attribution. */
export function creditLine(image: ImageRecord): string {
  const { author, licence, platform } = image.source
  const cleanAuthor = author.replace(/\s+/g, ' ').trim()
  if (!image.source.attributionRequired) {
    return `${platform} — ${licence}`
  }
  return `${cleanAuthor}, ${platform} — ${licence}`
}
