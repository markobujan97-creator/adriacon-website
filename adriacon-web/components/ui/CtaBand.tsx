import Link from 'next/link';
import { RopeLine } from './RopeLine';
import { site } from '@/config/site';

/** Abschluss-CTA. Wird auf mehreren Seiten wiederverwendet. */
export function CtaBand({
  title = 'Reden wir über Ihre Ausgangslage.',
  text = 'Ein Erstgespräch dauert rund 30 Minuten, ist kostenlos und verpflichtet zu nichts. Danach wissen Sie, ob wir zueinander passen.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <RopeLine tone="dark" className="absolute inset-x-0 bottom-0 opacity-55" knotWidth={230} />
      <div className="shell relative pb-40 pt-block">
        <div className="max-w-xl">
          <h2 className="text-d2 !text-white">{title}</h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-sky-light">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="btn-light">
              Erstgespräch vereinbaren
            </Link>
            <a href={site.phoneHref} className="btn-ghost-dark">
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
