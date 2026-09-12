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
    'https://www.google.com/maps/search/?api=1&query=Adriacon+Treuhand+GmbH%2C+T%C3%A4fernstrasse+4%2C+5405+Baden-D%C3%A4ttwil',
  hours: [
    { days: 'Montag bis Freitag', time: '08:00 – 17:00' },
    { days: 'Samstag und Sonntag', time: 'nach Vereinbarung' },
  ],
  social: {
    linkedin: 'https://www.linkedin.com/company/adriacon-treuhand-gmbh',
    instagram: 'https://www.instagram.com/adriacon_treuhand/',
  },
  /**
   * Standortkoordinaten des Büros, übernommen aus dem Google-Maps-Eintrag der
   * Adriacon Treuhand GmbH. Dienen als feines typografisches Markendetail und
   * als Geo-Angabe in den strukturierten Daten.
   */
  coordinates: '47.4487° N · 8.2927° O',
  geo: { lat: 47.4487302, lng: 8.2927201 },
} as const;

/**
 * MySteuerhelfer – die von Adriacon selbst entwickelte App zur digitalen
 * Einreichung der Steuerunterlagen. Verfügbar als iOS-App und als Webversion.
 *
 * TODO (Adriacon): Der gelieferte App-Store-Link zeigt auf die australische
 * Storefront (/au/). Für Schweizer Besucherinnen und Besucher ist in der Regel
 * https://apps.apple.com/ch/app/mysteuerhelfer/id6758463921 die richtige
 * Adresse. Bitte prüfen und bei Bedarf hier auf /ch/ umstellen.
 */
export const mySteuerhelfer = {
  appStoreUrl: 'https://apps.apple.com/au/app/mysteuerhelfer/id6758463921',
  webAppUrl: 'https://steuererklarungs-helfer-0819f95c.base44.app/',
  platforms: 'Als App für iOS und als Webversion im Browser.',
} as const;

/**
 * Einzugsgebiet. Der Schwerpunkt liegt im Aargau und in Zürich, digital
 * betreuen wir Mandate in der ganzen Schweiz. Die Liste beschreibt das
 * Betreuungsgebiet – es gibt nur einen Standort, in Baden-Dättwil.
 */
export const regions = [
  'Baden',
  'Baden-Dättwil',
  'Wettingen',
  'Brugg',
  'Aarau',
  'Lenzburg',
  'Zürich',
  'Dietikon',
  'Schlieren',
  'Zug',
] as const;

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
