'use client';

import { useId } from 'react';
import { Minus, Plus, Check } from 'lucide-react';
import { InfoHint } from '@/components/ui/InfoHint';

export function FieldShell({
  label,
  hint,
  help,
  children,
}: {
  label: string;
  hint?: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 flex items-center text-[0.95rem] font-medium text-ink">
        {label}
        {hint && <InfoHint label={label} text={hint} />}
      </legend>
      {help && <p className="-mt-1 mb-3 text-[0.82rem] leading-relaxed text-ink-muted">{help}</p>}
      {children}
    </fieldset>
  );
}

export function ChoiceGroup<T extends string | number | boolean>({
  options,
  value,
  onChange,
  columns = 2,
  name,
}: {
  options: Array<{ value: T; label: string; description?: string }>;
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3;
  name: string;
}) {
  const cols = columns === 1 ? 'grid-cols-1' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
  return (
    <div role="radiogroup" aria-label={name} className={`grid grid-cols-1 gap-2.5 ${cols}`}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`choice ${active ? 'choice-active' : ''}`}
          >
            <span className="flex w-full items-start justify-between gap-3">
              <span className="text-[0.92rem] font-medium leading-snug text-ink">{option.label}</span>
              {active && <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" aria-hidden="true" />}
            </span>
            {option.description && (
              <span className="text-[0.78rem] leading-relaxed text-ink-muted">{option.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function MultiChoice<T extends string>({
  options,
  values,
  onToggle,
  name,
}: {
  options: Array<{ value: T; label: string }>;
  values: T[];
  onToggle: (v: T) => void;
  name: string;
}) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(option.value)}
            className={`inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-[0.85rem] transition-colors ${
              active
                ? 'border-brand-deep bg-brand-deep text-paper'
                : 'border-ink/15 bg-white text-ink hover:border-brand'
            }`}
          >
            {active && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  label,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  suffix?: string;
}) {
  const id = useId();
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={`${label} verringern`}
        onClick={() => onChange(clamp(value - step))}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-ink/15 bg-white text-ink transition-colors hover:border-brand-deep disabled:opacity-40"
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="relative flex-1">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          max={max}
          step={step}
          aria-label={label}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
          className="field tabular text-center"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[0.7rem] text-ink-muted">
            {suffix}
          </span>
        )}
      </div>
      <button
        type="button"
        aria-label={`${label} erhöhen`}
        onClick={() => onChange(clamp(value + step))}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-ink/15 bg-white text-ink transition-colors hover:border-brand-deep disabled:opacity-40"
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step,
  label,
  format,
  marks,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  format: (v: number) => string;
  marks?: number[];
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <span className="font-mono text-[1.35rem] text-brand-deep tabular">{format(value)}</span>
        {marks && (
          <span className="font-mono text-[0.68rem] text-ink-muted">
            {format(min)} – {format(max)}
          </span>
        )}
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-9 w-full cursor-pointer appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:h-[3px] [&::-webkit-slider-runnable-track]:rounded-full
          [&::-moz-range-track]:h-[3px] [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-ink/15
          [&::-webkit-slider-thumb]:mt-[-9px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand-deep
          [&::-webkit-slider-thumb]:bg-paper
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand-deep [&::-moz-range-thumb]:bg-paper"
        style={{
          // Kurslinie als Fortschritt im Regler
          backgroundImage: `linear-gradient(to right, #14405F 0%, #14405F ${pct}%, rgba(10,31,48,.15) ${pct}%, rgba(10,31,48,.15) 100%)`,
          backgroundSize: '100% 3px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}

export function ToggleRow({
  label,
  hint,
  value,
  onChange,
  yesLabel = 'Ja',
  noLabel = 'Nein',
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bistre/20 py-4 last:border-0">
      <span className="flex items-center text-[0.95rem] text-ink">
        {label}
        {hint && <InfoHint label={label} text={hint} />}
      </span>
      <div className="inline-flex overflow-hidden rounded-card border border-ink/15">
        {[
          { v: true, l: yesLabel },
          { v: false, l: noLabel },
        ].map((o) => (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={value === o.v}
            onClick={() => onChange(o.v)}
            className={`px-5 py-2 text-[0.85rem] transition-colors ${
              value === o.v ? 'bg-brand-deep text-paper' : 'bg-white text-ink-muted hover:text-ink'
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
