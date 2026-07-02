import React from 'react';

// ─── Root component ───────────────────────────────────────────────────────────

// ── Tagline sweep-glow component ─────────────────────────────────────────────
export default function TaglineGlow() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start: number | null = null;
    let raf: number;
    const DURATION = 1000; // 1 second per cycle

    function frame(ts: number) {
      if (!start) start = ts;
      const progress = ((ts - start) % DURATION) / DURATION; // 0→1 each second
      // Map progress to X position across the element width
      const w = el!.offsetWidth;
      const x = -120 + progress * (w + 240); // sweep from -120px to width+120px
      el!.style.setProperty('--glow-x', `${x}px`);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
         .tagline-glow-wrap {
           position: relative;
           display: block;
           width: 100%;
           text-align: center;
           font-size: clamp(2.3rem, 5vw, 3.3rem);
           font-weight: 700;
           font-style: italic;
           color: #00e676;
           text-shadow: 0 0 10px rgba(0,230,118,0.35);
           overflow: visible;
           line-height: 1.3;
           margin: 0.5rem 0 1rem;
           --glow-x: -120px;
         }
         .tagline-glow-spot {
           position: absolute;
           top: 50%;
           left: 0;
           transform: translate(var(--glow-x), -50%);
           width: 160px;
           height: 160px;
           border-radius: 50%;
           background: radial-gradient(
             circle,
             rgba(180,255,220,0.92) 0%,
             rgba(0,230,118,0.55) 35%,
             rgba(0,230,118,0.15) 65%,
             transparent 100%
           );
           filter: blur(10px);
           pointer-events: none;
           mix-blend-mode: screen;
           will-change: transform;
         }
       `}</style>
      <div className="tagline-glow-wrap" ref={ref}>
        <span className="tagline-glow-spot" />
        Guiding Patients One Smile at a Time!
      </div>
    </>
  );
}
