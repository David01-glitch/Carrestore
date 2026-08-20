import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * The production origin is never hard-coded. It comes from SITE_URL (see .env.example).
 * During local development it falls back to http://localhost:4173 so that canonical
 * tags and JSON-LD stay internally consistent while you work.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.SITE_URL || 'http://localhost:4173').replace(/\/+$/, '')
  const ga4Id = env.GA4_ID || ''

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
      __GA4_ID__: JSON.stringify(ga4Id),
      __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor'
            if (id.includes('/src/content/')) return 'content'
            return undefined
          },
        },
      },
    },
    ssgOptions: {
      entry: 'src/main.tsx',
      dirStyle: 'nested',
      formatting: 'none',
      concurrency: 8,
      beastiesOptions: false,
      script: 'defer',
    },
  }
})
