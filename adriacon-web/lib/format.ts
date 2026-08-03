/** Schweizer Zahlenformat. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-CH', { maximumFractionDigits: 0 }).format(Math.round(value));
}

export function formatChf(value: number): string {
  return `CHF ${formatNumber(value)}.–`;
}

export const monthNames = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
] as const;

export const monthShort = [
  'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
  'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez',
] as const;
