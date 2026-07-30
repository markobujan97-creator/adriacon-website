'use client';

import { useId, useState } from 'react';
import { Info } from 'lucide-react';

/** Kleiner Erklärhinweis. Öffnet per Klick und per Tastatur, schliesst mit Escape. */
export function InfoHint({ label, text }: { label: string; text: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`Erklärung zu ${label}`}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink/20 text-ink-muted transition-colors hover:border-brand-deep hover:text-brand-deep"
      >
        <Info className="h-3 w-3" aria-hidden="true" />
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-card border border-ink/12 bg-white p-3 text-xs leading-relaxed text-ink shadow-lift"
        >
          {text}
        </span>
      )}
    </span>
  );
}
