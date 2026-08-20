import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Blocks, slugifyHeading, readingMinutes } from '../components/Blocks'
import { Section, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { guides, getGuide } from '../content/guides'
import { graph, breadcrumbSchema, organizationSchema, articleSchema } from '../lib/seo'
import NotFound from './NotFound'
import { SAFETY_NOTICE } from '../site.config'

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>()
  const guide = slug ? getGuide(slug) : undefined
  if (!guide) return <NotFound />

  const headings = guide.blocks.filter((b) => b.t === 'h2') as { t: 'h2'; text: string }[]
  const related = guide.related.map((r) => guides.find((g) => g.slug === r)).filter(Boolean)
  const path = `/restoration-guides/${guide.slug}`
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Restoration Guides', path: '/restoration-guides' },
    { name: guide.title, path },
  ]

  return (
    <>
      <Seo
        title={guide.title}
        description={guide.summary}
        path={path}
        image={guide.image}
        type="article"
        section={guide.stage}
        jsonLd={graph(
          organizationSchema(),
          breadcrumbSchema(trail),
          articleSchema({
            title: guide.title,
            description: guide.summary,
            path,
            image: `/`,
            published: '2025-01-15',
            updated: '2026-02-01',
            section: guide.stage,
          }),
        )}
      />
      <main id="main">
        <Section tone="white" className="pt-8">
          <Breadcrumbs trail={trail} />
        </Section>

        <Section tone="white" className="pb-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Plate>{guide.stage}</Plate>
              <Plate>{guide.difficulty}</Plate>
              <Plate>{readingMinutes(guide.blocks)} min read</Plate>
            </div>
            <h1 className="mt-4 font-display text-3xl leading-tight text-navy-900 md:text-[2.4rem]">{guide.title}</h1>
            <p className="mt-4 text-[1.08rem] leading-[1.7] text-navy-700">{guide.summary}</p>
          </div>
        </Section>

        {guide.image && (
          <Section tone="white" className="pb-10">
            <Figure slug={guide.image} priority className="max-w-4xl" sizes="(min-width: 1024px) 60rem, 100vw" />
          </Section>
        )}

        <Section tone="white" className="pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <article className="min-w-0">
              {guide.safety && (
                <aside role="note" className="mb-8 rounded-sm border-l-4 border-burgundy-400 bg-burgundy-50 p-5">
                  <p className="mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-burgundy-800">Safety</p>
                  <p className="text-[0.95rem] leading-[1.65] text-navy-800">{guide.safety}</p>
                </aside>
              )}

              {headings.length > 2 && (
                <nav aria-labelledby="guide-toc" className="mb-9 rounded-sm border border-navy-200 bg-cream-100 p-5">
                  <h2 id="guide-toc" className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">On this page</h2>
                  <ol className="space-y-1.5">
                    {headings.map((h, i) => (
                      <li key={h.text} className="text-[0.9rem]">
                        <a href={`#${slugifyHeading(h.text)}`} className="text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">
                          <span className="mr-2 font-mono text-[0.75rem] text-navy-400">{String(i + 1).padStart(2, '0')}</span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="text-[1.02rem]">
                <Blocks blocks={guide.blocks} />
              </div>

              <section aria-labelledby="guide-checklist" className="mt-12 rounded-sm border-2 border-navy-800 bg-white p-6">
                <h2 id="guide-checklist" className="font-display text-xl text-navy-900">Practical checklist</h2>
                <p className="mt-1.5 text-[0.88rem] text-navy-600">Work through these before considering this stage complete.</p>
                <ul className="mt-5 space-y-3">
                  {guide.checklist.map((c) => (
                    <li key={c} className="flex gap-3 text-[0.95rem] leading-[1.6] text-navy-800">
                      <span aria-hidden="true" className="mt-[0.42rem] h-3 w-3 shrink-0 border-2 border-navy-500" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <p className="mt-10 border-t border-navy-200 pt-6 text-[0.85rem] leading-relaxed text-navy-600">
                <strong className="font-semibold text-navy-800">Editorial note.</strong> {SAFETY_NOTICE}{' '}
                Read our <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link> for
                how these guides are researched, reviewed and corrected.
              </p>
            </article>

            <aside className="lg:sticky lg:top-8">
              <h2 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">Related guides</h2>
              <ul className="space-y-4">
                {related.map((g) => g && (
                  <li key={g.slug} className="border-b border-navy-100 pb-4 last:border-b-0">
                    <Link to={`/restoration-guides/${g.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-navy-500">{g.stage}</span>
                      <span className="mt-1 block font-display text-[0.98rem] leading-snug text-navy-900 group-hover:text-burgundy-700">{g.title}</span>
                      <span className="mt-1.5 block text-[0.85rem] leading-[1.55] text-navy-600">{g.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.85rem]">
                <Link to="/restoration-guides" className="font-semibold text-burgundy-700 underline underline-offset-4">
                  All {guides.length} restoration guides
                </Link>
              </p>
            </aside>
          </div>
        </Section>
      </main>
    </>
  )
}
