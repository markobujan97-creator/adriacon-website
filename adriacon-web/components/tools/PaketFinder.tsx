'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { emptyAnswers, recommend } from '@/lib/recommendPackage';
import type { FinderAnswers, ProfileType, SupportLevel, TeamSize } from '@/types';

function Choice<T extends string | boolean>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: Array<{ value: T; label: string; hint?: string }>;
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="font-display text-[1.05rem] font-medium text-navy">{legend}</legend>
      <div
        role="radiogroup"
        aria-label={legend}
        className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={`flex items-start justify-between gap-3 rounded border px-4 py-3 text-left transition-colors duration-200 ease-calm ${
                active
                  ? 'border-blue bg-sky-pale'
                  : 'border-line bg-white hover:border-sky'
              }`}
            >
              <span>
                <span className="block text-[0.95rem] font-medium text-navy">{option.label}</span>
                {option.hint && (
                  <span className="mt-0.5 block text-[0.82rem] text-ink-soft">{option.hint}</span>
                )}
              </span>
              {active && <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PaketFinder() {
  const [answers, setAnswers] = useState<FinderAnswers>(emptyAnswers);
  const result = useMemo(() => recommend(answers), [answers]);

  const set = <K extends keyof FinderAnswers>(key: K, value: FinderAnswers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const isPrivate = answers.profile === 'privat';
  const answered =
    (answers.profile ? 1 : 0) +
    (isPrivate
      ? 0
      : (answers.teamSize ? 1 : 0) + (answers.payroll !== null ? 1 : 0) + (answers.support ? 1 : 0));
  const total = isPrivate ? 1 : 4;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[3px] flex-1 overflow-hidden rounded bg-line">
            <div
              className="h-full bg-sky transition-[width] duration-400 ease-calm"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
          <span className="text-[0.82rem] text-ink-light tabular">
            {answered} von {total}
          </span>
        </div>

        <div className="space-y-9">
          <Choice<ProfileType>
            legend="1. Was trifft auf Sie zu?"
            value={answers.profile}
            onChange={(v) => setAnswers({ ...emptyAnswers, profile: v })}
            options={[
              { value: 'unternehmen', label: 'Unternehmen', hint: 'Besteht bereits' },
              { value: 'gruender', label: 'Gründung', hint: 'Ist geplant' },
              { value: 'privat', label: 'Privatperson', hint: 'Steuererklärung' },
            ]}
          />

          {!isPrivate && answers.profile && (
            <>
              <Choice<TeamSize>
                legend="2. Wie gross ist Ihr Team?"
                value={answers.teamSize}
                onChange={(v) => set('teamSize', v)}
                options={[
                  { value: 'solo', label: '0 bis 3 Personen' },
                  { value: 'klein', label: '4 bis 15 Personen' },
                  { value: 'mittel', label: '16 bis 40 Personen' },
                  { value: 'gross', label: 'Mehr als 40' },
                ]}
              />

              <Choice<boolean>
                legend="3. Brauchen Sie eine Lohnadministration?"
                value={answers.payroll}
                onChange={(v) => set('payroll', v)}
                options={[
                  { value: true, label: 'Ja', hint: 'Löhne werden abgerechnet' },
                  { value: false, label: 'Nein', hint: 'Aktuell keine Löhne' },
                ]}
              />

              <Choice<SupportLevel>
                legend="4. Wie viel Begleitung wünschen Sie?"
                value={answers.support}
                onChange={(v) => set('support', v)}
                options={[
                  { value: 'basis', label: 'Basis', hint: 'Buchhaltung, MWST, Abschluss' },
                  { value: 'reporting', label: 'Mit Reporting', hint: 'Zahlen unterjährig' },
                  { value: 'begleitung', label: 'Enge Begleitung', hint: 'Planung und Gespräche' },
                ]}
              />
            </>
          )}
        </div>

        {answers.profile && (
          <button
            type="button"
            onClick={() => setAnswers(emptyAnswers)}
            className="mt-9 inline-flex items-center gap-2 text-[0.9rem] text-ink-soft transition-colors hover:text-navy"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Von vorne beginnen
          </button>
        )}
      </div>

      {/* Ergebnis */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-card border border-line bg-shell p-7">
            {result ? (
              <>
                <p className="label">Unsere Empfehlung</p>
                <h3 className="mt-4 font-display text-[1.5rem] font-medium text-navy">
                  {result.name}
                </h3>
                <p className="mt-5 font-display text-[2.2rem] leading-none text-blue">
                  {result.price}
                </p>
                <p className="mt-1.5 text-[0.85rem] text-ink-light">{result.priceNote}</p>

                <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft">
                  {result.explanation}
                </p>

                {result.note && (
                  <p className="mt-4 border-l-2 border-sky pl-4 text-[0.88rem] leading-relaxed text-ink-soft">
                    {result.note}
                  </p>
                )}

                <div className="mt-7 flex flex-col gap-3">
                  {result.cardId && (
                    <Link href={`/pakete#${result.cardId}`} className="btn-outline">
                      Details ansehen
                    </Link>
                  )}
                  <Link href="/kontakt" className="btn-primary">
                    Erstgespräch vereinbaren
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>

                <p className="mt-6 text-[0.78rem] leading-relaxed text-ink-light">
                  Unverbindliche Orientierung, keine Offerte. Alle Preise exklusive MWST. Den
                  definitiven Preis legen wir nach einem kurzen Gespräch fest.
                </p>
              </>
            ) : (
              <>
                <p className="label">Ihre Empfehlung</p>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  Beantworten Sie die Fragen links. Sobald alles ausgefüllt ist, erscheint hier ein
                  passendes Paket mit Ab-Preis.
                </p>
                <p className="mt-5 text-[0.85rem] text-ink-light">
                  Dauert weniger als zwei Minuten. Es werden keine Daten übermittelt.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
