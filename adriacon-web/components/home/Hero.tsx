import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CourseGraphic } from '@/components/ui/CourseGraphic';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Ruhige Lichtstimmung in den Markenfarben, kein Verlaufseffekt über die ganze Fläche */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
        <div className="lg:col-span-6">
          <p className="label !text-sky">Treuhand in Baden-Dättwil</p>

          <h1 className="mt-5 text-d1 !text-white">
            Wir halten Sie
            <br />
            <span className="text-sky">auf Kurs.</span>
          </h1>

          <p className="mt-7 max-w-text text-[1.06rem] leading-relaxed text-sky-light">
            Adriacon begleitet Unternehmen und Privatpersonen bei Treuhand, Buchhaltung, Steuern und
            Administration. Im Raum Aargau und Zürich persönlich vor Ort, in der ganzen Schweiz
            digital.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="btn-light">
              Erstgespräch vereinbaren
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tools#paketfinder" className="btn-ghost-dark">
              Passendes Angebot finden
            </Link>
          </div>

          <p className="mt-10 border-t border-white/15 pt-6 text-[0.9rem] text-sky-light/80">
            Für Unternehmen:{' '}
            <Link href="/pakete" className="text-white underline underline-offset-4 hover:text-sky">
              Pakete ansehen
            </Link>
            {'  ·  '}
            Für Privatpersonen:{' '}
            <Link
              href="/steuererklaerungen"
              className="text-white underline underline-offset-4 hover:text-sky"
            >
              Steuererklärung ab CHF 49.–
            </Link>
          </p>
        </div>

        <div className="lg:col-span-6">
          <CourseGraphic />
        </div>
      </div>
    </section>
  );
}
