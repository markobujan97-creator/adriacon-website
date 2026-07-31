import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBand } from '@/components/ui/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { serviceGroups } from '@/config/content';

export const metadata: Metadata = {
  title: 'Leistungen – Buchhaltung, Steuern, Lohn und Gründung',
  description:
    'Treuhand und Finanzen, Gründung und Unternehmensentwicklung sowie das Adriacon Netzwerk. Alle Leistungen der Adriacon Treuhand GmbH im Überblick.',
  alternates: { canonical: '/leistungen' },
};

export default function LeistungenPage() {
  const [primary, ...rest] = serviceGroups;

  return (
    <>
      <PageHeader
        label="Leistungen"
        title="Was wir für Sie übernehmen."
        lead="Treuhand ist unser Handwerk. Gründung und Unternehmensentwicklung begleiten wir. Alles Weitere koordinieren wir über geprüfte Partner."
      />

      {/* Kernbereich */}
      <section className="py-block">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="label">{primary.step}</p>
            <h2 className="mt-4 text-d2">{primary.title}</h2>
            <p className="mt-5 lead">{primary.lead}</p>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {primary.items.map((item, i) => (
              <Reveal as="li" key={item.name} delay={Math.min(i * 0.03, 0.18)}>
                <div className="h-[3px] w-8 bg-sky" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[1.05rem] font-medium text-navy">
                  {item.name}
                </h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-soft">{item.benefit}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Nachgelagerte Bereiche */}
      <section className="bg-shell py-block">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          {rest.map((group) => (
            <Reveal key={group.id}>
              <p className="label">{group.step}</p>
              <h2 className="mt-4 text-d3">{group.title}</h2>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">{group.lead}</p>

              <ul className="mt-7 divide-y divide-line border-y border-line">
                {group.items.map((item) => (
                  <li key={item.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
                    <span className="text-[0.95rem] font-medium text-navy">{item.name}</span>
                    <span className="text-[0.88rem] text-ink-soft">{item.benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Übergang zu den Paketen */}
      <section className="py-block">
        <div className="shell flex flex-col items-start justify-between gap-6 rounded-card border border-line p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-d3">Wie viel davon brauchen Sie?</h2>
            <p className="mt-3 max-w-text text-[0.98rem] leading-relaxed text-ink-soft">
              Die meisten Leistungen sind in einem der fünf Pakete enthalten. Der Paketfinder zeigt
              in unter zwei Minuten, welches passt.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/pakete" className="btn-primary">
              Pakete ansehen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tools#paketfinder" className="btn-outline">
              Paket finden
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
