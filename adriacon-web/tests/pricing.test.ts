import { describe, expect, it } from 'vitest';
import { emptyAnswers, isComplete, recommend } from '@/lib/recommendPackage';
import { packageCards, pricingConfig, taxOffers } from '@/config/pricing';
import type { FinderAnswers } from '@/types';

const a = (o: Partial<FinderAnswers>): FinderAnswers => ({ ...emptyAnswers, ...o });

describe('Paketfinder – Vollständigkeit', () => {
  it('Ohne Antworten gibt es keine Empfehlung', () => {
    expect(recommend(emptyAnswers)).toBeNull();
    expect(isComplete(emptyAnswers)).toBe(false);
  });

  it('Der Steuerpfad braucht zwei Antworten', () => {
    expect(isComplete(a({ track: 'steuererklaerung' }))).toBe(false);
    expect(isComplete(a({ track: 'steuererklaerung', taxSituation: 'privat' }))).toBe(true);
  });

  it('Der Gründungspfad braucht nur eine Antwort', () => {
    expect(isComplete(a({ track: 'gruendung' }))).toBe(true);
  });

  it('Der Unternehmenspfad braucht alle vier Antworten', () => {
    expect(isComplete(a({ track: 'unternehmen', teamSize: 'klein' }))).toBe(false);
    expect(
      isComplete(a({ track: 'unternehmen', teamSize: 'klein', payroll: true, support: 'basis' })),
    ).toBe(true);
  });
});

describe('Unternehmenspakete', () => {
  it('0 bis 3 Personen mit Basisbedarf ergibt ADRIACON START', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'solo', payroll: true, support: 'basis' }));
    expect(r?.kind).toBe('business');
    expect(r && r.kind === 'business' && r.cardId).toBe('start');
    expect(r?.price).toBe('ab CHF 320.–');
  });

  it('4 bis 15 Personen ergibt ADRIACON KMU', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'klein', payroll: true, support: 'basis' }));
    expect(r && r.kind === 'business' && r.cardId).toBe('kmu');
    expect(r?.price).toBe('ab CHF 780.–');
  });

  it('16 bis 40 Personen ergibt ADRIACON KMU PLUS', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'mittel', payroll: true, support: 'basis' }));
    expect(r && r.kind === 'business' && r.cardId).toBe('kmuPlus');
    expect(r?.price).toBe('ab CHF 1450.–');
  });

  it('Mehr als 40 Personen führt zur persönlichen Offerte', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'gross', payroll: true, support: 'basis' }));
    expect(r?.name).toBe('Persönliche Offerte');
  });

  it('Reportingbedarf hebt kleine Betriebe auf ADRIACON KMU', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'solo', payroll: true, support: 'reporting' }));
    expect(r && r.kind === 'business' && r.cardId).toBe('kmu');
  });

  it('Enge Begleitung führt zu ADRIACON KMU PLUS', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'klein', payroll: true, support: 'begleitung' }));
    expect(r && r.kind === 'business' && r.cardId).toBe('kmuPlus');
  });

  it('ADRIACON CFO wird über keine Kombination direkt empfohlen', () => {
    for (const teamSize of ['solo', 'klein', 'mittel', 'gross'] as const) {
      for (const support of ['basis', 'reporting', 'begleitung'] as const) {
        for (const payroll of [true, false]) {
          const r = recommend(a({ track: 'unternehmen', teamSize, payroll, support }));
          expect(r && r.kind === 'business' && r.cardId).not.toBe('cfo');
        }
      }
    }
  });

  it('Bei enger Begleitung eines mittleren Betriebs erscheint der CFO-Hinweis', () => {
    const r = recommend(a({ track: 'unternehmen', teamSize: 'mittel', payroll: true, support: 'begleitung' }));
    expect(r && r.kind === 'business' && r.note).toContain('bestehende Adriacon-Mandate');
  });

  it('Gründung führt zum Gründungspaket', () => {
    const r = recommend(a({ track: 'gruendung' }));
    expect(r && r.kind === 'business' && r.cardId).toBe('gruendung');
    expect(r?.price).toBe('CHF 1200.–');
    expect(r?.explanation).toContain('600');
  });
});

describe('Steuererklärungen sind von den Unternehmenspaketen getrennt', () => {
  const cases = [
    ['privat', 'CHF 99.–'],
    ['paar', 'CHF 139.–'],
    ['selbststaendig', 'CHF 180.–'],
    ['studierend', 'CHF 49.–'],
  ] as const;

  for (const [situation, price] of cases) {
    it(`${situation} ergibt ${price}`, () => {
      const r = recommend(a({ track: 'steuererklaerung', taxSituation: situation }));
      expect(r?.kind).toBe('tax');
      expect(r?.price).toBe(price);
    });
  }

  it('Der Steuerpfad liefert nie ein Unternehmenspaket', () => {
    for (const [situation] of cases) {
      const r = recommend(a({ track: 'steuererklaerung', taxSituation: situation }));
      expect(r?.kind).not.toBe('business');
    }
  });

  it('Die vier Steuerangebote entsprechen der Vorgabe', () => {
    expect(taxOffers.map((o) => [o.id, o.price])).toEqual([
      ['privat', 99],
      ['paar', 139],
      ['selbststaendig', 180],
      ['studierend', 49],
    ]);
  });
});

describe('Preiskonfiguration', () => {
  it('Unternehmenspreise entsprechen der Preisliste 2026', () => {
    expect(pricingConfig.packages.start.monthlyBasePrice).toBe(320);
    expect(pricingConfig.packages.kmu.monthlyBasePrice).toBe(780);
    expect(pricingConfig.packages.kmuPlus.monthlyBasePrice).toBe(1450);
    expect(pricingConfig.packages.cfo.monthlyBasePrice).toBe(2800);
    expect(pricingConfig.packages.cfo.existingClientsOnly).toBe(true);
    expect(pricingConfig.incorporation.standardPrice).toBe(1200);
    expect(pricingConfig.incorporation.priceWithOngoingMandate).toBe(600);
    expect(pricingConfig.generalHourlyRate).toBe(119);
  });

  it('Es gibt genau fünf Unternehmenskarten', () => {
    expect(packageCards.map((c) => c.id)).toEqual(['start', 'kmu', 'kmuPlus', 'cfo', 'gruendung']);
  });

  it('Jede Karte hat Inhalte für die Detailansicht', () => {
    for (const card of packageCards) {
      expect(card.includes.length).toBeGreaterThan(0);
      expect(card.extras.length).toBeGreaterThan(0);
      expect(card.suitedFor.length).toBeGreaterThan(20);
    }
  });
});
