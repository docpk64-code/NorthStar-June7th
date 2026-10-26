import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import SEOHead from './components/SEOHead';
import SiteLink from './components/SiteLink';
import { menuItems, featureCards } from './data/menuData';
import CareCard from './components/CareCard';
import doctorPhoto from './assets/doctor-preview';
import './styles/patientPreview.css';
import './styles/northstarJourney.css';
import './styles/northstarBrand.css';
import './styles/homepageUnified.css';
import BrooklynNotice from './components/BrooklynNotice';

const navigationItems = [
  ...menuItems.filter(item => !['/hydrafacial', '/emface', '/dental-implants', '/full-arch', '/wisdom-teeth'].includes(item.href)),
  {
    label: 'Facial Esthetics',
    shortLabel: 'Facial Esthetics',
    href: '/facial-esthetics',
    eyebrow: 'Skin & facial care',
    description: 'Explore HydraFacial and Emface facial treatment options at NorthStar.',
    imageSrc: '/assets/facial-esthetics.svg',
  },
];

const treatmentCards = navigationItems.filter(item => !['/testimonials', '/sedation'].includes(item.href));
const directions = [
  { label: 'About', title: 'Get to know NorthStar.', eyebrow: '01 / ABOUT NORTHSTAR', text: 'Meet Dr. Peter Kampf and our team, explore our approach to care, and find practical information to prepare for your visit.', link: 'About NorthStar', href: '/about/', image: '/about', rotation: 0 },
  { label: 'Procedures', title: 'Find a path for your smile.', eyebrow: '02 / PROCEDURES', text: 'Explore dental implants, full-arch solutions, wisdom teeth, and sedation options. Start with a conversation about your individual needs.', link: 'Explore procedures', href: '/procedures/', image: '/full-arch', rotation: 60 },
  { label: 'Sedation', title: 'Let’s talk about your comfort.', eyebrow: '03 / SEDATION OPTIONS', text: 'Learn about sedation and comfort options, preparation, and what to discuss with our team before your procedure.', link: 'Explore sedation options', href: '/sedation/', image: '/technology', rotation: 120 },
  { label: 'Technology', title: 'Thoughtful care. Precise planning.', eyebrow: '04 / TECHNOLOGY', text: 'Discover how imaging, digital planning, and surgical technology support an individualized approach to your treatment.', link: 'Explore our technology', href: '/technology/', image: '/testimonials', rotation: 180 },
  { label: 'Contact', title: 'Your next chapter starts here.', eyebrow: '05 / CONTACT & SCHEDULE', text: 'Find our offices in Briarwood, Manhattan, and Commack, plus Brooklyn opening January 4, 2027. Request a consultation with our team.', link: 'Contact NorthStar', href: '/contact/', image: '/contact', rotation: 240 },
  { label: 'Facial Esthetics', title: 'Care beyond your smile.', eyebrow: '06 / FACIAL ESTHETICS', text: 'Explore HydraFacial and Emface in one place, then discuss your facial treatment goals and options with our team.', link: 'Explore facial esthetics', href: '/facial-esthetics/', image: '/facial-esthetics', rotation: 300 },
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
  const selectedImage = selected.image === '/about' ? doctorPhoto : selected.image === '/facial-esthetics' ? '/assets/facial-esthetics.svg' : menuItems.find(item => item.href.replace(/\/$/, '') === selected.image)?.imageSrc;
  return <div className="patient-preview journey-preview brand-preview" id="top">
    <SEOHead title="NorthStar Implant Dentistry | New York Locations" description="Explore dental implants and full-arch treatment with Dr. Peter Kampf in Briarwood, Manhattan, and Commack. Brooklyn opens January 4, 2027." />
    <div className="pp-contactbar"><span>Briarwood · Manhattan · Commack · Brooklyn (opening Jan 4, 2027)</span><a href="tel:6313151400">631-315-1400</a><span>Mon–Sat 9am–8pm · Sunday by appointment</span></div>
    <header className="pp-header">
      <div className="pp-nav-wrap">
        <a className="pp-brand" href="#top"><span className="pp-star" aria-hidden="true">✧</span><span>NorthStar<small>IMPLANT DENTISTRY</small></span></a>
        <button className="pp-menu-button" aria-expanded={open} aria-controls="pp-navigation" onClick={() => setOpen(!open)}>{open ? 'Close menu' : 'Menu ☰'}</button>
        <nav id="pp-navigation" className={open ? 'pp-nav open' : 'pp-nav'} aria-label="Main navigation">
          <SiteLink href="/about/" onClick={() => setOpen(false)}>About</SiteLink>
          <SiteLink href="/procedures/" onClick={() => setOpen(false)}>Procedures</SiteLink>
          <SiteLink href="/facial-esthetics/" onClick={() => setOpen(false)}>Facial Esthetics</SiteLink>
          <SiteLink href="/patient-forms/" onClick={() => setOpen(false)}>Patient Forms</SiteLink>
          <a href="#locations" onClick={() => setOpen(false)}>Locations</a>
          <a className="pp-button" href="#contact" onClick={() => setOpen(false)}>Request a Consultation</a>
        </nav>
      </div>
    </header>
    <main>
      <section className="nj-universe" aria-labelledby="journey-title">
        <div className="nj-stars" aria-hidden="true">{Array.from({length: 30}, (_, i) => <i key={i} style={{left: `${(i * 37 + 7) % 100}%`, top: `${(i * 23 + 9) % 100}%`, opacity: .15 + (i % 5) * .13}} />)}<span className="nj-shooting-star nj-shooting-star-one" /><span className="nj-shooting-star nj-shooting-star-two" /></div>
        <div className="nb-banner pp-shell">
          <p className="nb-welcome">Welcome to</p>
          <h1 id="journey-title" className="nb-logo-heading"><span className="unified-sr-only">NorthStar Implant Dentistry</span><span className="nb-logo-window"><img src="/assets/northstar-celestial-logo.jpg" alt="" width="1024" height="1024" /></span></h1>
          <p className="nb-tagline">Guiding Patients One Smile at a Time.</p>
          <p className="nb-practice">Dr. Peter Kampf &amp; Associates <span aria-hidden="true">·</span> New York</p><div className="nb-actions"><a className="pp-button" href="#contact">Request a Consultation ↗</a><SiteLink className="nb-forms-link" href="/patient-forms/">Patient Forms →</SiteLink></div>
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
              {directions.map((d, i) => <button key={d.label} className={`nj-direction nj-direction-${i}${i===direction?' selected':''}`} aria-pressed={i===direction} aria-controls="nj-detail" style={{left:`${50+36*Math.sin(d.rotation*Math.PI/180)}%`,top:`${50-36*Math.cos(d.rotation*Math.PI/180)}%`}} onClick={()=>setDirection(i)}><span className="nj-direction-dot" aria-hidden="true"/><span>{d.label}</span></button>)}
            </div>
            <p className="nj-hint">Choose a section. Discover your options.</p>
          </div>
          <div id="nj-detail" className="nj-detail" aria-live="polite" aria-atomic="true">
            <div className={`nj-detail-image${direction === 0 ? ' nj-detail-image-about' : ''}`}>{selectedImage && <img key={selected.image} src={selectedImage} alt="" />}<span>{selected.eyebrow}</span></div>
            <div className="nj-detail-copy" key={direction}><h2>{selected.title}</h2><p>{selected.text}</p><SiteLink className="pp-button" href={selected.href}>{selected.link} <span aria-hidden="true">↗</span></SiteLink></div>
          </div>
        </div>
        <div className="pp-shell nj-quick"><span>Already know your next step?</span><a href="#contact">Request a consultation ↗</a><a href="tel:6313151400">Call 631-315-1400</a><SiteLink href="/procedures/">All procedures →</SiteLink></div>
      </section>
      <div className="preserved-cards">
        {/* ── Care map ── */}
        <section className="services-section" id="treatments">
          <div className="section-shell">
            <div className="section-heading" style={{ maxWidth: '100%' }}>
              <p className="section-kicker" style={{ color: '#c59d3c', fontSize: '1.54rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'normal', textAlign: 'left' }}>
                EXPLORE NORTHSTAR
              </p>
            </div>
            <div className="care-grid">
              {treatmentCards.map((item) => (
                <CareCard key={item.label} item={item} isActive={false} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Specialized Circumstances heading ── */}
        <div style={{ background: '#ffffff', padding: '2rem 0 0' }}>
          <div className="section-shell">
            <p className="section-kicker" style={{ color: '#c59d3c', fontSize: 'clamp(1.5rem, 6vw, 3rem)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.1em', textAlign: 'center' }}>
              SPECIALIZED CIRCUMSTANCES
            </p>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <section className="signature-section" id="technology">
          <div className="section-shell signature-grid">
            {featureCards.map((f) => (
              <SiteLink
                key={f.title}
                className="feature-card"
                href={f.slug}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', transition: 'transform 150ms ease, box-shadow 150ms ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 36px rgba(197,157,60,0.18)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <p className="feature-kicker feature-kicker-flash" style={{ textAlign: 'center' }}>{f.eyebrow}</p>
                <h2 style={{ textAlign: 'center' }}>{f.title}</h2>
                {(f as any).description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', textAlign: 'center', margin: '0.5rem 0 0.75rem' }}>
                    {(f as any).description}
                  </p>
                )}
                {(f as any).imageSrc ? (
                  <img src={(f as any).imageSrc} alt={f.title} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '0.9rem', marginTop: 'auto', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '0.9rem', marginTop: 'auto', paddingTop: '1.2rem', background: 'linear-gradient(135deg,rgba(197,157,60,0.1) 0%,rgba(10,20,36,0.45) 100%)', border: '1px dashed rgba(197,157,60,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'rgba(197,157,60,0.6)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                    Add Photo
                  </div>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#c59d3c', fontWeight: 600, fontSize: '0.88rem', marginTop: '1rem' }}>
                  Learn More →
                </span>
              </SiteLink>
            ))}
          </div>
        </section>

      </div>
      <section className="nj-universe nj-guide-section">
        <div className="pp-shell nj-guide">
          <div className="nj-guide-image"><img src="/assets/hero-bg.jpg" alt="Polar bear cub following the North Star across a winter sky" width="500" height="677" loading="lazy"/></div>
          <div className="nj-guide-copy"><p className="pp-eyebrow">A familiar star. A personal journey.</p><h2>You don’t need all the answers.<br /><em>Just a place to start.</em></h2><p>We’re here to listen, help you understand your options, and plan the next step together.</p><p className="nj-signature">Guiding patients one smile at a time.</p><div className="nj-guide-meta"><span>Briarwood</span><span>Manhattan</span><span>Commack</span><span>Brooklyn · Opening Jan 4, 2027</span></div></div>
        </div>
      </section>
      <section className="pp-doctor pp-section">
        <div className="pp-shell pp-doctor-grid">
          <div className="pp-doctor-image"><img src={doctorPhoto} alt="Dr. Peter Kampf" loading="lazy" /></div>
          <div><p className="pp-eyebrow">Meet your implant dentist</p><h2>Experience matters.<br />So does feeling heard.</h2><h3>Dr. Peter Kampf, DDS</h3><p>Dr. Kampf’s clinical focus includes dental implants and complex oral rehabilitation. Your consultation is an opportunity to discuss your goals, review your options, and ask questions about your care.</p><div className="pp-credentials"><span>NYU College of Dentistry, 1992</span><span>Postgraduate training at Columbia Presbyterian and Brookdale Medical Center</span></div><SiteLink className="pp-text-link" href="/about/">Meet Dr. Kampf &amp; the team →</SiteLink></div>
        </div>
      </section>
      <section className="pp-journey"><div className="pp-shell"><p className="pp-eyebrow">Your first step, made simple</p><h2>Know what comes next.</h2><div className="pp-steps"><div><span>01 / CONNECT</span><h3>Tell us what you need.</h3><p>Request a consultation and choose your preferred office.</p></div><div><span>02 / UNDERSTAND</span><h3>Explore your options.</h3><p>Meet with the team for an evaluation and a discussion of your goals.</p></div><div><span>03 / PLAN</span><h3>Make an informed choice.</h3><p>Review your proposed care, timing, and fees before deciding.</p></div></div></div></section>
      <section className="pp-section" id="contact"><div className="pp-shell pp-contact-grid"><div><p className="pp-eyebrow">Let’s talk about your smile</p><h2>Your next chapter<br />starts here.</h2><p>Send a consultation request or call our team. We’ll contact you to discuss scheduling.</p><a className="pp-phone" href="tel:6313151400">631-315-1400</a><p>Monday–Saturday: 9am–8pm<br />Sunday: By appointment</p><div className="pp-resource-links"><SiteLink href="/patient-forms/">Patient forms →</SiteLink><SiteLink href="/patient-information/">Prepare for your visit →</SiteLink></div></div>
        <div className="pp-form-panel"><h3>Request a consultation</h3>{formState.succeeded ? <div role="status"><h3>Thank you for reaching out.</h3><p>Your request has been sent. Our team will contact you to discuss scheduling. Your appointment is not yet confirmed.</p></div> : <form onSubmit={handleSubmit}><div className="pp-fields"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><div className="pp-fields"><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label></div><label>Preferred location<select name="location" defaultValue="" required><option value="" disabled>Select an office</option>{locations.map(l=><option key={l.name}>{l.name}</option>)}<option>No preference</option></select></label><label>How can we help?<textarea name="message" rows={3} placeholder="Tell us what you would like to discuss." /></label><p className="pp-form-note">Please avoid including sensitive medical information in this form.</p><ValidationError errors={formState.errors} /><button className="pp-button" disabled={formState.submitting} type="submit">{formState.submitting ? 'Sending…' : 'Send Consultation Request'}</button><p className="pp-form-note">Submitting this form requests a callback, not a confirmed appointment.</p></form>}</div>
      </div></section>
      <section className="pp-locations pp-section" id="locations"><div className="pp-shell"><p className="pp-eyebrow">Close to home</p><h2>Four locations. One NorthStar.</h2><div className="pp-location-grid">{locations.map(l=><div key={l.name}><h3><SiteLink href={`/locations/${l.id}/`}>{l.name} ↗</SiteLink></h3><p>{l.address}<br />{l.city}</p><a className="pp-text-link" href={'https://maps.google.com/?q='+encodeURIComponent(l.address+' '+l.city)}>Get directions ↗</a></div>)}</div><BrooklynNotice /></div></section>
    </main>
    <footer className="pp-footer"><div className="pp-shell"><div className="pp-footer-top"><span className="pp-brand">NorthStar <small>IMPLANT DENTISTRY</small></span><p>Guiding patients one smile at a time.</p><a href="tel:6313151400">631-315-1400</a></div><div className="pp-footer-bottom"><span>© {new Date().getFullYear()} NorthStar Implant Dentistry, P.C. All rights reserved.</span><SiteLink href="/terms/">Terms of Use &amp; IP Notice</SiteLink><a href="#top">Back to top ↑</a></div></div></footer>
  </div>;
}
