import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GA4_ID } from '../site.config'
import { readConsent, writeConsent, hasDecided, type ConsentState } from '../lib/consent'
import { applyConsent, initConsentDefaults } from '../lib/analytics'

/**
 * A small, dismissible bar anchored to the bottom of the viewport.
 * It never covers the page, never blocks reading, and never traps focus.
 * When no analytics property is configured it does not render at all — there would be
 * nothing to consent to, and asking anyway would be theatre.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    if (!GA4_ID) return
    initConsentDefaults()
    const state = readConsent()
    applyConsent(state)
    if (!hasDecided(state)) setVisible(true)
  }, [])

  if (!GA4_ID || !visible) return null

  const decide = (analytics: ConsentState['analytics']) => {
    const next = writeConsent({ analytics })
    applyConsent(next)
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-700 bg-navy-900/98 px-5 py-4 text-cream-200 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-[0.82rem] leading-relaxed">
          <p>
            We would like to use analytics cookies to understand which articles people find useful.
            They are off unless you turn them on. Essential functionality never uses tracking cookies.{' '}
            <Link to="/cookie-policy" className="underline underline-offset-4 hover:text-brass-300">
              Read the cookie policy
            </Link>
            .
          </p>
          {showDetail && (
            <ul className="mt-2.5 space-y-1.5 border-l-2 border-navy-700 pl-3 text-[0.78rem] text-cream-400/90">
              <li><strong className="text-cream-200">Strictly necessary</strong> — remembering this choice. Always on, stored on your device only.</li>
              <li><strong className="text-cream-200">Analytics</strong> — Google Analytics 4, IP anonymised, no advertising signals. Off until you accept.</li>
              <li><strong className="text-cream-200">Advertising</strong> — not used on this website at all.</li>
            </ul>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowDetail((v) => !v)}
            aria-expanded={showDetail}
            className="rounded-sm border border-navy-600 px-3 py-2 text-[0.78rem] text-cream-300 transition-colors hover:border-navy-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
          >
            {showDetail ? 'Hide detail' : 'Manage preferences'}
          </button>
          <button
            type="button"
            onClick={() => decide('denied')}
            className="rounded-sm border border-navy-600 px-3 py-2 text-[0.78rem] text-cream-200 transition-colors hover:border-navy-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="rounded-sm bg-brass-500 px-3.5 py-2 text-[0.78rem] font-semibold text-navy-900 transition-colors hover:bg-brass-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
