import { Link } from 'react-router-dom'

export interface Crumb {
  name: string
  path: string
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-navy-500">
        {trail.map((c, i) => {
          const last = i === trail.length - 1
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-navy-700">{c.name}</span>
              ) : (
                <Link to={c.path} className="underline decoration-navy-300 underline-offset-4 transition-colors hover:text-burgundy-700">
                  {c.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className="text-navy-300">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
