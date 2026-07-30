import { SectionHeading } from '@/components/ui/SectionHeading';
import { BusinessRadar } from '@/components/radar/BusinessRadar';

export function RadarSection() {
  return (
    <section id="radar" className="scroll-mt-28 bg-paper py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 04"
          eyebrow="Adriacon Business Radar"
          title="Wo steht Ihre Administration heute wirklich?"
          lead="Eine Standortbestimmung in zehn Fragen. Sie schätzen selbst ein, wir zeigen das Bild – mit den drei Bereichen, an denen sich der Aufwand am schnellsten senken lässt."
        />
        <div className="mt-14">
          <BusinessRadar />
        </div>
      </div>
    </section>
  );
}
