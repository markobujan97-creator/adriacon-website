import type { Metadata } from 'next';
import { breadcrumbSchema, metadataFor, seo } from '@/config/seo';
import Image from 'next/image';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBand } from '@/components/ui/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { Coordinates } from '@/components/ui/Coordinates';
import { steps, team, values } from '@/config/content';
import { site } from '@/config/site';

export const metadata: Metadata = metadataFor('ueberUns');

export default function UeberUnsPage() {
  return (
    <>
      <PageHeader
        label="Über uns"
        title={seo.ueberUns.h1}
        lead="Persönlich. Digital. Präzise. Wir sind ein junges Treuhandunternehmen mit Sitz in Baden-Dättwil und denken Treuhandleistungen neu – effizient, verständlich und individuell auf unsere Kundinnen und Kunden abgestimmt."
      />

      {/* Haltung mit Treppenbild */}
      <section className="py-block">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-card">
              <Image
                src="/images/treppe-hoch.jpg"
                alt="Aufsteigende Treppe an einer hellen Fassade"
                width={900}
                height={1200}
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <h2 className="text-d2">Stufe für Stufe statt alles auf einmal.</h2>
            <div className="mt-6 space-y-5 lead">
              <p>
                Die wenigsten Unternehmen brauchen sofort alles. Sie brauchen den nächsten sinnvollen
                Schritt: erst die Buchhaltung im Griff, dann verlässliche Zahlen, dann eine Planung,
                die trägt.
              </p>
              <p>
                Genau so arbeiten wir. Wir schauen, wo Sie stehen, und schlagen vor, was als Nächstes
                dran ist. Nicht, was am meisten Umsatz bringt.
              </p>
              <p>
                Was uns wichtig ist: Sie sollen verstehen, was in Ihrer Buchhaltung passiert. Wir
                erklären Zahlen, statt sie nur abzuliefern. Und wir sagen es, wenn etwas nicht zu uns
                passt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-shell py-block">
        <div className="shell">
          <h2 className="text-d2">Die Geschäftsführer Ihrer Treuhand</h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08}>
                <article className="h-full rounded-card border border-line bg-white p-6">
                  <div className="flex items-start gap-5">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded">
                      <Image
                        src={person.image}
                        alt={person.alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.2rem] font-medium text-navy">
                        {person.name}
                      </h3>
                      <p className="mt-1 text-[0.85rem] text-blue">{person.role}</p>
                      <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
                        {person.qualification}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-6 border-l-2 border-sky pl-4 text-[0.98rem] leading-relaxed text-ink">
                    {person.statement}
                  </blockquote>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <figure className="mx-auto max-w-3xl">
              {/*
                Das Bild wird bewusst vollständig gezeigt (kein Zuschnitt),
                damit beide Personen ganz sichtbar bleiben.
              */}
              <div className="overflow-hidden rounded-card bg-shell">
                <Image
                  src="/team/adriacon-team-buero.jpg"
                  alt="Leon Šoprek und Marko Bujan an einem Besprechungstisch im Büro der Adriacon Treuhand GmbH"
                  width={1600}
                  height={1600}
                  sizes="(max-width: 768px) 100vw, 48rem"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-[0.85rem] text-ink-soft">
                  Büro an der Täfernstrasse 4, Baden-Dättwil
                </span>
                <Coordinates />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Werte */}
      <section className="py-block">
        <div className="shell">
          <h2 className="text-d2">Woran Sie uns messen können</h2>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal as="li" key={value.title} delay={i * 0.06}>
                <div className="h-[3px] w-8 bg-sky" aria-hidden="true" />
                <h3 className="mt-4 font-display text-[1.1rem] font-medium text-navy">
                  {value.title}
                </h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-soft">{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-shell py-block">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-d2">So läuft die Zusammenarbeit mit Adriacon Treuhand an</h2>
            <p className="mt-5 lead">
              Fünf Stufen von der ersten Frage bis zur eingespielten Zusammenarbeit.
            </p>
          </div>

          <ol className="lg:col-span-8">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.05}>
                <div className="flex gap-6 border-b border-line py-5 last:border-0">
                  <span className="font-display text-[0.85rem] font-medium tracking-[0.1em] text-blue tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.1rem] font-medium text-navy">{step.title}</h3>
                    <p className="mt-1.5 text-[0.94rem] leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Standort */}
      <section className="py-block">
        <div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="label">Standort</h2>
            <address className="mt-4 not-italic text-[1rem] leading-8 text-ink">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet mt-3 text-[0.92rem]"
            >
              Karte öffnen
            </a>
          </div>

          <div>
            <h2 className="label">Direkt erreichbar</h2>
            <p className="mt-4 text-[1rem] leading-8 text-ink">
              <a href={site.phoneHref} className="hover:text-blue">
                {site.phone}
              </a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-blue">
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="label">Öffnungszeiten</h2>
            <dl className="mt-4 space-y-2 text-[1rem] text-ink">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-ink-soft">{h.days}</dt>
                  <dd className="tabular">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaBand
        title="Lernen wir uns kennen."
        text="Erzählen Sie uns von Ihrem Unternehmen. Wir sagen Ihnen ehrlich, wie wir Sie entlasten können und was das kostet."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema('ueberUns')) }}
      />
    </>
  );
}
