import type { YearCourseEntry, YearCourseInput } from '@/types';

/**
 * Wiederkehrende administrative Themen im Geschäftsjahr.
 *
 * Bewusst ohne konkrete Fristen und ohne kantonale Termine. Massgebend sind
 * immer die Vorgaben der zuständigen Behörden und Ihre individuelle Situation.
 */

const mod12 = (m: number) => ((m % 12) + 12) % 12;

export function buildYearCourse(input: YearCourseInput): YearCourseEntry[] {
  const entries: YearCourseEntry[] = [];
  const start = mod12(input.fiscalYearStartMonth);
  const end = mod12(start + 11);

  const push = (
    monthIndex: number,
    title: string,
    description: string,
    category: YearCourseEntry['category'],
  ) => {
    entries.push({
      id: `${category}-${monthIndex}-${entries.length}`,
      monthIndex: mod12(monthIndex),
      title,
      description,
      category,
    });
  };

  if (input.vatMethod === 'saldo') {
    push(mod12(start + 6), 'MWST-Abrechnung erstes Halbjahr', 'Umsätze zusammenstellen und die Abrechnung einreichen.', 'mwst');
    push(mod12(start), 'MWST-Abrechnung zweites Halbjahr', 'Abrechnung für die zweite Jahreshälfte vorbereiten.', 'mwst');
  } else if (input.vatMethod === 'effective') {
    for (let q = 0; q < 4; q += 1) {
      push(
        mod12(start + q * 3 + 3),
        `MWST-Abrechnung Quartal ${q + 1}`,
        'Vorsteuer prüfen, mit der Buchhaltung abstimmen, Abrechnung einreichen.',
        'mwst',
      );
    }
  }

  if (input.hasPayroll) {
    push(0, 'Lohnausweise und Jahresmeldungen', 'Lohnausweise erstellen, Meldungen an die Sozialversicherungen vorbereiten.', 'lohn');
    push(1, 'Abstimmung Sozialversicherungen', 'Beitragsabrechnungen mit der Lohnbuchhaltung abgleichen.', 'lohn');
    push(10, 'Lohnrunde und Pensen', 'Anpassungen fürs kommende Jahr besprechen und hinterlegen.', 'lohn');
  }

  push(end, 'Abschluss vorbereiten', 'Inventar, offene Posten und Abgrenzungen bereitstellen.', 'abschluss');
  push(mod12(end + 1), 'Jahresabschluss erstellen', 'Bilanz und Erfolgsrechnung erstellen, Abschlussbuchungen vornehmen.', 'abschluss');
  push(mod12(end + 2), 'Abschlussbesprechung', 'Ergebnis und Konsequenzen fürs laufende Jahr besprechen.', 'abschluss');

  if (input.legalForm === 'einzelfirma') {
    push(mod12(end + 3), 'Steuererklärung natürliche Person', 'Geschäftsabschluss und private Unterlagen zusammenführen.', 'steuern');
  } else {
    push(mod12(end + 3), 'Steuererklärung der Gesellschaft', 'Abschlussunterlagen und Beilagen zusammenstellen.', 'steuern');
  }

  push(mod12(end - 1), 'Budget fürs kommende Jahr', 'Umsatz, Kosten und Investitionen planen.', 'planung');
  push(mod12(start + 6), 'Halbjahres-Standortbestimmung', 'Ist-Zahlen gegen das Budget stellen.', 'planung');
  push(mod12(start + 9), 'Liquiditätsvorschau', 'Zahlungsströme der nächsten Monate prüfen.', 'planung');

  return entries.sort((a, b) => a.monthIndex - b.monthIndex);
}

export const yearCourseCategories: Record<
  YearCourseEntry['category'],
  { label: string; color: string }
> = {
  mwst: { label: 'MWST', color: '#3884C3' },
  lohn: { label: 'Lohn & Personal', color: '#12314A' },
  abschluss: { label: 'Abschluss', color: '#8CCAEE' },
  steuern: { label: 'Steuern', color: '#2A6799' },
  planung: { label: 'Planung', color: '#7C8D99' },
};

export const yearCourseDisclaimer =
  'Allgemeine Orientierung ohne Anspruch auf Vollständigkeit. Termine und Pflichten unterscheiden sich je nach Kanton, Rechtsform und Situation. Massgebend sind die Vorgaben der zuständigen Behörden. Der Jahreskurs ist keine Steuer- oder Rechtsberatung.';
