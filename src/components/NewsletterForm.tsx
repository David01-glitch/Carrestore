import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { track } from '../lib/analytics'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * There is no mailing-list provider connected to this build, so the form does not pretend
 * to subscribe anyone. It validates locally and tells the visitor exactly what to do next.
 * When a provider is added, replace the body of `submit()` — the states below already exist.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) {
      setStatus('error')
      setMessage('Please enter a valid email address, for example name@example.org.')
      track.newsletterSubmitted('error')
      return
    }
    if (!consent) {
      setStatus('error')
      setMessage('Please tick the consent box so we know you want to hear from us.')
      track.newsletterSubmitted('error')
      return
    }
    setStatus('submitting')
    setStatus('success')
    setMessage(
      'Thanks — no automated mailing list is connected to this site yet, so nothing has been stored. Email us directly and we will add you to the notes list by hand.',
    )
    track.newsletterSubmitted('success')
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
      <div>
        <h2 className="font-display text-lg text-cream-50">Restoration notes, occasionally</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-300/90">
          New guides, reference material and corrections to work we have already published. No
          subscriber counts to boast about — this is a small list and we would rather it stayed
          useful than large.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="max-w-md">
        <label htmlFor="newsletter-email" className="mb-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brass-400">
          Email address
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
            aria-describedby="newsletter-help newsletter-status"
            aria-invalid={status === 'error' || undefined}
            className="min-w-0 flex-1 rounded-sm border border-navy-700 bg-navy-950 px-3 py-2.5 text-[0.9rem] text-cream-100 placeholder:text-cream-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
            placeholder="name@example.org"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="shrink-0 rounded-sm bg-brass-500 px-4 py-2.5 text-[0.85rem] font-semibold text-navy-900 transition-colors duration-150 ease-editorial hover:bg-brass-400 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-300"
          >
            {status === 'submitting' ? 'Sending…' : 'Sign up'}
          </button>
        </div>

        <div className="mt-3 flex items-start gap-2.5">
          <input
            id="newsletter-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-brass-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
          />
          <label htmlFor="newsletter-consent" className="text-[0.78rem] leading-relaxed text-cream-400/85">
            I agree to receive occasional emails about new and updated articles. I can unsubscribe at
            any time. See the{' '}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-brass-300">privacy policy</Link>.
          </label>
        </div>

        <p id="newsletter-help" className="mt-2 text-[0.75rem] text-cream-500/70">
          We use your address only to send these notes. It is never sold or passed to advertisers.
        </p>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`mt-2 text-[0.8rem] leading-relaxed ${status === 'error' ? 'text-burgundy-300' : 'text-racing-300'}`}
        >
          {status === 'error' || status === 'success' ? message : ''}
        </p>
      </form>
    </div>
  )
}
