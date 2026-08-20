import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { TRADEMARK_NOTICE } from '../site.config'

const ERAS = [
  {
    id: 'pre-war',
    label: 'Before 1942',
    title: 'Mass production and the first American car culture',
    image: 'history-auto-shop-1914',
    text: [
      'The moving assembly line made the automobile an ordinary object rather than a luxury, and the infrastructure that followed — filling stations, repair shops, paved highways, roadside businesses — reshaped American settlement patterns within a generation.',
      'Cars of this period were built to be repaired locally by general mechanics, with simple systems and heavy, serviceable components. That philosophy is visible in what survives: pre-war cars are mechanically approachable, and the constraint on restoring them is usually parts scarcity rather than complexity.',
      'Civilian automobile production in the United States was halted during the Second World War as manufacturing capacity was redirected, which is why the pre-war and post-war periods are treated as distinct eras rather than a continuum.',
    ],
  },
  {
    id: 'post-war',
    label: '1946–1959',
    title: 'Chrome, tailfins and the overhead-valve V8',
    image: 'history-filling-station-1943',
    text: [
      'Post-war prosperity, suburban growth and cheap fuel produced a decade of visual excess and genuine engineering progress at the same time. Bodies grew longer and lower, brightwork multiplied, and tailfins became the defining stylistic signature of the late 1950s.',
      'Underneath, the more consequential change was the widespread adoption of the modern overhead-valve V8. Chevrolet\'s small-block, introduced for 1955, would go on to be produced in enormous numbers across decades and remains one of the most widely understood engines ever made.',
      'The industry also completed its shift from 6-volt to 12-volt electrical systems during this decade, which is why establishing a car\'s actual system voltage and polarity is an essential first step when working on anything from this period.',
    ],
  },
  {
    id: 'muscle',
    label: '1960–1972',
    title: 'Pony cars, muscle cars and the performance decade',
    image: 'history-dc-street',
    text: [
      'Two related but distinct categories emerged. Pony cars — compact, style-led and sold in very large volumes — began with the Mustang in 1964. Muscle cars put large-displacement V8s into intermediate bodies at prices young buyers could reach, a formula the Pontiac GTO established the same year.',
      'Competition between manufacturers drove rapid escalation. Engine options multiplied, appearance packages proliferated, and homologation requirements for stock car racing produced small runs of genuinely unusual vehicles — the aerodynamic superspeedway specials of 1969 and 1970 among them.',
      'This is the period most intensively collected today, and the period where documentation matters most, because the value differences between apparently similar cars are large.',
    ],
  },
  {
    id: 'transition',
    label: '1973–1980',
    title: 'Regulation, fuel crisis and the end of an era',
    image: 'history-riverbank-ca',
    text: [
      'Several pressures converged within a few years. Insurance surcharges on high-performance models removed the young buyers the muscle car class depended on. Emissions regulation tightened and compression ratios fell as unleaded fuel was introduced. Impact bumper requirements changed how cars looked. The 1973 oil crisis then changed what buyers wanted almost overnight.',
      'Cars from this period have historically been overlooked by collectors and are correspondingly among the most affordable classic Americans. That is beginning to change as the generation that grew up with them reaches collecting age — a pattern that has repeated with every previous era.',
    ],
  },
]

export default function AutomotiveHistory() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Automotive History', path: '/automotive-history' }]
  return (
    <>
      <Seo
        title="Automotive History"
        description="The eras of the American automobile — mass production, the post-war chrome decade, the pony and muscle car years, and the regulatory transition that ended them."
        path="/automotive-history"
        image="history-dc-street"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="Context for the cars"
            title="Automotive History"
            intro="Understanding why a car was built the way it was makes restoring it a more informed exercise. Design decisions that look arbitrary usually were not."
            level={1}
          />
          <div className="mt-8 max-w-3xl space-y-4 leading-[1.75] text-navy-800">
            <p>
              Restoration is partly a historical discipline. The correct finish for a bracket, the
              reason a car uses a particular electrical system, the presence of an inspection mark
              in an odd place — these are all artefacts of how and when the vehicle was built, and
              they only make sense in context.
            </p>
            <p>
              This page sketches the four periods that matter most to American classic car
              restorers. The archival photographs accompanying it are drawn from public collections
              and show the environment these cars actually operated in, rather than the way they are
              presented at shows today.
            </p>
          </div>
        </Section>

        <Section tone="cream" className="py-14">
          <div className="space-y-16">
            {ERAS.map((era, i) => (
              <article key={era.id} aria-labelledby={era.id} className="grid gap-8 lg:grid-cols-2 lg:items-start">
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <Figure slug={era.image} sizes="(min-width: 1024px) 30rem, 100vw" />
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-burgundy-700">{era.label}</p>
                  <h2 id={era.id} className="mt-2.5 font-display text-2xl leading-tight text-navy-900">{era.title}</h2>
                  <div className="mt-4 space-y-4 leading-[1.75] text-navy-800">
                    {era.text.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="white" className="py-14">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl text-navy-900">On historical accuracy</h2>
            <div className="mt-4 space-y-4 leading-[1.75] text-navy-800">
              <p>
                Automotive history accumulates plausible stories that turn out, on examination, to
                be unsupported. We try to distinguish between what is documented, what is widely
                believed, and what is genuinely uncertain — and to say which is which rather than
                presenting all three in the same confident register.
              </p>
              <p>
                Period power ratings are a good example. Measurement standards changed during the
                classic era, and there is good reason to think some figures were understated for
                insurance purposes while others were optimistic. Treating them as comparable data
                produces confident conclusions that the underlying evidence does not support.
              </p>
              <p>
                Where we are uncertain, we say so. If you can point us to a primary source that
                corrects something here, we will update the page and note the change — see our{' '}
                <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>.
              </p>
            </div>
            <p className="mt-8 border-t border-navy-200 pt-5 text-[0.82rem] leading-relaxed text-navy-600">{TRADEMARK_NOTICE}</p>
          </div>
        </Section>
      </main>
    </>
  )
}
