import type { CardId, TaxOfferId } from '@/config/pricing';

/**
 * Paketfinder.
 * Die erste Frage trennt Unternehmenskunden klar von privaten Steuerkunden –
 * die beiden Bereiche werden nie vermischt.
 */
export type Track = 'unternehmen' | 'gruendung' | 'steuererklaerung';
export type TeamSize = 'solo' | 'klein' | 'mittel' | 'gross';
export type SupportLevel = 'basis' | 'reporting' | 'begleitung';

export interface FinderAnswers {
  track: Track | null;
  teamSize: TeamSize | null;
  payroll: boolean | null;
  support: SupportLevel | null;
  /** Nur im Steuerpfad relevant. */
  taxSituation: TaxOfferId | null;
}

export interface BusinessResult {
  kind: 'business';
  cardId: CardId | null;
  name: string;
  price: string;
  priceNote: string;
  explanation: string;
  note?: string;
}

export interface TaxResult {
  kind: 'tax';
  offerId: TaxOfferId;
  name: string;
  price: string;
  priceNote: string;
  explanation: string;
}

export type FinderResult = BusinessResult | TaxResult;

/** Jahreskurs */
export type VatMethod = 'none' | 'saldo' | 'effective';

export interface YearCourseInput {
  legalForm: 'einzelfirma' | 'gmbh' | 'ag';
  vatMethod: VatMethod;
  hasPayroll: boolean;
  fiscalYearStartMonth: number;
}

export interface YearCourseEntry {
  id: string;
  monthIndex: number;
  title: string;
  description: string;
  category: 'mwst' | 'lohn' | 'abschluss' | 'steuern' | 'planung';
}
