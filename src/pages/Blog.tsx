import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Section, SectionHeading, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { articles } from '../content/articles'
import { readingMinutes } from '../components/Blocks'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function Blog() {
  const [lead, ...rest] = articles
  const trail = [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }]

  return (
    <>
      <Seo
        title="The Journal"
        description="Original articles on classic car restoration: starting a first project, inspecting for rust, budgeting honestly, paint systems, interiors, electrics and long-term ownership."
        path="/blog"
        image="blog-first-restoration"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-12">
          <SectionHeading
            eyebrow="Long-form writing"
            title="The Journal"
            intro="Articles about the decisions that shape a restoration — what to buy, what to fix first, what to pay someone else to do, and what to write down while you do it."
            level={1}
          />
          <p className="mt-6 max-w-3xl leading-[1.75] text-navy-800">
            Everything here is written in-house and updated when we learn something that changes
            the advice. We do not publish sponsored articles, and we do not quote current market
            values or restoration prices — those change by region and by year, and a number
            published once would mislead readers later.
          </p>
        </Section>

        <Section tone="cream" className="py-14">
          <article className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Link to={`/blog/${lead.slug}`} className="group block overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy-600">
              <Figure slug={lead.image} rounded={false} priority className="aspect-[16/10]" imgClassName="h-full w-full transition-transform duration-500 ease-editorial group-hover:scale-[1.03]" sizes="(min-width: 1024px) 48vw, 100vw" showCredit={false} />
            </Link>
            <div>
              <div className="flex flex-wrap gap-2">
                <Plate>{lead.category}</Plate>
                <Plate>{readingMinutes(lead.blocks, lead.faq, lead.dek)} min read</Plate>
              </div>
              <h2 className="mt-4 font-display text-2xl leading-tight text-navy-900 md:text-[1.9rem]">
                <Link to={`/blog/${lead.slug}`} className="hover:text-burgundy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">{lead.title}</Link>
              </h2>
              <p className="mt-4 text-[1.02rem] leading-[1.7] text-navy-700">{lead.dek}</p>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-navy-500">
                Published {fmt(lead.published)} · Updated {fmt(lead.updated)}
              </p>
            </div>
          </article>
        </Section>

        <Section tone="white" className="py-14">
          <h2 className="sr-only">All articles</h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <article key={a.slug} className="group flex flex-col">
                <Link to={`/blog/${a.slug}`} className="block overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy-600">
                  <Figure slug={a.image} rounded={false} className="aspect-[16/10]" imgClassName="h-full w-full transition-transform duration-500 ease-editorial group-hover:scale-[1.04]" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" showCredit={false} />
                </Link>
                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex flex-wrap gap-2">
                    <Plate>{a.category}</Plate>
                    <Plate>{readingMinutes(a.blocks, a.faq, a.dek)} min</Plate>
                  </div>
                  <h3 className="mt-3 font-display text-[1.1rem] leading-snug text-navy-900">
                    <Link to={`/blog/${a.slug}`} className="group-hover:text-burgundy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">{a.title}</Link>
                  </h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-[1.65] text-navy-700">{a.dek}</p>
                  <p className="mt-3 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-navy-500">Updated {fmt(a.updated)}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </main>
    </>
  )
}
