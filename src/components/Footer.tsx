import { Link } from 'react-router-dom'
import { site, TRADEMARK_NOTICE, INDEPENDENCE_NOTICE, BUILD_DATE } from '../site.config'
import { NewsletterForm } from './NewsletterForm'

const COLUMNS = [
  {
    heading: 'Restoration',
    links: [
      { to: '/restoration-guides', label: 'All restoration guides' },
      { to: '/restoration-guides/evaluating-a-classic-car', label: 'Evaluating a project car' },
      { to: '/restoration-guides/rust-inspection', label: 'Rust inspection' },
      { to: '/restoration-guides/engine-rebuild-basics', label: 'Engine rebuild basics' },
      { to: '/restoration-guides/restoration-budget-planning', label: 'Budget planning' },
    ],
  },
  {
    heading: 'Vehicles',
    links: [
      { to: '/classic-cars', label: 'Classic car profiles' },
      { to: '/muscle-cars', label: 'Muscle cars' },
      { to: '/classic-cars/ford-mustang', label: 'Ford Mustang' },
      { to: '/classic-cars/chevrolet-corvette', label: 'Chevrolet Corvette' },
      { to: '/classic-cars/dodge-charger', label: 'Dodge Charger' },
    ],
  },
  {
    heading: 'Reading',
    links: [
      { to: '/blog', label: 'The Journal' },
      { to: '/car-care', label: 'Car care' },
      { to: '/automotive-history', label: 'Automotive history' },
      { to: '/community', label: 'Community' },
      { to: '/about', label: 'About us' },
    ],
  },
  {
    heading: 'Policies',
    links: [
      { to: '/editorial-policy', label: 'Editorial policy' },
      { to: '/affiliate-disclosure', label: 'Affiliate disclosure' },
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/cookie-policy', label: 'Cookie policy' },
      { to: '/terms', label: 'Terms of use' },
      { to: '/image-credits', label: 'Image credits' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-burgundy-700 bg-navy-900 text-cream-200">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="font-display text-lg text-cream-50">
              US Car <span className="text-brass-400">Restoration</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-300/90">
              An independent editorial resource covering the restoration, history and ownership of
              American classic cars. We publish research and reference material — we do not sell
              vehicles, parts or restoration services.
            </p>
            <address className="mt-5 not-italic text-sm text-cream-300/90">
              <span className="block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream-400/70">Contact</span>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block break-all underline decoration-brass-500/60 underline-offset-4 transition-colors hover:text-brass-300"
              >
                {site.email}
              </a>
              {site.phone && <span className="mt-1 block">{site.phone}</span>}
              {site.address && <span className="mt-1 block">{site.address}</span>}
            </address>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brass-400">{col.heading}</h2>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-[0.86rem] leading-snug text-cream-300/90 underline-offset-4 transition-colors duration-150 ease-editorial hover:text-brass-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-navy-800 pt-10">
          <NewsletterForm />
        </div>

        <div className="mt-10 space-y-3 border-t border-navy-800 pt-8 text-[0.78rem] leading-relaxed text-cream-400/80">
          <p>{TRADEMARK_NOTICE}</p>
          <p>{INDEPENDENCE_NOTICE}</p>
          <p>
            Information published here is general reference material for enthusiasts. It is not a
            repair manual for any specific vehicle and is not professional mechanical, legal or
            financial advice. See our{' '}
            <Link to="/terms" className="underline underline-offset-4 hover:text-brass-300">terms of use</Link>.
          </p>
          <p className="pt-2 text-cream-500/70">
            © {new Date().getFullYear()} {site.legalName ?? site.name}. Content last built {BUILD_DATE}.
          </p>
        </div>
      </div>
    </footer>
  )
}
