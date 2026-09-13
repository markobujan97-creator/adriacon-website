import type { Metadata } from 'next';
import { breadcrumbSchema, metadataFor, seo } from '@/config/seo';
import Link from 'next/link';
import { ArrowRight, Globe, Plus } from 'lucide-react';
import { RopeLine } from '@/components/ui/RopeLine';
import { Coordinates } from '@/components/ui/Coordinates';
import { TaxOffers } from '@/components/tools/TaxOffers';
import { TaxChecklist } from '@/components/tools/TaxChecklist';
import { MySteuerhelfer } from '@/components/tools/MySteuerhelfer';
import { Reveal } from '@/components/ui/Reveal';
import { taxFaqs } from '@/config/content';
import { mySteuerhelfer, site } from '@/config/site';

export const metadata: Metadata = metadataFor('steuererklaerungen');

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
        <RopeLine tone="light" className="absolute inset-x-0 bottom-0" height={72} />
        <div className="shell relative pb-28 pt-14 lg:pb-32 lg:pt-20">
          <p className="label">Für Privatpersonen</p>
          {/* Optisch die grösste Aussage, im Markup bewusst keine Überschrift */}
          <p className="mt-4 max-w-3xl font-display text-d1 font-medium text-navy">
            Steuererklärung ausfüllen lassen.
            <br />
            <span className="text-blue">Ohne Papierstapel.</span>
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-[1.15rem] font-normal leading-snug text-navy sm:text-[1.3rem]">
            {seo.steuererklaerungen.h1}
          </h1>
          <p className="mt-5 max-w-text lead">
            Für Privatpersonen, Paare, Studierende und Selbstständige im Aargau, in Zürich und in
            der ganzen Schweiz. Unterlagen digital einreichen, von uns persönlich prüfen lassen,
            termingerecht eingereicht – zu einem Pauschalpreis, den Sie vorher kennen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Startet direkt in der Webversion von MySteuerhelfer */}
            <a
              href={mySteuerhelfer.webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Steuererklärung jetzt einreichen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/downloads/adriacon-checkliste-steuererklaerung.pdf"
              download
              className="btn-outline"
            >
              Checkliste herunterladen
            </a>
            <Link href="/kontakt" className="btn-outline">
              Lieber zuerst fragen
            </Link>
          </div>
        </div>
      </section>

      {/* Für wen */}
      <section className="py-block">
        <div className="shell">
          <h2 className="text-d2">Steuererklärung für Privatpersonen, Paare, Studierende und Selbstständige</h2>
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
          <h2 className="text-d2">Preise für die Steuererklärung</h2>
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
            <h2 className="text-d2">So läuft Ihre Steuererklärung ab</h2>
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
          <h2 className="text-d2">Häufige Fragen zur Steuererklärung</h2>
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
        <RopeLine tone="dark" className="absolute inset-x-0 bottom-0" height={78} />
        <div className="shell relative pb-32 pt-block">
          <div className="max-w-xl">
            <h2 className="text-d2 !text-white">Bereit? Dann los.</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-sky-light">
              Unterlagen hochladen, Rest erledigen wir. Die Einreichung läuft über MySteuerhelfer –
              direkt im Browser, ohne Installation. Wenn Sie lieber zuerst mit uns sprechen:
              Wir melden uns innerhalb eines Arbeitstages.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={mySteuerhelfer.webAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                Unterlagen jetzt einreichen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href={site.phoneHref} className="btn-ghost-dark">
                {site.phone}
              </a>
            </div>
            <Coordinates tone="dark" className="mt-10" label="Büro Baden-Dättwil" />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema('steuererklaerungen')) }}
      />
    </>
  );
}
