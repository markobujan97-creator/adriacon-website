import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { StepLine } from '@/components/ui/StepLine';
import { Coordinates } from '@/components/ui/Coordinates';
import { TaxOffers } from '@/components/tools/TaxOffers';
import { TaxChecklist } from '@/components/tools/TaxChecklist';
import { MySteuerhelfer } from '@/components/tools/MySteuerhelfer';
import { Reveal } from '@/components/ui/Reveal';
import { taxFaqs } from '@/config/content';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Steuererklärung ausfüllen lassen – ab CHF 49.–',
  description:
    'Steuererklärung für Privatpersonen ab CHF 99.–, Paare CHF 139.–, Selbstständige CHF 180.–, Studierende CHF 49.–. Unterlagen digital einreichen, persönlich geprüft. Adriacon Treuhand, Baden-Dättwil.',
  alternates: { canonical: '/steuererklaerungen' },
};

const audiences = [
  {
    title: 'Privatpersonen',
    text: 'Sie arbeiten angestellt, haben ein Konto, vielleicht eine Säule 3a. Wir holen heraus, was abzugsfähig ist.',
  },
  {
    title: 'Paare und Ehepaare',
    text: 'Eine gemeinsame Steuererklärung für beide – Sie müssen die Unterlagen nur einmal zusammenstellen.',
  },
  {
    title: 'Studierende',
    text: 'Nebenjob, Stipendium, Ausbildungskosten. Meist einfach, oft mit Rückerstattung.',
  },
  {
    title: 'Selbstständige',
    text: 'Einzelfirma oder Nebenerwerb. Wir bringen die geschäftlichen und privaten Zahlen zusammen.',
  },
];

const process = [
  { title: 'Unterlagen zusammenstellen', text: 'Mit unserer Checkliste sehen Sie auf einen Blick, was gebraucht wird.' },
  { title: 'Digital einreichen', text: 'Über MySteuerhelfer fotografieren und hochladen – oder per E-Mail schicken.' },
  { title: 'Wir prüfen und rechnen', text: 'Wir kontrollieren die Unterlagen, fragen nach, wenn etwas fehlt, und nutzen alle zulässigen Abzüge.' },
  { title: 'Sie geben frei', text: 'Sie erhalten die fertige Steuererklärung zur Durchsicht. Nach Ihrer Freigabe reichen wir sie ein.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: taxFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function SteuererklaerungenPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-shell">
        <StepLine className="pointer-events-none absolute bottom-0 right-0 h-32 w-2/5 opacity-60" />
        <div className="shell relative py-14 lg:py-20">
          <p className="label">Für Privatpersonen</p>
          <h1 className="mt-4 max-w-3xl text-d1">
            Ihre Steuererklärung.
            <br />
            <span className="text-blue">Ohne Papierstapel.</span>
          </h1>
          <p className="mt-6 max-w-text lead">
            Unterlagen digital einreichen, von uns persönlich prüfen lassen, termingerecht
            eingereicht. Zu einem Pauschalpreis, den Sie vorher kennen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="btn-primary">
              Steuererklärung in Auftrag geben
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href="/downloads/adriacon-checkliste-steuererklaerung.pdf"
              download
              className="btn-outline"
            >
              Checkliste herunterladen
            </a>
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="py-block">
        <div className="shell">
          <h2 className="text-d2">Für wen wir das machen</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.06}>
                <div className="h-[3px] w-8 bg-sky" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[1.1rem] font-medium text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-soft">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Preise */}
      <section id="preise" className="scroll-mt-24 bg-shell py-block">
        <div className="shell">
          <h2 className="text-d2">Preise</h2>
          <p className="mt-5 max-w-text lead">
            Ein Pauschalpreis pro Steuerjahr. Keine Stundenabrechnung, keine Überraschung.
          </p>
          <div className="mt-10">
            <TaxOffers />
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-block">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-d2">So läuft es ab</h2>
            <p className="mt-5 lead">Vier Schritte. Den grössten Teil übernehmen wir.</p>
          </div>
          <ol className="lg:col-span-8">
            {process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.05}>
                <div className="flex gap-6 border-b border-line py-5 last:border-0">
                  <span className="font-display text-[0.85rem] font-medium tracking-[0.1em] text-blue tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.1rem] font-medium text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.94rem] leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Unterlagen */}
      <section id="checkliste" className="scroll-mt-24 bg-shell py-block">
        <div className="shell">
          <h2 className="text-d2">Diese Unterlagen benötigen wir</h2>
          <p className="mt-5 max-w-text lead">
            Eine allgemeine Orientierung. Sammeln Sie, was auf Sie zutrifft – den Rest klären wir.
          </p>
          <div className="mt-10">
            <TaxChecklist />
          </div>
        </div>
      </section>

      {/* MySteuerhelfer */}
      <section id="mysteuerhelfer" className="scroll-mt-24 py-block">
        <div className="shell">
          <p className="label">Unsere App</p>
          <h2 className="mt-4 text-d2">MySteuerhelfer</h2>
          <div className="mt-12">
            <MySteuerhelfer />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-shell py-block">
        <div className="shell">
          <h2 className="text-d2">Häufige Fragen</h2>
          <div className="mt-10 grid gap-x-14 lg:grid-cols-2">
            {[taxFaqs.slice(0, Math.ceil(taxFaqs.length / 2)), taxFaqs.slice(Math.ceil(taxFaqs.length / 2))].map(
              (column, ci) => (
                <div key={ci} className="divide-y divide-line border-t border-line">
                  {column.map((item) => (
                    <details key={item.q} className="group">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-[1rem] leading-snug text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <Plus
                          className="mt-1 h-4 w-4 shrink-0 text-blue transition-transform duration-300 ease-calm group-open:rotate-45"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="pb-5 pr-10 text-[0.94rem] leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Einreichen */}
      <section className="relative overflow-hidden bg-navy text-white">
        <StepLine
          tone="dark"
          className="pointer-events-none absolute bottom-0 right-0 h-40 w-1/2 opacity-40"
        />
        <div className="shell relative py-block">
          <div className="max-w-xl">
            <h2 className="text-d2 !text-white">Bereit? Dann los.</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-sky-light">
              Schreiben Sie uns kurz, um welches Steuerjahr es geht und welche Situation auf Sie
              zutrifft. Wir melden uns innerhalb eines Arbeitstages und sagen Ihnen, was wir brauchen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/kontakt" className="btn-light">
                Unterlagen einreichen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={site.phoneHref} className="btn-ghost-dark">
                {site.phone}
              </a>
            </div>
            <Coordinates tone="dark" className="mt-10" label="Büro Baden-Dättwil" />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
