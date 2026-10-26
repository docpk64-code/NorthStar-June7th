import { PageLayout } from './PageLayout';
import SiteLink from './components/SiteLink';
import { offices, officePath, mapUrl, type OfficeId } from './data/offices';

export default function OfficePage({ officeId }: { officeId: OfficeId }) {
  const office = offices.find(item => item.id === officeId)!;
  return <PageLayout kicker={office.comingSoon ? 'New location · Coming soon' : 'Dr. Peter Kampf & Associates'}
    title={office.comingSoon ? 'Brooklyn Office — Coming Soon' : `Dental Implants in ${office.name}`}
    subtitle={office.intro}
    description={office.comingSoon ? 'NorthStar Implant Dentistry is coming to 32 Court Street, Suite 301, Brooklyn, NY 11201. Opening January 4, 2027. Contact our team for appointment information.' : `Visit NorthStar Implant Dentistry in ${office.name} at ${office.street}, ${office.city}, NY ${office.zip}. Hours, map and appointments: 631-315-1400.`}
    ctaLabel={office.comingSoon ? 'Ask About Brooklyn' : 'Request a Consultation'}>
    <style>{`
      .office-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:1.5rem; align-items:start; }
      .office-page-section { margin-bottom:1.5rem; }
      .office-map { width:100%; height:350px; border:0; border-radius:1rem; }
      .office-actions { display:flex; gap:1rem; flex-wrap:wrap; margin-top:1.25rem; }
      .office-actions a,.office-nav a { color:#755300; font-weight:700; }
      .office-nav { display:flex; flex-wrap:wrap; gap:1rem; padding:1rem 0; }
      .office-status { padding:1rem; background:#fff8e6; border:1px solid #d1a245; border-radius:.75rem; }
      @media(max-width:700px) { .office-grid { grid-template-columns:1fr; } .office-map { height:280px; } }
    `}</style>
    <SiteLink href="/locations/">← All NorthStar locations</SiteLink>
    <div className="office-grid" style={{ marginTop: '1.5rem' }}>
      <section className="page-section office-page-section" aria-label="Office details">
        <p className="page-kicker">{office.comingSoon ? 'Planned office' : 'Your visit'}</p>
        <h2>{office.name}</h2>
        {office.comingSoon && <p className="office-status"><strong>Coming soon — not yet open.</strong><br />Opening January 4, 2027. Please call for appointment information.</p>}
        <address style={{ fontStyle: 'normal', lineHeight: 1.8 }}>{office.street}<br />{office.city}, NY {office.zip}</address>
        <p><strong>{office.comingSoon ? 'Practice phone' : 'Appointments'}:</strong><br /><a href="tel:6313151400">631-315-1400</a></p>
        {!office.comingSoon && <><h3>Office hours</h3><p>Monday–Saturday: 9am–8pm<br />Sunday: By appointment</p><p>Please call to confirm appointment availability before visiting.</p></>}
        <div className="office-actions"><SiteLink href="/contact/">{office.comingSoon ? 'Ask about opening updates' : 'Request an appointment'}</SiteLink><a href={mapUrl(office)} target="_blank" rel="noreferrer">{office.comingSoon ? 'View planned location' : 'Get directions'}</a></div>
      </section>
      <section className="page-section office-page-section">
        <h2>{office.comingSoon ? 'Future Brooklyn location' : `Getting to our ${office.id === 'briarwood' ? 'Briarwood' : office.id === 'commack' ? 'Commack' : 'Manhattan'} office`}</h2>
        <p>{office.arrival}</p>
        <iframe className="office-map" title={`Map of NorthStar ${office.name}${office.comingSoon ? ' planned office' : ' office'}`} src={`${mapUrl(office)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        <p>{office.planning}</p>
      </section>
    </div>
    {!office.comingSoon ? <>
      <section className="page-section office-page-section"><p className="page-kicker">Plan your care</p><h2>A conversation about your next step</h2>
        <p>Whether you are considering replacing one tooth or exploring a broader treatment plan, start by telling our team what you would like to address. Ask about the consultation process and which office is appropriate for the care you need. Treatment recommendations and the location of any procedure are confirmed individually.</p>
        <p>Explore our practice’s information on <SiteLink href="/dental-implants/">dental implants</SiteLink>, <SiteLink href="/full-arch/">full-arch solutions</SiteLink>, <SiteLink href="/wisdom-teeth/">wisdom teeth</SiteLink>, and <SiteLink href="/sedation/">sedation options</SiteLink> before your visit.</p>
        <SiteLink href="/about/">Learn about Dr. Peter Kampf and our practice →</SiteLink>
      </section>
      <section className="page-section office-page-section"><h2>Before your appointment</h2><p>When contacting us, mention the {office.id === 'briarwood' ? 'Briarwood' : office.id === 'commack' ? 'Commack' : 'Manhattan'} office and the reason for your visit. Have your current medication list and relevant dental records available, and ask the team which records or imaging to bring.</p><p>If your visit requires special preparation, the team will explain it when your appointment is confirmed. Review our <SiteLink href="/patient-information/">patient information</SiteLink> and <SiteLink href="/patient-forms/">patient forms</SiteLink> to get started.</p></section>
    </> : <section className="page-section office-page-section"><h2>Need an appointment before Brooklyn opens?</h2><p>Our Briarwood, Manhattan, and Commack offices are currently active. Call <a href="tel:6313151400">631-315-1400</a> to discuss which location works for you. Please confirm the office address when scheduling.</p></section>}
    <section className="page-section"><h2>Explore our other locations</h2><nav className="office-nav" aria-label="Other offices">{offices.filter(item => item.id !== office.id).map(item => <SiteLink key={item.id} href={officePath(item.id)}>{item.name}{item.comingSoon ? ' — Coming soon' : ''}</SiteLink>)}</nav></section>
  </PageLayout>;
}
