import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { taxOffers, taxPriceNote } from '@/config/pricing';
import { formatChf } from '@/lib/format';

/** Die vier Pauschalpreise für private Steuererklärungen. */
export function TaxOffers({ showCta = true }: { showCta?: boolean }) {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {taxOffers.map((offer) => (
          <li
            key={offer.id}
            className="flex h-full flex-col rounded-card border border-line bg-white p-6"
          >
            <h3 className="font-display text-[1.05rem] font-medium text-navy">{offer.audience}</h3>
            <p className="mt-4 font-display text-[2rem] leading-none text-blue">
              {formatChf(offer.price)}
            </p>
            <p className="mt-1.5 text-[0.8rem] text-ink-light">einmalig, pro Steuerjahr</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-soft">{offer.description}</p>

            <div className="mt-5 border-t border-line pt-4">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-ink-light">
                Wichtigste Unterlagen
              </p>
              <ul className="mt-2 space-y-1">
                {offer.requirements.map((req) => (
                  <li key={req} className="text-[0.85rem] leading-snug text-ink-soft">
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {showCta && (
              <Link
                href="/kontakt"
                className="mt-auto flex items-center gap-1.5 pt-5 text-[0.9rem] text-blue hover:text-blue-deep"
              >
                Unterlagen einreichen
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-3xl text-[0.85rem] leading-relaxed text-ink-light">{taxPriceNote}</p>
    </div>
  );
}
