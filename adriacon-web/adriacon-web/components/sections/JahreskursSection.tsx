import { SectionHeading } from '@/components/ui/SectionHeading';
import { Jahreskurs } from '@/components/jahreskurs/Jahreskurs';

export function JahreskursSection() {
  return (
    <section id="jahreskurs" className="scroll-mt-28 border-y border-ink/8 bg-paper-shade py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 08"
          eyebrow="Ihr Jahreskurs"
          title="Das administrative Jahr auf einen Blick."
          lead="Rechtsform, Kanton, MWST-Status und Geschäftsjahr auswählen – und sehen, welche Themen wann anstehen. Als Orientierung, nicht als Fristenkalender."
        />
        <div className="mt-14">
          <Jahreskurs />
        </div>
      </div>
    </section>
  );
}
