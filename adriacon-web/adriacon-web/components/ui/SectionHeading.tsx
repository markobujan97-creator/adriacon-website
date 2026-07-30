import type { ReactNode } from 'react';

/**
 * Abschnittsmarke im Kursdesign: Wegpunktcode, feine Linie, Titel.
 * Die Wegpunktnummerierung bildet die tatsächliche Abfolge der Seite ab.
 */
export function SectionHeading({
  waypoint,
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'left',
  children,
}: {
  waypoint: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  children?: ReactNode;
}) {
  const dark = tone === 'dark';
  return (
    <header className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'}>
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${
          dark ? 'text-brand-sky' : 'text-ink-muted'
        }`}
      >
        <span className="font-mono text-eyebrow uppercase">{waypoint}</span>
        <span className={`h-px w-8 ${dark ? 'bg-brand-sky/40' : 'bg-bistre/40'}`} aria-hidden="true" />
        <span className="font-mono text-eyebrow uppercase">{eyebrow}</span>
      </div>

      <h2
        className={`mt-5 text-display-md ${dark ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`mt-5 max-w-prose text-pretty text-[1.02rem] leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-brand-mist/85' : 'text-ink-muted'}`}
        >
          {lead}
        </p>
      )}

      {children}
    </header>
  );
}
