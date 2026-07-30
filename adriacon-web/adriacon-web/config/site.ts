export const site = {
  name: 'Adriacon Treuhand GmbH',
  shortName: 'Adriacon',
  claim: 'Wir halten Sie auf Kurs.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.adriacon.ch',
  address: {
    street: 'Täfernstrasse 4',
    postalCode: '5405',
    city: 'Baden-Dättwil',
    canton: 'Aargau',
    country: 'Schweiz',
  },
  email: 'info@adriacon.ch',
  phone: '+41 76 541 40 08',
  phoneHref: 'tel:+41765414008',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=T%C3%A4fernstrasse+4%2C+5405+Baden-D%C3%A4ttwil',
  hours: [
    { days: 'Montag bis Freitag', time: '08:00 – 17:00' },
    { days: 'Samstag und Sonntag', time: 'nach Vereinbarung' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/adriacon-treuhand-gmbh',
    instagram: 'https://www.instagram.com/adriacon_treuhand/',
  },
  /**
   * Koordinaten für die Kursthematik im Interface.
   * TODO (Adriacon): Exakte Koordinaten des Standorts bestätigen.
   */
  coordinates: { lat: 47.4658, lng: 8.2624, label: "47.4658° N / 8.2624° O" },
} as const;

export const navigation = [
  { label: 'Leistungen', href: '#leistungen', waypoint: 'WP 02' },
  { label: 'Kursfinder', href: '#kursfinder', waypoint: 'WP 03' },
  { label: 'Preise', href: '#preise', waypoint: 'WP 05' },
  { label: 'Über uns', href: '#ueber-uns', waypoint: 'WP 07' },
  { label: 'Ablauf', href: '#ablauf', waypoint: 'WP 06' },
  { label: 'Kontakt', href: '#kontakt', waypoint: 'WP 09' },
] as const;

/** Abschnittsmarker als Wegpunkte – dient auch der Sprungnavigation. */
export const waypoints = [
  { id: 'start', code: 'WP 00', label: 'Start' },
  { id: 'herausforderungen', code: 'WP 01', label: 'Ausgangslage' },
  { id: 'leistungen', code: 'WP 02', label: 'Leistungen' },
  { id: 'kursfinder', code: 'WP 03', label: 'Kursfinder' },
  { id: 'radar', code: 'WP 04', label: 'Business Radar' },
  { id: 'preise', code: 'WP 05', label: 'Preise' },
  { id: 'ablauf', code: 'WP 06', label: 'Ablauf' },
  { id: 'ueber-uns', code: 'WP 07', label: 'Über uns' },
  { id: 'jahreskurs', code: 'WP 08', label: 'Jahreskurs' },
  { id: 'faq', code: 'WP 09', label: 'Fragen' },
  { id: 'kontakt', code: 'WP 10', label: 'Kontakt' },
] as const;
