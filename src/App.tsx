import { useMemo, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import SEOHead from './components/SEOHead';
import SiteLink from './components/SiteLink';
import CompassGraphic from './components/CompassGraphic';
import { menuItems, START_ANGLE, STEP } from './data/menuData';
import type { Wedge } from './types';
import doctorPhoto from './assets/doctor-preview';
import './styles/patientPreview.css';

const care = [
  { n: '01', title: 'Replace a missing tooth', text: 'Explore single-tooth implants and options for replacing several missing teeth.', href: '/dental-implants/' },
  { n: '02', title: 'Restore a full smile', text: 'Learn about full-arch implant options for missing teeth or uncomfortable dentures.', href: '/full-arch/' },
  { n: '03', title: 'Explore a complex case', text: 'Discuss severe bone loss, previous implant problems, or a second opinion.', href: '/specialized/cant-get-implants/' },
];
const locations = [
  { name: 'Briarwood, Queens', address: '139-12 84th Drive, Suite 1G', city: 'Briarwood, NY 11435' },
  { name: 'Manhattan', address: '333 East 34th Street, Suite M1', city: 'New York, NY 10016' },
  { name: 'Commack', address: '283 Commack Road, Suite 130', city: 'Commack, NY 11725' },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [formState, handleSubmit] = useForm('xbdpbdkj');
  const wedges = useMemo<Wedge[]>(() => menuItems.map((item, index) => {
    const centerAngle = START_ANGLE + index * STEP;
    return { item, index, centerAngle, startAngle: centerAngle - STEP / 2, endAngle: centerAngle + STEP / 2 };
  }), []);
  return <div className="patient-preview" id="top">
    <SEOHead title="Dental Implants in Queens, Manhattan & Commack" description="Explore dental implants and full-arch treatment with Dr. Peter Kampf at NorthStar Implant Dentistry in Briarwood, Manhattan, and Commack." />
    <div className="pp-contactbar"><span>Briarwood · Manhattan · Commack</span><a href="tel:6313151400">631-315-1400</a><span>Mon–Sat 9am–8pm · Sunday by appointment</span></div>
    <header className="pp-header">
      <div className="pp-nav-wrap">
        <a className="pp-brand" href="#top"><span className="pp-star" aria-hidden="true">✧</span><span>NorthStar<small>IMPLANT DENTISTRY</small></span></a>
        <button className="pp-menu-button" aria-expanded={open} aria-controls="pp-navigation" onClick={() => setOpen(!open)}>{open ? 'Close menu' : 'Menu ☰'}</button>
        <nav id="pp-navigation" className={open ? 'pp-nav open' : 'pp-nav'} aria-label="Main navigation">
          <SiteLink href="/about/" onClick={() => setOpen(false)}>About</SiteLink>
          <SiteLink href="/dental-implants/" onClick={() => setOpen(false)}>Dental Implants</SiteLink>
          <a href="#treatments" onClick={() => setOpen(false)}>Other Treatments</a>
          <SiteLink href="/patient-information/" onClick={() => setOpen(false)}>Patient Resources</SiteLink>
          <a href="#locations" onClick={() => setOpen(false)}>Locations</a>
          <a className="pp-button" href="#contact" onClick={() => setOpen(false)}>Request a Consultation</a>
        </nav>
      </div>
    </header>
    <main>
      <section className="pp-hero">
        <div className="pp-shell pp-hero-grid">
          <div>
            <p className="pp-eyebrow">Dental implants · Full-arch care · New York</p>
            <h1>A clear path to<br /><em>your new smile.</em></h1>
            <p className="pp-lead">Thoughtful implant care with Dr. Peter Kampf. Explore your options, understand your treatment, and take the next step with confidence.</p>
            <div className="pp-actions"><a className="pp-button" href="#contact">Request a Consultation <span aria-hidden="true">↗</span></a><a className="pp-text-link" href="tel:6313151400">Call 631-315-1400</a></div>
            <p className="pp-tagline">Guiding patients one smile at a time.</p>
          </div>
          <div className="pp-bear"><img src="/assets/hero-bg.jpg" alt="Polar bear cub gazing at the North Star on a winter night" width="500" height="677" /></div>
        </div>
      </section>
      <div className="pp-assurance"><div className="pp-shell"><span>Individual treatment planning</span><span>Digital imaging &amp; evaluation</span><span>Three New York locations</span></div></div>
      <section className="pp-section" id="care-map">
        <div className="pp-shell">
          <p className="pp-eyebrow">Start with what matters to you</p>
          <div className="pp-section-top"><h2>How can we help?</h2><SiteLink className="pp-text-link" href="/procedures/">View all procedures →</SiteLink></div>
          <div className="pp-care-grid">{care.map(item => <SiteLink className="pp-care-card" key={item.n} href={item.href}><span className="pp-number">{item.n}</span><h3>{item.title}</h3><p>{item.text}</p><span className="pp-card-link">Explore your options →</span></SiteLink>)}</div>
        </div>
      </section>
      <section className="pp-doctor pp-section">
        <div className="pp-shell pp-doctor-grid">
          <div className="pp-doctor-image"><img src={doctorPhoto} alt="Dr. Peter Kampf" loading="lazy" /></div>
          <div><p className="pp-eyebrow">Meet your implant dentist</p><h2>Experience matters.<br />So does feeling heard.</h2><h3>Dr. Peter Kampf, DDS</h3><p>Dr. Kampf’s clinical focus includes dental implants and complex oral rehabilitation. Your consultation is an opportunity to discuss your goals, review your options, and ask questions about your care.</p><div className="pp-credentials"><span>NYU College of Dentistry, 1992</span><span>Postgraduate training at Columbia Presbyterian and Brookdale Medical Center</span></div><SiteLink className="pp-text-link" href="/about/">Meet Dr. Kampf &amp; the team →</SiteLink></div>
        </div>
      </section>
      <section className="pp-section" id="treatments"><div className="pp-shell">
        <p className="pp-eyebrow">Care beyond implants</p><h2>Find the care you need.</h2>
        <div className="pp-treatment-grid"><div className="pp-treatment-panel"><h3>Dental &amp; surgical care</h3><SiteLink href="/wisdom-teeth/">Wisdom teeth <span>↗</span></SiteLink><SiteLink href="/procedure/bone-grafting/">Bone grafting <span>↗</span></SiteLink><SiteLink href="/sedation/">Sedation &amp; comfort options <span>↗</span></SiteLink><SiteLink href="/procedures/">All dental procedures <span>↗</span></SiteLink></div><div className="pp-treatment-panel"><h3>Facial aesthetics</h3><p>Explore a separate collection of facial treatments.</p><SiteLink href="/hydrafacial/">HydraFacial <span>↗</span></SiteLink><SiteLink href="/emface/">Emface <span>↗</span></SiteLink></div></div>
      </div></section>
      <section className="pp-journey"><div className="pp-shell"><p className="pp-eyebrow">Your first step, made simple</p><h2>Know what comes next.</h2><div className="pp-steps"><div><span>01 / CONNECT</span><h3>Tell us what you need.</h3><p>Request a consultation and choose your preferred office.</p></div><div><span>02 / UNDERSTAND</span><h3>Explore your options.</h3><p>Meet with the team for an evaluation and a discussion of your goals.</p></div><div><span>03 / PLAN</span><h3>Make an informed choice.</h3><p>Review your proposed care, timing, and fees before deciding.</p></div></div></div></section>
      <section className="pp-section" id="contact"><div className="pp-shell pp-contact-grid"><div><p className="pp-eyebrow">Let’s talk about your smile</p><h2>Your next chapter<br />starts here.</h2><p>Send a consultation request or call our team. We’ll contact you to discuss scheduling.</p><a className="pp-phone" href="tel:6313151400">631-315-1400</a><p>Monday–Saturday: 9am–8pm<br />Sunday: By appointment</p><div className="pp-resource-links"><SiteLink href="/patient-forms/">Patient forms →</SiteLink><SiteLink href="/patient-information/">Prepare for your visit →</SiteLink></div></div>
        <div className="pp-form-panel"><h3>Request a consultation</h3>{formState.succeeded ? <div role="status"><h3>Thank you for reaching out.</h3><p>Your request has been sent. Our team will contact you to discuss scheduling. Your appointment is not yet confirmed.</p></div> : <form onSubmit={handleSubmit}><div className="pp-fields"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><div className="pp-fields"><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label></div><label>Preferred location<select name="location" defaultValue="" required><option value="" disabled>Select an office</option>{locations.map(l=><option key={l.name}>{l.name}</option>)}<option>No preference</option></select></label><label>How can we help?<textarea name="message" rows={3} placeholder="Tell us what you would like to discuss." /></label><p className="pp-form-note">Please avoid including sensitive medical information in this form.</p><ValidationError errors={formState.errors} /><button className="pp-button" disabled={formState.submitting} type="submit">{formState.submitting ? 'Sending…' : 'Send Consultation Request'}</button><p className="pp-form-note">Submitting this form requests a callback, not a confirmed appointment.</p></form>}</div>
      </div></section>
      <section className="pp-locations pp-section" id="locations"><div className="pp-shell"><p className="pp-eyebrow">Close to home</p><h2>Three locations. One NorthStar.</h2><div className="pp-location-grid">{locations.map(l=><div key={l.name}><h3>{l.name}</h3><p>{l.address}<br />{l.city}</p><a className="pp-text-link" href={'https://maps.google.com/?q='+encodeURIComponent(l.address+' '+l.city)}>Get directions ↗</a></div>)}</div></div></section>
      <section className="pp-compass-section"><div className="pp-shell pp-compass-grid"><div><p className="pp-eyebrow">Explore NorthStar</p><h2>Let curiosity<br />be your compass.</h2><p>Prefer to explore? Our signature compass gives you another way to discover the practice and its services.</p><SiteLink className="pp-text-link" href="/procedures/">Browse the procedure list →</SiteLink></div><div className="pp-compass"><CompassGraphic wedges={wedges} onSound={() => {}} enableSound={false} /></div></div></section>
    </main>
    <footer className="pp-footer"><div className="pp-shell"><div className="pp-footer-top"><span className="pp-brand">NorthStar <small>IMPLANT DENTISTRY</small></span><p>Guiding patients one smile at a time.</p><a href="tel:6313151400">631-315-1400</a></div><div className="pp-footer-bottom"><span>© {new Date().getFullYear()} NorthStar Implant Dentistry, P.C. All rights reserved.</span><SiteLink href="/terms/">Terms of Use &amp; IP Notice</SiteLink><a href="#top">Back to top ↑</a></div></div></footer>
  </div>;
}
