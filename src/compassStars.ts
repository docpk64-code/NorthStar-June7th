import React, { useState } from 'react';

// ─── Sub-components ───────────────────────────────────────────────────────────

export default function DirectionsDropdown() {
  const [open, setOpen] = useState(false);
  const locations = [
    {
      name: 'Briarwood, NY',
      maps: 'https://maps.google.com/?q=139-12+84th+Drive+Suite+1G+Briarwood+NY',
    },
    {
      name: 'New York, NY',
      maps: 'https://maps.google.com/?q=333+East+34th+Street+Suite+M1+New+York+NY+10016',
    },
    {
      name: 'Commack, NY',
      maps: 'https://maps.google.com/?q=283+Commack+Road+Suite+130+Commack+NY+11725',
    },
  ];
  return (
    <div style={{ position: 'relative', minWidth: '160px', isolation: 'isolate', zIndex: 50 }}>
      <button
        className="button button-primary"
        style={{ width: '100%' }}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        Directions ▾
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderRadius: '1rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            zIndex: 9999,
            isolation: 'isolate',
          }}
        >
          {locations.map((loc) => (
            <a
              key={loc.name}
              href={loc.maps}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                color: '#07111c',
                fontWeight: 600,
                fontSize: '0.88rem',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background 150ms',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#f4f6f9')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              📍 {loc.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
