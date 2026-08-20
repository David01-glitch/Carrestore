import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import { site, GA4_ID } from '../site.config'

export default function Privacy() {
  const analyticsOn = Boolean(GA4_ID)
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Legal"
      path="/privacy"
      description={`How ${site.name} handles personal information — what is and is not collected, cookies, analytics, and your rights.`}
      intro={[
        `This policy describes how ${site.name} handles personal information. It is written to describe what this website actually does, not what a generic template says a website might do.`,
        'The short version: this is a static informational website. It has no user accounts, no server-side database and no advertising. It collects very little, and the sections below set out precisely what.',
      ]}
      sections={[
        {
          heading: 'Who is responsible for this website',
          body: [
            `This website is published by ${site.legalName ?? site.name}. Questions about this policy, or about information we hold, should be sent to ${site.email}.`,
            site.address
              ? `Our postal address is ${site.address}.`
              : 'Email is our published contact channel. We do not list a postal address or telephone number because we do not publish contact details we cannot stand behind.',
          ],
        },
        {
          heading: 'Information we collect',
          body: [
            'We collect the following, and nothing else:',
            {
              list: [
                'Information you send us by email. If you write to us, we receive your email address and whatever you choose to include. We keep that correspondence only for as long as needed to deal with it.',
                analyticsOn
                  ? 'Analytics data, but only if you have accepted analytics cookies. See the analytics section below.'
                  : 'No analytics data. No analytics or measurement service is configured on this website at present, so no usage data is collected at all.',
                'A record of your cookie choice, stored in your own browser. It never leaves your device and is not readable by us.',
              ],
            },
            'We do not operate user accounts, we do not run a comment system, and we do not maintain a customer database.',
          ],
        },
        {
          heading: 'The contact form',
          body: [
            'The contact form on this site runs entirely inside your browser. It validates what you type and then opens your own email application with a pre-filled message. Nothing you type into it is transmitted to this website or stored on our servers, because there is no server-side endpoint receiving it.',
            'When you send the resulting email, it arrives in an ordinary mailbox and is handled like any other correspondence.',
          ],
        },
        {
          heading: 'The newsletter form',
          body: [
            'No mailing list provider is connected to this website at present. The newsletter form validates your address locally and tells you so — it does not store or transmit your address anywhere. If a mailing list is introduced later, this policy will be updated before it goes live, and it will use explicit opt-in consent with a working unsubscribe link in every message.',
          ],
        },
        {
          heading: 'Cookies and local storage',
          body: [
            'This site uses one piece of browser storage as standard: a record of your cookie preference, so we do not ask again on every page. It is stored locally in your browser and is not transmitted to us.',
            analyticsOn
              ? 'If you accept analytics, Google Analytics sets its own cookies. If you reject, or make no choice, no analytics cookies are set and the analytics script is never loaded.'
              : 'No analytics cookies, advertising cookies or third-party tracking cookies are set by this website, because no such services are configured on it.',
            'Full detail is in our cookie policy.',
          ],
        },
        {
          heading: 'Analytics',
          body: analyticsOn
            ? [
                'This site uses Google Analytics 4, configured so that it does nothing until you actively consent.',
                {
                  list: [
                    'Google Consent Mode defaults are set to denied before the tag loads, so storage is refused from the outset.',
                    'The analytics script itself is not downloaded at all unless you accept.',
                    'IP anonymisation is enabled, and Google advertising signals and ad personalisation are switched off.',
                    'We never send names, email addresses or message contents to analytics.',
                  ],
                },
                'You can change or withdraw your choice at any time by clearing this site’s data in your browser, which removes the stored preference and causes the banner to appear again.',
              ]
            : [
                'No analytics or measurement service is currently running on this website. No usage statistics are collected, and no analytics cookies are set.',
                'The site is built so that analytics can be enabled later by the owner. If that happens, it will be gated behind explicit consent using Google Consent Mode with storage denied by default, and this policy will be updated before it is switched on.',
              ],
        },
        {
          heading: 'Advertising',
          body: [
            'This website carries no advertising and no advertising cookies. It is not part of an advertising network, and no third-party advertising scripts run on it.',
          ],
        },
        {
          heading: 'Affiliate links',
          body: [
            'This website does not currently contain affiliate links. If affiliate links are introduced, they will be disclosed clearly on the pages where they appear and described in our affiliate disclosure. Affiliate networks may set their own cookies when you follow such a link; this policy will be updated to describe that before any are added.',
          ],
        },
        {
          heading: 'Images and third-party content',
          body: [
            'All photographs on this website are stored and served locally. We do not hot-link images from external hosts, which means viewing a page does not disclose your visit to a third-party image server.',
            'The site loads web fonts from Google Fonts. Doing so involves a request to Google’s servers, which will receive your IP address as part of the ordinary mechanics of that request.',
            'Where we link out to other websites, those sites have their own privacy practices and this policy does not cover them.',
          ],
        },
        {
          heading: 'How long we keep information',
          body: [
            'Email correspondence is kept for as long as needed to deal with the matter it concerns, and then deleted in the ordinary course. Your cookie preference stays in your browser until you clear it.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'Depending on where you live, you may have rights over personal information we hold about you — typically to request a copy, to have it corrected, to have it deleted, and to object to certain processing.',
            `Because this website holds so little, in most cases the only information we have about you is email correspondence you initiated. To make a request, or to ask us to delete that correspondence, email ${site.email}.`,
          ],
        },
        {
          heading: 'Children',
          body: [
            'This website is intended for a general adult audience. We do not knowingly collect personal information from children. If you believe a child has sent us personal information, contact us and we will delete it.',
          ],
        },
        {
          heading: 'Changes to this policy',
          body: [
            'If we change how this website handles information, we will update this policy and change the date at the top before the change takes effect. We will not quietly begin collecting something this policy says we do not collect.',
          ],
        },
      ]}
      footer={
        <p>
          See also our{' '}
          <Link to="/cookie-policy" className="underline underline-offset-4 hover:text-burgundy-700">cookie policy</Link>,{' '}
          <Link to="/terms" className="underline underline-offset-4 hover:text-burgundy-700">terms of use</Link> and{' '}
          <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>. This
          policy explains how we handle information; it is not legal advice.
        </p>
      }
    />
  )
}
