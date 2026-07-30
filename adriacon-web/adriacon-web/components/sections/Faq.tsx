import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/config/content';

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 bg-paper py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 09"
          eyebrow="Häufige Fragen"
          title="Was Interessenten uns am häufigsten fragen."
          lead="Wenn Ihre Frage fehlt: einfach anrufen oder schreiben. Wir antworten auch auf Fragen, die noch zu keinem Auftrag führen."
        />

        <div className="mt-14 grid gap-x-14 lg:grid-cols-2">
          {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map(
            (column, ci) => (
              <div key={ci} className="divide-y divide-bistre/25 border-t border-bistre/25">
                {column.map((item) => (
                  <details key={item.q} className="group py-1">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-[1rem] leading-snug text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <Plus
                        className="mt-1 h-4 w-4 shrink-0 text-brand-deep transition-transform duration-300 ease-course group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pb-5 pr-10 text-[0.92rem] leading-relaxed text-ink-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
