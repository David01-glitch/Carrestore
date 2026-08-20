import { Figure } from './Figure'
import type { Block } from '../content/types'

export const slugifyHeading = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const calloutStyles: Record<string, { wrap: string; label: string; icon: string }> = {
  safety: { wrap: 'border-burgundy-300 bg-burgundy-50', label: 'text-burgundy-800', icon: 'Safety' },
  caution: { wrap: 'border-brass-300 bg-brass-50', label: 'text-brass-800', icon: 'Before you start' },
  note: { wrap: 'border-navy-200 bg-navy-50', label: 'text-navy-700', icon: 'Note' },
  cost: { wrap: 'border-racing-300 bg-racing-50', label: 'text-racing-800', icon: 'On cost' },
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <p key={i} className="mb-5 leading-[1.75] text-navy-800">{b.text}</p>
          case 'h2':
            return (
              <h2 key={i} id={slugifyHeading(b.text)} className="mt-12 mb-4 scroll-mt-28 font-display text-2xl leading-snug text-navy-900 md:text-[1.7rem]">
                {b.text}
              </h2>
            )
          case 'h3':
            return <h3 key={i} className="mt-8 mb-3 font-display text-lg text-navy-900">{b.text}</h3>
          case 'ul':
            return (
              <ul key={i} className="mb-6 space-y-2 pl-5">
                {b.items.map((it, j) => (
                  <li key={j} className="list-disc leading-[1.7] text-navy-800 marker:text-burgundy-600">{it}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="mb-6 space-y-2 pl-5">
                {b.items.map((it, j) => (
                  <li key={j} className="list-decimal leading-[1.7] text-navy-800 marker:font-semibold marker:text-burgundy-600">{it}</li>
                ))}
              </ol>
            )
          case 'checklist':
            return (
              <div key={i} className="mb-8 rounded-sm border border-navy-200 bg-cream-100 p-5">
                <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-500">{b.title}</p>
                <ul className="space-y-2.5">
                  {b.items.map((it, j) => (
                    <li key={j} className="flex gap-3 text-[0.95rem] leading-[1.6] text-navy-800">
                      <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 border border-navy-400 bg-cream-50" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          case 'callout': {
            const s = calloutStyles[b.kind] ?? calloutStyles.note
            return (
              <aside key={i} className={`mb-7 rounded-sm border-l-4 ${s.wrap} p-5`} role="note">
                <p className={`mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] ${s.label}`}>{b.title || s.icon}</p>
                <p className="text-[0.95rem] leading-[1.65] text-navy-800">{b.text}</p>
              </aside>
            )
          }
          case 'table':
            return (
              <div key={i} className="mb-8">
                <div className="overflow-x-auto rounded-sm border border-navy-200">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9rem]">
                    {b.caption && <caption className="px-4 pt-3 text-left text-xs text-navy-500">{b.caption}</caption>}
                    <thead>
                      <tr className="bg-navy-800 text-cream-100">
                        {b.head.map((h, j) => (
                          <th key={j} scope="col" className="px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, j) => (
                        <tr key={j} className="border-t border-navy-100 odd:bg-cream-50 even:bg-white">
                          {row.map((cell, k) => (
                            <td key={k} className="px-4 py-2.5 align-top leading-[1.55] text-navy-800">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          case 'figure':
            return <Figure key={i} slug={b.image} caption={b.caption} className="mb-8" sizes="(min-width: 768px) 42rem, 100vw" />
          case 'terms':
            return (
              <dl key={i} className="mb-8 divide-y divide-navy-100 border-y border-navy-100">
                {b.items.map((it, j) => (
                  <div key={j} className="py-3.5">
                    <dt className="font-semibold text-navy-900">{it.term}</dt>
                    <dd className="mt-1 leading-[1.65] text-navy-700">{it.def}</dd>
                  </div>
                ))}
              </dl>
            )
          default:
            return null
        }
      })}
    </>
  )
}

/** Word count across all prose in a block list — used for honest reading times. */
export function countWords(blocks: Block[]): number {
  let n = 0
  const add = (s: string) => { n += s.trim().split(/\s+/).filter(Boolean).length }
  for (const b of blocks) {
    switch (b.t) {
      case 'p': case 'h2': case 'h3': add(b.text); break
      case 'ul': case 'ol': case 'checklist': b.items.forEach(add); break
      case 'callout': add(b.title); add(b.text); break
      case 'table': b.head.forEach(add); b.rows.forEach((r) => r.forEach(add)); break
      case 'terms': b.items.forEach((i) => { add(i.term); add(i.def) }); break
      case 'figure': if (b.caption) add(b.caption); break
    }
  }
  return n
}

/**
 * Reading time over everything the reader actually sees — body copy plus any FAQ and
 * standfirst — at a conventional 200 words per minute.
 */
export const readingMinutes = (
  blocks: Block[],
  extra: { q: string; a: string }[] = [],
  dek = '',
): number => {
  const extraWords =
    extra.reduce((n, f) => n + `${f.q} ${f.a}`.trim().split(/\s+/).filter(Boolean).length, 0) +
    dek.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round((countWords(blocks) + extraWords) / 200))
}
