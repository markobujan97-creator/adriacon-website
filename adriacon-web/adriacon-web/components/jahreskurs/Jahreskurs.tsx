'use client';

import { useEffect, useMemo, useState } from 'react';
import { buildYearCourse, yearCourseCategories, yearCourseDisclaimer } from '@/lib/jahreskurs';
import { cantons, monthNames, monthShort } from '@/lib/format';
import type { VatMethod, YearCourseInput } from '@/types';

const SIZE = 400;
const C = SIZE / 2;
const R_OUT = 172;
const R_IN = 118;

function polar(radius: number, monthIndex: number, offset = 0.5) {
  const angle = ((monthIndex + offset) / 12) * Math.PI * 2 - Math.PI / 2;
  return { x: C + Math.cos(angle) * radius, y: C + Math.sin(angle) * radius };
}

function segmentPath(monthIndex: number) {
  const a0 = (monthIndex / 12) * Math.PI * 2 - Math.PI / 2;
  const a1 = ((monthIndex + 1) / 12) * Math.PI * 2 - Math.PI / 2;
  const p = (r: number, a: number) => `${(C + Math.cos(a) * r).toFixed(2)},${(C + Math.sin(a) * r).toFixed(2)}`;
  return `M ${p(R_IN, a0)} L ${p(R_OUT, a0)} A ${R_OUT} ${R_OUT} 0 0 1 ${p(R_OUT, a1)} L ${p(R_IN, a1)} A ${R_IN} ${R_IN} 0 0 0 ${p(R_IN, a0)} Z`;
}

export function Jahreskurs() {
  const [input, setInput] = useState<YearCourseInput>({
    legalForm: 'gmbh',
    canton: 'Aargau',
    vatMethod: 'saldo',
    employees: 4,
    fiscalYearStartMonth: 0,
    hasPayroll: true,
  });
  // Bewusst mit 0 initialisiert: Server und Client rendern identisch.
  // Der aktuelle Monat wird erst nach dem Mounten gesetzt (keine Hydration-Abweichung).
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(new Date().getMonth());
  }, []);

  const entries = useMemo(() => buildYearCourse(input), [input]);
  const byMonth = useMemo(() => {
    const map = new Map<number, typeof entries>();
    for (const entry of entries) {
      map.set(entry.monthIndex, [...(map.get(entry.monthIndex) ?? []), entry]);
    }
    return map;
  }, [entries]);

  const set = <K extends keyof YearCourseInput>(key: K, value: YearCourseInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const selectedEntries = byMonth.get(selected) ?? [];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Eingaben */}
      <div className="lg:col-span-4">
        <div className="space-y-5">
          <div>
            <label className="field-label" htmlFor="jk-rechtsform">
              Rechtsform
            </label>
            <select
              id="jk-rechtsform"
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
            <label className="field-label" htmlFor="jk-kanton">
              Kanton
            </label>
            <select
              id="jk-kanton"
              className="field"
              value={input.canton}
              onChange={(e) => set('canton', e.target.value)}
            >
              {cantons.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="jk-mwst">
              MWST-Status
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
              <option value="unsure">Noch unsicher</option>
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="jk-mitarbeitende">
              Anzahl Mitarbeitende
            </label>
            <input
              id="jk-mitarbeitende"
              type="number"
              min={0}
              max={200}
              className="field tabular"
              value={input.employees}
              onChange={(e) => set('employees', Math.max(0, Number(e.target.value) || 0))}
            />
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

          <div className="flex items-center justify-between border-t border-bistre/25 pt-5">
            <span className="text-[0.95rem] text-ink">Lohnadministration</span>
            <div className="inline-flex overflow-hidden rounded-card border border-ink/15">
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
                    input.hasPayroll === o.v ? 'bg-brand-deep text-paper' : 'bg-white text-ink-muted'
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(yearCourseCategories).map(([key, cat]) => (
            <li key={key} className="flex items-center gap-2 text-[0.75rem] text-ink-muted">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: cat.color }}
                aria-hidden="true"
              />
              {cat.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Jahresrad */}
      <div className="lg:col-span-4">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto w-full max-w-[420px]"
          role="group"
          aria-label="Jahresrad mit administrativen Themen pro Monat"
        >
          {monthNames.map((month, i) => {
            const items = byMonth.get(i) ?? [];
            const active = selected === i;
            return (
              <g key={month}>
                <path
                  d={segmentPath(i)}
                  fill={active ? '#E7F1F8' : items.length ? 'rgba(143,201,238,.14)' : 'transparent'}
                  stroke={active ? '#14405F' : 'rgba(138,106,74,.25)'}
                  strokeWidth={active ? 1.5 : 1}
                  tabIndex={0}
                  role="button"
                  aria-label={`${month}: ${items.length} Themen`}
                  aria-pressed={active}
                  className="cursor-pointer outline-none transition-colors"
                  onClick={() => setSelected(i)}
                  onFocus={() => setSelected(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(i)}
                />
                {(() => {
                  const p = polar((R_IN + R_OUT) / 2, i);
                  return (
                    <text
                      x={p.x}
                      y={p.y + 3}
                      textAnchor="middle"
                      fontSize="10"
                      letterSpacing="0.8"
                      className={active ? 'fill-ink' : 'fill-ink-muted'}
                      pointerEvents="none"
                    >
                      {monthShort[i]}
                    </text>
                  );
                })()}

                {/* Themenmarker aussen */}
                {items.slice(0, 4).map((entry, k) => {
                  const p = polar(R_OUT + 12 + k * 9, i);
                  return (
                    <circle
                      key={entry.id}
                      cx={p.x}
                      cy={p.y}
                      r="3.2"
                      fill={yearCourseCategories[entry.category].color}
                      pointerEvents="none"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Geschäftsjahresmarke */}
          {(() => {
            const p = polar(R_IN - 10, input.fiscalYearStartMonth, 0);
            return (
              <g pointerEvents="none">
                <line x1={C} y1={C} x2={p.x} y2={p.y} stroke="#14405F" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx={p.x} cy={p.y} r="3" fill="#14405F" />
              </g>
            );
          })()}

          <text x={C} y={C - 8} textAnchor="middle" fontSize="10" letterSpacing="2" className="fill-ink-muted">
            GESCHÄFTSJAHR
          </text>
          <text x={C} y={C + 14} textAnchor="middle" fontSize="15" className="fill-ink">
            {monthNames[input.fiscalYearStartMonth]}
          </text>
        </svg>
      </div>

      {/* Themen des Monats */}
      <div className="lg:col-span-4">
        <div className="border-t-2 border-brand-deep bg-white p-6 shadow-lift">
          <p className="eyebrow">Themen im</p>
          <h3 className="mt-2 font-display text-[1.7rem] text-ink">{monthNames[selected]}</h3>

          {selectedEntries.length === 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              In diesem Monat stehen bei Ihrer Konstellation keine wiederkehrenden Themen an. Ein guter
              Moment, um Liegengebliebenes aufzuarbeiten.
            </p>
          ) : (
            <ul className="mt-5 space-y-5">
              {selectedEntries.map((entry) => (
                <li key={entry.id} className="border-l-2 pl-4" style={{ borderColor: yearCourseCategories[entry.category].color }}>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-muted">
                    {yearCourseCategories[entry.category].label}
                  </p>
                  <p className="mt-1.5 text-[0.98rem] font-medium text-ink">{entry.title}</p>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-muted">{entry.description}</p>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-7 border-t border-bistre/25 pt-5 text-[0.78rem] leading-relaxed text-ink-muted">
            {yearCourseDisclaimer}
          </p>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-muted">
            Kanton {input.canton}: Termine können abweichen
          </p>

          <a href="#kontakt" className="btn-secondary mt-6 w-full">
            Jahresplanung besprechen
          </a>
        </div>
      </div>
    </div>
  );
}
