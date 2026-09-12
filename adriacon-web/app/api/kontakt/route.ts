import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';
import { site } from '@/config/site';

export const runtime = 'nodejs';

/** Einfache Ratenbegrenzung pro Instanz. */
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
      { ok: false, message: 'Bitte prüfen Sie Ihre Angaben.' },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: stillschweigend verwerfen, damit Bots keinen Hinweis erhalten.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const subject = `Website-Anfrage: ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    data.company ? `Unternehmen: ${data.company}` : null,
    `E-Mail: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    data.topic ? `Anliegen: ${data.topic}` : null,
    '',
    'Nachricht:',
    data.message,
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  const apiKey = process.env.RESEND_API_KEY;

  /**
   * Empfängeradresse. Ohne gesetzte Umgebungsvariable geht jede Anfrage an
   * info@adriacon.ch – so landen Anfragen auch dann am richtigen Ort, wenn beim
   * Deployment nur der API-Schlüssel gesetzt wurde.
   */
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  /**
   * Absenderadresse. Der Vorgabewert nutzt die Testdomain von Resend und
   * funktioniert sofort. Für den produktiven Betrieb sollte eine verifizierte
   * Adresse der eigenen Domain gesetzt werden, damit die Zustellung zuverlässig
   * ist und die Mails nicht im Spam landen.
   */
  const from = process.env.CONTACT_FROM_EMAIL || 'Adriacon Website <onboarding@resend.dev>';

  if (!apiKey) {
    // Demo-Modus: ohne API-Schlüssel wird die Anfrage nur protokolliert.
    // TODO (Betrieb): RESEND_API_KEY in Vercel setzen, damit E-Mails ankommen.
    console.warn(
      '[kontakt] Kein RESEND_API_KEY gesetzt – es wurde keine E-Mail versendet. Anfrage:\n' + text,
    );
    return NextResponse.json({ ok: true, delivered: false });
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
      html: `<pre style="font:14px/1.6 ui-monospace,monospace">${escapeHtml(text)}</pre>`,
    });

    if (sent.error) throw new Error(sent.error.message);
    console.info(`[kontakt] Anfrage von ${data.email} an ${to} zugestellt.`);
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
