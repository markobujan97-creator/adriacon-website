'use client';

import { useId } from 'react';
import { radarDimensions } from '@/lib/radar';
import type { RadarKey } from '@/types';

const SIZE = 380;
const CENTER = SIZE / 2;
const RADIUS = 132;
const LEVELS = 4;

function pointAt(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = ((value - 1) / 4) * RADIUS;
  return { x: CENTER + Math.cos(angle) * r, y: CENTER + Math.sin(angle) * r };
}

function axisEnd(index: number, total: number, factor = 1) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: CENTER + Math.cos(angle) * RADIUS * factor,
    y: CENTER + Math.sin(angle) * RADIUS * factor,
    angle,
  };
}

export function RadarChart({
  scores,
  highlight,
}: {
  scores: Record<RadarKey, number>;
  highlight?: RadarKey | null;
}) {
  const gid = useId().replace(/:/g, '');
  const total = radarDimensions.length;

  const polygon = radarDimensions
    .map((d, i) => {
      const p = pointAt(i, total, scores[d.key] ?? 3);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-[420px]"
      role="img"
      aria-label={`Radar Ihrer Selbsteinschätzung über ${total} Bereiche`}
    >
      <defs>
        <radialGradient id={`${gid}-fill`}>
          <stop offset="0%" stopColor="#8FC9EE" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3B87C6" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {/* Ringe */}
      {Array.from({ length: LEVELS }).map((_, l) => (
        <circle
          key={l}
          cx={CENTER}
          cy={CENTER}
          r={(RADIUS / LEVELS) * (l + 1)}
          fill="none"
          stroke="rgba(138,106,74,.22)"
          strokeWidth="1"
        />
      ))}

      {/* Achsen */}
      {radarDimensions.map((d, i) => {
        const end = axisEnd(i, total);
        return (
          <line
            key={d.key}
            x1={CENTER}
            y1={CENTER}
            x2={end.x}
            y2={end.y}
            stroke={highlight === d.key ? '#14405F' : 'rgba(10,31,48,.14)'}
            strokeWidth={highlight === d.key ? 1.5 : 1}
          />
        );
      })}

      {/* Fläche */}
      <polygon
        points={polygon}
        fill={`url(#${gid}-fill)`}
        stroke="#14405F"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ transition: 'all .4s cubic-bezier(.22,.61,.36,1)' }}
      />

      {/* Punkte */}
      {radarDimensions.map((d, i) => {
        const p = pointAt(i, total, scores[d.key] ?? 3);
        return (
          <circle
            key={d.key}
            cx={p.x}
            cy={p.y}
            r={highlight === d.key ? 5 : 3}
            fill="#FBFCFD"
            stroke="#14405F"
            strokeWidth="2"
            style={{ transition: 'all .4s cubic-bezier(.22,.61,.36,1)' }}
          />
        );
      })}

      {/* Beschriftung */}
      {radarDimensions.map((d, i) => {
        const end = axisEnd(i, total, 1.19);
        const anchor = end.x > CENTER + 6 ? 'start' : end.x < CENTER - 6 ? 'end' : 'middle';
        return (
          <text
            key={d.key}
            x={end.x}
            y={end.y + 3}
            textAnchor={anchor}
            fontSize="9.5"
            letterSpacing="0.6"
            className={highlight === d.key ? 'fill-ink' : 'fill-ink-muted'}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
