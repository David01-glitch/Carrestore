import type { ReactNode } from 'react'
import { Seo } from './Seo'
import { Section, SectionHeading } from './ui'
import { Breadcrumbs } from './Breadcrumbs'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { BUILD_DATE } from '../site.config'

export interface LegalSection {
  heading: string
  body: (string | { list: string[] })[]
}

export function LegalPage({
  title, eyebrow, description, path, intro, sections, footer, lastUpdated,
}: {
  title: string
  eyebrow: string
  description: string
  path: string
  intro: string[]
  sections: LegalSection[]
  footer?: ReactNode
  lastUpdated?: string
}) {
  const trail = [{ name: 'Home', path: '/' }, { name: title, path }]
  const updated = lastUpdated ?? BUILD_DATE
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>
        <Section tone="white" className="pb-16">
          <SectionHeading eyebrow={eyebrow} title={title} level={1} />
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.13em] text-navy-500">
            Last updated <time dateTime={updated}>{updated}</time>
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <div className="min-w-0">
              <div className="space-y-4 text-[1.02rem] leading-[1.75] text-navy-800">
                {intro.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="mt-10 space-y-9">
                {sections.map((s, i) => {
                  const id = s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  return (
                    <section key={s.heading} aria-labelledby={id}>
                      <h2 id={id} className="scroll-mt-24 font-display text-xl leading-snug text-navy-900">
                        <span aria-hidden="true" className="mr-2.5 font-mono text-[0.8rem] text-burgundy-600">{String(i + 1).padStart(2, '0')}</span>
                        {s.heading}
                      </h2>
                      <div className="mt-3 space-y-3.5">
                        {s.body.map((b, j) =>
                          typeof b === 'string' ? (
                            <p key={j} className="leading-[1.75] text-navy-800">{b}</p>
                          ) : (
                            <ul key={j} className="space-y-2 pl-5">
                              {b.list.map((li) => (
                                <li key={li} className="list-disc leading-[1.7] text-navy-800 marker:text-burgundy-600">{li}</li>
                              ))}
                            </ul>
                          ),
                        )}
                      </div>
                    </section>
                  )
                })}
              </div>

              {footer && <div className="mt-10 border-t border-navy-200 pt-6 text-[0.88rem] leading-relaxed text-navy-600">{footer}</div>}
            </div>

            <nav aria-labelledby="legal-toc" className="rounded-sm border border-navy-200 bg-cream-100 p-5 lg:sticky lg:top-8">
              <h2 id="legal-toc" className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">On this page</h2>
              <ol className="space-y-1.5">
                {sections.map((s, i) => {
                  const id = s.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  return (
                    <li key={s.heading} className="text-[0.87rem]">
                      <a href={`#${id}`} className="text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">
                        <span className="mr-2 font-mono text-[0.72rem] text-navy-400">{String(i + 1).padStart(2, '0')}</span>{s.heading}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>
          </div>
        </Section>
      </main>
    </>
  )
}
