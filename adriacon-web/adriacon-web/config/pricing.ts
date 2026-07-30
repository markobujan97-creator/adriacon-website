/**
 * Zentrale Preis- und Paketkonfiguration der Adriacon Treuhand GmbH.
 *
 * Einzige Quelle der Wahrheit für alle Preise auf der Website.
 * Alle Beträge in CHF, exklusive MWST. Stand: Preisliste 2026.
 *
 * Änderungen an Preisen ausschliesslich hier vornehmen –
 * Rechner, Preisbereich und Tests lesen alle aus dieser Datei.
 */

export const pricingConfig = {
  currency: 'CHF',
  pricesExcludeVat: true,

  /** Allgemeiner Stundensatz für Arbeiten ausserhalb des Leistungsumfangs. */
  generalHourlyRate: 119,

  /**
   * Interner Sondertarif aus der Preisliste für nicht digitalen Belegfluss.
   * Wird auf der öffentlichen Website bewusst NICHT prominent gezeigt.
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

  /** Schwellen, ab denen eine persönliche Offerte empfohlen wird. */
  personalQuoteThresholds: {
    employees: 40,
    documentsPerMonth: 500,
    costCenters: 4,
  },
} as const;

export type PackageId = keyof typeof pricingConfig.packages;

/** Reihenfolge für die Darstellung im Preisbereich. */
export const packageOrder: PackageId[] = ['start', 'kmu', 'kmuPlus', 'cfo'];

/**
 * Leistungsumfang der Pakete – Wortlaut gemäss Preisliste 2026.
 * Nur tatsächlich zugesagte Leistungen aufführen.
 */
export const packageDetails: Record<
  PackageId,
  {
    audience: string[];
    situation: string;
    includes: string[];
    cta: { label: string; target: string };
    note?: string;
  }
> = {
  start: {
    audience: ['Einzelfirmen', 'kleine GmbH', '0 bis 3 Mitarbeitende'],
    situation:
      'Sie führen Ihr Unternehmen alleine oder zu zweit und möchten Buchhaltung, MWST und Abschluss vollständig abgeben.',
    includes: [
      'Laufende digitale Buchhaltung',
      'Mehrwertsteuer',
      'Lohnadministration bis 3 Lohnempfänger',
      'Jahresabschluss',
      'Steuererklärung der Gesellschaft',
      '1 Jahresgespräch',
    ],
    cta: { label: 'Erstgespräch vereinbaren', target: '#kontakt' },
  },
  kmu: {
    audience: ['Unternehmen mit 4 bis 15 Mitarbeitenden'],
    situation:
      'Sie haben ein Team, wiederkehrende Lohnläufe und wollen unterjährig wissen, wo Sie stehen.',
    includes: [
      'Alles aus ADRIACON START',
      'Lohnadministration bis 15 Lohnempfänger',
      'Quellensteuer',
      'Lohnjahresabschluss',
      'Quartalsreporting',
      'Debitorenübersicht mit Mahnvorschlag',
      '2 persönliche Gespräche',
      // TODO (Adriacon): In der Preisliste steht "Mystery-Helper für die gesamte
      // Belegschaft". Gemeint ist vermutlich die App "MySteuerhelfer". Wortlaut bestätigen.
      'MySteuerhelfer für die gesamte Belegschaft',
    ],
    cta: { label: 'Erstgespräch vereinbaren', target: '#kontakt' },
  },
  kmuPlus: {
    audience: ['Unternehmen mit 16 bis 40 Mitarbeitenden'],
    situation:
      'Sie führen mit Zahlen, brauchen monatliche Aussagen und planen Liquidität und Investitionen voraus.',
    includes: [
      'Alles aus ADRIACON KMU',
      'Monatsreporting jeweils bis zum 15.',
      'Rollende Liquiditätsplanung über 12 Monate',
      'Kostenstellen- und Projektauswertungen',
      '4 persönliche Gespräche',
      'Begleitung eines Bankgesprächs',
    ],
    cta: { label: 'Erstgespräch vereinbaren', target: '#kontakt' },
  },
  cfo: {
    audience: ['Nur für bestehende Adriacon-Mandate'],
    situation:
      'Ihr Unternehmen braucht eine Finanzführung auf Geschäftsleitungsebene, ohne eine eigene Stelle zu schaffen.',
    includes: [
      'Budget und Forecast',
      'Monatliches Führungsgespräch von 90 Minuten',
      'Kennzahlensystem',
      'Investitionsrechnungen',
      'Bankkommunikation',
      'Investorenkommunikation',
    ],
    cta: { label: 'CFO-Begleitung besprechen', target: '#kontakt' },
    note: 'Erweiterung für bestehende Mandate – kein Einstiegspaket.',
  },
};

export const incorporationDetails = {
  standard: {
    title: 'Firmengründung GmbH',
    price: pricingConfig.incorporation.standardPrice,
    includes: [
      'Statutenkoordination',
      'Unterstützung beim Kapitaleinzahlungskonto',
      'Handelsregisteranmeldung',
      'MWST-Anmeldung',
      'Anmeldung bei den Sozialversicherungen',
      'Einrichtung von Bexio',
      '60 Minuten Startberatung',
    ],
    excludes: ['Notariatskosten', 'Handelsregistergebühren'],
  },
  withMandate: {
    title: 'Firmengründung mit laufendem Mandat',
    price: pricingConfig.incorporation.priceWithOngoingMandate,
    condition:
      'Dieser Preis gilt, wenn gleichzeitig ein laufendes Treuhandmandat beziehungsweise eine entsprechende Vollmacht bei Adriacon abgeschlossen wird.',
  },
} as const;

export const priceDisclaimer =
  'Diese Berechnung ist eine unverbindliche Preisorientierung auf Grundlage Ihrer Angaben. Der definitive Preis wird nach einer persönlichen Prüfung des Leistungsumfangs festgelegt. Alle Preise exklusive MWST.';

export const cfoRedirectMessage =
  'Die CFO-Begleitung ist eine Erweiterung für bestehende Adriacon-Mandate. Für den Einstieg empfehlen wir zunächst eine persönliche Standortbestimmung.';
