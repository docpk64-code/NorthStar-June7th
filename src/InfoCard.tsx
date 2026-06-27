import React, { useState } from 'react';
import type { CaseStudy } from '../types';

export default function CaseCard({
  study,
  defaultPosition,
  index,
}: {
  study: CaseStudy;
  defaultPosition: number;
  index: number;
}) {
  const [position, setPosition] = useState(defaultPosition);

  const caseVars = {
    ['--before-a']: study.beforeA,
    ['--before-b']: study.beforeB,
    ['--after-a']: study.afterA,
    ['--after-b']: study.afterB,
  } as React.CSSProperties;

  return (
    <article className="case-card" style={caseVars}>
      <div className="case-stage">
        {/* After layer (bottom) */}
        {study.afterSrc ? (
          <img
            className="case-photo"
            src={study.afterSrc}
            alt={`${study.title} after`}
          />
        ) : (
          <div className="case-layer after" />
        )}
        {/* Before layer (clipped to left portion) */}
        {study.beforeSrc ? (
          <img
            className="case-photo"
            src={study.beforeSrc}
            alt={`${study.title} before`}
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />
        ) : (
          <div
            className="case-layer before"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />
        )}
        <span className="case-label left">Before</span>
        <span className="case-label right">After</span>
        <div className="case-divider" style={{ left: `${position}%` }}>
          <div className="case-handle" />
        </div>
        <div className="case-slider">
          <input
            type="range"
            min="15"
            max="85"
            step="1"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-label={`Before and after slider ${index + 1}`}
          />
        </div>
      </div>
      <div className="case-copy">
        <h3>{study.title}</h3>
        <p>{study.note}</p>
      </div>
    </article>
  );
}
