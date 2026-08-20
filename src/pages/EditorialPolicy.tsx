import { Link } from 'react-router-dom'
import { LegalPage } from '../components/LegalPage'
import { site } from '../site.config'

export default function EditorialPolicy() {
  return (
    <LegalPage
      title="Editorial Policy"
      eyebrow="How we work"
      path="/editorial-policy"
      description={`How ${site.name} researches, writes, reviews, corrects and updates its content, and how editorial independence is maintained.`}
      intro={[
        'This page describes how content on this website is produced. It exists so you can judge how much weight to give what you read here, rather than having to take it on trust.',
        'We would rather be useful and honest about our limits than authoritative-sounding and vague about where our information comes from.',
      ]}
      sections={[
        {
          heading: 'Original writing',
          body: [
            'Everything published here is written specifically for this website. We do not republish content from elsewhere, spin existing articles, or syndicate material from content farms.',
            'Each page is written to serve a distinct purpose. We do not pad articles to hit a word count, and we do not repeat the same paragraphs across pages to create the appearance of depth. Where two pages touch the same subject, we link between them rather than duplicating text.',
          ],
        },
        {
          heading: 'Research standards',
          body: [
            'Our material is compiled from documentary sources and from the documented experience of restorers. We are a research-led publication, not a workshop, and we think you should know that when weighing what you read.',
            'Our order of preference for sources is:',
            {
              list: [
                'Factory service literature and original manufacturer documentation for the specific vehicle.',
                'Marque club, owners association and registry references, including published judging standards.',
                'Established technical works and reference books on restoration practice.',
                'Documented accounts from restorers who have carried out the specific work.',
                'Contemporary period sources — road tests, brochures, service bulletins — for historical claims.',
              ],
            },
            'Where a claim rests on something weaker than this, we say so in the text rather than presenting it with unearned confidence.',
          ],
        },
        {
          heading: 'Source selection',
          body: [
            'We prefer primary sources to commentary about them. Where a widely repeated claim turns out to trace back to no identifiable source, we either omit it or describe it as commonly believed rather than established.',
            'For historical material in particular, we try to distinguish clearly between what is documented, what is generally accepted, and what is genuinely uncertain — and to signal which is which, rather than presenting all three in the same register.',
          ],
        },
        {
          heading: 'Fact checking',
          body: [
            'Before publication, articles are checked for factual accuracy against the sources used, for safety-relevant omissions, and for claims that overstate what we can actually support.',
            'We pay particular attention to three failure modes: stating a specific figure that varies in reality; describing a procedure as straightforward when it carries real risk; and implying certainty about a historical claim that is actually disputed.',
          ],
        },
        {
          heading: 'What we will not publish',
          body: [
            'Some things are excluded as a matter of policy:',
            {
              list: [
                'Current market values or restoration price tables. These vary by region, condition and date, and a number published once misleads readers later. We point to auction results and marque clubs instead.',
                'Testimonials, reviews, star ratings or customer quotes. We have none that are genuine and verifiable, so we display none.',
                'Audience, readership or subscriber figures. We will not claim a following we cannot evidence.',
                'Named experts, mechanics or trade certifications we cannot verify. Articles are published under the editorial team’s name rather than invented bylines.',
                'Awards, endorsements or accreditations. We have not received any, so none are displayed.',
                'Claims of affiliation with any vehicle manufacturer. We have none.',
                'Guarantees about outcomes — that a method always works, that a repair permanently eliminates rust, or that a modification will produce a specific result.',
              ],
            },
          ],
        },
        {
          heading: 'Safety and scope',
          body: [
            'Restoration content can describe work that is genuinely dangerous. Our policy is to name that risk plainly rather than imply that any task is safe for any reader.',
            'We do not write "anyone can do this". Where a job requires equipment most people do not have, or where an error has serious consequences, we say so and recommend professional involvement. Guides covering brakes, fuel systems, welding, spraying, spring compression, electrical work and working beneath a vehicle carry explicit safety notes.',
            'We also try to be clear about the boundary of our competence. This website explains how things work and what a job involves. It is not a substitute for the factory service manual for your car or for a professional who can inspect it.',
          ],
        },
        {
          heading: 'Corrections',
          body: [
            `If something here is wrong, we want to know. Email ${site.email} with the page address and what is incorrect, and ideally a source.`,
            'How we handle it:',
            {
              list: [
                'Factual errors are corrected in the article itself and the update date is changed, so readers can see the page has been revised.',
                'Where a correction materially changes the advice, we note what changed within the article rather than editing silently.',
                'Typographical and formatting fixes are made without a note.',
                'Where we are asked to change something and disagree, we will say so and explain why, rather than quietly ignoring it.',
              ],
            },
            'We treat corrections as the highest-priority category of message we receive.',
          ],
        },
        {
          heading: 'Updates',
          body: [
            'Articles carry both a publication date and an update date, maintained separately. The update date reflects genuine review or revision — we do not refresh dates cosmetically to make content appear newer than it is.',
            'Content is revisited when a source we relied on changes, when a reader identifies a gap, or when we learn something that alters the advice.',
          ],
        },
        {
          heading: 'Image licensing',
          body: [
            'Every photograph on this website is stored locally and used under a licence that permits reuse. We do not hot-link images from external hosts, and we do not use images sourced from search results without establishing their licence.',
            'Our images come from public archives and openly licensed collections. Licences that forbid commercial use or derivative works are excluded automatically by the build process and cannot enter the site.',
            'Each image is credited where its licence requires it, and the complete record — filename, source, creator, licence and source URL — is published in the site repository as IMAGE-LICENSES.md.',
            `If you are a rights holder and believe an image is credited incorrectly or used without proper permission, contact ${site.email} and we will correct or remove it promptly.`,
          ],
        },
        {
          heading: 'Affiliate relationships and advertising',
          body: [
            'This website currently carries no advertising, no sponsored content and no affiliate links.',
            'If affiliate links are introduced, they will be disclosed on the pages where they appear, described in our affiliate disclosure, and they will not affect what we recommend. We will not accept payment in exchange for a favourable assessment, and we will not publish content written by a third party as though it were our own editorial.',
          ],
        },
        {
          heading: 'Editorial independence',
          body: [
            'We are not affiliated with, endorsed by or authorised by any vehicle manufacturer, parts supplier, restoration business or auction house.',
            'No outside party reviews or approves content before publication. Nobody can buy a mention here, and nobody can have a critical assessment removed by commercial arrangement.',
          ],
        },
      ]}
      footer={
        <p>
          See also our{' '}
          <Link to="/affiliate-disclosure" className="underline underline-offset-4 hover:text-burgundy-700">affiliate disclosure</Link>,{' '}
          <Link to="/about" className="underline underline-offset-4 hover:text-burgundy-700">about page</Link> and{' '}
          <Link to="/terms" className="underline underline-offset-4 hover:text-burgundy-700">terms of use</Link>.
        </p>
      }
    />
  )
}
