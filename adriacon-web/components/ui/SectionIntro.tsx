import type { ReactNode } from 'react';

export function SectionIntro({
  label,
  title,
  lead,
  align = 'left',
  tone = 'light',
  children,
}: {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  children?: ReactNode;
}) {
  const dark = tone === 'dark';
  return (
    <header className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {label && <p className={`label ${dark ? '!text-sky' : ''}`}>{label}</p>}
      <h2 className={`mt-4 text-d2 ${dark ? '!text-white' : ''}`}>{title}</h2>
      {lead && (
        <p className={`mt-5 lead ${align === 'center' ? 'mx-auto' : ''} ${dark ? '!text-sky-light' : ''}`}>
          {lead}
        </p>
      )}
      {children}
    </header>
  );
}
