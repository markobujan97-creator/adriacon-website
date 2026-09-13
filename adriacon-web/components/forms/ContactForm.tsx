'use client';

import { useState, type FormEvent } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { contactSchema, topicOptions } from '@/lib/contactSchema';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  /** false, wenn die Anfrage entgegengenommen, aber keine E-Mail versendet wurde. */
  const [delivered, setDelivered] = useState(true);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Mehrfaches Absenden während eines laufenden Requests verhindern
    if (status === 'sending') return;

    const form = new FormData(event.currentTarget);

    const payload = {
      name: String(form.get('name') ?? ''),
      company: String(form.get('company') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      topic: String(form.get('topic') ?? ''),
      message: String(form.get('message') ?? ''),
      consent: form.get('consent') === 'on',
      website: String(form.get('website') ?? ''),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus('error');
      setServerError(null);
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus('sending');

    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ??
            'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
        );
      }

      setDelivered(data?.delivered !== false);
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setServerError(
        e instanceof Error
          ? e.message
          : 'Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an info@adriacon.ch.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-card border border-sky bg-sky-pale p-8">
        <p className="flex items-center gap-2 text-[0.85rem] font-medium text-blue-deep">
          <Check className="h-4 w-4" aria-hidden="true" />
          Nachricht gesendet
        </p>
        <h2 className="mt-4 font-display text-[1.5rem] font-medium text-navy">
          Danke für Ihre Anfrage.
        </h2>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
          Wir melden uns innerhalb eines Arbeitstages. Wenn es eilt, erreichen Sie uns direkt unter
          +41 76 541 40 08.
        </p>
        {!delivered && (
          <p className="mt-4 border-t border-sky pt-4 text-[0.88rem] leading-relaxed text-ink-soft">
            Hinweis: Der E-Mail-Versand ist auf diesem Server noch nicht eingerichtet. Bitte
            schreiben Sie uns zur Sicherheit direkt an{' '}
            <a href="mailto:info@adriacon.ch" className="underline underline-offset-2">
              info@adriacon.ch
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  const err = (field: string) =>
    errors[field] ? (
      <p id={`${field}-error`} role="alert" className="mt-1.5 text-[0.8rem] text-blue-deep">
        {errors[field]}
      </p>
    ) : null;

  const props = (field: string) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    className: `field ${errors[field] ? 'border-blue' : ''}`,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="hp-website">Website (bitte leer lassen)</label>
        <input id="hp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">
            Name *
          </label>
          <input id="name" name="name" autoComplete="name" {...props('name')} />
          {err('name')}
        </div>

        <div>
          <label className="field-label" htmlFor="company">
            Unternehmen
          </label>
          <input id="company" name="company" autoComplete="organization" {...props('company')} />
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            E-Mail *
          </label>
          <input id="email" name="email" type="email" autoComplete="email" {...props('email')} />
          {err('email')}
        </div>

        <div>
          <label className="field-label" htmlFor="phone">
            Telefon
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" {...props('phone')} />
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="topic">
            Anliegen
          </label>
          <select id="topic" name="topic" defaultValue={topicOptions[0]} className="field">
            {topicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="message">
            Nachricht *
          </label>
          <textarea id="message" name="message" rows={5} {...props('message')} />
          {err('message')}
        </div>
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-[0.85rem] leading-relaxed text-ink-soft">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[#3884C3]" />
          <span>
            Ich bin damit einverstanden, dass Adriacon meine Angaben zur Bearbeitung dieser Anfrage
            verwendet. Details in der{' '}
            <a href="/datenschutz" className="underline underline-offset-2">
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>
        {err('consent')}
      </div>

      <div aria-live="polite">
        {serverError && (
          <p role="alert" className="mt-5 border-l-2 border-blue pl-3 text-[0.9rem] text-ink">
            {serverError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
        className="btn-primary mt-7 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {status === 'sending' ? 'Wird gesendet' : 'Anfrage senden'}
      </button>
    </form>
  );
}
