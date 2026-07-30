import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="inhalt" className="bg-paper">
        <div className="shell pb-section pt-36">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-eyebrow uppercase text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Zurück zur Startseite
          </Link>

          <h1 className="mt-8 text-display-lg text-ink">{title}</h1>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
            Stand: {updated}
          </p>

          <div
            className="mt-12 max-w-2xl space-y-6 text-[0.97rem] leading-relaxed text-ink-muted
              [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-ink
              [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[1.4rem] [&_h2]:text-ink
              [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-medium [&_strong]:text-ink"
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
