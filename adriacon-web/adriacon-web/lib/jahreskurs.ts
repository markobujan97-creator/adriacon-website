import type { YearCourseEntry, YearCourseInput } from '@/types';

/**
 * Erzeugt eine allgemeine Orientierung über wiederkehrende administrative Themen
 * im Geschäftsjahr.
 *
 * WICHTIG: Bewusst ohne konkrete Fristen und ohne kantonale Termine.
 * Massgebend sind immer die Vorgaben der zuständigen Behörden sowie Ihre
 * individuelle Situation. Der Jahreskurs ersetzt keine Beratung.
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

  // Mehrwertsteuer
  if (input.vatMethod === 'saldo') {
    push(mod12(start + 6), 'MWST-Abrechnung 1. Halbjahr', 'Saldosteuersatz: Umsätze zusammenstellen, Abrechnung prüfen und einreichen.', 'mwst');
    push(mod12(start + 0), 'MWST-Abrechnung 2. Halbjahr', 'Saldosteuersatz: Abrechnung für die zweite Jahreshälfte vorbereiten.', 'mwst');
  } else if (input.vatMethod === 'effective') {
    for (let q = 0; q < 4; q += 1) {
      push(
        mod12(start + q * 3 + 3),
        `MWST-Abrechnung Q${q + 1}`,
        'Effektive Methode: Vorsteuer prüfen, Abstimmung mit der Buchhaltung, Abrechnung einreichen.',
        'mwst',
      );
    }
  } else if (input.vatMethod === 'unsure') {
    push(mod12(start + 1), 'MWST-Status klären', 'Prüfen, ob eine Steuerpflicht besteht und welche Abrechnungsmethode passt.', 'mwst');
  }

  // Lohn und Personal
  if (input.hasPayroll) {
    push(0, 'Lohnausweise und Jahresmeldungen', 'Lohnausweise erstellen, Jahresmeldungen an Sozialversicherungen vorbereiten.', 'lohn');
    push(1, 'Abstimmung Sozialversicherungen', 'Beitragsabrechnungen mit der Lohnbuchhaltung abgleichen und Differenzen klären.', 'lohn');
    push(10, 'Lohnrunde und Pensenplanung', 'Anpassungen für das kommende Jahr besprechen und im Lohnsystem hinterlegen.', 'lohn');
    if (input.employees >= 5) {
      push(mod12(start + 4), 'Personaladministration prüfen', 'Verträge, Pensen, Ferienguthaben und Personaldossiers auf Aktualität prüfen.', 'organisation');
    }
  }

  // Abschluss
  push(end, 'Abschluss vorbereiten', 'Inventar, offene Posten, Abgrenzungen und Kontenabstimmung bereitstellen.', 'abschluss');
  push(mod12(end + 1), 'Jahresabschluss erstellen', 'Bilanz und Erfolgsrechnung erstellen, Abschlussbuchungen vornehmen.', 'abschluss');
  push(mod12(end + 2), 'Abschlussbesprechung', 'Ergebnis, Kennzahlen und Konsequenzen für das laufende Jahr besprechen.', 'abschluss');

  // Steuern
  if (input.legalForm === 'einzelfirma') {
    push(mod12(end + 3), 'Steuererklärung natürliche Person', 'Geschäftsabschluss und private Unterlagen für die Steuererklärung zusammenführen.', 'steuern');
  } else {
    push(mod12(end + 3), 'Steuererklärung der Gesellschaft', 'Abschlussunterlagen und Beilagen für die Steuererklärung zusammenstellen.', 'steuern');
    push(mod12(end + 3), 'Private Steuererklärung der Beteiligten', 'Lohnausweis, Beteiligung und allfällige Dividenden berücksichtigen.', 'steuern');
  }

  // Planung
  push(mod12(end - 1), 'Budget für das kommende Jahr', 'Umsatz, Kosten und Investitionen planen und mit dem laufenden Jahr vergleichen.', 'planung');
  push(mod12(start + 6), 'Halbjahres-Standortbestimmung', 'Ist-Zahlen gegen das Budget stellen und den Forecast anpassen.', 'planung');
  push(mod12(start + 9), 'Liquiditätsvorschau', 'Zahlungsströme der nächsten Monate prüfen, Steuern und Investitionen einplanen.', 'planung');
  push(mod12(start + 8), 'Versicherungen überprüfen', 'Deckungen mit der aktuellen Unternehmensgrösse abgleichen.', 'organisation');

  if (input.employees >= 10) {
    push(mod12(end + 2), 'Bankgespräch vorbereiten', 'Abschluss, Kennzahlen und Planung als Gesprächsgrundlage aufbereiten.', 'planung');
  }

  return entries.sort((a, b) => a.monthIndex - b.monthIndex);
}

export const yearCourseCategories: Record<
  YearCourseEntry['category'],
  { label: string; color: string }
> = {
  mwst: { label: 'MWST', color: '#3B87C6' },
  lohn: { label: 'Lohn & Personal', color: '#14405F' },
  abschluss: { label: 'Abschluss', color: '#8A6A4A' },
  steuern: { label: 'Steuern', color: '#4A6478' },
  planung: { label: 'Planung', color: '#8FC9EE' },
  organisation: { label: 'Organisation', color: '#C7B49F' },
};

export const yearCourseDisclaimer =
  'Allgemeine Orientierung ohne Anspruch auf Vollständigkeit. Termine und Pflichten unterscheiden sich je nach Kanton, Rechtsform und individueller Situation. Massgebend sind die Vorgaben der zuständigen Behörden. Der Jahreskurs ist keine Steuer- oder Rechtsberatung.';
