/**
 * PageLayout.tsx — Shared layout for all inner pages.
 * Uses custom navigate() instead of react-router-dom.
 * v3 — SEO meta tags, Schema.org, click-to-call, mobile nav, reduced motion, lazy images
 */
import React from 'react';
import { navigate } from './Root';

// ── SEO / Schema.org head injection ──────────────────────────────────────────
function SEOHead({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  React.useEffect(() => {
    // Title
    document.title = `${title} | NorthStar Implant Dentistry`;
    // Meta description
    let meta = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
    // OG tags
    const og = (prop: string, val: string) => {
      let el = document.querySelector(
        `meta[property="${prop}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.content = val;
    };
    og('og:title', `${title} | NorthStar Implant Dentistry`);
    og('og:description', description);
    og('og:type', 'website');
    og('og:url', window.location.href);
    // Schema.org local business (injected once)
    if (!document.getElementById('schema-northstar')) {
      const schema = document.createElement('script');
      schema.id = 'schema-northstar';
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: 'NorthStar Implant Dentistry',
        url: 'https://www.northstarimplants.com',
        telephone: '+1-631-315-1400',
        image: 'https://www.northstarimplants.com/logo.png',
        description:
          'NorthStar Implant Dentistry — Advanced implant surgery, bone grafting, full-arch restoration, and specialized implant solutions. Serving Briarwood, New York, and Commack.',
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
            streetAddress: '[EDIT: NYC address]',
            addressLocality: 'New York',
            addressRegion: 'NY',
            addressCountry: 'US',
          },
          {
            '@type': 'PostalAddress',
            streetAddress: '[EDIT: Commack address]',
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
            closes: '21:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:00',
            closes: '15:00',
          },
        ],
        sameAs: [
          'https://www.facebook.com/northstarimplants',
          'https://www.instagram.com/northstarimplants',
          'https://www.youtube.com/@northstarimplants',
        ],
        hasMap:
          'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY',
        medicalSpecialty: 'Oral and Maxillofacial Surgery',
        availableService: [
          'Dental Implants',
          'Full-Arch Restoration',
          'Bone Grafting',
          'Sinus Lifts',
          'Wisdom Teeth Extraction',
          'Sedation Dentistry',
          'Zygomatic Implants',
          'Sub-Periosteal Implants',
        ],
      });
      document.head.appendChild(schema);
    }
    return () => {
      document.title = 'NorthStar Implant Dentistry';
    };
  }, [title, description]);
  return null;
}

const menuItems = [
  { label: 'About', href: '/about' },
  { label: 'Procedures', href: '/procedures' },
  { label: 'Dental Implants', href: '/dental-implants' },
  { label: 'Full-Arch', href: '/full-arch' },
  { label: 'Wisdom Teeth', href: '/wisdom-teeth' },
  { label: 'Sedation', href: '/sedation' },
  { label: 'Patient Info', href: '/patient-information' },
  { label: 'Technology', href: '/technology' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
  { label: 'Locations', href: '/locations' },
];

const pageStyles = `
    .page-root {
      min-height: 100vh;
      background: #f4f6f9;
      font-family: "Aptos", "Segoe UI", sans-serif;
      color: #1a2636;
    }
    .page-nav {
      background: #07111c;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 16px rgba(0,0,0,0.3);
    }
    .page-nav-brand {
      font-family: "Cormorant Garamond", "Palatino Linotype", serif;
      font-size: 1.1rem;
      background: linear-gradient(90deg, #fff4d1, #f3d37a, #fff7e8);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      white-space: nowrap;
      padding: 1rem 0;
      text-decoration: none;
      cursor: pointer;
    }
    .page-nav-links {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .page-nav-links button {
      display: block;
      padding: 0.5rem 0.75rem;
      font-size: 0.78rem;
      letter-spacing: 0.04em;
      color: #b7c0cc;
      background: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 150ms, color 150ms;
      font-family: inherit;
    }
    .page-nav-links button:hover {
      background: rgba(243,211,122,0.12);
      color: #f3d37a;
    }
    .page-hero {
      background: linear-gradient(135deg, #ffffff 0%, #f8f9fb 60%, #f0f3f7 100%);
      border-bottom: 3px solid #c59d3c;
      padding: 4rem 2rem 3rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .page-hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 60% 40%, rgba(243,211,122,0.12), transparent 60%);
      pointer-events: none;
    }
    .page-hero-kicker {
      font-size: 0.75rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #c59d3c;
      margin: 0 0 0.75rem;
    }
    .page-hero-title {
      font-family: "Cormorant Garamond", "Palatino Linotype", serif;
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      color: #07111c;
      margin: 0 0 1rem;
      position: relative;
      z-index: 1;
    }
    .page-hero-subtitle {
      font-size: 1.05rem;
      color: #4a5668;
      max-width: 560px;
      margin: 0 auto 1.75rem;
      line-height: 1.7;
      position: relative;
      z-index: 1;
    }
    .page-hero-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.6rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #f4d88c, #d1a245);
      color: #1d1302;
      font-weight: 700;
      font-size: 0.95rem;
      border: none;
      cursor: pointer;
      position: relative;
      z-index: 1;
      transition: transform 180ms;
      font-family: inherit;
    }
    .page-hero-cta:hover { transform: translateY(-2px); }
    .page-body {
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 2rem 5rem;
    }
    .page-section {
      background: #fff;
      border-radius: 1.25rem;
      padding: 2rem 2.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 24px rgba(0,0,0,0.06);
      border: 1px solid #e8ecf2;
    }
    .page-section h2 {
      font-family: "Cormorant Garamond", "Palatino Linotype", serif;
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      color: #07111c;
      margin: 0 0 0.75rem;
    }
    .page-section p {
      color: #4a5668;
      line-height: 1.8;
      margin: 0 0 1rem;
    }
    .page-section p:last-child { margin-bottom: 0; }
    .page-section ul {
      color: #4a5668;
      line-height: 1.8;
      padding-left: 1.25rem;
      margin: 0 0 1rem;
    }
    .page-section ul li { margin-bottom: 0.4rem; }
    .page-kicker {
      font-size: 0.72rem;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #c59d3c;
      margin: 0 0 0.5rem;
    }
    .page-card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
      gap: 1rem;
      margin-top: 1.25rem;
    }
    .page-card {
      background: #f4f6f9;
      border-radius: 1rem;
      padding: 1.25rem;
      border: 1px solid #e2e8f0;
    }
    .page-card h3 {
      font-family: "Cormorant Garamond", "Palatino Linotype", serif;
      font-size: 1.2rem;
      color: #07111c;
      margin: 0 0 0.4rem;
    }
    .page-card p {
      font-size: 0.9rem;
      color: #5a6a7e;
      margin: 0;
      line-height: 1.6;
    }
    .page-card-progress { display: none; }
    .page-back-bar {
      background: #fff;
      border-bottom: 1px solid #e8ecf2;
      padding: 0.75rem 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: #5a6a7e;
    }
    .page-back-btn {
      color: #c59d3c;
      background: none;
      border: none;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
      padding: 0;
      font-family: inherit;
    }
    .page-back-btn:hover { text-decoration: underline; }
    .page-footer {
      background: #07111c;
      color: rgba(246,242,234,0.6);
      text-align: center;
      padding: 1.5rem;
      font-size: 0.85rem;
    }
    .page-footer-link {
      color: #f3d37a;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 0.85rem;
      font-family: inherit;
    }
    /* ── Click-to-call sticky bar ── */
    .page-call-bar {
      background: linear-gradient(90deg, #07111c, #0d1f32);
      border-bottom: 1px solid rgba(197,157,60,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.45rem 1rem;
      font-size: 0.82rem;
      color: rgba(246,242,234,0.7);
      flex-wrap: wrap;
    }
    .page-call-bar a {
      color: #f3d37a;
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .page-call-bar a:hover { text-decoration: underline; }
    /* ── Mobile hamburger nav ── */
    .page-nav-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      color: #f3d37a;
      font-size: 1.4rem;
      line-height: 1;
    }
    .page-nav-mobile {
      display: none;
      flex-direction: column;
      background: #07111c;
      border-top: 1px solid rgba(197,157,60,0.15);
      padding: 0.5rem 0 1rem;
    }
    .page-nav-mobile.open { display: flex; }
    .page-nav-mobile button {
      background: none;
      border: none;
      color: #b7c0cc;
      padding: 0.7rem 1.5rem;
      text-align: left;
      font-size: 0.92rem;
      font-family: inherit;
      cursor: pointer;
      width: 100%;
    }
    .page-nav-mobile button:hover { color: #f3d37a; background: rgba(243,211,122,0.07); }
    /* ── Lazy image fade-in ── */
    img[loading="lazy"] { opacity: 0; transition: opacity 0.4s ease; }
    img[loading="lazy"].loaded { opacity: 1; }
    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
    /* ── Mobile responsive ── */
    @media (max-width: 768px) {
      .page-nav-links { display: none; }
      .page-nav-toggle { display: block; }
      .page-section { padding: 1.25rem 1rem; position: relative; }
      .page-body { padding: 1.5rem 0.75rem 3rem; }
      .page-hero { padding: 2.5rem 1rem 2rem; }
      .page-hero-title { font-size: clamp(1.5rem, 6vw, 2.4rem); }
      .page-hero-subtitle { font-size: 0.95rem; }
      .page-call-bar { font-size: 0.78rem; gap: 0.5rem; padding: 0.5rem; }
      .page-hero-cta { min-height: 44px; padding: 0.9rem 1.8rem; font-size: 0.95rem; }
      .page-back-bar { padding: 0.6rem 1rem; }
      .page-section h2 { font-size: clamp(1.3rem, 5vw, 2rem); }
      .page-section ul { padding-left: 1rem; }
      .page-nav-mobile button { min-height: 44px; display: flex; align-items: center; }

      /* ── Card grid → swipeable horizontal carousel ──
         Replaces the cramped single-column stack with a snap-scrolling
         row that peeks the next card, signaling "there's more →" */
      .page-card-grid {
        display: flex;
        grid-template-columns: unset;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: visible;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        gap: 0.85rem;
        margin: 1.25rem -1rem 0.35rem;
        padding: 0.15rem 1rem 0.85rem;
      }
      .page-card-grid::-webkit-scrollbar { display: none; }
      .page-card-grid .page-card {
        scroll-snap-align: start;
        flex: 0 0 80%;
        min-width: 80%;
      }
      /* Scroll-progress thumb under the carousel */
      .page-card-progress {
        display: block;
        position: relative;
        height: 4px;
        background: #e2e8f0;
        border-radius: 999px;
        overflow: hidden;
        margin: 0 0 1.1rem;
      }
      .page-card-progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #c59d3c;
        border-radius: 999px;
        will-change: transform, width;
      }
      /* Edge fade hints that more cards exist off-screen */
      .page-section::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 28px;
        background: linear-gradient(to right, rgba(255,255,255,0), #fff);
        pointer-events: none;
        border-radius: 0 1.25rem 1.25rem 0;
      }
      .page-section:not(:has(.page-card-grid))::after { display: none; }
    }
    @media (max-width: 480px) {
      .page-card-grid .page-card { flex: 0 0 86%; min-width: 86%; }
      .page-section { padding: 1rem 0.85rem; }
      .page-hero-title { font-size: clamp(1.3rem, 7vw, 1.9rem); }
    }
  `;

export function PageLayout({
  children,
  kicker,
  title,
  subtitle,
  description,
}: {
  children: React.ReactNode;
  kicker: string;
  title: string;
  subtitle: string;
  description?: string;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Lazy image observer
  React.useEffect(() => {
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLImageElement).classList.add('loaded');
          observer.unobserve(e.target);
        }
      });
    });
    imgs.forEach((img) => observer.observe(img));
    return () => observer.disconnect();
  }, []);

  // Mobile card-carousel scroll progress indicator.
  // Injects a thin "thumb" track under each .page-card-grid sized to the
  // visible fraction of cards and positioned to match scroll progress —
  // shows both "where am I" and "how much more" at a glance.
  React.useEffect(() => {
    const grids = Array.from(
      document.querySelectorAll<HTMLElement>('.page-card-grid')
    );
    const teardowns: Array<() => void> = [];

    grids.forEach((grid) => {
      const track = document.createElement('div');
      track.className = 'page-card-progress';
      track.setAttribute('aria-hidden', 'true');
      const thumb = document.createElement('div');
      thumb.className = 'page-card-progress-bar';
      track.appendChild(thumb);
      grid.insertAdjacentElement('afterend', track);

      let raf = 0;
      const update = () => {
        const max = grid.scrollWidth - grid.clientWidth;
        const thumbPct = Math.max(
          12,
          (grid.clientWidth / grid.scrollWidth) * 100
        );
        const leftPct =
          max > 0 ? (grid.scrollLeft / max) * (100 - thumbPct) : 0;
        thumb.style.width = `${thumbPct}%`;
        thumb.style.transform = `translateX(${leftPct}%)`;
        // Hide entirely if everything fits (nothing to scroll, e.g. desktop)
        track.style.display = max > 4 ? '' : 'none';
      };
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(update);
      };

      update();
      grid.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', update);
      teardowns.push(() => {
        grid.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', update);
        cancelAnimationFrame(raf);
        track.remove();
      });
    });

    return () => teardowns.forEach((fn) => fn());
  }, []);

  return (
    <div className="page-root">
      <style>{pageStyles}</style>
      <SEOHead title={title} description={description || subtitle} />

      {/* ── Click-to-call bar ── */}
      <div className="page-call-bar" role="banner" aria-label="Contact bar">
        <span>📍 Briarwood · New York · Commack</span>
        <span>·</span>
        <a
          href="tel:6313151400"
          aria-label="Call NorthStar Implant Dentistry at 631-315-1400"
        >
          📞 631-315-1400
        </a>
        <span>·</span>
        <span>Mon–Fri 9am–9pm</span>
      </div>

      {/* ── Nav ── */}
      <nav className="page-nav" role="navigation" aria-label="Main navigation">
        <span
          className="page-nav-brand"
          onClick={() => navigate('/')}
          role="link"
          tabIndex={0}
          aria-label="NorthStar Implant Dentistry home"
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
        >
          Dr. Peter Kampf &amp; Associates
        </span>
        <ul className="page-nav-links" role="list">
          {menuItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => navigate(item.href)}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Mobile hamburger */}
        <button
          className="page-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* ── Mobile nav drawer ── */}
      <div
        className={`page-nav-mobile${mobileOpen ? ' open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {menuItems.map((item) => (
          <button
            key={item.href}
            onClick={() => {
              navigate(item.href);
              setMobileOpen(false);
            }}
          >
            {item.label}
          </button>
        ))}
        <a
          href="tel:6313151400"
          style={{
            padding: '0.7rem 1.5rem',
            color: '#f3d37a',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
          }}
        >
          📞 631-315-1400
        </a>
      </div>

      {/* ── Back breadcrumb ── */}
      <div className="page-back-bar" role="navigation" aria-label="Breadcrumb">
        <button
          className="page-back-btn"
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          ← Back to Home
        </button>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </div>

      {/* ── Page hero ── */}
      <div className="page-hero" role="banner">
        <p className="page-hero-kicker">{kicker}</p>
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-subtitle">{subtitle}</p>
        <button
          className="page-hero-cta"
          onClick={() => navigate('/contact')}
          aria-label="Book a consultation with NorthStar Implant Dentistry"
        >
          Book a Consultation
        </button>
      </div>

      {/* ── Page body ── */}
      <main className="page-body" role="main">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="page-footer" role="contentinfo">
        <p>
          NorthStar Implant Dentistry &nbsp;·&nbsp; Briarwood · New York ·
          Commack &nbsp;·&nbsp;{' '}
          <a
            href="tel:6313151400"
            style={{ color: '#f3d37a' }}
            aria-label="Call us at 631-315-1400"
          >
            631-315-1400
          </a>
        </p>
        <p
          style={{
            marginTop: '0.35rem',
            fontSize: '0.78rem',
            color: 'rgba(197,157,60,0.5)',
          }}
        >
          © {new Date().getFullYear()} NorthStar Implant Dentistry, P.C. All
          rights reserved. NorthStar Implant Dentistry™, the NorthStar
          compass wheel design, and &#8220;Guiding Patients One Smile at a
          Time&#8221;™ are trademarks of NorthStar Implant Dentistry, P.C.
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <button
            className="page-footer-link"
            onClick={() => navigate('/')}
            aria-label="Return to homepage"
          >
            ← Return to Homepage
          </button>
          <span style={{ margin: '0 0.5rem', color: 'rgba(197,157,60,0.4)' }}>
            ·
          </span>
          <button
            className="page-footer-link"
            onClick={() => navigate('/terms')}
            aria-label="Terms of Use and Intellectual Property Notice"
          >
            Terms of Use
          </button>
        </p>
      </footer>
    </div>
  );
}
