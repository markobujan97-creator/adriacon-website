import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { team } from '@/config/content';
import { site } from '@/config/site';

export function About() {
  return (
    <section id="ueber-uns" className="scroll-mt-28 bg-paper-shade py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 07"
          eyebrow="Über Adriacon"
          title="Zwei Geschäftsführer. Keine Warteschlange."
          lead="Adriacon Treuhand ist ein junges Treuhandunternehmen mit Sitz in Baden-Dättwil. Wir haben es gegründet, weil wir Treuhand anders erleben wollten: verständlich erklärt, digital abgewickelt und mit Menschen, die man erreicht."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <figure>
              <div className="relative aspect-square w-full overflow-hidden bg-ink/5">
                <Image
                  src="/team/adriacon-team-buero.jpg"
                  alt="Leon Šoprek und Marko Bujan im Büro der Adriacon Treuhand GmbH in Baden-Dättwil"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
                Büro Täfernstrasse 4, Baden-Dättwil — {site.coordinates.label}
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="space-y-5 text-[0.98rem] leading-relaxed text-ink-muted">
                <p>
                  Wir arbeiten für Einzelfirmen, kleine und mittlere GmbH, Start-ups und Privatpersonen.
                  Die meisten unserer Mandate liegen im Raum Aargau und Zürich. Digital betreuen wir
                  Unternehmen in der ganzen Schweiz.
                </p>
                <p>
                  Was uns wichtig ist: Sie sollen verstehen, was in Ihrer Buchhaltung passiert. Wir
                  erklären Zahlen, statt sie nur abzuliefern. Und wir sagen es, wenn etwas nicht zu uns
                  passt.
                </p>
                <p>
                  Für die Zusammenarbeit nutzen wir Bexio und unsere App MySteuerhelfer. Wo Notariat,
                  Bank oder Versicherung nötig sind, koordinieren wir über unser Partnernetzwerk.
                </p>
              </div>

              <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-bistre/25 pt-7">
                <div>
                  <dt className="eyebrow">Standort</dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Direkt erreichbar</dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                    <a href={site.phoneHref} className="hover:underline">
                      {site.phone}
                    </a>
                    <br />
                    <a href={`mailto:${site.email}`} className="hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {team.map((person, i) => (
            <Reveal key={person.name} delay={i * 0.08}>
              <article className="flex gap-6 border-t border-ink/15 bg-paper p-6">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-ink/5 sm:h-32 sm:w-28">
                  <Image
                    src={person.image}
                    alt={person.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-[1.3rem] text-ink">{person.name}</h3>
                  <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-deep">
                    {person.role}
                  </p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-muted">
                    {person.qualification}
                  </p>
                  <blockquote className="mt-4 border-l border-bistre/40 pl-3 font-display text-[0.98rem] italic leading-relaxed text-ink">
                    {person.statement}
                  </blockquote>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
