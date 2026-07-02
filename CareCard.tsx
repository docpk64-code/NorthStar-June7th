import React from 'react';
import { navigate } from '../Root';
import type { Wedge } from '../types';
import { polarToCartesian, wedgePath } from '../utils/geometry';
import { playWedgeTone } from '../utils/sound';

export default function CompassGraphic({
  wedges,
  onSound,
}: {
  wedges: Wedge[];
  onSound: () => void;
}) {
  const [hoveredIndex, setHoveredIndex] = React.useState(0);
  const [isMoving, setIsMoving] = React.useState(false);
  const [isNeedleHovered, setIsNeedleHovered] = React.useState(false);
  const movingTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRotation = wedges[hoveredIndex].centerAngle;

  const needleGlowing = isMoving || isNeedleHovered;

  function handleWedgeEnter(index: number) {
    if (index !== hoveredIndex) {
      setHoveredIndex(index);
      setIsMoving(true);
      playWedgeTone(index);
      if (movingTimer.current) clearTimeout(movingTimer.current);
      movingTimer.current = setTimeout(() => setIsMoving(false), 450);
    }
  }

  return (
    <svg
      className="compass-svg"
      viewBox="0 0 800 800"
      role="img"
      aria-labelledby="compassTitle compassDescription"
    >
      <title id="compassTitle">NorthStar service compass</title>
      <desc id="compassDescription">
        A clickable compass wheel that cycles through NorthStar service areas.
      </desc>

      <defs>
        <radialGradient id="paperGlow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#eef2f7" />
          <stop offset="100%" stopColor="#98a6b8" />
        </radialGradient>
        <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d1dae7" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="needle" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f5d88a" />
          <stop offset="55%" stopColor="#9e6523" />
          <stop offset="100%" stopColor="#5f1117" />
        </linearGradient>
      </defs>

      {/* Base disc */}
      <circle cx="400" cy="400" r="340" fill="url(#paperGlow)" />
      <circle
        cx="400"
        cy="400"
        r="325"
        fill="none"
        stroke="#c7a44d"
        strokeWidth="5"
      />
      <circle
        cx="400"
        cy="400"
        r="292"
        fill="none"
        stroke="#c7a44d"
        strokeWidth="8"
      />

      {/* Wedge segments — SVG anchor tags for direct navigation */}
      {wedges.map((wedge) => {
        const isHovered = wedge.index === hoveredIndex;
        const mid = polarToCartesian(400, 400, 225, wedge.centerAngle);
        return (
          <g
            key={wedge.item.label}
            className="compass-segment"
            style={{ cursor: 'pointer' }}
            aria-label={wedge.item.label}
            role="button"
            tabIndex={0}
            onMouseEnter={() => handleWedgeEnter(wedge.index)}
            onTouchStart={(e) => {
              e.preventDefault();
              handleWedgeEnter(wedge.index);
            }}
            onClick={() => {
              onSound();
              const href = wedge.item.href;
              setTimeout(() => navigate(href), 160);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSound();
                const href = wedge.item.href;
                setTimeout(() => navigate(href), 160);
              }
            }}
          >
            <title>{wedge.item.label}</title>
            <path
              d={wedgePath(
                400,
                400,
                164,
                286,
                wedge.startAngle,
                wedge.endAngle
              )}
              fill={
                isHovered ? 'rgba(127,29,29,0.28)' : 'rgba(255,255,255,0.05)'
              }
              stroke={isHovered ? '#8c2727' : 'rgba(127,29,29,0.36)'}
              strokeWidth={isHovered ? 3 : 1.5}
            />
            {isHovered && (
              <path
                d={wedgePath(
                  400,
                  400,
                  164,
                  286,
                  wedge.startAngle - 1.1,
                  wedge.endAngle + 1.1
                )}
                fill="none"
                stroke="rgba(243,211,122,0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="18 220"
              />
            )}
            <text
              x={mid.x}
              y={mid.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#7f1d1d"
              fontSize="14"
              fontWeight="700"
              style={{ letterSpacing: '0.05em', pointerEvents: 'none' }}
            >
              {wedge.item.shortLabel.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Centre hub */}
      <circle
        cx="400"
        cy="400"
        r="135"
        fill="#0b1320"
        stroke="#c7a44d"
        strokeWidth="10"
      />
      <circle
        cx="400"
        cy="400"
        r="80"
        fill="#101b2d"
        stroke="#c7a44d"
        strokeWidth="8"
      />

      {/* Rotating needle — glows when moving or hovered */}
      <g
        
        style={{
          transformOrigin: '400px 400px',
          transform: `rotate(${activeRotation}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: needleGlowing
            ? 'drop-shadow(0 0 8px rgba(248,223,160,0.95)) drop-shadow(0 0 18px rgba(197,157,60,0.7))'
            : 'drop-shadow(0 0 3px rgba(248,223,160,0.3))',
        }}
        onMouseEnter={() => setIsNeedleHovered(true)}
        onMouseLeave={() => setIsNeedleHovered(false)}
        onTouchStart={() => setIsNeedleHovered(true)}
        onTouchEnd={() => setTimeout(() => setIsNeedleHovered(false), 500)}
      >
        <polygon
          points="400,110 420,400 400,420 380,400"
          fill="url(#needle)"
          stroke={needleGlowing ? '#ffe680' : '#f3d37a'}
          strokeWidth={needleGlowing ? 3.5 : 2.5}
          style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
        />
        <circle
          cx="400"
          cy="140"
          r={needleGlowing ? 8 : 6}
          fill={needleGlowing ? '#fff8d0' : '#f8dfa0'}
          style={{ transition: 'r 0.2s, fill 0.2s' }}
        />
        <polygon
          points="400,690 420,400 400,380 380,400"
          fill="#334155"
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        <circle
          cx="400"
          cy="400"
          r="48"
          fill="#101b2d"
          stroke="url(#metalDark)"
          strokeWidth="10"
        />
        <circle
          cx="400"
          cy="400"
          r="24"
          fill={needleGlowing ? '#ffe680' : '#d8ba69'}
          stroke={needleGlowing ? '#ffd700' : '#c7a44d'}
          strokeWidth="4"
          style={{ transition: 'fill 0.2s, stroke 0.2s' }}
        />
      </g>
    </svg>
  );
}
