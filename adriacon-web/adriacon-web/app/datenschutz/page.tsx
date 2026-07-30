import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { site } from '@/config/site';

/**
 * ============================================================================
 * TODO (RECHTLICHE PRÜFUNG ERFORDERLICH)
 * ----------------------------------------------------------------------------
 * Vorlage im Sinne des revidierten Schweizer Datenschutzgesetzes (revDSG).
 * Sie ersetzt KEINE rechtliche Prüfung. Vor der Veröffentlichung klären:
 *
 *  1. Verantwortliche Stelle und Kontakt für Datenschutzanfragen bestätigen
 *  2. Tatsächlich eingesetzte Dienste vollständig auflisten
 *     (Hosting Vercel, E-Mail-Versand Resend, allfällige Analyse-Tools)
 *  3. Aufbewahrungsdauern der Formularanfragen festlegen
 *  4. Auftragsbearbeitungsverträge mit allen Dienstleistern prüfen
 *  5. Falls Analyse- oder Marketing-Tools eingesetzt werden: Cookie-Banner
 *     und Einwilligungslösung ergänzen (aktuell werden KEINE Cookies gesetzt)
 *  6. Bei Bearbeitung von Daten aus dem EWR: DSGVO-Anforderungen prüfen
 * ============================================================================
 */

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung der Adriacon Treuhand GmbH.',
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" updated="Bitte beim Aufschalten aktualisieren">
      <p>
        Der Schutz Ihrer Daten ist uns wichtig. Nachfolgend erklären wir, welche Daten wir beim Besuch
        dieser Website bearbeiten und zu welchem Zweck.
      </p>

      <h2>Verantwortliche Stelle</h2>
      <p>
        <strong>{site.name}</strong>
        <br />
        {site.address.street}, {site.address.postalCode} {site.address.city}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Kontaktformular</h2>
      <p>
        Wenn Sie uns über das Kontaktformular schreiben, bearbeiten wir die von Ihnen eingegebenen
        Angaben – Name, Unternehmen, E-Mail-Adresse, Telefonnummer, Anliegen, Nachricht sowie
        gewünschte Kontaktart und Rückrufzeit – ausschliesslich zur Bearbeitung Ihrer Anfrage. Die
        Angaben werden uns per E-Mail zugestellt. Eine Weitergabe an Dritte zu Werbezwecken findet
        nicht statt.
      </p>
      <p>
        {/* TODO: Aufbewahrungsdauer festlegen und hier konkret benennen. */}
        Anfragen bewahren wir so lange auf, wie es für die Bearbeitung und allfällige Anschlussfragen
        erforderlich ist. <strong>[TODO: konkrete Aufbewahrungsdauer ergänzen]</strong>
      </p>

      <h2>Kursfinder, Business Radar und Jahreskurs</h2>
      <p>
        Diese drei Werkzeuge rechnen vollständig in Ihrem Browser. Ihre Eingaben werden nicht an uns
        übermittelt und nicht gespeichert, solange Sie das Ergebnis nicht aktiv über das Formular
        senden. Erst dann erhalten wir die von Ihnen freigegebene Zusammenfassung zusammen mit Ihren
        Kontaktangaben.
      </p>

      <h2>Serverprotokolle</h2>
      <p>
        Beim Aufruf dieser Website werden durch unseren Hosting-Dienstleister technisch notwendige
        Daten protokolliert, etwa IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite, verwendeter
        Browser und Betriebssystem. Diese Daten dienen dem sicheren und stabilen Betrieb der Website.
      </p>

      <h2>Eingesetzte Dienstleister</h2>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> – Hosting und Auslieferung der Website.
        </li>
        <li>
          <strong>Resend</strong> – Versand der Formularanfragen per E-Mail.
          {/* TODO: Entfernen, falls kein E-Mail-Dienst eingerichtet wird. */}
        </li>
        <li>
          <strong>Google Fonts</strong> – die Schriften werden über Next.js beim Erstellen der Website
          heruntergeladen und von unserem eigenen Server ausgeliefert. Beim Besuch der Website erfolgt
          dadurch keine Verbindung zu Google.
        </li>
        {/* TODO: Weitere tatsächlich eingesetzte Dienste ergänzen oder nicht genutzte streichen. */}
      </ul>

      <h2>Cookies und Analyse</h2>
      <p>
        Diese Website setzt keine Cookies für Analyse-, Marketing- oder Trackingzwecke.
        {/* TODO: Anpassen, sobald Analyse-Tools eingesetzt werden. Dann ist zusätzlich
            eine Einwilligungslösung (Cookie-Banner) erforderlich. */}
      </p>

      <h2>Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft über die Sie betreffenden Personendaten sowie auf deren
        Berichtigung oder Löschung. Wenden Sie sich dazu an{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Änderungen</h2>
      <p>
        Wir können diese Datenschutzerklärung jederzeit anpassen. Massgebend ist die jeweils auf dieser
        Seite veröffentlichte Fassung.
      </p>
    </LegalPage>
  );
}
