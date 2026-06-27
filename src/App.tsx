/**
 * NorthStar Implant Dentistry — App.tsx
 *
 * This file was split (June 2026) from a single 2.4MB / 3200-line file into
 * a normal modular structure. The previous monolith was massive almost
 * entirely because 17 images were embedded directly as base64 strings
 * (~2.2MB of that was image data, not code) plus ~900 lines of CSS-in-JS
 * and several reusable sub-components were all in this one file.
 *
 * New structure:
 *   src/types.ts                  — MenuItem / CaseStudy / Wedge types
 *   src/assets/imagePaths.ts      — image path constants (real files now in /public/assets)
 *   src/styles/globalStyles.ts    — buildStyles() — the big injected CSS string
 *   src/data/menuData.ts          — menuItems, caseStudies, careCardAnchors, compass constants
 *   src/data/stars.ts             — hero starfield data
 *   src/data/compassStars.ts      — compass-section starfield data
 *   src/utils/geometry.ts         — polarToCartesian, wedgePath
 *   src/utils/sound.ts            — playCardClick, playWedgeTone (UI click tones)
 *   src/components/DirectionsDropdown.tsx
 *   src/components/InfoCard.tsx
 *   src/components/CareCard.tsx
 *   src/components/CaseCard.tsx
 *   src/components/CompassGraphic.tsx
 *   src/components/TaglineGlow.tsx
 *   src/App.tsx                   — this file: page composition, state, effects, JSX
 *
 * NOTE: InfoCard and ACTIVE_POINTER_OFFSET were already unused in the
 * original file — kept here as-is, not removed, in case they're WIP.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { navigate } from './Root';
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

  // FIX: CSS is injected into <head> here so body/html/:root rules actually apply.
  useEffect(() => {
    const tag = document.createElement('style');
    tag.setAttribute('data-northstar', 'global');
    tag.textContent = buildStyles(HERO_BG_SRC);
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  // Mobile nav-card carousel scroll progress indicator (mirrors the one
  // used on internal pages) — shows position/remaining across the 11 cards.
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
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

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

  // Same progress indicator for the Specialized Circumstances carousel
  // (Wisdom Teeth, Sedation, Testimonials, Contact, etc.)
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
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

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

  // ── SEO: homepage meta tags + Schema.org ──────────────────────────────────
  useEffect(() => {
    document.title =
      'NorthStar Implant Dentistry | Briarwood · New York · Commack';
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };
    const setOG = (prop: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${prop}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setMeta(
      'description',
      'NorthStar Implant Dentistry — Advanced dental implants, bone grafting, full-arch restoration, zygomatic implants, and wisdom teeth surgery. Serving Briarwood, New York, and Commack, NY. Call 631-315-1400.'
    );
    setMeta(
      'keywords',
      'dental implants, implant dentistry, bone grafting, full arch implants, zygomatic implants, wisdom teeth, Briarwood NY, Queens NY, Commack NY, NorthStar Implant Dentistry'
    );
    setMeta('robots', 'index, follow');
    setMeta('author', 'NorthStar Implant Dentistry');
    setOG(
      'og:title',
      'NorthStar Implant Dentistry | Advanced Implant Surgery NY'
    );
    setOG(
      'og:description',
      'Guiding Patients One Smile at a Time. Advanced implant dentistry serving Briarwood, New York, and Commack. Call 631-315-1400.'
    );
    setOG('og:type', 'website');
    setOG('og:url', 'https://www.northstarimplants.com');
    // Canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.northstarimplants.com';
    // Sitemap link
    if (!document.querySelector('link[rel="sitemap"]')) {
      const sm = document.createElement('link');
      sm.rel = 'sitemap';
      sm.type = 'application/xml';
      sm.href = '/sitemap.xml';
      document.head.appendChild(sm);
    }
    // Schema.org
    if (!document.getElementById('schema-northstar-home')) {
      const schema = document.createElement('script');
      schema.id = 'schema-northstar-home';
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: 'NorthStar Implant Dentistry',
        url: 'https://www.northstarimplants.com',
        telephone: '+1-631-315-1400',
        description:
          'Advanced dental implant surgery, bone grafting, full-arch restoration, zygomatic implants, wisdom teeth extraction, and sedation dentistry. Serving Briarwood, New York, and Commack.',
        priceRange: '$$$$',
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: '139-12 84th Drive, Suite 1G',
            addressLocality: 'Briarwood',
            addressRegion: 'NY',
            postalCode: '11435',
            addressCountry: 'US',
          },
          {
            '@type': 'PostalAddress',
            addressLocality: 'New York',
            addressRegion: 'NY',
            addressCountry: 'US',
          },
          {
            '@type': 'PostalAddress',
            addressLocality: 'Commack',
            addressRegion: 'NY',
            addressCountry: 'US',
          },
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 40.6957,
          longitude: -73.8163,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
          },
        ],
        sameAs: [
          'https://www.facebook.com/northstarimplants',
          'https://www.instagram.com/northstarimplants',
        ],
        hasMap:
          'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY',
        medicalSpecialty: 'Oral and Maxillofacial Surgery',
        founder: {
          '@type': 'Person',
          name: 'Dr. Peter R. Kampf',
          jobTitle: 'Oral Surgeon & Implantologist',
        },
        availableService: [
          'Dental Implants',
          'Full-Arch Restoration',
          'Zygomatic Implants',
          'Bone Grafting',
          'Sinus Lifts',
          'Wisdom Teeth Extraction',
          'Sedation Dentistry',
          'Sub-Periosteal Implants',
          'Trans-Mandibular Implants',
        ],
      });
      document.head.appendChild(schema);
    }
  }, []);

  // FIX: useMemo is now actually used — memoises the wedge calculations.
  const wedges = useMemo<Wedge[]>(
    () =>
      menuItems.map((item, index) => {
        const centerAngle = START_ANGLE + index * STEP;
        return {
          item,
          index,
          centerAngle,
          startAngle: centerAngle - STEP / 2,
          endAngle: centerAngle + STEP / 2,
        };
      }),
    []
  );

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName ?? '';
      if (['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(tag)) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % TOTAL);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
      } else if (e.key === 'Enter') {
        const section = document.querySelector(activeItem.href);
        if (section) {
          e.preventDefault();
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem.href]);

  function playClick() {
    try {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
      osc.onended = () => ctx.close();
    } catch (_) {}
  }

  return (
    <>
      {/* Ambient glows */}
      <div className="page-glow page-glow-left" aria-hidden="true" />
      <div className="page-glow page-glow-right" aria-hidden="true" />

      {/* ── Click-to-call bar + Mobile Nav ── */}
      <div style={{ position: 'relative' as const }}>
        <div
          style={{
            background: '#f8f9fb',
            borderBottom: '1px solid rgba(197,157,60,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '0.5rem 3.5rem 0.5rem 1rem',
            fontSize: '0.82rem',
            color: 'rgba(7,17,28,0.75)',
            flexWrap: 'wrap' as const,
            position: 'relative' as const,
          }}
          role="banner"
          aria-label="Contact bar"
        >
          <span>📍 Briarwood · New York · Commack</span>
          <span aria-hidden="true">·</span>
          <a
            href="tel:6313151400"
            style={{
              color: '#f3d37a',
              fontWeight: 700,
              fontSize: '0.95rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
            aria-label="Call NorthStar at 631-315-1400"
          >
            📞 631-315-1400
          </a>
          <span aria-hidden="true">·</span>
          <span>Mon–Fri 9am–5pm</span>
          <button
            className="app-nav-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav
          className={`app-nav-mobile${mobileNavOpen ? ' open' : ''}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                navigate(item.href);
                setMobileNavOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <a href="tel:6313151400" className="call-link">
            📞 631-315-1400
          </a>
        </nav>
      </div>

      {/* ── Hero ── */}
      {/* Dusk sky: was a 1MB embedded photo + a heavy dark overlay (rgba(7,17,28)
          climbing to fully opaque). Replaced with a CSS gradient that still ends
          on the same navy (#07111c) so it blends into the compass section below,
          but is lighter and warmer through the upper/middle portion. */}
      <header
        className="hero"
        id="top"
        style={{
          background:
            'linear-gradient(180deg, #232a4d 0%, #3d4280 16%, #6c5a93 34%, #b97a8a 50%, #d99a6c 62%, #6b4a5c 76%, #1c2438 90%, #07111c 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        {/* Soft diagonal Milky Way band */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background:
              'linear-gradient(108deg, transparent 28%, rgba(255,255,255,0.06) 42%, rgba(255,250,235,0.14) 50%, rgba(255,255,255,0.06) 58%, transparent 72%)',
            pointerEvents: 'none',
          }}
        />
        <div className="section-shell">
          <div className="hero-starfield" aria-hidden="true">
            {STARS.map((star, i) => (
              <span
                key={i}
                style={
                  {
                    left: star.left,
                    top: star.top,
                    ['--size']: star.size,
                    ['--opacity']: star.opacity,
                    ['--duration']: star.duration,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="hero-streak one" aria-hidden="true" />
          <div className="hero-streak two" aria-hidden="true" />

          {/* ── Title block ── */}
          <div
            style={{
              textAlign: 'center',
              paddingTop: '3rem',
              paddingBottom: '2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <h1 className="hero-title">
              <span className="wordmark-glow" aria-hidden="true" />
              <span className="title-subtitle">Welcome To</span>
              <span
                className="wordmark"
                style={{
                  fontSize: 'clamp(2.13rem, 5.33vw, 3.47rem)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                  <span className="shooting-star-wrap">
                    <span className="shooting-star" />
                    <span
                      style={{
                        fontSize: '200%',
                        lineHeight: 1,
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        position: 'relative',
                        zIndex: 1,
                        background:
                          'linear-gradient(90deg, #fff4d1 0%, #f3d37a 18%, #fff7e8 36%, #c59d3c 62%, #f6dea0 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      N
                    </span>
                  </span>
                  orth
                  <span
                    style={{
                      fontSize: '200%',
                      lineHeight: 1,
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  >
                    S
                  </span>
                  tar
                </span>
                &nbsp;
                <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '200%',
                      lineHeight: 1,
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  >
                    I
                  </span>
                  mplant
                </span>
                &nbsp;
                <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '200%',
                      lineHeight: 1,
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  >
                    D
                  </span>
                  entistry
                </span>
              </span>
            </h1>
            <TaglineGlow />
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a
                className="button button-primary button-flash"
                href="#contact"
                style={{ minWidth: '160px' }}
              >
                Book Appointment
              </a>
              <a
                className="button button-primary"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/patient-forms');
                }}
                style={{ minWidth: '160px' }}
              >
                Patient Forms
              </a>
              <a
                className="button button-primary"
                href="#care-map"
                style={{ minWidth: '160px' }}
              >
                Explore Services
              </a>
              <DirectionsDropdown />
            </div>
          </div>

          {/* ── Compass ── */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="compass-starfield" aria-hidden="true">
              {COMPASS_STARS.map((star, i) => (
                <span
                  key={i}
                  style={
                    {
                      left: star.l,
                      top: star.t,
                      ['--s' as any]: star.s,
                      ['--o' as any]: star.o,
                      ['--d' as any]: star.d,
                      ['--dl' as any]: star.dl,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <div
              className="compass-stage"
              style={{
                maxWidth: '1040px',
                margin: '0 auto',
                width: '100%',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div className="compass-badge">
                Hover to explore · Click to visit
              </div>
              <CompassGraphic wedges={wedges} onSound={playClick} />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── Care map ── */}
        <section className="services-section" id="care-map">
          <div className="section-shell">
            <div className="section-heading" style={{ maxWidth: '100%' }}>
              <p
                className="section-kicker"
                style={{
                  color: '#c59d3c',
                  fontSize: '1.54rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  whiteSpace: 'normal',
                  textAlign: 'left',
                }}
              >
                PLEASE USE THE MENU NAVIGATION COMPASS OR THE CARDS BELOW TO
                TAKE YOU TO EACH PAGE FOR FULL DETAILS
              </p>
            </div>
            <div className="care-grid">
              {menuItems.map((item, i) => (
                <CareCard
                  key={item.label}
                  item={item}
                  isActive={i === activeIndex}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Specialized Circumstances heading ── */}
        <div style={{ background: '#ffffff', padding: '2rem 0 0' }}>
          <div className="section-shell">
            <p
              className="section-kicker"
              style={{
                color: '#c59d3c',
                fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                fontWeight: 700,
                fontStyle: 'italic',
                letterSpacing: '0.1em',
                textAlign: 'center',
              }}
            >
              SPECIALIZED CIRCUMSTANCES
            </p>
          </div>
        </div>

        {/* ── Feature cards ── */}
        <section className="signature-section" id="technology">
          <div className="section-shell signature-grid">
            {featureCards.map((f) => (
              <article
                key={f.title}
                className="feature-card"
                onClick={() => navigate((f as any).slug)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'transform 150ms ease, box-shadow 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 14px 36px rgba(197,157,60,0.18)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    navigate((f as any).slug);
                }}
              >
                <p
                  className="feature-kicker feature-kicker-flash"
                  style={{ textAlign: 'center' }}
                >
                  {f.eyebrow}
                </p>
                <h2 style={{ textAlign: 'center' }}>{f.title}</h2>
                {(f as any).description && (
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.82)',
                      textAlign: 'center',
                      margin: '0.5rem 0 0.75rem',
                    }}
                  >
                    {(f as any).description}
                  </p>
                )}
                {/* ── Photo placeholder or real image ── */}
                {(f as any).imageSrc ? (
                  <img
                    src={(f as any).imageSrc}
                    alt={f.title}
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      borderRadius: '0.9rem',
                      marginTop: 'auto',
                      display: 'block',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      borderRadius: '0.9rem',
                      marginTop: 'auto',
                      paddingTop: '1.2rem',
                      background:
                        'linear-gradient(135deg, rgba(197,157,60,0.1) 0%, rgba(10,20,36,0.45) 100%)',
                      border: '1px dashed rgba(197,157,60,0.35)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      color: 'rgba(197,157,60,0.6)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    Add Photo
                  </div>
                )}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#c59d3c',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    marginTop: '1rem',
                  }}
                >
                  Learn More →
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="results-section" id="before-after">
          <div className="section-shell">
            <div className="section-heading" style={{ maxWidth: '100%' }}>
              <p
                className="section-kicker"
                style={{
                  color: '#c59d3c',
                  fontSize: '1.54rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                }}
              >
                ACTUAL PATIENT RESULTS &nbsp;·&nbsp; PLEASE USE THE SLIDER AT
                THE BOTTOM TO SEE BEFORE &amp; AFTER
              </p>
            </div>
            <div className="case-grid">
              {caseStudies.map((study, i) => (
                <CaseCard
                  key={study.title}
                  study={study}
                  defaultPosition={i % 2 === 0 ? 50 : 57}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="contact-section" id="contact">
          <div className="section-shell">
            {/* ── Row 1: Locations + Form side by side ── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                alignItems: 'start',
                marginBottom: '1.5rem',
              }}
            >
              {/* Locations column */}
              <div>
                <div className="section-heading left-aligned">
                  <p className="section-kicker" style={{ color: '#c59d3c' }}>
                    Our Locations
                  </p>
                  <h2 style={{ color: '#07111c' }}>
                    Three convenient locations to serve you.
                  </h2>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {[
                    {
                      name: 'Briarwood, NY',
                      address: '139-12 84th Drive, Suite 1G',
                      city: 'Briarwood, NY',
                      maps: 'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY',
                    },
                    {
                      name: 'New York, NY',
                      address: '333 East 34th Street, Suite M1',
                      city: 'New York, NY 10016',
                      maps: 'https://maps.google.com/?q=333+East+34th+Street+Suite+M1+New+York+NY+10016',
                    },
                    {
                      name: 'Commack, NY',
                      address: '283 Commack Road, Suite 130',
                      city: 'Commack, NY 11725',
                      maps: 'https://maps.google.com/?q=283+Commack+Road+Suite+130+Commack+NY+11725',
                    },
                  ].map((loc) => (
                    <div
                      key={loc.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '1rem',
                        border: '1px solid #e2e8f0',
                        background: '#f4f6f9',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: 600,
                            color: '#07111c',
                            fontSize: '0.95rem',
                          }}
                        >
                          {loc.name}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            color: '#4a5668',
                            fontSize: '0.88rem',
                          }}
                        >
                          {loc.address}, {loc.city}
                        </p>
                      </div>
                      <a
                        href={loc.maps}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          flexShrink: 0,
                          padding: '0.4rem 0.9rem',
                          borderRadius: '999px',
                          background: 'linear-gradient(135deg,#f4d88c,#d1a245)',
                          color: '#1d1302',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          textDecoration: 'none',
                        }}
                      >
                        Directions
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form column */}
              {formState.succeeded ? (
                <div
                  className="inquiry-form"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '280px',
                    gap: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '2.5rem' }}>🌟</p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: '#f3d37a',
                      margin: 0,
                    }}
                  >
                    Message Received!
                  </h2>
                  <p style={{ color: '#b7c0cc', lineHeight: 1.7 }}>
                    Thank you for reaching out. Dr. Kampf's team will be in
                    touch with you shortly.
                  </p>
                </div>
              ) : (
                <form className="inquiry-form" onSubmit={handleFormspreeSubmit}>
                  <div className="form-header">
                    <p className="section-kicker">Contact &amp; Schedule</p>
                    <h2>Request a consultation</h2>
                  </div>
                  <div className="field-grid">
                    <label>
                      <span>First Name</span>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Jane"
                        required
                      />
                    </label>
                    <label>
                      <span>Last Name</span>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Smith"
                        required
                      />
                    </label>
                  </div>
                  <div className="field-grid">
                    <label>
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="jane@example.com"
                        required
                      />
                      <ValidationError
                        field="email"
                        prefix="Email"
                        errors={formState.errors}
                        style={{ color: '#f87171', fontSize: '0.82rem' }}
                      />
                    </label>
                    <label>
                      <span>Phone</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(555) 000-0000"
                      />
                    </label>
                  </div>
                  <label>
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="I'd like to learn more about implant options..."
                      required
                    />
                    <ValidationError
                      field="message"
                      prefix="Message"
                      errors={formState.errors}
                      style={{ color: '#f87171', fontSize: '0.82rem' }}
                    />
                  </label>
                  <button
                    className="button button-primary submit-button"
                    type="submit"
                    disabled={formState.submitting}
                  >
                    {formState.submitting ? 'Sending…' : 'Submit Inquiry'}
                  </button>
                  <p className="form-note">
                    Your message goes directly to the NorthStar team.
                  </p>
                </form>
              )}
            </div>

            {/* ── Row 2: Testimonials full width ── */}
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
            {/* Social Media Links — replace # with actual URLs when ready */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              style={{
                color: '#c59d3c',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              style={{
                color: '#c59d3c',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              style={{
                color: '#c59d3c',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon
                  points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok"
              style={{
                color: '#c59d3c',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
              </svg>
            </a>
            <a href="#top" style={{ color: '#c59d3c' }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
