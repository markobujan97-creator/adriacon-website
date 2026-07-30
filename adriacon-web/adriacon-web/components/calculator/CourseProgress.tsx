'use client';

/** Sichtbarer Kurs durch den Rechner: Etappen als Wegpunkte auf einer Linie. */
export function CourseProgress({
  steps,
  current,
  onJump,
}: {
  steps: string[];
  current: number;
  onJump: (index: number) => void;
}) {
  const pct = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 0;

  return (
    <div className="no-print">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">
          Etappe {String(current + 1).padStart(2, '0')} von {String(steps.length).padStart(2, '0')}
        </p>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand-deep">
          {steps[current]}
        </p>
      </div>

      <div className="relative mt-4 h-8">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/12" aria-hidden="true" />
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-brand-deep transition-[width] duration-500 ease-course"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
        <ol className="relative flex justify-between">
          {steps.map((label, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <li key={label} className="flex">
                <button
                  type="button"
                  onClick={() => i <= current && onJump(i)}
                  disabled={i > current}
                  aria-current={active ? 'step' : undefined}
                  aria-label={`Etappe ${i + 1}: ${label}`}
                  title={label}
                  className={`mt-[9px] block h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ease-course ${
                    active
                      ? 'scale-125 border-brand-deep bg-brand-deep'
                      : done
                        ? 'border-brand-deep bg-paper hover:scale-110'
                        : 'border-ink/25 bg-paper'
                  } ${i > current ? 'cursor-default' : 'cursor-pointer'}`}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
