'use client';

import { useId, useState } from 'react';
import { processSteps } from '@/config/content';

/**
 * Signature-Element der Website: eine Kurslinie, die die Welle aus dem Adriacon-Logo
 * aufnimmt und die fünf Etappen der Zusammenarbeit als Wegpunkte trägt.
 * Bedienbar mit Maus und Tastatur.
 */

const PATH = 'M 24 344 C 110 338 168 316 236 262 S 386 152 470 118 S 588 76 620 62';

const WAYPOINTS = [
  { x: 60, y: 341 },
  { x: 196, y: 296 },
  { x: 324, y: 206 },
  { x: 470, y: 118 },
  { x: 612, y: 64 },
];

export function CourseLine() {
  const [active, setActive] = useState<number | null>(null);
  const gid = useId().replace(/:/g, '');
  const current = active === null ? null : processSteps[active];

  return (
    <figure className="relative">
      <svg
        viewBox="0 0 660 400"
        className="w-full"
        role="group"
        aria-label="Kurslinie mit den fünf Etappen der Zusammenarbeit"
      >
        <defs>
          <linearGradient id={`${gid}-course`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8FC9EE" />
            <stop offset="55%" stopColor="#3B87C6" />
            <stop offset="100%" stopColor="#14405F" />
          </linearGradient>
        </defs>

        {/* Koordinatenraster */}
        <g stroke="rgba(138,106,74,.16)" strokeWidth="1">
          {[80, 160, 240, 320].map((y) => (
            <line key={y} x1="16" y1={y} x2="644" y2={y} />
          ))}
          {[140, 280, 420, 560].map((x) => (
            <line key={x} x1={x} y1="24" x2={x} y2="376" />
          ))}
        </g>
        <line x1="16" y1="376" x2="644" y2="376" stroke="rgba(10,31,48,.35)" strokeWidth="1" />

        {/* Balken als Zitat des Logos */}
        <g fill="#8FC9EE" opacity="0.32">
          <rect x="196" y="264" width="26" height="112" />
          <rect x="324" y="188" width="26" height="188" />
          <rect x="470" y="126" width="26" height="250" />
        </g>

        {/* Kurslinie */}
        <path
          d={PATH}
          fill="none"
          stroke={`url(#${gid}-course)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
          className="course-draw"
        />

        {/* Wegpunkte */}
        {WAYPOINTS.map((p, i) => {
          const isActive = active === i;
          return (
            <g
              key={i}
              tabIndex={0}
              role="button"
              aria-label={`${processSteps[i].code}: ${processSteps[i].title}`}
              className="cursor-pointer"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 9 : 5.5}
                fill="#FBFCFD"
                stroke="#14405F"
                strokeWidth="2"
                style={{ transition: 'r .25s cubic-bezier(.22,.61,.36,1)' }}
              />
              {isActive && <circle cx={p.x} cy={p.y} r="2.5" fill="#14405F" />}
            </g>
          );
        })}

        {/* Achsenbeschriftung */}
        <text x="20" y="394" className="fill-ink-muted font-mono" fontSize="10" letterSpacing="1.5">
          HEUTE
        </text>
        <text x="644" y="394" textAnchor="end" className="fill-ink-muted font-mono" fontSize="10" letterSpacing="1.5">
          ZIEL
        </text>
      </svg>

      <figcaption className="mt-4 min-h-[3.5rem] border-l border-bistre/30 pl-4">
        {current ? (
          <>
            <span className="eyebrow block">{current.code}</span>
            <span className="mt-1 block text-sm text-ink">
              <strong className="font-medium">{current.title}</strong> — {current.detail}
            </span>
          </>
        ) : (
          <span className="block text-sm text-ink-muted">
            Fünf Etappen von der Standortbestimmung bis zur laufenden Zusammenarbeit.
            <span className="hidden sm:inline"> Wegpunkt wählen für Details.</span>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
