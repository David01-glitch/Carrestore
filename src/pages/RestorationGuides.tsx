import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { guides, guideStages } from '../content/guides'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'

export default function RestorationGuides() {
  return (
    <>
      <Seo
        title="Restoration Guides"
        description="Twenty reference guides covering assessment, bodywork, mechanical, electrical, finishing, interior, parts planning and preservation for American classic car restoration."
        path="/restoration-guides"
        image="restoration-hotrod-32"
        jsonLd={graph(organizationSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Restoration Guides', path: '/restoration-guides' }]))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4">
          <Breadcrumbs trail={[{ name: 'Home', path: '/' }, { name: 'Restoration Guides', path: '/restoration-guides' }]} />
        </Section>

        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="Reference library"
            title="Restoration Guides"
            intro="Each guide covers one stage of a restoration: what the work involves, what genuinely cannot be skipped, and where the real risks sit. They are written as reference material for enthusiasts, not as repair procedures for a specific vehicle."
            level={1}
          />
          <div className="mt-8 max-w-3xl space-y-4 leading-[1.75] text-navy-800">
            <p>
              A restoration is not one job. It is a sequence of quite different disciplines —
              structural assessment, metalwork, mechanical rebuilding, electrical repair,
              refinishing, trim, and the planning that holds them together — and each has its own
              methods, its own costs and its own failure modes.
            </p>
            <p>
              These guides are organised in roughly the order the work happens. Assessment comes
              first because everything downstream depends on what the car actually is. Bodywork and
              structure follow, because paint and trim over poor metal is wasted effort. Mechanical
              and electrical work comes next, then finishing and interior, and finally the
              preservation practices that keep a finished car from quietly undoing itself.
            </p>
            <p>
              Where a subject carries genuine physical risk — brake systems, welding near fuel,
              spraying two-pack materials, compressing suspension springs, working beneath a
              vehicle — the guide says so explicitly and recommends professional involvement rather
              than implying the work is straightforward.
            </p>
          </div>
        </Section>

        <Section tone="cream" className="py-14">
          <div className="space-y-14">
            {guideStages.map((stage) => {
              const inStage = guides.filter((g) => g.stage === stage)
              if (!inStage.length) return null
              const id = `stage-${stage.toLowerCase().replace(/[^a-z]+/g, '-')}`
              return (
                <section key={stage} aria-labelledby={id}>
                  <div className="mb-6 flex items-baseline gap-4">
                    <h2 id={id} className="font-display text-xl text-navy-900">{stage}</h2>
                    <span className="h-px flex-1 rule-hairline" aria-hidden="true" />
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-navy-500">
                      {inStage.length} guide{inStage.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {inStage.map((g) => (
                      <article key={g.slug} className="card-garage flex h-full flex-col">
                        {g.image && (
                          <div className="aspect-[16/9] overflow-hidden">
                            <Figure slug={g.image} rounded={false} className="h-full" imgClassName="zoomable h-full w-full" sizes="(min-width: 1024px) 30vw, 50vw" showCredit={false} />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex flex-wrap gap-2">
                            <Plate>{g.difficulty}</Plate>
                            {g.safety && <Plate className="border-burgundy-300 bg-burgundy-50 text-burgundy-800">Safety notes</Plate>}
                          </div>
                          <h3 className="mt-3 font-display text-[1.05rem] leading-snug text-navy-900">
                            <Link to={`/restoration-guides/${g.slug}`} className="hover:text-burgundy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
                              {g.title}
                            </Link>
                          </h3>
                          <p className="mt-2 flex-1 text-[0.9rem] leading-[1.6] text-navy-700">{g.summary}</p>
                          <p className="mt-4 text-[0.83rem] font-semibold text-burgundy-700">
                            <Link to={`/restoration-guides/${g.slug}`} className="underline underline-offset-4">
                              Read the guide<span className="sr-only">: {g.title}</span>
                            </Link>
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </Section>
      </main>
    </>
  )
}
