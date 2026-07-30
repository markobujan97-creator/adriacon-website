import type { PackageId } from '@/config/pricing';

export type ProfileType = 'company' | 'founder' | 'private';
export type LegalForm = 'einzelfirma' | 'gmbh' | 'ag' | 'verein' | 'geplant' | 'keine';
export type BusinessPhase = 'gruendung' | 'aufbau' | 'wachstum' | 'etabliert';
export type VatMethod = 'none' | 'saldo' | 'effective' | 'unsure';
export type BookkeepingStatus = 'aktuell' | 'teilweise' | 'stark' | 'neuaufbau';
export type Collaboration = 'digital' | 'hybrid' | 'persoenlich';
export type AdvisoryNeed = 'keiner' | 'reporting' | 'forecast' | 'cfo';
export type AccountingSoftware = 'bexio' | 'abacus' | 'sage' | 'banana' | 'excel' | 'andere' | 'keine';

export type ServiceKey =
  | 'buchhaltung'
  | 'abschluss'
  | 'mwst'
  | 'lohn'
  | 'steuern-firma'
  | 'steuern-privat'
  | 'reporting'
  | 'liquiditaet'
  | 'gruendung';

/** Vollständiger Zustand des Kursfinders. */
export interface CourseAnswers {
  profile: ProfileType;
  legalForm: LegalForm;
  phase: BusinessPhase;
  employees: number;
  payrollRecipients: number;
  annualRevenue: number;
  documentsPerMonth: number;
  bankAccounts: number;
  digitalDocuments: boolean;
  vatLiable: boolean;
  vatMethod: VatMethod;
  foreignCurrency: boolean;
  costCenters: number;
  companies: number;
  services: ServiceKey[];
  software: AccountingSoftware;
  bookkeepingStatus: BookkeepingStatus;
  collaboration: Collaboration;
  advisoryNeed: AdvisoryNeed;
  wantsIncorporation: boolean;
  wantsOngoingMandate: boolean;
}

export interface PriceLineItem {
  key: string;
  label: string;
  detail?: string;
  amount: number;
  /** Grundpreis des Pakets, wird typografisch hervorgehoben. */
  isBase?: boolean;
}

export interface PriceResult {
  /** Empfohlenes Einstiegspaket, oder null bei reiner Privatperson. */
  packageId: PackageId | null;
  packageName: string | null;
  basePrice: number;
  lineItems: PriceLineItem[];
  monthlyEstimate: number;
  /** Vergleichswert: gleiche Konfiguration mit Papierbelegen. */
  monthlyWithPaper: number;
  /** Vergleichswert: gleiche Konfiguration mit digitalem Belegfluss. */
  monthlyDigital: number;
  digitalAdvantage: number;
  incorporationFee: number | null;
  needsPersonalQuote: boolean;
  quoteReasons: string[];
  hints: string[];
  cfoNote: string | null;
  /** Grobe Schätzung der monatlich eingesparten Administrationszeit in Stunden. */
  estimatedHoursSaved: number;
  nextSteps: string[];
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
  | 'personenabhaengigkeit'
  | 'adminbelastung'
  | 'wachstumsbereitschaft';

export interface RadarDimension {
  key: RadarKey;
  label: string;
  question: string;
  low: string;
  high: string;
  /** Gehört die Dimension in die Digitalisierungs- oder Administrationskennzahl? */
  groups: Array<'digital' | 'admin'>;
  service: string;
  recommendation: string;
}

export interface RadarResult {
  scores: Record<RadarKey, number>;
  average: number;
  strongest: RadarDimension;
  weakest: RadarDimension;
  recommendations: Array<{ dimension: RadarDimension; score: number }>;
  digitalScore: number;
  adminPressure: number;
}

/** Jahreskurs */
export interface YearCourseInput {
  legalForm: 'einzelfirma' | 'gmbh' | 'ag';
  canton: string;
  vatMethod: VatMethod;
  employees: number;
  fiscalYearStartMonth: number;
  hasPayroll: boolean;
}

export interface YearCourseEntry {
  id: string;
  monthIndex: number;
  title: string;
  description: string;
  category: 'mwst' | 'lohn' | 'abschluss' | 'steuern' | 'planung' | 'organisation';
}
