import Link from 'next/link';
import { Download, Printer } from 'lucide-react';
import checklist from '@/config/tax-checklist.json';

/** Übersicht der benötigten Unterlagen mit Download und Druckansicht. */
export function TaxChecklist() {
  return (
    <div>
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {checklist.groups.map((group) => (
          <section key={group.title}>
            <h3 className="font-display text-[1.05rem] font-medium text-navy">{group.title}</h3>
            <div className="mt-2 h-[3px] w-8 bg-sky" aria-hidden="true" />
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-[0.93rem] leading-snug text-ink-soft">
                  <span
                    className="mt-[3px] h-3.5 w-3.5 shrink-0 rounded-[2px] border border-blue"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="/downloads/adriacon-checkliste-steuererklaerung.pdf"
          download
          className="btn-primary"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Checkliste herunterladen
        </a>
        <Link href="/steuererklaerungen/checkliste" className="btn-outline">
          <Printer className="h-4 w-4" aria-hidden="true" />
          Checkliste drucken
        </Link>
      </div>

      <p className="mt-6 max-w-2xl text-[0.85rem] leading-relaxed text-ink-light">
        {checklist.note}
      </p>
    </div>
  );
}
