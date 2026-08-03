import Image from 'next/image';

/**
 * Signet aus dem Adriacon-Logo mit gesperrter Wortmarke.
 *
 * TODO (Adriacon): Für maximale Schärfe eine SVG-Version des Logos liefern.
 */
export function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const light = variant === 'light';
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={light ? '/brand/adriacon-signet-weiss.png' : '/brand/adriacon-signet.png'}
        alt=""
        aria-hidden="true"
        width={128}
        height={128}
        className="h-8 w-8 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.02rem] font-medium tracking-[0.22em] ${
            light ? 'text-white' : 'text-navy'
          }`}
        >
          ADRIACON
        </span>
        <span
          className={`mt-[3px] font-display text-[0.55rem] tracking-[0.38em] ${
            light ? 'text-sky' : 'text-blue'
          }`}
        >
          TREUHAND
        </span>
      </span>
    </span>
  );
}
