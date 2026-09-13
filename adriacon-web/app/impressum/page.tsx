import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { company, site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum der Adriacon Treuhand GmbH, Täfernstrasse 4, 5405 Baden-Dättwil. Handelsregister des Kantons Aargau, UID CHE-375.188.509.',
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return (
    <LegalLayout label="Rechtliches" title="Impressum" updated={site.legalUpdated}>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        <strong>{site.name}</strong>
        <br />
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}
        <br />
        {site.address.country}
      </p>
      <p>
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Handelsregister</h2>
      <p>
        Rechtsform: {company.legalForm}
        <br />
        Sitz: {company.domicile}
        <br />
        Handelsregisteramt: {company.registryOffice}
        <br />
        UID: {company.uid}
        <br />
        CH-ID: {company.chId}
        <br />
        EHRA-ID: {company.ehraId}
      </p>

      <h2>Geschäftsführung</h2>
      <p>
        Leon Šoprek, Geschäftsführer
        <br />
        Marko Bujan, Geschäftsführer
      </p>

      <h2>Zweck der Gesellschaft</h2>
      <p>
        Erbringung von Treuhand-, Buchhaltungs-, Steuer- und Beratungsdienstleistungen für
        Unternehmen und Privatpersonen.
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit
        und Aktualität wird keine Gewähr übernommen. Die angebotenen Werkzeuge – Paketfinder,
        Jahreskurs und Checkliste – sind unverbindliche Orientierungshilfen und weder eine Offerte
        noch eine steuerliche, rechtliche oder betriebswirtschaftliche Beratung.
      </p>
      <p>
        Haftungsansprüche wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff auf
        oder der Nutzung dieser Website entstehen, sind ausgeschlossen, soweit das Gesetz dies
        zulässt.
      </p>

      <h2>Verweise auf Websites Dritter</h2>
      <p>
        Verweise auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Für deren
        Inhalte lehnen wir jede Verantwortung ab. Der Zugriff und die Nutzung solcher Websites
        erfolgen auf eigene Gefahr.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Texte, Bilder, Grafiken und das Logo dieser Website sind urheberrechtlich geschützt. Eine
        Vervielfältigung, Veränderung oder Verwendung ausserhalb der gesetzlich zulässigen Fälle
        bedarf der vorgängigen schriftlichen Zustimmung von {site.name}.
      </p>

      <h2>Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Es gilt ausschliesslich Schweizer Recht. Gerichtsstand ist {company.domicile}, soweit
        keine zwingenden gesetzlichen Bestimmungen entgegenstehen.
      </p>
    </LegalLayout>
  );
}
