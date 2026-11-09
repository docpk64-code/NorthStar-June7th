import SiteLink from './SiteLink';
import '../styles/procedureTreatments.css';

const featured = [
  { title: 'Dental Implants', href: '/dental-implants/', icon: 'implant', label: 'Replace missing teeth' },
  { title: 'Full-Arch Solutions', href: '/full-arch/', icon: 'arch', label: 'Rebuild your smile' },
  { title: 'Wisdom Teeth', href: '/wisdom-teeth/', icon: 'tooth', label: 'Thoughtful surgical care' },
  { title: 'Sedation Options', href: '/sedation/', icon: 'comfort', label: 'Comfort at every step' },
];

const procedures = [
  { title: 'Bone Grafting', href: '/procedure/bone-grafting/' },
  { title: 'Sinus Lifts', href: '/procedure/sinus-lifts/' },
  { title: 'Implant Placement', href: '/procedure/implant-placement/' },
  { title: 'Ridge Preservation', href: '/procedure/ridge-preservation/' },
  { title: 'Restorative Coordination', href: '/procedure/restorative-coordination/' },
  { title: 'Remote Anchorage Implants', href: '/procedure/remote-anchorage-implant/' },
  { title: 'Wisdom Teeth Extractions', href: '/procedure/wisdom-teeth-extractions/' },
  { title: 'Full Mouth Reconstruction', href: '/procedure/full-mouth-reconstruction/' },
  { title: 'Oral Medicine & Pathology — Biopsies', href: '/procedure/oral-medicine-pathology/' },
  { title: 'Pre-Prosthetic Surgery', href: '/procedure/pre-prosthetic-surgery/' },
  { title: 'Impacted / Unerupted Teeth', href: '/procedure/impacted-unerupted-teeth/' },
  { title: 'Maxillary Expansion — MARPE', href: '/procedure/maxillary-expansion-marpe/' },
  { title: 'Technology', href: '/procedure/technology/' },
];

function TreatmentIcon({ type }: { type: string }) {
  return <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      {type === 'implant' && <><path d="M25 29V19c0-9 9-11 15-7 6-4 15-2 15 7v10H25Z" /><path d="M31 35h18l-4 27-5 8-5-8-4-27Z" /><path d="m30 41 20-4m-19 12 18-4m-17 12 16-4m-14 12 12-4" stroke="#C9A227" /></>}
      {type === 'arch' && <><path d="M12 48c0-23 13-35 28-35s28 12 28 35c0 12-5 18-11 18-7 0-6-13-6-20 0-11-5-16-11-16s-11 5-11 16c0 7 1 20-6 20-6 0-11-6-11-18Z" /><path d="m23 23 8 8m9-16v14m17-6-8 8M15 39l13 4m24 0 13-4M15 55l12-3m26 0 12 3" stroke="#C9A227" /></>}
      {type === 'tooth' && <><path d="M40 17c-10-9-25-4-25 10 0 13 8 20 10 31 1 10 6 13 9 4l6-17 6 17c3 9 8 6 9-4 2-11 10-18 10-31 0-14-15-19-25-10Z" /><path d="m31 20 9 4 9-4" stroke="#C9A227" /><path d="M60 9v10m-5-5h10" stroke="#C9A227" /></>}
      {type === 'comfort' && <><path d="M54 13a27 27 0 1 0 13 43A27 27 0 0 1 54 13Z" /><path d="M57 28v12m-6-6h12m-1-22v6m-3-3h6" stroke="#C9A227" /><path d="m29 46 7 6 13-15" stroke="#C9A227" /></>}
    </g>
  </svg>;
}

export default function ProcedureTreatments() {
  return <div className="ns-treatments">
    <section className="page-section ns-treatment-section" aria-labelledby="explore-treatment-title">
      <header className="ns-treatment-heading">
        <p className="page-kicker">Explore treatments</p>
        <h2 id="explore-treatment-title">A clear path to your next chapter.</h2>
        <div className="ns-treatment-rule" aria-hidden="true"><span /></div>
        <p>Select a treatment to explore the procedure, preparation, and care.</p>
      </header>
      <div className="ns-treatment-featured">
        <SiteLink href="/procedure/tooth-extractions/" className="ns-treatment-card ns-treatment-extraction" aria-label="Dental Extractions — explore the procedure">
          <div className="ns-treatment-artwork"><img src="/assets/dental-extractions-treatment.webp" alt="Dental extractions: problem tooth, gentle removal, and healing begins." width="1448" height="1086" loading="eager" /></div>
          <div className="ns-treatment-image-footer"><span>Explore Dental Extractions</span><span className="ns-treatment-arrow" aria-hidden="true">↗</span></div>
        </SiteLink>
        {featured.map(treatment => <SiteLink key={treatment.href} href={treatment.href} className="ns-treatment-card ns-treatment-feature">
          <div className="ns-treatment-icon"><TreatmentIcon type={treatment.icon} /></div>
          <p className="ns-treatment-label">{treatment.label}</p>
          <h3>{treatment.title}</h3>
          <div className="ns-treatment-card-footer"><span>Explore treatment</span><span className="ns-treatment-arrow" aria-hidden="true">↗</span></div>
        </SiteLink>)}
      </div>
    </section>
    <section className="page-section ns-treatment-section" aria-labelledby="more-procedures-title">
      <header className="ns-treatment-heading ns-treatment-heading-small">
        <p className="page-kicker">Comprehensive care</p>
        <h2 id="more-procedures-title">Explore more procedures.</h2>
      </header>
      <div className="ns-procedure-card-grid">
        {procedures.map((procedure, index) => <SiteLink key={procedure.href} href={procedure.href} className="ns-treatment-card ns-procedure-card">
          <span className="ns-procedure-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3>{procedure.title}</h3>
          <div className="ns-treatment-card-footer"><span>View procedure</span><span className="ns-treatment-arrow" aria-hidden="true">↗</span></div>
        </SiteLink>)}
      </div>
    </section>
  </div>;
}
