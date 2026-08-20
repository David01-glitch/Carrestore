/** Structured content blocks. Everything renders to real HTML during prerendering. */
export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'checklist'; title: string; items: string[] }
  | { t: 'callout'; kind: 'safety' | 'note' | 'caution' | 'cost'; title: string; text: string }
  | { t: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { t: 'figure'; image: string; caption?: string }
  | { t: 'terms'; items: { term: string; def: string }[] }

export interface Faq {
  q: string
  a: string
}

export interface SourceRef {
  label: string
  note: string
}

export interface Article {
  slug: string
  title: string
  dek: string
  category: ArticleCategory
  image: string
  published: string
  updated: string
  blocks: Block[]
  faq: Faq[]
  related: string[]
  editorialNote?: string
  sources?: SourceRef[]
}

export type ArticleCategory =
  | 'Getting Started'
  | 'Inspection & Buying'
  | 'Bodywork'
  | 'Mechanical'
  | 'Interior'
  | 'Paint & Finish'
  | 'Ownership'
  | 'History'

export interface Guide {
  slug: string
  title: string
  summary: string
  stage: GuideStage
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced'
  image?: string
  blocks: Block[]
  checklist: string[]
  safety?: string
  related: string[]
}

export type GuideStage =
  | 'Assessment'
  | 'Bodywork'
  | 'Mechanical'
  | 'Electrical'
  | 'Finishing'
  | 'Interior'
  | 'Parts & Planning'
  | 'Preservation'

export interface CarProfile {
  slug: string
  /** Hand-written so every profile has a distinct description within search-result length. */
  metaDescription: string
  name: string
  maker: string
  years: string
  dek: string
  image: string
  gallery: string[]
  intro: string[]
  generations: { label: string; years: string; text: string }[]
  restoration: { heading: string; text: string }[]
  partsAvailability: string
  documentation: string
  ownership: string
  commonIssues: string[]
  faq: Faq[]
}

export interface Topic {
  slug: string
  title: string
  image: string
  summary: string
  facts: string[]
  detail: Block[]
  guideLinks: string[]
}
