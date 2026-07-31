'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RadarChart } from './RadarChart';
import { defaultRadarScores, evaluateRadar, radarDimensions } from '@/lib/radar';
import type { RadarKey } from '@/types';

export function BusinessRadar() {
  const [scores, setScores] = useState<Record<RadarKey, number>>(defaultRadarScores);
  const [touched, setTouched] = useState(false);
  const result = useMemo(() => evaluateRadar(scores), [scores]);

  const setScore = (key: RadarKey, value: number) => {
    setScores((prev) => ({ ...prev, [key]: value }));
    setTouched(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <p className="text-[0.95rem] leading-relaxed text-ink-soft">
          Acht Fragen, Skala 1 bis 5. 1 heisst: hier drückt der Schuh. 5 heisst: läuft.
        </p>

        <ul className="mt-8 space-y-6">
          {radarDimensions.map((d) => (
            <li key={d.key}>
              <fieldset>
                <legend className="text-[0.95rem] text-navy">{d.question}</legend>
                <div className="mt-3 flex gap-2" role="radiogroup" aria-label={d.label}>
                  {[1, 2, 3, 4, 5].map((value) => {
                    const active = scores[d.key] === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        aria-label={`${d.label}: ${value} von 5`}
                        onClick={() => setScore(d.key, value)}
                        className={`h-10 flex-1 rounded border text-[0.85rem] transition-colors duration-200 ease-calm ${
                          active
                            ? 'border-blue bg-blue text-white'
                            : 'border-line bg-white text-ink-soft hover:border-sky'
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 flex justify-between text-[0.75rem] text-ink-light">
                  <span>{d.low}</span>
                  <span>{d.high}</span>
                </p>
              </fieldset>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-card border border-line bg-white p-6 sm:p-8">
            <div className="flex justify-center">
              <RadarChart scores={scores} />
            </div>

            {touched ? (
              <div className="mt-6 border-t border-line pt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="label">Stärkster Bereich</p>
                    <p className="mt-2 text-[0.95rem] font-medium text-navy">
                      {result.strongest.label}
                    </p>
                  </div>
                  <div>
                    <p className="label">Grösster Handlungsbedarf</p>
                    <p className="mt-2 text-[0.95rem] font-medium text-navy">
                      {result.weakest.label}
                    </p>
                  </div>
                </div>

                <p className="label mt-7">Drei nächste Schritte</p>
                <ol className="mt-3 space-y-4">
                  {result.recommendations.map((item, i) => (
                    <li key={item.dimension.key} className="flex gap-3">
                      <span className="mt-0.5 font-display text-[0.85rem] text-blue tabular">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[0.92rem] leading-relaxed text-ink">
                          {item.dimension.recommendation}
                        </span>
                        <span className="mt-1 block text-[0.8rem] text-ink-light">
                          Passende Leistung: {item.dimension.service}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>

                <Link href="/kontakt" className="btn-primary mt-7 w-full">
                  Einschätzung besprechen
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <p className="mt-6 border-t border-line pt-6 text-[0.95rem] leading-relaxed text-ink-soft">
                Beantworten Sie die Fragen links. Die Auswertung erscheint hier, sobald Sie den ersten
                Wert setzen.
              </p>
            )}

            <p className="mt-6 border-t border-line pt-5 text-[0.78rem] leading-relaxed text-ink-light">
              Selbsteinschätzung als Gesprächsgrundlage. Keine Unternehmens-, Bonitäts- oder
              Risikobewertung und keine Rechts- oder Steuerberatung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
