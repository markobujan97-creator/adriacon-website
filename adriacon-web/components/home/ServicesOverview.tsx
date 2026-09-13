import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { Reveal } from '@/components/ui/Reveal';
import { serviceGroups } from '@/config/content';

/** Kompakter Überblick. Die Details stehen auf der Leistungsseite. */
export function ServicesOverview() {
  const primary = serviceGroups[0];
  const others = serviceGroups.slice(1);

  return (
    <section className="py-block">
      <div className="shell">
        <SectionIntro
          label="Leistungen"
          title="Treuhand, Buchhaltung und Steuern aus einer Hand"
          lead="Buchhaltung, Steuern, MWST und Lohn machen wir selbst. Gründung und Unternehmensentwicklung begleiten wir. Alles Weitere koordinieren wir über unser Netzwerk."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="text-d3">{primary.title}</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {primary.items.map((item) => (
                <li key={item.name} className="flex items-baseline gap-3 border-b border-line pb-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                  <span className="text-[0.95rem] text-ink">{item.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="space-y-8 lg:pl-8">
              {others.map((group) => (
                <div key={group.id}>
                  <h3 className="font-display text-[1.15rem] font-medium text-navy">{group.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">{group.lead}</p>
                </div>
              ))}

              <Link href="/leistungen" className="link-quiet text-[0.95rem]">
                Alle Leistungen ansehen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
