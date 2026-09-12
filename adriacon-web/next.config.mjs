/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Dauerhafte Weiterleitungen von den Adressen der bisherigen WordPress-Website.
   * Sie erhalten die bestehenden Google-Rankings und verhindern 404-Fehler,
   * sobald die neue Website unter derselben Domain läuft.
   */
  async redirects() {
    return [
      { source: '/dienstleistungen', destination: '/leistungen', permanent: true },
      { source: '/finanzbuchhaltung-abschluesse', destination: '/leistungen', permanent: true },
      { source: '/lohnwesen-personaladministration', destination: '/leistungen', permanent: true },
      { source: '/firmengruendung-start-up-begleitung', destination: '/leistungen', permanent: true },
      { source: '/mehrwertsteuer-mwst', destination: '/leistungen', permanent: true },
      { source: '/unternehmensberatung', destination: '/leistungen', permanent: true },
      { source: '/web-grafikdesign', destination: '/leistungen', permanent: true },
      { source: '/versicherungen', destination: '/leistungen', permanent: true },
      { source: '/steuern', destination: '/steuererklaerungen', permanent: true },
      { source: '/steuererklaerung-digital', destination: '/steuererklaerungen', permanent: true },
      { source: '/datenschutzerklaerung', destination: '/datenschutz', permanent: true },
    ];
  },
};

export default nextConfig;
