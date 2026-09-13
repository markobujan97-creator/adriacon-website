import { site } from './site';

/**
 * SEO-Angaben für alle Seiten.
 *
 * Die H1 jeder Seite wird nach Suchbegriffen gesetzt, nicht nach Gestaltung.
 * Sie enthält deshalb immer die tragende Leistung und, wo sinnvoll, die Region.
 * Gestalterisch hervorgehobene Sätze wie der Leitsatz «Wir halten Sie auf Kurs.»
 * bleiben optisch gross, sind im Markup aber bewusst keine Überschrift.
 *
 * Titel und Beschreibungen der Seiten Leistungen, Über uns und Kontakt sind
 * unverändert von der bestehenden Website adriacon.ch übernommen, damit die
 * dort erarbeiteten Rankings erhalten bleiben. Die neuen Seiten folgen
 * demselben Muster: Leistung + Region.
 *
 * Grundsatz bei den Suchbegriffen: nur Begriffe, die auf der jeweiligen Seite
 * auch tatsächlich vorkommen. Keyword-Stuffing schadet dem Ranking mehr,
 * als es nützt.
 */

export interface PageSeo {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  /** Sichtbare H1 der Seite. Genau eine pro Seite. */
  h1: string;
  /** Beschriftung in der Brotkrumen-Navigation und in den strukturierten Daten. */
  breadcrumb: string;
}

/** Auf jeder Seite relevante Grundbegriffe. */
export const baseKeywords = [
  'Treuhand',
  'Treuhand Schweiz',
  'Treuhand Aargau',
  'Treuhand Zürich',
  'Treuhand Baden',
  'Treuhand Baden-Dättwil',
  'Treuhandbüro Aargau',
  'Treuhänder Schweiz',
  'Buchhaltung',
  'Buchhaltung Schweiz',
  'Buchhaltung Aargau',
  'Buchhaltung Zürich',
  'KMU Buchhaltung',
  'KMU Treuhand',
  'Steuererklärung',
  'Steuererklärung Aargau',
  'Steuererklärung Zürich',
  'Adriacon Treuhand',
];

export const seo: Record<string, PageSeo> = {
  home: {
    path: '/',
    // Titel und H1 der bestehenden Startseite
    title: 'Adriacon Treuhand GmbH – Treuhand im Raum Aargau und Zürich',
    description:
      'Treuhand, Buchhaltung und Steuern für KMU, Start-ups und Privatpersonen im Raum Aargau und Zürich. Wir unterstützen Sie bei Finanzbuchhaltung, Jahresabschlüssen, Lohnwesen und Steuererklärungen – persönlich, transparent und digital.',
    keywords: [
      ...baseKeywords,
      'Treuhandunternehmen Schweiz',
      'Buchhaltungsbüro Aargau',
      'Jahresabschluss Schweiz',
      'Finanzbuchhaltung KMU',
      'Lohnbuchhaltung Schweiz',
      'digitale Buchhaltung',
      'Treuhand für Start-ups',
      'Treuhand für Einzelfirmen',
    ],
    h1: 'Adriacon Treuhand GmbH – Treuhand, Buchhaltung und Steuern im Raum Aargau und Zürich',
    breadcrumb: 'Startseite',
  },

  leistungen: {
    path: '/leistungen',
    title: 'Steuererklärung Aargau & Treuhand Schweiz – Dienstleistungen',
    description:
      'Professionelle Steuererklärung Aargau sowie Treuhand-Dienstleistungen. Adriacon ist Ihr zuverlässiger Partner für Treuhand in der Schweiz: Finanzbuchhaltung, Jahresabschluss, Lohnwesen, Mehrwertsteuer, Firmengründung und Unternehmensberatung.',
    keywords: [
      ...baseKeywords,
      'Finanzbuchhaltung Aargau',
      'Finanzbuchhaltung Zürich',
      'Jahresabschluss erstellen lassen',
      'Buchhaltung auslagern',
      'Lohnbuchhaltung Aargau',
      'Lohnwesen KMU Schweiz',
      'Quellensteuer Abrechnung',
      'Personaladministration Schweiz',
      'Mehrwertsteuer MWST Abrechnung',
      'Saldosteuersatz effektive Methode',
      'Firmengründung Aargau',
      'GmbH gründen Schweiz',
      'Unternehmensberatung Baden',
      'Liquiditätsplanung KMU',
      'Debitorenmanagement',
    ],
    h1: 'Steuererklärung und weitere Treuhand-Dienstleistungen im Raum Aargau und Zürich',
    breadcrumb: 'Leistungen',
  },

  pakete: {
    path: '/pakete',
    title: 'Treuhand-Pakete und Preise für KMU – ab CHF 320.– pro Monat',
    description:
      'Transparente Treuhandpakete für KMU, Start-ups und Einzelfirmen im Aargau und Zürich: Buchhaltung, Lohnwesen, Jahresabschluss und Steuern ab CHF 320.– pro Monat. Keine MWST, keine versteckten Kosten.',
    keywords: [
      ...baseKeywords,
      'Treuhand Preise Schweiz',
      'Treuhand Kosten KMU',
      'Buchhaltung Kosten',
      'Buchhaltung auslagern Preis',
      'Treuhand Pauschale',
      'Treuhand Abo KMU',
      'Firmengründung GmbH Kosten',
      'CFO Dienstleistung KMU',
    ],
    h1: 'Treuhand-Pakete und Preise für KMU in Aargau und Zürich',
    breadcrumb: 'Pakete',
  },

  steuererklaerungen: {
    path: '/steuererklaerungen',
    title: 'Steuererklärung ausfüllen lassen – Aargau, Zürich und Schweiz',
    description:
      'Steuererklärung ausfüllen lassen ab CHF 49.–: Privatpersonen CHF 99.–, Paare CHF 139.–, Selbstständige CHF 180.–, Studierende CHF 49.–. Unterlagen digital einreichen mit MySteuerhelfer, persönlich geprüft von Adriacon Treuhand in Baden-Dättwil.',
    keywords: [
      ...baseKeywords,
      'Steuererklärung ausfüllen lassen',
      'Steuererklärung Baden',
      'Steuererklärung Baden-Dättwil',
      'Steuererklärung Schweiz Preis',
      'Steuererklärung Privatpersonen',
      'Steuererklärung Ehepaar',
      'Steuererklärung Studierende',
      'Steuererklärung Selbstständige',
      'Steuererklärung online einreichen',
      'Steuererklärung digital',
      'Steuerberatung Aargau',
      'MySteuerhelfer App',
    ],
    h1: 'Steuererklärung ausfüllen lassen – Aargau, Zürich und Schweiz',
    breadcrumb: 'Steuererklärungen',
  },

  tools: {
    path: '/tools',
    title: 'Treuhand-Tools: Paketfinder, Steuerpreise und Jahreskurs',
    description:
      'Kostenlose Werkzeuge von Adriacon Treuhand: Paketfinder für KMU, Preise für private Steuererklärungen, der administrative Jahreskurs und die App MySteuerhelfer. Ohne Anmeldung nutzbar.',
    keywords: [
      ...baseKeywords,
      'Treuhand Kosten berechnen',
      'Buchhaltung Kosten Rechner',
      'Steuererklärung Preis berechnen',
      'Treuhand Offerte Schweiz',
      'MySteuerhelfer',
    ],
    h1: 'Treuhand-Rechner: Kosten für Buchhaltung und Steuererklärung berechnen',
    breadcrumb: 'Tools',
  },

  ueberUns: {
    path: '/ueber-uns',
    title: 'Ihr KMU-Treuhand Partner im Aargau',
    description:
      'Adriacon ist Ihr verlässlicher Partner für KMU-Treuhand in Baden. Wir unterstützen Unternehmen mit Buchhaltung und Jahresabschlüssen – persönlich, digital und präzise.',
    keywords: [
      ...baseKeywords,
      'Treuhandunternehmen Baden-Dättwil',
      'junges Treuhandunternehmen Schweiz',
      'Leon Šoprek',
      'Marko Bujan',
      'Treuhand Ansprechpartner Aargau',
    ],
    h1: 'Über uns – Ihr KMU-Treuhand-Partner im Aargau und in der Schweiz',
    breadcrumb: 'Über uns',
  },

  kontakt: {
    path: '/kontakt',
    title: 'Kontakt Adriacon – Treuhand & Steuerberatung in Aargau / Baden',
    description:
      'Kontaktieren Sie Adriacon für Treuhand & Steuerberatung im Aargau. Wir unterstützen bei Steuererklärungen, Buchhaltung & Jahresabschlüssen. Täfernstrasse 4, 5405 Baden-Dättwil.',
    keywords: [
      ...baseKeywords,
      'Treuhänder Baden kontaktieren',
      'Steuerberatung Aargau',
      'Treuhandbüro in der Nähe',
      'Erstgespräch Treuhand',
    ],
    h1: 'Kontakt – Treuhand und Steuerberatung in Baden-Dättwil, Aargau',
    breadcrumb: 'Kontakt',
  },
};

/** Baut aus einem SEO-Eintrag das Metadata-Objekt für Next.js. */
export function metadataFor(key: keyof typeof seo) {
  const entry = seo[key]!;
  const url = `${site.url}${entry.path === '/' ? '' : entry.path}`;

  return {
    title: entry.title,
    description: entry.description,
    keywords: entry.keywords,
    alternates: { canonical: entry.path },
    openGraph: {
      type: 'website' as const,
      locale: 'de_CH',
      url,
      siteName: site.name,
      title: entry.title,
      description: entry.description,
      images: [
        {
          url: '/brand/adriacon-logo-vertikal.png',
          width: 1563,
          height: 1563,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: entry.title,
      description: entry.description,
    },
  };
}

/** Strukturierte Daten für die Brotkrumen-Navigation einer Unterseite. */
export function breadcrumbSchema(key: keyof typeof seo) {
  const entry = seo[key]!;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: entry.breadcrumb,
        item: `${site.url}${entry.path}`,
      },
    ],
  };
}
