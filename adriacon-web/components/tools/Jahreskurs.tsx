'use client';

import { useEffect, useMemo, useState } from 'react';
import { buildYearCourse, yearCourseCategories, yearCourseDisclaimer } from '@/lib/jahreskurs';
import { monthNames, monthShort } from '@/lib/format';
import type { VatMethod, YearCourseInput } from '@/types';

export function Jahreskurs() {
  const [input, setInput] = useState<YearCourseInput>({
    legalForm: 'gmbh',
    vatMethod: 'saldo',
    hasPayroll: true,
    fiscalYearStartMonth: 0,
  });
  // Erst nach dem Mounten auf den aktuellen Monat setzen – so bleibt der
  // Server-Render identisch mit dem ersten Client-Render.
  const [selected, setSelected] = useState(0);
  useEffect(() => setSelected(new Date().getMonth()), []);

  const entries = useMemo(() => buildYearCourse(input), [input]);
  const byMonth = useMemo(() => {
    const map = new Map<number, typeof entries>();
    for (const entry of entries) map.set(entry.monthIndex, [...(map.get(entry.monthIndex) ?? []), entry]);
    return map;
  }, [entries]);

  const set = <K extends keyof YearCourseInput>(key: K, value: YearCourseInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const selectedEntries = byMonth.get(selected) ?? [];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <div className="space-y-5">
          <div>
            <label className="field-label" htmlFor="jk-form">
              Rechtsform
            </label>
            <select
              id="jk-form"
              className="field"
              value={input.legalForm}
              onChange={(e) => set('legalForm', e.target.value as YearCourseInput['legalForm'])}
            >
              <option value="einzelfirma">Einzelfirma</option>
              <option value="gmbh">GmbH</option>
              <option value="ag">AG</option>
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="jk-mwst">
              Mehrwertsteuer
            </label>
            <select
              id="jk-mwst"
              className="field"
              value={input.vatMethod}
              onChange={(e) => set('vatMethod', e.target.value as VatMethod)}
            >
              <option value="none">Nicht MWST-pflichtig</option>
              <option value="saldo">Saldosteuersatz</option>
              <option value="effective">Effektive Methode</option>
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="jk-gj">
              Beginn des Geschäftsjahrs
            </label>
            <select
              id="jk-gj"
              className="field"
              value={input.fiscalYearStartMonth}
              onChange={(e) => set('fiscalYearStartMonth', Number(e.target.value))}
            >
              {monthNames.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[0.95rem] text-navy">Lohnadministration</span>
            <div className="inline-flex overflow-hidden rounded border border-line">
              {[
                { v: true, l: 'Ja' },
                { v: false, l: 'Nein' },
              ].map((o) => (
                <button
                  key={String(o.v)}
                  type="button"
                  aria-pressed={input.hasPayroll === o.v}
                  onClick={() => set('hasPayroll', o.v)}
                  className={`px-5 py-2 text-[0.85rem] transition-colors ${
                    input.hasPayroll === o.v ? 'bg-blue text-white' : 'bg-white text-ink-soft'
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zwölf Monate als ruhige Leiste */}
      <div className="lg:col-span-8">
        <ol className="grid grid-cols-6 gap-2 sm:grid-cols-12">
          {monthNames.map((month, i) => {
            const count = (byMonth.get(i) ?? []).length;
            const active = selected === i;
            return (
              <li key={month}>
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={active}
                  aria-label={`${month}, ${count} Themen`}
                  className={`flex w-full flex-col items-center gap-2 rounded border px-1 py-2.5 transition-colors duration-200 ease-calm ${
                    active ? 'border-blue bg-sky-pale' : 'border-line bg-white hover:border-sky'
                  }`}
                >
                  <span className={`text-[0.78rem] ${active ? 'text-navy' : 'text-ink-soft'}`}>
                    {monthShort[i]}
                  </span>
                  <span className="flex h-1.5 items-center gap-[3px]">
                    {Array.from({ length: Math.min(count, 3) }).map((_, k) => (
                      <span key={k} className="h-1.5 w-1.5 rounded-full bg-sky" />
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 rounded-card border border-line bg-white p-6 sm:p-8">
          <h3 className="font-display text-[1.4rem] font-medium text-navy">{monthNames[selected]}</h3>

          {selectedEntries.length === 0 ? (
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
              In diesem Monat stehen bei Ihrer Konstellation keine wiederkehrenden Themen an. Ein
              guter Moment, um Liegengebliebenes aufzuarbeiten.
            </p>
          ) : (
            <ul className="mt-5 space-y-5">
              {selectedEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="border-l-2 pl-4"
                  style={{ borderColor: yearCourseCategories[entry.category].color }}
                >
                  <p className="text-[0.75rem] uppercase tracking-[0.1em] text-ink-light">
                    {yearCourseCategories[entry.category].label}
                  </p>
                  <p className="mt-1.5 text-[1rem] font-medium text-navy">{entry.title}</p>
                  <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">
                    {entry.description}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-7 border-t border-line pt-5 text-[0.78rem] leading-relaxed text-ink-light">
            {yearCourseDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
