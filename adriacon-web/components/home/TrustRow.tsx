import { trustPoints } from '@/config/content';
import { Reveal } from '@/components/ui/Reveal';

export function TrustRow() {
  return (
    <section aria-labelledby="vertrauen-titel" className="border-y border-line bg-shell">
      <div className="shell py-12">
        <h2 id="vertrauen-titel" className="sr-only">
          Was Sie von Adriacon Treuhand erwarten können
        </h2>
        <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-3">
          {trustPoints.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 0.06}>
              <h3 className="font-display text-[1.1rem] font-medium text-navy">{point.title}</h3>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
