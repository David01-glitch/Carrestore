import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../site.config'

const NAV = [
  { to: '/restoration-guides', label: 'Restoration Guides' },
  { to: '/classic-cars', label: 'Classic Cars' },
  { to: '/muscle-cars', label: 'Muscle Cars' },
  { to: '/car-care', label: 'Car Care' },
  { to: '/automotive-history', label: 'History' },
  { to: '/blog', label: 'Journal' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className="relative z-40 border-b border-navy-800 bg-navy-900 text-cream-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-baseline gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-400">
          <span className="font-display text-lg leading-none tracking-tight text-cream-50 md:text-xl">
            US Car <span className="text-brass-400">Restoration</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `rounded-sm px-2.5 py-2 text-[0.82rem] font-medium transition-colors duration-150 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400 ${
                      isActive ? 'text-brass-300' : 'text-cream-200 hover:text-brass-300'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
            <li className="ml-2">
              <Link
                to="/contact"
                className="rounded-sm border border-brass-500/70 px-3.5 py-2 text-[0.82rem] font-semibold text-brass-300 transition-colors duration-150 ease-editorial hover:bg-brass-500 hover:text-navy-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-sm border border-navy-700 px-3 py-2 text-sm text-cream-100 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close main menu' : 'Open main menu'}</span>
          <span aria-hidden="true" className="font-mono text-xs uppercase tracking-widest">{open ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Rendered in the HTML at all times; only visibility is toggled. */}
      <div id="mobile-nav" hidden={!open} className="border-t border-navy-800 lg:hidden">
        <nav aria-label="Primary mobile">
          <ul className="mx-auto max-w-6xl px-5 py-2">
            {[...NAV, { to: '/contact', label: 'Contact' }].map((n) => (
              <li key={n.to} className="border-b border-navy-800/70 last:border-b-0">
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `block py-3 text-[0.95rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400 ${isActive ? 'text-brass-300' : 'text-cream-200'}`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="sr-only">{site.tagline}</p>
    </header>
  )
}
