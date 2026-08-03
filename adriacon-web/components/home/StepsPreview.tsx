import { SectionIntro } from '@/components/ui/SectionIntro';
import { Reveal } from '@/components/ui/Reveal';
import { steps } from '@/config/content';

/**
 * Die fünf Stufen der Zusammenarbeit.
 * Auf grossen Bildschirmen steigen die Einträge tatsächlich an –
 * das Treppenmotiv als Layout statt als Dekoration.
 */
/** Versatz je Stufe – nur auf grossen Bildschirmen sichtbar. */
function riseStyle(index: number): React.CSSProperties {
  return { '--rise': `${index * 1.6}rem` } as React.CSSProperties;
}

export function StepsPreview() {
  return (
    <section className="py-block">
      <div className="shell">
        <SectionIntro
          label="So arbeiten wir"
          title="Von der ersten Frage bis zur laufenden Zusammenarbeit."
          lead="Sie schreiben oder rufen an. Innerhalb eines Arbeitstages melden wir uns und schlagen einen Termin vor."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.07}>
              {/* Der Versatz nach unten erzeugt die ansteigende Treppe auf grossen Bildschirmen. */}
              <div className="lg:[padding-bottom:var(--rise)]" style={riseStyle(i)}>
                <div className="h-[3px] w-10 bg-sky" aria-hidden="true" />
                <p className="mt-4 font-display text-[0.8rem] font-medium tracking-[0.14em] text-blue">
                  STUFE {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-[1.15rem] font-medium text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
