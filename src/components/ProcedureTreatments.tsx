import SmilePreviewInvite from './SmilePreviewInvite';
import SiteLink from './SiteLink';
import '../styles/procedureTreatments.css';

const treatments = [
  { title: 'All-on-X Full Arch Implants', href: '/full-arch/', image: 'full-arch', description: 'Explore fixed, full-arch tooth replacement supported by strategically placed dental implants.' },
  { title: 'Dental Implants', href: '/dental-implants/', image: 'dental-implants', description: 'Replace missing teeth with implant-supported restorations designed for function and a natural appearance.' },
  { title: 'Wisdom Teeth Removal', href: '/wisdom-teeth/', image: 'wisdom-teeth', description: 'Evaluation and removal of problematic wisdom teeth, with comfort options and guidance through recovery.' },
  { title: 'IV Sedation & Anesthesia', href: '/sedation/', image: 'sedation', description: 'Explore sedation and anesthesia options tailored to your procedure, medical history, and comfort needs.' },
  { title: 'Oral Biopsy', href: '/procedure/oral-medicine-pathology/', image: 'oral-biopsy', description: 'Evaluation of oral lesions and biopsy procedures to support diagnosis and appropriate treatment.' },
  { title: 'Bone & Sinus Grafting', href: '/procedure/bone-grafting/', image: 'bone-sinus-grafting', description: 'Bone grafting, socket preservation, and sinus augmentation to help build and maintain bone support for dental implants.' },
  { title: 'Dental Extractions', href: '/procedure/tooth-extractions/', image: 'extractions', description: 'Careful removal of damaged or problematic teeth, with attention to comfort, bone preservation, and healing.' },
  { title: 'Exposure of Impacted Teeth', href: '/procedure/impacted-unerupted-teeth/', image: 'impacted-teeth', description: 'Surgical management of impacted or unerupted teeth, coordinated with your orthodontic treatment when needed.' },
];
const additionalProcedures = [
  { title: 'Restorative Coordination', href: '/procedure/restorative-coordination/' },
  { title: 'Remote Anchorage Implants', href: '/procedure/remote-anchorage-implant/' },
  { title: 'Wisdom Teeth Extractions', href: '/procedure/wisdom-teeth-extractions/' },
  { title: 'Full Mouth Reconstruction', href: '/procedure/full-mouth-reconstruction/' },
  { title: 'Pre-Prosthetic Surgery', href: '/procedure/pre-prosthetic-surgery/' },
  { title: 'Maxillary Expansion — MARPE', href: '/procedure/maxillary-expansion-marpe/' },
];
export default function ProcedureTreatments() {
  return <div className="ns-treatments">
    <section className="ns-treatment-section" aria-labelledby="explore-treatment-title">
      <header className="ns-treatment-heading">
        <p className="ns-treatment-eyebrow">Comprehensive care</p>
        <h2 id="explore-treatment-title">Explore Treatments</h2>
        <p>Explore our surgical and implant procedures. Select a card to learn more about your treatment options and what to expect.</p>
      </header>
      <div className="ns-illustrated-treatment-grid">
        {treatments.map((treatment, index) => <SiteLink key={treatment.href} href={treatment.href} className="ns-illustrated-treatment-card">
          <div className="ns-treatment-card-image">
            <img src={'/assets/treatments/' + treatment.image + '.webp'} alt={treatment.title + ' illustration'} width="960" height="720" loading={index < 4 ? 'eager' : 'lazy'} decoding="async" />
          </div>
          <div className="ns-treatment-card-body">
            <h3>{treatment.title}</h3>
            <p>{treatment.description}</p>
            <span className="ns-treatment-learn-more">Learn More <span aria-hidden="true">→</span></span>
          </div>
        </SiteLink>)}
      </div>
    </section>
    <SmilePreviewInvite />
    <section className="ns-additional-procedures" aria-labelledby="additional-procedures-title">
      <h2 id="additional-procedures-title">Additional Procedures</h2>
      <div className="ns-additional-procedure-links">
        {additionalProcedures.map(procedure => <SiteLink key={procedure.href} href={procedure.href}><span>{procedure.title}</span><span aria-hidden="true">→</span></SiteLink>)}
      </div>
    </section>
  </div>;
}
