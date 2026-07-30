'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { RadarChart } from './RadarChart';
import { defaultRadarScores, evaluateRadar, radarDimensions } from '@/lib/radar';
import type { RadarKey } from '@/types';

const SCALE_LABELS = ['1', '2', '3', '4', '5'];

export function BusinessRadar() {
  const [scores, setScores] = useState<Record<RadarKey, number>>(defaultRadarScores);
  const [touched, setTouched] = useState(false);
  const [focus, setFocus] = useState<RadarKey | null>(null);

  const result = useMemo(() => evaluateRadar(scores), [scores]);

  const setScore = (key: RadarKey, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
    setTouched(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Eingabe */}
      <div className="lg:col-span-6">
        <p className="text-sm leading-relaxed text-ink-muted">
          Zehn Fragen, Skala 1 bis 5. 1 bedeutet: hier drückt der Schuh. 5 bedeutet: läuft.
        </p>

        <ul className="mt-8 space-y-7">
          {radarDimensions.map((dimension) => (
            <li
              key={dimension.key}
              onMouseEnter={() => setFocus(dimension.key)}
              onMouseLeave={() => setFocus(null)}
            >
              <fieldset>
                <legend className="text-[0.95rem] font-medium text-ink">{dimension.question}</legend>
                <div className="mt-3 flex items-center gap-2" role="radiogroup" aria-label={dimension.label}>
                  {SCALE_LABELS.map((label, i) => {
                    const value = i + 1;
                    const active = scores[dimension.key] === value;
                    return (
                      <button
                        key={label}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={`${dimension.label}: ${value} von 5`}
                        onClick={() => setScore(dimension.key, value)}
                        onFocus={() => setFocus(dimension.key)}
                        onBlur={() => setFocus(null)}
                        className={`h-10 flex-1 rounded-card border font-mono text-[0.8rem] transition-all duration-200 ease-course ${
                          active
                            ? 'border-brand-deep bg-brand-deep text-paper'
                            : 'border-ink/15 bg-white text-ink-muted hover:border-brand'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 flex justify-between text-[0.72rem] text-ink-muted">
                  <span>{dimension.low}</span>
                  <span className="text-right">{dimension.high}</span>
                </p>
              </fieldset>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            setScores(defaultRadarScores);
            setTouched(false);
          }}
          className="btn-secondary mt-8"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Einschätzung zurücksetzen
        </button>
      </div>

      {/* Auswertung */}
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">
          <div className="border border-ink/12 bg-white p-6 shadow-lift sm:p-8">
            <div className="flex justify-center">
              <RadarChart scores={scores} highlight={focus} />
            </div>

            <div className="mt-6 grid gap-4 border-t border-bistre/25 pt-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Digitalisierungsgrad</p>
                <p className="mt-2 font-display text-[1.8rem] text-ink tabular">{result.digitalScore} %</p>
              </div>
              <div>
                <p className="eyebrow">Administrationsdruck</p>
                <p className="mt-2 font-display text-[1.8rem] text-ink tabular">{result.adminPressure} %</p>
              </div>
            </div>

            {touched ? (
              <div className="mt-7 space-y-6 border-t border-bistre/25 pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="eyebrow text-brand-deep">Stärkster Bereich</p>
                    <p className="mt-2 text-[0.95rem] font-medium text-ink">{result.strongest.label}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-bistre">Grösster Handlungsbedarf</p>
                    <p className="mt-2 text-[0.95rem] font-medium text-ink">{result.weakest.label}</p>
                  </div>
                </div>

                <div>
                  <p className="eyebrow">Drei priorisierte Empfehlungen</p>
                  <ol className="mt-4 space-y-4">
                    {result.recommendations.map((item, i) => (
                      <li key={item.dimension.key} className="flex gap-4">
                        <span className="font-mono text-[0.7rem] text-bistre tabular">{`0${i + 1}`}</span>
                        <span>
                          <span className="block text-[0.92rem] font-medium text-ink">
                            {item.dimension.label}
                          </span>
                          <span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-muted">
                            {item.dimension.recommendation}
                          </span>
                          <span className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-brand-deep">
                            Passende Leistung: {item.dimension.service}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <a href="#kontakt" className="btn-primary w-full sm:w-auto">
                  Einschätzung besprechen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            ) : (
              <p className="mt-7 border-t border-bistre/25 pt-6 text-sm leading-relaxed text-ink-muted">
                Beantworten Sie die Fragen links. Die Auswertung erscheint hier, sobald Sie den ersten
                Wert gesetzt haben.
              </p>
            )}

            <p className="mt-7 border-t border-bistre/25 pt-5 text-[0.78rem] leading-relaxed text-ink-muted">
              Der Business Radar ist eine Selbsteinschätzung, keine Unternehmens-, Bonitäts- oder
              Risikobewertung und keine Rechts- oder Steuerberatung. Die Auswertung basiert
              ausschliesslich auf Ihren eigenen Angaben und dient als Gesprächsgrundlage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
