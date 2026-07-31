'use client';

import { useId } from 'react';
import { radarDimensions } from '@/lib/radar';
import type { RadarKey } from '@/types';

const SIZE = 340;
const C = SIZE / 2;
const R = 112;

function point(index: number, total: number, value: number) {
  const a = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = ((value - 1) / 4) * R;
  return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r };
}

function labelPos(index: number, total: number) {
  const a = (Math.PI * 2 * index) / total - Math.PI / 2;
  return { x: C + Math.cos(a) * (R + 26), y: C + Math.sin(a) * (R + 26) };
}

export function RadarChart({ scores }: { scores: Record<RadarKey, number> }) {
  const gid = useId().replace(/:/g, '');
  const total = radarDimensions.length;
  const points = radarDimensions
    .map((d, i) => {
      const p = point(i, total, scores[d.key] ?? 3);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="w-full max-w-[380px]"
      role="img"
      aria-label={`Radar Ihrer Selbsteinschätzung über ${total} Bereiche`}
    >
      <defs>
        <radialGradient id={`${gid}-fill`}>
          <stop offset="0%" stopColor="#8CCAEE" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3884C3" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {[1, 2, 3, 4].map((l) => (
        <circle key={l} cx={C} cy={C} r={(R / 4) * l} fill="none" stroke="#DDE6EC" strokeWidth="1" />
      ))}

      {radarDimensions.map((d, i) => {
        const a = (Math.PI * 2 * i) / total - Math.PI / 2;
        return (
          <line
            key={d.key}
            x1={C}
            y1={C}
            x2={C + Math.cos(a) * R}
            y2={C + Math.sin(a) * R}
            stroke="#DDE6EC"
            strokeWidth="1"
          />
        );
      })}

      <polygon
        points={points}
        fill={`url(#${gid}-fill)`}
        stroke="#3884C3"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{ transition: 'all .35s cubic-bezier(.25,.6,.35,1)' }}
      />

      {radarDimensions.map((d, i) => {
        const p = point(i, total, scores[d.key] ?? 3);
        return (
          <circle
            key={d.key}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="#fff"
            stroke="#3884C3"
            strokeWidth="2"
            style={{ transition: 'all .35s cubic-bezier(.25,.6,.35,1)' }}
          />
        );
      })}

      {radarDimensions.map((d, i) => {
        const p = labelPos(i, total);
        const anchor = p.x > C + 6 ? 'start' : p.x < C - 6 ? 'end' : 'middle';
        return (
          <text
            key={d.key}
            x={p.x}
            y={p.y + 3}
            textAnchor={anchor}
            fontSize="10.5"
            fill="#4F6473"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
