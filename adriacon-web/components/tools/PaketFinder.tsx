'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Download, RotateCcw, Smartphone } from 'lucide-react';
import { emptyAnswers, recommend } from '@/lib/recommendPackage';
import type { FinderAnswers, SupportLevel, TeamSize, Track } from '@/types';
import type { TaxOfferId } from '@/config/pricing';
import { mySteuerhelfer } from '@/config/site';

function Choice<T extends string | boolean>({
  legend,
  options,
  value,
  onChange,
  columns = 3,
}: {
  legend: string;
  options: Array<{ value: T; label: string; hint?: string }>;
  value: T | null;
  onChange: (v: T) => void;
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3';
  return (
    <fieldset>
      <legend className="font-display text-[1.05rem] font-medium text-navy">{legend}</legend>
      <div role="radiogroup" aria-label={legend} className={`mt-4 grid grid-cols-1 gap-2.5 ${cols}`}>
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
                active ? 'border-blue bg-sky-pale' : 'border-line bg-white hover:border-sky'
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

  const isBusiness = answers.track === 'unternehmen';
  const isTax = answers.track === 'steuererklaerung';

  const answered =
    (answers.track ? 1 : 0) +
    (isBusiness
      ? (answers.teamSize ? 1 : 0) + (answers.payroll !== null ? 1 : 0) + (answers.support ? 1 : 0)
      : isTax
        ? answers.taxSituation
          ? 1
          : 0
        : 0);
  const total = isBusiness ? 4 : isTax ? 2 : 1;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[3px] flex-1 overflow-hidden rounded bg-line">
            <div
              className="h-full bg-sky transition-[width] duration-500 ease-calm"
              style={{ width: `${(answered / total) * 100}%` }}
            />
          </div>
          <span className="text-[0.82rem] text-ink-light tabular">
            {answered} von {total}
          </span>
        </div>

        <div className="space-y-9">
          <Choice<Track>
            legend="1. Suchen Sie Unterstützung für ein Unternehmen oder für Ihre private Steuererklärung?"
            value={answers.track}
            onChange={(v) => setAnswers({ ...emptyAnswers, track: v })}
            options={[
              { value: 'unternehmen', label: 'Unternehmen', hint: 'Besteht bereits' },
              { value: 'gruendung', label: 'Gründung', hint: 'Ist geplant' },
              { value: 'steuererklaerung', label: 'Private Steuererklärung', hint: 'Für mich privat' },
            ]}
          />

          {isTax && (
            <Choice<TaxOfferId>
              legend="2. Was trifft auf Sie zu?"
              columns={4}
              value={answers.taxSituation}
              onChange={(v) => set('taxSituation', v)}
              options={[
                { value: 'privat', label: 'Privatperson' },
                { value: 'paar', label: 'Paar / Ehepaar' },
                { value: 'selbststaendig', label: 'Selbstständig' },
                { value: 'studierend', label: 'Studierend' },
              ]}
            />
          )}

          {isBusiness && (
            <>
              <Choice<TeamSize>
                legend="2. Wie gross ist Ihr Team?"
                columns={2}
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
                columns={2}
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

        {answers.track && (
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
                <p className="label">
                  {result.kind === 'tax' ? 'Ihr Angebot' : 'Unsere Empfehlung'}
                </p>
                <h3 className="mt-4 font-display text-[1.4rem] font-medium leading-snug text-navy">
                  {result.name}
                </h3>
                <p className="mt-5 font-display text-[2.2rem] leading-none text-blue">
                  {result.price}
                </p>
                <p className="mt-1.5 text-[0.85rem] text-ink-light">{result.priceNote}</p>
                <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft">
                  {result.explanation}
                </p>

                {result.kind === 'business' && result.note && (
                  <p className="mt-4 border-l-2 border-sky pl-4 text-[0.88rem] leading-relaxed text-ink-soft">
                    {result.note}
                  </p>
                )}

                <div className="mt-7 flex flex-col gap-3">
                  {result.kind === 'tax' ? (
                    <>
                      {/* Führt direkt in die Webversion von MySteuerhelfer */}
                      <a
                        href={mySteuerhelfer.webAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <Smartphone className="h-4 w-4" aria-hidden="true" />
                        Unterlagen jetzt einreichen
                      </a>
                      <a
                        href="/downloads/adriacon-checkliste-steuererklaerung.pdf"
                        download
                        className="btn-outline"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Checkliste herunterladen
                      </a>
                      <Link href="/steuererklaerungen" className="btn-outline">
                        Alles zur Steuererklärung
                      </Link>
                    </>
                  ) : (
                    <>
                      {result.cardId && (
                        <Link href={`/pakete#${result.cardId}`} className="btn-outline">
                          Details ansehen
                        </Link>
                      )}
                      <Link href="/kontakt" className="btn-primary">
                        Erstgespräch vereinbaren
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </>
                  )}
                </div>

                <p className="mt-6 text-[0.78rem] leading-relaxed text-ink-light">
                  {result.kind === 'tax'
                    ? 'Pauschalpreis pro Steuerjahr. Bei aussergewöhnlich komplexen Verhältnissen informieren wir Sie vorab über allfällige Mehrkosten.'
                    : 'Unverbindliche Orientierung, keine Offerte. Den definitiven Preis legen wir nach einem kurzen Gespräch fest. Es fällt keine MWST an.'}
                </p>
              </>
            ) : (
              <>
                <p className="label">Ihr Ergebnis</p>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  Beantworten Sie die Fragen links. Sobald alles ausgefüllt ist, erscheint hier ein
                  passendes Angebot mit Preis.
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
