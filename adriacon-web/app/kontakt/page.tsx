import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone, Plus } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { faqs } from '@/config/content';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Kontakt – Erstgespräch vereinbaren',
  description:
    'Adriacon Treuhand GmbH, Täfernstrasse 4, 5405 Baden-Dättwil. Telefon +41 76 541 40 08, info@adriacon.ch. Kostenloses Erstgespräch vereinbaren.',
  alternates: { canonical: '/kontakt' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        label="Kontakt"
        title="Reden wir über Ihre Ausgangslage."
        lead="Ein Erstgespräch dauert rund 30 Minuten, ist kostenlos und verpflichtet zu nichts. Sie müssen nichts vorbereiten."
      />

      <section className="py-block">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <dl className="space-y-8">
              <div className="flex gap-4">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                <div>
                  <dt className="label">Telefon</dt>
                  <dd className="mt-2">
                    <a href={site.phoneHref} className="text-[1.1rem] text-navy hover:text-blue">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                <div>
                  <dt className="label">E-Mail</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${site.email}`} className="text-[1.1rem] text-navy hover:text-blue">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                <div>
                  <dt className="label">Adresse</dt>
                  <dd className="mt-2 text-[0.98rem] leading-7 text-ink">
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
                      className="mt-1 inline-block text-[0.9rem] underline underline-offset-4 hover:text-blue"
                    >
                      Auf der Karte öffnen
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
                <div>
                  <dt className="label">Öffnungszeiten</dt>
                  <dd className="mt-2 space-y-1 text-[0.98rem] text-ink">
                    {site.hours.map((h) => (
                      <p key={h.days}>
                        {h.days}
                        <br />
                        <span className="text-ink-soft tabular">{h.time}</span>
                      </p>
                    ))}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Häufige Fragen */}
      <section className="bg-shell py-block">
        <div className="shell">
          <h2 className="text-d2">Bevor Sie schreiben</h2>
          <p className="mt-5 max-w-text lead">
            Vielleicht ist Ihre Frage schon dabei. Wenn nicht: einfach anrufen. Wir antworten auch auf
            Fragen, die noch zu keinem Auftrag führen.
          </p>

          <div className="mt-12 grid gap-x-14 lg:grid-cols-2">
            {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map(
              (column, ci) => (
                <div key={ci} className="divide-y divide-line border-t border-line">
                  {column.map((item) => (
                    <details key={item.q} className="group">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-[1rem] leading-snug text-navy marker:content-none [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <Plus
                          className="mt-1 h-4 w-4 shrink-0 text-blue transition-transform duration-300 ease-calm group-open:rotate-45"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="pb-5 pr-10 text-[0.94rem] leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
