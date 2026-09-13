import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { Reveal } from '@/components/ui/Reveal';
import { packageCards } from '@/config/pricing';

/** Nur Name, Zielgruppe und Ab-Preis. Details stehen auf der Paketeseite. */
export function PackagesTeaser() {
  return (
    <section className="bg-shell py-block">
      <div className="shell">
        <SectionIntro
          label="Pakete"
          title="Treuhand-Pakete für KMU ab CHF 320.– pro Monat"
          lead="Kein Stundenzettel am Monatsende. Sie wählen ein Paket, wir halten uns daran."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packageCards.map((card, i) => (
            <Reveal as="li" key={card.id} delay={Math.min(i * 0.05, 0.2)}>
              <Link
                href={`/pakete#${card.id}`}
                className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors duration-200 ease-calm hover:border-sky"
              >
                <h3 className="font-display text-[0.95rem] font-medium tracking-[0.06em] text-blue">
                  {card.name}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{card.audience}</p>
                <p className="mt-5 font-display text-[1.5rem] text-navy">{card.price}</p>
                <p className="text-[0.82rem] text-ink-light">{card.priceNote}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[0.9rem] text-blue">
                  Details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-calm group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-[0.85rem] text-ink-light">
          Ab-Preise bei digitalem Belegfluss.
        </p>
      </div>
    </section>
  );
}
