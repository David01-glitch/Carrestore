import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { graph, organizationSchema, websiteSchema } from '../lib/seo'
import { Section } from '../components/ui'
import { guides } from '../content/guides'
import { articles } from '../content/articles'
import { cars } from '../content/cars'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you requested could not be found. Browse our restoration guides, vehicle profiles and journal instead."
        path="/404"
        noindex
        jsonLd={graph(organizationSchema(), websiteSchema())}
      />
      <main id="main">
        <Section tone="white" className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-burgundy-700">Error 404</p>
            <h1 className="mt-3 font-display text-3xl leading-tight text-navy-900 md:text-4xl">This page could not be found</h1>
            <p className="mt-5 text-[1.05rem] leading-[1.7] text-navy-700">
              The address may have been mistyped, or the page may have been renamed. Nothing is
              broken — everything on the site is reachable from the links below.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <nav aria-labelledby="nf-guides">
              <h2 id="nf-guides" className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Restoration guides</h2>
              <ul className="space-y-2">
                {guides.slice(0, 5).map((g) => (
                  <li key={g.slug}>
                    <Link to={`/restoration-guides/${g.slug}`} className="text-[0.9rem] text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">{g.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="nf-cars">
              <h2 id="nf-cars" className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Vehicle profiles</h2>
              <ul className="space-y-2">
                {cars.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/classic-cars/${c.slug}`} className="text-[0.9rem] text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="nf-journal">
              <h2 id="nf-journal" className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">From the Journal</h2>
              <ul className="space-y-2">
                {articles.slice(0, 5).map((a) => (
                  <li key={a.slug}>
                    <Link to={`/blog/${a.slug}`} className="text-[0.9rem] text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">{a.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <p className="mt-12">
            <Link to="/" className="inline-block rounded-sm bg-navy-900 px-5 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
              Return to the homepage
            </Link>
          </p>
        </Section>
      </main>
    </>
  )
}
