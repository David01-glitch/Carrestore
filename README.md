# US Car Restoration

An independent editorial website about American classic car restoration — restoration
guides, vehicle reference profiles, long-form articles and automotive history.

Built as a **prerendered static site**: every route is a real HTML file containing its full
content before any JavaScript runs. React hydrates on top for interactivity, but the site
remains completely readable with JavaScript disabled.

---

## Quick start

```bash
npm install
npm run fetch:images   # downloads and licence-checks all photography (first run only)
npm run dev
```

Production build and preview:

```bash
SITE_URL=https://your-real-domain.com npm run build
npm start
```

---

## Business identity — read this first

The website will **never** display invented business information. There is no fabricated
address, phone number, founder, testimonial, review, award or certification anywhere in it.

Identity lives in **`site.identity.json`**. Every field follows one rule:

- A value may only be published once `"verified": true` is set alongside it.
- A field left as `"value": null` is simply **omitted from the site** — pages are written to
  render nothing rather than substitute a placeholder.

`scripts/validate-config.mjs` runs before every build and **fails the build** if it finds:

- a value present but not marked verified;
- anything matching a placeholder pattern (555 numbers, "123 Main St", Lorem Ipsum,
  `YOUR-…` tokens, `example.com`, TBD/TODO);
- a verified value with no recorded source;
- a place-based schema.org type asserted without a verified address;
- `SITE_URL` missing, non-HTTPS, or pointing at localhost in a production build.

### Current state

| Field | Status |
| --- | --- |
| Email | **Verified** — `Uscarrestoration@gmail.com`, supplied by the owner |
| Legal name | Not verified — omitted |
| Phone | Not verified — omitted |
| Address | Not verified — omitted |
| Business hours | Not verified — omitted |
| Response time | Not verified — omitted |

No public record for a business named "US Car Restoration" tied to that address could be
independently verified, so nothing beyond the email is asserted. To add a real value, put it
in `site.identity.json`, set `verified: true`, record where you confirmed it in `source`, and
rebuild. The contact page and footer will pick it up automatically.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Validates identity/env, prerenders all routes, generates sitemap + robots |
| `npm start` / `npm run preview` | Serves `dist/` with the Express server |
| `npm run check` | TypeScript type check |
| `npm run fetch:images` | Downloads images from Wikimedia Commons, verifies licences, writes `IMAGE-LICENSES.md` |
| `npm run validate:images` | Fails if any image is missing, empty, corrupt, mistyped or undescribed |
| `npm run validate:links` | Fails on broken internal links, `#` placeholders, localhost/staging links, sitemap drift |
| `npm run qa` | Full crawl of the built output — see below |
| `npm run verify` | `check` + `validate:images` + `validate:links` + `qa` |

### What `npm run qa` checks

For every prerendered page: HTTP-servable HTML, exactly one non-empty `<h1>`, unique
`<title>` and meta description, correct self-referencing canonical, complete Open Graph and
Twitter tags, valid JSON-LD (and **no** fabricated `aggregateRating` / `review` / `award`
nodes), `lang` attribute, skip link, single `<main>` landmark, alt text on every image, no
externally hot-linked images, no pop-ups or autoplay, no placeholder copy, no unsupported
superlatives, and a minimum quantity of real prerendered text so a JavaScript-only page
cannot slip through.

It also validates `robots.txt` (must allow AdsBot-Google, must not block assets, must carry
an absolute `Sitemap:` line) and `sitemap.xml` (no 404s, no query strings, no duplicates,
every URL actually built).

---

## Images

All **71** photographs are stored locally under `src/assets/images/` and served from this
domain. **Nothing is hot-linked** from an external image host at runtime.

Sources are Wikimedia Commons files under public domain, CC0, CC BY or CC BY-SA licences.
`scripts/fetch-images.mjs` re-checks each licence at download time against an allow-list and
**refuses** anything non-commercial or no-derivatives, so a restrictive licence cannot enter
the build. Each file is verified to be a real, non-truncated JPEG/PNG before being written.

Every image is downloaded once, resized to 480 / 960 / 1600 px and emitted as both JPEG and
WebP, then served via `<picture>` with `srcset` and explicit `width`/`height`.

Attribution appears in three places: a credit line under editorial figures, the
[`/image-credits`](src/pages/ImageCredits.tsx) page listing every image, and
[`IMAGE-LICENSES.md`](IMAGE-LICENSES.md), which is generated — edit
`scripts/image-manifest.mjs` and re-run `npm run fetch:images` rather than editing it by hand.

To change images: edit `scripts/image-manifest.mjs`, then `npm run fetch:images`.

---

## Analytics and consent

Analytics is **off unless you supply your own GA4 property** via `GA4_ID`.

When `GA4_ID` is empty:
- no analytics script is loaded, no cookies are set;
- the cookie banner does not render at all — there would be nothing to consent to;
- the privacy and cookie policies describe this state accurately, because they read the
  same value at build time.

When `GA4_ID` is set, the gate is in the code rather than the wording:
1. Google Consent Mode defaults are declared **denied** before any tag can load.
2. The GA script is not injected into the page until consent is granted.
3. Rejecting leaves the site fully functional; nothing is withheld or degraded.
4. IP anonymisation on; Google advertising signals and ad personalisation off.
5. No names, email addresses or message contents are ever sent to analytics.

Only set `GA4_ID` to a property you own or are authorised to use.

---

## Forms

Neither form has a third-party backend in this build, and neither pretends to.

- **Contact form** — validates in the browser, then composes a pre-filled message to the
  published address. Nothing is transmitted to or stored by the site.
- **Newsletter form** — validates locally and says plainly that no mailing list is connected
  yet. It does not silently discard addresses.

To wire a real endpoint, replace the body of `submit()` in
`src/components/ContactForm.tsx` / `src/components/NewsletterForm.tsx`. The loading, success
and error states already exist. Update `/privacy` before switching either on.

---

## Deployment

### AWS Amplify Hosting (configured)

`amplify.yml` builds and publishes `dist/`, and runs `validate:images`, `validate:links` and
`qa` as part of the build — a deployment that would ship a broken link or a missing image
fails instead.

**Set `SITE_URL` in the Amplify console** (App settings → Environment variables) to your real
domain. Until you do, the build falls back to the branch's own
`https://<branch>.<app-id>.amplifyapp.com` URL so it never emits a hard-coded or invented
domain. Optionally set `GA4_ID`.

`customHttp.yml` supplies security headers and cache policy (immutable for fingerprinted
assets, always-revalidate for HTML).

No rewrite rules are required: every route is a real `index.html`, so Amplify serves clean
URLs directly without redirects.

### Self-hosting

`npm start` runs `server.js` — Express with compression, security headers, correct cache
headers, `/healthz`, a genuine 404 status for unknown paths, and **no trailing-slash
redirects**, so crawlers get a `200` on the first request.

---

## Tech stack

React 19 · Vite 7 · TypeScript (strict) · Tailwind CSS 3 · React Router 6 ·
`vite-react-ssg` for static generation · Express 4 + compression for serving · `sharp` for
image processing.

No animation libraries, no UI framework, no client-side data fetching. Transitions are plain
CSS and respect `prefers-reduced-motion`.

---

## Editorial position

Recorded here because it is enforced in code as well as in prose:

- No fabricated business identity, testimonials, reviews, ratings, awards or credentials.
  Articles are published under the editorial team's name rather than invented bylines.
- **No current market values or restoration price tables.** These vary by region, condition
  and date; a figure published once would mislead readers later. Content points to auction
  results and marque clubs instead.
- No claimed affiliation with any vehicle manufacturer. A trademark notice appears on every
  page naming one.
- Safety-relevant topics (brakes, fuel, welding, spraying, spring compression, working under
  a vehicle) carry explicit warnings and recommend professional involvement rather than
  implying the work is straightforward.
- No advertising, sponsored content or affiliate links in this build. See
  `/affiliate-disclosure` for the rules that apply if that changes.

The QA script enforces several of these mechanically — fabricated `aggregateRating` or
`review` nodes in JSON-LD, unsupported superlatives, and unverified audience figures all
fail the build.
