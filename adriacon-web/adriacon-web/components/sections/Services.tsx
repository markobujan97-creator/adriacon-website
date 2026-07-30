import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { serviceGroups } from '@/config/content';

export function Services() {
  const [primary, ...rest] = serviceGroups;

  return (
    <section id="leistungen" className="scroll-mt-28 bg-paper-shade py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 02"
          eyebrow="Leistungen"
          title="Der Kern ist Treuhand. Alles andere ordnet sich unter."
          lead="Wir zeigen bewusst, was unser Hauptgeschäft ist. Buchhaltung, Steuern, MWST und Lohn machen wir selbst. Ergänzende Leistungen koordinieren wir über unser Netzwerk."
        />

        {/* Kernkompetenz */}
        <Reveal className="mt-14">
          <article className="border-t-2 border-brand-deep bg-paper p-7 shadow-lift sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="eyebrow text-brand-deep">{primary.eyebrow}</span>
                <h3 className="mt-3 text-display-md text-ink">{primary.title}</h3>
              </div>
              <a
                href={primary.cta.href}
                className="inline-flex items-center gap-1.5 border-b border-brand-deep/40 pb-1 text-sm text-brand-deep transition-colors hover:border-brand-deep"
              >
                {primary.cta.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-5 max-w-prose text-pretty leading-relaxed text-ink-muted">{primary.lead}</p>

            <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {primary.items.map((item, i) => (
                <li key={item.name} className="border-t border-bistre/25 pt-4">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[0.62rem] text-bistre tabular">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-sans text-[0.98rem] font-medium text-ink">{item.name}</h4>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.benefit}</p>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-muted/75">{item.example}</p>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        {/* Ergänzende Bereiche, bewusst kleiner gesetzt */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {rest.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.08}>
              <article
                className={`h-full border-t border-ink/15 bg-paper/60 p-7 ${
                  group.weight === 'network' ? 'bg-transparent' : ''
                }`}
              >
                <span className="eyebrow">{group.eyebrow}</span>
                <h3 className="mt-3 font-display text-[1.5rem] leading-tight text-ink">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{group.lead}</p>

                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex flex-col border-b border-bistre/20 pb-3 last:border-0">
                      <span className="text-[0.92rem] font-medium text-ink">{item.name}</span>
                      <span className="mt-0.5 text-[0.82rem] leading-relaxed text-ink-muted">
                        {item.benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={group.cta.href}
                  className="mt-6 inline-flex items-center gap-1.5 border-b border-ink/25 pb-1 text-sm text-ink transition-colors hover:border-ink"
                >
                  {group.cta.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
