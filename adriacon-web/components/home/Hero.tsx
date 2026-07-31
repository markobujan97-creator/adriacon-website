import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="shell grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-6">
          <p className="label">Treuhand in Baden-Dättwil</p>

          <h1 className="mt-5 text-d1">
            Stufe für Stufe
            <br />
            <span className="text-blue">auf Kurs.</span>
          </h1>

          <p className="mt-7 max-w-text lead">
            Adriacon ist die Treuhand für KMU, Start-ups, Selbstständige und Privatpersonen im Raum
            Aargau und Zürich. Buchhaltung, Steuern, MWST und Löhne – persönlich betreut, digital
            abgewickelt, mit Preisen, die Sie vorher kennen.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className="btn-primary">
              Erstgespräch vereinbaren
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tools#paketfinder" className="btn-outline">
              Passendes Paket finden
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            {/* Ruhige Farbfläche als Versatz hinter dem Bild */}
            <div
              className="absolute -left-4 -top-4 h-24 w-24 rounded bg-sky-pale sm:h-32 sm:w-32"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-card">
              <Image
                src="/images/treppe.jpg"
                alt="Aufsteigende Treppe an einer hellen Fassade"
                width={2000}
                height={1500}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
