import BrooklynNotice from './components/BrooklynNotice';
/**
 * NorthStar Implant Dentistry — App.tsx
 */

import React, { useEffect, useMemo, useState } from 'react';
import SEOHead from './components/SEOHead';
import SiteLink from './components/SiteLink';
import { useForm, ValidationError } from '@formspree/react';

import type { Wedge } from './types';
import { HERO_BG_SRC } from './assets/imagePaths';
import { buildStyles } from './styles/globalStyles';
import {
  menuItems,
  caseStudies,
  featureCards,
  testimonials,
  TOTAL,
  STEP,
  START_ANGLE,
} from './data/menuData';
import { STARS } from './data/stars';
import { COMPASS_STARS } from './data/compassStars';
import DirectionsDropdown from './components/DirectionsDropdown';
import CareCard from './components/CareCard';
import CaseCard from './components/CaseCard';
import CompassGraphic from './components/CompassGraphic';
import TaglineGlow from './components/TaglineGlow';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formState, handleFormspreeSubmit] = useForm('xbdpbdkj');
  const activeItem = menuItems[activeIndex];
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const tag = document.createElement('style');
    tag.setAttribute('data-northstar', 'global');
    tag.textContent = buildStyles(HERO_BG_SRC);
    document.head.appendChild(tag);
    return () => { document.head.removeChild(tag); };
  }, []);

  useEffect(() => {
    const grid = document.querySelector<HTMLElement>('.care-grid');
    if (!grid) return;
    const track = document.createElement('div');
    track.className = 'care-grid-progress';
    track.setAttribute('aria-hidden', 'true');
    const thumb = document.createElement('div');
    thumb.className = 'care-grid-progress-bar';
    track.appendChild(thumb);
    grid.insertAdjacentElement('afterend', track);
    let raf = 0;
    const update = () => {
      const max = grid.scrollWidth - grid.clientWidth;
      const thumbPct = Math.max(12, (grid.clientWidth / grid.scrollWidth) * 100);
      const leftPct = max > 0 ? (grid.scrollLeft / max) * (100 - thumbPct) : 0;
      thumb.style.width = `${thumbPct}%`;
      thumb.style.transform = `translateX(${leftPct}%)`;
      track.style.display = max > 4 ? '' : 'none';
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    grid.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      grid.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
      track.remove();
    };
  }, []);

  useEffect(() => {
    const grid = document.querySelector<HTMLElement>('.signature-grid');
    if (!grid) return;
    const track = document.createElement('div');
    track.className = 'signature-grid-progress';
    track.setAttribute('aria-hidden', 'true');
    const thumb = document.createElement('div');
    thumb.className = 'signature-grid-progress-bar';
    track.appendChild(thumb);
    grid.insertAdjacentElement('afterend', track);
    let raf = 0;
    const update = () => {
      const max = grid.scrollWidth - grid.clientWidth;
      const thumbPct = Math.max(12, (grid.clientWidth / grid.scrollWidth) * 100);
      const leftPct = max > 0 ? (grid.scrollLeft / max) * (100 - thumbPct) : 0;
      thumb.style.width = `${thumbPct}%`;
      thumb.style.transform = `translateX(${leftPct}%)`;
      track.style.display = max > 4 ? '' : 'none';
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    grid.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      grid.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
      track.remove();
    };
  }, []);

  const wedges = useMemo<Wedge[]>(
    () => menuItems.map((item, index) => {
      const centerAngle = START_ANGLE + index * STEP;
      return { item, index, centerAngle, startAngle: centerAngle - STEP / 2, endAngle: centerAngle + STEP / 2 };
    }), []
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName ?? '';
      if (['INPUT','TEXTAREA','BUTTON','SELECT','A'].includes(tag)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((prev) => (prev + 1) % TOTAL); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((prev) => (prev - 1 + TOTAL) % TOTAL); }
      else if (e.key === 'Enter') {
        const section = document.getElementById(activeItem.href.replace(/^\//, ''));
        if (section) { e.preventDefault(); section.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem.href]);

  function playClick() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12);
      osc.onended = () => ctx.close();
    } catch (_) {}
  }

  return (
    <>
      <SEOHead title="Dental Implants in Queens, Manhattan & Commack" description="Dental implants, full-arch restoration and implant consultations with Dr. Peter Kampf. Visit NorthStar in Briarwood, Manhattan or Commack. Call 631-315-1400." />
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      {/* ── Click-to-call bar + Mobile Nav ── */}
      <div style={{ position: 'relative' as const }}>
        <div
          style={{
            background: '#07111c',
            borderBottom: '1px solid rgba(197,157,60,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', padding: '0.5rem 3.5rem 0.5rem 1rem',
            fontSize: '0.82rem', color: 'rgba(255,244,214,0.75)',
            flexWrap: 'wrap' as const, position: 'relative' as const,
          }}
          role="banner"
          aria-label="Contact bar"
        >
          <span>📍 Briarwood · New York · Commack</span>
          <span aria-hidden="true">·</span>
          <a
            href="tel:6313151400"
            style={{ color: '#f3d37a', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            aria-label="Call NorthStar at 631-315-1400"
          >
            📞 631-315-1400
          </a>
          <span aria-hidden="true">·</span>
          <span>Mon–Sat 9am–8pm · Sunday by appointment</span>
          <button
            className="app-nav-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav className={`app-nav-mobile${mobileNavOpen ? ' open' : ''}`} role="navigation" aria-label="Mobile navigation">
          {menuItems.map((item) => (
            <SiteLink key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)}>
              {item.label}
            </SiteLink>
          ))}
          <a href="tel:6313151400" className="call-link">📞 631-315-1400</a>
        </nav>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Dark starry background with title & CTA
          (no photo here — pure deep-space navy with star animations)
      ══════════════════════════════════════════════════════ */}
      <header
        id="top"
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #060e1a 0%, #07111c 60%, #0b1830 100%)',
          overflow: 'hidden',
          paddingTop: 'calc(3.5rem + env(safe-area-inset-top, 0px))',
          paddingBottom: '3.5rem',
        }}
      >
        {/* Twinkling star field */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          {STARS.map((star, i) => (
            <span
              key={i}
              className="hero-starfield-star"
              style={{
                position: 'absolute',
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 0 6px rgba(255,248,220,0.5)',
                opacity: Number(star.opacity),
                animation: `twinkle ${star.duration} ease-in-out infinite`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Light streaks */}
        <div className="hero-streak one" aria-hidden="true" style={{ position: 'absolute', zIndex: 1 }} />
        <div className="hero-streak two" aria-hidden="true" style={{ position: 'absolute', zIndex: 1 }} />

        {/* Title content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1rem' }}>
          <h1 className="hero-title" style={{ marginBottom: '0.5rem' }}>
            <span className="wordmark-glow" aria-hidden="true" />
            <span
              className="title-subtitle"
              style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)', letterSpacing: '0.22em', display: 'block', marginBottom: '0.4rem' }}
            >
              Welcome To
            </span>
            <span
              className="wordmark"
              style={{
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexWrap: 'wrap', gap: '0 0.18em',
              }}
            >
              <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                <span className="shooting-star-wrap">
                  <span className="shooting-star" />
                  <span style={{
                    fontSize: '200%', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle',
                    position: 'relative', zIndex: 1,
                    background: 'linear-gradient(90deg,#fff4d1 0%,#f3d37a 18%,#fff7e8 36%,#c59d3c 62%,#f6dea0 100%)',
                    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  }}>N</span>
                </span>
                orth
                <span style={{ fontSize: '200%', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }}>S</span>
                tar
              </span>
              {' '}
              <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: '200%', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }}>I</span>mplant
              </span>
              {' '}
              <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ fontSize: '200%', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }}>D</span>entistry
              </span>
            </span>
          </h1>

          <TaglineGlow />

          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '1.75rem' }}>
            <a className="button button-primary button-flash" href="#contact" style={{ minWidth: '160px' }}>
              Book Appointment
            </a>
            <a
              className="button button-primary"
              href="/patient-forms/"
              style={{ minWidth: '160px' }}
            >
              Patient Forms
            </a>
            <a className="button button-primary" href="#care-map" style={{ minWidth: '160px' }}>
              Explore Services
            </a>
            <DirectionsDropdown />
          </div>
        </div>
      </header>

      {/* A balanced introduction pairs practical information with the NorthStar image. */}
      <section className="northstar-intro" aria-labelledby="northstar-intro-title">
        <style>{`
          .northstar-intro { background: #07111c; color: #f7f3e9; padding: 56px 32px; }
          .northstar-intro-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
          .northstar-intro-copy { max-width: 490px; }
          .northstar-intro-eyebrow { color: #d7b65c; font-size: 12px; letter-spacing: .22em; text-transform: uppercase; margin: 0 0 24px; }
          .northstar-intro h2 { color: #f7f3e9; font-family: Georgia, serif; font-size: clamp(36px, 4.2vw, 58px); font-weight: 400; line-height: 1.12; margin: 0 0 26px; }
          .northstar-intro-description { color: #bbc4cf; font-size: 17px; line-height: 1.85; margin: 0 0 30px; }
          .northstar-intro-locations { border-top: 1px solid #d7b65c40; padding-top: 22px; margin-bottom: 32px; }
          .northstar-intro-locations span { display: block; font-size: 11px; color: #d7b65c; letter-spacing: .17em; text-transform: uppercase; margin-bottom: 10px; }
          .northstar-intro-locations p { margin: 0; color: #e5e8ed; font-size: 15px; line-height: 1.7; }
          .northstar-intro-cta { display: inline-block; background: linear-gradient(110deg, #f5dfa1, #cca244); color: #101820; border-radius: 999px; padding: 17px 27px; font-size: 14px; font-weight: 700; text-decoration: none; }
          .northstar-intro-cta:hover { filter: brightness(1.08); }
          .northstar-intro-cta:focus-visible { outline: 2px solid #f5dfa1; outline-offset: 5px; }
          .northstar-intro-art { width: 100%; max-width: 500px; justify-self: center; }
          .northstar-intro-art img { display: block; width: 100%; height: auto; mask-image: linear-gradient(to right, transparent, black 7%, black 93%, transparent); }
          @media (max-width: 700px) {
            .northstar-intro { padding: 44px 24px; }
            .northstar-intro-inner { grid-template-columns: 1fr; gap: 32px; }
            .northstar-intro-copy { max-width: 100%; }
            .northstar-intro-art { max-width: 360px; }
            .northstar-intro h2 { font-size: 38px; }
          }
        `}</style>
        <div className="northstar-intro-inner">
          <div className="northstar-intro-copy">
            <p className="northstar-intro-eyebrow">Your next chapter starts here</p>
            <h2 id="northstar-intro-title">A clear path to<br />your new smile.</h2>
            <p className="northstar-intro-description">
              Every smile has a story. At NorthStar Implant Dentistry, we help you
              explore your implant options with thoughtful evaluation, digital
              planning, and care tailored to your goals.
            </p>
            <div className="northstar-intro-locations">
              <span>Three locations. One commitment to your care.</span>
              <p>Briarwood · Manhattan · Commack</p>
            </div>
            <SiteLink className="northstar-intro-cta" href="/dental-implants/">
              Explore Dental Implants <span aria-hidden="true">→</span>
            </SiteLink>
          </div>
          <div className="northstar-intro-art">
            <img
              src="/assets/hero-bg.jpg"
              alt="Polar bear cub gazing at the North Star on a winter night"
              width={500}
              height={677}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Compass wheel on dark starry background
      ══════════════════════════════════════════════════════ */}
      <section
        aria-label="Service navigation compass"
        style={{
          background: 'linear-gradient(180deg, #07111c 0%, #0b1830 100%)',
          position: 'relative',
          overflow: 'hidden',
          paddingBottom: '2rem',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="compass-starfield" aria-hidden="true">
            {COMPASS_STARS.map((star, i) => (
              <span
                key={i}
                style={{ left: star.l, top: star.t, ['--s' as any]: star.s, ['--o' as any]: star.o, ['--d' as any]: star.d, ['--dl' as any]: star.dl } as React.CSSProperties}
              />
            ))}
          </div>
          <div
            className="compass-stage"
            style={{ maxWidth: '1040px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}
          >
            <div className="compass-badge">Hover to explore · Click to visit</div>
            <CompassGraphic wedges={wedges} onSound={playClick} />
          </div>
        </div>
      </section>

      <main>
        {/* ── Care map ── */}
        <section className="services-section" id="care-map">
          <div className="section-shell">
            <div className="section-heading" style={{ maxWidth: '100%' }}>
              <p className="section-kicker" style={{ color: '#c59d3c', fontSize: '1.54rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'normal', textAlign: 'left' }}>
                PLEASE USE THE MENU NAVIGATION COMPASS OR THE CARDS BELOW TO TAKE YOU TO EACH PAGE FOR FULL DETAILS
              </p>
            </div>
            <div className="care-grid">
              {menuItems.map((item, i) => (
                <CareCard key={item.label} item={item} isActive={i === activeIndex} />
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

        <section className="results-section" id="before-after">
          <div className="section-shell">
            <div className="section-heading" style={{ maxWidth: '100%' }}>
              <p className="section-kicker" style={{ color: '#c59d3c', fontSize: '1.54rem', fontWeight: 700, letterSpacing: '0.1em', whiteSpace: 'normal', textAlign: 'center' }}>
                ACTUAL PATIENT RESULTS &nbsp;·&nbsp; PLEASE USE THE SLIDER AT THE BOTTOM TO SEE BEFORE &amp; AFTER
              </p>
            </div>
            <div className="case-grid">
              {caseStudies.map((study, i) => (
                <CaseCard key={study.title} study={study} defaultPosition={i % 2 === 0 ? 50 : 57} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="contact-section" id="contact">
          <div className="section-shell">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div>
                <div className="section-heading left-aligned">
                  <p className="section-kicker" style={{ color: '#c59d3c' }}>Our Locations</p>
                  <h2 style={{ color: '#07111c' }}>Three convenient locations to serve you.</h2>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {[
                    { name: 'Briarwood, NY', address: '139-12 84th Drive, Suite 1G', city: 'Briarwood, NY', maps: 'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY' },
                    { name: 'New York, NY', address: '333 East 34th Street, Suite M1', city: 'New York, NY 10016', maps: 'https://maps.google.com/?q=333+East+34th+Street+Suite+M1+New+York+NY+10016' },
                    { name: 'Commack, NY', address: '283 Commack Road, Suite 130', city: 'Commack, NY 11725', maps: 'https://maps.google.com/?q=283+Commack+Road+Suite+130+Commack+NY+11725' },
                  ].map((loc) => (
                    <div key={loc.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', background: '#f4f6f9', gap: '1rem' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, color: '#07111c', fontSize: '0.95rem' }}>{loc.name}</p>
                        <p style={{ margin: 0, color: '#4a5668', fontSize: '0.88rem' }}>{loc.address}, {loc.city}</p>
                      </div>
                      <a href={loc.maps} target="_blank" rel="noreferrer" style={{ flexShrink: 0, padding: '0.4rem 0.9rem', borderRadius: '999px', background: 'linear-gradient(135deg,#f4d88c,#d1a245)', color: '#1d1302', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
                        Directions
                      </a>
                    </div>
                  ))}
                </div>
                <BrooklynNotice />
              </div>

              {formState.succeeded ? (
                <div className="inquiry-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px', gap: '1rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '2.5rem' }}>🌟</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#f3d37a', margin: 0 }}>Message Received!</h2>
                  <p style={{ color: '#b7c0cc', lineHeight: 1.7 }}>Thank you for reaching out. Dr. Kampf's team will be in touch with you shortly.</p>
                </div>
              ) : (
                <form className="inquiry-form" onSubmit={handleFormspreeSubmit}>
                  <div className="form-header">
                    <p className="section-kicker">Contact &amp; Schedule</p>
                    <h2>Request a consultation</h2>
                  </div>
                  <div className="field-grid">
                    <label><span>First Name</span><input type="text" name="firstName" placeholder="Jane" required /></label>
                    <label><span>Last Name</span><input type="text" name="lastName" placeholder="Smith" required /></label>
                  </div>
                  <div className="field-grid">
                    <label>
                      <span>Email</span><input type="email" name="email" placeholder="jane@example.com" required />
                      <ValidationError field="email" prefix="Email" errors={formState.errors} style={{ color: '#f87171', fontSize: '0.82rem' }} />
                    </label>
                    <label><span>Phone</span><input type="tel" name="phone" placeholder="(555) 000-0000" /></label>
                  </div>
                  <label>
                    <span>Message</span>
                    <textarea name="message" rows={3} placeholder="I'd like to learn more about implant options..." required />
                    <ValidationError field="message" prefix="Message" errors={formState.errors} style={{ color: '#f87171', fontSize: '0.82rem' }} />
                  </label>
                  <button className="button button-primary submit-button" type="submit" disabled={formState.submitting}>
                    {formState.submitting ? 'Sending…' : 'Submit Inquiry'}
                  </button>
                  <p className="form-note">Your message goes directly to the NorthStar team.</p>
                </form>
              )}
            </div>

            <div>
              <div className="section-heading left-aligned">
                <p className="section-kicker">Patient Trust</p>
                <h2>What our patients say.</h2>
              </div>
              <div className="testimonial-grid" id="testimonials">
                {testimonials.map((t) => (
                  <article key={t.label} className="testimonial-card">
                    <p>{t.quote}</p>
                    <h3>Patient Review</h3>
                    <span>{t.label}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer-row">
          <p>NorthStar Implant Dentistry · Briarwood · New York · Commack</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: '#c59d3c', display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: '#c59d3c', display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="YouTube" style={{ color: '#c59d3c', display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" title="TikTok" style={{ color: '#c59d3c', display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>
            <a href="#top" style={{ color: '#c59d3c' }}>Back to top ↑</a>
          </div>
        </div>
        <div className="section-shell" style={{ marginTop: '0.75rem', paddingBottom: '1rem' }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(197,157,60,0.5)', lineHeight: '1.6' }}>
            {'\u00A9'} {new Date().getFullYear()} NorthStar Implant Dentistry, P.C.{' '}
            All rights reserved. NorthStar Implant Dentistry{'\u2122'}, the NorthStar
            compass wheel design, and {'\u201C'}Guiding Patients One Smile at a
            Time{'\u201D'}{'\u2122'} are trademarks of NorthStar Implant Dentistry, P.C.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="/terms" style={{ color: 'rgba(197,157,60,0.5)', fontSize: '0.78rem', textDecoration: 'underline' }}>
              Terms of Use {'&'} IP Notice
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
