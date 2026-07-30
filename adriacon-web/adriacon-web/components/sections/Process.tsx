import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/config/content';

export function Process() {
  return (
    <section id="ablauf" className="relative scroll-mt-28 overflow-hidden bg-ink py-section text-paper">
      <div className="grid-field-dark absolute inset-0" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          waypoint="WP 06"
          eyebrow="Ablauf"
          tone="dark"
          title="Von der Anfrage bis zum laufenden Mandat."
          lead="Sie schreiben oder rufen an. Innerhalb eines Arbeitstages melden wir uns und schlagen einen Termin vor. Danach läuft es so ab:"
        />

        <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.code} delay={i * 0.07}>
              <div className="relative">
                {/* Wegpunkt auf der Kurslinie */}
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-brand-sky bg-ink" aria-hidden="true" />
                  <span
                    className="h-px flex-1 bg-gradient-to-r from-brand-sky/50 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-5 font-mono text-eyebrow uppercase text-brand-sky">{step.code}</p>
                <h3 className="mt-3 font-display text-[1.35rem] leading-snug text-paper">{step.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-brand-mist/80">{step.text}</p>
                <p className="mt-3 font-mono text-[0.72rem] leading-relaxed text-brand-mist/50">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 border-t border-paper/12 pt-8">
          <p className="max-w-prose text-[0.95rem] leading-relaxed text-brand-mist/80">
            Sie brauchen für das Erstgespräch nichts vorzubereiten. Wenn Sie Unterlagen zur Hand haben –
            letzte Jahresrechnung, aktuelle Buchhaltung, Lohndaten – wird das Gespräch konkreter. Nötig
            ist es nicht.
          </p>
          <a href="#kontakt" className="btn bg-brand-sky text-ink hover:bg-paper mt-7">
            Erstgespräch vereinbaren
          </a>
        </div>
      </div>
    </section>
  );
}
