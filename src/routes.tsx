import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import { guides } from './content/guides'
import { cars } from './content/cars'
import { articles } from './content/articles'

import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ClassicCars from './pages/ClassicCars'
import CarProfile from './pages/CarProfile'
import RestorationGuides from './pages/RestorationGuides'
import GuidePage from './pages/GuidePage'
import MuscleCars from './pages/MuscleCars'
import CarCare from './pages/CarCare'
import AutomotiveHistory from './pages/AutomotiveHistory'
import Community from './pages/Community'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import EditorialPolicy from './pages/EditorialPolicy'
import AffiliateDisclosure from './pages/AffiliateDisclosure'
import ImageCredits from './pages/ImageCredits'
import NotFound from './pages/NotFound'

/**
 * Every dynamic route enumerates its own paths via getStaticPaths, so each guide,
 * vehicle profile and article is prerendered to its own HTML file at build time.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, element: <Home />, entry: 'src/pages/Home.tsx' },
      { path: 'about', element: <About />, entry: 'src/pages/About.tsx' },

      { path: 'blog', element: <Blog />, entry: 'src/pages/Blog.tsx' },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        entry: 'src/pages/BlogPost.tsx',
        getStaticPaths: () => articles.map((a) => `/blog/${a.slug}`),
      },

      { path: 'classic-cars', element: <ClassicCars />, entry: 'src/pages/ClassicCars.tsx' },
      {
        path: 'classic-cars/:slug',
        element: <CarProfile />,
        entry: 'src/pages/CarProfile.tsx',
        getStaticPaths: () => cars.map((c) => `/classic-cars/${c.slug}`),
      },

      { path: 'restoration-guides', element: <RestorationGuides />, entry: 'src/pages/RestorationGuides.tsx' },
      {
        path: 'restoration-guides/:slug',
        element: <GuidePage />,
        entry: 'src/pages/GuidePage.tsx',
        getStaticPaths: () => guides.map((g) => `/restoration-guides/${g.slug}`),
      },

      { path: 'muscle-cars', element: <MuscleCars />, entry: 'src/pages/MuscleCars.tsx' },
      { path: 'car-care', element: <CarCare />, entry: 'src/pages/CarCare.tsx' },
      { path: 'automotive-history', element: <AutomotiveHistory />, entry: 'src/pages/AutomotiveHistory.tsx' },
      { path: 'community', element: <Community />, entry: 'src/pages/Community.tsx' },
      { path: 'contact', element: <Contact />, entry: 'src/pages/Contact.tsx' },

      { path: 'privacy', element: <Privacy />, entry: 'src/pages/Privacy.tsx' },
      { path: 'terms', element: <Terms />, entry: 'src/pages/Terms.tsx' },
      { path: 'cookie-policy', element: <CookiePolicy />, entry: 'src/pages/CookiePolicy.tsx' },
      { path: 'editorial-policy', element: <EditorialPolicy />, entry: 'src/pages/EditorialPolicy.tsx' },
      { path: 'affiliate-disclosure', element: <AffiliateDisclosure />, entry: 'src/pages/AffiliateDisclosure.tsx' },

      { path: 'image-credits', element: <ImageCredits />, entry: 'src/pages/ImageCredits.tsx' },

      { path: '404', element: <NotFound />, entry: 'src/pages/NotFound.tsx' },
      { path: '*', element: <NotFound />, entry: 'src/pages/NotFound.tsx' },
    ],
  },
]

/** Canonical, indexable routes. Used to generate the sitemap and by the QA crawler. */
export const staticRoutes: string[] = [
  '/', '/about', '/blog', '/classic-cars', '/restoration-guides', '/muscle-cars',
  '/car-care', '/automotive-history', '/community', '/contact',
  '/privacy', '/terms', '/cookie-policy', '/editorial-policy', '/affiliate-disclosure', '/image-credits',
  ...articles.map((a) => `/blog/${a.slug}`),
  ...cars.map((c) => `/classic-cars/${c.slug}`),
  ...guides.map((g) => `/restoration-guides/${g.slug}`),
]
