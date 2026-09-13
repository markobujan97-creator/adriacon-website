import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung der Adriacon Treuhand GmbH nach Schweizer Datenschutzgesetz (DSG): Bearbeitung, Speicherung und Aufbewahrung Ihrer Daten sowie Ihre Rechte.',
  alternates: { canonical: '/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <LegalLayout
      label="Rechtliches"
      title="Datenschutzerklärung"
      updated={site.legalUpdated}
    >
      <h2>1. Verantwortliche Stelle</h2>
      <p>
        Verantwortlich für die Bearbeitung personenbezogener Daten im Sinne des Schweizer
        Datenschutzgesetzes (DSG) ist:
      </p>
      <p>
        <strong>{site.name}</strong>
        <br />
        {site.address.street}
        <br />
        {site.address.postalCode} {site.address.city}
        <br />
        {site.address.country}
        <br />
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>2. Anwendungsbereich</h2>
      <p>
        Diese Datenschutzerklärung gilt für die Bearbeitung personenbezogener Daten im Zusammenhang
        mit der Nutzung unserer Steuer- und Treuhanddienstleistungen, insbesondere über unsere App
        MySteuerhelfer, unsere Website sowie im direkten Kontakt mit Kundinnen und Kunden.
      </p>

      <h2>3. Arten der bearbeiteten personenbezogenen Daten</h2>
      <p>
        Wir bearbeiten ausschliesslich personenbezogene Daten, die für die Erstellung und
        Abwicklung Ihrer Steuererklärung sowie für unsere Treuhanddienstleistungen erforderlich
        sind. Dazu gehören insbesondere:
      </p>
      <ul>
        <li>Persönliche Stammdaten (z. B. Name, Vorname, Adresse, Geburtsdatum, Zivilstand)</li>
        <li>Kontaktinformationen (z. B. E-Mail-Adresse, Telefonnummer)</li>
        <li>Steuerrelevante Daten (z. B. Einkommen, Vermögen, Abzüge, Familienverhältnisse)</li>
        <li>Hochgeladene Dokumente und Belege</li>
        <li>Kommunikationsdaten im Zusammenhang mit Anfragen oder Rückfragen</li>
        <li>Technische Daten im Rahmen der App-Nutzung</li>
      </ul>

      <h2>4. Zweck der Datenbearbeitung</h2>
      <p>
        Die Bearbeitung Ihrer personenbezogenen Daten erfolgt ausschliesslich zu folgenden Zwecken:
        Erstellung, Prüfung und Einreichung Ihrer Steuererklärung, Erbringung der vereinbarten
        Treuhandleistungen, Kommunikation mit Ihnen, Abrechnung unserer Dienstleistungen sowie
        Erfüllung gesetzlicher Aufbewahrungs- und Dokumentationspflichten.
      </p>

      <h2>5. Datenspeicherung</h2>
      <p>
        Ihre personenbezogenen Daten werden ausschliesslich auf Servern gespeichert, die sich in
        der Schweiz befinden. Die Übermittlung der Daten erfolgt über gesicherte Verbindungen.
      </p>

      <h2>6. Weitergabe von Daten</h2>
      <p>
        Eine Weitergabe erfolgt nur an zuständige Steuerbehörden im Rahmen gesetzlicher
        Verpflichtungen sowie an sorgfältig ausgewählte Dienstleister unter Einhaltung der
        Datenschutzvorgaben.
      </p>

      <h2>7. Aufbewahrungsdauer</h2>
      <p>
        Wir bewahren Ihre Daten für die Dauer der gesetzlichen Aufbewahrungsfristen auf, in der
        Regel zehn Jahre.
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Bearbeitung,
        Datenportabilität und Widerspruch. Wenden Sie sich dazu an{' '}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>9. Beschwerderecht</h2>
      <p>
        Zuständig ist der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB),
        Feldeggweg 1, 3003 Bern,{' '}
        <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">
          www.edoeb.admin.ch
        </a>
        .
      </p>

      <h2>10. Kontaktformular auf dieser Website</h2>
      <p>
        Wenn Sie uns über das Kontaktformular schreiben, bearbeiten wir die eingegebenen Angaben –
        Name, Unternehmen, E-Mail-Adresse, Telefonnummer, Anliegen und Nachricht – ausschliesslich
        zur Bearbeitung Ihrer Anfrage. Die Angaben werden uns per E-Mail zugestellt. Eine Weitergabe
        an Dritte zu Werbezwecken findet nicht statt.
      </p>

      <h2>11. Paketfinder, Jahreskurs und Checkliste</h2>
      <p>
        Diese Werkzeuge rechnen vollständig in Ihrem Browser. Ihre Eingaben werden nicht an uns
        übermittelt und nicht gespeichert. Erst wenn Sie das Kontaktformular absenden oder Ihre
        Unterlagen über MySteuerhelfer einreichen, erhalten wir Angaben von Ihnen.
      </p>

      <h2>12. Serverprotokolle</h2>
      <p>
        Beim Aufruf dieser Website protokolliert unser Hosting-Dienstleister technisch notwendige
        Daten wie IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite und verwendeten Browser.
        Diese Daten dienen dem sicheren und stabilen Betrieb der Website.
      </p>

      <h2>13. Eingesetzte Dienstleister</h2>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> – Hosting und Auslieferung dieser Website.
        </li>
        <li>
          <strong>Resend</strong> – Versand der Anfragen aus dem Kontaktformular per E-Mail.
        </li>
        <li>
          <strong>Google Fonts</strong> – die Schriften werden beim Erstellen der Website
          heruntergeladen und von unserem eigenen Server ausgeliefert. Beim Besuch der Website
          entsteht keine Verbindung zu Google.
        </li>
      </ul>

      <h2>14. Cookies und Analyse</h2>
      <p>
        Diese Website setzt keine Cookies für Analyse-, Marketing- oder Trackingzwecke.
      </p>

      <h2>15. Änderungen</h2>
      <p>
        Wir können diese Datenschutzerklärung jederzeit anpassen. Massgebend ist die jeweils auf
        dieser Seite veröffentlichte Fassung.
      </p>
    </LegalLayout>
  );
}
