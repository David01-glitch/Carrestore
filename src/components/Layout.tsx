import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieBanner } from './CookieBanner'
import { ErrorBoundary } from './ErrorBoundary'
import { trackPageView } from '../lib/analytics'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Client-side navigations only; the initial view is recorded by the same call.
    trackPageView(pathname, document.title)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <a
        href="#main"
        className="sr-only z-50 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-navy-900 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream-50 focus:outline-2 focus:outline-offset-2 focus:outline-brass-400"
      >
        Skip to main content
      </a>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
      <CookieBanner />
    </div>
  )
}
