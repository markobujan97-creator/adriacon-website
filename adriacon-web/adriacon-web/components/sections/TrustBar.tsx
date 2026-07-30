import { Reveal } from '@/components/ui/Reveal';
import { trustPoints } from '@/config/content';

export function TrustBar() {
  return (
    <section aria-label="Was Sie von Adriacon erwarten können" className="border-b border-ink/8 bg-paper-shade">
      <div className="shell py-14">
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 0.06}>
              <span className="font-mono text-eyebrow uppercase text-bistre">{`0${i + 1}`}</span>
              <h3 className="mt-3 text-[1.05rem] font-medium leading-snug text-ink font-sans">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{point.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
