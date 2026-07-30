'use client';

import { AlertTriangle, Clock, FileDown, MessageSquare, RotateCcw, Sparkles } from 'lucide-react';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { formatChf, formatChfMonthly } from '@/lib/format';
import { packageDetails, priceDisclaimer, pricingConfig } from '@/config/pricing';
import type { CourseAnswers, PriceResult } from '@/types';

export function ResultPanel({
  result,
  answers,
  onRestart,
  onRequestTalk,
}: {
  result: PriceResult;
  answers: CourseAnswers;
  onRestart: () => void;
  onRequestTalk: () => void;
}) {
  const details = result.packageId ? packageDetails[result.packageId] : null;

  return (
    <div className="print-block">
      {/* Kopf */}
      <div className="border-b border-bistre/25 pb-8">
        <p className="eyebrow">Ihre unverbindliche Orientierung</p>

        {result.packageName ? (
          <>
            <h3 className="mt-4 font-display text-[2rem] leading-tight text-ink">{result.packageName}</h3>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-sm text-ink-muted">CHF</span>
              <AnimatedNumber value={result.monthlyEstimate} className="font-display text-[3.4rem] leading-none text-brand-deep" />
              <span className="font-mono text-sm text-ink-muted">/Mt.</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Preise exklusive MWST. Orientierungswert, keine Offerte.
            </p>
          </>
        ) : (
          <>
            <h3 className="mt-4 font-display text-[2rem] leading-tight text-ink">
              Persönliche Einschätzung
            </h3>
            <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-ink-muted">
              Für Ihre Situation legen wir den Preis nach einem kurzen Gespräch fest. Für Privatpersonen
              gibt es keine Paketpreise – der Aufwand hängt stark von Ihren Unterlagen ab.
            </p>
          </>
        )}
      </div>

      {/* Persönliche Offerte */}
      {result.needsPersonalQuote && (
        <div className="mt-6 border-l-2 border-bistre bg-bistre/[0.06] p-5">
          <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-bistre">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Persönliche Offerte empfohlen
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
            {result.quoteReasons.map((reason) => (
              <li key={reason}>— {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CFO-Hinweis */}
      {result.cfoNote && (
        <div className="mt-6 border-l-2 border-brand-deep bg-brand-mist/60 p-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-deep">
            Hinweis zur CFO-Begleitung
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{result.cfoNote}</p>
        </div>
      )}

      {/* Aufschlüsselung */}
      {result.lineItems.length > 0 && (
        <div className="mt-8">
          <h4 className="eyebrow">Aufschlüsselung</h4>
          <dl className="mt-4 divide-y divide-bistre/20">
            {result.lineItems.map((item) => (
              <div key={item.key} className="flex items-baseline justify-between gap-6 py-3">
                <dt>
                  <span className={`text-[0.95rem] ${item.isBase ? 'font-medium text-ink' : 'text-ink'}`}>
                    {item.label}
                  </span>
                  {item.detail && (
                    <span className="mt-0.5 block text-[0.78rem] leading-relaxed text-ink-muted">
                      {item.detail}
                    </span>
                  )}
                </dt>
                <dd className="shrink-0 font-mono text-[0.95rem] text-ink tabular">
                  {formatChf(item.amount)}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 border-t-2 !border-t-ink pt-4">
              <dt className="font-medium text-ink">Unverbindliche Orientierung</dt>
              <dd className="shrink-0 font-mono text-[1.1rem] font-medium text-brand-deep tabular">
                {formatChfMonthly(result.monthlyEstimate)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Gründung */}
      {result.incorporationFee !== null && (
        <div className="mt-8 border border-ink/12 p-5">
          <h4 className="eyebrow">Einmalig: Firmengründung</h4>
          <p className="mt-3 flex items-baseline justify-between gap-4">
            <span className="text-[0.95rem] text-ink">
              {answers.wantsOngoingMandate
                ? 'Gründung mit gleichzeitigem laufendem Mandat'
                : 'Gründung ohne laufendes Mandat'}
            </span>
            <span className="font-mono text-[1.05rem] text-brand-deep tabular">
              {formatChf(result.incorporationFee)}
            </span>
          </p>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-muted">
            Notariatskosten und Handelsregistergebühren sind nicht enthalten.
          </p>
        </div>
      )}

      {/* Digitalisierungsvergleich */}
      {result.packageId && (
        <div className="mt-8 border border-brand/25 bg-brand-mist/40 p-5">
          <h4 className="eyebrow text-brand-deep">Digitalisierungsvorteil</h4>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-[0.78rem] text-ink-muted">Digitaler Belegfluss</dt>
              <dd className="mt-1 font-mono text-[1.05rem] text-ink tabular">
                {formatChfMonthly(result.monthlyDigital)}
              </dd>
            </div>
            <div>
              <dt className="text-[0.78rem] text-ink-muted">Mit Papierbelegen</dt>
              <dd className="mt-1 font-mono text-[1.05rem] text-ink-muted tabular">
                {formatChfMonthly(result.monthlyWithPaper)}
              </dd>
            </div>
            <div>
              <dt className="text-[0.78rem] text-ink-muted">Vorteil pro Monat</dt>
              <dd className="mt-1 font-mono text-[1.05rem] text-brand-deep tabular">
                {formatChfMonthly(result.digitalAdvantage)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Entlastung */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border-t border-bistre/25 pt-4">
          <p className="flex items-center gap-2 eyebrow">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            Geschätzte Entlastung
          </p>
          <p className="mt-2 font-display text-[1.6rem] text-ink">
            rund {result.estimatedHoursSaved} Std./Monat
          </p>
          <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-muted">
            Grobe, unverbindliche Schätzung der Zeit, die heute für diese Arbeiten anfällt.
          </p>
        </div>
        <div className="border-t border-bistre/25 pt-4">
          <p className="flex items-center gap-2 eyebrow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Stundensatz für Zusatzarbeiten
          </p>
          <p className="mt-2 font-display text-[1.6rem] text-ink">
            {formatChf(pricingConfig.generalHourlyRate)}/Std.
          </p>
          <p className="mt-1 text-[0.78rem] leading-relaxed text-ink-muted">
            Für Arbeiten ausserhalb des vereinbarten Leistungsumfangs.
          </p>
        </div>
      </div>

      {/* Enthaltene Leistungen */}
      {details && (
        <div className="mt-8">
          <h4 className="eyebrow">Im Paket enthalten</h4>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {details.includes.map((inc) => (
              <li key={inc} className="flex gap-2 text-[0.9rem] text-ink">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {inc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hinweise */}
      {result.hints.length > 0 && (
        <ul className="mt-8 space-y-3">
          {result.hints.map((hint) => (
            <li key={hint} className="border-l border-brand/40 pl-4 text-[0.88rem] leading-relaxed text-ink-muted">
              {hint}
            </li>
          ))}
        </ul>
      )}

      {/* Nächste Schritte */}
      <div className="mt-8">
        <h4 className="eyebrow">Drei nächste Schritte</h4>
        <ol className="mt-4 space-y-3">
          {result.nextSteps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span className="font-mono text-[0.7rem] text-bistre tabular">{`0${i + 1}`}</span>
              <span className="text-[0.92rem] leading-relaxed text-ink">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-8 border-t border-bistre/25 pt-5 text-[0.8rem] leading-relaxed text-ink-muted">
        {priceDisclaimer}
      </p>

      <div className="no-print mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={onRequestTalk} className="btn-primary">
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          Empfehlung unverbindlich besprechen
        </button>
        <button type="button" onClick={() => window.print()} className="btn-secondary">
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Als PDF sichern
        </button>
        <button type="button" onClick={onRestart} className="btn-secondary">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Neu berechnen
        </button>
      </div>
    </div>
  );
}
