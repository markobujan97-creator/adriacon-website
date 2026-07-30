import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Bitte geben Sie Ihren Namen an.').max(120),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  email: z.string().trim().email('Bitte prüfen Sie die E-Mail-Adresse.').max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  topic: z.string().trim().max(80).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Bitte beschreiben Sie Ihr Anliegen kurz.').max(4000),
  preferredContact: z.enum(['email', 'telefon', 'egal']).default('egal'),
  callbackWindow: z.string().trim().max(80).optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Bitte bestätigen Sie den Datenschutzhinweis.' }),
  }),
  context: z.string().trim().max(60).optional().or(z.literal('')),
  summary: z.string().trim().max(4000).optional().or(z.literal('')),
  /** Honeypot – muss leer bleiben. */
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const topicOptions = [
  'Laufende Buchhaltung',
  'Jahresabschluss',
  'Steuererklärung Unternehmen',
  'Steuererklärung Privatperson',
  'Mehrwertsteuer',
  'Lohnwesen und Personal',
  'Firmengründung',
  'Wechsel des Treuhänders',
  'Reporting und Planung',
  'Anderes Anliegen',
] as const;

export const callbackOptions = [
  'Vormittag 08:00 – 12:00',
  'Nachmittag 13:00 – 17:00',
  'Egal, ich bin flexibel',
] as const;
