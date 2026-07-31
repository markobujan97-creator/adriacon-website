import { cfoRedirectMessage, packageCards, type CardId } from '@/config/pricing';
import type { FinderAnswers, FinderResult } from '@/types';

/**
 * Paketfinder: vier Fragen, eine Empfehlung.
 *
 * Bewusst ohne Preisberechnung. Zuschläge und Sonderfälle klären wir im
 * Gespräch – der Finder soll in unter zwei Minuten zu einer klaren Richtung führen.
 */

const card = (id: CardId) => packageCards.find((c) => c.id === id)!;

export const emptyAnswers: FinderAnswers = {
  profile: null,
  teamSize: null,
  payroll: null,
  support: null,
};

export function isComplete(answers: FinderAnswers): boolean {
  return (
    answers.profile !== null &&
    (answers.profile === 'privat' ||
      (answers.teamSize !== null && answers.payroll !== null && answers.support !== null))
  );
}

/** Bei Gründerinnen und Gründern entfällt die Frage nach der Lohnadministration nicht,
 *  wohl aber die Grössenfrage in ihrer Bedeutung – die Gründung steht im Vordergrund. */
export function recommend(answers: FinderAnswers): FinderResult | null {
  if (!isComplete(answers)) return null;

  if (answers.profile === 'privat') {
    return {
      cardId: null,
      name: 'Persönliche Offerte',
      price: 'nach Aufwand',
      priceNote: 'wir schätzen den Aufwand im Erstgespräch',
      explanation:
        'Für Privatpersonen erstellen wir die Steuererklärung individuell. Belege reichen Sie über MySteuerhelfer digital ein, wir prüfen sie persönlich.',
    };
  }

  if (answers.profile === 'gruender') {
    const g = card('gruendung');
    return {
      cardId: 'gruendung',
      name: g.name,
      price: g.price,
      priceNote: g.priceNote,
      explanation:
        'Wir begleiten die Gründung von den Statuten bis zum Handelsregistereintrag. Wenn wir danach die laufende Buchhaltung übernehmen, kostet die Gründung CHF 600.– statt CHF 1200.–.',
      note: 'Für die Zeit nach der Gründung empfehlen wir in der Regel ADRIACON START.',
    };
  }

  // Unternehmen: Teamgrösse bestimmt das Grundpaket.
  let id: CardId =
    answers.teamSize === 'solo' ? 'start' : answers.teamSize === 'klein' ? 'kmu' : 'kmuPlus';

  let note: string | undefined;

  // Sehr grosse Unternehmen erhalten eine persönliche Offerte.
  if (answers.teamSize === 'gross') {
    return {
      cardId: 'kmuPlus',
      name: 'Persönliche Offerte',
      price: 'auf Anfrage',
      priceNote: 'ausgehend von ADRIACON KMU PLUS',
      explanation:
        'Ab rund 40 Mitarbeitenden hängt der Aufwand stark von Ihrer Struktur ab. Wir schauen Ihre Ausgangslage an und offerieren konkret.',
    };
  }

  // Lohnadministration hebt sehr kleine Betriebe nicht automatisch an,
  // erhöhter Begleitungsbedarf schon.
  if (answers.support === 'reporting' && id === 'start') {
    id = 'kmu';
    note = 'Quartalsreporting ist ab ADRIACON KMU enthalten.';
  }
  if (answers.support === 'begleitung') {
    if (id === 'start' || id === 'kmu') {
      id = 'kmuPlus';
      note =
        'Monatsreporting und rollende Liquiditätsplanung sind ab ADRIACON KMU PLUS enthalten.';
    } else {
      note = cfoRedirectMessage;
    }
  }
  if (!answers.payroll && id === 'kmu' && answers.teamSize === 'klein') {
    note = note ?? 'Ohne Lohnadministration prüfen wir gerne, ob ADRIACON START ausreicht.';
  }

  const c = card(id);
  const explanations: Record<string, string> = {
    start:
      'Für kleine Strukturen deckt ADRIACON START alles Wiederkehrende ab: Buchhaltung, MWST, Lohn und den Jahresabschluss.',
    kmu:
      'Mit einem Team lohnt sich ADRIACON KMU: Lohnläufe, Quellensteuer und Quartalsreporting sind enthalten.',
    kmuPlus:
      'ADRIACON KMU PLUS liefert monatliche Zahlen, eine rollende Liquiditätsplanung und Auswertungen nach Kostenstellen.',
  };

  return {
    cardId: id,
    name: c.name,
    price: c.price,
    priceNote: c.priceNote,
    explanation: explanations[id] ?? c.benefit,
    note,
  };
}
