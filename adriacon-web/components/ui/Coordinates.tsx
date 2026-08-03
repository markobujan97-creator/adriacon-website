import { site } from '@/config/site';

/**
 * Feines Markendetail: die Standortkoordinaten als typografische Wegmarke.
 * Bewusst klein, ruhig und nur an wenigen Stellen eingesetzt.
 */
export function Coordinates({
  tone = 'light',
  className = '',
  label,
}: {
  tone?: 'light' | 'dark';
  className?: string;
  label?: string;
}) {
  return (
    <p
      className={`font-display text-[0.68rem] tracking-[0.14em] ${
        tone === 'dark' ? 'text-sky/70' : 'text-ink-light'
      } ${className}`}
    >
      {label && <span className="mr-2">{label}</span>}
      {site.coordinates}
    </p>
  );
}
