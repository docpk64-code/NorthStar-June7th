import { SmilePrototypeInvite } from './components/FullArchPrototype';
import './styles/beforeAfter.css';
import LanguageSelector from './components/LanguageSelector';
import { activeLanguage } from './utils/websiteLanguage';
import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import SEOHead from './components/SEOHead';
import SiteLink from './components/SiteLink';
import { menuItems, featureCards } from './data/menuData';
import CareCard from './components/CareCard';
import './styles/patientPreview.css';
import './styles/northstarJourney.css';
import './styles/northstarBrand.css';
import './styles/homepageUnified.css';
import SmilePreviewInvite from './components/SmilePreviewInvite';
import BrooklynNotice from './components/BrooklynNotice';

const doctorPhoto = '/assets/homepage/dr-peter-kampf-balanced.webp';

const homepageCardImages = [
  ['/about', '/assets/homepage/about-card-north-star.webp'],
  ['/contact', '/assets/homepage/contact-scheduling-card.webp'],
  ['/patient-information', '/assets/homepage/patient-information-card.webp'],
  ['/procedures', '/assets/homepage/procedures-card-illustration.webp'],
  ['/technology', '/assets/homepage/technology-card-illustration.webp'],
];

const treatmentCards = [
  ...homepageCardImages.flatMap(([href, imageSrc]) => {
    const item = menuItems.find(item => item.href === href);
    return item ? [{ ...item, imageSrc }] : [];
  }),
  {
    label: 'Facial Esthetics',
    shortLabel: 'Facial Esthetics',
    href: '/facial-esthetics',
    eyebrow: 'Skin & facial care',
    description: 'Explore HydraFacial and Emface facial treatment options at NorthStar.',
    imageSrc: '/assets/homepage/facial-esthetics-card.webp',
  },
];

const directions = [
  { label: 'About', title: 'Get to know NorthStar.', eyebrow: '01 / ABOUT NORTHSTAR', text: 'Meet Dr. Peter Kampf and our team and explore our approach to care.', link: 'About NorthStar', href: '/about/', image: '/about', rotation: 0 },
  { label: 'Procedures', title: 'Find a path for your smile.', eyebrow: '02 / PROCEDURES', text: 'Explore dental implants, full-arch solutions, wisdom teeth, and sedation options. Start with a conversation about your individual needs.', link: 'Explore procedures', href: '/procedures/', image: '/full-arch', rotation: 60 },
  { label: 'Sedation', title: 'Let’s talk about your comfort.', eyebrow: '03 / SEDATION OPTIONS', text: 'Learn about sedation and comfort options, preparation, and what to discuss with our team before your procedure.', link: 'Explore sedation options', href: '/sedation/', image: '/technology', rotation: 120 },
  { label: 'Technology', title: 'Thoughtful care. Precise planning.', eyebrow: '04 / TECHNOLOGY', text: 'Discover how imaging, digital planning, and surgical technology support an individualized approach to your treatment.', link: 'Explore our technology', href: '/technology/', image: '/technology', rotation: 180 },
  { label: 'Contact', title: 'Your next chapter starts here.', eyebrow: '05 / CONTACT & SCHEDULE', text: 'Find our offices in Briarwood, Manhattan, and Commack, plus Brooklyn opening January 4, 2027. Request a consultation with our team.', link: 'Contact NorthStar', href: '/contact/', image: '/contact', rotation: 240 },
  { label: 'Facial Esthetics', title: 'Care beyond your smile.', eyebrow: '06 / FACIAL ESTHETICS', text: 'Explore HydraFacial and Emface in one place, then discuss your facial treatment goals and options with our team.', link: 'Explore facial esthetics', href: '/facial-esthetics/', image: '/facial-esthetics', rotation: 300 },
];

const locations = [
  { id: 'briarwood', name: 'Briarwood, Queens', address: '139-12 84th Drive, Suite 1G', city: 'Briarwood, NY 11435' },
  { id: 'manhattan', name: 'Manhattan', address: '333 East 34th Street, Suite M1', city: 'New York, NY 10016' },
  { id: 'commack', name: 'Commack', address: '283 Commack Road, Suite 130', city: 'Commack, NY 11725' },
];

function NorthStarWordmark({ lazy = false }: { lazy?: boolean }) {
  return (
    <a className="pp-brand pp-brand-orbit" href="#top" aria-label="NorthStar Implant Dentistry home">
      <span className="pp-orbit-logo-window">
        <img
          src="/assets/homepage/northstar-orbit-wordmark-approved-460.webp"
          srcSet="/assets/homepage/northstar-orbit-wordmark-approved-460.webp 460w, /assets/homepage/northstar-orbit-wordmark-approved-720.webp 720w"
          sizes={lazy ? '296px' : '(max-width: 700px) 296px, 358px'}
          alt="NorthStar Implant Dentistry"
          width="460"
          height="230"
          loading={lazy ? 'lazy' : 'eager'}
        />
      </span>
    </a>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [formState, handleSubmit] = useForm('xbdpbdkj');
  const [direction, setDirection] = useState(0);
  const selected = directions[direction];
  const selectedImage = selected.image === '/about' ? doctorPhoto : selected.image === '/facial-esthetics' ? '/assets/facial-esthetics.svg' : menuItems.find(item => item.href.replace(/\/$/, '') === selected.image)?.imageSrc;
  return <div className="patient-preview journey-preview brand-preview" id="top">
    <SEOHead title="Dental Implants in Queens, Manhattan &amp; Commack" description="Explore dental implants and full-arch treatment with Dr. Peter Kampf in Briarwood, Manhattan, and Commack. Brooklyn opens January 4, 2027." />
    <div className="pp-contactbar"><span>Briarwood · Manhattan · Commack · Brooklyn (opening Jan 4, 2027)</span><a href="tel:6313151400">631-315-1400</a><span>Mon–Sat 9am–8pm · Sunday by appointment</span></div>
    <header className="pp-header">
      <div className="pp-nav-wrap">
        <NorthStarWordmark />
        <button className="pp-menu-button" aria-expanded={open} aria-controls="pp-navigation" onClick={() => setOpen(!open)}>{open ? 'Close menu' : 'Menu ☰'}</button>
        <nav id="pp-navigation" className={open ? 'pp-nav open' : 'pp-nav'} aria-label="Main navigation">
          <SiteLink href="/about/" onClick={() => setOpen(false)}>About</SiteLink>
          <SiteLink href="/dental-implants/" onClick={() => setOpen(false)}>Dental Implants</SiteLink>
          <SiteLink href="/full-arch/" onClick={() => setOpen(false)}>Full-Arch Implants</SiteLink>
          <SiteLink href="/procedures/" onClick={() => setOpen(false)}>Procedures</SiteLink>
          <SiteLink href="/implant-cost-financing/" onClick={() => setOpen(false)}>Cost &amp; Financing</SiteLink>
          <SiteLink href="/facial-esthetics/" onClick={() => setOpen(false)}>Facial Esthetics</SiteLink>
          <SiteLink href="/patient-forms/" onClick={() => setOpen(false)}>Patient Forms</SiteLink>
          <a href="#locations" onClick={() => setOpen(false)}>Locations</a>
          <a className="pp-button" href="#contact" onClick={() => setOpen(false)}>Request a Consultation</a>
          <LanguageSelector />
        </nav>
      </div>
    </header>
    <main>
      <section className="nj-universe" aria-labelledby="journey-title">
        <div className="nj-stars" aria-hidden="true">{Array.from({length: 30}, (_, i) => <i key={i} style={{left: `${(i * 37 + 7) % 100}%`, top: `${(i * 23 + 9) % 100}%`, opacity: .15 + (i % 5) * .13}} />)}</div>
        <div className="nb-hero">
          <div className="nb-banner pp-shell">
            <div className="nb-emblem">
              <div className="nb-logo-window">
                <img
                  src="/assets/homepage/northstar-celestial-logo-800.webp"
                  srcSet="/assets/homepage/northstar-celestial-logo-520.webp 520w, /assets/homepage/northstar-celestial-logo-800.webp 800w, /assets/homepage/northstar-celestial-logo-1024.webp 1024w"
                  sizes="(max-width: 700px) 225px, 350px"
                  alt="NorthStar Implant Dentistry"
                  width="800"
                  height="800"
                  {...{ fetchpriority: 'high' }}
                />
              </div>
              <span className="nb-star-glint" aria-hidden="true" />
            </div>
            <h1 id="journey-title" className="nb-headline" style={{ fontSize: 'clamp(1.65rem, 3.2vw, 2.8rem)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.025em' }}>Smile with Confidence and Eat Comfortably.</h1>
            <p className="nb-services">Dental implant care from <strong style={{ color: '#f3d37a', fontWeight: 600 }}>Surgery to Final Teeth</strong> — a smile designed to look natural and complement your face.</p>
            <div className="nb-actions">
              <a className="pp-button" href="#contact">Request an Implant Consultation</a>
              <a className="nb-treatment-link" href="/implant-treatment-examples/#before-after">See Real Patient Results</a>
            </div>
            <nav className="nb-patient-links nb-implant-questions" aria-label="Common questions about implant treatment">
              <a href="/implant-cost-financing/#first-implant-visit">What will my first visit cost?</a>
              <a href="/full-arch/#temporary-teeth">How soon can I get teeth?</a>
              <a href="/sedation/#treatment-comfort">How will you keep me comfortable?</a>
            </nav>
            <p className="nb-tagline">Guiding Patients One Smile at a Time.</p>
            <div className="nb-patient-links">
              <a href="#locations">Choose an Office</a>
              <SiteLink href="/patient-forms/">Patient Forms</SiteLink>
            </div>
          </div>
        </div>
        <div className="pp-shell nj-heading nb-direction-heading">
          <h2>Your smile. <em>Your direction.</em></h2>
          <p>Every journey starts somewhere. Where would you like yours to begin?</p>
        </div>
        <div className="pp-shell nj-explorer" data-direction={direction}>
          <div className="nj-compass-area">
            <p className="nj-coordinate">NORTHSTAR / FIND YOUR PATH</p>
            <div className="nj-compass" role="group" aria-label="Choose a care direction">
              <svg viewBox="0 0 500 500" aria-hidden="true" className="nj-instrument">
                <defs>
                  <linearGradient id="nj-bezel" x1="15%" y1="0%" x2="83%" y2="100%">
                    <stop stopColor="#f0d399" />
                    <stop offset=".29" stopColor="#be9b60" />
                    <stop offset=".54" stopColor="#6f512d" />
                    <stop offset=".78" stopColor="#a57f49" />
                    <stop offset="1" stopColor="#4c3825" />
                  </linearGradient>
                  <radialGradient id="nj-dial" cx="36%" cy="27%" r="79%">
                    <stop stopColor="#a89978" />
                    <stop offset=".54" stopColor="#8e7f61" />
                    <stop offset=".86" stopColor="#75674f" />
                    <stop offset="1" stopColor="#64563f" />
                  </radialGradient>
                  <pattern id="nj-grain" width="31" height="9" patternUnits="userSpaceOnUse">
                    <path d="M0 1H31M5 6H25" stroke="#f0ddb6" strokeOpacity=".15" strokeWidth=".6" />
                    <path d="M0 3.5H21M17 8H31" stroke="#2a2118" strokeOpacity=".19" strokeWidth=".65" />
                  </pattern>
                  <linearGradient id="nj-gold" x1="0%" x2="100%">
                    <stop stopColor="#9a6a29" />
                    <stop offset=".53" stopColor="#ffecc0" />
                    <stop offset="1" stopColor="#d0a25c" />
                  </linearGradient>
                  <radialGradient id="nj-pivot" cx="35%" cy="24%" r="78%">
                    <stop stopColor="#fae0a4" />
                    <stop offset=".52" stopColor="#b68b49" />
                    <stop offset="1" stopColor="#624320" />
                  </radialGradient>
                </defs>
                <g transform="translate(250 250) scale(.76) translate(-250 -250)">
                  <circle cx="250" cy="253" r="209" fill="#100e0e" stroke="#2f261e" strokeWidth="3" />
                  <circle cx="250" cy="249" r="208" fill="url(#nj-bezel)" stroke="#c5a36d" />
                  <circle cx="250" cy="250" r="201" fill="#29251f" stroke="#211b14" strokeWidth="2" />
                  <circle cx="250" cy="250" r="189" fill="#4e402e" stroke="#c4a371" />
                  <circle cx="250" cy="250" r="183" fill="url(#nj-dial)" stroke="#362e21" strokeWidth="2" />
                  <circle cx="250" cy="250" r="182" fill="url(#nj-grain)" />
                  <path d="M79 250a171 171 0 0 1 342 0" fill="none" stroke="#ddcaa0" strokeOpacity=".32" />
                  <path d="M79 250a171 171 0 0 0 342 0" fill="none" stroke="#3a3023" strokeOpacity=".44" />
                  {Array.from({length: 72}, (_, i) => (
                    <line key={i} x1="250" y1="53" x2="250" y2={i % 6 === 0 ? '65' : '59'}
                      stroke={i % 6 === 0 ? '#e1c58e' : '#958361'} strokeWidth={i % 6 === 0 ? 1.8 : .8}
                      transform={`rotate(${i * 5} 250 250)`} />
                  ))}
                  <circle cx="250" cy="250" r="151" fill="none" stroke="#514331" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="1 8" />
                  <path d="M250 90V410M90 250H410" stroke="#52442f" strokeOpacity=".63" />
                  <g className="nj-needle" style={{transform:`rotate(${selected.rotation}deg)`,transformOrigin:'250px 250px'}}>
                    <path d="M250 72L262 250L250 430L238 250Z" fill="#251b10" opacity=".38" transform="translate(3 3)" />
                    <path d="M250 72L262 250L250 272L238 250Z" fill="url(#nj-gold)" stroke="#695027" strokeWidth="1" />
                    <path d="M250 72L250 272L238 250Z" fill="#af813d" />
                    <path d="M250 430L238 250L250 228L262 250Z" fill="#668797" stroke="#263f4c" strokeWidth="1" />
                    <path d="M250 430L250 228L262 250Z" fill="#344f5d" />
                  </g>
                  <circle cx="250" cy="250" r="16" fill="#272018" stroke="#d8b679" strokeWidth="1.8" />
                  <circle cx="250" cy="250" r="10" fill="url(#nj-pivot)" stroke="#614827" strokeWidth="1.2" />
                </g>
                {directions.map((d,i)=><g key={d.label} transform={`rotate(${d.rotation} 250 250)`} className={`nj-rim-connector${i===direction?' selected':''}`}><line x1="250" y1="89" x2="250" y2="76"/><circle cx="250" cy="89" r="2.5"/></g>)}
              </svg>
              {directions.map((d, i) => <button key={d.label} className={`nj-direction nj-direction-${i}${i===direction?' selected':''}`} aria-pressed={i===direction} aria-controls="nj-detail" style={{left:`${50+34.8*Math.sin(d.rotation*Math.PI/180)}%`,top:`${50-34.8*Math.cos(d.rotation*Math.PI/180)}%`,transform:i===0?'translate(-50%,-100%)':i===3?'translate(-50%,0)':i<3?'translate(0,-50%)':'translate(-100%,-50%)'}} onClick={()=>setDirection(i)}><span className="nj-direction-dot" aria-hidden="true"/><span>{d.label}</span></button>)}
            </div>
            <p className="nj-hint">Choose a topic for a preview and a link to its page.</p>
          </div>
          <div id="nj-detail" className="nj-detail" aria-live="polite" aria-atomic="true">
            {selectedImage && <div className="nj-detail-image"><img key={selected.image} src={selectedImage} alt="" loading="lazy" decoding="async" /></div>}
            <div className="nj-detail-copy" key={direction}>
              <span className="nj-detail-eyebrow">{selected.eyebrow}</span>
              <h2>{selected.title}</h2>
              <p>{selected.text}</p>
              <SiteLink className="pp-button" href={selected.href}>{selected.link} <span aria-hidden="true">↗</span></SiteLink>
            </div>
          </div>
        </div>
        <div className="pp-shell nj-quick"><span>Already know your next step?</span><a href="#contact">Request a consultation ↗</a><a href="tel:6313151400">Call 631-315-1400</a><SiteLink href="/procedures/">All procedures →</SiteLink></div>
      </section>
      <div className="preserved-cards">
        <section className="nb-implant-concerns" aria-labelledby="implant-concerns-title">
          <h2 id="implant-concerns-title">What’s getting in the way of your smile?</h2>
          <div className="nb-implant-concern-links">
            <SiteLink href="/full-arch/">My denture moves when I eat or talk.</SiteLink>
            <SiteLink href="/specialized/cant-get-implants/">I was told I don’t have enough bone for implants.</SiteLink>
            <SiteLink href="/specialized/botched-smile/">My implant or bridge feels loose or keeps breaking.</SiteLink>
          </div>
        </section>
        <section className="before-after-teaser" aria-labelledby="before-after-preview-title">
          <div>
            <h2 id="before-after-preview-title">Before &amp; After</h2>
            <p>Explore before-and-after cases treated by Dr. Peter Kampf.</p>
          </div>
          <a href="/implant-treatment-examples/#before-after">View the gallery</a>
        </section>
        {/* ── Care map ── */}
        <section className="services-section" id="treatments">
          <div className="section-shell">
            <div className="section-heading" style={{ maxWidth: '100%' }}>
              <p className="section-kicker" style={{ color: '#80601f', fontSize: '1.54rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'normal', textAlign: 'left' }}>
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
        <div className="specialized-heading" style={{ background: '#ffffff' }}>
          <div className="section-shell">
            <p className="section-kicker" style={{ color: '#80601f', fontSize: 'clamp(1.5rem, 6vw, 3rem)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.1em', textAlign: 'center' }}>
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
                {f.description && (
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', textAlign: 'center', margin: '0.5rem 0 0.75rem' }}>
                    {f.description}
                  </p>
                )}
                {f.imageSrc ? (
                  <img src={f.imageSrc} alt={f.title} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '0.9rem', marginTop: 'auto', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '0.9rem', marginTop: 'auto', paddingTop: '1.2rem', background: 'linear-gradient(135deg,rgba(197,157,60,0.1) 0%,rgba(10,20,36,0.45) 100%)', border: '1px dashed rgba(197,157,60,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'rgba(197,157,60,0.6)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                    Add Photo
                  </div>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#80601f', fontWeight: 600, fontSize: '0.88rem', marginTop: '1rem' }}>
                  Learn More →
                </span>
              </SiteLink>
            ))}
          </div>
        </section>
        <SmilePreviewInvite />
      </div>
      <section className="nj-universe nj-guide-section">
        <div className="pp-shell nj-guide">
          <div className="nj-guide-image"><img src="/assets/homepage/hero-bg.webp" alt="Polar bear cub following the North Star across a winter sky" width="500" height="677" loading="lazy" decoding="async"/></div>
          <div className="nj-guide-copy"><p className="pp-eyebrow">A familiar star. A personal journey.</p><h2>You don’t need all the answers.<br /><em>Just a place to start.</em></h2><p>We’re here to listen, help you understand your options, and plan the next step together.</p><p className="nj-signature">Guiding patients one smile at a time.</p><div className="nj-guide-meta"><span>Briarwood</span><span>Manhattan</span><span>Commack</span><span>Brooklyn · Opening Jan 4, 2027</span></div></div>
        </div>
      </section>
      <section className="pp-doctor pp-section" id="meet-your-implant-dentist">
        <div className="pp-shell pp-doctor-grid">
          <div className="pp-doctor-image"><img src={doctorPhoto} alt="Dr. Peter Kampf" width="760" height="1013" loading="lazy" decoding="async" /></div>
          <div><p className="pp-eyebrow">Meet your implant dentist</p><h2>Experience matters.<br />So does feeling heard.</h2><h3>Dr. Peter Kampf, DDS</h3><p>Dr. Kampf’s clinical focus includes dental implants and complex oral rehabilitation. Your consultation is an opportunity to discuss your goals, review your options, and ask questions about your care.</p><div className="pp-credentials"><span>NYU College of Dentistry, 1992</span><span>Postgraduate training at Columbia Presbyterian and Brookdale Medical Center</span></div><SiteLink className="pp-text-link" href="/about/">Meet Dr. Kampf &amp; the team →</SiteLink></div>
        </div>
      </section>
      <SmilePrototypeInvite />
      <section className="pp-journey"><div className="pp-shell"><p className="pp-eyebrow">Your first step, made simple</p><h2>Know what comes next.</h2><div className="pp-steps"><div><span>01 / CONNECT</span><h3>Tell us what you need.</h3><p>Request a consultation and choose your preferred office.</p></div><div><span>02 / UNDERSTAND</span><h3>Explore your options.</h3><p>Meet with the team for an evaluation and a discussion of your goals.</p></div><div><span>03 / PLAN</span><h3>Make an informed choice.</h3><p>Review your proposed care, timing, and fees before deciding. <SiteLink href="/implant-cost-financing/">See what your estimate can include.</SiteLink></p></div></div></div></section>
      <section className="pp-section" id="contact"><div className="pp-shell pp-contact-grid"><div><p className="pp-eyebrow">Let’s talk about your smile</p><h2>Your next chapter<br />starts here.</h2><p>Send a consultation request or call our team. We’ll contact you to discuss scheduling.</p><a className="pp-phone" href="tel:6313151400">631-315-1400</a><p>Monday–Saturday: 9am–8pm<br />Sunday: By appointment</p><div className="pp-resource-links"><SiteLink href="/patient-forms/">Patient forms →</SiteLink><SiteLink href="/patient-information/">Prepare for your visit →</SiteLink></div></div>
        <div className="pp-form-panel"><h3>Request a consultation</h3>{activeLanguage() !== 'en' ? <SiteLink className="pp-button" href="/contact/">Open the consultation form (English)</SiteLink> : formState.succeeded ? <div role="status"><h3>Thank you for reaching out.</h3><p>Your request has been sent. Our team will contact you to discuss scheduling. Your appointment is not yet confirmed.</p></div> : <form onSubmit={handleSubmit}><div className="pp-fields"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div><div className="pp-fields"><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label></div><label>Preferred location<select name="location" defaultValue="" required><option value="" disabled>Select an office</option>{locations.map(l=><option key={l.name}>{l.name}</option>)}<option>No preference</option></select></label><label>How can we help?<textarea name="message" rows={3} placeholder="Tell us what you would like to discuss." /></label><p className="pp-form-note">Please avoid including sensitive medical information in this form.</p><ValidationError errors={formState.errors} /><button className="pp-button" disabled={formState.submitting} type="submit">{formState.submitting ? 'Sending…' : 'Send Consultation Request'}</button><p className="pp-form-note">Submitting this form requests a callback, not a confirmed appointment.</p></form>}</div>
      </div></section>
      <section className="pp-locations pp-section" id="locations"><div className="pp-shell"><p className="pp-eyebrow">Close to home</p><h2>Choose your NorthStar office.</h2><div className="pp-location-grid">{locations.map(l=><div key={l.name}><h3><SiteLink href={`/locations/${l.id}/`}>{l.name} ↗</SiteLink></h3><p>{l.address}<br />{l.city}</p><a className="pp-text-link" href={'https://maps.google.com/?q='+encodeURIComponent(l.address+' '+l.city)}>Get directions ↗</a></div>)}</div><BrooklynNotice /></div></section>
    </main>
    <footer className="pp-footer">
      <div className="pp-shell">
        <div className="pp-footer-top">
          <NorthStarWordmark lazy />
          <p>Guiding patients one smile at a time.</p>
          <a href="tel:6313151400">631-315-1400</a>
        </div>
        <div className="pp-footer-bottom">
          <span>© {new Date().getFullYear()} NorthStar Implant Dentistry, P.C. All rights reserved.</span>
          <SiteLink href="/terms/">Terms of Use &amp; IP Notice</SiteLink>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  </div>;
}
