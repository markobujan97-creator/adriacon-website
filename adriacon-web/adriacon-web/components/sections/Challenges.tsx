import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { challenges } from '@/config/content';

export function Challenges() {
  return (
    <section id="herausforderungen" className="scroll-mt-28 bg-paper py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 01"
          eyebrow="Ausgangslage"
          title={
            <>
              Was heute stört – und was danach{' '}
              <span className="italic text-brand-deep">anders</span> ist.
            </>
          }
          lead="Die meisten Gespräche beginnen mit einem dieser Sätze. Rechts steht, was sich in der Zusammenarbeit konkret ändert."
        />

        <div className="mt-14 grid grid-cols-[1fr] gap-px overflow-hidden border-y border-bistre/25 bg-bistre/25 md:grid-cols-2">
          <div className="hidden bg-paper px-1 py-3 md:block">
            <span className="eyebrow">Heute</span>
          </div>
          <div className="hidden bg-paper px-1 py-3 md:block">
            <span className="eyebrow text-brand-deep">Mit Adriacon</span>
          </div>

          {challenges.map((row, i) => (
            <Fragment key={row.problem}>
              <div className="flex items-start gap-3 bg-paper px-1 py-5">
                <span className="mt-1 font-mono text-[0.65rem] text-bistre tabular">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[0.98rem] leading-relaxed text-ink-muted">{row.problem}</p>
              </div>
              <div className="flex items-start gap-3 bg-paper px-1 py-5 md:pl-6">
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                <p className="text-[0.98rem] leading-relaxed text-ink">{row.result}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
