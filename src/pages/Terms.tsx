import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import { site, TRADEMARK_NOTICE, INDEPENDENCE_NOTICE } from '../site.config'

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      eyebrow="Legal"
      path="/terms"
      description={`The terms on which ${site.name} is made available — informational content, automotive safety, intellectual property, submissions and limitation of liability.`}
      intro={[
        `These terms govern your use of ${site.name}. They are written to be read rather than skimmed, and they describe how this website actually works.`,
        'Nothing here is legal advice, and these terms do not affect any rights you have under the consumer law of your own country that cannot be excluded by agreement.',
      ]}
      sections={[
        {
          heading: 'Acceptance',
          body: [
            'By using this website you accept these terms. If you do not accept them, please do not use the site.',
            'We may update these terms from time to time. The date at the top of this page shows when they last changed, and continuing to use the site after a change means you accept the revised terms.',
          ],
        },
        {
          heading: 'Website use',
          body: [
            'You may read, print and share this website’s pages for your own personal, non-commercial use, including in the course of restoring or maintaining your own vehicle.',
            'You may not:',
            {
              list: [
                'Republish substantial portions of the content on another website or in another publication without written permission.',
                'Use automated systems to scrape or copy the site in bulk.',
                'Present our content as your own, or remove attribution and licence information from images.',
                'Attempt to interfere with the operation or security of the website.',
                'Use the site for any unlawful purpose.',
              ],
            },
            'Short quotations with a clear link back to the source page are welcome and do not require permission.',
          ],
        },
        {
          heading: 'Informational content',
          body: [
            'Everything on this website is general reference material. It is not a repair manual for any specific vehicle, and it does not take account of the condition, history or specification of your particular car.',
            'Vehicles differ substantially between model years, assembly plants and option packages, and a procedure that is correct for one car may be wrong or unsafe for another. The factory service manual for your exact vehicle, and a qualified professional who can see the car, are the authorities on what your car needs. This website is not.',
            'We make no representation that the information here is complete, current or suitable for any particular purpose.',
          ],
        },
        {
          heading: 'Automotive safety',
          body: [
            'Restoration and maintenance work can be dangerous. Some of it can cause serious or fatal injury if done incorrectly or without the right equipment.',
            'Areas requiring particular care include, without limitation:',
            {
              list: [
                'Working beneath a vehicle, which must always be supported on rated axle stands and never on a jack alone.',
                'Brake system work, where failure has immediate consequences for you and for others.',
                'Fuel system work, welding and any use of heat or flame near fuel lines or tanks.',
                'Compressing suspension springs, which store enough energy to cause fatal injury if released uncontrolled.',
                'Spraying primers, paints and hardeners containing isocyanates, which can cause permanent respiratory sensitisation and require supplied-air breathing equipment.',
                'Electrical work and battery handling, including the risk of fire and of hydrogen ignition.',
                'Handling solvents, chemicals, older brake friction materials that may contain asbestos, and paints that may contain lead.',
                'Running an engine in an enclosed space, where carbon monoxide can accumulate to fatal levels.',
              ],
            },
            'You are responsible for assessing whether you have the skills, equipment and conditions to carry out any work safely, and for complying with the law and regulations that apply where you are. Where you are not certain, use a qualified professional. Nothing on this website should be read as an assurance that a given task is safe for you to do yourself.',
          ],
        },
        {
          heading: 'Intellectual property',
          body: [
            'The written content of this website is our original work and is protected by copyright.',
            'Photographs are used under the terms of their individual licences. Many are public domain or openly licensed; each is credited where its licence requires, and the complete record of files, sources and licence terms is published in the site repository as IMAGE-LICENSES.md. Images remain subject to their own licences, which travel with them — our permission does not extend beyond what those licences allow.',
            TRADEMARK_NOTICE,
          ],
        },
        {
          heading: 'User submissions',
          body: [
            'If you send us a restoration story, photographs or other material for possible publication, you confirm that it is yours to share and that publishing it will not infringe anyone else’s rights.',
            'By submitting material you grant us permission to publish, edit for clarity and length, and retain it on this website. You keep ownership of what you send.',
            'We are not obliged to publish anything submitted, and we may decline or remove material at our discretion. We check submissions before publication and may ask for supporting documentation. We do not pay for submissions and we do not accept payment to publish them.',
          ],
        },
        {
          heading: 'External links',
          body: [
            'This website links to other websites where they are genuinely useful. We do not control those sites, we are not responsible for their content or their practices, and a link is not an endorsement.',
            'Following an external link takes you outside this website and into the terms and privacy practices of whoever operates the destination.',
          ],
        },
        {
          heading: 'Affiliate relationships',
          body: [
            'This website does not currently contain affiliate links or paid placements.',
            'If affiliate relationships are introduced, they will be disclosed clearly on the pages where they appear and described in our affiliate disclosure, and they will not influence editorial judgements. We will not recommend something because it pays.',
          ],
        },
        {
          heading: 'Accuracy',
          body: [
            'We research carefully and correct errors when we find them or when they are pointed out. Even so, this website is provided on an "as is" basis and we do not warrant that it is free of error.',
            `If you find something wrong, please tell us at ${site.email} and we will investigate and correct it. Our approach to corrections is set out in the editorial policy.`,
          ],
        },
        {
          heading: 'Limitation of liability',
          body: [
            'To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of this website or from reliance on information published on it, including damage to vehicles or property, financial loss, or personal injury resulting from work you carry out.',
            'This does not exclude or limit liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot lawfully be excluded.',
            'Nothing in these terms affects your statutory rights as a consumer.',
          ],
        },
        {
          heading: 'Changes to the website',
          body: [
            'We may change, update or remove content at any time, and we may suspend or discontinue the website. Articles are revised as we learn more; where a revision is substantive we change the article’s update date so you can see it has been altered.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            `Questions about these terms should be sent to ${site.email}.`,
            INDEPENDENCE_NOTICE,
          ],
        },
      ]}
      footer={
        <p>
          See also our{' '}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-burgundy-700">privacy policy</Link>,{' '}
          <Link to="/cookie-policy" className="underline underline-offset-4 hover:text-burgundy-700">cookie policy</Link> and{' '}
          <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>.
        </p>
      }
    />
  )
}
