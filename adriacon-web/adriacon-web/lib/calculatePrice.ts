import {
  cfoRedirectMessage,
  packageOrder,
  pricingConfig,
  type PackageId,
} from '@/config/pricing';
import type { CourseAnswers, PriceLineItem, PriceResult } from '@/types';

const { surcharges, packages, personalQuoteThresholds } = pricingConfig;

/** Standardwerte, damit der Rechner immer einen konsistenten Zustand hat. */
export const defaultAnswers: CourseAnswers = {
  profile: 'company',
  legalForm: 'gmbh',
  phase: 'aufbau',
  employees: 3,
  payrollRecipients: 3,
  annualRevenue: 500_000,
  documentsPerMonth: 120,
  bankAccounts: 2,
  digitalDocuments: true,
  vatLiable: true,
  vatMethod: 'saldo',
  foreignCurrency: false,
  costCenters: 0,
  companies: 1,
  services: ['buchhaltung', 'abschluss', 'mwst'],
  software: 'bexio',
  bookkeepingStatus: 'aktuell',
  collaboration: 'digital',
  advisoryNeed: 'keiner',
  wantsIncorporation: false,
  wantsOngoingMandate: false,
};

/** Grundpaket ausschliesslich anhand der Anzahl Mitarbeitenden. ADRIACON CFO ist bewusst ausgenommen. */
export function selectPackageByEmployees(employees: number): PackageId {
  if (employees <= packages.start.maxEmployees) return 'start';
  if (employees <= packages.kmu.maxEmployees) return 'kmu';
  return 'kmuPlus';
}

export function documentSurcharge(documentsPerMonth: number): number {
  const additionalBlocks = Math.ceil(
    Math.max(0, documentsPerMonth - surcharges.includedDocuments) /
      surcharges.additionalDocumentBlockSize,
  );
  return additionalBlocks * surcharges.pricePerDocumentBlock;
}

export function bankAccountSurcharge(bankAccounts: number): number {
  return Math.max(0, bankAccounts - surcharges.includedBankAccounts) * surcharges.additionalBankAccountPrice;
}

export function incorporationFee(wantsOngoingMandate: boolean): number {
  return wantsOngoingMandate
    ? pricingConfig.incorporation.priceWithOngoingMandate
    : pricingConfig.incorporation.standardPrice;
}

/**
 * Prüft, ob ein höheres Standardpaket günstiger ist als Lohnzuschläge auf dem
 * mitarbeiterbasierten Paket. Gibt das Paket zurück, das effektiv verrechnet wird.
 */
function resolvePackageWithPayroll(
  employeeBased: PackageId,
  payrollRecipients: number,
): { packageId: PackageId; upgraded: boolean } {
  const base = packages[employeeBased];
  if (payrollRecipients <= base.includedPayrollRecipients) {
    return { packageId: employeeBased, upgraded: false };
  }

  const surchargeCost =
    base.monthlyBasePrice +
    (payrollRecipients - base.includedPayrollRecipients) * surcharges.additionalPayrollRecipientPrice;

  const candidates = packageOrder
    .filter((id) => id !== 'cfo' && !packages[id].existingClientsOnly)
    .filter(
      (id) =>
        packages[id].monthlyBasePrice > base.monthlyBasePrice &&
        packages[id].includedPayrollRecipients >= payrollRecipients,
    );

  const cheaperUpgrade = candidates.find((id) => packages[id].monthlyBasePrice <= surchargeCost);
  return cheaperUpgrade
    ? { packageId: cheaperUpgrade, upgraded: true }
    : { packageId: employeeBased, upgraded: false };
}

/**
 * Hauptberechnung. Reihenfolge gemäss Preislogik:
 * Grundpaket → Belege → Bankkonten → Lohn → Kostenstellen → effektive MWST →
 * Papierbelege (35 % auf den Grundpreis) → Fremdwährung → Prüfungen.
 */
export function calculatePrice(answers: CourseAnswers): PriceResult {
  const hints: string[] = [];
  const quoteReasons: string[] = [];
  const nextSteps: string[] = [];

  const fee = answers.wantsIncorporation ? incorporationFee(answers.wantsOngoingMandate) : null;

  // Privatpersonen erhalten keine Paketempfehlung – dafür bestehen keine Listenpreise.
  if (answers.profile === 'private') {
    return {
      packageId: null,
      packageName: null,
      basePrice: 0,
      lineItems: [],
      monthlyEstimate: 0,
      monthlyWithPaper: 0,
      monthlyDigital: 0,
      digitalAdvantage: 0,
      incorporationFee: null,
      needsPersonalQuote: true,
      quoteReasons: ['Steuererklärungen für Privatpersonen werden individuell offeriert.'],
      hints: [
        'Für Privatpersonen erstellen wir die Steuererklärung nach Aufwand oder zum Pauschalpreis – abhängig von Ihrer Situation.',
        'Belege können Sie über MySteuerhelfer digital einreichen.',
      ],
      cfoNote: null,
      estimatedHoursSaved: 4,
      nextSteps: [
        'Unterlagen der letzten Steuerperiode bereitlegen',
        'Kurzes Telefonat zur Einschätzung des Aufwands',
        'Offerte und digitale Einreichung über MySteuerhelfer',
      ],
    };
  }

  const employeeBased = selectPackageByEmployees(answers.employees);
  const { packageId, upgraded } = resolvePackageWithPayroll(employeeBased, answers.payrollRecipients);
  const pkg = packages[packageId];
  const basePrice = pkg.monthlyBasePrice;

  if (upgraded) {
    hints.push(
      `Aufgrund der Anzahl Lohnempfänger ist ${pkg.name} günstiger als Zuschläge auf ${packages[employeeBased].name}.`,
    );
  }

  const lineItems: PriceLineItem[] = [
    {
      key: 'base',
      label: pkg.name,
      detail: `Grundpreis bei digitalem Belegfluss`,
      amount: basePrice,
      isBase: true,
    },
  ];

  // 2. Belege
  const docSurcharge = documentSurcharge(answers.documentsPerMonth);
  if (docSurcharge > 0) {
    lineItems.push({
      key: 'documents',
      label: `${answers.documentsPerMonth} Belege pro Monat`,
      detail: `Über ${surcharges.includedDocuments} Belege, je angefangene ${surcharges.additionalDocumentBlockSize} Belege CHF ${surcharges.pricePerDocumentBlock}.–`,
      amount: docSurcharge,
    });
  }

  // 3. Bankkonten
  const bankSurcharge = bankAccountSurcharge(answers.bankAccounts);
  if (bankSurcharge > 0) {
    const extra = answers.bankAccounts - surcharges.includedBankAccounts;
    lineItems.push({
      key: 'bank',
      label: `${extra} zusätzliche${extra === 1 ? 's' : ''} Bankkonto${extra === 1 ? '' : 'en'}`,
      detail: `${surcharges.includedBankAccounts} Konten sind enthalten`,
      amount: bankSurcharge,
    });
  }

  // 4. Lohn
  const extraPayroll = Math.max(0, answers.payrollRecipients - pkg.includedPayrollRecipients);
  const payrollSurcharge = extraPayroll * surcharges.additionalPayrollRecipientPrice;
  if (payrollSurcharge > 0) {
    lineItems.push({
      key: 'payroll',
      label: `${extraPayroll} zusätzliche Lohnempfänger`,
      detail: `${pkg.includedPayrollRecipients} Lohnempfänger sind enthalten`,
      amount: payrollSurcharge,
    });
  }

  // 5. Kostenstellen, Filialen, organisatorische Einheiten
  const costCenterSurcharge = Math.max(0, answers.costCenters) * surcharges.costCenterPrice;
  if (costCenterSurcharge > 0) {
    lineItems.push({
      key: 'costCenters',
      label: `${answers.costCenters} Kostenstellen oder Filialen`,
      detail: `je CHF ${surcharges.costCenterPrice}.– pro Monat`,
      amount: costCenterSurcharge,
    });
  }

  // 6. Effektive MWST
  let effectiveVatSurcharge = 0;
  if (answers.vatLiable && answers.vatMethod === 'effective') {
    effectiveVatSurcharge = surcharges.effectiveVatPrice;
    lineItems.push({
      key: 'vat',
      label: 'Effektive MWST-Abrechnung',
      detail: 'Beim Saldosteuersatz entfällt dieser Zuschlag',
      amount: effectiveVatSurcharge,
    });
  }
  if (answers.vatLiable && answers.vatMethod === 'unsure') {
    hints.push(
      'Die MWST-Methode ist noch offen. Wir klären das im Erstgespräch – ein allfälliger Zuschlag ist hier noch nicht enthalten.',
    );
  }

  // 7. Papierbelege: 35 % ausschliesslich auf den Grundpreis
  const paperSurcharge = answers.digitalDocuments
    ? 0
    : Math.round(basePrice * surcharges.paperDocumentPercentage);
  if (paperSurcharge > 0) {
    lineItems.push({
      key: 'paper',
      label: 'Papierbelege statt digitalem Belegfluss',
      detail: `${Math.round(surcharges.paperDocumentPercentage * 100)} % auf den Grundpreis`,
      amount: paperSurcharge,
    });
    hints.push(
      'Mit einem digitalen Belegfluss entfällt dieser Zuschlag. Gerne unterstützen wir Sie bei der Umstellung.',
    );
  }

  // 8. Fremdwährungen
  const foreignCurrencySurcharge = answers.foreignCurrency ? surcharges.foreignCurrencyPrice : 0;
  if (foreignCurrencySurcharge > 0) {
    lineItems.push({
      key: 'fx',
      label: 'Fremdwährungsbuchungen',
      detail: 'Einmal pro Mandat, unabhängig von der Anzahl Währungen',
      amount: foreignCurrencySurcharge,
    });
  }

  const monthlyEstimate = Math.round(
    lineItems.reduce((sum, item) => sum + item.amount, 0),
  );

  const surchargesWithoutPaper = monthlyEstimate - paperSurcharge;
  const monthlyDigital = surchargesWithoutPaper;
  const monthlyWithPaper =
    surchargesWithoutPaper + Math.round(basePrice * surcharges.paperDocumentPercentage);
  const digitalAdvantage = monthlyWithPaper - monthlyDigital;

  // 9. Mehrere Gesellschaften
  if (answers.companies > 1) {
    quoteReasons.push(
      `${answers.companies} Gesellschaften – die Orientierung gilt für die erste Gesellschaft, jede weitere wird separat offeriert.`,
    );
  }

  // 10. Persönliche Offerte prüfen
  if (answers.employees > personalQuoteThresholds.employees) {
    quoteReasons.push(`Mehr als ${personalQuoteThresholds.employees} Mitarbeitende`);
  }
  if (answers.documentsPerMonth > personalQuoteThresholds.documentsPerMonth) {
    quoteReasons.push(`Mehr als ${personalQuoteThresholds.documentsPerMonth} Belege pro Monat`);
  }
  if (answers.costCenters >= personalQuoteThresholds.costCenters) {
    quoteReasons.push(
      `${answers.costCenters} Kostenstellen oder Filialen – wir prüfen die Struktur persönlich`,
    );
  }
  if (answers.bookkeepingStatus === 'stark') {
    quoteReasons.push('Stark rückständige Buchhaltung – der Aufholaufwand wird separat geschätzt');
  }
  if (answers.bookkeepingStatus === 'neuaufbau') {
    hints.push('Für den Neuaufbau der Buchhaltung offerieren wir den Einrichtungsaufwand separat.');
  }
  if (answers.advisoryNeed === 'cfo') {
    quoteReasons.push('Ausgeprägter CFO- und Beratungsbedarf');
  }

  const needsPersonalQuote = quoteReasons.length > 0;

  // CFO wird neuen Interessenten nie direkt angeboten.
  const cfoNote = answers.advisoryNeed === 'cfo' ? cfoRedirectMessage : null;

  if (answers.advisoryNeed === 'reporting' || answers.advisoryNeed === 'forecast') {
    hints.push(
      'Reporting und Forecast lassen sich als Zusatzleistung auf Ihr Paket aufbauen – wir definieren den Umfang gemeinsam.',
    );
  }

  if (answers.wantsIncorporation && !answers.wantsOngoingMandate) {
    hints.push(
      `Mit einem gleichzeitig abgeschlossenen laufenden Mandat kostet die Gründung CHF ${pricingConfig.incorporation.priceWithOngoingMandate}.– statt CHF ${pricingConfig.incorporation.standardPrice}.–.`,
    );
  }

  // Grobe, unverbindliche Schätzung der eingesparten Administrationszeit.
  const estimatedHoursSaved = Math.max(
    2,
    Math.round(
      answers.documentsPerMonth / 30 +
        answers.payrollRecipients * 0.35 +
        (answers.vatLiable ? 2 : 0) +
        (answers.digitalDocuments ? 2 : 4),
    ),
  );

  nextSteps.push('Erstgespräch von 30 Minuten – wir schauen Ihre Ausgangslage gemeinsam an');
  nextSteps.push(
    needsPersonalQuote
      ? 'Persönliche Offerte auf Basis Ihrer konkreten Unterlagen'
      : 'Verbindliche Offerte mit definiertem Leistungsumfang',
  );
  nextSteps.push(
    answers.digitalDocuments
      ? 'Zugänge und Belegfluss einrichten – Start meist innert zwei Wochen'
      : 'Belegfluss digitalisieren – wir richten den Scan- und Ablageweg ein',
  );

  return {
    packageId,
    packageName: pkg.name,
    basePrice,
    lineItems,
    monthlyEstimate,
    monthlyWithPaper,
    monthlyDigital,
    digitalAdvantage,
    incorporationFee: fee,
    needsPersonalQuote,
    quoteReasons,
    hints,
    cfoNote,
    estimatedHoursSaved,
    nextSteps,
  };
}
