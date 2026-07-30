import type { RadarDimension, RadarKey, RadarResult } from '@/types';

/**
 * Adriacon Business Radar – Selbsteinschätzung, keine Analyse.
 * Skala 1 bis 5, 5 bedeutet "gut aufgestellt".
 * Bewusst ohne Bonitäts-, Rechts- oder Steuerbewertung.
 */
export const radarDimensions: RadarDimension[] = [
  {
    key: 'zahlenueberblick',
    label: 'Zahlenüberblick',
    question: 'Wie gut kennen Sie jederzeit Ihre aktuellen Zahlen?',
    low: 'Ich sehe die Zahlen erst beim Abschluss',
    high: 'Ich sehe jederzeit den aktuellen Stand',
    groups: ['admin'],
    service: 'Laufende Buchhaltung mit Quartals- oder Monatsreporting',
    recommendation:
      'Einen festen Reporting-Rhythmus einführen, damit Sie unterjährig entscheiden können statt rückblickend.',
  },
  {
    key: 'liquiditaet',
    label: 'Liquiditätsplanung',
    question: 'Wie gut können Sie Ihre Liquidität für die nächsten Monate planen?',
    low: 'Ich plane von Monat zu Monat',
    high: 'Ich habe eine rollende Planung',
    groups: ['admin'],
    service: 'Rollende Liquiditätsplanung über 12 Monate',
    recommendation:
      'Eine rollende Liquiditätsplanung aufsetzen und monatlich mit den Ist-Zahlen abgleichen.',
  },
  {
    key: 'buchhaltungsstand',
    label: 'Buchhaltungsstand',
    question: 'Wie aktuell ist Ihre Buchhaltung?',
    low: 'Deutlich im Rückstand',
    high: 'Laufend aktuell',
    groups: ['admin'],
    service: 'Laufende digitale Buchhaltung',
    recommendation:
      'Den Rückstand einmalig aufarbeiten und danach einen festen Monatsrhythmus etablieren.',
  },
  {
    key: 'lohnprozesse',
    label: 'Lohnprozesse',
    question: 'Wie sauber laufen Lohnabrechnung und Personaladministration?',
    low: 'Aufwendig und fehleranfällig',
    high: 'Standardisiert und termingerecht',
    groups: ['admin', 'digital'],
    service: 'Lohnwesen, Quellensteuer und Personaladministration',
    recommendation:
      'Lohnlauf, Meldungen und Personaldossiers in einen definierten Monatsablauf bringen.',
  },
  {
    key: 'steuerplanung',
    label: 'Steuerthemen',
    question: 'Wie sicher fühlen Sie sich bei Steuern und MWST?',
    low: 'Ich bin regelmässig unsicher',
    high: 'Die Themen sind geklärt',
    groups: ['admin'],
    service: 'Steuererklärungen und MWST-Abrechnungen',
    recommendation:
      'MWST-Methode und Steuersituation einmal sauber prüfen, damit wiederkehrende Unsicherheit wegfällt.',
  },
  {
    key: 'reporting',
    label: 'Reporting',
    question: 'Wie brauchbar sind Ihre Auswertungen für Entscheidungen?',
    low: 'Es gibt kaum Auswertungen',
    high: 'Ich entscheide auf Basis von Kennzahlen',
    groups: ['admin'],
    service: 'Quartals- oder Monatsreporting mit Kennzahlen',
    recommendation:
      'Ein kleines, festes Kennzahlenset definieren – lieber fünf verlässliche Zahlen als zwanzig ungenutzte.',
  },
  {
    key: 'digitalisierung',
    label: 'Digitalisierung',
    question: 'Wie digital läuft Ihr Belegfluss heute?',
    low: 'Überwiegend Papier',
    high: 'Vollständig digital',
    groups: ['digital'],
    service: 'Digitaler Belegfluss mit Bexio und MySteuerhelfer',
    recommendation:
      'Belege direkt beim Entstehen digital erfassen – das senkt Aufwand und vermeidet den Papierzuschlag.',
  },
  {
    key: 'personenabhaengigkeit',
    label: 'Personenabhängigkeit',
    question: 'Wie gut läuft die Administration weiter, wenn eine Person ausfällt?',
    low: 'Alles hängt an einer Person',
    high: 'Abläufe sind dokumentiert und übergabefähig',
    groups: ['admin'],
    service: 'Prozessaufbau und Übernahme der laufenden Administration',
    recommendation:
      'Zuständigkeiten und Ablagewege schriftlich festhalten und kritische Aufgaben doppelt besetzen.',
  },
  {
    key: 'adminbelastung',
    label: 'Administrative Last',
    question: 'Wie viel Zeit bleibt Ihnen neben der Administration fürs Kerngeschäft?',
    low: 'Die Administration frisst meine Zeit',
    high: 'Die Administration läuft nebenher',
    groups: ['admin'],
    service: 'Auslagerung der laufenden Buchhaltung und Administration',
    recommendation:
      'Wiederkehrende Aufgaben bündeln und auslagern, statt sie über die Woche zu verteilen.',
  },
  {
    key: 'wachstumsbereitschaft',
    label: 'Wachstumsbereitschaft',
    question: 'Wie gut sind Ihre Finanzprozesse auf Wachstum vorbereitet?',
    low: 'Wachstum würde die Prozesse überfordern',
    high: 'Die Prozesse skalieren mit',
    groups: ['digital', 'admin'],
    service: 'Budget, Forecast und Finanzplanung',
    recommendation:
      'Budget und Forecast einführen, bevor das Wachstum die bestehenden Abläufe überholt.',
  },
];

export const radarKeys = radarDimensions.map((d) => d.key);

export const defaultRadarScores = Object.fromEntries(
  radarDimensions.map((d) => [d.key, 3]),
) as Record<RadarKey, number>;

export function evaluateRadar(scores: Record<RadarKey, number>): RadarResult {
  const entries = radarDimensions.map((dimension) => ({
    dimension,
    score: scores[dimension.key] ?? 3,
  }));

  const sorted = [...entries].sort((a, b) => a.score - b.score);
  const average = entries.reduce((sum, e) => sum + e.score, 0) / entries.length;

  const groupAverage = (group: 'digital' | 'admin') => {
    const relevant = entries.filter((e) => e.dimension.groups.includes(group));
    return relevant.reduce((sum, e) => sum + e.score, 0) / relevant.length;
  };

  const digitalScore = Math.round(((groupAverage('digital') - 1) / 4) * 100);
  // Hoher Wert = hoher Druck, deshalb invertiert.
  const adminPressure = Math.round(100 - ((groupAverage('admin') - 1) / 4) * 100);

  return {
    scores,
    average,
    strongest: [...entries].sort((a, b) => b.score - a.score)[0]!.dimension,
    weakest: sorted[0]!.dimension,
    recommendations: sorted.slice(0, 3),
    digitalScore,
    adminPressure,
  };
}
