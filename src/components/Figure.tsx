import { requireImage, srcSet, primaryUrl, creditLine } from '../lib/images'

interface FigureProps {
  slug: string
  /** Overrides the manifest alt only when context makes a more specific description truer. */
  alt?: string
  caption?: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  /** Decorative images take an empty alt and are hidden from assistive technology. */
  decorative?: boolean
  rounded?: boolean
  /**
   * Set false when the figure sits inside a link. The credit line contains its own
   * anchor, and nesting anchors is invalid HTML — browsers split the outer link,
   * which breaks both the card and its accessible name. Credits for these images are
   * published on /image-credits and in IMAGE-LICENSES.md instead.
   */
  showCredit?: boolean
}

/**
 * Responsive <picture> backed by locally stored derivatives.
 * Width and height are always emitted so the browser reserves layout space (no CLS).
 */
export function Figure({
  slug,
  alt,
  caption,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  decorative = false,
  rounded = true,
  showCredit = true,
}: FigureProps) {
  const image = requireImage(slug)
  const credit = creditLine(image)

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-navy-800 ${rounded ? 'rounded-sm' : ''}`}>
        <picture>
          <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
          <source type="image/jpeg" srcSet={srcSet(image, 'jpg')} sizes={sizes} />
          <img
            src={primaryUrl(image)}
            width={image.width}
            height={image.height}
            alt={decorative ? '' : (alt ?? image.alt)}
            aria-hidden={decorative || undefined}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : undefined}
            className={`block h-full w-full object-cover ${imgClassName}`}
          />
        </picture>
      </div>
      {showCredit && (caption || credit) && (
        <figcaption className="mt-2 text-xs leading-relaxed text-navy-500">
          {caption && <span className="text-navy-700">{caption} </span>}
          <span className="text-navy-400">
            Photo: {credit}
            {image.source.attributionRequired && image.source.licenceUrl && (
              <>
                {' '}
                <a
                  href={image.source.pageUrl}
                  className="underline decoration-dotted underline-offset-2 hover:text-burgundy-700"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                >
                  source
                </a>
              </>
            )}
          </span>
        </figcaption>
      )}
    </figure>
  )
}
