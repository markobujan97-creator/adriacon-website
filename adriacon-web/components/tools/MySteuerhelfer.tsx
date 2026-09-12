import Image from 'next/image';
import { Apple, Camera, FileCheck, Globe, Send, ShieldCheck } from 'lucide-react';
import { mySteuerhelfer } from '@/config/site';

const steps = [
  {
    icon: Camera,
    title: 'Belege mit dem Handy scannen',
    text: 'Lohnausweis, Quittungen, Bescheinigungen – abfotografieren oder als Datei hochladen.',
  },
  {
    icon: Send,
    title: 'Dokumente sicher hochladen',
    text: 'Die App ordnet Ihre Unterlagen und übermittelt sie strukturiert an uns.',
  },
  {
    icon: ShieldCheck,
    title: 'Persönliche Prüfung',
    text: 'Wir kontrollieren alles, fragen nach, wenn etwas fehlt, und rechnen die Abzüge.',
  },
  {
    icon: FileCheck,
    title: 'Fristgerecht eingereicht',
    text: 'Sie erhalten die fertige Steuererklärung zur Freigabe. Danach reichen wir sie ein.',
  },
];

/**
 * MySteuerhelfer ist eine von Adriacon selbst entwickelte App.
 * Sie steht allen Interessierten offen – als iOS-App und als Webversion.
 * Es braucht weder eine Freischaltung noch ein bestehendes Mandat.
 */
export function MySteuerhelfer({ headingLevel = 'h3' }: { headingLevel?: 'h3' | 'h4' }) {
  const Heading = headingLevel;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="order-2 lg:order-1 lg:col-span-7">
        <p className="text-[1rem] leading-relaxed text-ink-soft">
          MySteuerhelfer ist unsere eigene App. Wir haben sie entwickelt, weil das Sammeln und
          Einreichen von Unterlagen der mühsamste Teil einer Steuererklärung ist. Die App ist für
          alle da – Sie brauchen keine Freischaltung und kein bestehendes Mandat. Wer lieber am
          Computer arbeitet, nutzt dieselbe Anwendung direkt im Browser.
        </p>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title}>
              <div className="flex items-center gap-3">
                <step.icon className="h-4 w-4 text-blue" aria-hidden="true" />
                <span className="font-display text-[0.8rem] font-medium tracking-[0.12em] text-blue">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <Heading className="mt-3 font-display text-[1.05rem] font-medium text-navy">
                {step.title}
              </Heading>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={mySteuerhelfer.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Apple className="h-4 w-4" aria-hidden="true" />
            Im App Store herunterladen
          </a>

          <a
            href={mySteuerhelfer.webAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            MySteuerhelfer im Browser öffnen
          </a>
        </div>

        <p className="mt-4 text-[0.85rem] text-ink-light">{mySteuerhelfer.platforms}</p>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-5">
        <div className="relative mx-auto max-w-[280px]">
          <div className="absolute -left-5 -top-5 h-24 w-24 rounded bg-sky-pale" aria-hidden="true" />
          <Image
            src="/images/mysteuerhelfer-app.png"
            alt="MySteuerhelfer auf dem Smartphone: Steuererklärung einreichen, WhatsApp-Support sowie Hilfe und Support"
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
