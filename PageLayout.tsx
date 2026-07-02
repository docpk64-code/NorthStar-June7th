export const buildStyles = (heroBg: string) => `
   :root {
     --text: #f6f2ea;
     --muted: #b7c0cc;
     --gold-strong: #f3d37a;
     --shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
     --panel-border: rgba(255, 244, 214, 0.12);
   }
   
   * { box-sizing: border-box; }
   html { scroll-behavior: smooth; overflow-x: hidden; width: 100%; }
   body {
     margin: 0;
     overflow-x: hidden;
     width: 100%;
     font-family: "Aptos", "Segoe UI", sans-serif;
     color: var(--text);
     background:
       radial-gradient(circle at top left, rgba(127, 29, 29, 0.08), transparent 35%),
       radial-gradient(circle at top right, rgba(224, 189, 112, 0.12), transparent 40%),
       linear-gradient(180deg, #ffffff 0%, #f8f9fb 50%, #f3f5f7 100%);
   }
   body::before {
     content: "";
     position: fixed;
     inset: 0;
     background-image:
       linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
       linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
     background-size: 28px 28px;
     opacity: 0.25;
     pointer-events: none;
     z-index: 0;
   }
   
   a { color: inherit; text-decoration: none; }
   button, input, textarea { font: inherit; }
   
   .page-glow {
     position: fixed;
     top: 0;
     width: 28rem;
     height: 28rem;
     border-radius: 999px;
     filter: blur(110px);
     opacity: 0.32;
     pointer-events: none;
     z-index: 0;
   }
   .page-glow-left { left: -10rem; background: rgba(127,29,29,0.24); }
   .page-glow-right { right: -10rem; background: rgba(224,189,112,0.2); }
   
   .section-shell { width: min(1120px, calc(100% - 2rem)); margin: 0 auto; }
   .hero .section-shell { width: 100%; }
   .hero, .compass-section, .services-section, .results-section,
   .signature-section, .contact-section { position: relative; }
   
   .hero {
     padding: calc(3rem + env(safe-area-inset-top, 0px)) 0 5rem;
     background-image: url('${heroBg}');
     background-size: cover;
     background-position: center;
     background-repeat: no-repeat;
     overflow: hidden;
   }
   .hero::before {
     content: "";
     position: absolute;
     inset: 0;
     background:
       radial-gradient(circle at 82% 22%, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 18%, rgba(7,17,28,0) 34%),
       linear-gradient(to bottom, rgba(7,17,28,0.62), rgba(7,17,28,0.84));
     z-index: 0;
   }
   .hero::after {
     content: "";
     position: absolute;
     inset: -8% -12%;
     background:
       radial-gradient(circle at 84% 24%, rgba(255,245,214,0.08) 0%, rgba(255,245,214,0.02) 14%, rgba(0,0,0,0) 28%),
       linear-gradient(112deg, rgba(255,255,255,0) 0%, rgba(255,248,220,0.06) 44%, rgba(255,255,255,0) 56%);
     mix-blend-mode: screen;
     opacity: 0.75;
     animation: heroNebulaDrift 18s ease-in-out infinite alternate;
     pointer-events: none;
     z-index: 0;
   }
   .hero > * { position: relative; z-index: 1; }
   
   .compass-grid, .contact-grid, .signature-grid { display: grid; gap: 1.5rem; }
   .hero-grid { display: block; }
   .hero-bear { display: flex; justify-content: center; width: 100%; }
   .hero-bear img {
     width: clamp(260px, 35vw, 480px);
     height: auto;
     border-radius: 1.5rem;
     box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(243,211,122,0.12);
     border: 1px solid rgba(243,211,122,0.2);
   }
   
   /* ── Shared glass panel style ── */
   .detail-panel,
   .info-card,
   .feature-card,
   .testimonial-card,
   .inquiry-form,
   .care-card,
   .case-card {
     border: 1px solid var(--panel-border);
     background: rgba(10,20,36,0.82);
     backdrop-filter: blur(18px);
     box-shadow: var(--shadow);
   }
   
   .hero-copy {
     border: none;
     background: transparent;
     backdrop-filter: none;
     box-shadow: none;
     text-align: center;
   }
   
   .hero-copy {
     padding: 3rem 2rem 3rem;
     border-radius: 2rem;
     width: 100%;
     text-align: center;
     position: relative;
     display: flex;
     flex-direction: column;
     justify-content: flex-end;
     min-height: 480px;
   }
   .hero-copy::before {
     content: none;
   }
   .hero-copy::after {
     content: "";
     position: absolute;
     inset: 0;
     background:
       linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.25)),
       linear-gradient(90deg,
         rgba(7,17,28,0.45) 0%, rgba(7,17,28,0.12) 12%, rgba(7,17,28,0) 22%,
         rgba(7,17,28,0) 78%, rgba(7,17,28,0.12) 88%, rgba(7,17,28,0.45) 100%);
     pointer-events: none;
     border-radius: inherit;
   }
   
   /* ── Starfield ── */
   .hero-starfield {
     position: absolute;
     inset: 0;
     overflow: hidden;
     border-radius: inherit;
     pointer-events: none;
     z-index: 1;
   }
   .hero-starfield span {
     position: absolute;
     display: block;
     width: var(--size);
     height: var(--size);
     border-radius: 999px;
     background: rgba(255,255,255,0.95);
     box-shadow: 0 0 10px rgba(255,248,220,0.45);
     opacity: var(--opacity);
     animation: twinkle var(--duration) ease-in-out infinite;
   }
   .hero-starfield span::after {
     content: "";
     position: absolute;
     left: 50%; top: 50%;
     width: calc(var(--size) * 4);
     height: 1px;
     background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,248,220,0.75), rgba(255,255,255,0));
     transform: translate(-50%, -50%);
   }
   .hero-starfield span::before {
     content: "";
     position: absolute;
     left: 50%; top: 50%;
     width: 1px;
     height: calc(var(--size) * 4);
     background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,248,220,0.75), rgba(255,255,255,0));
     transform: translate(-50%, -50%);
   }
   
   /* ── Streaks ── */
   .hero-streak {
     position: absolute;
     width: clamp(16rem, 28vw, 28rem);
     height: 2px;
     right: 7%;
     top: 18%;
     transform-origin: right center;
     background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,248,220,0.68), rgba(255,255,255,0));
     filter: blur(0.4px);
     opacity: 0.55;
     pointer-events: none;
     z-index: 1;
   }
   .hero-streak.one { transform: rotate(-13deg); animation: streakFloatOne 16s ease-in-out infinite; }
   .hero-streak.two {
     width: clamp(12rem, 22vw, 22rem);
     top: 26%; right: 10%;
     transform: rotate(-23deg);
     opacity: 0.36;
     animation: streakFloatTwo 20s ease-in-out infinite;
   }
   
   /* ── Hero content ── */
   .hero-content {
     position: relative;
     z-index: 2;
     animation: heroFadeUp 1s ease-out both;
   }
   .hero-title {
     position: relative;
     margin: 0 0 0.5rem;
     display: flex;
     flex-direction: column;
     gap: 0.15rem;
     line-height: 0.95;
   }
   
   /* ── Serif headings ── */
   .hero-title,
   .section-heading h2,
   .feature-card h2,
   .inquiry-form h2,
   .testimonial-card h3,
   .detail-panel h2,
   .info-card h2,
   .care-card h3,
   .case-copy h3 {
     font-family: "Cormorant Garamond", "Palatino Linotype", serif;
   }
   
   /* ── Wordmark ── */
   .wordmark {
     position: relative;
     display: inline-block;
     letter-spacing: 0.05em;
     text-transform: uppercase;
     background: linear-gradient(90deg, #fff4d1 0%, #f3d37a 18%, #fff7e8 36%, #c59d3c 62%, #f6dea0 100%);
     background-size: 220% 220%;
     -webkit-background-clip: text;
     background-clip: text;
     color: transparent;
     filter: drop-shadow(0 0 16px rgba(243,211,122,0.18));
     animation: shimmer 8s ease-in-out infinite;
   }
   .wordmark::after {
     content: "";
     position: absolute;
     top: -18%; bottom: -18%; left: -24%;
     width: 28%;
     background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,248,220,0.9), rgba(255,255,255,0));
     transform: skewX(-18deg);
     filter: blur(1px);
     mix-blend-mode: screen;
     animation: wordmarkSweep 7.5s ease-in-out infinite;
     pointer-events: none;
   }
   .wordmark-glow {
     position: absolute;
     left: 50%; top: 50%;
     width: clamp(16rem, 34vw, 32rem);
     height: clamp(8rem, 18vw, 14rem);
     transform: translate(-50%, -50%);
     border-radius: 999px;
     background: radial-gradient(circle,
       rgba(243,211,122,0.22) 0%,
       rgba(224,189,112,0.10) 42%,
       rgba(127,29,29,0.08) 62%,
       rgba(0,0,0,0) 78%);
     filter: blur(38px);
     opacity: 0.95;
     z-index: 0;
     animation: glowFloat 8.5s ease-in-out infinite;
     pointer-events: none;
   }
   .hero-title > * { position: relative; z-index: 1; }
   .title-subtitle { font-size: inherit; color: #f8e7b6; }
   
   /* ── Kickers / eyebrows ── */
   .eyebrow, .section-kicker, .feature-kicker, .info-label, .detail-kicker {
     margin: 0 0 0.75rem;
     font-size: 0.77rem;
     letter-spacing: 0.26em;
     text-transform: uppercase;
     color: var(--gold-strong);
   }
   
   /* ── Body text ── */
   .hero-body, .section-heading p, .feature-card p,
   .testimonial-card p, .detail-description,
   .info-card p, .care-card p, .case-copy p {
     margin: 0;
     color: var(--muted);
     line-height: 1.75;
   }
   
   /* ── Buttons ── */
   .hero-actions, .detail-actions { display: flex; flex-wrap: wrap; gap: 0.85rem; margin-top: 1.75rem; }
   .hero-actions { justify-content: center; }
   .button {
     display: inline-flex;
     align-items: center;
     justify-content: center;
     min-height: 2.9rem;
     padding: 0.7rem 1.2rem;
     border-radius: 999px;
     border: 1px solid transparent;
     transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
     cursor: pointer;
   }
   .button:hover { transform: translateY(-1px); }
   .button-primary {
     background: linear-gradient(135deg, #f4d88c 0%, #d1a245 100%);
     color: #1d1302;
     font-weight: 700;
   }
   .button-secondary {
     background: rgba(255,255,255,0.04);
     border-color: rgba(255,255,255,0.1);
     color: var(--text);
   }
   
   /* ── Info cards (hero aside) ── */
   .hero-aside { display: flex; flex-direction: column; align-items: center; gap: 0; width: 100%; }
   .info-card { padding: 1.25rem 1.3rem; border-radius: 1.6rem; }
   .info-card h2 { margin: 0 0 0.35rem; font-size: 1.55rem; }
   
   /* ── Sections ── */
   .services-section { background: #ffffff; padding: 2rem 0; }
   .services-section .section-shell { width: min(1380px, calc(100% - 1rem)); }
   .services-section .section-kicker { color: #c59d3c; }
   .services-section .section-heading h2 { color: #07111c; }
   .services-section .section-heading p { color: #4a5668; }
   .results-section, .signature-section, .contact-section { padding: 2rem 0 0; background: #ffffff; }
   .results-section .section-kicker,
   .signature-section .section-kicker,
   .contact-section .section-kicker { color: #c59d3c; }
   .results-section .section-heading h2,
   .signature-section .section-heading h2,
   .contact-section .section-heading h2 { color: #07111c; }
   .results-section .section-heading p,
   .signature-section .section-heading p,
   .contact-section .section-heading p { color: #4a5668; }
   .compass-grid { grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr); align-items: center; }
   
   /* ── Compass starfield ── */
   .compass-section {
     position: relative;
     overflow: hidden;
   }
   .compass-starfield {
     position: absolute;
     inset: 0;
     pointer-events: none;
     z-index: 0;
   }
   .compass-starfield span {
     position: absolute;
     display: block;
     width: var(--s);
     height: var(--s);
     border-radius: 50%;
     background: rgba(255,255,255,0.95);
     box-shadow: 0 0 10px rgba(255,248,220,0.45);
     opacity: var(--o);
     animation: csTwinkle var(--d) ease-in-out infinite;
     animation-delay: var(--dl);
   }
   .compass-starfield span::after {
     content: "";
     position: absolute;
     left: 50%; top: 50%;
     width: calc(var(--s) * 4);
     height: 1px;
     background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,248,220,0.75), rgba(255,255,255,0));
     transform: translate(-50%, -50%);
   }
   .compass-starfield span::before {
     content: "";
     position: absolute;
     left: 50%; top: 50%;
     width: 1px;
     height: calc(var(--s) * 4);
     background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,248,220,0.75), rgba(255,255,255,0));
     transform: translate(-50%, -50%);
   }
   @keyframes csTwinkle {
     0%   { opacity: calc(var(--o) * 0.15); transform: scale(0.5); }
     25%  { opacity: var(--o); transform: scale(1.4); }
     50%  { opacity: calc(var(--o) * 0.25); transform: scale(0.6); }
     75%  { opacity: var(--o); transform: scale(1.3); }
     100% { opacity: calc(var(--o) * 0.15); transform: scale(0.5); }
   }
   .compass-section > * { position: relative; z-index: 1; }
   .compass-stage {
     position: relative;
     padding: 1.5rem;
     border-radius: 2rem;
     border: none;
     background: transparent;
     box-shadow: none;
   }
   .compass-badge {
     position: absolute;
     top: 1rem; left: 50%;
     transform: translateX(-50%);
     padding: 0.35rem 0.8rem;
     border-radius: 999px;
     background: rgba(255,255,255,0.04);
     border: 1px solid rgba(255,255,255,0.08);
     font-size: 0.72rem;
     letter-spacing: 0.2em;
     text-transform: uppercase;
     color: #f8e7b6;
     white-space: nowrap;
   }
   .compass-svg { display: block; width: 100%; aspect-ratio: 1; }
   .compass-segment { cursor: pointer; }
   .compass-segment:hover path:first-of-type { fill: rgba(127,29,29,0.28); }
   
   /* ── Detail panel ── */
   .detail-panel { padding: 1.8rem; border-radius: 2rem; }
   .detail-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; }
   .detail-panel h2 { margin: 0; font-size: clamp(2rem, 4vw, 2.8rem); }
   .detail-counter { margin: 0; color: #f8e7b6; font-size: 0.95rem; letter-spacing: 0.08em; }
   .detail-description { margin-top: 1rem; }
   .detail-tip { margin: 1rem 0 0; color: rgba(246,242,234,0.62); font-size: 0.92rem; }
   
   /* ── Section headings ── */
   .section-heading { max-width: 42rem; margin-bottom: 1.6rem; }
   .section-heading h2 { margin: 0 0 0.6rem; font-size: clamp(2rem, 5vw, 3.2rem); }
   .left-aligned { margin-bottom: 1.3rem; }
   
   /* ── Care cards grid ── */
   .care-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1rem; }
   .care-grid-progress { display: none; }
   .signature-grid-progress { display: none; }
   .care-card {
     padding: 1.3rem;
     border-radius: 1.4rem;
     position: relative;
     overflow: hidden;
     transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
     min-height: 320px;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
   }
   .care-card::before {
     content: "";
     position: absolute;
     inset: 0;
     background: linear-gradient(135deg, transparent, rgba(224,189,112,0.08));
     opacity: 0.8;
     pointer-events: none;
   }
   .care-card.is-active {
     border-color: rgba(243,211,122,0.34);
     transform: translateY(-2px);
     box-shadow: 0 28px 70px rgba(0,0,0,0.42);
   }
   .care-card-link:hover {
     border-color: rgba(243,211,122,0.5);
     transform: translateY(-3px);
     box-shadow: 0 28px 70px rgba(0,0,0,0.48);
   }
   .care-card-link:hover .card-link {
     color: #f3d37a;
   }
   .care-card h3 { margin: 0 0 0.5rem; font-size: 1.35rem; }
   .care-card .card-link {
     display: inline-flex;
     margin-top: 1rem;
     color: #f8e7b6;
     font-weight: 600;
   }
   
   /* ── Case study cards ── */
   .case-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
   .case-card { border-radius: 1.6rem; overflow: hidden; }
   .case-stage { position: relative; min-height: 18rem; background: #0b1424; }
   .case-layer { position: absolute; inset: 0; }
   .case-layer.after {
     background:
       radial-gradient(circle at 70% 32%, rgba(255,255,255,0.16), transparent 18%),
       radial-gradient(circle at 32% 30%, rgba(243,211,122,0.22), transparent 20%),
       linear-gradient(135deg, var(--after-a), var(--after-b));
   }
   .case-layer.before {
     clip-path: inset(0 50% 0 0);
     background:
       radial-gradient(circle at 28% 70%, rgba(255,255,255,0.1), transparent 18%),
       radial-gradient(circle at 68% 38%, rgba(127,29,29,0.26), transparent 22%),
       linear-gradient(135deg, var(--before-a), var(--before-b));
   }
   .case-photo {
     position: absolute;
     inset: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   .case-label {
     position: absolute;
     top: 1rem;
     z-index: 3;
     padding: 0.35rem 0.7rem;
     border-radius: 999px;
     background: rgba(0,0,0,0.26);
     border: 1px solid rgba(255,255,255,0.08);
     font-size: 0.72rem;
     letter-spacing: 0.18em;
     text-transform: uppercase;
   }
   .case-label.left { left: 1rem; }
   .case-label.right { right: 1rem; }
   .case-divider {
     position: absolute;
     top: 0; bottom: 0;
     width: 2px;
     background: linear-gradient(180deg, rgba(255,255,255,0.2), #f3d37a, rgba(255,255,255,0.2));
     box-shadow: 0 0 16px rgba(243,211,122,0.38);
     transform: translateX(-50%);
     z-index: 2;
   }
   .case-handle {
     position: absolute;
     top: 50%; left: 50%;
     display: grid;
     place-items: center;
     width: 2.85rem;
     height: 2.85rem;
     border-radius: 999px;
     background: rgba(6,15,26,0.9);
     border: 1px solid rgba(243,211,122,0.4);
     box-shadow: 0 12px 28px rgba(0,0,0,0.35);
     transform: translate(-50%, -50%);
     z-index: 3;
   }
   .case-handle::before { content: "< >"; color: #fff7e8; font-size: 0.7rem; letter-spacing: 0.18em; }
   .case-slider { position: absolute; left: 1rem; right: 1rem; bottom: 1rem; z-index: 4; }
   .case-slider input[type="range"] {
     width: 100%;
     appearance: none;
     height: 0.42rem;
     border-radius: 999px;
     background: rgba(255,255,255,0.22);
     outline: none;
   }
   .case-slider input[type="range"]::-webkit-slider-thumb {
     appearance: none;
     width: 1rem; height: 1rem;
     border-radius: 999px;
     background: var(--gold-strong);
     border: 0;
     cursor: pointer;
   }
   .case-slider input[type="range"]::-moz-range-thumb {
     width: 1rem; height: 1rem;
     border-radius: 999px;
     background: var(--gold-strong);
     border: 0;
     cursor: pointer;
   }
   .case-copy { padding: 1rem 1.15rem 1.2rem; }
   .case-copy h3 { margin: 0 0 0.35rem; font-size: 1.18rem; }
   
   /* ── Signature / feature cards ── */
   .signature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
   .feature-card { padding: 1.4rem; border-radius: 1.6rem; }
   .feature-card h2 { margin: 0 0 0.7rem; font-size: 1.8rem; }
   
   /* ── Contact section ── */
   .contact-section { padding-bottom: 3rem; }
   .contact-grid { grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr); align-items: start; }
   .testimonial-grid { display: grid; gap: 1rem; }
   .testimonial-card { padding: 1.25rem; border-radius: 1.5rem; }
   .testimonial-card h3 { margin: 1rem 0 0.15rem; font-size: 1.1rem; }
   .testimonial-card span { color: #f8e7b6; font-size: 0.92rem; }
   
   /* ── Inquiry form ── */
   .inquiry-form { padding: 1.5rem; border-radius: 1.8rem; }
   .form-header { margin-bottom: 1rem; }
   .form-header h2 { margin: 0; font-size: 2rem; }
   .field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
   .inquiry-form label { display: grid; gap: 0.4rem; margin-bottom: 1rem; }
   .inquiry-form span { color: #eef2f7; font-size: 0.92rem; }
   .inquiry-form input, .inquiry-form textarea {
     width: 100%;
     padding: 0.9rem 1rem;
     border-radius: 1rem;
     border: 1px solid rgba(255,255,255,0.08);
     background: rgba(255,255,255,0.04);
     color: var(--text);
   }
   .inquiry-form input::placeholder, .inquiry-form textarea::placeholder {
     color: rgba(183,192,204,0.72);
   }
   .inquiry-form input:focus, .inquiry-form textarea:focus {
     outline: 2px solid rgba(243,211,122,0.2);
     border-color: rgba(243,211,122,0.42);
   }
   .submit-button { width: 100%; }
   .form-note { margin: 0.9rem 0 0; color: rgba(246,242,234,0.64); font-size: 0.9rem; }
   
   /* ── Glass panels on white sections ── */
   .results-section .case-card,
   .signature-section .feature-card,
   .contact-section .testimonial-card,
   .contact-section .inquiry-form {
     background: #ffffff;
     border: 1px solid #e2e8f0;
     box-shadow: 0 4px 24px rgba(0,0,0,0.06);
     backdrop-filter: none;
     color: #1a2636;
   }
   .results-section .case-copy h3,
   .signature-section .feature-card h2,
   .contact-section .testimonial-card h3 { color: #07111c; }
   .results-section .case-copy p,
   .signature-section .feature-card p,
   .contact-section .testimonial-card p { color: #4a5668; }
   .signature-section .feature-kicker { color: #c59d3c; }
   .contact-section .testimonial-card span { color: #c59d3c; }
   .contact-section .section-kicker { color: #c59d3c; }
   .contact-section .inquiry-form span { color: #4a5668; }
   .contact-section .inquiry-form h2 { color: #07111c; }
   .contact-section .form-note { color: #6b7280; }
   .footer { padding: 0 0 2rem; background: #ffffff; }
   .footer-row {
     display: flex;
     align-items: center;
     justify-content: space-between;
     gap: 1rem;
     padding-top: 1rem;
     border-top: 1px solid #e2e8f0;
     color: #6b7280;
   }
   .footer-row a { color: #c59d3c; }
   
   /* ── Animations ── */
   @keyframes flashButton {
     0%, 100% { opacity: 1; box-shadow: 0 0 18px rgba(243,211,122,0.8); }
     50% { opacity: 0.45; box-shadow: none; }
   }
   .button-flash {
     animation: flashButton 2s ease-in-out infinite;
   }
   @keyframes flashRed {
     0%, 100% { opacity: 1; text-shadow: 0 0 12px rgba(255,40,40,0.9); }
     50%       { opacity: 0.25; text-shadow: none; }
   }
   .feature-kicker-flash {
     color: #ff2828 !important;
     animation: flashRed 2s ease-in-out infinite;
   }
   @keyframes shootingStar {
     0%   { transform: translate(0, 0) rotate(-45deg) scaleX(0); opacity: 0; }
     5%   { opacity: 1; transform: translate(0, 0) rotate(-45deg) scaleX(1); }
     60%  { opacity: 0.8; }
     100% { transform: translate(180px, -180px) rotate(-45deg) scaleX(1); opacity: 0; }
   }
   @keyframes starGlow {
     0%, 100% { opacity: 0; transform: scale(0.6); }
     10%, 90% { opacity: 1; transform: scale(1.2); }
     50%       { opacity: 0.9; transform: scale(1); }
   }
   .shooting-star-wrap {
     position: relative;
     display: inline-block;
     overflow: visible;
   }
   .shooting-star {
     position: absolute;
     top: -4px;
     left: 50%;
     width: 60px;
     height: 2px;
     background: linear-gradient(90deg, rgba(255,248,220,0), #f3d37a, #fff);
     border-radius: 999px;
     transform-origin: left center;
     animation: shootingStar 3.2s ease-out infinite;
     animation-delay: 0.8s;
     pointer-events: none;
     filter: drop-shadow(0 0 4px rgba(243,211,122,0.9));
   }
   .shooting-star::before {
     content: "";
     position: absolute;
     right: -3px;
     top: 50%;
     transform: translateY(-50%);
     width: 5px;
     height: 5px;
     border-radius: 50%;
     background: #fff8dc;
     box-shadow: 0 0 6px 2px rgba(243,211,122,0.9);
     animation: starGlow 3.2s ease-out infinite;
     animation-delay: 0.8s;
   }
     0%   { background-position: 0% 50%; }
     50%  { background-position: 100% 50%; }
     100% { background-position: 0% 50%; }
   }
   @keyframes wordmarkSweep {
     0%   { transform: translateX(-180%) skewX(-18deg); opacity: 0; }
     12%  { opacity: 0; }
     34%  { opacity: 0.34; }
     52%  { opacity: 0.18; }
     100% { transform: translateX(240%) skewX(-18deg); opacity: 0; }
   }
   @keyframes glowFloat {
     0%   { transform: translate(-50%, -50%) scale(0.98); opacity: 0.72; }
     50%  { transform: translate(-50%, -54%) scale(1.04); opacity: 1; }
     100% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.72; }
   }
   @keyframes heroFadeUp {
     0%   { opacity: 0; transform: translateY(22px); }
     100% { opacity: 1; transform: translateY(0); }
   }
   @keyframes twinkle {
     0%   { opacity: calc(var(--opacity) * 0.35); transform: scale(0.7); }
     25%  { opacity: calc(var(--opacity) * 1.4); transform: scale(1.2); }
     50%  { opacity: calc(var(--opacity) * 0.5); transform: scale(0.85); }
     75%  { opacity: calc(var(--opacity) * 1.3); transform: scale(1.15); }
     100% { opacity: calc(var(--opacity) * 0.35); transform: scale(0.7); }
   }
   @keyframes heroNebulaDrift {
     0%   { transform: translate3d(-1.5%, -1%, 0) scale(1); opacity: 0.68; }
     100% { transform: translate3d(1.5%, 1%, 0) scale(1.03); opacity: 0.88; }
   }
   @keyframes streakFloatOne {
     0%   { transform: rotate(-13deg) translateX(0); opacity: 0.32; }
     50%  { transform: rotate(-11deg) translateX(8px); opacity: 0.62; }
     100% { transform: rotate(-13deg) translateX(0); opacity: 0.32; }
   }
   @keyframes streakFloatTwo {
     0%   { transform: rotate(-23deg) translateX(0); opacity: 0.22; }
     50%  { transform: rotate(-20deg) translateX(10px); opacity: 0.46; }
     100% { transform: rotate(-23deg) translateX(0); opacity: 0.22; }
   }
   
   /* ── Responsive ── */
   /* ── Mobile hamburger for homepage ── */
   .app-nav-toggle {
     display: none;
     background: none;
     border: none;
     cursor: pointer;
     padding: 0.5rem;
     color: #f3d37a;
     font-size: 1.5rem;
     line-height: 1;
     position: absolute;
     right: 1rem;
     top: 50%;
     transform: translateY(-50%);
     z-index: 10;
   }
   .app-nav-mobile {
     display: none;
     flex-direction: column;
     background: #07111c;
     border-top: 1px solid rgba(197,157,60,0.15);
     position: absolute;
     top: 100%;
     left: 0;
     right: 0;
     z-index: 200;
     box-shadow: 0 8px 32px rgba(0,0,0,0.4);
   }
   .app-nav-mobile.open { display: flex; }
   .app-nav-mobile a, .app-nav-mobile button {
     background: none;
     border: none;
     border-bottom: 1px solid rgba(197,157,60,0.08);
     color: #b7c0cc;
     padding: 0.9rem 1.5rem;
     text-align: left;
     font-size: 0.95rem;
     font-family: inherit;
     cursor: pointer;
     text-decoration: none;
     display: block;
   }
   .app-nav-mobile a:hover, .app-nav-mobile button:hover { color: #f3d37a; background: rgba(243,211,122,0.06); }
   .app-nav-mobile .call-link { color: #f3d37a; font-weight: 700; font-size: 1rem; }
   /* ── Tablet ── */
   @media (max-width: 1000px) {
     .hero-grid, .contact-grid, .signature-grid { grid-template-columns: 1fr; }
     .hero-bear { display: none; }
     .care-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
     .case-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
     .signature-grid { grid-template-columns: 1fr; }
   }
   /* ── Phablet ── */
   @media (max-width: 600px) {
     .signature-grid { grid-template-columns: 1fr; }
     .care-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
     .hero-copy h1 { font-size: clamp(1.8rem, 7vw, 2.8rem); }
     .hero-copy h1 .drop-cap { font-size: 160%; }
     .section-heading h2 { font-size: clamp(1.4rem, 5vw, 2rem); }
     .results-section h2 { font-size: clamp(1rem, 4vw, 1.54rem); }
     .compass-badge { font-size: 0.72rem; padding: 0.4rem 0.9rem; }
   }
   /* ── Mobile ── */
   @media (max-width: 720px) {
     .hero { padding-top: calc(2rem + env(safe-area-inset-top, 0px)); }
     .hero-copy, .detail-panel, .info-card, .feature-card,
     .testimonial-card, .inquiry-form, .care-card, .case-card,
     .compass-stage { border-radius: 1.45rem; }
     .field-grid, .case-grid { grid-template-columns: 1fr; }
     /* ── Specialized Circumstances cards → swipeable horizontal carousel ──
        Placed here (last matching declaration for this breakpoint) so it
        definitively wins over the tablet/phablet 1fr rules above. */
     .signature-grid {
       display: flex;
       grid-template-columns: unset;
       flex-wrap: nowrap;
       overflow-x: auto;
       overflow-y: visible;
       scroll-snap-type: x mandatory;
       -webkit-overflow-scrolling: touch;
       scrollbar-width: none;
       gap: 0.85rem;
       margin: 0 -0.75rem;
       padding: 0.15rem 0.75rem 0.85rem;
     }
     .signature-grid::-webkit-scrollbar { display: none; }
     .signature-grid .feature-card {
       scroll-snap-align: start;
       flex: 0 0 80%;
       min-width: 80%;
     }
     .signature-grid-progress {
       display: block;
       position: relative;
       height: 4px;
       background: rgba(255,255,255,0.12);
       border-radius: 999px;
       overflow: hidden;
       margin: -0.4rem 0.75rem 1.25rem;
     }
     .signature-grid-progress-bar {
       position: absolute;
       top: 0;
       left: 0;
       height: 100%;
       background: #c59d3c;
       border-radius: 999px;
       will-change: transform, width;
     }
     /* ── Homepage nav cards → swipeable horizontal carousel ── */
     .care-grid {
       display: flex;
       grid-template-columns: unset;
       flex-wrap: nowrap;
       overflow-x: auto;
       overflow-y: visible;
       scroll-snap-type: x mandatory;
       -webkit-overflow-scrolling: touch;
       scrollbar-width: none;
       gap: 0.85rem;
       margin: 0 -0.75rem;
       padding: 0.15rem 0.75rem 0.85rem;
     }
     .care-grid::-webkit-scrollbar { display: none; }
     .care-card {
       scroll-snap-align: start;
       flex: 0 0 78%;
       min-width: 78%;
     }
     .care-grid-progress {
       display: block;
       position: relative;
       height: 4px;
       background: rgba(10,20,36,0.1);
       border-radius: 999px;
       overflow: hidden;
       margin: -0.4rem 0 1.25rem;
     }
     .care-grid-progress-bar {
       position: absolute;
       top: 0;
       left: 0;
       height: 100%;
       background: #c59d3c;
       border-radius: 999px;
       will-change: transform, width;
     }
     .detail-header, .footer-row { flex-direction: column; align-items: flex-start; }
     .button { width: 100%; justify-content: center; min-height: 44px; }
     .hero-actions { flex-direction: column; }
     .app-nav-toggle { display: block; }
     .section-shell { padding-left: 0.75rem; padding-right: 0.75rem; }
     .footer-row { gap: 1rem; align-items: center; flex-wrap: wrap; justify-content: center; }
     .footer-row a, .footer-row span { font-size: 1.1rem; }
     .care-card-photo { aspect-ratio: 4/3; }
     .feature-card h2 { font-size: clamp(1.2rem, 5vw, 1.8rem); }
     .case-slider input[type="range"] { height: 44px; cursor: pointer; }
     .compass-badge { font-size: 0.68rem; }
   }
   /* ── Small phones ── */
   @media (max-width: 400px) {
     .care-card { flex: 0 0 86%; min-width: 86%; }
     .signature-grid .feature-card { flex: 0 0 86%; min-width: 86%; }
     .hero-copy h1 { font-size: clamp(1.5rem, 8vw, 2rem); }
   }
   `;
