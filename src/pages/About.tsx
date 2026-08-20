import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { guides } from '../content/guides'
import { articles } from '../content/articles'
import { cars } from '../content/cars'
import { allImages } from '../lib/images'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { site, INDEPENDENCE_NOTICE } from '../site.config'

export default function About() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]
  const imageCount = allImages().length
  return (
    <>
      <Seo
        title="About"
        description={`What ${site.name} is, who it is for, how our articles are researched and reviewed, and how we handle corrections and updates.`}
        path="/about"
        image="garage-service-bay"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-14">
          <SectionHeading
            eyebrow="About us"
            title={`What ${site.name} is`}
            intro="An independent publication about restoring, understanding and owning American classic cars. Not a shop, not a dealer, not a parts supplier."
            level={1}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <div className="min-w-0 space-y-5 text-[1.02rem] leading-[1.75] text-navy-800">
              <p>
                {site.name} publishes reference material for people who work on, buy, or care about
                American classic cars. That means restoration guides organised by the stage of work
                they cover, profiles of the vehicles most commonly restored, longer articles about
                the decisions that shape a project, and the historical context that explains why
                these cars were built the way they were.
              </p>
              <p>
                We sell nothing. There are no vehicles for sale here, no parts catalogue, no
                restoration services and no paid placements. The site exists to be useful to someone
                standing in a garage with a project in front of them.
              </p>

              <h2 className="pt-3 font-display text-2xl text-navy-900">Who this is for</h2>
              <p>
                Primarily people doing the work, or seriously considering it: first-time restorers
                trying to avoid expensive mistakes, experienced owners looking for a second opinion
                on a specific stage, and buyers trying to assess a car before committing. Secondarily
                anyone interested in why American cars of this period look and work the way they do.
              </p>
              <p>
                We assume readers are intelligent and unfamiliar rather than expert, and we try to
                explain the reasoning behind advice rather than issuing instructions. Where a subject
                is genuinely contested — frame-off versus driver quality, original versus reproduction
                parts, whether to start a stored engine — we set out the arguments rather than
                pretending to a consensus that does not exist.
              </p>

              <h2 className="pt-3 font-display text-2xl text-navy-900">Who writes this</h2>
              <p>
                Articles are written and reviewed by the {site.name} editorial team and published
                under that name rather than under individual bylines. We think that is the honest
                way to present it: attaching invented names, or claiming trade certifications we
                cannot evidence, would tell you something false about the authority behind the work.
              </p>
              <p>
                So we will be plain about what our authority actually is. This is a research-led
                publication. Our material is compiled from factory service literature, marque club
                and registry references, published technical works, and the documented experience of
                restorers — not from a workshop we operate. Where a task requires professional
                skill or equipment, we say so and recommend using a professional, rather than
                implying that anyone can safely do it at home.
              </p>

              <h2 className="pt-3 font-display text-2xl text-navy-900">How articles are researched and reviewed</h2>
              <ol className="space-y-2.5 pl-5">
                <li className="list-decimal marker:font-semibold marker:text-burgundy-600">Scope: we identify what a reader actually needs to decide or do, and what falls outside our competence.</li>
                <li className="list-decimal marker:font-semibold marker:text-burgundy-600">Research: primary sources first — factory service literature and club or registry references — before secondary commentary.</li>
                <li className="list-decimal marker:font-semibold marker:text-burgundy-600">Drafting: written to explain reasoning, with uncertainty stated rather than smoothed over.</li>
                <li className="list-decimal marker:font-semibold marker:text-burgundy-600">Review: checked for factual accuracy, for safety-relevant omissions, and for claims that overstate what we can support.</li>
                <li className="list-decimal marker:font-semibold marker:text-burgundy-600">Publication: dated, with an update date maintained separately so you can see when it was last checked.</li>
              </ol>

              <h2 className="pt-3 font-display text-2xl text-navy-900">Corrections and updates</h2>
              <p>
                We will get things wrong. When we do, we want to know, and we would rather correct a
                page than defend it. Email{' '}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-burgundy-700">{site.email}</a>{' '}
                with the page address and what is wrong. Substantive corrections are made to the
                article itself and the update date is changed, so readers can see the page has been
                revised. Our full approach is set out in the{' '}
                <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>.
              </p>

              <h2 className="pt-3 font-display text-2xl text-navy-900">What we deliberately do not publish</h2>
              <ul className="space-y-2 pl-5">
                <li className="list-disc marker:text-burgundy-600"><strong>Current market values or restoration price tables.</strong> These vary by region, condition and date. A figure published once would mislead readers later, so we point to auction results and clubs instead.</li>
                <li className="list-disc marker:text-burgundy-600"><strong>Testimonials, reviews or ratings.</strong> We have none that are genuine and verifiable, so we show none.</li>
                <li className="list-disc marker:text-burgundy-600"><strong>Audience or readership figures.</strong> We are not going to claim a following we cannot evidence.</li>
                <li className="list-disc marker:text-burgundy-600"><strong>Named experts or credentials we cannot verify.</strong> No invented mechanics, no unearned certifications.</li>
                <li className="list-disc marker:text-burgundy-600"><strong>Awards or endorsements.</strong> We have not received any, so we do not display any.</li>
              </ul>

              <h2 className="pt-3 font-display text-2xl text-navy-900">Independence and affiliations</h2>
              <p>{INDEPENDENCE_NOTICE}</p>
              <p>
                This site currently carries no advertising and no affiliate links. If that changes,
                it will be disclosed clearly on the page where it appears and described in our{' '}
                <Link to="/affiliate-disclosure" className="underline underline-offset-4 hover:text-burgundy-700">affiliate disclosure</Link>,
                and editorial decisions will remain independent of it.
              </p>

              <h2 className="pt-3 font-display text-2xl text-navy-900">Images</h2>
              <p>
                Every photograph on this site is stored locally and comes from a source whose licence
                permits reuse — public domain material and openly licensed photography from public
                archives. Nothing is hot-linked from an external host. Each image is credited where
                its licence requires it, and the complete list of files, sources and licences is
                published in the repository as <code className="rounded-sm bg-cream-200 px-1.5 py-0.5 font-mono text-[0.85em]">IMAGE-LICENSES.md</code>.
              </p>
            </div>

            <aside className="space-y-6">
              <Figure slug="garage-service-bay" sizes="(min-width: 1024px) 26rem, 100vw" caption="Our guides are written for ordinary workshops rather than professional restoration facilities." />
              <div className="rounded-sm border border-navy-200 bg-cream-100 p-5">
                <h2 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">What is published here</h2>
                <dl className="space-y-3">
                  {[
                    [String(guides.length), 'Restoration guides'],
                    [String(cars.length), 'Vehicle profiles'],
                    [String(articles.length), 'Journal articles'],
                    [String(imageCount), 'Licensed photographs'],
                  ].map(([n, l]) => (
                    <div key={l} className="flex items-baseline gap-3">
                      <dt className="sr-only">{l}</dt>
                      <dd className="font-display text-xl text-burgundy-700">{n}</dd>
                      <dd className="text-[0.88rem] text-navy-700">{l}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-navy-200 pt-3 text-[0.78rem] leading-relaxed text-navy-600">
                  Counts generated from the site&rsquo;s own content at build time, not estimated.
                </p>
              </div>
              <div className="rounded-sm border border-navy-200 bg-white p-5">
                <h2 className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">Policies</h2>
                <ul className="space-y-2">
                  {[
                    ['/editorial-policy', 'Editorial policy'],
                    ['/affiliate-disclosure', 'Affiliate disclosure'],
                    ['/privacy', 'Privacy policy'],
                    ['/cookie-policy', 'Cookie policy'],
                    ['/terms', 'Terms of use'],
                  ].map(([to, l]) => (
                    <li key={to}>
                      <Link to={to} className="text-[0.9rem] text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Section>
      </main>
    </>
  )
}
