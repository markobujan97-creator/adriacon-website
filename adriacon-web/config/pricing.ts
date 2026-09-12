/**
 * Zentrale Preis- und Paketkonfiguration der Adriacon Treuhand GmbH.
 * Einzige Quelle der Wahrheit für alle Preise auf der Website.
 * Alle Beträge in CHF. Adriacon ist nicht mehrwertsteuerpflichtig,
 * die Preise sind Endpreise. Stand: Preisliste 2026.
 */

export const pricingConfig = {
  currency: 'CHF',
  /**
   * Die Adriacon Treuhand GmbH ist nicht mehrwertsteuerpflichtig
   * (Jahresumsatz unter CHF 100'000). Auf den Honoraren wird keine MWST
   * erhoben, alle Preise auf dieser Website sind Endpreise.
   */
  vatLiable: false,

  /** Stundensatz für Arbeiten ausserhalb des vereinbarten Leistungsumfangs. */
  generalHourlyRate: 119,

  /**
   * Interner Sondertarif aus der Preisliste für nicht digitalen Belegfluss.
   * Wird auf der Website bewusst nicht prominent gezeigt.
   *
   * TODO (Adriacon): Bestätigen, ob für nicht digitalen Belegfluss weiterhin
   * CHF 165.– pro Stunde oder der allgemeine Stundensatz von CHF 119.– gilt.
   */
  nonDigitalHourlyRate: 165,

  packages: {
    start: {
      id: 'start',
      name: 'ADRIACON START',
      minEmployees: 0,
      maxEmployees: 3,
      monthlyBasePrice: 320,
      includedPayrollRecipients: 3,
      existingClientsOnly: false,
    },
    kmu: {
      id: 'kmu',
      name: 'ADRIACON KMU',
      minEmployees: 4,
      maxEmployees: 15,
      monthlyBasePrice: 780,
      includedPayrollRecipients: 15,
      existingClientsOnly: false,
    },
    kmuPlus: {
      id: 'kmuPlus',
      name: 'ADRIACON KMU PLUS',
      minEmployees: 16,
      maxEmployees: 40,
      monthlyBasePrice: 1450,
      includedPayrollRecipients: 40,
      existingClientsOnly: false,
    },
    cfo: {
      id: 'cfo',
      name: 'ADRIACON CFO',
      minEmployees: 0,
      maxEmployees: Number.POSITIVE_INFINITY,
      monthlyBasePrice: 2800,
      includedPayrollRecipients: 0,
      existingClientsOnly: true,
    },
  },

  incorporation: {
    standardPrice: 1200,
    priceWithOngoingMandate: 600,
  },

  surcharges: {
    includedDocuments: 150,
    additionalDocumentBlockSize: 100,
    pricePerDocumentBlock: 80,
    includedBankAccounts: 2,
    additionalBankAccountPrice: 40,
    additionalPayrollRecipientPrice: 22,
    costCenterPrice: 120,
    effectiveVatPrice: 60,
    paperDocumentPercentage: 0.35,
    foreignCurrencyPrice: 90,
  },
} as const;

export type PackageId = keyof typeof pricingConfig.packages;

/** Kartenreihenfolge auf der Paketeseite. */
export type CardId = PackageId | 'gruendung';

export interface PackageCard {
  id: CardId;
  name: string;
  /** Kurz und in einer Zeile: für wen. */
  audience: string;
  /** Ein Satz Nutzen – kein Marketingtext. */
  benefit: string;
  price: string;
  priceNote: string;
  /** Erst beim Aufklappen sichtbar. */
  includes: string[];
  extras: string[];
  suitedFor: string;
  cta: { label: string; href: string };
  /** CFO wird visuell anders behandelt. */
  variant?: 'standard' | 'extension' | 'oneoff';
}

export const packageCards: PackageCard[] = [
  {
    id: 'start',
    name: 'ADRIACON START',
    audience: 'Einzelfirmen und kleine GmbH, 0 bis 3 Mitarbeitende',
    benefit: 'Buchhaltung, MWST und Abschluss vollständig abgeben.',
    price: 'ab CHF 320.–',
    priceNote: 'pro Monat',
    includes: [
      'Laufende digitale Buchhaltung',
      'Mehrwertsteuer',
      'Lohnadministration bis 3 Lohnempfänger',
      'Jahresabschluss',
      'Steuererklärung der Gesellschaft',
      '1 Jahresgespräch',
    ],
    extras: [
      'Belege über 150 pro Monat: je angefangene 100 Belege CHF 80.–',
      'Bankkonten über 2: je Konto CHF 40.–',
      'Lohnempfänger über 3: je Person CHF 22.–',
      'Effektive MWST-Abrechnung: CHF 60.–',
    ],
    suitedFor:
      'Sie führen Ihr Unternehmen alleine oder zu zweit und möchten sich um Buchhaltung und Fristen nicht mehr kümmern.',
    cta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' },
    variant: 'standard',
  },
  {
    id: 'kmu',
    name: 'ADRIACON KMU',
    audience: 'Unternehmen mit 4 bis 15 Mitarbeitenden',
    benefit: 'Löhne laufen im Monatsrhythmus, Zahlen kommen quartalsweise.',
    price: 'ab CHF 780.–',
    priceNote: 'pro Monat',
    includes: [
      'Alles aus ADRIACON START',
      'Lohnadministration bis 15 Lohnempfänger',
      'Quellensteuer',
      'Lohnjahresabschluss',
      'Quartalsreporting',
      'Debitorenübersicht mit Mahnvorschlag',
      '2 persönliche Gespräche',
      // TODO (Adriacon): In der Preisliste steht "Mystery-Helper für die gesamte
      // Belegschaft". Gemeint ist vermutlich die App "MySteuerhelfer". Bitte bestätigen.
      'MySteuerhelfer für die gesamte Belegschaft',
    ],
    extras: [
      'Belege über 150 pro Monat: je angefangene 100 Belege CHF 80.–',
      'Bankkonten über 2: je Konto CHF 40.–',
      'Lohnempfänger über 15: je Person CHF 22.–',
      'Kostenstellen oder Filialen: je Einheit CHF 120.–',
    ],
    suitedFor:
      'Sie haben ein Team, wiederkehrende Lohnläufe und möchten unterjährig wissen, wo Sie stehen.',
    cta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' },
    variant: 'standard',
  },
  {
    id: 'kmuPlus',
    name: 'ADRIACON KMU PLUS',
    audience: 'Unternehmen mit 16 bis 40 Mitarbeitenden',
    benefit: 'Monatliche Zahlen und eine Liquiditätsplanung, die mitläuft.',
    price: 'ab CHF 1450.–',
    priceNote: 'pro Monat',
    includes: [
      'Alles aus ADRIACON KMU',
      'Monatsreporting jeweils bis zum 15.',
      'Rollende Liquiditätsplanung über 12 Monate',
      'Kostenstellen- und Projektauswertungen',
      '4 persönliche Gespräche',
      'Begleitung eines Bankgesprächs',
    ],
    extras: [
      'Belege über 150 pro Monat: je angefangene 100 Belege CHF 80.–',
      'Lohnempfänger über 40: je Person CHF 22.–',
      'Fremdwährungen: CHF 90.– pro Mandat',
    ],
    suitedFor:
      'Sie führen mit Zahlen, planen Investitionen voraus und sprechen regelmässig mit der Bank.',
    cta: { label: 'Erstgespräch vereinbaren', href: '/kontakt' },
    variant: 'standard',
  },
  {
    id: 'cfo',
    name: 'ADRIACON CFO',
    audience: 'Erweiterung für bestehende Adriacon-Mandate',
    benefit: 'Finanzführung auf Geschäftsleitungsebene, ohne eigene Stelle.',
    price: 'ab CHF 2800.–',
    priceNote: 'pro Monat',
    includes: [
      'Budget und Forecast',
      'Monatliches Führungsgespräch von 90 Minuten',
      'Kennzahlensystem',
      'Investitionsrechnungen',
      'Bankkommunikation',
      'Investorenkommunikation',
    ],
    extras: ['Wird auf einem bestehenden Grundpaket aufgebaut und individuell offeriert.'],
    suitedFor:
      'Kein Einstiegspaket. Wir bauen die CFO-Begleitung auf, wenn die Grundlagen stehen und die laufende Zusammenarbeit eingespielt ist.',
    cta: { label: 'CFO-Begleitung besprechen', href: '/kontakt' },
    variant: 'extension',
  },
  {
    id: 'gruendung',
    name: 'Firmengründung',
    audience: 'Gründerinnen und Gründer einer GmbH',
    benefit: 'Von den Statuten bis zum Handelsregistereintrag begleitet.',
    price: 'CHF 1200.–',
    priceNote: 'einmalig, mit laufendem Mandat CHF 600.–',
    includes: [
      'Statutenkoordination',
      'Unterstützung beim Kapitaleinzahlungskonto',
      'Handelsregisteranmeldung',
      'MWST-Anmeldung',
      'Anmeldung bei den Sozialversicherungen',
      'Einrichtung von Bexio',
      '60 Minuten Startberatung',
    ],
    extras: [
      'Nicht enthalten: Notariatskosten',
      'Nicht enthalten: Handelsregistergebühren',
      'CHF 600.– gilt, wenn gleichzeitig ein laufendes Treuhandmandat abgeschlossen wird',
    ],
    suitedFor:
      'Sie gründen und möchten die Formalitäten einmal richtig gemacht haben, statt sie später zu korrigieren.',
    cta: { label: 'Gründung besprechen', href: '/kontakt' },
    variant: 'oneoff',
  },
];

/* ============================================================================
 * STEUERERKLÄRUNGEN FÜR PRIVATPERSONEN
 * Bewusst getrennt von den Unternehmenspaketen.
 * ========================================================================== */

export type TaxOfferId = 'privat' | 'paar' | 'selbststaendig' | 'studierend';

export interface TaxOffer {
  id: TaxOfferId;
  audience: string;
  price: number;
  description: string;
  requirements: string[];
}

export const taxOffers: TaxOffer[] = [
  {
    id: 'privat',
    audience: 'Privatperson',
    price: 99,
    description:
      'Für eine reguläre private Steuererklärung mit den üblichen Einkommens- und Vermögensangaben.',
    requirements: ['Lohnausweis', 'Bank- und Zinsauszüge', 'Belege für Abzüge'],
  },
  {
    id: 'paar',
    audience: 'Paar oder Ehepaar',
    price: 139,
    description:
      'Eine gemeinsame Steuererklärung für Verheiratete und Paare in eingetragener Partnerschaft.',
    requirements: ['Lohnausweise beider Personen', 'Bank- und Zinsauszüge', 'Belege für Abzüge'],
  },
  {
    id: 'selbststaendig',
    audience: 'Selbstständige',
    price: 180,
    description:
      'Für Selbstständigerwerbende mit Einzelfirma – inklusive der Angaben aus der selbstständigen Tätigkeit.',
    requirements: ['Abschluss oder Aufstellung der Einnahmen und Ausgaben', 'Lohnausweise', 'Belege für Abzüge'],
  },
  {
    id: 'studierend',
    audience: 'Studierende',
    price: 49,
    description:
      'Für Studierende mit einfachen Verhältnissen, etwa Nebenjob, Stipendium oder Ausbildungskosten.',
    requirements: ['Immatrikulationsbestätigung', 'Lohnausweis, falls vorhanden', 'Belege für Ausbildungskosten'],
  },
];

export const taxPriceNote =
  'Die Preise gelten für reguläre Steuererklärungen. Bei aussergewöhnlich komplexen Verhältnissen oder umfangreichen Zusatzunterlagen informieren wir Sie vorab über allfällige Mehrkosten.';

/**
 * TODO (Adriacon): Abgrenzungen zu den Pauschalpreisen bestätigen.
 * Offen ist insbesondere, ab wann ein Fall als "aussergewöhnlich komplex" gilt
 * (z. B. Liegenschaften, Wertschriftendepots, mehrere Kantone, Krypto-Bestände)
 * und welcher Ansatz dann zur Anwendung kommt.
 */

export const priceDisclaimer =
  'Es handelt sich um Ab-Preise bei digitalem Belegfluss. Der definitive Preis richtet sich nach dem tatsächlichen Leistungsumfang und wird nach einer persönlichen Prüfung festgelegt.';

/** Hinweis zur eigenen MWST-Situation. Erscheint überall dort, wo Preise stehen. */
export const vatNote =
  'Adriacon ist nicht mehrwertsteuerpflichtig. Auf unsere Honorare fällt keine MWST an – Sie zahlen genau den genannten Betrag.';

export const cfoRedirectMessage =
  'Die CFO-Begleitung ist eine Erweiterung für bestehende Adriacon-Mandate. Für den Einstieg empfehlen wir zunächst eine persönliche Standortbestimmung.';
