import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function AboutTeaser() {
  return (
    <section className="py-block">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="overflow-hidden rounded-card">
            <Image
              src="/team/adriacon-team-buero.jpg"
              alt="Leon Šoprek und Marko Bujan im Büro der Adriacon Treuhand GmbH in Baden-Dättwil"
              width={1600}
              height={1600}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <p className="label">Über uns</p>
          <h2 className="mt-4 text-d2">Ihr Treuhandbüro in Baden-Dättwil</h2>
          <p className="mt-5 lead">
            Adriacon Treuhand ist ein junges Treuhandunternehmen mit Sitz in Baden-Dättwil. Wir haben
            es gegründet, weil wir Treuhand anders erleben wollten: verständlich erklärt, digital
            abgewickelt und mit Menschen, die man auch erreicht.
          </p>
          <p className="mt-4 lead">
            Sie sprechen mit Leon Šoprek und Marko Bujan – nicht mit einer wechselnden
            Sachbearbeitung.
          </p>
          <Link href="/ueber-uns" className="link-quiet mt-7 text-[0.95rem]">
            Das Team kennenlernen
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
