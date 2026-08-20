import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Accordion } from '../components/Accordion'
import { Blocks } from '../components/Blocks'
import { Section, SectionHeading, ButtonLink, Eyebrow, Plate } from '../components/ui'
import { topics } from '../content/topics'
import { articles } from '../content/articles'
import { cars } from '../content/cars'
import { guides } from '../content/guides'
import { graph, organizationSchema, websiteSchema } from '../lib/seo'
import { track } from '../lib/analytics'
import { TRADEMARK_NOTICE } from '../site.config'

export default function Home() {
  const featured = articles.slice(0, 3)
  const featuredCars = cars.slice(0, 4)

  return (
    <>
      <Seo
        title="US Car Restoration"
        description="An independent editorial resource on American classic car restoration — practical guides, vehicle histories and reference material for restorers, owners and enthusiasts."
        path="/"
        image="hero-belair-station"
        jsonLd={graph(organizationSchema(), websiteSchema())}
      />

      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className="relative isolate overflow-hidden bg-navy-950">
          <div className="absolute inset-0 -z-10">
            <Figure
              slug="hero-belair-station"
              priority
              rounded={false}
              className="h-full"
              imgClassName="h-full w-full object-cover opacity-45"
              sizes="100vw"
            showCredit={false} />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40"
          />
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <Eyebrow tone="light">Independent automotive reference</Eyebrow>
              <h1 className="mt-4 font-display text-3xl leading-[1.22] text-cream-50 text-shadow-hero sm:text-4xl lg:text-[3.1rem] lg:leading-[1.16]">
                Preserving the Story Behind America&rsquo;s Classic Cars
              </h1>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-cream-200">
                Restoration is part craft, part research and part record-keeping. We publish
                practical guides to bodywork, mechanical and interior restoration, detailed
                profiles of the American cars worth saving, and the historical context that
                explains why they were built the way they were.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-cream-300/90">
                Everything here is written to be useful to someone standing in a garage with a
                project in front of them — not to sell you anything. We are a publisher, not a
                restoration shop.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink to="/restoration-guides">Explore Restoration Guides</ButtonLink>
                <ButtonLink to="/classic-cars" variant="secondary">Browse Classic Cars</ButtonLink>
              </div>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-cream-100/15 pt-6">
                {[
                  { n: String(guides.length), l: 'Restoration guides' },
                  { n: String(cars.length), l: 'Vehicle profiles' },
                  { n: String(articles.length), l: 'Journal articles' },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <span className="block font-display text-2xl text-brass-400">{s.n}</span>
                      <span className="mt-1 block font-mono text-[0.68rem] uppercase tracking-[0.13em] text-cream-300/80">{s.l}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------- Featured topics ---------------- */}
        <Section tone="white" className="py-16 lg:py-20" labelledBy="topics-heading">
          <SectionHeading
            id="topics-heading"
            eyebrow="The six disciplines"
            title="Featured restoration topics"
            intro="Every restoration is a combination of these six areas of work. Each card opens in place — the full text is already on this page, no loading required."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((t) => (
              <article key={t.slug} className="card-garage flex flex-col">
                <Figure
                  slug={t.image}
                  rounded={false}
                  className="aspect-[16/10] overflow-hidden"
                  imgClassName="zoomable h-full w-full"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                showCredit={false} />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.15rem] leading-snug text-navy-900">{t.title}</h3>
                  <p className="mt-2.5 flex-1 text-[0.92rem] leading-[1.65] text-navy-700">{t.summary}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-navy-100 pt-4">
                    {t.facts.map((f) => (
                      <li key={f} className="flex gap-2 text-[0.83rem] leading-[1.55] text-navy-600">
                        <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-burgundy-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-navy-100">
                    <Accordion
                      title="Read guide"
                      eyebrow="In depth"
                      onToggle={(open) => open && track.guideExpanded(t.slug, 'homepage-topic')}
                    >
                      <div className="text-[0.92rem]">
                        <Blocks blocks={t.detail} />
                        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-navy-100 pt-4 text-[0.83rem]">
                          {t.guideLinks.map((g) => {
                            const guide = guides.find((x) => x.slug === g)
                            if (!guide) return null
                            return (
                              <Link key={g} to={`/restoration-guides/${g}`} className="text-burgundy-700 underline underline-offset-4 hover:text-burgundy-800">
                                {guide.title}
                              </Link>
                            )
                          })}
                        </p>
                      </div>
                    </Accordion>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- Vehicles ---------------- */}
        <Section tone="blueprint" className="py-16 lg:py-20" labelledBy="cars-heading">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="cars-heading"
              tone="light"
              eyebrow="Vehicle reference"
              title="The cars worth saving"
              intro="Historical background, generation-by-generation notes, the corrosion and mechanical issues each model is known for, and what parts availability actually looks like."
            />
            <ButtonLink to="/classic-cars" variant="secondary">All vehicle profiles</ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCars.map((c) => (
              <Link
                key={c.slug}
                to={`/classic-cars/${c.slug}`}
                className="group block overflow-hidden rounded-sm border border-navy-700 bg-navy-800/50 transition-colors duration-300 ease-editorial hover:border-brass-500/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-400"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Figure
                    slug={c.image}
                    rounded={false}
                    className="h-full"
                    imgClassName="h-full w-full transition-transform duration-500 ease-editorial group-hover:scale-105"
                    sizes="(min-width: 1024px) 23vw, 50vw"
                  showCredit={false} />
                </div>
                <div className="p-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-brass-400">{c.years}</p>
                  <h3 className="mt-1.5 font-display text-[1.02rem] text-cream-50 group-hover:text-brass-300">{c.name}</h3>
                  <p className="mt-2 text-[0.83rem] leading-[1.55] text-cream-300/85">{c.dek}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 max-w-3xl border-t border-navy-700 pt-5 text-[0.78rem] leading-relaxed text-cream-400/75">
            {TRADEMARK_NOTICE}
          </p>
        </Section>

        {/* ---------------- Journal ---------------- */}
        <Section tone="cream" className="py-16 lg:py-20" labelledBy="journal-heading">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="journal-heading"
              eyebrow="The Journal"
              title="Recent writing"
              intro="Longer-form articles on the decisions that shape a restoration, written for people doing the work."
            />
            <ButtonLink to="/blog" variant="ghost">Read the Journal</ButtonLink>
          </div>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {featured.map((a) => (
              <article key={a.slug} className="group">
                <Link to={`/blog/${a.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy-600">
                  <div className="overflow-hidden rounded-sm">
                    <Figure
                      slug={a.image}
                      rounded={false}
                      className="aspect-[16/10]"
                      imgClassName="h-full w-full transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
                      sizes="(min-width: 768px) 31vw, 100vw"
                    showCredit={false} />
                  </div>
                  <div className="mt-4">
                    <Plate>{a.category}</Plate>
                    <h3 className="mt-3 font-display text-[1.15rem] leading-snug text-navy-900 group-hover:text-burgundy-700">{a.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-[1.65] text-navy-700">{a.dek}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- What this site is ---------------- */}
        <Section tone="white" className="py-16 lg:py-20" labelledBy="about-heading">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div>
              <SectionHeading
                id="about-heading"
                eyebrow="What this site is"
                title="A reference, written plainly"
              />
              <div className="mt-6 max-w-prose space-y-4 text-[1.02rem] leading-[1.75] text-navy-800">
                <p>
                  US Car Restoration is an independent publication about restoring, understanding
                  and owning American classic cars. We are not a restoration shop, a dealer or a
                  parts supplier, and we do not accept payment to write favourably about anything.
                </p>
                <p>
                  That independence shapes what you will find here. We describe methods rather than
                  endorse suppliers. We say when a job is genuinely dangerous and should go to a
                  professional. And we deliberately avoid publishing current market values or
                  restoration price tables, because those figures change by region and by year and
                  a number written once would mislead readers later.
                </p>
                <p>
                  Where a subject involves real risk — brakes, fuel systems, welding, spraying,
                  spring compression, working under a vehicle — we say so directly rather than
                  implying that anyone can safely do it at home.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to="/about" variant="ghost">About us</ButtonLink>
                <ButtonLink to="/editorial-policy" variant="ghost">Editorial policy</ButtonLink>
              </div>
            </div>
            <Figure
              slug="garage-service-bay"
              caption="Restoration happens in ordinary workshops. Our guides are written for that setting rather than for a professional facility."
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Section>
      </main>
    </>
  )
}
