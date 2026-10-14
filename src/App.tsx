import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import SEOHead from './components/SEOHead';
import SiteLink from './components/SiteLink';
import { menuItems } from './data/menuData';
import doctorPhoto from './assets/doctor-preview';
import './styles/patientPreview.css';
import './styles/northstarJourney.css';
import './styles/northstarBrand.css';
import BrooklynNotice from './components/BrooklynNotice';

const directions = [
  { label: 'Missing teeth', title: 'A new beginning for your smile.', eyebrow: '01 / REPLACE MISSING TEETH', text: 'Missing one tooth or several? Explore implant options designed around your smile, your health, and your goals.', link: 'Explore dental implants', href: '/dental-implants/', image: '/dental-implants', rotation: 0 },
  { label: 'Full smile', title: 'Rediscover a more confident smile.', eyebrow: '02 / RESTORE YOUR SMILE', text: 'Living with dentures or many failing teeth? Learn about full-arch implant treatment and what your individual plan could involve.', link: 'Explore full-arch care', href: '/full-arch/', image: '/full-arch', rotation: 90 },
  { label: 'Complex care', title: 'Let’s explore what may be possible.', eyebrow: '03 / COMPLEX IMPLANT CARE', text: 'Told implants are not an option, or facing a previous implant problem? Start with a careful evaluation and a conversation about your options.', link: 'Explore complex implant care', href: '/specialized/cant-get-implants/', image: '/technology', rotation: 180 },
  { label: 'Facial aesthetics', title: 'A little time, just for you.', eyebrow: '04 / FACIAL AESTHETICS', text: 'Discover our facial-aesthetics treatments. Explore HydraFacial and Emface, then discuss which options suit your goals.', link: 'Explore HydraFacial', href: '/hydrafacial/', image: '/hydrafacial', rotation: 270 },
];
const locations = [
  { id: 'briarwood', name: 'Briarwood, Queens', address: '139-12 84th Drive, Suite 1G', city: 'Briarwood, NY 11435' },
  { id: 'manhattan', name: 'Manhattan', address: '333 East 34th Street, Suite M1', city: 'New York, NY 10016' },
  { id: 'commack', name: 'Commack', address: '283 Commack Road, Suite 130', city: 'Commack, NY 11725' },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [formState, handleSubmit] = useForm('xbdpbdkj');
  const [direction, setDirection] = useState(0);
  const selected = directions[direction];
  const selectedImage = menuItems.find(item => item.href.replace(/\/$/, '') === selected.image)?.imageSrc;
  return <div className="patient-preview journey-preview brand-preview" id="top">
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
      <section className="nj-universe" aria-labelledby="journey-title">
        <div className="nj-stars" aria-hidden="true">{Array.from({length: 30}, (_, i) => <i key={i} style={{left: `${(i * 37 + 7) % 100}%`, top: `${(i * 23 + 9) % 100}%`, opacity: .15 + (i % 5) * .13}} />)}</div>
        <div className="nb-banner pp-shell">
          <div className="nb-star-rule" aria-hidden="true"><span /><svg viewBox="0 0 64 64"><path d="M32 0 38 25 64 32 38 39 32 64 26 39 0 32 26 25Z" fill="currentColor" /><path d="m12 12 20 14 20-14-14 20 14 20-20-14-20 14 14-20Z" fill="currentColor" opacity=".35" /></svg><span /></div>
          <p className="nb-welcome">Welcome to</p>
          <h1 id="journey-title" className="nb-wordmark">NorthStar<span>Implant Dentistry</span></h1>
          <p className="nb-tagline">Guiding Patients One Smile at a Time.</p>
          <p className="nb-practice">Dr. Peter Kampf &amp; Associates <span aria-hidden="true">·</span> New York</p>
        </div>
        <div className="pp-shell nj-heading nb-direction-heading">
          <h2>Your smile. <em>Your direction.</em></h2>
          <p>Every journey starts somewhere. Where would you like yours to begin?</p>
        </div>
        <div className="pp-shell nj-explorer">
          <div className="nj-compass-area">
            <p className="nj-coordinate">NORTHSTAR / FIND YOUR PATH</p>
            <div className="nj-compass" role="group" aria-label="Choose a care direction">
              <svg viewBox="0 0 500 500" aria-hidden="true" className="nj-instrument">
                <defs><radialGradient id="nj-face"><stop offset="0%" stopColor="#142e3e"/><stop offset="100%" stopColor="#081722"/></radialGradient><linearGradient id="nj-gold" x1="0" x2="1"><stop stopColor="#987137"/><stop offset=".5" stopColor="#f7e7b5"/><stop offset="1" stopColor="#bb9854"/></linearGradient></defs>
                <circle cx="250" cy="250" r="209" fill="url(#nj-face)" stroke="#baa16b" strokeWidth="1"/>
                <circle cx="250" cy="250" r="194" fill="none" stroke="#c6ae762f" strokeWidth="13"/>
                {Array.from({length: 72},(_, i)=><line key={i} x1="250" y1="45" x2="250" y2={i%6===0?'64':'53'} stroke={i%6===0?'#d9bd80':'#8c79554f'} strokeWidth={i%6===0?2:1} transform={`rotate(${i*5} 250 250)`}/>)}
                <circle cx="250" cy="250" r="151" fill="none" stroke="#b99b5e55" strokeDasharray="2 8"/>
                <path d="M250 90V410 M90 250H410" stroke="#d9bd8030"/>
                <g className="nj-needle" style={{transform:`rotate(${selected.rotation}deg)`,transformOrigin:'250px 250px'}}>
                  <path d="M250 107 L270 250 L250 393 L230 250Z" fill="#203f50" stroke="#d2b77b"/>
                  <path d="M250 107 L270 250 L250 231 L230 250Z" fill="url(#nj-gold)"/>
                  <path d="M250 98 L253 112 L267 115 L253 118 L250 132 L247 118 L233 115 L247 112Z" fill="#fff1c5"/>
                </g>
                <circle cx="250" cy="250" r="52" fill="#071722" stroke="#d3b575"/>
                <path d="M250 213 L259 241 L287 250 L259 259 L250 287 L241 259 L213 250 L241 241Z" fill="url(#nj-gold)"/>
              </svg>
              {directions.map((d, i) => <button key={d.label} className={`nj-direction nj-direction-${i}${i===direction?' selected':''}`} aria-pressed={i===direction} aria-controls="nj-detail" onClick={()=>setDirection(i)}><span className="nj-direction-dot" aria-hidden="true"/><span>{d.label}</span></button>)}
            </div>
            <p className="nj-hint">Choose a direction. Discover your options.</p>
          </div>
          <div id="nj-detail" className="nj-detail" aria-live="polite" aria-atomic="true">
            <div className="nj-detail-image">{selectedImage && <img key={selected.image} src={selectedImage} alt="" />}<span>{selected.eyebrow}</span></div>
            <div className="nj-detail-copy" key={direction}><h2>{selected.title}</h2><p>{selected.text}</p><SiteLink className="pp-button" href={selected.href}>{selected.link} <span aria-hidden="true">↗</span></SiteLink>{direction===3 && <SiteLink className="nj-secondary" href="/emface/">Discover Emface →</SiteLink>}</div>
          </div>
        </div>
        <div className="pp-shell nj-quick"><span>Already know your next step?</span><a href="#contact">Request a consultation ↗</a><a href="tel:6313151400">Call 631-315-1400</a><SiteLink href="/procedures/">All procedures →</SiteLink></div>
        <div className="pp-shell nj-guide">
          <div className="nj-guide-image"><img src="/assets/hero-bg.jpg" alt="Polar bear cub following the North Star across a winter sky" width="500" height="677" loading="lazy"/></div>
          <div className="nj-guide-copy"><p className="pp-eyebrow">A familiar star. A personal journey.</p><h2>You don’t need all the answers.<br /><em>Just a place to start.</em></h2><p>We’re here to listen, help you understand your options, and plan the next step together.</p><p className="nj-signature">Guiding patients one smile at a time.</p><div className="nj-guide-meta"><span>Briarwood</span><span>Manhattan</span><span>Commack</span></div></div>
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
      <section className="pp-locations pp-section" id="locations"><div className="pp-shell"><p className="pp-eyebrow">Close to home</p><h2>Three locations. One NorthStar.</h2><div className="pp-location-grid">{locations.map(l=><div key={l.name}><h3><SiteLink href={`/locations/${l.id}/`}>{l.name} ↗</SiteLink></h3><p>{l.address}<br />{l.city}</p><a className="pp-text-link" href={'https://maps.google.com/?q='+encodeURIComponent(l.address+' '+l.city)}>Get directions ↗</a></div>)}</div><BrooklynNotice /></div></section>
    </main>
    <footer className="pp-footer"><div className="pp-shell"><div className="pp-footer-top"><span className="pp-brand">NorthStar <small>IMPLANT DENTISTRY</small></span><p>Guiding patients one smile at a time.</p><a href="tel:6313151400">631-315-1400</a></div><div className="pp-footer-bottom"><span>© {new Date().getFullYear()} NorthStar Implant Dentistry, P.C. All rights reserved.</span><SiteLink href="/terms/">Terms of Use &amp; IP Notice</SiteLink><a href="#top">Back to top ↑</a></div></div></footer>
  </div>;
}
