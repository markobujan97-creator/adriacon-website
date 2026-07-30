import type { Metadata, Viewport } from 'next';
import { Newsreader, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';
import { faqs } from '@/config/content';

const display = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Adriacon Treuhand GmbH – Treuhand und Buchhaltung in Baden-Dättwil',
    template: '%s | Adriacon Treuhand GmbH',
  },
  description:
    'Treuhand für KMU, Start-ups und Privatpersonen im Raum Aargau und Zürich. Buchhaltung, MWST, Lohnwesen, Jahresabschluss und Steuern – persönlich, digital und mit transparenten Preisen ab CHF 320.– pro Monat.',
  keywords: [
    'Treuhand Baden',
    'Treuhand Baden-Dättwil',
    'Treuhand Aargau',
    'Buchhaltung Aargau',
    'Steuererklärung Aargau',
    'Treuhand für KMU',
    'digitale Buchhaltung Schweiz',
    'Firmengründung Aargau',
    'Lohnbuchhaltung Aargau',
    'Treuhand Zürich',
    'KMU Treuhand Schweiz',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: site.url,
    siteName: site.name,
    title: 'Adriacon Treuhand GmbH – Wir halten Sie auf Kurs.',
    description:
      'Treuhand, Buchhaltung und Steuern für KMU, Start-ups und Privatpersonen im Raum Aargau und Zürich. Transparente Pakete, digitale Prozesse, persönliche Betreuung.',
    images: [{ url: '/brand/adriacon-logo-vertikal.png', width: 1563, height: 1563, alt: 'Adriacon Treuhand GmbH' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/brand/adriacon-signet.png' },
};

export const viewport: Viewport = {
  themeColor: '#0A1F30',
  width: 'device-width',
  initialScale: 1,
};

const professionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organisation`,
  name: site.name,
  slogan: site.claim,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/brand/adriacon-logo-vertikal.png`,
  logo: `${site.url}/brand/adriacon-logo-vertikal.png`,
  priceRange: 'CHF',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.canton,
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.coordinates.lat,
    longitude: site.coordinates.lng,
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Kanton Aargau' },
    { '@type': 'AdministrativeArea', name: 'Kanton Zürich' },
    { '@type': 'Country', name: 'Schweiz' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  sameAs: [site.social.linkedin, site.social.instagram],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-card focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Zum Inhalt springen
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </body>
    </html>
  );
}
