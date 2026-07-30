import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';

export const runtime = 'nodejs';

/** Sehr einfache Ratenbegrenzung pro Instanz. Für höhere Anforderungen einen externen Speicher verwenden. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unbekannt';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Bitte prüfen Sie Ihre Angaben.',
        issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: still verwerfen, damit Bots keinen Hinweis erhalten.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const subject = `Website-Anfrage${data.context ? ` – ${data.context}` : ''}: ${data.name}`;
  const lines = [
    `Name: ${data.name}`,
    data.company ? `Unternehmen: ${data.company}` : null,
    `E-Mail: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    data.topic ? `Anliegen: ${data.topic}` : null,
    `Gewünschte Kontaktart: ${data.preferredContact}`,
    data.callbackWindow ? `Rückrufzeitraum: ${data.callbackWindow}` : null,
    '',
    'Nachricht:',
    data.message,
    data.summary ? '\nKursfinder-Auswertung:\n' + data.summary : null,
  ].filter(Boolean) as string[];

  const text = lines.join('\n');
  const html = `<pre style="font:14px/1.6 ui-monospace,monospace">${escapeHtml(text)}</pre>`;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    // Ohne konfigurierten Versanddienst wird die Anfrage nur protokolliert.
    // TODO (Betrieb): RESEND_API_KEY, CONTACT_FROM_EMAIL und CONTACT_TO_EMAIL in Vercel setzen.
    console.warn('[kontakt] Kein Versanddienst konfiguriert. Anfrage:\n' + text);
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: 'Anfrage entgegengenommen.',
    });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const sent = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (sent.error) throw new Error(sent.error.message);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[kontakt] Versand fehlgeschlagen', error);
    return NextResponse.json(
      {
        ok: false,
        message:
          'Der Versand hat nicht funktioniert. Bitte schreiben Sie uns direkt an info@adriacon.ch oder rufen Sie an.',
      },
      { status: 502 },
    );
  }
}
