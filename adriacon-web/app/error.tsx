'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/**
 * Fehlerseite für unerwartete Fehler in einer Seite.
 *
 * Ohne diese Datei zeigt Next.js in der Produktion eine leere beziehungsweise
 * generische Seite. Hier erscheint stattdessen eine lesbare Meldung und – für
 * die Fehlersuche – die Kennung des Fehlers. Die technischen Einzelheiten
 * stehen in der Browserkonsole und in den Vercel-Logs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Seitenfehler]', error);
  }, [error]);

  return (
    <section className="py-block">
      <div className="shell max-w-2xl">
        <p className="label">Es ist ein Fehler aufgetreten</p>
        <h1 className="mt-4 text-d2">Diese Seite konnte nicht geladen werden.</h1>
        <p className="mt-5 lead">
          Bitte laden Sie die Seite neu. Wenn das Problem bestehen bleibt, erreichen Sie uns unter{' '}
          <a href="mailto:info@adriacon.ch" className="text-blue underline underline-offset-4">
            info@adriacon.ch
          </a>{' '}
          oder telefonisch.
        </p>

        {error.digest && (
          <p className="mt-6 text-[0.85rem] text-ink-light">Fehlerkennung: {error.digest}</p>
        )}

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">
            Erneut versuchen
          </button>
          <Link href="/" className="btn-outline">
            Zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
