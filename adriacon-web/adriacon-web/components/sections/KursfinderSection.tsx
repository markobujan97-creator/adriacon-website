import { SectionHeading } from '@/components/ui/SectionHeading';
import { Kursfinder } from '@/components/calculator/Kursfinder';

export function KursfinderSection() {
  return (
    <section id="kursfinder" className="scroll-mt-28 border-y border-ink/8 bg-paper-shade py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 03"
          eyebrow="Adriacon Kursfinder"
          title="In zwei Minuten wissen, was Treuhand bei Ihnen kostet."
          lead="Sieben Etappen, echte Zahlen. Sie sehen das Ergebnis vollständig, bevor Sie irgendwelche Kontaktdaten eingeben. Die Berechnung läuft in Ihrem Browser."
        />
        <div className="mt-14">
          <Kursfinder />
        </div>
      </div>
    </section>
  );
}
