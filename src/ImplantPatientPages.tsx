import { PageLayout } from './PageLayout';
import ImplantConsultationLinks from './components/ImplantConsultationLinks';
import SiteLink from './components/SiteLink';

export function ImplantFinancingPage() {
  return (
    <PageLayout
      kicker="Patient information"
      title="Dental Implant Cost & Financing"
      subtitle="Find out what to ask about your first visit, what goes into a treatment estimate, and how insurance and financing may help."
      description="Learn how NorthStar estimates dental implant and full-arch treatment costs, what your written estimate can include, and how to discuss insurance and financing."
      ctaLabel="Request a Consultation"
      ctaHref="/contact/#consultation"
    >
      <section className="page-section implant-start" id="first-implant-visit" aria-labelledby="first-implant-visit-title">
        <h2 id="first-implant-visit-title">What will my first visit cost?</h2>
        <p>Before booking, <a href="tel:6313151400">call 631-315-1400</a> to confirm the consultation fee, what it covers, and whether any recommended 3D imaging would be billed separately.</p>
        <p>Bring the questions you most want answered. At the evaluation, we’ll talk about what’s getting in the way of eating or smiling, review your oral health, and explain which options may fit. You can ask about temporary teeth, how many visits to plan for, and what information we still need to prepare a written estimate.</p>
      </section>
      <section className="page-section implant-start">
        <h2>What goes into your estimate?</h2>
        <p>The cost depends on how many teeth you need to replace, the type of restoration, and whether your plan includes procedures such as extractions or bone grafting. NorthStar provides both implant surgery and the final restoration.</p>
        <p>Ask for a written, itemized estimate that shows which of these services your plan includes:</p>
        <ul>
          <li>Evaluation, imaging, and treatment planning</li>
          <li>Extractions, grafting, implant surgery, and anesthesia or sedation, when applicable</li>
          <li>Temporary teeth, if planned, and the final crown, bridge, or full-arch restoration</li>
          <li>Follow-up visits included in the estimate and any separately billed maintenance</li>
        </ul>
        <p>Explore <SiteLink href="/dental-implants/">dental implants</SiteLink> or <SiteLink href="/full-arch/">full-arch implants</SiteLink> to see how treatment is planned.</p>
      </section>
      <section className="page-section">
        <h2>Insurance and financing</h2>
        <p>Coverage depends on your plan and the services you need. Bring your insurance information so our team can help you review benefits and estimated out-of-pocket costs before treatment.</p>
        <p>Ask about third-party financing if you’d prefer to pay over time. Availability and terms depend on the provider and its approval. Review the total repayment cost, interest, and payment schedule before choosing an option.</p>
      </section>
      <section className="page-section">
        <h2>Request a consultation by office</h2>
        <p>Choose your preferred office and our team will contact you about scheduling. You can also <a className="implant-guide-link" href="tel:6313151400">call 631-315-1400</a>.</p>
        <ImplantConsultationLinks />
      </section>
    </PageLayout>
  );
}

const examples = [
  {
    topic: 'Full-arch implants',
    title: 'Replacing a full set of teeth',
    concern: 'Several teeth in one arch are missing or failing, or a removable denture is difficult to wear.',
    review: 'The consultation can compare a fixed implant bridge with a removable implant-retained denture. Ask when temporary teeth may be fitted and when the final restoration would follow.',
    link: 'Compare full-arch options',
    href: '/full-arch/',
  },
  {
    topic: 'Implant second opinions',
    title: 'When an implant or bridge feels loose',
    concern: 'An existing implant-supported tooth or bridge moves, feels uncomfortable, or has a change in fit.',
    review: 'The evaluation looks at the restoration, the connecting parts, and the implant and surrounding tissue to determine what can be repaired or needs further treatment.',
    link: 'See published clinical examples',
    href: '/specialized/botched-smile/',
  },
  {
    topic: 'Severe bone loss',
    title: 'When there isn’t enough bone for conventional implants',
    concern: 'A patient has been told they may have too little upper-jaw bone to support a conventional implant plan.',
    review: 'An examination and 3D imaging can help evaluate whether grafting, a different anchorage approach, or a removable option may fit the patient’s needs.',
    link: 'Explore options for severe bone loss',
    href: '/specialized/cant-get-implants/',
  },
];

const northStarCasePhotos = [
  { label: 'Before', file: 'northstar-case-4-before.webp', description: 'Retracted view of the teeth before treatment', height: 1105 },
  { label: 'After', file: 'northstar-case-4-after.webp', description: 'Smile after treatment', height: 810 },
];

const chosenGalleryCases = [
  { number: 1, position: 1 },
  { number: 2, position: 11 },
  { number: 3, position: 8 },
];

export function ImplantExamplesPage() {
  return (
    <PageLayout
      kicker="Patient education"
      title="Implant Treatment Examples"
      subtitle="Explore common reasons patients seek implant care and the options NorthStar may discuss during an evaluation."
      ctaLabel="Request a Consultation"
      ctaHref="/contact/#consultation"
    >
      <section className="page-section implant-start before-after-gallery" id="before-after" aria-labelledby="before-after-title">
        <h2 id="before-after-title">Before &amp; After</h2>
        <p>See how dental treatment can refresh the appearance of a smile. These cases were treated by Dr. Peter Kampf. Individual results vary.</p>
        <div className="before-after-cases">
          {chosenGalleryCases.map(({ number, position }) => (
            <figure className="before-after-case" key={position}>
              <img
                src={`/images/case-gallery/chosen-case-${position}.webp`}
                alt={`Case ${number}: pretreatment photo above, post-treatment photo below`}
                width={1013}
                height={1080}
                loading="lazy"
                decoding="async"
              />
              <figcaption>Case {number}</figcaption>
            </figure>
          ))}
          <figure className="before-after-case" id="case-4">
            <div className="before-after-photo-pair">
              {northStarCasePhotos.map(({ label, file, description, height }) => (
                <div className="before-after-photo" key={label}>
                  <span className="before-after-photo-label" aria-hidden="true">{label}</span>
                  <img
                    src={`/images/case-gallery/${file}`}
                    alt={description}
                    width={1200}
                    height={height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <figcaption>Case 4</figcaption>
          </figure>
        </div>
        <p className="before-after-credit">Cases 1–3 were originally published in the <a className="implant-guide-link" href="https://www.chosenimplantstudio.com/smile-gallery">Chosen Implant Studio Smile Gallery</a>.</p>
      </section>
      <section aria-labelledby="implant-examples-title">
        <div className="page-section implant-start">
          <h2 id="implant-examples-title">What we look at in an implant consultation</h2>
          <p>These educational scenarios show what an evaluation can cover. The implant second-opinion page also contains credited examples from published clinical articles.</p>
        </div>
        <div className="implant-case-grid">
          {examples.map(example => (
            <article className="page-section" key={example.href}>
              <p className="implant-case-topic">{example.topic}</p>
              <h3>{example.title}</h3>
              <p>{example.concern}</p>
              <p>{example.review}</p>
              <SiteLink className="implant-guide-link" href={example.href}>{example.link}</SiteLink>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
