# Adriacon Treuhand GmbH – Website

Website der Adriacon Treuhand GmbH, Täfernstrasse 4, 5405 Baden-Dättwil.

**Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS** · vorbereitet für **Vercel**.

Neun Seiten:
Startseite · Leistungen · Pakete · Steuererklärungen · Checkliste (Druckansicht) · Tools ·
Über uns · Kontakt · Impressum · Datenschutz

Die Website trennt bewusst zwei Zielgruppen:
**Unternehmen** (Pakete, Paketfinder, Jahreskurs) und
**Privatpersonen** (Steuererklärungen, Checkliste, MySteuerhelfer).

---

## Inhaltsverzeichnis

1. [Voraussetzungen](#1-voraussetzungen)
2. [Installation und lokaler Start](#2-installation-und-lokaler-start)
3. [Produktions-Build](#3-produktions-build)
4. [Upload zu GitHub](#4-upload-zu-github)
5. [Verbindung mit Vercel](#5-verbindung-mit-vercel)
6. [Environment Variables](#6-environment-variables)
7. [Kontaktformular einrichten](#7-kontaktformular-einrichten)
8. [Domain adriacon.ch verbinden](#8-domain-adriaconch-verbinden)
9. [Preise anpassen](#9-preise-anpassen)
10. [Checkliste und PDF](#10-checkliste-und-pdf)
11. [MySteuerhelfer und App-Links](#11-mysteuerhelfer-und-app-links)
11a. [Mehrwertsteuer](#11a-mehrwertsteuer)
12. [Texte anpassen](#12-texte-anpassen)
13. [Logo und Bilder austauschen](#13-logo-und-bilder-austauschen)
13a. [SEO](#13a-seo--titel-beschreibungen-und-überschriften)
14. [Designsystem](#14-designsystem)
15. [Projektstruktur](#15-projektstruktur)
16. [Offene TODOs](#16-offene-todos)
17. [Typische Fehler und Lösungen](#17-typische-fehler-und-lösungen)

---

## 1. Voraussetzungen

| Werkzeug | Version | Wozu |
|---|---|---|
| **Node.js** | 20 oder neuer (empfohlen 22 LTS) | Führt das Projekt aus |
| **npm** | wird mit Node.js mitgeliefert | Installiert die Bausteine |
| **Git** | aktuell | Für den Upload zu GitHub |
| **GitHub-Konto** | – | Speichert den Programmcode |
| **Vercel-Konto** | – | Veröffentlicht die Website |

Node.js herunterladen: <https://nodejs.org> (Variante „LTS").

```bash
node -v && npm -v && git --version
```

*Optional, nur zum Neuerzeugen der PDF-Checkliste:* Python 3 mit `reportlab`.

---

## 2. Installation und lokaler Start

```bash
cd adriacon-web
npm install     # dauert beim ersten Mal 1–3 Minuten
npm run dev
```

Im Browser öffnen: **<http://localhost:3000>** · Beenden mit `Strg + C`.

> **Zu `package-lock.json`:** Diese Datei entsteht erst beim tatsächlichen
> Installieren und ist deshalb nicht im Repository enthalten. Sie wird beim
> ersten `npm install` erzeugt – checken Sie sie danach mit ein.
> Vercel deployt auch ohne diese Datei.

---

## 3. Produktions-Build

```bash
npm run build     # muss fehlerfrei durchlaufen
npm start         # gebaute Website lokal starten

npm run typecheck # TypeScript prüfen
npm run lint      # Codestil prüfen
npm run test      # Unit Tests des Paketfinders und der Preise
```

Bauen Sie immer lokal, bevor Sie etwas zu GitHub hochladen.

---

## 4. Upload zu GitHub

### Variante A – über die GitHub-Website

1. <https://github.com/new> → Name `adriacon-web` → **Private**
2. **Keine** Häkchen bei README, .gitignore oder Lizenz
3. „Create repository" → dann „uploading an existing file"
4. Den **Inhalt** des Ordners hineinziehen (nicht den Ordner selbst).
   `node_modules` und `.next` nicht hochladen.
5. „Commit changes"

### Variante B – über die Kommandozeile

```bash
cd adriacon-web
git init
git add .
git commit -m "Adriacon Website"
git branch -M main
git remote add origin https://github.com/IHR-BENUTZERNAME/adriacon-web.git
git push -u origin main
```

Die `.gitignore` schliesst `node_modules`, `.next`, `.vercel` und alle echten
`.env`-Dateien aus. Nur `.env.example` wird eingecheckt – ohne echte Schlüssel.

---

## 5. Verbindung mit Vercel

1. <https://vercel.com> → mit GitHub anmelden
2. **Add New… → Project** → `adriacon-web` → **Import**
3. Vercel erkennt Next.js automatisch. Nichts ändern.
4. Environment Variables aus Abschnitt 6 eintragen
5. **Deploy** – nach etwa zwei Minuten ist die Website online

Jeder Commit auf `main` löst danach automatisch eine neue Veröffentlichung aus.

---

## 6. Environment Variables

Einzutragen in Vercel unter **Settings → Environment Variables**.

| Variable | Pflicht? | Umgebungen | Beispielwert |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **ja** | Production, Preview, Development | `https://www.adriacon.ch` |
| `RESEND_API_KEY` | **für E-Mails nötig** | Production, Preview | `re_...` |
| `CONTACT_TO_EMAIL` | optional (Vorgabe: `info@adriacon.ch`) | Production, Preview | `info@adriacon.ch` |
| `CONTACT_FROM_EMAIL` | optional (Vorgabe: Resend-Testdomain) | Production, Preview | `Adriacon Website <website@adriacon.ch>` |

**Nach dem Eintragen oder Ändern ist ein Redeployment nötig:**
Deployments → oberster Eintrag → ⋯ → Redeploy.

Variablen mit `NEXT_PUBLIC_` sind im Browser sichtbar – dort niemals Geheimnisse ablegen.
`RESEND_API_KEY` niemals in den Code oder in `.env.example` schreiben.

Lokal:

```bash
cp .env.example .env.local
```

### Demo-Modus des Kontaktformulars

Ohne `RESEND_API_KEY` läuft das Formular im Demo-Modus: Die Website baut und
deployt normal, Absendende erhalten eine Erfolgsmeldung mit dem Hinweis, sich
zur Sicherheit direkt an info@adriacon.ch zu wenden, und die Anfrage erscheint
in den Vercel-Logs. Es wird aber **keine E-Mail versendet**. Details in
Abschnitt 7.

---

## 7. Kontaktformular einrichten

Damit Formularanfragen als E-Mail bei **info@adriacon.ch** ankommen, brauchen Sie
genau **eine** Umgebungsvariable: `RESEND_API_KEY`.

Empfänger und Absender haben sinnvolle Vorgabewerte:

| Variable | Ohne Angabe |
|---|---|
| `CONTACT_TO_EMAIL` | `info@adriacon.ch` |
| `CONTACT_FROM_EMAIL` | Testdomain von Resend (`onboarding@resend.dev`) |

### Einrichtung in fünf Minuten

1. Auf <https://resend.com> registrieren (kostenlos, 3'000 E-Mails pro Monat)
2. Unter **API Keys** einen Schlüssel erzeugen
3. In Vercel unter **Settings → Environment Variables** als `RESEND_API_KEY`
   eintragen, für Production und Preview
4. **Redeploy** auslösen
5. Formular auf der Live-Seite testen – die Anfrage sollte innert Sekunden in
   Ihrem Posteingang liegen

Damit funktioniert der Versand sofort. Die Antwortadresse ist automatisch die
E-Mail-Adresse der anfragenden Person, Sie können also direkt auf „Antworten"
klicken.

### Empfohlener zweiter Schritt: eigene Absenderdomain

Mit der Testdomain landen Mails gelegentlich im Spam. Für den Dauerbetrieb:

1. Bei Resend unter **Domains** `adriacon.ch` hinzufügen
2. Die angezeigten DNS-Einträge (SPF, DKIM) beim Domain-Anbieter eintragen
3. Warten, bis Resend „Verified" anzeigt
4. `CONTACT_FROM_EMAIL` auf `Adriacon Website <website@adriacon.ch>` setzen
5. Redeploy

### Wenn nichts konfiguriert ist

Ohne `RESEND_API_KEY` läuft das Formular im Demo-Modus: Die Anfrage wird
entgegengenommen und in den Vercel-Logs protokolliert
(`[kontakt] Kein RESEND_API_KEY gesetzt`), es wird aber keine E-Mail versendet.
Die absendende Person sieht in diesem Fall zusätzlich den Hinweis, sich zur
Sicherheit direkt an info@adriacon.ch zu wenden – so geht keine Anfrage verloren.

### Eingebauter Spam-Schutz

Unsichtbares Honeypot-Feld, Ratenbegrenzung von fünf Anfragen pro Minute und
IP-Adresse, doppelte Validierung im Browser und auf dem Server.

---

## 8. Domain adriacon.ch verbinden

1. Vercel → Projekt → **Settings → Domains**
2. `adriacon.ch` eintragen, danach `www.adriacon.ch`
3. DNS beim Domain-Anbieter setzen:
   - `adriacon.ch` → **A-Record** auf `76.76.21.21`
   - `www.adriacon.ch` → **CNAME** auf `cname.vercel-dns.com`
4. DNS-Änderungen greifen meist in Minuten, gelegentlich bis 24 Stunden
5. Eine Adresse als Hauptdomain festlegen
6. `NEXT_PUBLIC_SITE_URL` auf die Hauptdomain setzen und neu deployen

Das TLS-Zertifikat stellt Vercel automatisch aus.

---

## 9. Preise anpassen

Alles steht in **einer** Datei: `config/pricing.ts`.

### Unternehmenspakete

`pricingConfig` enthält die Zahlen, `packageCards` die fünf Karten wie sie auf der
Website erscheinen:

```ts
{
  id: 'kmu',
  name: 'ADRIACON KMU',
  audience: 'Unternehmen mit 4 bis 15 Mitarbeitenden',  // eine Zeile
  benefit: 'Löhne laufen im Monatsrhythmus …',          // ein Satz
  price: 'ab CHF 780.–',
  priceNote: 'pro Monat',
  includes: [ … ],   // erscheint erst beim Aufklappen
  extras: [ … ],     // erscheint erst beim Aufklappen
  suitedFor: '…',    // erscheint erst beim Aufklappen
}
```

Was auf der geschlossenen Karte steht, ist bewusst kurz. Neuen Text bitte in
`includes`, `extras` oder `suitedFor` ergänzen – nicht in `audience` oder `benefit`.

### Steuererklärungen für Privatpersonen

Getrennt davon in `taxOffers`:

```ts
{ id: 'privat',         audience: 'Privatperson',     price:  99, … }
{ id: 'paar',           audience: 'Paar oder Ehepaar', price: 139, … }
{ id: 'selbststaendig', audience: 'Selbstständige',    price: 180, … }
{ id: 'studierend',     audience: 'Studierende',       price:  49, … }
```

Nach jeder Änderung prüfen:

```bash
npm run test
```

Die Empfehlungslogik steht in `lib/recommendPackage.ts`. Fest verankert und
durch Tests abgesichert:

- **ADRIACON CFO wird nie direkt empfohlen** (alle 24 Antwortkombinationen geprüft)
- **Der Steuerpfad liefert nie ein Unternehmenspaket** und umgekehrt

---

## 10. Checkliste und PDF

Die Unterlagen-Checkliste hat **eine** Datenquelle:

```
config/tax-checklist.json
```

Daraus entstehen drei Dinge:

| Ausgabe | Ort |
|---|---|
| Abschnitt auf der Seite Steuererklärungen | `components/tools/TaxChecklist.tsx` |
| Druckansicht im Browser | `/steuererklaerungen/checkliste` |
| PDF zum Herunterladen | `public/downloads/adriacon-checkliste-steuererklaerung.pdf` |

**Die PDF-Datei ist bereits erzeugt und im Projekt enthalten** (eine A4-Seite,
Logo, Markenfarben, echte Kontrollkästchen).

### PDF nach einer Textänderung neu erzeugen

```bash
pip install reportlab
python3 scripts/generate-checklist-pdf.py
```

Das Skript liest `config/tax-checklist.json` und überschreibt die PDF-Datei.
Führen Sie es nach jeder Änderung an der Checkliste aus, damit Website und PDF
denselben Stand zeigen.

### Alternative ohne Python

Die Seite `/steuererklaerungen/checkliste` ist für den Druck optimiert
(Header und Footer werden ausgeblendet, A4-Format, 14 mm Rand). Im Browser
**Drucken → Als PDF sichern** wählen und die Datei unter
`public/downloads/adriacon-checkliste-steuererklaerung.pdf` ablegen.

---

## 11. MySteuerhelfer und App-Links

MySteuerhelfer ist die von Adriacon selbst entwickelte App. Sie steht allen
Interessierten offen – es gibt keine Freischaltung und kein „Zugang anfragen".

Beide Links sind in `config/site.ts` hinterlegt und aktiv:

```ts
export const mySteuerhelfer = {
  appStoreUrl: 'https://apps.apple.com/au/app/mysteuerhelfer/id6758463921',
  webAppUrl:  'https://steuererklarungs-helfer-0819f95c.base44.app/',
  platforms:  'Als App für iOS und als Webversion im Browser.',
};
```

Daraus entstehen zwei Buttons: **„Im App Store herunterladen"** und
**„MySteuerhelfer im Browser öffnen"**. Sie erscheinen auf der Seite
Steuererklärungen, auf der Tools-Seite und – als Textlinks – im Footer.
Zusätzlich steht der Browser-Button direkt im Hero der Seite Steuererklärungen.

> **TODO (Adriacon):** Der gelieferte App-Store-Link zeigt auf die
> **australische** Storefront (`/au/`). Für Schweizer Besucherinnen und Besucher
> ist normalerweise `https://apps.apple.com/ch/app/mysteuerhelfer/id6758463921`
> die richtige Adresse. Bitte einmal auf einem Schweizer Gerät prüfen und den
> Wert in `config/site.ts` bei Bedarf auf `/ch/` umstellen.

Es wurde bewusst **kein** offizielles „Download on the App Store"-Badge
verwendet, da dessen Nutzung an Apples Marketing-Richtlinien gebunden ist.
Wenn Sie das Badge einsetzen möchten, laden Sie es bei Apple Marketing Resources
herunter und ersetzen Sie den Button in `components/tools/MySteuerhelfer.tsx`.

---

## 11a. Mehrwertsteuer

Auf der Website wird die eigene MWST-Situation **nirgends erwähnt**. Es steht
weder «exklusive MWST» noch «keine MWST» bei irgendeinem Preis. Die Preise
werden schlicht als Preise angegeben.

Falls sich das ändert und MWST ausgewiesen werden muss, betrifft das folgende
Stellen: `config/pricing.ts` (`priceDisclaimer`, `taxPriceNote`),
`components/home/PackagesTeaser.tsx`, `components/tools/PaketFinder.tsx`,
`app/pakete/page.tsx` und `config/seo.ts` (Beschreibung der Paketeseite).

**Davon unberührt:** MWST bleibt als Dienstleistung für Kundinnen und Kunden
bestehen – MWST-Abrechnungen, Saldosteuersatz und effektive Methode, der
Zuschlag von CHF 60.– und die MWST-Anmeldung bei der Firmengründung.

---

## 12. Texte anpassen

| Was | Datei |
|---|---|
| Adresse, Telefon, E-Mail, Öffnungszeiten, Navigation, Koordinaten | `config/site.ts` |
| Handelsregisterangaben (UID, CH-ID, EHRA-ID, Sitz) | `config/site.ts`, Export `company` |
| Stand der Rechtstexte | `config/site.ts`, `legalUpdated` |
| Leistungen, Stufen, Werte, Team, FAQ, Steuer-FAQ | `config/content.ts` |
| Unternehmenspakete und Steuerpreise | `config/pricing.ts` |
| Checkliste | `config/tax-checklist.json` |
| Fragen des Paketfinders | `components/tools/PaketFinder.tsx` |
| Themen des Jahreskurses | `lib/jahreskurs.ts` |
| MySteuerhelfer-Erklärung | `components/tools/MySteuerhelfer.tsx` |
| Hero-Grafik (Etappen und Beschriftung) | `components/ui/CourseGraphic.tsx` |
| Seil und Palstek (Form, Farben, Grösse) | `components/ui/RopeLine.tsx` |
| Einzugsgebiet (Ortsliste) | `config/site.ts` |
| Seitentitel, Beschreibungen, Suchbegriffe, H1 | `config/seo.ts` |

Alle Texte in Schweizer Hochdeutsch („ss" statt „ß", Anrede „Sie").

---

## 13. Logo und Bilder austauschen

Alle Bilder liegen unter `public/`. Zum Austauschen die neue Datei **exakt gleich
benennen** und die alte überschreiben.

| Datei | Inhalt | Verwendet auf |
|---|---|---|
| `brand/adriacon-signet.png` | Signet farbig | Header (hell), Checkliste, PDF |
| `brand/adriacon-signet-weiss.png` | Signet weiss | Header über dem dunklen Hero, Footer |
| `brand/adriacon-logo-vertikal.png` | Logo mit Schriftzug | Strukturierte Daten |
| `images/treppe.jpg` | Treppe, Querformat | Reserve |
| `images/treppe-hoch.jpg` | Treppe, Hochformat | Über uns |
| `images/treppe-hero.jpg` | Treppe, 16:9 | Vorschaubild für Social Media |
| `team/leon-soprek.jpg` | Porträt Leon Šoprek | Über uns |
| `team/marko-bujan.jpg` | Porträt Marko Bujan | Über uns |
| `team/adriacon-team-buero.jpg` | Büroaufnahme | Startseite, Über uns |
| `images/mysteuerhelfer-app.png` | App-Ansicht | Steuererklärungen, Tools |
| `images/seil-knoten-dunkel.png` | Knoten in Navy | Seitenköpfe |
| `images/seil-strang-dunkel.png` | Seilkachel links, Navy | Seitenköpfe |
| `images/seil-strang-rechts-dunkel.png` | Seilkachel rechts, Navy | Seitenköpfe |
| `images/seil-knoten-hell.png` | Knoten in Hellblau | CTA-Band |
| `images/seil-strang-hell.png` | Seilkachel links, hell | CTA-Band |
| `images/seil-strang-rechts-hell.png` | Seilkachel rechts, hell | CTA-Band |
| `downloads/adriacon-checkliste-steuererklaerung.pdf` | Checkliste | Download-Buttons |

Das Büro-Teamfoto wird **vollständig ohne Zuschnitt** dargestellt, damit beide
Personen ganz sichtbar bleiben.

**Noch zu ergänzen:**

| Datei | Wozu |
|---|---|
| `public/brand/adriacon-logo.svg` | SVG-Logo – gestochen scharf auf allen Bildschirmen |
| `public/favicon.ico` | Browser-Symbol |
| Weitere echte Bürobilder | Über-uns-Seite noch persönlicher machen |

---

## 13a. SEO – Titel, Beschreibungen und Überschriften

Alle SEO-Angaben liegen zentral in **`config/seo.ts`**. Pro Seite sind dort
Titel, Meta-Description, Suchbegriffe, Canonical-Pfad und die H1 hinterlegt.
Die Seiten lesen die Werte über `metadataFor('seite')` aus – Sie müssen nur an
einer Stelle etwas ändern.

### Von der bestehenden Website übernommen

Titel, Beschreibungen und H1 der folgenden Seiten sind **unverändert** von
adriacon.ch übernommen, damit die dort erarbeiteten Rankings erhalten bleiben:

| Neue Seite | Bisherige Seite | Titel |
|---|---|---|
| `/` | Startseite | Adriacon Treuhand GmbH – Treuhand im Raum Aargau und Zürich |
| `/leistungen` | /dienstleistungen/ | Steuererklärung Aargau & Treuhand Schweiz – Dienstleistungen |
| `/ueber-uns` | /ueber-uns/ | Ihr KMU-Treuhand Partner im Aargau |
| `/kontakt` | /kontakt/ | Kontakt Adriacon – Treuhand & Steuerberatung in Aargau / Baden |

Auch die H1 wurden übernommen, etwa
„Steuererklärung und weitere Treuhand-Dienstleistungen im Raum Aargau und Zürich"
und „Über uns – Ihr Treuhand-Partner in der Schweiz".

### Neu formuliert

`/pakete`, `/steuererklaerungen` und `/tools` gab es bisher nicht. Ihre Titel
folgen demselben Muster aus Leistung und Region, mit den Preisen als Anker:

- „Treuhand-Pakete und Preise für KMU – ab CHF 320.– pro Monat"
- „Steuererklärung ausfüllen lassen – Aargau, Zürich und Schweiz"
- „Treuhand-Tools: Paketfinder, Steuerpreise und Jahreskurs"

### Überschriftenhierarchie

**Grundsatz: Die Überschriften folgen den Suchbegriffen, nicht der Gestaltung.**

Jede Seite hat genau eine H1, danach H2 für Abschnitte und H3 für Einträge.
Die H1 enthält immer die tragende Leistung und, wo sinnvoll, die Region:

| Seite | H1 |
|---|---|
| `/` | Adriacon Treuhand GmbH – Treuhand, Buchhaltung und Steuern im Raum Aargau und Zürich |
| `/leistungen` | Steuererklärung und weitere Treuhand-Dienstleistungen im Raum Aargau und Zürich |
| `/pakete` | Treuhand-Pakete und Preise für KMU in Aargau und Zürich |
| `/steuererklaerungen` | Steuererklärung ausfüllen lassen – Aargau, Zürich und Schweiz |
| `/tools` | Treuhand-Rechner: Kosten für Buchhaltung und Steuererklärung berechnen |
| `/ueber-uns` | Über uns – Ihr KMU-Treuhand-Partner im Aargau und in der Schweiz |
| `/kontakt` | Kontakt – Treuhand und Steuerberatung in Baden-Dättwil, Aargau |

Alle H1 stehen in `config/seo.ts` und werden von dort in die Seiten gezogen –
Sie ändern sie also an einer einzigen Stelle.

**Gestaltung und Markup laufen dabei auseinander, und das ist Absicht.**
Auf der Startseite bleibt „Wir halten Sie auf Kurs." optisch die grösste
Aussage, im Markup ist sie aber ein Absatz (`<p>`) und keine Überschrift.
Die H1 steht sichtbar direkt darunter. Dasselbe gilt auf der Steuerseite für
„Steuererklärung ausfüllen lassen. Ohne Papierstapel."

Eine Überschrift *vor* der H1 zu setzen (also etwa eine H2 über der H1) wäre
technisch möglich, bricht aber die Reihenfolge der Ebenen. Ein Absatz erreicht
dasselbe optische Ergebnis, ohne die Hierarchie zu stören. Wenn Sie dort
trotzdem ein Überschriften-Tag möchten, ist das in `components/home/Hero.tsx`
eine Änderung von einem Wort.

Auch die Abschnittsüberschriften tragen Suchbegriffe, etwa
„Treuhand-Pakete für KMU ab CHF 320.– pro Monat" statt „Fünf Pakete" oder
„MySteuerhelfer: Steuerunterlagen digital einreichen" statt nur „MySteuerhelfer".

### Suchbegriffe

Pro Seite sind zwischen 20 und 35 Begriffe hinterlegt, aufgeteilt in einen
gemeinsamen Grundstock (`baseKeywords`) und seitenspezifische Begriffe:

- **Grundstock, auf jeder Seite:** Treuhand, Treuhand Schweiz, Treuhand Aargau,
  Treuhand Zürich, Treuhand Baden, Treuhand Baden-Dättwil, Treuhandbüro Aargau,
  Treuhänder Schweiz, Buchhaltung, Buchhaltung Schweiz, Buchhaltung Aargau,
  Buchhaltung Zürich, KMU Buchhaltung, KMU Treuhand, Steuererklärung,
  Steuererklärung Aargau, Steuererklärung Zürich, Adriacon Treuhand
- **Leistungen:** Finanzbuchhaltung, Jahresabschluss erstellen lassen,
  Buchhaltung auslagern, Lohnbuchhaltung, Quellensteuer, Personaladministration,
  MWST-Abrechnung, Saldosteuersatz, Firmengründung, GmbH gründen,
  Unternehmensberatung, Liquiditätsplanung, Debitorenmanagement
- **Pakete:** Treuhand Preise, Treuhand Kosten KMU, Buchhaltung Kosten,
  Treuhand Pauschale, Firmengründung GmbH Kosten, CFO Dienstleistung KMU
- **Steuererklärungen:** Steuererklärung ausfüllen lassen, Steuererklärung
  Baden, Steuererklärung Preis, Privatpersonen, Ehepaar, Studierende,
  Selbstständige, online einreichen, digital, Steuerberatung Aargau,
  MySteuerhelfer

Bewusst **nicht** aufgenommen: Orte ohne Bezug zum Betreuungsgebiet. Suchbegriffe
für Städte, in denen Adriacon weder sitzt noch Mandate betreut, wären
Keyword-Stuffing und schaden dem Ranking mehr, als sie nützen. Google erkennt
das zuverlässig.

### Lokale Sichtbarkeit

Auf der Kontaktseite steht ein Abschnitt „Wo wir arbeiten" mit dem
Betreuungsgebiet (Baden, Wettingen, Brugg, Aarau, Lenzburg, Zürich, Dietikon,
Schlieren, Zug). Dort ist ausdrücklich vermerkt, dass es nur einen Standort gibt
– erfundene Zweigstellen würden bei Google als Spam gewertet.

Die Ortsliste steht in `config/site.ts` unter `regions` und lässt sich jederzeit
erweitern.

### Weitere SEO-Massnahmen

- `sitemap.xml` und `robots.txt` werden automatisch erzeugt
- Canonical-URL je Seite
- Open Graph und Twitter Cards je Seite, mit Vorschaubild
- `ProfessionalService`-Schema mit Adresse, **echten Geo-Koordinaten**,
  Öffnungszeiten, `knowsAbout` und einem Leistungskatalog (`hasOfferCatalog`)
- `BreadcrumbList`-Schema auf jeder Unterseite
- `FAQPage`-Schema auf der Kontakt- und auf der Steuerseite
- `googleBot`-Regeln mit `max-image-preview: large`

### Was die Website allein nicht leisten kann

Technisch ist die Seite jetzt sauber. Für vordere Plätze braucht es zusätzlich:

1. **Google Business Profile** für Baden-Dättwil vollständig ausfüllen und
   Kategorien setzen (Treuhandbüro, Steuerberater, Buchhaltung). Für lokale
   Suchanfragen ist das oft wichtiger als die Website selbst.
2. **Echte Bewertungen** einsammeln. Ich habe bewusst keine erfunden.
3. **Einträge in Schweizer Verzeichnissen** (local.ch, search.ch, Treuhand-Suva
   bzw. Branchenverbände) mit exakt identischer Schreibweise von Name, Adresse
   und Telefonnummer.
4. **Regelmässige Inhalte**, etwa kurze Beiträge zu Fristen, MWST-Themen oder
   Gründungsfragen. Dafür wäre eine Rubrik `/wissen` der nächste sinnvolle
   Ausbauschritt.
5. **Geduld.** Nach dem Umzug braucht Google einige Wochen, bis die neuen
   Adressen die alten Positionen übernommen haben.

### Umzug von WordPress – bitte nicht vergessen

Die Adressen ändern sich. Richten Sie im alten System oder bei Vercel
301-Weiterleitungen ein:

| Alt | Neu |
|---|---|
| `/dienstleistungen/` | `/leistungen` |
| `/steuererklaerung-digital/` | `/steuererklaerungen` |
| `/steuern/` | `/steuererklaerungen` |
| `/finanzbuchhaltung-abschluesse/` | `/leistungen` |
| `/lohnwesen-personaladministration/` | `/leistungen` |
| `/firmengruendung-start-up-begleitung/` | `/leistungen` |
| `/mehrwertsteuer-mwst/` | `/leistungen` |
| `/unternehmensberatung/` | `/leistungen` |
| `/web-grafikdesign/` | `/leistungen` |
| `/versicherungen/` | `/leistungen` |
| `/datenschutzerklaerung/` | `/datenschutz` |

**Diese Weiterleitungen sind bereits in `next.config.mjs` eingerichtet.** Sie
greifen automatisch, sobald die neue Website unter adriacon.ch läuft. Melden Sie
die neue Sitemap anschliessend in der Google Search Console an.

---

## 14. Designsystem

### Farben

| Rolle | Hex | Einsatz |
|---|---|---|
| **Sky** | `#8CCAEE` | Markenfarbe, Akzente, Hero-Balken |
| **Blue** | `#3884C3` | Markenfarbe, Schaltflächen, Kurslinie |
| Blue deep | `#2A6799` | Hover-Zustand |
| Sky light / pale | `#C7E5F6` / `#EAF5FC` | Ruhige Flächen |
| Navy | `#12314A` | Hero, CTA-Band, Überschriften |
| Navy deep | `#0C2436` | Footer |
| Ink | `#22333F` | Fliesstext statt hartem Schwarz |
| Ink soft / light | `#4F6473` / `#7C8D99` | Sekundärtext |
| Shell | `#F6F9FB` | Offwhite-Flächen |
| Line | `#DDE6EC` | Trennlinien und Rahmen |

### Typografie

- **Jost** (Überschriften, Navigation, Zahlen, Koordinaten) – geometrische
  Grotesk in der Tradition von Futura und damit die nächstliegende frei
  verfügbare Entsprechung zu **Glacial Indifference** aus dem Adriacon-Logo
- **Hanken Grotesk** (Fliesstext) – ruhige, gut lesbare Leseschrift

Beide werden über `next/font` beim Erstellen heruntergeladen und vom eigenen
Server ausgeliefert. Beim Seitenbesuch entsteht keine Verbindung zu Google.

### Wiederkehrende Markendetails

- **Hero-Grafik** (`components/ui/CourseGraphic.tsx`): Balken, ansteigende
  Kurslinie und fünf Wegpunkte – die Bildsprache des Logos als Etappenplan.
  Die Linie zeichnet sich langsam ein, die Balken wachsen, die Wegpunkte blenden
  nacheinander auf. Bei `prefers-reduced-motion` erscheint alles ohne Animation.
- **Koordinaten** (`components/ui/Coordinates.tsx`): das Standortdetail
  `47.4658° N · 8.2624° O`, sparsam eingesetzt in Hero-Grafik, Footer,
  unter dem Bürofoto und im Abschlussbereich der Steuerseite.
- **Bootsseil mit Knoten** (`components/ui/RopeLine.tsx`): Das Seil läuft quer
  durch den Abschnitt, der Knoten sitzt rechts. Eingesetzt in allen
  Seitenköpfen, im CTA-Band und zweimal auf der Steuerseite.

  Aufbau: `[ Kachel links, wiederholt ] [ Knoten ] [ Kachel rechts, wiederholt ]`.
  Die linke Kachel wird rechtsbündig wiederholt, die rechte linksbündig – so
  trifft an beiden Seiten des Knotens eine vollständige Kachel auf ihn, genau
  wie die Stücke in der Vorlage aneinandergrenzen. Deshalb ist keine Naht
  sichtbar, egal wie breit der Bildschirm ist.

  Über `tone` wird der Hintergrund angegeben: `light` zeichnet das Seil in Navy
  (helle Abschnitte), `dark` in Hellblau (dunkler Abschluss-Abschnitt).

  Die sechs Bilder werden aus einer einzigen Vorlage erzeugt:

  ```bash
  pip install pillow numpy
  python3 scripts/prepare-rope-assets.py
  ```

  Vorlage: `scripts/seilknoten-original.png`. Wird sie ersetzt, müssen im Skript
  die Zuschnittwerte `Y0`, `Y1`, `L`, `R` und `P` neu bestimmt werden.

- **Ansteigende Etappen** auf der Startseite: die fünf Stufen versetzen sich auf
  grossen Bildschirmen tatsächlich nach oben – Layout statt Ornament.

### Header

Der Header liegt auf der Startseite über dem dunklen Hero und ist dort hell
gesetzt (weisses Logo, helle Navigation, hellblauer CTA). Nach 40 Pixeln Scroll
– und auf allen anderen Seiten – wechselt er über 500 ms auf die helle Variante
mit dunkler Navigation und feiner Trennlinie.

---

## 15. Projektstruktur

```
adriacon-web/
├── app/
│   ├── layout.tsx                     Schriften, Metadaten, Header und Footer
│   ├── page.tsx                       Startseite
│   ├── globals.css                    Designsystem und Druckstile
│   ├── leistungen/page.tsx
│   ├── pakete/page.tsx
│   ├── steuererklaerungen/page.tsx
│   ├── steuererklaerungen/checkliste/page.tsx   Druckansicht
│   ├── tools/page.tsx
│   ├── ueber-uns/page.tsx
│   ├── kontakt/page.tsx               inklusive FAQ und FAQ-Schema
│   ├── impressum/page.tsx · datenschutz/page.tsx
│   ├── sitemap.ts · robots.ts
│   └── api/kontakt/route.ts           Formularempfang, Validierung, Versand
│
├── components/
│   ├── layout/    Header · Footer · PageHeader · LegalLayout
│   ├── ui/        Logo · CourseGraphic · RopeLine (Palstek) · Coordinates
│   │              SectionIntro · Reveal · CtaBand · PrintButton
│   ├── home/      Hero · TrustRow · ServicesOverview · PackagesTeaser
│   │              StepsPreview · ToolsTeaser · AboutTeaser
│   ├── packages/  PackageGrid (aufklappbare Karten)
│   ├── tools/     PaketFinder · TaxOffers · TaxChecklist · Jahreskurs
│   │              MySteuerhelfer
│   └── forms/     ContactForm
│
├── config/   pricing.ts · site.ts · seo.ts · content.ts · tax-checklist.json
├── lib/      recommendPackage.ts · jahreskurs.ts · format.ts · contactSchema.ts
├── scripts/  generate-checklist-pdf.py
├── types/    index.ts
├── tests/    pricing.test.ts
└── public/   brand/ · team/ · images/ · downloads/
```

---

## 16. Offene TODOs

Im Code mit `TODO` markiert:

```bash
grep -rn "TODO" app components config lib
```

### Inhaltlich zu klären

1. **App-Store-Storefront prüfen** (`config/site.ts`)
   Der gelieferte Link zeigt auf `/au/` (Australien). Für die Schweiz ist
   vermutlich `/ch/` richtig. Siehe Abschnitt 11.
2. **Abgrenzungen bei den Steuerpreisen** (`config/pricing.ts`)
   Ab wann gilt ein Fall als „aussergewöhnlich komplex" – Liegenschaften,
   Wertschriftendepots, mehrere Kantone, Krypto-Bestände? Und welcher Ansatz gilt
   dann? Aktuell steht nur der allgemeine Hinweis auf mögliche Mehrkosten.
3. **Stundensatz bei nicht digitalem Belegfluss** (`config/pricing.ts`)
   Weiterhin CHF 165.– pro Stunde oder der allgemeine Satz von CHF 119.–?
   Der Wert liegt im Code, wird auf der Website aber nicht gezeigt.
4. **„Mystery-Helper" im Paket ADRIACON KMU** (`config/pricing.ts`)
   Ich gehe davon aus, dass die App **MySteuerhelfer** gemeint ist. Bitte bestätigen.
5. **301-Weiterleitungen von den alten WordPress-Adressen** sind in
   `next.config.mjs` eingerichtet – nach dem Umzug einmal stichprobenweise prüfen.
6. **Bildrechte für die Knoten-Vorlage klären.** Die Vorlage unter
   `scripts/seilknoten-original.png` stammt nicht von Adriacon. Wenn sie von
   einer Bilddatenbank kommt, braucht es vor dem Aufschalten eine Lizenz für die
   kommerzielle Nutzung – oder eine eigene Zeichnung. Die Umstellung wäre
   einfach: neue Vorlage ablegen, `prepare-rope-assets.py` ausführen.
7. **SVG-Logo und Favicon** – siehe Abschnitt 13.
8. **Telefonnummer in der Datenschutzerklärung** – Ihre Textvorlage nannte
   +41 76 680 40 08, auf der Website steht überall +41 76 541 40 08. Ich habe
   die Nummer der Website verwendet, damit der Auftritt einheitlich bleibt.
   Bitte bestätigen, welche Nummer richtig ist (`config/site.ts`, `phone`).

### Rechtlich zu prüfen

| Ort | Was |
|---|---|
| `app/impressum/page.tsx` | Vollständig ausgefüllt mit den Handelsregisterdaten. Haftungs- und Urheberrechtsklauseln durch eine Fachperson bestätigen lassen. |
| `app/datenschutz/page.tsx` | Vollständig ausformuliert nach Ihrer Vorlage, ohne Platzhalter. Inhalt vor dem Aufschalten bestätigen lassen. |
| Steuerpreise | Hinweis auf mögliche Mehrkosten bei komplexen Verhältnissen |
| Checkliste und PDF | Hinweis „allgemeine Orientierung, keine Beratung" ist gesetzt |
| Paketfinder | Hinweis „unverbindliche Orientierung, keine Offerte" ist gesetzt |
| Jahreskurs | Bewusst ohne konkrete Fristen, mit Hinweis auf kantonale Abweichungen |

Impressum und Datenschutzerklärung enthalten **keine Platzhalter mehr**. Die
Handelsregisterangaben stammen aus dem Eintrag beim Handelsregisteramt des
Kantons Aargau:

| Feld | Wert |
|---|---|
| Rechtsform | Gesellschaft mit beschränkter Haftung (GmbH) |
| Sitz | Baden |
| UID | CHE-375.188.509 |
| CH-ID | CH-400-4457396-2 |
| EHRA-ID | 1711555 |

Diese Werte stehen in `config/site.ts` unter `company` und sollten nur nach
ausdrücklicher Vorgabe geändert werden.

### Bewusst nicht erfunden

Keine Kundenzahlen, Bewertungen, Auszeichnungen, Zertifizierungen,
Partnerschaften, Gründungsjahre, Lebensläufe, App-Store-Links oder
Preisbedingungen. Alle Angaben stammen von adriacon.ch, aus der Preisliste oder
aus Ihren Vorgaben.

---

## 17. Typische Fehler und Lösungen

**`npm install` bricht ab**
Node-Version prüfen (`node -v`, mindestens 20). Danach `node_modules` und
`package-lock.json` löschen und erneut installieren.

**`npm run build` meldet einen TypeScript-Fehler**
Die Meldung nennt Datei und Zeile. Häufigste Ursache: beim Bearbeiten von
`config/content.ts`, `config/pricing.ts` oder `config/tax-checklist.json` wurde
ein Komma oder eine Klammer entfernt.

**Vercel-Deployment schlägt fehl**
In Vercel unter „Deployments" die Build-Logs lesen. Meist fehlt eine Environment
Variable oder es liegt derselbe Fehler vor, den auch `npm run build` lokal zeigt.

**Kontaktformular sendet keine E-Mails**
1. Alle drei Variablen in Vercel gesetzt?
2. Nach dem Setzen ein Redeployment ausgelöst?
3. Domain bei Resend als „Verified" markiert?
4. Stimmt `CONTACT_FROM_EMAIL` mit der verifizierten Domain überein?

**Der Download der Checkliste liefert 404**
Prüfen, ob `public/downloads/adriacon-checkliste-steuererklaerung.pdf` im
Repository liegt. Die Datei ist Teil des Projekts und muss mit hochgeladen werden.

**Bilder werden nicht angezeigt**
Gross- und Kleinschreibung prüfen. Unter Windows funktioniert `Logo.png` statt
`logo.png` lokal, auf Vercel nicht. Alle Dateinamen hier sind kleingeschrieben.

**Änderungen erscheinen nicht im Browser**
Server beenden, Ordner `.next` löschen, `npm run dev` neu starten.

---

## Barrierefreiheit und Performance

- Semantisches HTML mit korrekter Überschriftenhierarchie je Seite
- „Zum Inhalt springen"-Link
- Sichtbare Fokus-Zustände auf allen bedienbaren Elementen
- Header mit ausreichendem Kontrast in beiden Zuständen
- Hero-Grafik mit beschreibendem `aria-label`
- Paketkarten, Paketfinder und Jahreskurs vollständig mit Tastatur bedienbar
- `prefers-reduced-motion` schaltet alle Animationen ab, auch die Hero-Grafik
- Feste Bildabmessungen, keine Layout-Sprünge
- Server Components überall dort, wo keine Interaktivität nötig ist
- Metadaten, Canonical-URL, Sitemap, robots.txt und strukturierte Daten je Seite
- Druckstile für die Checkliste

---

## Lizenz und Rechte

Der Programmcode gehört der Adriacon Treuhand GmbH.
Logo, Teamfotos und Markeninhalte sind Eigentum der Adriacon Treuhand GmbH.
