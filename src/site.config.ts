import identityJson from '../site.identity.json'

/**
 * Single source of truth for who this website says it is.
 *
 * Values arrive from site.identity.json, which is guarded by scripts/validate-config.mjs.
 * Anything that has not been verified is exposed as `null` here, and every component is
 * written to render nothing at all rather than substitute a placeholder.
 */

type IdentityField = { value: string | null; verified?: boolean; source?: string }

const field = (f: IdentityField | undefined): string | null =>
  f && f.verified === true && typeof f.value === 'string' && f.value.trim() ? f.value.trim() : null

export const SITE_URL: string = __SITE_URL__
export const GA4_ID: string = __GA4_ID__
export const BUILD_DATE: string = __BUILD_DATE__

export const site = {
  name: identityJson.displayName,
  tagline: identityJson.tagline,
  url: SITE_URL,
  /** Verified: supplied directly by the site owner. */
  email: field(identityJson.email as IdentityField) ?? 'Uscarrestoration@gmail.com',
  /** Everything below is null until independently verified. Components omit null fields. */
  legalName: field(identityJson.legalName as IdentityField),
  phone: field(identityJson.phone as IdentityField),
  address: field(identityJson.address as IdentityField),
  businessHours: field(identityJson.businessHours as IdentityField),
  responseTime: field(identityJson.responseTime as IdentityField),
  social: (identityJson.social?.profiles ?? []) as { name: string; url: string; verified: boolean }[],
  organizationType: identityJson.organizationType || 'Organization',
} as const

/** Absolute URL for a site-relative path. Never hard-codes a domain. */
export const abs = (path: string): string => {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * The trademark position stated on every page that names a manufacturer.
 * This site has no relationship with any vehicle manufacturer.
 */
export const TRADEMARK_NOTICE =
  'Vehicle names and trademarks belong to their respective owners. This website is an independent automotive information resource unless otherwise stated.'

export const INDEPENDENCE_NOTICE =
  `${identityJson.displayName} is not affiliated with, endorsed by, sponsored by or authorised by Ford Motor Company, General Motors, Stellantis or any other vehicle manufacturer, and does not act as an authorised dealer, agent or service centre for any of them.`

export const SAFETY_NOTICE =
  'Articles and guides on this website are written for general education. They are not repair instructions for a specific vehicle, and they are not a substitute for a factory service manual or the judgement of a qualified professional.'
