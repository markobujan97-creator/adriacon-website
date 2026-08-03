'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/config/site';

/**
 * Etappenplan als Hero-Grafik.
 *
 * Nimmt die Bildsprache des Adriacon-Logos auf: Balken, über die eine
 * ansteigende Welle läuft. Die fünf Wegpunkte entsprechen den fünf Etappen
 * der Zusammenarbeit – die Grafik zeigt Unternehmensentwicklung, nicht
 * einen Börsenkurs.
 */

const BASE = 268;
const LABEL_Y = 310;

const stages = [
  { x: 62, height: 62, label: 'Standort' },
  { x: 176, height: 96, label: 'Kurs' },
  { x: 290, height: 138, label: 'Systeme' },
  { x: 404, height: 186, label: 'Vorankommen' },
  { x: 518, height: 232, label: 'Nachjustieren' },
];

const BAR_WIDTH = 46;

/** Kurslinie: läuft leicht oberhalb der Balkenköpfe entlang. */
const LINE =
  'M 30 246 C 90 240 120 218 148 200 S 232 154 262 142 S 348 116 376 100 S 462 68 490 56 S 566 34 596 28';

export function CourseGraphic() {
  const reduced = useReducedMotion();

  return (
    <figure className="rounded-card bg-white p-5 shadow-card sm:p-7">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-display text-[0.95rem] font-medium text-navy">
          Ihr Weg mit Adriacon
        </span>
        <span className="font-display text-[0.68rem] tracking-[0.14em] text-ink-light">
          {site.coordinates}
        </span>
      </figcaption>

      <svg
        viewBox="0 0 626 328"
        className="w-full"
        role="img"
        aria-label="Etappenplan mit fünf Stufen: Standort bestimmen, Kurs festlegen, Systeme einrichten, gemeinsam vorankommen, nachjustieren. Die Balken und die Kurslinie steigen von links nach rechts an."
      >
        {/* Grundlinie */}
        <line x1="20" y1={BASE} x2="606" y2={BASE} stroke="#DDE6EC" strokeWidth="1.5" />

        {/* Balken – wachsen über eine CSS-Transformation, damit nichts aufblitzt */}
        {stages.map((stage, i) => (
          <motion.g
            key={stage.label}
            style={{ transformOrigin: `${stage.x + BAR_WIDTH / 2}px ${BASE}px` }}
            initial={reduced ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.25, 0.6, 0.35, 1] }}
          >
            <rect
              x={stage.x}
              y={BASE - stage.height}
              width={BAR_WIDTH}
              height={stage.height}
              rx="3"
              fill="#8CCAEE"
              fillOpacity={0.5 + i * 0.075}
            />
          </motion.g>
        ))}

        {/* Kurslinie */}
        <motion.path
          d={LINE}
          fill="none"
          stroke="#3884C3"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.35, ease: [0.25, 0.6, 0.35, 1] }}
        />

        {/* Wegpunkte */}
        {stages.map((stage, i) => {
          const cx = stage.x + BAR_WIDTH / 2;
          const cy = BASE - stage.height - 16;
          return (
            <motion.g
              key={`wp-${stage.label}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.9 + i * 0.13 }}
            >
              <circle cx={cx} cy={cy} r="7" fill="#fff" stroke="#3884C3" strokeWidth="2.5" />
              <circle cx={cx} cy={cy} r="2.5" fill="#3884C3" />
            </motion.g>
          );
        })}

        {/* Beschriftung */}
        {stages.map((stage, i) => (
          <motion.text
            key={`label-${stage.label}`}
            x={stage.x + BAR_WIDTH / 2}
            y={LABEL_Y}
            textAnchor="middle"
            fontSize="13"
            fill="#4F6473"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 1 + i * 0.13 }}
          >
            {stage.label}
          </motion.text>
        ))}

        {/* Etappennummern */}
        {stages.map((stage, i) => (
          <text
            key={`num-${stage.label}`}
            x={stage.x + BAR_WIDTH / 2}
            y={BASE + 18}
            textAnchor="middle"
            fontSize="11"
            letterSpacing="1"
            fill="#7C8D99"
          >
            {String(i + 1).padStart(2, '0')}
          </text>
        ))}
      </svg>
    </figure>
  );
}
