import { site, abs, SITE_URL } from '../site.config'

export interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
  published?: string
  updated?: string
  section?: string
  noindex?: boolean
}

export const pageTitle = (title: string): string =>
  title === site.name
    ? `${site.name} — American Classic Car Restoration`
    : `${title} | ${site.name}`

/** schema.org Organization. Deliberately generic: no address, no rating, no awards. */
export function organizationSchema() {
  const org: Record<string, unknown> = {
    '@type': site.organizationType,
    '@id': `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    email: site.email,
    description: site.tagline,
  }
  if (site.legalName) org.legalName = site.legalName
  if (site.phone) org.telephone = site.phone
  if (site.address) org.address = site.address
  if (site.social.length) org.sameAs = site.social.map((s) => s.url)
  return org
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    description: site.tagline,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  }
}

export function articleSchema(input: {
  title: string
  description: string
  path: string
  image: string
  published: string
  updated: string
  section?: string
}) {
  return {
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: abs(input.image),
    datePublished: input.published,
    dateModified: input.updated,
    articleSection: input.section,
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(input.path) },
    // The editorial team is the credited author. No individual is named unless verified.
    author: { '@type': 'Organization', name: `${site.name} Editorial Team`, url: abs('/about') },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
  }
}

/** Only ever built from questions and answers that are visible on the page itself. */
export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export const graph = (...nodes: unknown[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) })
