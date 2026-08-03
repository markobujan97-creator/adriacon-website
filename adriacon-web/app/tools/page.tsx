import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, User } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBand } from '@/components/ui/CtaBand';
import { PaketFinder } from '@/components/tools/PaketFinder';
import { TaxOffers } from '@/components/tools/TaxOffers';
import { Jahreskurs } from '@/components/tools/Jahreskurs';
import { MySteuerhelfer } from '@/components/tools/MySteuerhelfer';

export const metadata: Metadata = {
  title: 'Tools – Paketfinder, Steuererklärungen, Jahreskurs',
  description:
    'Werkzeuge der Adriacon Treuhand: Paketfinder für Unternehmen, Preise für private Steuererklärungen, der Jahreskurs und die App MySteuerhelfer.',
  alternates: { canonical: '/tools' },
};

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        label="Tools"
        title="Werkzeuge, die schon vor dem ersten Gespräch helfen."
        lead="Alle Berechnungen laufen in Ihrem Browser. Keine Anmeldung, keine Datenübermittlung, keine Verpflichtung."
      />

      {/* Wegweiser: Unternehmen oder Privatperson */}
      <section className="border-b border-line py-12">
        <div className="shell">
          <h2 className="font-display text-[1.15rem] font-medium text-navy">
            Suchen Sie Unterstützung für ein Unternehmen oder für Ihre private Steuererklärung?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href="#paketfinder"
              className="group flex items-start gap-4 rounded-card border border-line bg-white p-5 transition-colors hover:border-sky"
            >
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
              <span>
                <span className="block font-display text-[1.05rem] font-medium text-navy">
                  Für mein Unternehmen
                </span>
                <span className="mt-1 block text-[0.9rem] text-ink-soft">
                  Paketfinder, Pakete und der Jahreskurs
                </span>
              </span>
              <ArrowRight
                className="ml-auto mt-1 h-4 w-4 shrink-0 text-blue transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#steuererklaerungen"
              className="group flex items-start gap-4 rounded-card border border-line bg-white p-5 transition-colors hover:border-sky"
            >
              <User className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
              <span>
                <span className="block font-display text-[1.05rem] font-medium text-navy">
                  Für meine Steuererklärung
                </span>
                <span className="mt-1 block text-[0.9rem] text-ink-soft">
                  Preise, Checkliste und MySteuerhelfer
                </span>
              </span>
              <ArrowRight
                className="ml-auto mt-1 h-4 w-4 shrink-0 text-blue transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 1. Paketfinder */}
      <section id="paketfinder" className="scroll-mt-24 py-block">
        <div className="shell">
          <header className="max-w-2xl">
            <p className="label">Für Unternehmen</p>
            <h2 className="mt-4 text-d2">Paketfinder</h2>
            <p className="mt-5 lead">
              Wenige Fragen, eine Empfehlung. Die erste Frage trennt Unternehmen und private
              Steuererklärungen – die beiden Bereiche werden nie vermischt.
            </p>
          </header>
          <div className="mt-12">
            <PaketFinder />
          </div>
        </div>
      </section>

      {/* 2. Steuererklärungen */}
      <section id="steuererklaerungen" className="scroll-mt-24 bg-shell py-block">
        <div className="shell">
          <header className="max-w-2xl">
            <p className="label">Für Privatpersonen</p>
            <h2 className="mt-4 text-d2">Steuererklärung zum Pauschalpreis</h2>
            <p className="mt-5 lead">
              Kein Unternehmenspaket, sondern ein eigenes Angebot: ein Preis pro Steuerjahr, digital
              eingereicht und persönlich geprüft.
            </p>
          </header>

          <div className="mt-12">
            <TaxOffers />
          </div>

          <Link href="/steuererklaerungen" className="link-quiet mt-8 text-[0.95rem]">
            Alles zu Steuererklärungen ansehen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 3. Jahreskurs */}
      <section id="jahreskurs" className="scroll-mt-24 py-block">
        <div className="shell">
          <header className="max-w-2xl">
            <p className="label">Für Unternehmen</p>
            <h2 className="mt-4 text-d2">Jahreskurs</h2>
            <p className="mt-5 lead">
              Welche administrativen Themen wann anstehen. Als Orientierung, nicht als
              Fristenkalender.
            </p>
          </header>
          <div className="mt-12">
            <Jahreskurs />
          </div>
        </div>
      </section>

      {/* 4. MySteuerhelfer */}
      <section id="mysteuerhelfer" className="scroll-mt-24 bg-shell py-block">
        <div className="shell">
          <header className="max-w-2xl">
            <p className="label">Unsere App</p>
            <h2 className="mt-4 text-d2">MySteuerhelfer</h2>
            <p className="mt-5 lead">
              Von Adriacon entwickelt, für alle nutzbar. Unterlagen fotografieren, hochladen,
              fertig.
            </p>
          </header>
          <div className="mt-12">
            <MySteuerhelfer />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
