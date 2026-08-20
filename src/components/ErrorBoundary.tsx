import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Catches render failures so a visitor never sees a React stack trace.
 * Diagnostic detail goes to the console only; the page shows a plain recovery message.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Render error:', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main id="main" className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-burgundy-700">Something went wrong</p>
        <h1 className="mt-3 font-display text-2xl text-navy-900">This page could not be displayed</h1>
        <p className="mt-4 leading-relaxed text-navy-700">
          The rest of the site is unaffected. Please reload the page, or head back to the homepage
          and try again from there.
        </p>
        <p className="mt-6">
          <Link to="/" className="inline-block rounded-sm bg-navy-900 px-5 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-navy-800">
            Return to the homepage
          </Link>
        </p>
      </main>
    )
  }
}
