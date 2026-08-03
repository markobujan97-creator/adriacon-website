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
  /**
   * Standortkoordinaten – werden als feines typografisches Markendetail eingesetzt.
   * TODO (Adriacon): Exakte Koordinaten des Büros bestätigen.
   */
  coordinates: '47.4658° N · 8.2624° O',
} as const;

/**
 * MySteuerhelfer – von Adriacon selbst entwickelte App.
 *
 * TODO (Adriacon): Echten App-Store-Link eintragen, sobald die App
 * veröffentlicht ist. Solange der Wert null ist, wird der Button deaktiviert
 * dargestellt und verweist nirgendwohin.
 */
export const mySteuerhelfer = {
  appStoreUrl: null as string | null,
  /** Optional: URL der Webversion, falls vorhanden. */
  webAppUrl: null as string | null,
  platforms: 'Verfügbar für iOS.',
} as const;

/** Hauptnavigation – echte Seiten, keine Sprungmarken. */
export const navigation = [
  { label: 'Startseite', href: '/' },
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Pakete', href: '/pakete' },
  { label: 'Steuererklärungen', href: '/steuererklaerungen' },
  { label: 'Tools', href: '/tools' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;
