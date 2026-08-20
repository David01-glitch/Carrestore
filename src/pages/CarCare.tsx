import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Accordion } from '../components/Accordion'
import { Section, SectionHeading } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { guides } from '../content/guides'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { SAFETY_NOTICE } from '../site.config'

const SEASONS = [
  { title: 'Every drive', items: ['Walk around the car and look underneath for fresh fluid on the floor.', 'Check tyre pressures cold, including the spare.', 'Confirm lights, indicators and brake lights before setting off.', 'Listen for anything new during the first mile, when faults are most audible.'] },
  { title: 'Monthly', items: ['Check all fluid levels, and look at the brake fluid’s colour as well as its level.', 'Inspect belts and hoses for cracking, swelling or softness.', 'Check the battery terminals for corrosion and the earth straps for security.', 'Run the car to full operating temperature if it has not been driven.'] },
  { title: 'Seasonally', items: ['Test coolant freeze protection with a hydrometer or refractometer rather than assuming.', 'Inspect brake friction material and check for hydraulic leaks at every wheel.', 'Grease any chassis points the car was built with, following the service manual.', 'Check tyre date codes — age matters more than tread on a low-mileage classic.'] },
  { title: 'Annually', items: ['Change engine oil and filter regardless of mileage covered.', 'Consider a brake fluid change; conventional brake fluid absorbs moisture over time.', 'Have alignment and suspension checked, particularly after any bump or kerb strike.', 'Review insurance valuation against what comparable cars are currently achieving.'] },
]

export default function CarCare() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Car Care', path: '/car-care' }]
  const careGuides = guides.filter((g) => g.stage === 'Preservation')
  return (
    <>
      <Seo
        title="Car Care"
        description="Maintaining a classic American car: cleaning and paint care, fluids, fuel and ethanol, tyre age, storage practice and a practical maintenance schedule."
        path="/car-care"
        image="paint-cadillac-59"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="Keeping it right"
            title="Car Care"
            intro="A restored car is not finished — it is at the beginning of a maintenance relationship that is different from anything a modern vehicle asks for."
            level={1}
          />
        </Section>

        <Section tone="white" className="pb-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <div className="min-w-0 space-y-5 text-[1.02rem] leading-[1.75] text-navy-800">
              <p>
                Classic cars ask for attention on a schedule that has more to do with time than with
                distance. A car covering five hundred miles a year still needs its oil changed, its
                brake fluid considered, and its tyres judged on age rather than tread. The habits
                that keep a modern car healthy — essentially, driving it and following a service
                interval — do not map cleanly onto a vehicle that spends most of its life parked.
              </p>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Paint and brightwork</h2>
              <p>
                Older finishes are generally softer and less chemically resistant than modern
                clearcoats, particularly where a car retains original single-stage paint. Wash with
                a pH-neutral shampoo, use two buckets so grit is not carried back onto the panel,
                and dry with clean microfibre rather than letting water evaporate and leave mineral
                deposits.
              </p>
              <p>
                Be cautious with machine polishing on original paint. Period finishes can be thin,
                and material removed cannot be replaced — on a survivor car, original paint is part
                of what makes it valuable. Chrome and anodised trim respond to gentle cleaning and
                appropriate protection; abrasive metal polishes will eventually cut through plating
                and destroy anodising.
              </p>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Fuel and ethanol</h2>
              <p>
                Modern ethanol-blended fuels present two issues for older vehicles. Ethanol attracts
                moisture, which matters in a car that stands for long periods, and it can degrade
                rubber fuel lines, seals and some older fuel system components that were never
                specified for it. Replacing fuel hoses with modern ethanol-compatible material is a
                sensible precaution, and a stabiliser is worth using where the car will stand.
              </p>
              <p>
                Fuel availability varies considerably by region, and what is appropriate for your
                car depends on its compression ratio and its fuel system. This is a question worth
                asking your marque club rather than generalising about.
              </p>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Fluids and the effect of standing</h2>
              <p>
                Oil should be changed on time rather than on mileage, because it collects acidic
                combustion by-products and moisture that do not disappear while the car sits.
                Conventional brake fluid absorbs moisture from the atmosphere over time, which
                lowers its boiling point and promotes internal corrosion — a periodic change is
                cheap insurance on a system where failure has serious consequences.
              </p>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Tyres age out</h2>
              <p>
                This is the single most commonly overlooked safety item on classic cars. Tyre rubber
                degrades with time whether or not the tyre is used, and a classic covering few miles
                can easily still be running tyres that look almost new and are fifteen years old.
                Read the date code moulded into the sidewall and replace on age. Include the spare.
              </p>
            </div>

            <aside className="space-y-6">
              <Figure slug="paint-cadillac-59" sizes="(min-width: 1024px) 26rem, 100vw" caption="Original and period-correct finishes are softer than modern clearcoats and need gentler care." />
              <div className="rounded-sm border-l-4 border-burgundy-300 bg-burgundy-50 p-5">
                <p className="mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-burgundy-800">Safety</p>
                <p className="text-[0.92rem] leading-[1.65] text-navy-800">
                  Support a vehicle on rated axle stands before working underneath it, never on a
                  jack alone. Never run an engine in an enclosed space. Brake and fuel system work
                  carries direct safety consequences — where you are not equipped to verify the
                  result, use a qualified professional.
                </p>
              </div>
            </aside>
          </div>
        </Section>

        <Section tone="cream" className="py-14">
          <SectionHeading eyebrow="A working schedule" title="Maintenance intervals" intro="Adapt these to your own car and its service manual. Each section opens in place." />
          <div className="mt-8 max-w-3xl rounded-sm border border-navy-200 bg-white px-6">
            {SEASONS.map((s, i) => (
              <Accordion key={s.title} title={s.title} defaultOpen={i === 0}>
                <ul className="space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.95rem] leading-[1.6] text-navy-800">
                      <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 border border-navy-400 bg-cream-50" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[0.85rem] leading-relaxed text-navy-600">{SAFETY_NOTICE}</p>
        </Section>

        <Section tone="white" className="py-14">
          <SectionHeading eyebrow="Go deeper" title="Preservation guides" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {careGuides.map((g) => (
              <article key={g.slug} className="card-garage p-5">
                <h3 className="font-display text-[1.05rem] text-navy-900">
                  <Link to={`/restoration-guides/${g.slug}`} className="hover:text-burgundy-700">{g.title}</Link>
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.6] text-navy-700">{g.summary}</p>
              </article>
            ))}
          </div>
        </Section>
      </main>
    </>
  )
}
