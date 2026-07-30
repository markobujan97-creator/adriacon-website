import { describe, expect, it } from 'vitest';
import {
  bankAccountSurcharge,
  calculatePrice,
  defaultAnswers,
  documentSurcharge,
  incorporationFee,
  selectPackageByEmployees,
} from '@/lib/calculatePrice';
import { pricingConfig } from '@/config/pricing';
import type { CourseAnswers } from '@/types';

/** Erzeugt eine vollständige Antwortmenge mit gezielten Abweichungen. */
const answers = (overrides: Partial<CourseAnswers> = {}): CourseAnswers => ({
  ...defaultAnswers,
  ...overrides,
});

describe('Grundpakete ohne Zuschläge', () => {
  it('1. ADRIACON START ergibt CHF 320.–', () => {
    const result = calculatePrice(answers({ employees: 2, payrollRecipients: 2 }));
    expect(result.packageId).toBe('start');
    expect(result.monthlyEstimate).toBe(320);
  });

  it('2. ADRIACON KMU ergibt CHF 780.–', () => {
    const result = calculatePrice(answers({ employees: 8, payrollRecipients: 8 }));
    expect(result.packageId).toBe('kmu');
    expect(result.monthlyEstimate).toBe(780);
  });

  it('3. ADRIACON KMU PLUS ergibt CHF 1450.–', () => {
    const result = calculatePrice(answers({ employees: 20, payrollRecipients: 20 }));
    expect(result.packageId).toBe('kmuPlus');
    expect(result.monthlyEstimate).toBe(1450);
  });
});

describe('Belegzuschlag', () => {
  it('4. 200 Belege ergeben CHF 80.– Zuschlag', () => {
    expect(documentSurcharge(200)).toBe(80);
    const result = calculatePrice(answers({ employees: 2, payrollRecipients: 2, documentsPerMonth: 200 }));
    expect(result.monthlyEstimate).toBe(400);
  });

  it('5. 251 Belege ergeben CHF 160.– Zuschlag', () => {
    expect(documentSurcharge(251)).toBe(160);
  });

  it('150 Belege lösen keinen Zuschlag aus', () => {
    expect(documentSurcharge(150)).toBe(0);
  });
});

describe('Bankkonten', () => {
  it('6. 3 Bankkonten ergeben CHF 40.– Zuschlag', () => {
    expect(bankAccountSurcharge(3)).toBe(40);
    const result = calculatePrice(answers({ employees: 2, payrollRecipients: 2, bankAccounts: 3 }));
    expect(result.monthlyEstimate).toBe(360);
  });

  it('2 Bankkonten sind enthalten', () => {
    expect(bankAccountSurcharge(2)).toBe(0);
  });
});

describe('Mehrwertsteuer', () => {
  it('7. Effektive MWST ergibt CHF 60.– Zuschlag', () => {
    const result = calculatePrice(
      answers({ employees: 2, payrollRecipients: 2, vatLiable: true, vatMethod: 'effective' }),
    );
    expect(result.monthlyEstimate).toBe(380);
    expect(result.lineItems.some((i) => i.key === 'vat')).toBe(true);
  });

  it('Saldosteuersatz löst keinen Zuschlag aus', () => {
    const result = calculatePrice(
      answers({ employees: 2, payrollRecipients: 2, vatLiable: true, vatMethod: 'saldo' }),
    );
    expect(result.monthlyEstimate).toBe(320);
  });

  it('Bei "unsicher" wird kein Zuschlag berechnet, sondern ein Hinweis gezeigt', () => {
    const result = calculatePrice(
      answers({ employees: 2, payrollRecipients: 2, vatLiable: true, vatMethod: 'unsure' }),
    );
    expect(result.monthlyEstimate).toBe(320);
    expect(result.hints.some((h) => h.includes('MWST-Methode'))).toBe(true);
  });
});

describe('Papierbelege', () => {
  it('8. Papierbelege bei START ergeben CHF 112.– Zuschlag', () => {
    const result = calculatePrice(
      answers({ employees: 2, payrollRecipients: 2, digitalDocuments: false }),
    );
    const paper = result.lineItems.find((i) => i.key === 'paper');
    expect(paper?.amount).toBe(112);
    expect(result.monthlyEstimate).toBe(432);
  });

  it('9. Papierbelege bei KMU ergeben CHF 273.– Zuschlag', () => {
    const result = calculatePrice(
      answers({ employees: 8, payrollRecipients: 8, digitalDocuments: false }),
    );
    const paper = result.lineItems.find((i) => i.key === 'paper');
    expect(paper?.amount).toBe(273);
    expect(result.monthlyEstimate).toBe(1053);
    expect(result.digitalAdvantage).toBe(273);
  });

  it('Der Papierzuschlag wird nur auf den Grundpreis angewendet', () => {
    const result = calculatePrice(
      answers({
        employees: 8,
        payrollRecipients: 8,
        digitalDocuments: false,
        documentsPerMonth: 200,
        foreignCurrency: true,
      }),
    );
    // 780 + 80 (Belege) + 90 (Fremdwährung) + 273 (35 % von 780)
    expect(result.monthlyEstimate).toBe(1223);
  });
});

describe('Fremdwährungen', () => {
  it('10. Fremdwährung ergibt CHF 90.– Zuschlag', () => {
    const result = calculatePrice(
      answers({ employees: 2, payrollRecipients: 2, foreignCurrency: true }),
    );
    expect(result.monthlyEstimate).toBe(410);
  });
});

describe('Persönliche Offerte', () => {
  it('11. Mehrere Gesellschaften lösen eine separate Offerte aus', () => {
    const result = calculatePrice(answers({ employees: 2, payrollRecipients: 2, companies: 2 }));
    expect(result.needsPersonalQuote).toBe(true);
    expect(result.quoteReasons.join(' ')).toContain('Gesellschaften');
    // Für die erste Gesellschaft wird weiterhin eine Orientierung angezeigt.
    expect(result.monthlyEstimate).toBe(320);
  });

  it('15. Mehr als 40 Mitarbeitende führen zu einer persönlichen Offerte', () => {
    const result = calculatePrice(answers({ employees: 41, payrollRecipients: 41 }));
    expect(result.needsPersonalQuote).toBe(true);
    expect(result.quoteReasons.join(' ')).toContain('40 Mitarbeitende');
  });

  it('16. Vier oder mehr Kostenstellen führen zu einem Prüfhinweis', () => {
    const result = calculatePrice(answers({ employees: 8, payrollRecipients: 8, costCenters: 4 }));
    expect(result.needsPersonalQuote).toBe(true);
    expect(result.quoteReasons.join(' ')).toContain('Kostenstellen');
    // 780 + 4 × 120
    expect(result.monthlyEstimate).toBe(1260);
  });

  it('Mehr als 500 Belege pro Monat führen zu einer persönlichen Offerte', () => {
    const result = calculatePrice(
      answers({ employees: 8, payrollRecipients: 8, documentsPerMonth: 600 }),
    );
    expect(result.needsPersonalQuote).toBe(true);
  });
});

describe('ADRIACON CFO', () => {
  it('12. CFO wird neuen Interessenten nicht direkt angeboten', () => {
    const result = calculatePrice(
      answers({ employees: 30, payrollRecipients: 30, advisoryNeed: 'cfo' }),
    );
    expect(result.packageId).not.toBe('cfo');
    expect(result.packageId).toBe('kmuPlus');
    expect(result.cfoNote).toContain('bestehende Adriacon-Mandate');
  });

  it('CFO wird nie über die Mitarbeiterzahl ausgewählt', () => {
    for (const employees of [0, 3, 4, 15, 16, 40, 80]) {
      expect(selectPackageByEmployees(employees)).not.toBe('cfo');
    }
  });
});

describe('Firmengründung', () => {
  it('13. Gründung mit laufendem Mandat ergibt CHF 600.–', () => {
    expect(incorporationFee(true)).toBe(600);
    const result = calculatePrice(
      answers({ wantsIncorporation: true, wantsOngoingMandate: true }),
    );
    expect(result.incorporationFee).toBe(600);
  });

  it('14. Normale Gründung ergibt CHF 1200.–', () => {
    expect(incorporationFee(false)).toBe(1200);
    const result = calculatePrice(
      answers({ wantsIncorporation: true, wantsOngoingMandate: false }),
    );
    expect(result.incorporationFee).toBe(1200);
    expect(result.hints.join(' ')).toContain('600');
  });

  it('Ohne Gründungswunsch wird keine Gebühr ausgewiesen', () => {
    expect(calculatePrice(answers()).incorporationFee).toBeNull();
  });
});

describe('Lohnempfänger', () => {
  it('Zuschlag pro Lohnempfänger über der Paketgrenze', () => {
    // 2 Mitarbeitende (START, 3 enthalten), 5 Lohnempfänger.
    // START + 2 × 22 = 364 ist günstiger als KMU zu 780 – es bleibt bei START.
    const result = calculatePrice(answers({ employees: 2, payrollRecipients: 5 }));
    expect(result.packageId).toBe('start');
    expect(result.monthlyEstimate).toBe(364);
  });

  it('Bleibt beim Einstiegspaket, solange die Zuschläge günstiger sind als das nächste Paket', () => {
    // START (320) + 11 zusätzliche Lohnempfänger × 22 = 562, günstiger als ADRIACON KMU (780).
    const result = calculatePrice(answers({ employees: 2, payrollRecipients: 14 }));
    expect(result.packageId).toBe('start');
    expect(result.monthlyEstimate).toBe(562);
  });

  it('Die Mitarbeiterzahl bestimmt das Grundpaket, nicht die Lohnempfänger', () => {
    const result = calculatePrice(answers({ employees: 18, payrollRecipients: 18 }));
    expect(result.packageId).toBe('kmuPlus');
    expect(result.monthlyEstimate).toBe(1450);
  });
});

describe('Privatpersonen', () => {
  it('Erhalten keine Paketempfehlung und keinen Listenpreis', () => {
    const result = calculatePrice(answers({ profile: 'private' }));
    expect(result.packageId).toBeNull();
    expect(result.monthlyEstimate).toBe(0);
    expect(result.needsPersonalQuote).toBe(true);
  });
});

describe('Konfiguration', () => {
  it('Die Preiskonfiguration entspricht der Preisliste 2026', () => {
    expect(pricingConfig.packages.start.monthlyBasePrice).toBe(320);
    expect(pricingConfig.packages.kmu.monthlyBasePrice).toBe(780);
    expect(pricingConfig.packages.kmuPlus.monthlyBasePrice).toBe(1450);
    expect(pricingConfig.packages.cfo.monthlyBasePrice).toBe(2800);
    expect(pricingConfig.packages.cfo.existingClientsOnly).toBe(true);
    expect(pricingConfig.generalHourlyRate).toBe(119);
    expect(pricingConfig.surcharges.paperDocumentPercentage).toBe(0.35);
  });
});
