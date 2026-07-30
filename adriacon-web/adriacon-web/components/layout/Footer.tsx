import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navigation, site } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink text-brand-mist">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-6 max-w-xs font-display text-lg italic text-paper">{site.claim}</p>
          <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-sky/70">
            {site.coordinates.label}
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow !text-brand-sky">Standort</h2>
          <address className="mt-4 not-italic text-sm leading-7">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            {site.address.country}
            <br />
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline decoration-brand-sky/40 underline-offset-4 hover:decoration-brand-sky">
              Karte öffnen
            </a>
          </address>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow !text-brand-sky">Kontakt</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-paper">
                {site.phone}
              </a>
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm text-brand-mist/70">
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}
                <br />
                <span className="tabular">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer-Navigation" className="md:col-span-3">
          <h2 className="eyebrow !text-brand-sky">Navigation</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#jahreskurs" className="hover:text-paper">
                Jahreskurs
              </a>
            </li>
            <li>
              <a href="#radar" className="hover:text-paper">
                Business Radar
              </a>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adriacon auf LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-paper/20 transition-colors hover:border-paper/60"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adriacon auf Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-card border border-paper/20 transition-colors hover:border-paper/60"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t border-paper/10">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-brand-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Alle Preise exklusive MWST.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/impressum" className="hover:text-paper">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-paper">
                Datenschutzerklärung
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
