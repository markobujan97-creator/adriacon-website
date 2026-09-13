import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { navigation } from '@/config/site';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHeader
        label="Fehler 404"
        title="Diese Seite gibt es nicht."
        lead="Vielleicht hat sich die Adresse geändert oder es hat sich ein Tippfehler eingeschlichen."
      />

      <section className="py-block">
        <div className="shell">
          <h2 className="text-d3">Diese Seiten gibt es</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-card border border-line bg-white px-5 py-4 text-[0.98rem] text-navy transition-colors hover:border-sky"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/" className="btn-primary mt-10">
            Zur Startseite
          </Link>
        </div>
      </section>
    </>
  );
}
