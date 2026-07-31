import type { RadarDimension, RadarKey, RadarResult } from '@/types';

/**
 * Adriacon Business Radar – acht Fragen, Skala 1 bis 5.
 * Eine Selbsteinschätzung als Gesprächsgrundlage, keine Unternehmens-,
 * Bonitäts- oder Risikobewertung und keine Rechts- oder Steuerberatung.
 */
export const radarDimensions: RadarDimension[] = [
  {
    key: 'zahlenueberblick',
    label: 'Zahlenüberblick',
    question: 'Wie gut kennen Sie jederzeit Ihre aktuellen Zahlen?',
    low: 'Erst beim Abschluss',
    high: 'Jederzeit aktuell',
    service: 'Laufende Buchhaltung mit Reporting',
    recommendation:
      'Einen festen Reporting-Rhythmus einführen, damit Sie unterjährig entscheiden statt rückblickend.',
  },
  {
    key: 'liquiditaet',
    label: 'Liquidität',
    question: 'Wie gut können Sie Ihre Liquidität für die nächsten Monate planen?',
    low: 'Von Monat zu Monat',
    high: 'Rollend geplant',
    service: 'Rollende Liquiditätsplanung über 12 Monate',
    recommendation: 'Eine rollende Planung aufsetzen und monatlich mit den Ist-Zahlen abgleichen.',
  },
  {
    key: 'buchhaltungsstand',
    label: 'Buchhaltung',
    question: 'Wie aktuell ist Ihre Buchhaltung?',
    low: 'Deutlich im Rückstand',
    high: 'Laufend aktuell',
    service: 'Laufende digitale Buchhaltung',
    recommendation:
      'Den Rückstand einmalig aufarbeiten und danach einen festen Monatsrhythmus etablieren.',
  },
  {
    key: 'lohnprozesse',
    label: 'Lohnprozesse',
    question: 'Wie sauber laufen Lohnabrechnung und Personaladministration?',
    low: 'Aufwendig',
    high: 'Standardisiert',
    service: 'Lohnwesen, Quellensteuer und Personaladministration',
    recommendation: 'Lohnlauf, Meldungen und Personaldossiers in einen festen Monatsablauf bringen.',
  },
  {
    key: 'steuerplanung',
    label: 'Steuern',
    question: 'Wie sicher fühlen Sie sich bei Steuern und MWST?',
    low: 'Oft unsicher',
    high: 'Alles geklärt',
    service: 'Steuererklärungen und MWST-Abrechnungen',
    recommendation:
      'MWST-Methode und Steuersituation einmal sauber prüfen, damit die Unsicherheit wegfällt.',
  },
  {
    key: 'reporting',
    label: 'Reporting',
    question: 'Wie brauchbar sind Ihre Auswertungen für Entscheidungen?',
    low: 'Kaum vorhanden',
    high: 'Entscheidungsreif',
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
    service: 'Digitaler Belegfluss mit Bexio und MySteuerhelfer',
    recommendation:
      'Belege direkt beim Entstehen digital erfassen – das senkt den Aufwand spürbar.',
  },
  {
    key: 'adminbelastung',
    label: 'Administration',
    question: 'Wie viel Zeit bleibt Ihnen neben der Administration fürs Kerngeschäft?',
    low: 'Sehr wenig',
    high: 'Genug',
    service: 'Auslagerung der laufenden Administration',
    recommendation:
      'Wiederkehrende Aufgaben bündeln und auslagern, statt sie über die Woche zu verteilen.',
  },
];

export const defaultRadarScores = Object.fromEntries(
  radarDimensions.map((d) => [d.key, 3]),
) as Record<RadarKey, number>;

export function evaluateRadar(scores: Record<RadarKey, number>): RadarResult {
  const entries = radarDimensions.map((dimension) => ({
    dimension,
    score: scores[dimension.key] ?? 3,
  }));
  const sorted = [...entries].sort((a, b) => a.score - b.score);

  return {
    strongest: [...entries].sort((a, b) => b.score - a.score)[0]!.dimension,
    weakest: sorted[0]!.dimension,
    recommendations: sorted.slice(0, 3),
    average: entries.reduce((sum, e) => sum + e.score, 0) / entries.length,
  };
}
