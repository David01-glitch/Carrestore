import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import { site, GA4_ID } from '../site.config'

export default function CookiePolicy() {
  const analyticsOn = Boolean(GA4_ID)
  return (
    <LegalPage
      title="Cookie Policy"
      eyebrow="Legal"
      path="/cookie-policy"
      description={`Which cookies and browser storage ${site.name} uses, what each is for, and how to control them.`}
      intro={[
        'This page lists every piece of browser storage this website uses. It describes the site as it is actually built, rather than listing categories of cookie that a typical website might set.',
        analyticsOn
          ? 'This site uses one strictly necessary item of local storage, and optional analytics cookies that are only set if you accept them.'
          : 'At present this site sets no tracking cookies of any kind. The only browser storage it uses is a record of your own cookie preference.',
      ]}
      sections={[
        {
          heading: 'Strictly necessary storage',
          body: [
            'One item, used to remember the choice you make about analytics so the banner does not reappear on every page.',
            {
              list: [
                'Name: ucr.consent.v1',
                'Type: browser local storage, not a transmitted cookie',
                'Purpose: records whether you accepted or rejected analytics, and when',
                'Stored: on your own device only. It is never sent to us or to any third party.',
                'Duration: until you clear this site’s data in your browser',
              ],
            },
            'This cannot be switched off, because without it the site has no way to remember that you already answered the question. It contains no identifier and cannot be used to recognise you.',
          ],
        },
        {
          heading: 'Analytics cookies',
          body: analyticsOn
            ? [
                'If, and only if, you accept analytics, Google Analytics 4 is loaded and sets its own cookies to measure which pages people read.',
                {
                  list: [
                    'Set by: Google Analytics 4',
                    'Purpose: aggregate measurement of page views and article engagement',
                    'Set only after you press Accept. If you reject or ignore the banner, the analytics script is never downloaded.',
                    'Configured with IP anonymisation, and with Google advertising signals and ad personalisation disabled.',
                  ],
                },
              ]
            : [
                'None are used. No analytics or measurement property is configured on this website, so no analytics cookies are set and no measurement script is loaded.',
                'The site is built so analytics could be enabled later. If it is, it will be off by default and will require your explicit consent, and this page will be updated to list the cookies involved before it goes live.',
              ],
        },
        {
          heading: 'Advertising cookies',
          body: [
            'None. This website carries no advertising, is not part of an advertising network, and sets no advertising or retargeting cookies.',
          ],
        },
        {
          heading: 'Preference cookies',
          body: [
            'None beyond the consent record described above. This site has no theme switcher, no saved settings and no personalisation, so there is nothing further to store.',
          ],
        },
        {
          heading: 'Third-party requests',
          body: [
            'Web fonts are loaded from Google Fonts. This does not set a cookie, but it does involve a request to Google’s servers, which will see your IP address as part of the normal mechanics of fetching a file.',
            'All images are served from this website. Nothing is loaded from an external image host, so viewing a page does not disclose your visit to any third-party media server.',
          ],
        },
        {
          heading: 'How consent is actually enforced',
          body: [
            'A banner on its own is not compliance. On this site the enforcement sits in the code rather than in the wording.',
            {
              list: [
                'Google Consent Mode defaults are declared as denied before any tag can load.',
                'The analytics script is not injected into the page at all until consent is granted.',
                'Rejecting leaves the site fully functional. No content is withheld and nothing is degraded.',
                'Where no analytics property is configured, the banner does not appear at all, because there would be nothing to consent to.',
              ],
            },
          ],
        },
        {
          heading: 'How to control cookies',
          body: [
            'You can change your choice at any time by clearing this site’s data in your browser. That removes the stored preference, and the banner will appear again on your next visit so you can choose differently.',
            'All major browsers also let you block or delete cookies and local storage entirely through their own settings. Doing so will not prevent this website from working — it will simply ask you about analytics again on each visit.',
          ],
        },
      ]}
      footer={
        <p>
          For the wider picture of what information this site handles, see our{' '}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-burgundy-700">privacy policy</Link>.
        </p>
      }
    />
  )
}
