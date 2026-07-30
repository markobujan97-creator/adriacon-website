'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CourseProgress } from './CourseProgress';
import { ResultPanel } from './ResultPanel';
import { ChoiceGroup, FieldShell, MultiChoice, Slider, Stepper, ToggleRow } from './controls';
import { LeadForm } from '@/components/forms/LeadForm';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { calculatePrice, defaultAnswers } from '@/lib/calculatePrice';
import { formatChf, formatNumber } from '@/lib/format';
import type {
  AccountingSoftware,
  AdvisoryNeed,
  BookkeepingStatus,
  BusinessPhase,
  Collaboration,
  CourseAnswers,
  LegalForm,
  ProfileType,
  ServiceKey,
  VatMethod,
} from '@/types';

const STEP_LABELS = [
  'Ausgangslage',
  'Grösse',
  'Belege & Banken',
  'Mehrwertsteuer',
  'Struktur',
  'Leistungen',
  'Zusammenarbeit',
  'Ihr Kurs',
];

const PRIVATE_STEPS = ['Ausgangslage', 'Ihr Kurs'];

const serviceOptions: Array<{ value: ServiceKey; label: string }> = [
  { value: 'buchhaltung', label: 'Laufende Buchhaltung' },
  { value: 'abschluss', label: 'Jahresabschluss' },
  { value: 'mwst', label: 'Mehrwertsteuer' },
  { value: 'lohn', label: 'Lohnwesen' },
  { value: 'steuern-firma', label: 'Steuererklärung Firma' },
  { value: 'steuern-privat', label: 'Steuererklärung privat' },
  { value: 'reporting', label: 'Reporting' },
  { value: 'liquiditaet', label: 'Liquiditätsplanung' },
  { value: 'gruendung', label: 'Firmengründung' },
];

export function Kursfinder() {
  const [answers, setAnswers] = useState<CourseAnswers>(defaultAnswers);
  const [step, setStep] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const isPrivate = answers.profile === 'private';
  const labels = isPrivate ? PRIVATE_STEPS : STEP_LABELS;
  const lastIndex = labels.length - 1;
  const isResult = step >= lastIndex;

  const result = useMemo(() => calculatePrice(answers), [answers]);

  const set = <K extends keyof CourseAnswers>(key: K, value: CourseAnswers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleService = (value: ServiceKey) =>
    setAnswers((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((s) => s !== value)
        : [...prev.services, value],
    }));

  const goNext = () => setStep((s) => Math.min(lastIndex, s + 1));
  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const restart = () => {
    setAnswers(defaultAnswers);
    setStep(0);
    setShowForm(false);
  };

  const summaryLines = [
    result.packageName ? `Empfehlung: ${result.packageName}` : 'Empfehlung: persönliche Einschätzung',
    result.packageName ? `Orientierung: ${formatChf(result.monthlyEstimate)}/Mt. exkl. MWST` : '',
    `Mitarbeitende: ${answers.employees}, Lohnempfänger: ${answers.payrollRecipients}`,
    `Belege/Monat: ${answers.documentsPerMonth}, Bankkonten: ${answers.bankAccounts}`,
    `MWST: ${answers.vatLiable ? answers.vatMethod : 'nicht pflichtig'}, Belegfluss: ${answers.digitalDocuments ? 'digital' : 'Papier'}`,
    result.needsPersonalQuote ? 'Hinweis: persönliche Offerte empfohlen' : '',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Eingabebereich */}
      <div className="lg:col-span-7">
        <div className="border border-ink/12 bg-white p-6 shadow-lift sm:p-9">
          <CourseProgress steps={labels} current={Math.min(step, lastIndex)} onJump={setStep} />

          <div className="mt-9 min-h-[22rem]">
            {!isResult && (
              <>
                {step === 0 && (
                  <div className="space-y-8">
                    <FieldShell label="Wer sind Sie?">
                      <ChoiceGroup<ProfileType>
                        name="Profil"
                        columns={3}
                        value={answers.profile}
                        onChange={(v) => {
                          set('profile', v);
                          if (v === 'private') setStep(0);
                        }}
                        options={[
                          { value: 'company', label: 'Unternehmen', description: 'Bestehende Firma' },
                          { value: 'founder', label: 'Gründerin oder Gründer', description: 'Gründung geplant' },
                          { value: 'private', label: 'Privatperson', description: 'Steuererklärung' },
                        ]}
                      />
                    </FieldShell>

                    {!isPrivate && (
                      <>
                        <FieldShell label="Welche Rechtsform besteht oder ist geplant?">
                          <ChoiceGroup<LegalForm>
                            name="Rechtsform"
                            columns={3}
                            value={answers.legalForm}
                            onChange={(v) => set('legalForm', v)}
                            options={[
                              { value: 'einzelfirma', label: 'Einzelfirma' },
                              { value: 'gmbh', label: 'GmbH' },
                              { value: 'ag', label: 'AG' },
                              { value: 'verein', label: 'Verein oder Stiftung' },
                              { value: 'geplant', label: 'Noch offen' },
                            ]}
                          />
                        </FieldShell>

                        <FieldShell label="In welcher Unternehmensphase befinden Sie sich?">
                          <ChoiceGroup<BusinessPhase>
                            name="Phase"
                            columns={2}
                            value={answers.phase}
                            onChange={(v) => set('phase', v)}
                            options={[
                              { value: 'gruendung', label: 'Gründung', description: 'Noch vor dem Start' },
                              { value: 'aufbau', label: 'Aufbau', description: 'Erste Geschäftsjahre' },
                              { value: 'wachstum', label: 'Wachstum', description: 'Team und Umsatz wachsen' },
                              { value: 'etabliert', label: 'Etabliert', description: 'Stabile Struktur' },
                            ]}
                          />
                        </FieldShell>
                      </>
                    )}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-8">
                    <FieldShell
                      label="Wie viele Mitarbeitende hat das Unternehmen?"
                      hint="Inklusive Inhaberinnen und Inhaber, die im Unternehmen angestellt sind. Diese Zahl bestimmt das Grundpaket."
                    >
                      <Stepper
                        label="Mitarbeitende"
                        value={answers.employees}
                        onChange={(v) => set('employees', v)}
                        min={0}
                        max={200}
                        suffix="Personen"
                      />
                    </FieldShell>

                    <FieldShell
                      label="Wie viele Lohnempfänger werden monatlich abgerechnet?"
                      hint="Kann von der Mitarbeiterzahl abweichen, etwa bei Aushilfen oder mehreren Anstellungen."
                    >
                      <Stepper
                        label="Lohnempfänger"
                        value={answers.payrollRecipients}
                        onChange={(v) => set('payrollRecipients', v)}
                        min={0}
                        max={200}
                        suffix="pro Monat"
                      />
                    </FieldShell>

                    <FieldShell label="Wie hoch ist ungefähr der Jahresumsatz?">
                      <Slider
                        label="Jahresumsatz"
                        value={answers.annualRevenue}
                        onChange={(v) => set('annualRevenue', v)}
                        min={0}
                        max={10_000_000}
                        step={50_000}
                        marks={[]}
                        format={(v) => (v >= 10_000_000 ? "CHF 10 Mio.+" : `CHF ${formatNumber(v)}`)}
                      />
                    </FieldShell>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <FieldShell
                      label="Wie viele Belege fallen ungefähr pro Monat an?"
                      hint="Belege sind Rechnungen, Quittungen und Bankbewegungen. Bis 150 Belege pro Monat sind im Grundpreis enthalten."
                    >
                      <Slider
                        label="Belege pro Monat"
                        value={answers.documentsPerMonth}
                        onChange={(v) => set('documentsPerMonth', v)}
                        min={0}
                        max={800}
                        step={10}
                        marks={[]}
                        format={(v) => (v >= 800 ? '800+ Belege' : `${v} Belege`)}
                      />
                    </FieldShell>

                    <FieldShell
                      label="Wie viele Bankkonten werden verwendet?"
                      hint="Zwei Konten sind im Grundpreis enthalten. Jedes weitere Konto kostet CHF 40.– pro Monat."
                    >
                      <Stepper
                        label="Bankkonten"
                        value={answers.bankAccounts}
                        onChange={(v) => set('bankAccounts', v)}
                        min={0}
                        max={20}
                        suffix="Konten"
                      />
                    </FieldShell>

                    <div>
                      <ToggleRow
                        label="Werden Belege vollständig digital eingereicht?"
                        hint="Die Paketpreise basieren auf digitalem Belegfluss. Bei Papierbelegen kommen 35 Prozent auf den Grundpreis hinzu."
                        value={answers.digitalDocuments}
                        onChange={(v) => set('digitalDocuments', v)}
                        yesLabel="Digital"
                        noLabel="Papier"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <ToggleRow
                      label="Ist das Unternehmen MWST-pflichtig?"
                      value={answers.vatLiable}
                      onChange={(v) => {
                        set('vatLiable', v);
                        if (!v) set('vatMethod', 'none');
                        else if (answers.vatMethod === 'none') set('vatMethod', 'saldo');
                      }}
                    />

                    {answers.vatLiable && (
                      <FieldShell
                        label="Welche MWST-Methode wird verwendet?"
                        hint="Beim Saldosteuersatz entfällt der Zuschlag. Die effektive Methode ist aufwendiger und kostet CHF 60.– pro Monat mehr."
                      >
                        <ChoiceGroup<VatMethod>
                          name="MWST-Methode"
                          columns={2}
                          value={answers.vatMethod}
                          onChange={(v) => set('vatMethod', v)}
                          options={[
                            { value: 'saldo', label: 'Saldosteuersatz', description: 'Vereinfachte Abrechnung' },
                            { value: 'effective', label: 'Effektive Methode', description: 'Mit Vorsteuerabzug' },
                            { value: 'unsure', label: 'Noch unsicher', description: 'Wir klären das gemeinsam' },
                          ]}
                        />
                      </FieldShell>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <ToggleRow
                      label="Werden regelmässig Fremdwährungen gebucht?"
                      hint="Der Zuschlag von CHF 90.– gilt einmal pro Mandat, unabhängig von der Anzahl Währungen."
                      value={answers.foreignCurrency}
                      onChange={(v) => set('foreignCurrency', v)}
                    />

                    <FieldShell
                      label="Gibt es Kostenstellen, Filialen oder organisatorische Einheiten?"
                      hint="Je Einheit CHF 120.– pro Monat. Ab vier Einheiten prüfen wir die Struktur persönlich."
                    >
                      <Stepper
                        label="Kostenstellen"
                        value={answers.costCenters}
                        onChange={(v) => set('costCenters', v)}
                        min={0}
                        max={20}
                        suffix="Einheiten"
                      />
                    </FieldShell>

                    <FieldShell
                      label="Wie viele Gesellschaften sollen betreut werden?"
                      hint="Ab zwei Gesellschaften offerieren wir jede Gesellschaft separat. Die Orientierung gilt für die erste."
                    >
                      <Stepper
                        label="Gesellschaften"
                        value={answers.companies}
                        onChange={(v) => set('companies', v)}
                        min={1}
                        max={10}
                        suffix="Firmen"
                      />
                    </FieldShell>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-8">
                    <FieldShell label="Welche Leistungen werden benötigt?" help="Mehrfachauswahl möglich.">
                      <MultiChoice<ServiceKey>
                        name="Leistungen"
                        options={serviceOptions}
                        values={answers.services}
                        onToggle={toggleService}
                      />
                    </FieldShell>

                    <FieldShell label="Welche Buchhaltungssoftware wird verwendet?">
                      <ChoiceGroup<AccountingSoftware>
                        name="Software"
                        columns={3}
                        value={answers.software}
                        onChange={(v) => set('software', v)}
                        options={[
                          { value: 'bexio', label: 'Bexio' },
                          { value: 'abacus', label: 'Abacus' },
                          { value: 'sage', label: 'Sage' },
                          { value: 'banana', label: 'Banana' },
                          { value: 'excel', label: 'Excel' },
                          { value: 'keine', label: 'Noch keine' },
                        ]}
                      />
                    </FieldShell>

                    <FieldShell label="Wie aktuell ist die Buchhaltung?">
                      <ChoiceGroup<BookkeepingStatus>
                        name="Buchhaltungsstand"
                        columns={2}
                        value={answers.bookkeepingStatus}
                        onChange={(v) => set('bookkeepingStatus', v)}
                        options={[
                          { value: 'aktuell', label: 'Aktuell', description: 'Laufend gebucht' },
                          { value: 'teilweise', label: 'Teilweise rückständig', description: 'Einige Monate offen' },
                          { value: 'stark', label: 'Stark rückständig', description: 'Mehrere Monate oder Jahre' },
                          { value: 'neuaufbau', label: 'Neuaufbau', description: 'Noch nichts vorhanden' },
                        ]}
                      />
                    </FieldShell>
                  </div>
                )}

                {step === 6 && (
                  <div className="space-y-8">
                    <FieldShell label="Welche Zusammenarbeit wünschen Sie?">
                      <ChoiceGroup<Collaboration>
                        name="Zusammenarbeit"
                        columns={3}
                        value={answers.collaboration}
                        onChange={(v) => set('collaboration', v)}
                        options={[
                          { value: 'digital', label: 'Vollständig digital' },
                          { value: 'hybrid', label: 'Hybrid' },
                          { value: 'persoenlich', label: 'Vorwiegend persönlich' },
                        ]}
                      />
                    </FieldShell>

                    <FieldShell
                      label="Besteht Bedarf an Reporting, Forecast oder CFO-Unterstützung?"
                      hint="Die CFO-Begleitung ist eine Erweiterung für bestehende Mandate und kein Einstiegspaket."
                    >
                      <ChoiceGroup<AdvisoryNeed>
                        name="Beratungsbedarf"
                        columns={2}
                        value={answers.advisoryNeed}
                        onChange={(v) => set('advisoryNeed', v)}
                        options={[
                          { value: 'keiner', label: 'Kein zusätzlicher Bedarf' },
                          { value: 'reporting', label: 'Reporting' },
                          { value: 'forecast', label: 'Budget und Forecast' },
                          { value: 'cfo', label: 'Führungsunterstützung' },
                        ]}
                      />
                    </FieldShell>

                    <div>
                      <ToggleRow
                        label="Wird eine Firmengründung gewünscht?"
                        value={answers.wantsIncorporation}
                        onChange={(v) => set('wantsIncorporation', v)}
                      />
                      {answers.wantsIncorporation && (
                        <ToggleRow
                          label="Soll Adriacon danach das laufende Mandat übernehmen?"
                          hint="Der reduzierte Gründungspreis von CHF 600.– gilt nur, wenn gleichzeitig ein laufendes Treuhandmandat abgeschlossen wird."
                          value={answers.wantsOngoingMandate}
                          onChange={(v) => set('wantsOngoingMandate', v)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {isResult && (
              <>
                <ResultPanel
                  result={result}
                  answers={answers}
                  onRestart={restart}
                  onRequestTalk={() => setShowForm(true)}
                />
                {showForm && (
                  <div className="no-print mt-10 border-t border-bistre/25 pt-8">
                    <LeadForm
                      context="Kursfinder"
                      summary={summaryLines}
                      title="Empfehlung unverbindlich besprechen"
                      description="Wir melden uns innerhalb eines Arbeitstages. Ihre Angaben aus dem Kursfinder senden wir mit, damit wir vorbereitet ins Gespräch gehen."
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {!isResult && (
            <div className="no-print mt-9 flex items-center justify-between gap-4 border-t border-bistre/25 pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="btn-secondary disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Zurück
              </button>
              <button type="button" onClick={goNext} className="btn-primary">
                {step === lastIndex - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mitlaufende Zusammenfassung */}
      <aside className="no-print lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="border border-ink/12 bg-ink p-6 text-paper sm:p-8">
            <p className="eyebrow !text-brand-sky">Aktueller Stand</p>

            {isPrivate ? (
              <p className="mt-5 text-[0.95rem] leading-relaxed text-brand-mist/85">
                Für Privatpersonen erstellen wir eine individuelle Einschätzung. Beantworten Sie die
                Ausgangslage und Sie erhalten die nächsten Schritte.
              </p>
            ) : (
              <>
                <p className="mt-5 font-display text-[1.4rem] leading-tight text-paper">
                  {result.packageName ?? 'Wird berechnet'}
                </p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="font-mono text-xs text-brand-sky">CHF</span>
                  <AnimatedNumber
                    value={result.monthlyEstimate}
                    className="font-display text-[2.8rem] leading-none text-paper"
                  />
                  <span className="font-mono text-xs text-brand-sky">/Mt.</span>
                </p>
                <p className="mt-2 text-[0.78rem] text-brand-mist/60">
                  exkl. MWST · unverbindliche Orientierung
                </p>

                <dl className="mt-7 space-y-2 border-t border-paper/12 pt-5 text-[0.82rem]">
                  {result.lineItems.map((item) => (
                    <div key={item.key} className="flex items-baseline justify-between gap-4">
                      <dt className="text-brand-mist/75">{item.label}</dt>
                      <dd className="shrink-0 font-mono text-brand-mist tabular">
                        {formatChf(item.amount)}
                      </dd>
                    </div>
                  ))}
                </dl>

                {result.needsPersonalQuote && (
                  <p className="mt-6 border-l-2 border-brand-sky pl-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-sky">
                    Persönliche Offerte empfohlen
                  </p>
                )}
              </>
            )}

            <p className="mt-7 border-t border-paper/12 pt-5 text-[0.75rem] leading-relaxed text-brand-mist/55">
              Der Rechner arbeitet vollständig in Ihrem Browser. Es werden keine Angaben übermittelt,
              solange Sie das Ergebnis nicht aktiv senden.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
