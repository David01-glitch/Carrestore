import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section, SectionHeading } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ContactForm } from '../components/ContactForm'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { site } from '../site.config'

export default function Contact() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]
  return (
    <>
      <Seo
        title="Contact"
        description={`Contact the ${site.name} editorial team by email — corrections, restoration story submissions, image attribution questions and general enquiries.`}
        path="/contact"
        image="garage-service-bay"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-16">
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact"
            intro="We are a small editorial team. Email is the way to reach us, and it is read by a person."
            level={1}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <section aria-labelledby="contact-details">
                <h2 id="contact-details" className="font-display text-xl text-navy-900">Contact details</h2>
                <dl className="mt-4 divide-y divide-navy-100 border-y border-navy-100">
                  <div className="py-4">
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Email</dt>
                    <dd className="mt-1.5">
                      <a href={`mailto:${site.email}`} className="break-all text-[1.02rem] text-burgundy-700 underline underline-offset-4 hover:text-burgundy-800">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  {site.phone && (
                    <div className="py-4">
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Telephone</dt>
                      <dd className="mt-1.5 text-[1.02rem] text-navy-900">{site.phone}</dd>
                    </div>
                  )}
                  {site.address && (
                    <div className="py-4">
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Address</dt>
                      <dd className="mt-1.5 text-[1.02rem] text-navy-900">{site.address}</dd>
                    </div>
                  )}
                  {site.businessHours && (
                    <div className="py-4">
                      <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Hours</dt>
                      <dd className="mt-1.5 text-[1.02rem] text-navy-900">{site.businessHours}</dd>
                    </div>
                  )}
                </dl>

                {!site.phone && !site.address && (
                  <p className="mt-5 rounded-sm border border-navy-200 bg-cream-100 p-4 text-[0.88rem] leading-[1.65] text-navy-700">
                    Email is currently the only published contact channel for this website. We do not
                    list a telephone number or postal address because we will not publish contact
                    details we cannot stand behind. If that changes, this page will be updated.
                  </p>
                )}
                {!site.responseTime && (
                  <p className="mt-4 text-[0.88rem] leading-[1.65] text-navy-700">
                    We do not advertise a guaranteed response time, because we would rather not
                    promise one we might miss. Messages are read and answered as quickly as we
                    reasonably can.
                  </p>
                )}
              </section>

              <section aria-labelledby="contact-what" className="mt-10">
                <h2 id="contact-what" className="font-display text-xl text-navy-900">What we can help with</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    ['Corrections', 'If something we have published is wrong, tell us. Include the page address. Corrections are the messages we act on fastest.'],
                    ['Restoration stories', 'Real, documented projects we might write up. See the community page for what to include.'],
                    ['Image attribution', 'If you are a rights holder and believe an image here is credited incorrectly, we will correct or remove it.'],
                    ['General questions', 'Questions about the site, its sourcing, or how we work.'],
                  ].map(([h, t]) => (
                    <li key={h}>
                      <span className="font-semibold text-navy-900">{h}.</span>{' '}
                      <span className="text-[0.95rem] leading-[1.65] text-navy-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="contact-cant" className="mt-10 rounded-sm border-l-4 border-brass-300 bg-brass-50 p-5">
                <h2 id="contact-cant" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brass-800">What we cannot do</h2>
                <p className="mt-2 text-[0.92rem] leading-[1.65] text-navy-800">
                  We are a publisher, not a restoration shop, a dealer or a parts supplier. We cannot
                  value your car, diagnose a specific fault remotely, recommend individual
                  businesses, or carry out restoration work. For those, your marque club and a
                  qualified local professional are the right places to go.
                </p>
              </section>
            </div>

            <div>
              <ContactForm />
              <p className="mt-5 text-[0.85rem] leading-relaxed text-navy-600">
                For how we handle the information you send us, see our{' '}
                <Link to="/privacy" className="underline underline-offset-4 hover:text-burgundy-700">privacy policy</Link>. For how
                we handle corrections, see our{' '}
                <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>.
              </p>
            </div>
          </div>
        </Section>
      </main>
    </>
  )
}
