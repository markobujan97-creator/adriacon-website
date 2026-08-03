'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navigation, site } from '@/config/site';

/**
 * Der Header liegt auf der Startseite über dem dunklen Hero und ist dort hell
 * gesetzt. Sobald gescrollt wird – oder auf allen anderen Seiten – wechselt er
 * ruhig auf die helle Variante.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  const onDark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ease-calm ${
        onDark
          ? 'border-white/10 bg-navy'
          : 'border-line bg-white/95 backdrop-blur'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-5">
        <Link href="/" aria-label="Adriacon Treuhand GmbH, zur Startseite">
          <Logo variant={onDark ? 'light' : 'dark'} />
        </Link>

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
            className={`text-[0.85rem] transition-colors ${
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
          type="button"
          className={`-mr-2 inline-flex h-11 w-11 items-center justify-center transition-colors lg:hidden ${
            onDark ? 'text-white' : 'text-navy'
          }`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto border-t border-line bg-white lg:hidden"
        >
          <nav aria-label="Navigation" className="shell py-6">
            <ul className="divide-y divide-line">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`block py-4 text-[1.1rem] ${
                      isActive(item.href) ? 'text-blue' : 'text-navy'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/kontakt" className="btn-primary mt-6 w-full">
              Erstgespräch vereinbaren
            </Link>
            <a href={site.phoneHref} className="btn-outline mt-3 w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
