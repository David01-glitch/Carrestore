import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Section, SectionHeading } from '../components/ui'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { allImages } from '../lib/images'
import { graph, breadcrumbSchema, organizationSchema } from '../lib/seo'
import { site } from '../site.config'

export default function ImageCredits() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Image Credits', path: '/image-credits' }]
  const images = allImages().sort((a, b) => (a.folder + a.slug).localeCompare(b.folder + b.slug))
  const needAttribution = images.filter((i) => i.source.attributionRequired).length

  const folders = [...new Set(images.map((i) => i.folder))].sort()

  return (
    <>
      <Seo
        title="Image Credits"
        description="Complete credit and licence information for every photograph published on this website, including creator, licence and original source."
        path="/image-credits"
        jsonLd={graph(organizationSchema(), breadcrumbSchema(trail))}
      />
      <main id="main">
        <Section tone="white" className="pt-8 pb-4"><Breadcrumbs trail={trail} /></Section>

        <Section tone="white" className="pb-16">
          <SectionHeading
            level={1}
            eyebrow="Attribution"
            title="Image Credits"
            intro="Every photograph on this website, with its creator, licence and original source."
          />

          <div className="mt-8 max-w-3xl space-y-4 leading-[1.75] text-navy-800">
            <p>
              All {images.length} photographs used on this site are stored locally and served from
              this domain. Nothing is hot-linked from an external image host. Each is used under a
              licence that permits reuse, and {needAttribution} of them carry licences that require
              attribution to the creator.
            </p>
            <p>
              Images are resized and converted to modern formats for performance. Those derivative
              works are permitted by every licence used here; images under a share-alike licence
              remain under the same licence as their source.
            </p>
            <p>
              If you are a rights holder and believe an image is credited incorrectly or used
              beyond what its licence allows, email{' '}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-burgundy-700">{site.email}</a>{' '}
              and it will be corrected or removed promptly. See our{' '}
              <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link> for
              how images are sourced and checked.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {folders.map((folder) => {
              const rows = images.filter((i) => i.folder === folder)
              const id = `credits-${folder}`
              return (
                <section key={folder} aria-labelledby={id}>
                  <h2 id={id} className="mb-4 font-display text-xl text-navy-900">
                    {folder.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    <span className="ml-3 font-mono text-[0.7rem] font-normal uppercase tracking-[0.13em] text-navy-500">{rows.length} images</span>
                  </h2>
                  <div className="overflow-x-auto rounded-sm border border-navy-200">
                    <table className="w-full min-w-[46rem] border-collapse text-left text-[0.85rem]">
                      <thead>
                        <tr className="bg-navy-800 text-cream-100">
                          <th scope="col" className="px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider">Creator</th>
                          <th scope="col" className="px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider">Licence</th>
                          <th scope="col" className="px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((img) => (
                          <tr key={img.slug} className="border-t border-navy-100 odd:bg-cream-50 even:bg-white align-top">
                            <td className="px-4 py-3 leading-[1.5] text-navy-800">{img.alt}</td>
                            <td className="px-4 py-3 leading-[1.5] text-navy-700">{img.source.author || 'Unknown'}</td>
                            <td className="px-4 py-3 leading-[1.5] text-navy-700">
                              {img.source.licenceUrl ? (
                                <a href={img.source.licenceUrl} rel="noopener noreferrer nofollow" target="_blank" className="underline decoration-dotted underline-offset-2 hover:text-burgundy-700">
                                  {img.source.licence}
                                </a>
                              ) : img.source.licence}
                            </td>
                            <td className="px-4 py-3 leading-[1.5]">
                              <a href={img.source.pageUrl} rel="noopener noreferrer nofollow" target="_blank" className="text-burgundy-700 underline underline-offset-2">
                                {img.source.platform}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
