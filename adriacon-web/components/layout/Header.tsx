'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navigation, site } from '@/config/site';

/**
 * Der Header liegt auf der Startseite über dem dunklen Hero und ist dort hell
 * gesetzt. Sobald gescrollt wird – oder auf allen anderen Seiten – wechselt er
 * ruhig auf die helle Variante.
 *
 * Das Mobilmenü schliesst sich in allen Fällen zuverlässig:
 * beim Wechsel der Seite, beim Klick auf einen Link (auch auf den Link zur
 * aktuellen Seite), mit der Escape-Taste, über den Hintergrund und sobald die
 * Breite den Desktop-Umbruch erreicht.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const isHome = pathname === '/';
  const onDark = isHome && !scrolled && !open;

  const close = useCallback(() => setOpen(false), []);

  // Farbwechsel beim Scrollen
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Seitenwechsel schliesst das Menü
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape schliesst das Menü, ab Desktop-Breite wird es aufgehoben
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => {
      if (media.matches) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    media.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKey);
      media.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  // Hintergrund nicht mitscrollen lassen, solange das Menü offen ist
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ease-calm ${
        onDark ? 'border-white/10 bg-navy' : 'border-line bg-white'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Adriacon Treuhand GmbH, zur Startseite" onClick={close}>
          <Logo variant={onDark ? 'light' : 'dark'} />
        </Link>

        {/* Navigation ab 1024 Pixel */}
        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-x-5 xl:gap-x-7">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative py-2 text-[0.9rem] transition-colors duration-300 ${
                      onDark
                        ? active
                          ? 'text-white'
                          : 'text-sky-light/80 hover:text-white'
                        : active
                          ? 'text-navy'
                          : 'text-ink-soft hover:text-navy'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-300 ease-calm ${
                        onDark ? 'bg-sky' : 'bg-blue'
                      } ${active ? 'w-full' : 'w-0'}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            href={site.phoneHref}
            className={`whitespace-nowrap text-[0.85rem] transition-colors ${
              onDark ? 'text-sky-light/80 hover:text-white' : 'text-ink-soft hover:text-navy'
            }`}
          >
            {site.phone}
          </a>
          <Link
            href="/kontakt"
            className={`btn !py-2.5 !text-[0.88rem] ${
              onDark ? 'bg-sky text-navy hover:bg-white' : 'bg-blue text-white hover:bg-blue-deep'
            }`}
          >
            Erstgespräch
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={`-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded transition-colors lg:hidden ${
            onDark ? 'text-white' : 'text-navy'
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobilmenü */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Navigation" className="shell py-5">
          <ul className="divide-y divide-line">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex min-h-[3.25rem] items-center text-[1.08rem] ${
                    isActive(item.href) ? 'font-medium text-blue' : 'text-navy'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/kontakt" onClick={close} className="btn-primary mt-6 w-full">
            Erstgespräch vereinbaren
          </Link>

          <div className="mt-5 space-y-2 border-t border-line pt-5">
            <a
              href={site.phoneHref}
              onClick={close}
              className="flex items-center gap-3 py-2 text-[0.95rem] text-ink-soft"
            >
              <Phone className="h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              onClick={close}
              className="flex items-center gap-3 py-2 text-[0.95rem] text-ink-soft"
            >
              <Mail className="h-4 w-4 shrink-0 text-blue" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
