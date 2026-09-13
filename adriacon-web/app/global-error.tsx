'use client';

import { useEffect } from 'react';

/**
 * Auffangnetz für Fehler im Wurzel-Layout. Diese Komponente ersetzt das
 * gesamte Dokument, deshalb enthält sie eigene html- und body-Elemente und
 * bewusst keine Abhängigkeiten zu anderen Komponenten.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Layoutfehler]', error);
  }, [error]);

  return (
    <html lang="de-CH">
      <body
        style={{
          margin: 0,
          padding: '4rem 1.5rem',
          fontFamily: 'system-ui, sans-serif',
          color: '#22333F',
          background: '#F6F9FB',
        }}
      >
        <div style={{ maxWidth: '36rem', marginInline: 'auto' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', color: '#3884C3' }}>
            ADRIACON TREUHAND
          </p>
          <h1 style={{ fontSize: '1.8rem', marginTop: '1rem', color: '#12314A' }}>
            Die Seite konnte nicht geladen werden.
          </h1>
          <p style={{ marginTop: '1rem', lineHeight: 1.6 }}>
            Bitte laden Sie die Seite neu. Wenn das Problem bestehen bleibt, erreichen Sie uns unter
            info@adriacon.ch oder unter +41 76 541 40 08.
          </p>
          {error.digest && (
            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#7C8D99' }}>
              Fehlerkennung: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 6,
              border: 'none',
              background: '#3884C3',
              color: '#fff',
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
