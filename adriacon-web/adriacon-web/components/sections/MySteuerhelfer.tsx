import Image from 'next/image';
import { Camera, FileCheck, ShieldCheck, Smartphone } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const points = [
  { icon: Camera, title: 'Belege abfotografieren', text: 'Quittungen und Belege direkt mit dem Handy erfassen, statt sie zu sammeln.' },
  { icon: FileCheck, title: 'Unterlagen an einem Ort', text: 'Alle eingereichten Dokumente bleiben übersichtlich beisammen.' },
  { icon: ShieldCheck, title: 'Persönlich geprüft', text: 'Wir kontrollieren die Unterlagen, bevor etwas eingereicht wird.' },
  { icon: Smartphone, title: 'App oder Browser', text: 'Verfügbar als App und als Webversion – wie es Ihnen passt.' },
];

export function MySteuerhelfer() {
  return (
    <section aria-labelledby="mysteuerhelfer-titel" className="bg-paper py-section">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-7">
            <span className="eyebrow">Unser Werkzeug für Privatkunden</span>
            <h2 id="mysteuerhelfer-titel" className="mt-5 text-display-md text-ink">
              MySteuerhelfer: Die Steuererklärung ohne Papierstapel.
            </h2>
            <p className="mt-5 max-w-prose text-pretty leading-relaxed text-ink-muted">
              Belege scannen, hochladen, fertig. Wir prüfen die Unterlagen persönlich und reichen
              termingerecht ein. Für Mitarbeitende unserer KMU-Mandate ist MySteuerhelfer im Paket
              ADRIACON KMU enthalten.
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point.title} className="border-t border-bistre/25 pt-4">
                  <point.icon className="h-4 w-4 text-brand-deep" aria-hidden="true" />
                  <h3 className="mt-3 font-sans text-[0.98rem] font-medium text-ink">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{point.text}</p>
                </li>
              ))}
            </ul>

            <a href="#kontakt" className="btn-secondary mt-9">
              Zugang anfragen
            </a>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto max-w-[300px]">
              <div className="grid-field absolute -inset-6" aria-hidden="true" />
              <Image
                src="/images/mysteuerhelfer-app.png"
                alt="MySteuerhelfer auf dem Smartphone: Startbildschirm mit Steuererklärung einreichen, WhatsApp-Support sowie Hilfe und Support"
                width={600}
                height={1200}
                sizes="(max-width: 1024px) 60vw, 300px"
                className="relative w-full"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
