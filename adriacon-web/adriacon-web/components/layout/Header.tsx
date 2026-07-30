'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navigation, site } from '@/config/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-course ${
        scrolled
          ? 'border-b border-ink/10 bg-paper/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#start" aria-label="Adriacon Treuhand GmbH, zum Seitenanfang">
          <Logo />
        </a>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative inline-block py-2 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-deep transition-[width] duration-300 ease-course group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="font-mono text-xs text-ink-muted transition-colors hover:text-ink"
          >
            {site.phone}
          </a>
          <a href="#kontakt" className="btn-primary !py-2.5 !text-[0.82rem]">
            Erstgespräch vereinbaren
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Navigation schliessen' : 'Navigation öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-ink/10 bg-paper lg:hidden"
        >
          <nav aria-label="Navigation" className="shell py-8">
            <ul className="divide-y divide-ink/8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 text-lg text-ink"
                  >
                    {item.label}
                    <span className="font-mono text-eyebrow uppercase text-ink-muted">{item.waypoint}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Erstgespräch vereinbaren
            </a>
            <a href={site.phoneHref} className="btn-secondary mt-3 w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
