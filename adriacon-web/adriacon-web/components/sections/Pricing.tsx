import { ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { formatChf } from '@/lib/format';
import {
  incorporationDetails,
  packageDetails,
  packageOrder,
  pricingConfig,
} from '@/config/pricing';

const surchargeRows = [
  { label: 'Belege über 150 pro Monat', value: 'je angefangene 100 Belege CHF 80.–' },
  { label: 'Bankkonten über 2', value: 'je Konto CHF 40.–' },
  { label: 'Lohnempfänger über der Paketgrenze', value: 'je Person CHF 22.–' },
  { label: 'Kostenstellen, Filialen, Einheiten', value: 'je Einheit CHF 120.–' },
  { label: 'Effektive MWST-Abrechnung', value: 'CHF 60.–' },
  { label: 'Papierbelege statt digitalem Belegfluss', value: '35 % auf den Grundpreis' },
  { label: 'Regelmässige Fremdwährungen', value: 'CHF 90.– pro Mandat' },
];

export function Pricing() {
  const standard = packageOrder.filter((id) => id !== 'cfo');

  return (
    <section id="preise" className="scroll-mt-28 bg-paper py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 05"
          eyebrow="Pakete und Preise"
          title="Vier Pakete. Ab-Preise, die auch halten."
          lead="Jedes Paket hat einen klaren Grundpreis bei digitalem Belegfluss. Was darüber hinausgeht, ist als Zuschlag ausgewiesen – nicht versteckt. Alle Preise exklusive MWST."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {standard.map((id, i) => {
            const pkg = pricingConfig.packages[id];
            const details = packageDetails[id];
            return (
              <Reveal key={id} delay={i * 0.07}>
                <article className="flex h-full flex-col border-t-2 border-ink/80 bg-white p-7 shadow-lift">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-brand-deep">
                    {pkg.name}
                  </p>

                  <ul className="mt-4 space-y-1 text-[0.85rem] text-ink-muted">
                    {details.audience.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>

                  <p className="mt-7 flex items-baseline gap-2">
                    <span className="font-mono text-xs text-ink-muted">ab CHF</span>
                    <span className="font-display text-[2.9rem] leading-none text-ink tabular">
                      {new Intl.NumberFormat('de-CH').format(pkg.monthlyBasePrice)}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">/Mt.</span>
                  </p>

                  <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-muted">{details.situation}</p>

                  <ul className="mt-7 space-y-2.5 border-t border-bistre/25 pt-6">
                    {details.includes.map((inc) => (
                      <li key={inc} className="flex gap-2.5 text-[0.9rem] leading-snug text-ink">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <a href={details.cta.target} className="btn-primary w-full">
                      {details.cta.label}
                    </a>
                    <a
                      href="#kursfinder"
                      className="mt-3 block text-center text-[0.82rem] text-ink-muted underline underline-offset-4 hover:text-ink"
                    >
                      Zuschläge für Ihre Situation berechnen
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* CFO – bewusst anders gekennzeichnet */}
        <Reveal className="mt-6">
          <article className="border border-dashed border-ink/25 bg-transparent p-7 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bistre">
                  Erweiterung für bestehende Mandate
                </p>
                <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-ink">
                  {pricingConfig.packages.cfo.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-mono text-xs text-ink-muted">ab CHF</span>
                  <span className="font-display text-[2.2rem] leading-none text-ink tabular">
                    {new Intl.NumberFormat('de-CH').format(pricingConfig.packages.cfo.monthlyBasePrice)}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">/Mt.</span>
                </p>
                <p className="mt-5 max-w-prose text-[0.9rem] leading-relaxed text-ink-muted">
                  {packageDetails.cfo.situation} Die CFO-Begleitung ist kein Einstiegspaket. Wir bauen
                  sie auf einem bestehenden Mandat auf, wenn die Grundlagen stehen.
                </p>
                <a
                  href="#kontakt"
                  className="mt-6 inline-flex items-center gap-1.5 border-b border-ink/30 pb-1 text-sm text-ink transition-colors hover:border-ink"
                >
                  {packageDetails.cfo.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7">
                {packageDetails.cfo.includes.map((inc) => (
                  <li key={inc} className="flex gap-2.5 text-[0.9rem] leading-snug text-ink">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bistre" aria-hidden="true" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        {/* Gründung und Zuschläge */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="border-t border-ink/15 pt-7">
              <h3 className="font-display text-[1.5rem] text-ink">Firmengründung</h3>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.95rem] font-medium text-ink">
                      {incorporationDetails.standard.title}
                    </span>
                    <span className="shrink-0 font-mono text-[1.05rem] text-brand-deep tabular">
                      {formatChf(incorporationDetails.standard.price)}
                    </span>
                  </p>
                  <ul className="mt-3 grid gap-1.5 text-[0.85rem] text-ink-muted sm:grid-cols-2">
                    {incorporationDetails.standard.includes.map((inc) => (
                      <li key={inc}>— {inc}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.8rem] text-ink-muted">
                    Nicht enthalten: {incorporationDetails.standard.excludes.join(', ')}.
                  </p>
                </div>

                <div className="border-l-2 border-brand pl-4">
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.95rem] font-medium text-ink">
                      {incorporationDetails.withMandate.title}
                    </span>
                    <span className="shrink-0 font-mono text-[1.05rem] text-brand-deep tabular">
                      {formatChf(incorporationDetails.withMandate.price)}
                    </span>
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-muted">
                    {incorporationDetails.withMandate.condition}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-t border-ink/15 pt-7">
              <h3 className="font-display text-[1.5rem] text-ink">Was zusätzlich verrechnet wird</h3>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
                Die Grundpreise gelten für die enthaltenen Mengen. Alles darüber ist hier aufgeführt.
              </p>
              <dl className="mt-6 divide-y divide-bistre/25">
                {surchargeRows.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-[0.9rem] text-ink">{row.label}</dt>
                    <dd className="shrink-0 text-right font-mono text-[0.82rem] text-ink-muted">
                      {row.value}
                    </dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="text-[0.9rem] text-ink">Arbeiten ausserhalb des Leistungsumfangs</dt>
                  <dd className="shrink-0 text-right font-mono text-[0.82rem] text-ink-muted">
                    {formatChf(pricingConfig.generalHourlyRate)}/Std.
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-muted">
                Es handelt sich um Ab-Preise. Der definitive Preis richtet sich nach dem tatsächlichen
                Leistungsumfang. Mehrere Gesellschaften werden separat offeriert. Der Kursfinder ist
                keine verbindliche Offerte und keine steuerliche oder rechtliche Beratung.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
