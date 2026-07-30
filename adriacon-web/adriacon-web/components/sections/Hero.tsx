import { ArrowRight, MoveRight } from 'lucide-react';
import { CourseLine } from '@/components/ui/CourseLine';
import { site } from '@/config/site';

const markers = ['Persönlich', 'Digital', 'Transparent', 'Baden-Dättwil'];

export function Hero() {
  return (
    <section id="start" className="relative overflow-hidden bg-ink text-paper">
      <div className="grid-field-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-sky/40 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-eyebrow uppercase text-brand-sky">
              <span>Treuhand</span>
              <span className="h-px w-6 bg-brand-sky/40" aria-hidden="true" />
              <span>Baden-Dättwil</span>
              <span className="h-px w-6 bg-brand-sky/40" aria-hidden="true" />
              <span>{site.coordinates.label}</span>
            </p>

            <h1 className="mt-7 text-display-xl text-paper">
              Wir führen Ihre Zahlen.
              <br />
              <span className="text-brand-sky">Sie führen Ihr Unternehmen.</span>
            </h1>

            <p className="mt-7 max-w-prose text-pretty text-[1.05rem] leading-relaxed text-brand-mist/85">
              Adriacon ist die Treuhand für KMU, Start-ups, Selbstständige und Privatpersonen im Raum
              Aargau und Zürich. Buchhaltung, MWST, Löhne, Abschlüsse und Steuern laufen bei uns in
              einem festen Rhythmus – digital abgewickelt und von zwei festen Ansprechpartnern
              verantwortet.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#kontakt" className="btn bg-brand-sky text-ink hover:bg-paper">
                Erstgespräch vereinbaren
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#kursfinder" className="btn-ghost-light">
                Preis in 2 Minuten berechnen
                <MoveRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-paper/12 pt-6">
              {markers.map((m) => (
                <li key={m} className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-mist/70">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-card border border-paper/12 bg-paper p-6 text-ink shadow-panel sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="eyebrow">Ihr Kurs mit Adriacon</p>
                <p className="font-display text-lg italic text-brand-deep">{site.claim}</p>
              </div>
              <div className="mt-6">
                <CourseLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
