import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function Section({
  children,
  className = '',
  tone = 'cream',
  as: Tag = 'section',
  labelledBy,
}: {
  children: ReactNode
  className?: string
  tone?: 'cream' | 'white' | 'navy' | 'blueprint'
  as?: 'section' | 'div'
  labelledBy?: string
}) {
  const tones = {
    cream: 'bg-cream-50 text-navy-900',
    white: 'bg-white text-navy-900',
    navy: 'bg-navy-900 text-cream-100',
    blueprint: 'bg-navy-900 bg-blueprint-grid bg-blueprint text-cream-100',
  }
  return (
    <Tag aria-labelledby={labelledBy} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">{children}</div>
    </Tag>
  )
}

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <p className={`font-mono text-[0.7rem] uppercase tracking-[0.18em] ${tone === 'dark' ? 'text-burgundy-700' : 'text-brass-400'}`}>
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  tone = 'dark',
  level = 2,
}: {
  eyebrow?: string
  title: string
  intro?: string
  id?: string
  tone?: 'dark' | 'light'
  /** Use level 1 for the single page-defining heading; 2 for sections within it. */
  level?: 1 | 2
}) {
  const Heading = level === 1 ? 'h1' : 'h2'
  const size = level === 1 ? 'text-3xl md:text-[2.5rem]' : 'text-2xl md:text-[2rem]'
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading id={id} className={`mt-2.5 font-display leading-tight ${size} ${tone === 'dark' ? 'text-navy-900' : 'text-cream-50'}`}>
        {title}
      </Heading>
      {intro && (
        <p className={`mt-4 text-[1.02rem] leading-[1.7] ${tone === 'dark' ? 'text-navy-700' : 'text-cream-300/90'}`}>{intro}</p>
      )}
    </div>
  )
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}) {
  const variants = {
    primary:
      'bg-burgundy-700 text-cream-50 hover:bg-burgundy-600 focus-visible:outline-burgundy-400',
    secondary:
      'border border-cream-300/40 bg-transparent text-cream-100 hover:border-brass-400 hover:text-brass-300 focus-visible:outline-brass-400',
    ghost:
      'border border-navy-300 bg-transparent text-navy-900 hover:border-burgundy-600 hover:text-burgundy-700 focus-visible:outline-burgundy-500',
  }
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-sm px-5 py-3 text-[0.88rem] font-semibold transition-colors duration-200 ease-editorial focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}

/** Small vintage-manual style label. */
export function Plate({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block border border-navy-300 bg-cream-100 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.13em] text-navy-600 ${className}`}>
      {children}
    </span>
  )
}

export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-prose text-[1.02rem] ${className}`}>{children}</div>
}
