import Link from 'next/link';
import { ArrowRight, Compass, Radar, CalendarDays, Smartphone } from 'lucide-react';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { Reveal } from '@/components/ui/Reveal';

const tools = [
  { icon: Compass, title: 'Paketfinder', text: 'Vier Fragen, ein passendes Paket.', href: '/tools#paketfinder' },
  { icon: Radar, title: 'Business Radar', text: 'Wo steht Ihre Administration heute?', href: '/tools#business-radar' },
  { icon: CalendarDays, title: 'Jahreskurs', text: 'Das administrative Jahr auf einen Blick.', href: '/tools#jahreskurs' },
  { icon: Smartphone, title: 'MySteuerhelfer', text: 'Steuererklärung ohne Papierstapel.', href: '/tools#mysteuerhelfer' },
];

export function ToolsTeaser() {
  return (
    <section className="bg-shell py-block">
      <div className="shell">
        <SectionIntro
          label="Tools"
          title="Vier Werkzeuge, die Ihnen jetzt schon helfen."
          lead="Kostenlos, ohne Anmeldung und ohne dass Sie uns Ihre Daten geben müssen. Alles rechnet in Ihrem Browser."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => (
            <Reveal as="li" key={tool.title} delay={i * 0.06}>
              <Link
                href={tool.href}
                className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-colors duration-200 ease-calm hover:border-sky"
              >
                <tool.icon className="h-5 w-5 text-blue" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[1.1rem] font-medium text-navy">{tool.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{tool.text}</p>
                <ArrowRight
                  className="mt-auto h-4 w-4 pt-4 text-blue transition-transform duration-200 ease-calm group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
