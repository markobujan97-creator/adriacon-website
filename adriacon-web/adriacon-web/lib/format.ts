/** Schweizer Zahlenformat mit Hochkomma als Tausendertrennzeichen. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(Math.round(value));
}

/** z. B. "CHF 1'450.–" */
export function formatChf(value: number): string {
  return `CHF ${formatNumber(value)}.–`;
}

/** z. B. "CHF 780.–/Mt." */
export function formatChfMonthly(value: number): string {
  return `${formatChf(value)}/Mt.`;
}

export const cantons = [
  'Aargau',
  'Appenzell Ausserrhoden',
  'Appenzell Innerrhoden',
  'Basel-Landschaft',
  'Basel-Stadt',
  'Bern',
  'Freiburg',
  'Genf',
  'Glarus',
  'Graubünden',
  'Jura',
  'Luzern',
  'Neuenburg',
  'Nidwalden',
  'Obwalden',
  'Schaffhausen',
  'Schwyz',
  'Solothurn',
  'St. Gallen',
  'Tessin',
  'Thurgau',
  'Uri',
  'Waadt',
  'Wallis',
  'Zug',
  'Zürich',
] as const;

export const monthNames = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
] as const;

export const monthShort = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'] as const;
