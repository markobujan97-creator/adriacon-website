import Link from 'next/link';
import { Linkedin, Instagram } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Coordinates } from '@/components/ui/Coordinates';
import { navigation, site } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-sky-light">
      <div className="shell grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="light" />
          <p className="mt-5 font-display text-lg text-white">{site.claim}</p>
          <Coordinates tone="dark" className="mt-6" />
        </div>

        <div className="md:col-span-3">
          <h2 className="label !text-sky">Standort</h2>
          <address className="mt-4 not-italic text-sm leading-7">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-white underline decoration-sky/40 underline-offset-4 hover:decoration-sky"
            >
              Karte öffnen
            </a>
          </address>
        </div>

        <div className="md:col-span-2">
          <h2 className="label !text-sky">Kontakt</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
          </ul>
          <ul className="mt-4 space-y-1 text-sm text-sky-light/70">
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
          <h2 className="label !text-sky">Navigation</h2>
          <ul className="mt-4 space-y-1.5 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adriacon auf LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/20 transition-colors hover:border-white/60"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adriacon auf Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/20 transition-colors hover:border-white/60"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-sky-light/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Alle Preise exklusive MWST.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/impressum" className="hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-white">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
