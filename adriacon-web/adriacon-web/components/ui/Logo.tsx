import Image from 'next/image';

/**
 * Signet aus dem bestehenden Adriacon-Logo, kombiniert mit gesperrter Wortmarke.
 *
 * TODO (Adriacon): Für optimale Schärfe eine SVG-Version des Logos liefern
 * (aktuell liegt nur eine PNG-Datei vor).
 */
export function Logo({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light';
  className?: string;
}) {
  const light = variant === 'light';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={light ? '/brand/adriacon-signet-weiss.png' : '/brand/adriacon-signet.png'}
        alt=""
        aria-hidden="true"
        width={128}
        height={128}
        className="h-9 w-9 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.95rem] font-medium tracking-[0.3em] ${light ? 'text-paper' : 'text-brand-deep'}`}
        >
          ADRIACON
        </span>
        <span
          className={`mt-1 font-mono text-[0.55rem] tracking-[0.42em] ${
            light ? 'text-brand-sky' : 'text-brand'
          }`}
        >
          TREUHAND
        </span>
      </span>
    </span>
  );
}
