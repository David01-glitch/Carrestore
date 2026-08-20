/// <reference types="vite/client" />
/// <reference types="vite-react-ssg" />

declare const __SITE_URL__: string
declare const __GA4_ID__: string
declare const __BUILD_DATE__: string

declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
