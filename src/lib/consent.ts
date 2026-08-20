/**
 * Consent state.
 *
 * The rule this file enforces: no analytics storage and no analytics network request
 * happens before the visitor grants consent. A banner alone is not compliance — the
 * gate is here, and analytics.ts refuses to initialise without it.
 */
export type ConsentChoice = 'granted' | 'denied'

export interface ConsentState {
  analytics: ConsentChoice
  decidedAt: string | null
}

export const CONSENT_KEY = 'ucr.consent.v1'
const DEFAULT: ConsentState = { analytics: 'denied', decidedAt: null }

export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return DEFAULT
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    if (!raw) return DEFAULT
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    return {
      analytics: parsed.analytics === 'granted' ? 'granted' : 'denied',
      decidedAt: typeof parsed.decidedAt === 'string' ? parsed.decidedAt : null,
    }
  } catch {
    return DEFAULT
  }
}

export function writeConsent(state: Omit<ConsentState, 'decidedAt'>): ConsentState {
  const next: ConsentState = { ...state, decidedAt: new Date().toISOString() }
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable (private mode); the session simply stays un-consented */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>('ucr:consent', { detail: next }))
  return next
}

export const hasDecided = (s: ConsentState): boolean => s.decidedAt !== null
