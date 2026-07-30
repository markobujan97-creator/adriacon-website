/**
 * Sämtliche redaktionellen Inhalte der Startseite.
 * Nur überprüfbare Aussagen – keine erfundenen Kundenzahlen, Bewertungen,
 * Auszeichnungen oder Zertifizierungen.
 */

export const trustPoints = [
  {
    title: 'Zwei feste Ansprechpartner',
    text: 'Sie sprechen mit den Geschäftsführern selbst – nicht mit einer wechselnden Sachbearbeitung.',
  },
  {
    title: 'Digitale Prozesse',
    text: 'Belege, Freigaben und Auswertungen laufen digital. Papier ist möglich, aber nicht die Voraussetzung.',
  },
  {
    title: 'Transparente Offerten',
    text: 'Sie sehen vor der Zusammenarbeit, was enthalten ist und was zusätzlich verrechnet wird.',
  },
  {
    title: 'Baden-Dättwil, Schweiz weit',
    text: 'Büro im Aargau, Zusammenarbeit im Raum Aargau und Zürich sowie digital in der ganzen Schweiz.',
  },
] as const;

export const challenges = [
  { problem: 'Die Administration frisst Abende und Wochenenden.', result: 'Wiederkehrende Arbeiten laufen bei uns – Sie geben nur noch frei.' },
  { problem: 'Der Überblick über die Zahlen fehlt bis zum Abschluss.', result: 'Sie erhalten unterjährig Auswertungen, die Entscheidungen tragen.' },
  { problem: 'MWST und Steuern bleiben ein Unsicherheitsfaktor.', result: 'Methode, Abrechnung und Fristenführung sind geklärt und dokumentiert.' },
  { problem: 'Die Lohnadministration wird mit jedem Mitarbeitenden aufwendiger.', result: 'Lohnlauf, Meldungen und Quellensteuer laufen im festen Monatsrhythmus.' },
  { problem: 'Unterlagen kommen zu spät oder unvollständig.', result: 'Ein klarer Belegfluss mit fixen Terminen statt Nachfragen per Mail.' },
  { problem: 'Niemand weiss genau, wer wofür zuständig ist.', result: 'Schriftlich festgehaltene Zuständigkeiten zwischen Ihnen und uns.' },
  { problem: 'Das Unternehmen wächst schneller als die Finanzprozesse.', result: 'Prozesse, Reporting und Planung wachsen mit – ohne Systemwechsel.' },
  { problem: 'Die Buchhaltung ist im Rückstand.', result: 'Wir holen den Rückstand auf und halten den Stand danach aktuell.' },
] as const;

export type ServiceGroup = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  weight: 'primary' | 'secondary' | 'network';
  items: Array<{ name: string; benefit: string; example: string }>;
  cta: { label: string; href: string };
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'treuhand-finanzen',
    eyebrow: 'Kernkompetenz',
    title: 'Treuhand & Finanzen',
    lead: 'Das ist unser Handwerk. Buchhaltung, Steuern, MWST und Lohn laufen bei uns in einem festen Rhythmus – damit Ihre Zahlen jederzeit belastbar sind.',
    weight: 'primary',
    items: [
      { name: 'Finanzbuchhaltung', benefit: 'Ihre Zahlen sind laufend aktuell statt einmal im Jahr.', example: 'Monatliche Verbuchung, Bankabgleich, Kontenabstimmung.' },
      { name: 'Laufende Buchhaltung', benefit: 'Sie geben Belege ab und erhalten einen fertigen Stand zurück.', example: 'Digitaler Belegeingang, Freigabe, Verbuchung.' },
      { name: 'Jahresabschlüsse', benefit: 'Ein Abschluss, der Bank und Steueramt standhält.', example: 'Bilanz, Erfolgsrechnung, Anhang, Abschlussbesprechung.' },
      { name: 'Steuererklärungen Unternehmen', benefit: 'Fristen und Beilagen im Griff, ohne Nachfragen.', example: 'Steuererklärung der GmbH inklusive Abschlussbeilagen.' },
      { name: 'Steuererklärungen Privatpersonen', benefit: 'Digital eingereicht, persönlich geprüft.', example: 'Belege über MySteuerhelfer scannen, wir übernehmen den Rest.' },
      { name: 'Mehrwertsteuer', benefit: 'Die passende Methode statt der zufälligen.', example: 'Saldosteuersatz oder effektive Abrechnung, laufende Abrechnungen.' },
      { name: 'Lohnwesen', benefit: 'Löhne sind pünktlich und korrekt abgerechnet.', example: 'Monatlicher Lohnlauf, Lohnausweise, Jahresmeldungen.' },
      { name: 'Quellensteuer', benefit: 'Abrechnung und Tarife bleiben nachvollziehbar.', example: 'Tarifzuordnung, Abrechnung, Korrekturen.' },
      { name: 'Personaladministration', benefit: 'Personaldossiers, die bei einer Prüfung bestehen.', example: 'Verträge, Pensen, Ferienguthaben, Mutationen.' },
      { name: 'Debitorenmanagement', benefit: 'Sie wissen, wer noch offen ist – bevor es weh tut.', example: 'Offene-Posten-Liste mit Mahnvorschlag.' },
      { name: 'Reporting', benefit: 'Entscheidungen auf Zahlen statt auf Gefühl.', example: 'Quartals- oder Monatsreporting mit Kennzahlen.' },
      { name: 'Liquiditätsplanung', benefit: 'Sie sehen Engpässe, bevor sie eintreten.', example: 'Rollende Planung über 12 Monate.' },
    ],
    cta: { label: 'Paket und Preis berechnen', href: '#kursfinder' },
  },
  {
    id: 'gruendung-entwicklung',
    eyebrow: 'Aufbau',
    title: 'Gründung & Unternehmensentwicklung',
    lead: 'Von der Gründung bis zum Bankgespräch: Wir begleiten die Etappen, in denen Entscheidungen Folgen für Jahre haben.',
    weight: 'secondary',
    items: [
      { name: 'Firmengründung', benefit: 'Ein Ablauf statt zehn offener Fragen.', example: 'Statuten, Kapitaleinzahlung, Handelsregister, Anmeldungen.' },
      { name: 'GmbH-Gründung', benefit: 'Sie starten mit sauberen Grundlagen.', example: 'Gründungspaket inklusive Bexio-Einrichtung.' },
      { name: 'Start-up-Begleitung', benefit: 'Ein Gegenüber für die ersten Geschäftsjahre.', example: 'Aufbau Buchhaltung, MWST-Anmeldung, erste Abschlüsse.' },
      { name: 'Budgetierung', benefit: 'Ein Plan, an dem man messen kann.', example: 'Jahresbudget nach Kostenarten und Bereichen.' },
      { name: 'Forecast', benefit: 'Die Planung bleibt aktuell, nicht nur der Januar.', example: 'Rollende Hochrechnung mit Ist-Abgleich.' },
      { name: 'Finanzplanung', benefit: 'Investitionen und Steuern sind eingeplant.', example: 'Mehrjahresplanung mit Liquiditätssicht.' },
      { name: 'Unternehmensberatung', benefit: 'Ein Blick von aussen auf Struktur und Zahlen.', example: 'Analyse von Marge, Kostenstruktur und Prozessen.' },
      { name: 'Bankgespräche', benefit: 'Sie gehen vorbereitet ins Gespräch.', example: 'Unterlagen, Kennzahlen und Begleitung vor Ort.' },
      { name: 'Investitionsrechnungen', benefit: 'Die Entscheidung ist gerechnet, nicht geschätzt.', example: 'Vergleich Kauf, Leasing und Finanzierung.' },
    ],
    cta: { label: 'Gründung besprechen', href: '#kontakt' },
  },
  {
    id: 'netzwerk',
    eyebrow: 'Ergänzend',
    title: 'Adriacon Netzwerk',
    lead: 'Leistungen, die wir über geprüfte Partner koordinieren. Sie behalten uns als Ansprechpartner – wir organisieren den Rest.',
    weight: 'network',
    items: [
      { name: 'Versicherungskoordination', benefit: 'Ein Ansprechpartner statt vieler Offerten.', example: 'Angebote einholen und vergleichen.' },
      { name: 'Webdesign', benefit: 'Ein Auftritt, der zum Unternehmen passt.', example: 'Website und Auftritt über unser Partnernetzwerk.' },
      { name: 'Grafikdesign', benefit: 'Ein einheitliches Erscheinungsbild.', example: 'Logo, Geschäftsdrucksachen, Vorlagen.' },
      { name: 'Weitere Partnerleistungen', benefit: 'Kurze Wege zu Notariat und Banken.', example: 'Koordination bei Gründung und Finanzierung.' },
    ],
    cta: { label: 'Netzwerkleistung anfragen', href: '#kontakt' },
  },
];

export const processSteps = [
  { code: 'ETAPPE 01', title: 'Standort bestimmen', text: 'Kostenloses Erstgespräch von rund 30 Minuten. Wir schauen Ihre Ausgangslage an: Zahlen, Abläufe, offene Punkte.', detail: 'Sie brauchen dafür nichts vorzubereiten.' },
  { code: 'ETAPPE 02', title: 'Kurs festlegen', text: 'Wir definieren Leistungen, Zuständigkeiten und Termine und legen Ihnen eine transparente Offerte vor.', detail: 'Sie sehen, was enthalten ist und was nach Aufwand läuft.' },
  { code: 'ETAPPE 03', title: 'Systeme einrichten', text: 'Zugänge, Buchhaltungssoftware und Belegfluss werden eingerichtet, bestehende Daten übernommen.', detail: 'In den meisten Fällen innert zwei Wochen startklar.' },
  { code: 'ETAPPE 04', title: 'Gemeinsam vorankommen', text: 'Die laufende Zusammenarbeit läuft an: Belege, Abrechnungen, Auswertungen – digital und persönlich.', detail: 'Feste Ansprechpartner, kurze Reaktionszeiten.' },
  { code: 'ETAPPE 05', title: 'Regelmässig nachjustieren', text: 'In den vereinbarten Gesprächen prüfen wir Zahlen, Prozesse und den nächsten Schritt.', detail: 'Je nach Paket ein- bis viermal pro Jahr.' },
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
      'Wir erklären, was wir tun. Wer seine Zahlen versteht, trifft bessere Entscheidungen – das ist unser Massstab.',
  },
] as const;

export const faqs = [
  { q: 'Was kostet eine laufende Buchhaltung?', a: 'Der Einstieg liegt bei CHF 320.– pro Monat für Einzelfirmen und kleine GmbH mit bis zu drei Mitarbeitenden. Der Preis richtet sich nach Grösse, Belegmenge, Lohnadministration und Struktur. Im Kursfinder erhalten Sie in rund zwei Minuten eine Orientierung.' },
  { q: 'Was bedeutet „Ab-Preis"?', a: 'Der Ab-Preis ist der Grundpreis eines Pakets bei digitalem Belegfluss und den enthaltenen Mengen. Zusätzliche Belege, Bankkonten, Lohnempfänger oder Kostenstellen führen zu klar ausgewiesenen Zuschlägen. Alle Preise verstehen sich exklusive MWST.' },
  { q: 'Welche Leistungen sind in den Paketen enthalten?', a: 'Jedes Paket listet den Umfang vollständig auf – von der laufenden Buchhaltung über MWST und Lohn bis zum Jahresabschluss. Was nicht aufgeführt ist, verrechnen wir nach Aufwand zu CHF 119.– pro Stunde oder offerieren wir separat.' },
  { q: 'Wie funktioniert der Kursfinder?', a: 'Sie beantworten entlang von sieben Etappen Fragen zu Ihrem Unternehmen. Daraus leiten wir ein Paket, die zutreffenden Zuschläge und eine monatliche Orientierung ab. Jede Position ist einzeln sichtbar.' },
  { q: 'Ist das Resultat verbindlich?', a: 'Nein. Der Kursfinder ist eine Preisorientierung, keine Offerte. Den definitiven Preis legen wir nach einer persönlichen Prüfung des Leistungsumfangs fest.' },
  { q: 'Kann die Zusammenarbeit vollständig digital erfolgen?', a: 'Ja. Belege, Freigaben und Auswertungen laufen digital, Gespräche auf Wunsch per Video. Wenn Sie lieber persönlich vorbeikommen: Unser Büro liegt an der Täfernstrasse 4 in Baden-Dättwil.' },
  { q: 'Welche Unterlagen werden für den Start benötigt?', a: 'In der Regel: Handelsregisterauszug, Statuten, letzte Jahresrechnung, Bankzugänge oder Kontoauszüge, MWST-Angaben sowie bei Personal die Lohndaten und Versicherungsunterlagen. Wir schicken Ihnen vor dem Start eine konkrete Liste.' },
  { q: 'Übernimmt Adriacon bestehende Buchhaltungen?', a: 'Ja. Wir übernehmen laufende Mandate unterjährig oder auf den Beginn eines neuen Geschäftsjahrs und stimmen die Eröffnungsbilanz mit dem bisherigen Stand ab.' },
  { q: 'Was passiert bei einer rückständigen Buchhaltung?', a: 'Wir schätzen den Aufholaufwand separat und arbeiten den Rückstand in einem definierten Zeitraum auf. Danach läuft die Buchhaltung im vereinbarten Rhythmus weiter. Der Aufholaufwand ist nicht im Paketpreis enthalten.' },
  { q: 'Unterstützt Adriacon bei einer Firmengründung?', a: 'Ja. Die GmbH-Gründung kostet CHF 1\'200.– einmalig, inklusive Statutenkoordination, Handelsregisteranmeldung, MWST- und Sozialversicherungsanmeldung, Bexio-Einrichtung und 60 Minuten Startberatung. Notariatskosten und Handelsregistergebühren sind nicht enthalten. Mit gleichzeitig abgeschlossenem laufendem Mandat kostet die Gründung CHF 600.–.' },
  { q: 'Wie funktioniert der Wechsel von einem anderen Treuhänder?', a: 'Sie kündigen das bestehende Mandat, wir holen die Daten und Unterlagen ab und übernehmen die Zugänge. Den Ablauf koordinieren wir – Sie müssen nicht zwischen zwei Treuhändern vermitteln.' },
  { q: 'Arbeitet Adriacon auch ausserhalb des Kantons Aargau?', a: 'Ja. Der Schwerpunkt liegt im Raum Aargau und Zürich, digital betreuen wir Mandate in der ganzen Schweiz.' },
  { q: 'Welche Buchhaltungssoftware wird unterstützt?', a: 'Wir arbeiten bevorzugt mit Bexio und richten es bei Gründungen direkt ein. Bestehende Systeme prüfen wir im Erstgespräch und sagen Ihnen ehrlich, ob ein Wechsel sinnvoll ist.' },
  { q: 'Wie werden Zusatzarbeiten verrechnet?', a: 'Arbeiten ausserhalb des vereinbarten Leistungsumfangs verrechnen wir nach Aufwand zu CHF 119.– pro Stunde, sofern nichts anderes vereinbart wurde. Grössere Zusatzarbeiten offerieren wir vorher.' },
  { q: 'Wann ist eine separate Offerte notwendig?', a: 'Bei mehr als 40 Mitarbeitenden, mehreren Gesellschaften, sehr hoher Belegmenge, vier oder mehr Kostenstellen, komplexen Fremdwährungssachverhalten, stark rückständiger Buchhaltung sowie bei Konsolidierung, Restrukturierung oder ausserordentlichen Projekten.' },
  { q: 'Wie funktioniert das CFO-Angebot?', a: 'ADRIACON CFO ist eine Erweiterung für bestehende Mandate und kein Einstiegspaket. Wenn Sie Führungsunterstützung suchen, starten wir mit einer persönlichen Standortbestimmung und einem passenden Grundpaket.' },
  { q: 'Sind Notariatskosten bei der Firmengründung enthalten?', a: 'Nein. Notariatskosten und Handelsregistergebühren fallen zusätzlich an und werden direkt von den jeweiligen Stellen in Rechnung gestellt.' },
  { q: 'Was geschieht mit meinen Daten im Kursfinder?', a: 'Der Kursfinder rechnet vollständig in Ihrem Browser. Es werden keine Eingaben an uns übermittelt, solange Sie das Ergebnis nicht aktiv über das Formular senden. Erst dann erhalten wir Ihre Angaben per E-Mail.' },
] as const;
