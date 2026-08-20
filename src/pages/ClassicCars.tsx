import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { cars } from '../content/cars'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { TRADEMARK_NOTICE } from '../site.config'

export default function ClassicCars() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Classic Cars', path: '/classic-cars' }]
  return (
    <>
      <Seo
        title="Classic Cars"
        description="Reference profiles of ten historically important American classic cars — history, generations, known restoration issues, parts availability and documentation."
        path="/classic-cars"
        image="belair-57-convertible"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>
        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="Vehicle reference"
            title="Classic Cars"
            intro="Profiles of the American cars most commonly restored, written from the restorer's point of view: what the model actually is, how it changed across generations, where it rusts, and what you can realistically source for it."
            level={1}
          />
          <div className="mt-8 max-w-3xl space-y-4 leading-[1.75] text-navy-800">
            <p>
              Choosing which car to restore is a more consequential decision than most first-time
              restorers realise. Two cars of the same age and apparent condition can differ
              enormously in what they cost to finish, and the difference is usually parts
              availability rather than anything visible in a photograph.
            </p>
            <p>
              Each profile below covers historical background, the important generations and what
              distinguishes them, the corrosion and mechanical problems the model is known for,
              what parts supply actually looks like, and how the car&rsquo;s original specification
              can be documented. Where relevant we note where misrepresentation is common, because
              on several of these models the value gap between an ordinary car and a rare variant
              creates a real incentive for it.
            </p>
            <p>
              We do not publish current market values. Prices vary by region, condition and date,
              and depend heavily on documentation for an individual car. Recent auction results and
              marque registries are the appropriate sources for that.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
            <section aria-labelledby="choosing">
              <h2 id="choosing" className="font-display text-2xl text-navy-900">Choosing a car to restore</h2>
              <div className="mt-4 space-y-4 leading-[1.75] text-navy-800">
                <p>
                  Two considerations dominate, and neither is visible in a photograph. The first is
                  parts availability. A first-generation Mustang or a Tri-Five Chevrolet can be
                  assembled almost entirely from catalogue parts, because reproduction support for
                  those models is extraordinarily deep. A lower-volume car of exactly the same age
                  may leave you searching for a specific piece of trim for two years.
                </p>
                <p>
                  The second is community. A model with an active club and busy forums gives you
                  access to people who have already solved the problem in front of you, and who know
                  which supplier&rsquo;s quarter panel actually fits. That knowledge is worth real
                  money and costs nothing.
                </p>
                <p>
                  Both point the same way for a first project: choose a popular car. The premium you
                  pay over something obscure is usually smaller than what the obscure car costs you
                  in time.
                </p>
              </div>
            </section>

            <section aria-labelledby="structure">
              <h2 id="structure" className="font-display text-2xl text-navy-900">Body-on-frame or unibody</h2>
              <div className="mt-4 space-y-4 leading-[1.75] text-navy-800">
                <p>
                  American cars of the classic era were built both ways, and the difference changes
                  what you inspect and what repair costs. Full-size cars, trucks and most 1950s
                  models use a separate ladder frame carrying a bolted-on body. A rotten body on a
                  sound frame is a bounded problem, and the two can be restored independently.
                </p>
                <p>
                  Most intermediates and pony cars from the mid-1960s onward are unibody, sometimes
                  with a bolt-on front subframe. On these cars the floor pans, rockers, torque boxes
                  and rails <em>are</em> the chassis, which means corrosion in the floors is a
                  structural finding rather than a cosmetic one.
                </p>
                <p>
                  Each profile below states which construction the model uses and where its
                  particular weak points are, because that is what determines whether an attractive
                  car is actually a sensible purchase.
                </p>
              </div>
            </section>
          </div>

          <section aria-labelledby="verify" className="mt-12 max-w-3xl rounded-sm border-l-4 border-brass-300 bg-brass-50 p-6">
            <h2 id="verify" className="font-display text-xl text-navy-900">A note on verification</h2>
            <div className="mt-3 space-y-3 leading-[1.7] text-navy-800">
              <p>
                On several of these models the value gap between an ordinary car and a rare variant
                is very wide, while the visual differences between them are largely cosmetic. Badges,
                stripes and interior trim can be added; a base car can be made to look like something
                far more valuable in a weekend.
              </p>
              <p>
                That means identification matters. Learn what the tags on your chosen marque actually
                encode &mdash; Chrysler VINs of the period record the original engine, GM cowl tags do
                not encode option packages in the way many buyers assume &mdash; and treat an
                expensive claim with no supporting documentation as a reason for caution rather than a
                bargain. Where a marque has a recognised registry or a factory records service, use it.
              </p>
            </div>
          </section>
        </Section>

        <Section tone="cream" className="py-14">
          <h2 className="sr-only">Vehicle profiles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((c) => (
              <article key={c.slug} className="card-garage flex h-full flex-col">
                <Link to={`/classic-cars/${c.slug}`} className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
                  <Figure slug={c.image} rounded={false} className="aspect-[16/10]" imgClassName="zoomable h-full w-full" sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" showCredit={false} />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2">
                    <Plate>{c.maker}</Plate>
                    <Plate>{c.years}</Plate>
                  </div>
                  <h3 className="mt-3 font-display text-[1.15rem] text-navy-900">
                    <Link to={`/classic-cars/${c.slug}`} className="hover:text-burgundy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">{c.name}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-[1.65] text-navy-700">{c.dek}</p>
                  <p className="mt-4 text-[0.83rem] font-semibold text-burgundy-700">
                    <Link to={`/classic-cars/${c.slug}`} className="underline underline-offset-4">Read the {c.name} profile</Link>
                  </p>
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
