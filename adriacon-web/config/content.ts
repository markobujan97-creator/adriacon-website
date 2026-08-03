/**
 * Redaktionelle Inhalte.
 * Nur überprüfbare Aussagen – keine erfundenen Kundenzahlen, Bewertungen,
 * Auszeichnungen, Zertifizierungen oder Lebensläufe.
 */

export const trustPoints = [
  {
    title: 'Zwei feste Ansprechpartner',
    text: 'Sie sprechen mit den Geschäftsführern selbst, nicht mit einer wechselnden Sachbearbeitung.',
  },
  {
    title: 'Digital, wenn Sie möchten',
    text: 'Belege, Freigaben und Auswertungen laufen digital. Papier geht auch, es kostet einfach mehr Zeit.',
  },
  {
    title: 'Preise, die Sie vorher kennen',
    text: 'Sie sehen vor der Zusammenarbeit, was enthalten ist und was zusätzlich verrechnet wird.',
  },
] as const;

export type ServiceGroup = {
  id: string;
  step: string;
  title: string;
  lead: string;
  weight: 'primary' | 'secondary' | 'network';
  items: Array<{ name: string; benefit: string }>;
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'treuhand-finanzen',
    step: 'Kernbereich',
    title: 'Treuhand & Finanzen',
    lead: 'Unser Hauptgeschäft. Buchhaltung, Steuern, MWST und Lohn laufen bei uns in einem festen Rhythmus, damit Ihre Zahlen jederzeit belastbar sind.',
    weight: 'primary',
    items: [
      { name: 'Finanzbuchhaltung', benefit: 'Ihre Zahlen sind laufend aktuell statt einmal im Jahr.' },
      { name: 'Laufende Buchhaltung', benefit: 'Sie geben Belege ab und erhalten einen fertigen Stand zurück.' },
      { name: 'Jahresabschlüsse', benefit: 'Ein Abschluss, der Bank und Steueramt standhält.' },
      { name: 'Steuererklärungen Unternehmen', benefit: 'Fristen und Beilagen im Griff, ohne Nachfragen.' },
      { name: 'Steuererklärungen Privatpersonen', benefit: 'Digital eingereicht, persönlich geprüft.' },
      { name: 'Mehrwertsteuer', benefit: 'Die passende Methode statt der zufälligen.' },
      { name: 'Lohnwesen', benefit: 'Löhne sind pünktlich und korrekt abgerechnet.' },
      { name: 'Quellensteuer', benefit: 'Tarife und Abrechnung bleiben nachvollziehbar.' },
      { name: 'Personaladministration', benefit: 'Personaldossiers, die bei einer Prüfung bestehen.' },
      { name: 'Debitorenmanagement', benefit: 'Sie wissen, wer offen ist, bevor es weh tut.' },
      { name: 'Reporting', benefit: 'Entscheidungen auf Zahlen statt auf Gefühl.' },
      { name: 'Liquiditätsplanung', benefit: 'Sie sehen Engpässe, bevor sie eintreten.' },
    ],
  },
  {
    id: 'gruendung-entwicklung',
    step: 'Aufbau',
    title: 'Gründung & Unternehmensentwicklung',
    lead: 'Etappen, in denen Entscheidungen Folgen für Jahre haben – von der Gründung bis zum Bankgespräch.',
    weight: 'secondary',
    items: [
      { name: 'Firmengründung', benefit: 'Ein Ablauf statt zehn offener Fragen.' },
      { name: 'GmbH-Gründung', benefit: 'Sie starten mit sauberen Grundlagen.' },
      { name: 'Start-up-Begleitung', benefit: 'Ein Gegenüber für die ersten Geschäftsjahre.' },
      { name: 'Budgetierung', benefit: 'Ein Plan, an dem man messen kann.' },
      { name: 'Forecast', benefit: 'Die Planung bleibt aktuell, nicht nur im Januar.' },
      { name: 'Finanzplanung', benefit: 'Investitionen und Steuern sind eingeplant.' },
      { name: 'Unternehmensberatung', benefit: 'Ein Blick von aussen auf Struktur und Zahlen.' },
      { name: 'Bankgespräche', benefit: 'Sie gehen vorbereitet ins Gespräch.' },
      { name: 'Investitionsrechnungen', benefit: 'Die Entscheidung ist gerechnet, nicht geschätzt.' },
    ],
  },
  {
    id: 'netzwerk',
    step: 'Ergänzend',
    title: 'Adriacon Netzwerk',
    lead: 'Leistungen, die wir über geprüfte Partner koordinieren. Sie behalten uns als Ansprechpartner.',
    weight: 'network',
    items: [
      { name: 'Versicherungskoordination', benefit: 'Ein Ansprechpartner statt vieler Offerten.' },
      { name: 'Webdesign', benefit: 'Ein Auftritt, der zum Unternehmen passt.' },
      { name: 'Grafikdesign', benefit: 'Ein einheitliches Erscheinungsbild.' },
      { name: 'Weitere Partnerleistungen', benefit: 'Kurze Wege zu Notariat und Banken.' },
    ],
  },
];

/** Die fünf Stufen der Zusammenarbeit. */
export const steps = [
  {
    title: 'Standort bestimmen',
    text: 'Kostenloses Erstgespräch von rund 30 Minuten. Wir schauen Ihre Ausgangslage an. Sie müssen nichts vorbereiten.',
  },
  {
    title: 'Kurs festlegen',
    text: 'Wir definieren Leistungen, Zuständigkeiten und Termine und legen Ihnen eine transparente Offerte vor.',
  },
  {
    title: 'Systeme einrichten',
    text: 'Zugänge, Buchhaltungssoftware und Belegfluss werden eingerichtet, bestehende Daten übernommen.',
  },
  {
    title: 'Gemeinsam vorankommen',
    text: 'Die laufende Zusammenarbeit läuft an: Belege, Abrechnungen, Auswertungen, digital und persönlich.',
  },
  {
    title: 'Nachjustieren',
    text: 'In den vereinbarten Gesprächen prüfen wir Zahlen, Prozesse und den nächsten Schritt.',
  },
] as const;

export const values = [
  { title: 'Verständlich', text: 'Wir erklären Zahlen, statt sie nur abzuliefern.' },
  { title: 'Erreichbar', text: 'Kurze Wege, schnelle Antworten, feste Ansprechpartner.' },
  { title: 'Ehrlich', text: 'Wir sagen es, wenn etwas nicht zu uns passt.' },
  { title: 'Sorgfältig', text: 'Vertraulich und gesetzeskonform nach Schweizer Obligationenrecht.' },
] as const;

export const team = [
  {
    name: 'Leon Šoprek',
    role: 'Geschäftsführer',
    qualification: 'BSc Betriebsökonomie FHNW – Finanzmanagement und Treuhand & Beratung',
    image: '/team/leon-soprek.jpg',
    alt: 'Porträt von Leon Šoprek, Geschäftsführer der Adriacon Treuhand GmbH',
    statement:
      'Gute Buchhaltung ist mehr als eine Pflicht. Sie ist die Grundlage, auf der man Entscheidungen treffen kann.',
  },
  {
    name: 'Marko Bujan',
    role: 'Geschäftsführer',
    qualification: 'BSc Betriebsökonomie FHNW – Finanzmanagement und Treuhand & Beratung',
    image: '/team/marko-bujan.jpg',
    alt: 'Porträt von Marko Bujan, Geschäftsführer der Adriacon Treuhand GmbH',
    statement:
      'Wer seine Zahlen versteht, trifft bessere Entscheidungen. Daran messen wir unsere Arbeit.',
  },
] as const;

export const faqs = [
  {
    q: 'Was kostet eine laufende Buchhaltung?',
    a: 'Der Einstieg liegt bei CHF 320.– pro Monat für Einzelfirmen und kleine GmbH. Der Preis richtet sich nach Grösse, Belegmenge und Lohnadministration. Im Paketfinder erhalten Sie in unter zwei Minuten eine Richtung.',
  },
  {
    q: 'Was bedeutet «ab CHF»?',
    a: 'Das ist der Grundpreis eines Pakets bei digitalem Belegfluss und den enthaltenen Mengen. Zusätzliche Belege, Bankkonten oder Lohnempfänger sind als Zuschläge ausgewiesen. Alle Preise verstehen sich exklusive MWST.',
  },
  {
    q: 'Kann die Zusammenarbeit vollständig digital erfolgen?',
    a: 'Ja. Belege, Freigaben und Auswertungen laufen digital, Gespräche auf Wunsch per Video. Wenn Sie lieber vorbeikommen: Unser Büro liegt an der Täfernstrasse 4 in Baden-Dättwil.',
  },
  {
    q: 'Übernimmt Adriacon bestehende Buchhaltungen?',
    a: 'Ja, unterjährig oder auf den Beginn eines neuen Geschäftsjahrs. Die Eröffnungsbilanz stimmen wir mit dem bisherigen Stand ab.',
  },
  {
    q: 'Wie funktioniert der Wechsel von einem anderen Treuhänder?',
    a: 'Sie kündigen das bestehende Mandat, wir holen Daten und Unterlagen ab und übernehmen die Zugänge. Den Ablauf koordinieren wir.',
  },
  {
    q: 'Was passiert bei einer rückständigen Buchhaltung?',
    a: 'Wir schätzen den Aufholaufwand separat und arbeiten den Rückstand in einem definierten Zeitraum auf. Der Aufholaufwand ist nicht im Paketpreis enthalten.',
  },
  {
    q: 'Arbeitet Adriacon auch ausserhalb des Kantons Aargau?',
    a: 'Ja. Der Schwerpunkt liegt im Raum Aargau und Zürich, digital betreuen wir Mandate in der ganzen Schweiz.',
  },
  {
    q: 'Welche Buchhaltungssoftware wird unterstützt?',
    a: 'Wir arbeiten bevorzugt mit Bexio und richten es bei Gründungen direkt ein. Bestehende Systeme prüfen wir im Erstgespräch.',
  },
  {
    q: 'Wie werden Zusatzarbeiten verrechnet?',
    a: 'Arbeiten ausserhalb des vereinbarten Leistungsumfangs verrechnen wir nach Aufwand zu CHF 119.– pro Stunde, sofern nichts anderes vereinbart wurde. Grössere Zusatzarbeiten offerieren wir vorher.',
  },
  {
    q: 'Sind Notariatskosten bei der Firmengründung enthalten?',
    a: 'Nein. Notariatskosten und Handelsregistergebühren fallen zusätzlich an und werden direkt von den jeweiligen Stellen verrechnet.',
  },
  {
    q: 'Ist das Ergebnis des Paketfinders verbindlich?',
    a: 'Nein. Der Paketfinder gibt eine Richtung. Den definitiven Preis legen wir nach einer persönlichen Prüfung des Leistungsumfangs fest.',
  },
  {
    q: 'Was geschieht mit meinen Angaben in den Tools?',
    a: 'Paketfinder und Jahreskurs rechnen vollständig in Ihrem Browser. Es wird nichts an uns übermittelt, solange Sie nicht aktiv das Kontaktformular senden.',
  },
] as const;

/** Fragen rund um die private Steuererklärung. */
export const taxFaqs = [
  {
    q: 'Was kostet meine Steuererklärung?',
    a: 'CHF 99.– für Privatpersonen, CHF 139.– für Paare und Ehepaare, CHF 180.– für Selbstständige und CHF 49.– für Studierende. Die Preise gelten pro Steuerjahr.',
  },
  {
    q: 'Wie reiche ich die Unterlagen ein?',
    a: 'Am einfachsten über MySteuerhelfer, unsere eigene App: Belege fotografieren, hochladen, fertig. Alternativ per E-Mail oder bei uns im Büro in Baden-Dättwil.',
  },
  {
    q: 'Welche Unterlagen brauche ich?',
    a: 'Die Checkliste auf dieser Seite führt alles Übliche auf. Sie können sie als PDF herunterladen oder ausdrucken und Punkt für Punkt abhaken.',
  },
  {
    q: 'Wie lange dauert es?',
    a: 'Sobald die Unterlagen vollständig sind, erstellen wir die Steuererklärung in der Regel innerhalb weniger Arbeitstage. Bei Rückfragen melden wir uns direkt bei Ihnen.',
  },
  {
    q: 'Machen Sie das auch für andere Kantone?',
    a: 'Ja. Der Schwerpunkt liegt im Aargau und in Zürich, wir erstellen Steuererklärungen aber für die ganze Schweiz.',
  },
  {
    q: 'Was passiert, wenn mein Fall komplizierter ist?',
    a: 'Dann sagen wir es Ihnen vorher. Bei aussergewöhnlich komplexen Verhältnissen oder sehr umfangreichen Unterlagen informieren wir Sie über allfällige Mehrkosten, bevor wir beginnen.',
  },
  {
    q: 'Kann ich auch eine frühere Steuererklärung nachreichen lassen?',
    a: 'Ja. Sagen Sie uns einfach, um welches Steuerjahr es geht.',
  },
  {
    q: 'Was geschieht mit meinen Daten?',
    a: 'Ihre Unterlagen behandeln wir vertraulich und verwenden sie ausschliesslich zur Erstellung Ihrer Steuererklärung. Details stehen in der Datenschutzerklärung.',
  },
] as const;
