import Image from 'next/image';
import Link from 'next/link';

const facts = [
  {
    q: 'Was ist MySteuerhelfer?',
    a: 'Unsere App für die Steuererklärung. Sie fotografieren Belege mit dem Handy, laden Unterlagen hoch und sehen jederzeit, was schon eingereicht ist. Es gibt sie auch als Webversion im Browser.',
  },
  {
    q: 'Für wen ist sie gedacht?',
    a: 'Für Privatpersonen, die ihre Steuererklärung abgeben möchten, ohne Papier zu sammeln. Und für Mitarbeitende unserer KMU-Mandate.',
  },
  {
    q: 'Wie läuft es ab?',
    a: 'Sie reichen die Unterlagen digital ein, wir prüfen sie persönlich, klären Rückfragen und reichen termingerecht ein.',
  },
  {
    q: 'Ist sie Teil eines Pakets?',
    a: 'Im Paket ADRIACON KMU ist MySteuerhelfer für die gesamte Belegschaft enthalten. Als Privatperson erhalten Sie den Zugang im Rahmen Ihres Mandats.',
  },
];

export function MySteuerhelfer() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="order-2 lg:order-1 lg:col-span-7">
        <dl className="divide-y divide-line border-y border-line">
          {facts.map((fact) => (
            <div key={fact.q} className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="font-display text-[0.98rem] font-medium text-navy">{fact.q}</dt>
              <dd className="text-[0.94rem] leading-relaxed text-ink-soft sm:col-span-2">{fact.a}</dd>
            </div>
          ))}
        </dl>

        <Link href="/kontakt" className="btn-outline mt-8">
          Zugang anfragen
        </Link>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-5">
        <div className="relative mx-auto max-w-[280px]">
          <div className="absolute -left-5 -top-5 h-24 w-24 rounded bg-sky-pale" aria-hidden="true" />
          <Image
            src="/images/mysteuerhelfer-app.png"
            alt="MySteuerhelfer auf dem Smartphone mit den Einstiegspunkten Steuererklärung einreichen, WhatsApp-Support sowie Hilfe und Support"
            width={600}
            height={1200}
            sizes="(max-width: 1024px) 60vw, 280px"
            className="relative w-full"
          />
        </div>
      </div>
    </div>
  );
}
