import type { Metadata } from 'next';
import { breadcrumbSchema, metadataFor, seo } from '@/config/seo';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PackageGrid } from '@/components/packages/PackageGrid';
import { CtaBand } from '@/components/ui/CtaBand';
import { priceDisclaimer, pricingConfig } from '@/config/pricing';
import { formatChf } from '@/lib/format';

export const metadata: Metadata = metadataFor('pakete');

export default function PaketePage() {
  return (
    <>
      <PageHeader
        label="Pakete"
        title={seo.pakete.h1}
        lead="Fünf Pakete für Einzelfirmen, KMU und Gründungen. Wählen Sie, was zu Ihrer Grösse passt – die Details sehen Sie mit einem Klick, nicht alles auf einmal."
      />

      <section className="py-block">
        <div className="shell">
          <PackageGrid />

          <p className="mt-8 max-w-2xl text-[0.85rem] leading-relaxed text-ink-light">
            {priceDisclaimer}
          </p>
        </div>
      </section>

      <section className="bg-shell py-block">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-d3">Zuschläge: was zusätzlich verrechnet wird</h2>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
              Die Grundpreise gelten für die enthaltenen Mengen bei digitalem Belegfluss. Was darüber
              hinausgeht, ist hier aufgeführt – damit am Monatsende keine Überraschung steht.
            </p>
          </div>

          <dl className="divide-y divide-line border-y border-line">
            {[
              ['Belege über 150 pro Monat', 'je angefangene 100 Belege CHF 80.–'],
              ['Bankkonten über 2', 'je Konto CHF 40.–'],
              ['Lohnempfänger über der Paketgrenze', 'je Person CHF 22.–'],
              ['Kostenstellen oder Filialen', 'je Einheit CHF 120.–'],
              ['Effektive MWST-Abrechnung', 'CHF 60.–'],
              ['Papierbelege statt digitalem Belegfluss', '35 % auf den Grundpreis'],
              ['Regelmässige Fremdwährungen', 'CHF 90.– pro Mandat'],
              [
                'Arbeiten ausserhalb des Leistungsumfangs',
                `${formatChf(pricingConfig.generalHourlyRate)} pro Stunde`,
              ],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <dt className="text-[0.93rem] text-ink">{label}</dt>
                <dd className="text-[0.88rem] text-ink-soft">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-block">
        <div className="shell flex flex-col items-start justify-between gap-6 rounded-card border border-line p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-d3">Unsicher, welches Paket passt?</h2>
            <p className="mt-3 max-w-text text-[0.98rem] leading-relaxed text-ink-soft">
              Vier Fragen genügen. Der Paketfinder gibt Ihnen eine Richtung – unverbindlich und ohne
              Dateneingabe.
            </p>
          </div>
          <Link href="/tools#paketfinder" className="btn-primary shrink-0">
            Zum Paketfinder
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema('pakete')) }}
      />
    </>
  );
}
