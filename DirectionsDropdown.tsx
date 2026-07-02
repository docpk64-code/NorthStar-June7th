
import { navigate } from '../Root';
import type { MenuItem } from '../types';
import { careCardAnchors } from '../data/menuData';
import { playCardClick } from '../utils/sound';

export default function CareCard({ item, isActive }: { item: MenuItem; isActive: boolean }) {
  const slug = item.href.replace(/^\//, '');
  return (
    <article
      className={`care-card care-card-link${isActive ? ' is-active' : ''}`}
      id={careCardAnchors.has(slug) ? slug : undefined}
      onClick={() => {
        playCardClick();
        setTimeout(() => navigate(item.href), 160);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          playCardClick();
          setTimeout(() => navigate(item.href), 160);
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      {/* ── Image / placeholder ── */}
      {item.imageSrc ? (
        <img
          src={item.imageSrc}
          alt={item.label}
          style={{
            width: '100%',
            aspectRatio: '4/3',
            objectFit: 'cover',
            borderRadius: '0.9rem',
            marginBottom: '0.9rem',
            display: 'block',
            flexShrink: 0,
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            borderRadius: '0.9rem',
            marginBottom: '0.9rem',
            background:
              'linear-gradient(135deg, rgba(197,157,60,0.13) 0%, rgba(10,20,36,0.55) 100%)',
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
            flexShrink: 0,
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
      <p className="section-kicker" style={{ textAlign: 'center' }}>
        {item.eyebrow}
      </p>
      <h3 style={{ textAlign: 'center' }}>{item.label}</h3>
      <p style={{ textAlign: 'center' }}>{item.description}</p>
      <span
        className="card-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginTop: '1rem',
          color: '#f8e7b6',
          fontWeight: 600,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        Explore {item.shortLabel} <span style={{ fontSize: '1.1rem' }}>→</span>
      </span>
    </article>
  );
}
