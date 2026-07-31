import type { CardId } from '@/config/pricing';

/** Paketfinder – bewusst auf vier Fragen reduziert. */
export type ProfileType = 'gruender' | 'unternehmen' | 'privat';
export type TeamSize = 'solo' | 'klein' | 'mittel' | 'gross';
export type SupportLevel = 'basis' | 'reporting' | 'begleitung';

export interface FinderAnswers {
  profile: ProfileType | null;
  teamSize: TeamSize | null;
  payroll: boolean | null;
  support: SupportLevel | null;
}

export interface FinderResult {
  cardId: CardId | null;
  name: string;
  price: string;
  priceNote: string;
  explanation: string;
  note?: string;
}

/** Business Radar */
export type RadarKey =
  | 'zahlenueberblick'
  | 'liquiditaet'
  | 'buchhaltungsstand'
  | 'lohnprozesse'
  | 'steuerplanung'
  | 'reporting'
  | 'digitalisierung'
  | 'adminbelastung';

export interface RadarDimension {
  key: RadarKey;
  label: string;
  question: string;
  low: string;
  high: string;
  service: string;
  recommendation: string;
}

export interface RadarResult {
  strongest: RadarDimension;
  weakest: RadarDimension;
  recommendations: Array<{ dimension: RadarDimension; score: number }>;
  average: number;
}

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
