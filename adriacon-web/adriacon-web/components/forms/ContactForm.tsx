'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { callbackOptions, contactSchema, topicOptions } from '@/lib/contactSchema';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const payload = {
      name: String(form.get('name') ?? ''),
      company: String(form.get('company') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      topic: String(form.get('topic') ?? ''),
      message: String(form.get('message') ?? ''),
      preferredContact: String(form.get('preferredContact') ?? 'egal'),
      callbackWindow: String(form.get('callbackWindow') ?? ''),
      consent: form.get('consent') === 'on',
      website: String(form.get('website') ?? ''),
      context: 'Kontaktformular',
    };

    // Clientseitige Validierung
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
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Die Anfrage konnte nicht gesendet werden.');
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
      <div className="border border-brand/30 bg-brand-mist/50 p-8">
        <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-deep">
          <Check className="h-4 w-4" aria-hidden="true" />
          Nachricht gesendet
        </p>
        <h3 className="mt-4 font-display text-[1.6rem] text-ink">Danke für Ihre Anfrage.</h3>
        <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-ink-muted">
          Wir melden uns innerhalb eines Arbeitstages. Wenn es eilt, erreichen Sie uns direkt unter
          +41 76 541 40 08.
        </p>
      </div>
    );
  }

  const err = (field: string) =>
    errors[field] ? (
      <p id={`${field}-error`} role="alert" className="mt-1.5 text-[0.78rem] text-bistre">
        {errors[field]}
      </p>
    ) : null;

  const inputProps = (field: string) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    className: `field ${errors[field] ? 'border-bistre' : ''}`,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website (bitte leer lassen)</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="contact-name">
            Name *
          </label>
          <input id="contact-name" name="name" autoComplete="name" {...inputProps('name')} />
          {err('name')}
        </div>

        <div>
          <label className="field-label" htmlFor="contact-company">
            Unternehmen
          </label>
          <input id="contact-company" name="company" autoComplete="organization" {...inputProps('company')} />
        </div>

        <div>
          <label className="field-label" htmlFor="contact-email">
            E-Mail *
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" {...inputProps('email')} />
          {err('email')}
        </div>

        <div>
          <label className="field-label" htmlFor="contact-phone">
            Telefon (optional)
          </label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" {...inputProps('phone')} />
        </div>

        <div>
          <label className="field-label" htmlFor="contact-topic">
            Anliegen
          </label>
          <select id="contact-topic" name="topic" defaultValue={topicOptions[0]} className="field">
            {topicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="contact-preferred">
            Gewünschte Kontaktart
          </label>
          <select id="contact-preferred" name="preferredContact" defaultValue="egal" className="field">
            <option value="egal">Egal</option>
            <option value="email">E-Mail</option>
            <option value="telefon">Telefon</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="contact-callback">
            Gewünschter Rückrufzeitraum
          </label>
          <select id="contact-callback" name="callbackWindow" defaultValue={callbackOptions[2]} className="field">
            {callbackOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="contact-message">
            Nachricht *
          </label>
          <textarea id="contact-message" name="message" rows={5} {...inputProps('message')} />
          {err('message')}
        </div>
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-[0.82rem] leading-relaxed text-ink-muted">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#14405F]" />
          <span>
            Ich bin damit einverstanden, dass Adriacon meine Angaben zur Bearbeitung dieser Anfrage
            speichert und verwendet. Es erfolgt keine Weitergabe an Dritte zu Werbezwecken. Details in
            der <a href="/datenschutz" className="underline underline-offset-2">Datenschutzerklärung</a>.
          </span>
        </label>
        {err('consent')}
      </div>

      {serverError && (
        <p role="alert" className="mt-5 border-l-2 border-bistre pl-3 text-sm text-ink">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-7 disabled:opacity-60">
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
