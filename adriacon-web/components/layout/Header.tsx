'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { navigation, site } from '@/config/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ease-calm ${
        scrolled ? 'border-line bg-white/95 backdrop-blur' : 'border-transparent bg-white'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Adriacon Treuhand GmbH, zur Startseite">
          <Logo />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative py-2 text-[0.95rem] transition-colors ${
                      active ? 'text-navy' : 'text-ink-soft hover:text-navy'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-sky transition-all duration-300 ease-calm ${
                        active ? 'w-full' : 'w-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/kontakt" className="btn-primary hidden !py-2.5 !text-[0.9rem] lg:inline-flex">
          Erstgespräch vereinbaren
        </Link>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-navy lg:hidden"
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
                  <Link href={item.href} className="block py-4 text-[1.1rem] text-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/kontakt" className="btn-primary mt-6 w-full">
              Erstgespräch vereinbaren
            </Link>
            <a href={site.phoneHref} className="btn-outline mt-3 w-full">
              {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
