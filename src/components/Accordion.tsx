import { useId, useState, type ReactNode } from 'react'

/**
 * Accessible disclosure.
 *
 * The panel content is always present in the served HTML — collapsing is a CSS/attribute
 * concern only. That means the text is readable with JavaScript disabled and fully
 * crawlable, and no network request is needed to reveal it.
 */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  onToggle,
  eyebrow,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
  eyebrow?: string
}) {
  const id = useId()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-navy-200 last:border-b-0">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => {
            const next = !open
            setOpen(next)
            onToggle?.(next)
          }}
          className="group flex w-full items-start justify-between gap-4 py-4 text-left transition-colors duration-200 ease-editorial hover:text-burgundy-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-600"
        >
          <span>
            {eyebrow && <span className="mb-1 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy-500">{eyebrow}</span>}
            <span className="font-display text-[1.02rem] leading-snug text-navy-900 group-hover:text-burgundy-700">{title}</span>
          </span>
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 text-xl leading-none text-burgundy-600 transition-transform duration-200 ease-editorial ${open ? 'rotate-45' : ''}`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!open}
        className="pb-5"
      >
        {children}
      </div>
    </div>
  )
}
