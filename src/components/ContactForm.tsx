import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../site.config'
import { track } from '../lib/analytics'

type Status = 'idle' | 'error' | 'ready'

/**
 * No third-party form backend is connected to this build, and the site does not run a
 * server-side inbox. Rather than pretend to submit, the form validates locally and then
 * composes a pre-filled message to the published address, which genuinely works.
 * To wire a real endpoint later, replace the body of submit() — the states already exist.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [mailto, setMailto] = useState('')

  const set = (k: string, v: string) => {
    setValues((p) => ({ ...p, [k]: v }))
    if (status !== 'idle') setStatus('idle')
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) next.email = 'Please enter a valid email address so we can reply.'
    if (values.message.trim().length < 20) next.message = 'Please give us a little more detail — at least a sentence or two.'
    setErrors(next)

    if (Object.keys(next).length) {
      setStatus('error')
      track.contactSubmitted('error')
      return
    }
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}`
    setMailto(`mailto:${site.email}?subject=${encodeURIComponent(`[${values.subject}] ${values.name.trim()}`)}&body=${encodeURIComponent(body)}`)
    setStatus('ready')
    track.contactSubmitted('success')
  }

  const field = 'mt-1.5 w-full rounded-sm border border-navy-300 bg-white px-3 py-2.5 text-[0.95rem] text-navy-900 placeholder:text-navy-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600'
  const label = 'block text-[0.85rem] font-semibold text-navy-800'
  const err = 'mt-1.5 text-[0.82rem] text-burgundy-700'

  return (
    <form onSubmit={submit} noValidate className="rounded-sm border-2 border-navy-800 bg-cream-50 p-6">
      <h2 className="font-display text-xl text-navy-900">Send us a message</h2>
      <p className="mt-2 text-[0.9rem] leading-[1.6] text-navy-700">
        We read everything. Corrections to published articles are prioritised — please include the
        page address if you are reporting one.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="cf-name" className={label}>Your name <span className="font-normal text-navy-500">(required)</span></label>
          <input id="cf-name" name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} className={field} />
          {errors.name && <p id="cf-name-err" className={err}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="cf-email" className={label}>Email address <span className="font-normal text-navy-500">(required)</span></label>
          <input id="cf-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : 'cf-email-help'} className={field} placeholder="name@example.org" />
          {errors.email ? <p id="cf-email-err" className={err}>{errors.email}</p>
            : <p id="cf-email-help" className="mt-1.5 text-[0.8rem] text-navy-500">Used only to reply to you.</p>}
        </div>

        <div>
          <label htmlFor="cf-subject" className={label}>Subject</label>
          <select id="cf-subject" name="subject" value={values.subject} onChange={(e) => set('subject', e.target.value)} className={field}>
            <option>General enquiry</option>
            <option>Correction to an article</option>
            <option>Restoration story submission</option>
            <option>Image licensing or attribution</option>
            <option>Press or editorial</option>
          </select>
        </div>

        <div>
          <label htmlFor="cf-message" className={label}>Message <span className="font-normal text-navy-500">(required)</span></label>
          <textarea id="cf-message" name="message" rows={6} value={values.message} onChange={(e) => set('message', e.target.value)}
            aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} className={field} />
          {errors.message && <p id="cf-message-err" className={err}>{errors.message}</p>}
        </div>
      </div>

      <button type="submit" className="mt-6 w-full rounded-sm bg-burgundy-700 px-5 py-3 text-[0.9rem] font-semibold text-cream-50 transition-colors duration-200 hover:bg-burgundy-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-500 sm:w-auto">
        Prepare message
      </button>

      <div role="status" aria-live="polite" className="mt-4">
        {status === 'error' && (
          <p className="text-[0.88rem] text-burgundy-700">Please correct the fields marked above and try again.</p>
        )}
        {status === 'ready' && (
          <div className="rounded-sm border border-racing-300 bg-racing-50 p-4">
            <p className="text-[0.9rem] leading-[1.6] text-navy-800">
              Your message is ready. This site has no server-side inbox, so the button below opens
              your own email application with the message filled in — nothing is stored here.
            </p>
            <a href={mailto} className="mt-3 inline-block rounded-sm bg-navy-900 px-4 py-2.5 text-[0.85rem] font-semibold text-cream-50 transition-colors hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
              Open in your email app
            </a>
            <p className="mt-3 text-[0.82rem] text-navy-600">
              Or write to us directly at{' '}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4 break-all">{site.email}</a>.
            </p>
          </div>
        )}
      </div>

      <p className="mt-5 border-t border-navy-200 pt-4 text-[0.8rem] leading-relaxed text-navy-600">
        This form runs entirely in your browser. Nothing you type is transmitted to or stored by
        this website — see our{' '}
        <Link to="/privacy" className="underline underline-offset-4 hover:text-burgundy-700">privacy policy</Link>.
      </p>
    </form>
  )
}
