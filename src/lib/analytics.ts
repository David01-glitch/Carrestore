import { GA4_ID } from '../site.config'
import { readConsent, type ConsentState } from './consent'

/**
 * GA4, switched off by default.
 *
 * Two independent conditions must both hold before a single byte goes to Google:
 *   1. GA4_ID is configured (it is empty unless the site owner sets their own property).
 *   2. The visitor has actively granted analytics consent.
 *
 * Google Consent Mode defaults are set to "denied" before the tag ever loads, so the
 * tag's own behaviour matches the banner rather than merely appearing to.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let scriptInjected = false
let initialised = false

const enabled = (): boolean => Boolean(GA4_ID) && typeof window !== 'undefined'

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

/** Declares denied defaults. Safe to call before any consent decision exists. */
export function initConsentDefaults() {
  if (!enabled()) return
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  })
}

function injectTag() {
  if (scriptInjected || !enabled()) return
  scriptInjected = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`
  document.head.appendChild(s)
  gtag('js', new Date())
  gtag('config', GA4_ID, {
    send_page_view: false,
    anonymize_ip: true,
    // No personal data is ever passed to analytics from this site.
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
  initialised = true
}

export function applyConsent(state: ConsentState) {
  if (!enabled()) return
  gtag('consent', 'update', {
    analytics_storage: state.analytics,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  if (state.analytics === 'granted') injectTag()
}

const consented = (): boolean => enabled() && readConsent().analytics === 'granted'

export function trackPageView(path: string, title: string) {
  if (!consented()) return
  injectTag()
  gtag('event', 'page_view', { page_path: path, page_title: title, page_location: window.location.href })
}

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!consented() || !initialised) return
  gtag('event', name, params)
}

/** Named helpers keep event names consistent and prevent stray personal data. */
export const track = {
  articleOpened: (slug: string, category: string) => trackEvent('article_view', { slug, category }),
  articleCompleted: (slug: string) => trackEvent('article_complete', { slug }),
  guideExpanded: (slug: string, section: string) => trackEvent('guide_expand', { slug, section }),
  newsletterSubmitted: (result: 'success' | 'error') => trackEvent('newsletter_submit', { result }),
  contactSubmitted: (result: 'success' | 'error') => trackEvent('contact_submit', { result }),
  searchPerformed: (resultCount: number) => trackEvent('site_search', { result_count: resultCount }),
}
