'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { callbackOptions } from '@/lib/contactSchema';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function LeadForm({
  context,
  summary,
  title,
  description,
}: {
  context: string;
  summary: string;
  title: string;
  description: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    setError(null);

    const payload = {
      name: String(form.get('name') ?? ''),
      company: String(form.get('company') ?? ''),
      email: String(form.get('email') ?? ''),
      phone: String(form.get('phone') ?? ''),
      message: String(form.get('message') ?? '') || 'Anfrage über den Kursfinder.',
      callbackWindow: String(form.get('callbackWindow') ?? ''),
      preferredContact: 'egal' as const,
      consent: form.get('consent') === 'on',
      website: String(form.get('website') ?? ''),
      context,
      summary,
    };

    try {
      const response = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message ?? 'Die Anfrage konnte nicht gesendet werden.');
      setStatus('success');
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Die Anfrage konnte nicht gesendet werden.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-l-2 border-brand-deep bg-brand-mist/50 p-6">
        <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brand-deep">
          <Check className="h-4 w-4" aria-hidden="true" />
          Anfrage gesendet
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">
          Danke. Wir melden uns innerhalb eines Arbeitstages – mit Ihrer Kursfinder-Auswertung als
          Gesprächsgrundlage.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <h4 className="font-display text-[1.4rem] text-ink">{title}</h4>
      <p className="mt-2 max-w-prose text-[0.9rem] leading-relaxed text-ink-muted">{description}</p>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="lead-website">Website (bitte leer lassen)</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="lead-name">
            Name
          </label>
          <input id="lead-name" name="name" required autoComplete="name" className="field" />
        </div>
        <div>
          <label className="field-label" htmlFor="lead-company">
            Firma
          </label>
          <input id="lead-company" name="company" autoComplete="organization" className="field" />
        </div>
        <div>
          <label className="field-label" htmlFor="lead-email">
            E-Mail
          </label>
          <input id="lead-email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label className="field-label" htmlFor="lead-phone">
            Telefon (optional)
          </label>
          <input id="lead-phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="lead-callback">
            Gewünschte Rückrufzeit
          </label>
          <select id="lead-callback" name="callbackWindow" className="field" defaultValue={callbackOptions[2]}>
            {callbackOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="lead-message">
            Nachricht (optional)
          </label>
          <textarea id="lead-message" name="message" rows={3} className="field resize-y" />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-[0.82rem] leading-relaxed text-ink-muted">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-[#14405F]" />
        <span>
          Ich bin damit einverstanden, dass Adriacon meine Angaben zur Bearbeitung der Anfrage verwendet.
          Details in der <a href="/datenschutz" className="underline underline-offset-2">Datenschutzerklärung</a>.
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-4 border-l-2 border-bistre pl-3 text-sm text-ink">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 disabled:opacity-60">
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
