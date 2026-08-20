import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Figure } from '../components/Figure'
import { Blocks, slugifyHeading, readingMinutes } from '../components/Blocks'
import { Section, Plate } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { articles, getArticle } from '../content/articles'
import { graph, breadcrumbSchema, organizationSchema, articleSchema, faqSchema } from '../lib/seo'
import { requireImage, primaryUrl } from '../lib/images'
import { track } from '../lib/analytics'
import { site, SAFETY_NOTICE } from '../site.config'
import NotFound from './NotFound'

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticle(slug) : undefined

  useEffect(() => {
    if (article) track.articleOpened(article.slug, article.category)
  }, [article])

  if (!article) return <NotFound />

  const headings = article.blocks.filter((b) => b.t === 'h2') as { t: 'h2'; text: string }[]
  const related = article.related.map((r) => articles.find((a) => a.slug === r)).filter(Boolean)
  const path = `/blog/${article.slug}`
  const trail = [{ name: 'Home', path: '/' }, { name: 'Journal', path: '/blog' }, { name: article.title, path }]

  return (
    <>
      <Seo
        title={article.title}
        description={article.dek}
        path={path}
        image={article.image}
        type="article"
        published={article.published}
        updated={article.updated}
        section={article.category}
        jsonLd={graph(
          organizationSchema(),
          breadcrumbSchema(trail),
          articleSchema({
            title: article.title,
            description: article.dek,
            path,
            image: primaryUrl(requireImage(article.image)),
            published: article.published,
            updated: article.updated,
            section: article.category,
          }),
          article.faq.length ? faqSchema(article.faq) : null,
        )}
      />
      <main id="main">
        <Section tone="white" className="pt-8"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-8">
          <div className="max-w-3xl">
            <Plate>{article.category}</Plate>
            <h1 className="mt-4 font-display text-3xl leading-[1.18] text-navy-900 md:text-[2.5rem]">{article.title}</h1>
            <p className="mt-5 text-[1.1rem] leading-[1.65] text-navy-700">{article.dek}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-navy-200 py-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-navy-600">
              <span>By the <Link to="/about" className="underline underline-offset-4 hover:text-burgundy-700">{site.name} Editorial Team</Link></span>
              <span aria-hidden="true" className="text-navy-300">·</span>
              <span>Published <time dateTime={article.published}>{fmt(article.published)}</time></span>
              <span aria-hidden="true" className="text-navy-300">·</span>
              <span>Updated <time dateTime={article.updated}>{fmt(article.updated)}</time></span>
              <span aria-hidden="true" className="text-navy-300">·</span>
              <span>{readingMinutes(article.blocks, article.faq, article.dek)} min read</span>
            </div>
          </div>
        </Section>

        <Section tone="white" className="pb-10">
          <Figure slug={article.image} priority className="max-w-4xl" sizes="(min-width: 1024px) 60rem, 100vw" />
        </Section>

        <Section tone="white" className="pb-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:items-start">
            <article className="min-w-0">
              {headings.length > 2 && (
                <nav aria-labelledby="post-toc" className="mb-9 rounded-sm border border-navy-200 bg-cream-100 p-5">
                  <h2 id="post-toc" className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">Table of contents</h2>
                  <ol className="space-y-1.5">
                    {headings.map((h, i) => (
                      <li key={h.text} className="text-[0.9rem]">
                        <a href={`#${slugifyHeading(h.text)}`} className="text-navy-800 underline decoration-navy-300 underline-offset-4 hover:text-burgundy-700">
                          <span className="mr-2 font-mono text-[0.75rem] text-navy-400">{String(i + 1).padStart(2, '0')}</span>{h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <div className="text-[1.04rem]"><Blocks blocks={article.blocks} /></div>

              {article.faq.length > 0 && (
                <section aria-labelledby="post-faq" className="mt-14 border-t-2 border-navy-800 pt-8">
                  <h2 id="post-faq" className="font-display text-2xl text-navy-900">Frequently asked questions</h2>
                  <dl className="mt-6 space-y-6">
                    {article.faq.map((f) => (
                      <div key={f.q} className="border-b border-navy-100 pb-6 last:border-b-0">
                        <dt className="font-display text-[1.05rem] leading-snug text-navy-900">{f.q}</dt>
                        <dd className="mt-2.5 leading-[1.7] text-navy-800">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {article.sources && article.sources.length > 0 && (
                <section aria-labelledby="post-sources" className="mt-12 rounded-sm border border-navy-200 bg-cream-100 p-6">
                  <h2 id="post-sources" className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">References consulted</h2>
                  <dl className="mt-4 space-y-4">
                    {article.sources.map((s) => (
                      <div key={s.label}>
                        <dt className="text-[0.92rem] font-semibold text-navy-900">{s.label}</dt>
                        <dd className="mt-1 text-[0.88rem] leading-[1.6] text-navy-700">{s.note}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <aside className="mt-10 border-t border-navy-200 pt-6 text-[0.85rem] leading-relaxed text-navy-600">
                <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">Editorial note</p>
                <p>{article.editorialNote ?? `Written and reviewed by the ${site.name} editorial team.`} {SAFETY_NOTICE}</p>
                <p className="mt-2">
                  Spotted an error? Email{' '}
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-burgundy-700">{site.email}</a>{' '}
                  and we will correct it. See our{' '}
                  <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>.
                </p>
              </aside>
            </article>

            <aside className="lg:sticky lg:top-8">
              <h2 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">Related reading</h2>
              <ul className="space-y-5">
                {related.map((a) => a && (
                  <li key={a.slug} className="border-b border-navy-100 pb-5 last:border-b-0">
                    <Link to={`/blog/${a.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600">
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.13em] text-navy-500">{a.category}</span>
                      <span className="mt-1 block font-display text-[0.98rem] leading-snug text-navy-900 group-hover:text-burgundy-700">{a.title}</span>
                      <span className="mt-1.5 block text-[0.85rem] leading-[1.55] text-navy-600">{a.dek}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.85rem]">
                <Link to="/blog" className="font-semibold text-burgundy-700 underline underline-offset-4">All {articles.length} articles</Link>
              </p>
            </aside>
          </div>
        </Section>
      </main>
    </>
  )
}
