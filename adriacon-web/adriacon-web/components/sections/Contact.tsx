import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { site } from '@/config/site';

export function Contact() {
  return (
    <section id="kontakt" className="scroll-mt-28 bg-paper-shade py-section">
      <div className="shell">
        <SectionHeading
          waypoint="WP 10"
          eyebrow="Kontakt"
          title="Reden wir über Ihre Ausgangslage."
          lead="Ein Erstgespräch dauert rund 30 Minuten, ist kostenlos und verpflichtet zu nichts. Danach wissen Sie, ob wir zueinander passen – und was eine Zusammenarbeit kosten würde."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="border-t-2 border-brand-deep bg-white p-7 shadow-lift sm:p-9">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-deep" aria-hidden="true" />
                <div>
                  <dt className="eyebrow">Adresse</dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink">
                    {site.name}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                    <br />
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-[0.85rem] underline underline-offset-4 hover:text-brand-deep"
                    >
                      Auf der Karte öffnen
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-deep" aria-hidden="true" />
                <div>
                  <dt className="eyebrow">Telefon</dt>
                  <dd className="mt-2">
                    <a href={site.phoneHref} className="text-[1.05rem] text-ink hover:text-brand-deep">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-brand-deep" aria-hidden="true" />
                <div>
                  <dt className="eyebrow">E-Mail</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${site.email}`} className="text-[1.05rem] text-ink hover:text-brand-deep">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-brand-deep" aria-hidden="true" />
                <div>
                  <dt className="eyebrow">Öffnungszeiten</dt>
                  <dd className="mt-2 space-y-1 text-[0.95rem] text-ink">
                    {site.hours.map((h) => (
                      <p key={h.days}>
                        {h.days}
                        <br />
                        <span className="text-ink-muted tabular">{h.time}</span>
                      </p>
                    ))}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 border-t border-bistre/25 pt-7">
              <p className="eyebrow">Datenschutz</p>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-muted">
                Ihre Angaben verwenden wir ausschliesslich zur Bearbeitung Ihrer Anfrage. Wir geben sie
                nicht zu Werbezwecken an Dritte weiter. Weitere Angaben in der{' '}
                <a href="/datenschutz" className="underline underline-offset-2 hover:text-ink">
                  Datenschutzerklärung
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
