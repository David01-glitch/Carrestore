import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { cars } from '../content/cars'
import { articles } from '../content/articles'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { TRADEMARK_NOTICE } from '../site.config'

const MUSCLE = ['dodge-charger', 'pontiac-gto', 'dodge-challenger', 'plymouth-barracuda', 'chevrolet-camaro']

export default function MuscleCars() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Muscle Cars', path: '/muscle-cars' }]
  const profiles = MUSCLE.map((s) => cars.find((c) => c.slug === s)).filter(Boolean)
  return (
    <>
      <Seo
        title="Muscle Cars"
        description="The American muscle car era explained — how the class began, why it ended so abruptly, what makes individual cars historically important, and what restoring one involves."
        path="/muscle-cars"
        image="chevelle-70-ss454"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="An era, not a category"
            title="Muscle Cars"
            intro="A decade of American performance cars, defined by a simple formula and ended abruptly by forces outside the industry's control."
            level={1}
          />
        </Section>

        <Section tone="white" className="pb-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <div className="min-w-0 space-y-5 text-[1.02rem] leading-[1.75] text-navy-800">
              <p>
                The muscle car era is unusually well defined. It begins, by most accounts, with the
                Pontiac GTO in 1964 and effectively ends in the early 1970s. Within that window
                every American manufacturer produced high-performance cars built to a shared
                formula, and the cars they made are now among the most intensively collected
                vehicles in the world.
              </p>
              <h2 className="pt-2 font-display text-2xl text-navy-900">The formula</h2>
              <p>
                What distinguished a muscle car was specific: a large-displacement V8 in an
                intermediate-sized body, priced within reach of young buyers. That combination set
                it apart both from the full-size performance cars that preceded it and from the
                smaller pony cars that ran alongside it. The GTO demonstrated the idea worked
                commercially, and within three years the class was crowded with rivals.
              </p>
              <p>
                The distinction between muscle cars and pony cars is worth keeping straight, because
                it is frequently blurred. Pony cars — the Mustang, the Camaro, the Barracuda — were
                compact, style-led and sold in enormous volumes with engines ranging from mild sixes
                upward. Muscle cars were intermediate-sized and defined by their engines. Several
                models sat in both categories depending on how they were optioned, which is part of
                why the terms are used loosely.
              </p>
              <h2 className="pt-2 font-display text-2xl text-navy-900">Why it ended so quickly</h2>
              <p>
                Several pressures arrived at once. Insurance companies began surcharging
                high-performance models heavily, which removed the young buyers the class had been
                built for. Emissions regulation tightened through the early 1970s and compression
                ratios fell as unleaded fuel arrived, reducing output across the board. The 1973 oil
                crisis changed what buyers wanted almost overnight. Within roughly three model
                years, the cars that had defined the American market were largely gone.
              </p>
              <p>
                That abruptness is a large part of why the era is collected as intensively as it is.
                It was a distinct period with a clear beginning and a clear end, and the cars made in
                it were not made again.
              </p>
              <h2 className="pt-2 font-display text-2xl text-navy-900">What this means for restorers</h2>
              <p>
                Muscle car restoration carries one characteristic that sets it apart: the value gap
                between an ordinary car and a documented rare variant is very wide, and the visual
                differences between them are often cosmetic. That creates a genuine incentive for
                misrepresentation, and it means documentation matters more here than in almost any
                other corner of the hobby.
              </p>
              <p>
                Practically, that means learning to read the identification for the marque you are
                buying — Chrysler VINs encode the original engine, GM cowl tags do not encode option
                packages in the way many buyers assume — and treating an expensive claim without
                supporting paperwork as a reason for caution rather than a bargain.
              </p>
              <p>
                Structurally, most of these cars are unibody, which means floor pans, rockers,
                torque boxes and frame rails are the chassis. Corrosion in those areas is a
                structural finding, not a cosmetic one, and it is where inspection effort belongs.
              </p>
            </div>

            <aside className="space-y-6">
              <Figure slug="chevelle-70-ss454" sizes="(min-width: 1024px) 26rem, 100vw" caption="A 1970 Chevelle SS 454 — the intermediate-body, big-engine formula that defined the class." />
              <div className="rounded-sm border border-navy-200 bg-cream-100 p-5">
                <h2 className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">Related reading</h2>
                <ul className="space-y-3">
                  {['what-makes-a-muscle-car-historically-important', 'original-parts-vs-reproduction-parts', 'how-to-inspect-a-vintage-v8'].map((s) => {
                    const a = articles.find((x) => x.slug === s)
                    return a ? (
                      <li key={s}>
                        <Link to={`/blog/${s}`} className="text-[0.9rem] leading-snug text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">{a.title}</Link>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </Section>

        <Section tone="cream" className="py-14">
          <SectionHeading eyebrow="Vehicle profiles" title="Muscle era vehicles" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((c) => c && (
              <article key={c.slug} className="card-garage flex h-full flex-col">
                <Link to={`/classic-cars/${c.slug}`} className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
                  <Figure slug={c.image} rounded={false} className="aspect-[16/10]" imgClassName="zoomable h-full w-full" sizes="(min-width: 1024px) 30vw, 50vw" showCredit={false} />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <Plate>{c.years}</Plate>
                  <h3 className="mt-3 font-display text-[1.1rem] text-navy-900">
                    <Link to={`/classic-cars/${c.slug}`} className="hover:text-burgundy-700">{c.name}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9rem] leading-[1.6] text-navy-700">{c.dek}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl border-t border-navy-200 pt-5 text-[0.82rem] leading-relaxed text-navy-600">{TRADEMARK_NOTICE}</p>
        </Section>
      </main>
    </>
  )
}
