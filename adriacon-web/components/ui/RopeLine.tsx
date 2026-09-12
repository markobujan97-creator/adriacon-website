/**
 * Bootsseil mit Palstek – das wiederkehrende Gestaltungselement der Website.
 *
 * Das Seil läuft quer durch den Abschnitt und endet rechts in einem Palstek
 * mit seiner festen Schlaufe. Der Aufbau ist bewusst zweiteilig:
 *
 *   – das gerade Seilstück ist ein CSS-Verlauf. Es dehnt sich auf jede
 *     Bildschirmbreite, ohne dass der Schlag des Seils verzerrt.
 *   – der Knoten ist ein SVG mit festem Seitenverhältnis und wird deshalb
 *     nie gestaucht.
 *
 * Die Über- und Unterführungen entstehen dadurch, dass jedes Seilstück zuerst
 * in der Hintergrundfarbe des Abschnitts und darüber in der Seilfarbe gezeichnet
 * wird. Später gezeichnete Stücke schneiden die früheren frei.
 */

type Tone = 'light' | 'shell' | 'dark';

const BACKGROUND: Record<Tone, string> = {
  light: '#FFFFFF',
  shell: '#F6F9FB',
  dark: '#12314A',
};

const ROPE: Record<Tone, { base: string; twist: string }> = {
  light: { base: '#8CCAEE', twist: '#3884C3' },
  shell: { base: '#8CCAEE', twist: '#3884C3' },
  dark: { base: '#8CCAEE', twist: '#2A6799' },
};

const VIEW_W = 300;
const VIEW_H = 175;
/** Höhe der Seilachse im Knoten-SVG – daran richtet sich das gerade Stück aus. */
const AXIS_Y = 58;
const ROPE_WIDTH = 12;

/** Reihenfolge der Seilstücke bestimmt, was über und was unter liegt. */
const STRANDS = [
  // stehendes Seil, kommt von links
  'M 0 58 C 50 58 92 58 120 54',
  // feste Schlaufe des Palsteks
  'M 120 54 C 110 106 152 152 208 144 C 260 136 274 92 246 66',
  // das Ende läuft zurück zum Knoten
  'M 246 66 C 228 48 186 40 160 52',
  // Rundtörn um das Auge
  'M 160 52 C 136 60 132 88 158 94 C 182 99 196 74 180 60',
  // kurzes loses Ende
  'M 180 60 C 190 50 202 46 214 48',
];

export function RopeLine({
  tone = 'light',
  className = '',
  knotWidth = 230,
}: {
  tone?: Tone;
  className?: string;
  /** Breite des Knotens in Pixeln. Die Höhe ergibt sich aus dem Seitenverhältnis. */
  knotWidth?: number;
}) {
  const bg = BACKGROUND[tone];
  const { base, twist } = ROPE[tone];
  const knotHeight = (knotWidth / VIEW_W) * VIEW_H;
  const axisOffset = (AXIS_Y / VIEW_H) * knotHeight - ROPE_WIDTH / 2;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex w-full items-start ${className}`}
    >
      {/* gerades Seil */}
      <span
        className="rounded-full"
        style={{
          flex: '1 1 auto',
          height: ROPE_WIDTH,
          marginTop: axisOffset,
          backgroundImage: `repeating-linear-gradient(108deg, ${base} 0 6px, ${twist} 6px 8px, ${base} 8px 9px)`,
        }}
      />

      {/* Palstek */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        width={knotWidth}
        height={knotHeight}
        focusable="false"
        className="shrink-0"
      >
        {STRANDS.map((d, i) => (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke={bg}
              strokeWidth={ROPE_WIDTH + 7}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={d}
              fill="none"
              stroke={base}
              strokeWidth={ROPE_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Schlag des Seils */}
            <path
              d={d}
              fill="none"
              stroke={twist}
              strokeWidth={ROPE_WIDTH}
              strokeLinecap="butt"
              strokeDasharray="2.5 6.5"
              opacity="0.5"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
