import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { PrintButton } from '@/components/ui/PrintButton';
import checklist from '@/config/tax-checklist.json';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Checkliste Steuererklärung zum Ausdrucken',
  description:
    'Druckfreundliche Checkliste der Adriacon Treuhand GmbH: alle Unterlagen für die Steuererklärung auf einen Blick.',
  alternates: { canonical: '/steuererklaerungen/checkliste' },
  robots: { index: false, follow: true },
};

export default function ChecklistePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-12 print:max-w-none print:px-0 print:py-0">
        {/* Bedienleiste – erscheint nicht auf dem Ausdruck */}
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/steuererklaerungen"
            className="inline-flex items-center gap-2 text-[0.9rem] text-ink-soft transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück zu Steuererklärungen
          </Link>
          <div className="flex gap-3">
            <a
              href="/downloads/adriacon-checkliste-steuererklaerung.pdf"
              download
              className="btn-outline"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Als PDF
            </a>
            <PrintButton />
          </div>
        </div>

        {/* Briefkopf */}
        <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-sky pb-5">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/adriacon-signet.png"
              alt=""
              aria-hidden="true"
              width={128}
              height={128}
              className="h-11 w-11 object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] font-medium tracking-[0.22em] text-navy">
                ADRIACON
              </span>
              <span className="mt-1 font-display text-[0.55rem] tracking-[0.38em] text-blue">
                TREUHAND
              </span>
            </span>
          </div>
          <address className="text-right text-[0.78rem] not-italic leading-5 text-ink-soft">
            {site.name}
            <br />
            {site.address.street}, {site.address.postalCode} {site.address.city}
            <br />
            {site.email} · {site.phone}
          </address>
        </header>

        <h1 className="mt-8 font-display text-[1.9rem] font-medium text-navy">{checklist.title}</h1>
        <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-ink-soft">
          {checklist.intro}
        </p>

        <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {checklist.groups.map((group) => (
            <section key={group.title} className="print-block">
              <h2 className="font-display text-[0.85rem] font-medium uppercase tracking-[0.12em] text-blue">
                {group.title}
              </h2>
              <div className="mt-2 h-[2px] w-full bg-sky" aria-hidden="true" />
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9rem] leading-snug text-navy">
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

        <aside className="mt-10 bg-sky-pale p-5 print-block">
          <h2 className="font-display text-[0.85rem] font-medium uppercase tracking-[0.12em] text-navy">
            Hinweis
          </h2>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-ink">{checklist.note}</p>
        </aside>

        <footer className="mt-8 border-t border-line pt-4 text-[0.75rem] text-ink-light">
          www.adriacon.ch · {site.claim}
        </footer>
      </div>
    </div>
  );
}
