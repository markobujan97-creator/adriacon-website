import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { site } from '@/config/site';

/**
 * ============================================================================
 * TODO (RECHTLICHE PRÜFUNG ERFORDERLICH)
 * ----------------------------------------------------------------------------
 * Vorlage – ersetzt KEINE rechtliche Prüfung. Vor der Veröffentlichung ergänzen:
 *   1. UID-Nummer (CHE-xxx.xxx.xxx)
 *   2. MWST-Nummer, falls MWST-pflichtig
 *   3. Handelsregistereintrag (Registeramt und Firmennummer)
 *   4. Haftungs- und Urheberrechtsklauseln durch eine Fachperson prüfen lassen
 * ============================================================================
 */

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der Adriacon Treuhand GmbH, Täfernstrasse 4, 5405 Baden-Dättwil.',
  alternates: { canonical: '/impressum' },
};

export default function ImpressumPage() {
  return (
    <LegalLayout label="Rechtliches" title="Impressum" updated="Bitte beim Aufschalten aktualisieren">
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
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
      </p>

      <h2>Unternehmensangaben</h2>
      <p>
        {/* TODO: korrekte UID eintragen, z. B. CHE-123.456.789 */}
        UID-Nummer: <strong>[TODO: UID-Nummer ergänzen]</strong>
        <br />
        {/* TODO: MWST-Nummer eintragen oder Zeile entfernen */}
        MWST-Nummer: <strong>[TODO: MWST-Nummer ergänzen oder Zeile entfernen]</strong>
        <br />
        {/* TODO: Registeramt und Eintragsdaten ergänzen */}
        Handelsregister: <strong>[TODO: Registeramt und Firmennummer ergänzen]</strong>
      </p>

      <h2>Geschäftsführung</h2>
      <p>
        Leon Šoprek, Geschäftsführer
        <br />
        Marko Bujan, Geschäftsführer
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und
        Aktualität wird keine Gewähr übernommen. Die angebotenen Werkzeuge – Paketfinder, Business
        Radar und Jahreskurs – sind unverbindliche Orientierungshilfen und weder eine Offerte noch
        eine steuerliche, rechtliche oder betriebswirtschaftliche Beratung.
      </p>

      <h2>Verweise auf Websites Dritter</h2>
      <p>
        Verweise auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Für deren
        Inhalte wird jede Verantwortung abgelehnt.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Texte, Bilder, Grafiken und das Logo dieser Website sind urheberrechtlich geschützt. Eine
        Verwendung ausserhalb der gesetzlich zulässigen Fälle bedarf der vorgängigen schriftlichen
        Zustimmung von {site.name}.
      </p>
    </LegalLayout>
  );
}
