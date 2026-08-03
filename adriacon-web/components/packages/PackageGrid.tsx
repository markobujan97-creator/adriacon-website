'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { packageCards, type CardId } from '@/config/pricing';

/**
 * Kompakte Paketkarten. Sichtbar sind nur Name, Zielgruppe, Nutzen und Ab-Preis.
 * Enthaltene Leistungen und Zuschläge erscheinen erst auf Klick.
 */
export function PackageGrid() {
  const [openId, setOpenId] = useState<CardId | null>(null);

  // Direktverweise wie /pakete#kmu öffnen die passende Karte.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (packageCards.some((c) => c.id === hash)) {
      setOpenId(hash as CardId);
    }
  }, []);

  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {packageCards.map((card) => {
        const open = openId === card.id;
        const extension = card.variant === 'extension';
        const oneoff = card.variant === 'oneoff';

        return (
          <li
            key={card.id}
            id={card.id}
            className={`scroll-mt-28 rounded-card border bg-white transition-colors duration-200 ease-calm ${
              open ? 'border-sky' : 'border-line'
            } ${extension ? 'border-dashed' : ''} ${
              card.id === 'cfo' || card.id === 'gruendung' ? 'lg:col-span-3 lg:grid lg:grid-cols-3' : ''
            }`}
          >
            <div className={card.id === 'cfo' || card.id === 'gruendung' ? 'p-6 lg:col-span-1' : 'p-6'}>
              {(extension || oneoff) && (
                <p className="mb-3 inline-block rounded bg-sky-pale px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.06em] text-blue-deep">
                  {extension ? 'Erweiterung für bestehende Mandate' : 'Einmalige Leistung'}
                </p>
              )}

              <h3 className="font-display text-[1rem] font-medium tracking-[0.06em] text-blue">
                {card.name}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">{card.audience}</p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink">{card.benefit}</p>

              <p className="mt-6 font-display text-[1.9rem] leading-none text-navy">{card.price}</p>
              <p className="mt-1.5 text-[0.85rem] text-ink-light">{card.priceNote}</p>

              <button
                type="button"
                onClick={() => setOpenId(open ? null : card.id)}
                aria-expanded={open}
                aria-controls={`details-${card.id}`}
                className="mt-6 inline-flex items-center gap-2 text-[0.92rem] text-blue transition-colors hover:text-blue-deep"
              >
                {open ? (
                  <Minus className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden="true" />
                )}
                {open ? 'Details schliessen' : 'Mehr erfahren'}
              </button>
            </div>

            <div
              id={`details-${card.id}`}
              hidden={!open}
              className={`border-t border-line px-6 py-6 ${
                card.id === 'cfo' || card.id === 'gruendung'
                  ? 'lg:col-span-2 lg:border-l lg:border-t-0'
                  : ''
              }`}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="label">Enthalten</h4>
                  <ul className="mt-3 space-y-2">
                    {card.includes.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[0.9rem] leading-snug text-ink">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="label">Zusätzlich verrechnet</h4>
                  <ul className="mt-3 space-y-2">
                    {card.extras.map((item) => (
                      <li key={item} className="text-[0.88rem] leading-snug text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <h4 className="label">Passt, wenn</h4>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{card.suitedFor}</p>
              </div>

              <Link href={card.cta.href} className="btn-primary mt-6">
                {card.cta.label}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
