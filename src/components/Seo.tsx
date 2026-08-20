import { Head } from 'vite-react-ssg'
import { abs, site } from '../site.config'
import { pageTitle, type SeoInput } from '../lib/seo'
import { getImage, primaryUrl } from '../lib/images'

/**
 * Emits the per-page head. Every route supplies its own title, description, canonical and
 * social card — nothing is inherited or duplicated between pages.
 */
export function Seo({ title, description, path, image, type = 'website', published, updated, section, noindex, jsonLd }: SeoInput & { jsonLd?: string }) {
  const canonical = abs(path)
  const img = getImage(image ?? 'hero-belair-station')
  const ogImage = img ? abs(primaryUrl(img)) : undefined

  return (
    <Head>
      <title>{pageTitle(title)}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />}

      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle(title)} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && img && <meta property="og:image:width" content={String(img.width)} />}
      {ogImage && img && <meta property="og:image:height" content={String(img.height)} />}
      {ogImage && img && <meta property="og:image:alt" content={img.alt} />}
      {published && <meta property="article:published_time" content={published} />}
      {updated && <meta property="article:modified_time" content={updated} />}
      {section && <meta property="article:section" content={section} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle(title)} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && img && <meta name="twitter:image:alt" content={img.alt} />}

      {jsonLd && <script type="application/ld+json">{jsonLd}</script>}
    </Head>
  )
}
