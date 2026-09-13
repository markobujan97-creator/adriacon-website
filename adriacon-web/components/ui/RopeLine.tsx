import Image from 'next/image';

/**
 * Bootsseil mit Knoten – das wiederkehrende Gestaltungselement der Website.
 *
 * Alle Bilder stammen aus derselben Vorlage. Der Knoten ist unverändert
 * übernommen, die geraden Stücke sind daraus geschnittene Kacheln, die sich
 * nahtlos wiederholen.
 *
 * Aufbau:
 *   [ Kachel links, wiederholt ] [ Knoten ] [ Kachel rechts, wiederholt ]
 *
 * Die linke Kachel wird rechtsbündig wiederholt, die rechte linksbündig.
 * Dadurch trifft an beiden Seiten des Knotens jeweils eine vollständige Kachel
 * auf den Knoten – genau so, wie die Stücke in der Vorlage aneinandergrenzen.
 * So entsteht keine sichtbare Naht.
 *
 * "tone" bezeichnet den Hintergrund des Abschnitts:
 *   light → Seil in Navy        (für weisse und helle Flächen)
 *   dark  → Seil in Hellblau    (für den dunklen Abschluss-Abschnitt)
 *
 * Die Bilder werden mit scripts/prepare-rope-assets.py erzeugt.
 */
export function RopeLine({
  tone = 'light',
  className = '',
  height = 72,
}: {
  tone?: 'light' | 'dark';
  className?: string;
  /** Höhe des Seilbands in Pixeln. Der Knoten skaliert mit. */
  height?: number;
}) {
  const v = tone === 'dark' ? 'hell' : 'dunkel';

  const strand = {
    backgroundRepeat: 'repeat-x',
    backgroundSize: 'auto 100%',
  } as const;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex w-full items-center ${className}`}
      style={{ height }}
    >
      <span
        className="h-full flex-1"
        style={{
          ...strand,
          backgroundImage: `url(/images/seil-strang-${v}.png)`,
          backgroundPosition: 'right center',
        }}
      />

      <Image
        src={`/images/seil-knoten-${v}.png`}
        alt=""
        width={368}
        height={240}
        className="h-full w-auto shrink-0"
      />

      <span
        className="h-full shrink-0"
        style={{
          ...strand,
          width: '9%',
          minWidth: '2.5rem',
          backgroundImage: `url(/images/seil-strang-rechts-${v}.png)`,
          backgroundPosition: 'left center',
        }}
      />
    </div>
  );
}
