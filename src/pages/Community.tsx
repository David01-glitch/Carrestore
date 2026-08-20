import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { site } from '../site.config'

export default function Community() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Community', path: '/community' }]
  return (
    <>
      <Seo
        title="Community"
        description="How to find help with a classic car restoration — marque clubs, owner forums, shows and swap meets — and how to submit a restoration story for publication."
        path="/community"
        image="community-armed-forces-show"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="Where the knowledge lives"
            title="Community"
            intro="Most restoration problems have already been solved by someone who owns the same model. Finding those people is one of the highest-return things a restorer can do."
            level={1}
          />
        </Section>

        <Section tone="white" className="pb-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <div className="min-w-0 space-y-5 text-[1.02rem] leading-[1.75] text-navy-800">
              <p>
                This site publishes reference material. It does not host a forum, and we are careful
                not to pretend to a community we have not built — there are no member counts here,
                no fabricated testimonials, and no invented user profiles.
              </p>
              <p>
                What we can usefully do is point you toward the places where genuine expertise
                already exists, and explain how to get good answers from them.
              </p>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Marque and model clubs</h2>
              <p>
                Model-specific clubs are the single best resource in the hobby. They maintain
                technical references and correct-specification data, publish judging standards, run
                events, and connect you to people who have restored the exact car you are working
                on. Several also hold or provide access to factory production records, which is how
                serious provenance verification actually happens.
              </p>
              <p>
                We deliberately do not maintain a directory of clubs here, because such lists go
                stale and a broken link is worse than no link. Search for the marque and model name
                together with &ldquo;club&rdquo; or &ldquo;owners association&rdquo;, and prefer
                organisations with a long publishing history and a visible technical archive.
              </p>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Forums and how to use them well</h2>
              <p>
                Model-specific forums hold decades of accumulated problem-solving, most of it
                searchable. Before posting, search — the odds that your question is genuinely novel
                are low, and the existing thread usually has more detail than a fresh answer will.
              </p>
              <ul className="space-y-2 pl-5">
                <li className="list-disc marker:text-burgundy-600">State the year, model and specification precisely. Advice that is right for one year is often wrong for the next.</li>
                <li className="list-disc marker:text-burgundy-600">Post clear photographs. Most diagnostic questions are answered faster from an image than from a description.</li>
                <li className="list-disc marker:text-burgundy-600">Say what you have already checked, so people do not repeat it.</li>
                <li className="list-disc marker:text-burgundy-600">Report back with what actually fixed it. That is what makes the thread useful to the next person.</li>
              </ul>

              <h2 className="pt-2 font-display text-2xl text-navy-900">Shows, cruise-ins and swap meets</h2>
              <p>
                Shows are research opportunities as much as social events. A well-documented original
                car on a show field answers questions about correct finishes, fastener types and trim
                details that no photograph in a catalogue will. Most owners are pleased to be asked
                — approach politely, do not touch without permission, and ask specific questions.
              </p>
              <p>
                Swap meets remain the best route to obscure trim and small parts. Attend with a
                written list and reference photographs, and take measurements with you. The part you
                need will appear on a table when you are not looking for it.
              </p>
            </div>

            <aside className="space-y-6">
              <Figure slug="community-armed-forces-show" sizes="(min-width: 1024px) 26rem, 100vw" caption="Shows are where correct finishes and details can be studied on documented cars." />
              <Figure slug="community-street-show" sizes="(min-width: 1024px) 26rem, 100vw" caption="Street events and cruise-ins are usually the most approachable places to ask owners about their cars." />
            </aside>
          </div>
        </Section>

        <Section tone="cream" className="py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading eyebrow="Reader submissions" title="Restoration stories" />
              <div className="mt-5 space-y-4 leading-[1.75] text-navy-800">
                <p>
                  We publish restoration stories, but only real ones. If you have completed or are
                  part-way through a project and would be willing to have it written up, we would
                  like to hear from you.
                </p>
                <p>
                  We ask for documentation — photographs taken during the work, a description of
                  what was actually done, and the parts and suppliers involved — because a story
                  without evidence is not something we are willing to publish as fact. We are just
                  as interested in projects that went wrong as in ones that went well; the useful
                  articles are usually the honest ones.
                </p>
                <p>
                  Submissions are edited for clarity and checked before publication. We do not pay
                  for stories, and we do not accept payment to publish them. Nothing appears with
                  your name on it without your agreement.
                </p>
              </div>
            </div>

            <div className="rounded-sm border-2 border-navy-800 bg-white p-6">
              <h2 className="font-display text-xl text-navy-900">Submitting a story</h2>
              <p className="mt-2 text-[0.95rem] leading-[1.65] text-navy-700">
                Email us with the following and we will reply to discuss it.
              </p>
              <ol className="mt-5 space-y-3">
                {[
                  'The vehicle: year, model, and what specification it is.',
                  'What the project involved, and what stage it has reached.',
                  'Photographs taken during the work, not only of the finished car.',
                  'Anything that went wrong, and what you would do differently.',
                  'Confirmation that the photographs are yours to share.',
                ].map((s, i) => (
                  <li key={s} className="flex gap-3 text-[0.93rem] leading-[1.6] text-navy-800">
                    <span aria-hidden="true" className="font-mono text-[0.8rem] text-burgundy-700">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-navy-200 pt-5 text-[0.92rem]">
                <a href={`mailto:${site.email}?subject=Restoration%20story%20submission`} className="font-semibold text-burgundy-700 underline underline-offset-4 break-all">
                  {site.email}
                </a>
              </p>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-navy-600">
                By submitting you agree to our{' '}
                <Link to="/terms" className="underline underline-offset-4 hover:text-burgundy-700">terms of use</Link>, which cover
                user submissions, and our{' '}
                <Link to="/privacy" className="underline underline-offset-4 hover:text-burgundy-700">privacy policy</Link>.
              </p>
            </div>
          </div>
        </Section>
      </main>
    </>
  )
}
