import type { Metadata, Viewport } from 'next';
import { Jost, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/config/site';

/**
 * Typografie
 * Jost ist eine geometrische Grotesk in der Tradition von Futura und damit die
 * nächstliegende frei verfügbare Entsprechung zu Glacial Indifference aus dem
 * Adriacon-Logo. Hanken Grotesk ergänzt sie als ruhige, gut lesbare Leseschrift.
 */
const display = Jost({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Adriacon Treuhand GmbH – Treuhand und Buchhaltung in Baden-Dättwil',
    template: '%s | Adriacon Treuhand',
  },
  description:
    'Treuhand für KMU, Start-ups und Privatpersonen im Raum Aargau und Zürich. Buchhaltung, MWST, Lohnwesen, Jahresabschluss und Steuern – persönlich, digital und mit klaren Paketpreisen ab CHF 320.– pro Monat.',
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
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: site.url,
    siteName: site.name,
    title: 'Adriacon Treuhand GmbH – Stufe für Stufe auf Kurs.',
    description:
      'Treuhand, Buchhaltung und Steuern für KMU, Start-ups und Privatpersonen im Raum Aargau und Zürich.',
    images: [
      {
        url: '/images/treppe-hero.jpg',
        width: 2000,
        height: 1125,
        alt: 'Adriacon Treuhand GmbH',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/brand/adriacon-signet.png' },
};

export const viewport: Viewport = {
  themeColor: '#12314A',
  width: 'device-width',
  initialScale: 1,
};

const organisationSchema = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-CH" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
