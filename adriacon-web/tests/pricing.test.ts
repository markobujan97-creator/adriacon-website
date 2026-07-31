import { describe, expect, it } from 'vitest';
import { emptyAnswers, isComplete, recommend } from '@/lib/recommendPackage';
import { packageCards, pricingConfig } from '@/config/pricing';
import type { FinderAnswers } from '@/types';

const a = (o: Partial<FinderAnswers>): FinderAnswers => ({ ...emptyAnswers, ...o });

describe('Paketfinder – Vollständigkeit', () => {
  it('Ohne Antworten gibt es keine Empfehlung', () => {
    expect(recommend(emptyAnswers)).toBeNull();
    expect(isComplete(emptyAnswers)).toBe(false);
  });

  it('Privatpersonen brauchen nur eine Antwort', () => {
    expect(isComplete(a({ profile: 'privat' }))).toBe(true);
  });

  it('Unternehmen brauchen alle vier Antworten', () => {
    expect(isComplete(a({ profile: 'unternehmen', teamSize: 'klein' }))).toBe(false);
    expect(
      isComplete(a({ profile: 'unternehmen', teamSize: 'klein', payroll: true, support: 'basis' })),
    ).toBe(true);
  });
});

describe('Paketfinder – Empfehlungen', () => {
  it('0 bis 3 Personen mit Basisbedarf ergibt ADRIACON START', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'solo', payroll: true, support: 'basis' }));
    expect(r?.cardId).toBe('start');
    expect(r?.price).toBe('ab CHF 320.–');
  });

  it('4 bis 15 Personen ergibt ADRIACON KMU', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'klein', payroll: true, support: 'basis' }));
    expect(r?.cardId).toBe('kmu');
    expect(r?.price).toBe('ab CHF 780.–');
  });

  it('16 bis 40 Personen ergibt ADRIACON KMU PLUS', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'mittel', payroll: true, support: 'basis' }));
    expect(r?.cardId).toBe('kmuPlus');
    expect(r?.price).toBe('ab CHF 1450.–');
  });

  it('Mehr als 40 Personen führt zur persönlichen Offerte', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'gross', payroll: true, support: 'basis' }));
    expect(r?.name).toBe('Persönliche Offerte');
  });

  it('Reportingbedarf hebt kleine Betriebe auf ADRIACON KMU', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'solo', payroll: true, support: 'reporting' }));
    expect(r?.cardId).toBe('kmu');
  });

  it('Enge Begleitung führt zu ADRIACON KMU PLUS', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'klein', payroll: true, support: 'begleitung' }));
    expect(r?.cardId).toBe('kmuPlus');
  });

  it('ADRIACON CFO wird nie direkt empfohlen', () => {
    const combos: FinderAnswers[] = [];
    for (const teamSize of ['solo', 'klein', 'mittel', 'gross'] as const) {
      for (const support of ['basis', 'reporting', 'begleitung'] as const) {
        for (const payroll of [true, false]) {
          combos.push(a({ profile: 'unternehmen', teamSize, payroll, support }));
        }
      }
    }
    for (const combo of combos) {
      expect(recommend(combo)?.cardId).not.toBe('cfo');
    }
  });

  it('Bei enger Begleitung eines mittleren Betriebs erscheint der CFO-Hinweis', () => {
    const r = recommend(a({ profile: 'unternehmen', teamSize: 'mittel', payroll: true, support: 'begleitung' }));
    expect(r?.note).toContain('bestehende Adriacon-Mandate');
  });

  it('Gründung führt zum Gründungspaket', () => {
    const r = recommend(a({ profile: 'gruender', teamSize: 'solo', payroll: false, support: 'basis' }));
    expect(r?.cardId).toBe('gruendung');
    expect(r?.price).toBe('CHF 1200.–');
    expect(r?.explanation).toContain('600');
  });

  it('Privatpersonen erhalten keinen Listenpreis', () => {
    const r = recommend(a({ profile: 'privat' }));
    expect(r?.cardId).toBeNull();
    expect(r?.price).toBe('nach Aufwand');
  });
});

describe('Preiskonfiguration', () => {
  it('entspricht der Preisliste 2026', () => {
    expect(pricingConfig.packages.start.monthlyBasePrice).toBe(320);
    expect(pricingConfig.packages.kmu.monthlyBasePrice).toBe(780);
    expect(pricingConfig.packages.kmuPlus.monthlyBasePrice).toBe(1450);
    expect(pricingConfig.packages.cfo.monthlyBasePrice).toBe(2800);
    expect(pricingConfig.packages.cfo.existingClientsOnly).toBe(true);
    expect(pricingConfig.incorporation.standardPrice).toBe(1200);
    expect(pricingConfig.incorporation.priceWithOngoingMandate).toBe(600);
    expect(pricingConfig.generalHourlyRate).toBe(119);
  });

  it('Es gibt genau fünf Paketkarten', () => {
    expect(packageCards).toHaveLength(5);
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
