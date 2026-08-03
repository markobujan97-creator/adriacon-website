import { cfoRedirectMessage, packageCards, taxOffers, type CardId } from '@/config/pricing';
import { formatChf } from '@/lib/format';
import type { FinderAnswers, FinderResult } from '@/types';

/**
 * Paketfinder.
 *
 * Erste Frage: Unternehmen, Gründung oder private Steuererklärung.
 * Der Steuerpfad führt nie durch den Business-Finder – er endet direkt
 * bei einem Pauschalpreis und den passenden nächsten Schritten.
 */

const card = (id: CardId) => packageCards.find((c) => c.id === id)!;

export const emptyAnswers: FinderAnswers = {
  track: null,
  teamSize: null,
  payroll: null,
  support: null,
  taxSituation: null,
};

export function isComplete(answers: FinderAnswers): boolean {
  if (answers.track === null) return false;
  if (answers.track === 'steuererklaerung') return answers.taxSituation !== null;
  if (answers.track === 'gruendung') return true;
  return answers.teamSize !== null && answers.payroll !== null && answers.support !== null;
}

export function recommend(answers: FinderAnswers): FinderResult | null {
  if (!isComplete(answers)) return null;

  // --- Steuerpfad -----------------------------------------------------------
  if (answers.track === 'steuererklaerung') {
    const offer = taxOffers.find((o) => o.id === answers.taxSituation)!;
    return {
      kind: 'tax',
      offerId: offer.id,
      name: `Steuererklärung ${offer.audience}`,
      price: formatChf(offer.price),
      priceNote: 'einmalig, pro Steuerjahr',
      explanation: offer.description,
    };
  }

  // --- Gründung -------------------------------------------------------------
  if (answers.track === 'gruendung') {
    const g = card('gruendung');
    return {
      kind: 'business',
      cardId: 'gruendung',
      name: g.name,
      price: g.price,
      priceNote: g.priceNote,
      explanation:
        'Wir begleiten die Gründung von den Statuten bis zum Handelsregistereintrag. Wenn wir danach die laufende Buchhaltung übernehmen, kostet die Gründung CHF 600.– statt CHF 1200.–.',
      note: 'Für die Zeit nach der Gründung empfehlen wir in der Regel ADRIACON START.',
    };
  }

  // --- Unternehmen ----------------------------------------------------------
  if (answers.teamSize === 'gross') {
    return {
      kind: 'business',
      cardId: 'kmuPlus',
      name: 'Persönliche Offerte',
      price: 'auf Anfrage',
      priceNote: 'ausgehend von ADRIACON KMU PLUS',
      explanation:
        'Ab rund 40 Mitarbeitenden hängt der Aufwand stark von Ihrer Struktur ab. Wir schauen Ihre Ausgangslage an und offerieren konkret.',
    };
  }

  let id: CardId =
    answers.teamSize === 'solo' ? 'start' : answers.teamSize === 'klein' ? 'kmu' : 'kmuPlus';
  let note: string | undefined;

  if (answers.support === 'reporting' && id === 'start') {
    id = 'kmu';
    note = 'Quartalsreporting ist ab ADRIACON KMU enthalten.';
  }
  if (answers.support === 'begleitung') {
    if (id === 'start' || id === 'kmu') {
      id = 'kmuPlus';
      note = 'Monatsreporting und rollende Liquiditätsplanung sind ab ADRIACON KMU PLUS enthalten.';
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
    kmu: 'Mit einem Team lohnt sich ADRIACON KMU: Lohnläufe, Quellensteuer und Quartalsreporting sind enthalten.',
    kmuPlus:
      'ADRIACON KMU PLUS liefert monatliche Zahlen, eine rollende Liquiditätsplanung und Auswertungen nach Kostenstellen.',
  };

  return {
    kind: 'business',
    cardId: id,
    name: c.name,
    price: c.price,
    priceNote: c.priceNote,
    explanation: explanations[id] ?? c.benefit,
    note,
  };
}
