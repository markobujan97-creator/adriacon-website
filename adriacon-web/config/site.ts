export const site = {
  name: 'Adriacon Treuhand GmbH',
  shortName: 'Adriacon',
  claim: 'Stufe für Stufe auf Kurs.',
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
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=T%C3%A4fernstrasse+4%2C+5405+Baden-D%C3%A4ttwil',
  hours: [
    { days: 'Montag bis Freitag', time: '08:00 – 17:00' },
    { days: 'Samstag und Sonntag', time: 'nach Vereinbarung' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/adriacon-treuhand-gmbh',
    instagram: 'https://www.instagram.com/adriacon_treuhand/',
  },
} as const;

/** Hauptnavigation – sechs Punkte, echte Seiten. */
export const navigation = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Pakete', href: '/pakete' },
  { label: 'Tools', href: '/tools' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;
