import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import { site } from '../site.config'

export default function AffiliateDisclosure() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      eyebrow="Transparency"
      path="/affiliate-disclosure"
      description={`Whether ${site.name} uses affiliate links, how they would be disclosed, and why they do not influence editorial judgements.`}
      intro={[
        'This page sets out our position on affiliate links and commercial relationships.',
        'As things stand, this website contains no affiliate links, no sponsored posts and no advertising. This page exists to state that plainly, and to set out in advance the rules that would apply if that ever changed.',
      ]}
      sections={[
        {
          heading: 'Current status',
          body: [
            `${site.name} does not currently participate in any affiliate programme. No link on this website earns us a commission, and no page contains advertising or sponsored placement.`,
            'When we mention a type of supplier, a category of part or a kind of service, it is because it is relevant to the subject — not because there is a commercial arrangement behind it.',
          ],
        },
        {
          heading: 'If affiliate links are introduced',
          body: [
            'It is possible that affiliate links will be added in future to help cover the cost of running the site. If that happens, these rules will apply without exception:',
            {
              list: [
                'Clear disclosure on every page that contains an affiliate link, positioned where you will see it before you follow the link — not buried in the footer.',
                'This page will be updated first to describe which programmes are involved and how they work.',
                'Affiliate links will never appear inside a passage of safety-related advice.',
                'Links will not be inserted into paragraphs simply because a product could be mentioned there. The primary purpose of every page will remain original, useful information.',
              ],
            },
          ],
        },
        {
          heading: 'What an affiliate link is',
          body: [
            'An affiliate link is a link that identifies the referring website, so that if you buy something the referring site may receive a small commission from the retailer.',
            'The price you pay is not affected by it. The commission is paid by the retailer out of its own margin.',
          ],
        },
        {
          heading: 'Commissions do not buy favourable coverage',
          body: [
            'This is the part that matters, and it is the commitment we would ask you to hold us to.',
            'A commercial relationship would never determine what we recommend, and it would never suppress criticism. If a product is poor, we would say so whether or not a link to it earns anything. If a widely sold reproduction part fits badly, that is exactly the sort of thing readers need to know.',
            'We would not accept payment in exchange for a positive assessment, and we would not publish content written by a manufacturer or retailer as though it were our own editorial.',
          ],
        },
        {
          heading: 'Why our content is structured to resist this',
          body: [
            'Most of what we publish is method rather than product. Our guides describe how a job is done, what it involves, and where the risks are — not which brand to buy.',
            'Where suppliers do matter, we consistently point readers to model-specific clubs and forums rather than naming businesses ourselves, because owners who have fitted the exact part to the exact car are a better guide than we could be. That is a genuinely better answer for the reader, and it also happens to leave very little surface for commercial influence to attach to.',
          ],
        },
        {
          heading: 'Advertising and sponsored content',
          body: [
            'This website carries no advertising and no sponsored content, and it is not part of an advertising network.',
            'If advertising were introduced, it would be clearly distinguishable from editorial content, it would not be disguised as an article, and it would not be permitted to interfere with reading — no interstitials, no pop-ups over the content, no forced interactions before you can read a page.',
          ],
        },
        {
          heading: 'Questions',
          body: [
            `If you have a question about a commercial relationship, or think something on this site reads as though it were commercially influenced, tell us at ${site.email}. We would rather hear it.`,
          ],
        },
      ]}
      footer={
        <p>
          See also our{' '}
          <Link to="/editorial-policy" className="underline underline-offset-4 hover:text-burgundy-700">editorial policy</Link>,{' '}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-burgundy-700">privacy policy</Link> and{' '}
          <Link to="/terms" className="underline underline-offset-4 hover:text-burgundy-700">terms of use</Link>.
        </p>
      }
    />
  )
}
