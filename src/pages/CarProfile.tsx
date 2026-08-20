import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { cars, getCar } from '../content/cars'
import { graph, breadcrumbSchema, organizationSchema, faqSchema } from '../lib/seo'
import { TRADEMARK_NOTICE, INDEPENDENCE_NOTICE } from '../site.config'
import NotFound from './NotFound'

export default function CarProfile() {
  const { slug } = useParams<{ slug: string }>()
  const car = slug ? getCar(slug) : undefined
  if (!car) return <NotFound />

  const others = cars.filter((c) => c.slug !== car.slug).slice(0, 4)
  const path = `/classic-cars/${car.slug}`
  const trail = [{ name: 'Home', path: '/' }, { name: 'Classic Cars', path: '/classic-cars' }, { name: car.name, path }]

  return (
    <>
      <Seo
        title={`${car.name} Restoration Guide`}
        description={car.metaDescription}
        path={path}
        image={car.image}
        type="article"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail), car.faq.length ? faqSchema(car.faq) : null)}
      />
      <main id="main">
        <Section tone="white" className="pt-8"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Plate>{car.maker}</Plate>
              <Plate>{car.years}</Plate>
            </div>
            <h1 className="mt-4 font-display text-3xl leading-tight text-navy-900 md:text-[2.5rem]">{car.name}</h1>
            <p className="mt-4 text-[1.1rem] leading-[1.65] text-navy-700">{car.dek}</p>
          </div>
        </Section>

        <Section tone="white" className="pb-12">
          <Figure slug={car.image} priority className="max-w-5xl" sizes="(min-width: 1024px) 64rem, 100vw" />
        </Section>

        <Section tone="white" className="pb-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <div className="min-w-0">
              <section aria-labelledby="car-intro">
                <h2 id="car-intro" className="font-display text-2xl text-navy-900">Background</h2>
                <div className="mt-4 space-y-4 text-[1.02rem] leading-[1.75] text-navy-800">
                  {car.intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>

              <section aria-labelledby="car-gens" className="mt-12">
                <h2 id="car-gens" className="font-display text-2xl text-navy-900">Important generations</h2>
                <dl className="mt-5 divide-y divide-navy-100 border-y border-navy-100">
                  {car.generations.map((g) => (
                    <div key={g.label} className="py-5">
                      <dt className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-display text-[1.05rem] text-navy-900">{g.label}</span>
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-burgundy-700">{g.years}</span>
                      </dt>
                      <dd className="mt-2 leading-[1.7] text-navy-800">{g.text}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="car-resto" className="mt-12">
                <h2 id="car-resto" className="font-display text-2xl text-navy-900">Restoration considerations</h2>
                <div className="mt-5 space-y-7">
                  {car.restoration.map((r) => (
                    <div key={r.heading}>
                      <h3 className="font-display text-[1.05rem] text-navy-900">{r.heading}</h3>
                      <p className="mt-2 leading-[1.7] text-navy-800">{r.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="car-issues" className="mt-12 rounded-sm border-2 border-navy-800 bg-cream-50 p-6">
                <h2 id="car-issues" className="font-display text-xl text-navy-900">Common issues to check</h2>
                <ul className="mt-4 space-y-2.5">
                  {car.commonIssues.map((i) => (
                    <li key={i} className="flex gap-3 text-[0.95rem] leading-[1.6] text-navy-800">
                      <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 rotate-45 bg-burgundy-600" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {[
                  { h: 'Parts availability', t: car.partsAvailability },
                  { h: 'Documentation', t: car.documentation },
                ].map((s) => (
                  <section key={s.h}>
                    <h2 className="font-display text-[1.1rem] text-navy-900">{s.h}</h2>
                    <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-navy-800">{s.t}</p>
                  </section>
                ))}
              </div>

              <section aria-labelledby="car-own" className="mt-10">
                <h2 id="car-own" className="font-display text-[1.1rem] text-navy-900">Ownership considerations</h2>
                <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-navy-800">{car.ownership}</p>
              </section>

              {car.gallery.length > 1 && (
                <section aria-labelledby="car-gallery" className="mt-12">
                  <h2 id="car-gallery" className="font-display text-2xl text-navy-900">Gallery</h2>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    {car.gallery.map((g) => (
                      <Figure key={g} slug={g} sizes="(min-width: 640px) 21rem, 100vw" />
                    ))}
                  </div>
                </section>
              )}

              {car.faq.length > 0 && (
                <section aria-labelledby="car-faq" className="mt-14 border-t-2 border-navy-800 pt-8">
                  <h2 id="car-faq" className="font-display text-2xl text-navy-900">Frequently asked questions</h2>
                  <dl className="mt-6 space-y-6">
                    {car.faq.map((f) => (
                      <div key={f.q} className="border-b border-navy-100 pb-6 last:border-b-0">
                        <dt className="font-display text-[1.05rem] leading-snug text-navy-900">{f.q}</dt>
                        <dd className="mt-2.5 leading-[1.7] text-navy-800">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <aside className="mt-10 space-y-2 border-t border-navy-200 pt-6 text-[0.82rem] leading-relaxed text-navy-600">
                <p>{TRADEMARK_NOTICE}</p>
                <p>{INDEPENDENCE_NOTICE}</p>
              </aside>
            </div>

            <aside className="lg:sticky lg:top-8">
              <h2 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">Other vehicle profiles</h2>
              <ul className="space-y-4">
                {others.map((c) => (
                  <li key={c.slug} className="border-b border-navy-100 pb-4 last:border-b-0">
                    <Link to={`/classic-cars/${c.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-navy-500">{c.years}</span>
                      <span className="mt-1 block font-display text-[0.98rem] text-navy-900 group-hover:text-burgundy-700">{c.name}</span>
                      <span className="mt-1.5 block text-[0.85rem] leading-[1.55] text-navy-600">{c.dek}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.85rem]">
                <Link to="/classic-cars" className="font-semibold text-burgundy-700 underline underline-offset-4">All {cars.length} profiles</Link>
              </p>
            </aside>
          </div>
        </Section>
      </main>
    </>
  )
}
