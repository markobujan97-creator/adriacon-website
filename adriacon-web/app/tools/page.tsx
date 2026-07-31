import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBand } from '@/components/ui/CtaBand';
import { PaketFinder } from '@/components/tools/PaketFinder';
import { BusinessRadar } from '@/components/tools/BusinessRadar';
import { Jahreskurs } from '@/components/tools/Jahreskurs';
import { MySteuerhelfer } from '@/components/tools/MySteuerhelfer';

export const metadata: Metadata = {
  title: 'Tools – Paketfinder, Business Radar, Jahreskurs',
  description:
    'Vier kostenlose Werkzeuge der Adriacon Treuhand: Paketfinder, Business Radar, Jahreskurs und die App MySteuerhelfer. Ohne Anmeldung nutzbar.',
  alternates: { canonical: '/tools' },
};

const sections = [
  {
    id: 'paketfinder',
    label: 'Werkzeug 1',
    title: 'Paketfinder',
    lead: 'Vier Fragen, eine Empfehlung. In unter zwei Minuten wissen Sie, welches Paket zu Ihrer Situation passt.',
    tone: 'light' as const,
  },
  {
    id: 'business-radar',
    label: 'Werkzeug 2',
    title: 'Business Radar',
    lead: 'Eine ehrliche Standortbestimmung Ihrer Administration – und die drei Bereiche, an denen sich der Aufwand am schnellsten senken lässt.',
    tone: 'shell' as const,
  },
  {
    id: 'jahreskurs',
    label: 'Werkzeug 3',
    title: 'Jahreskurs',
    lead: 'Welche administrativen Themen wann anstehen. Als Orientierung, nicht als Fristenkalender.',
    tone: 'light' as const,
  },
  {
    id: 'mysteuerhelfer',
    label: 'Werkzeug 4',
    title: 'MySteuerhelfer',
    lead: 'Unsere App für die Steuererklärung. Belege scannen statt sammeln.',
    tone: 'shell' as const,
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        label="Tools"
        title="Werkzeuge, die schon vor dem ersten Gespräch helfen."
        lead="Alle vier laufen vollständig in Ihrem Browser. Keine Anmeldung, keine Datenübermittlung, keine Verpflichtung."
      />

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-24 py-block ${section.tone === 'shell' ? 'bg-shell' : ''}`}
        >
          <div className="shell">
            <header className="max-w-2xl">
              <p className="label">{section.label}</p>
              <h2 className="mt-4 text-d2">{section.title}</h2>
              <p className="mt-5 lead">{section.lead}</p>
            </header>

            <div className="mt-12">
              {section.id === 'paketfinder' && <PaketFinder />}
              {section.id === 'business-radar' && <BusinessRadar />}
              {section.id === 'jahreskurs' && <Jahreskurs />}
              {section.id === 'mysteuerhelfer' && <MySteuerhelfer />}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
