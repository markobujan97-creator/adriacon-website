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
11. [MySteuerhelfer und App-Store-Link](#11-mysteuerhelfer-und-app-store-link)
12. [Texte anpassen](#12-texte-anpassen)
13. [Logo und Bilder austauschen](#13-logo-und-bilder-austauschen)
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
| `RESEND_API_KEY` | optional | Production, Preview | `re_...` |
| `CONTACT_FROM_EMAIL` | optional | Production, Preview | `Adriacon Website <website@adriacon.ch>` |
| `CONTACT_TO_EMAIL` | optional | Production, Preview | `info@adriacon.ch` |

**Nach dem Eintragen oder Ändern ist ein Redeployment nötig:**
Deployments → oberster Eintrag → ⋯ → Redeploy.

Variablen mit `NEXT_PUBLIC_` sind im Browser sichtbar – dort niemals Geheimnisse ablegen.
`RESEND_API_KEY` niemals in den Code oder in `.env.example` schreiben.

Lokal:

```bash
cp .env.example .env.local
```

### Demo-Modus des Kontaktformulars

Sind die drei E-Mail-Variablen **nicht** gesetzt, läuft das Formular im Demo-Modus:
Die Website baut und deployt normal, Absendende erhalten eine Erfolgsmeldung, die
Anfrage erscheint in den Vercel-Logs (`[kontakt] Kein Versanddienst konfiguriert`),
es wird aber **keine E-Mail versendet**.

---

## 7. Kontaktformular einrichten

Versand über **Resend** (<https://resend.com>), kostenloses Kontingent 3'000 E-Mails/Monat.

1. Bei Resend registrieren
2. Unter **Domains** `adriacon.ch` hinzufügen
3. Die angezeigten DNS-Einträge (SPF, DKIM) beim Domain-Anbieter eintragen
4. Warten, bis Resend „Verified" anzeigt
5. Unter **API Keys** einen Schlüssel erzeugen
6. In Vercel als `RESEND_API_KEY` eintragen
7. `CONTACT_FROM_EMAIL` auf eine Adresse der verifizierten Domain setzen
8. `CONTACT_TO_EMAIL` auf `info@adriacon.ch` setzen
9. Redeployment auslösen und auf der Live-Seite testen

**Eingebauter Schutz:** unsichtbares Honeypot-Feld, Ratenbegrenzung von fünf
Anfragen pro Minute und IP, doppelte Validierung im Browser und auf dem Server.

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

## 11. MySteuerhelfer und App-Store-Link

MySteuerhelfer ist die von Adriacon selbst entwickelte App. Sie steht allen
Interessierten offen – es gibt keine Freischaltung und kein „Zugang anfragen".

**Offen:** Der echte App-Store-Link fehlt noch. Er wird zentral hinterlegt in
`config/site.ts`:

```ts
export const mySteuerhelfer = {
  appStoreUrl: null,   // ← TODO: echten App-Store-Link eintragen
  webAppUrl: null,     // ← optional, falls eine Webversion existiert
  platforms: 'Verfügbar für iOS.',
};
```

Solange `appStoreUrl` auf `null` steht, wird der Button **deaktiviert**
dargestellt und verweist bewusst nirgendwohin. Darunter erscheint der Hinweis,
dass der Download-Link ergänzt wird. Sobald Sie den echten Link eintragen,
wird der Button automatisch aktiv – sonst ist nichts zu tun.

Es wurde bewusst **kein** offizielles „Download on the App Store"-Badge
verwendet, da dessen Nutzung an Apples Marketing-Richtlinien gebunden ist.
Wenn Sie das offizielle Badge einsetzen möchten, laden Sie es bei Apple
Marketing Resources herunter und ersetzen Sie den Button in
`components/tools/MySteuerhelfer.tsx`.

---

## 12. Texte anpassen

| Was | Datei |
|---|---|
| Adresse, Telefon, E-Mail, Öffnungszeiten, Navigation, Koordinaten | `config/site.ts` |
| Leistungen, Stufen, Werte, Team, FAQ, Steuer-FAQ | `config/content.ts` |
| Unternehmenspakete und Steuerpreise | `config/pricing.ts` |
| Checkliste | `config/tax-checklist.json` |
| Fragen des Paketfinders | `components/tools/PaketFinder.tsx` |
| Themen des Jahreskurses | `lib/jahreskurs.ts` |
| MySteuerhelfer-Erklärung | `components/tools/MySteuerhelfer.tsx` |
| Hero-Grafik (Etappen und Beschriftung) | `components/ui/CourseGraphic.tsx` |
| Seitentitel und SEO je Seite | jeweils `app/<seite>/page.tsx` |

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
- **Stufenlinie** (`components/ui/StepLine.tsx`): feine ansteigende Kontur in
  Seitenköpfen und CTA-Bändern.
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
│   ├── ui/        Logo · CourseGraphic · StepLine · Coordinates
│   │              SectionIntro · Reveal · CtaBand · PrintButton
│   ├── home/      Hero · TrustRow · ServicesOverview · PackagesTeaser
│   │              StepsPreview · ToolsTeaser · AboutTeaser
│   ├── packages/  PackageGrid (aufklappbare Karten)
│   ├── tools/     PaketFinder · TaxOffers · TaxChecklist · Jahreskurs
│   │              MySteuerhelfer
│   └── forms/     ContactForm
│
├── config/   pricing.ts · site.ts · content.ts · tax-checklist.json
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

1. **App-Store-Link für MySteuerhelfer** (`config/site.ts`)
   Der Button ist vorbereitet und bis dahin deaktiviert. Siehe Abschnitt 11.
2. **Abgrenzungen bei den Steuerpreisen** (`config/pricing.ts`)
   Ab wann gilt ein Fall als „aussergewöhnlich komplex" – Liegenschaften,
   Wertschriftendepots, mehrere Kantone, Krypto-Bestände? Und welcher Ansatz gilt
   dann? Aktuell steht nur der allgemeine Hinweis auf mögliche Mehrkosten.
3. **Stundensatz bei nicht digitalem Belegfluss** (`config/pricing.ts`)
   Weiterhin CHF 165.– pro Stunde oder der allgemeine Satz von CHF 119.–?
   Der Wert liegt im Code, wird auf der Website aber nicht gezeigt.
4. **„Mystery-Helper" im Paket ADRIACON KMU** (`config/pricing.ts`)
   Ich gehe davon aus, dass die App **MySteuerhelfer** gemeint ist. Bitte bestätigen.
5. **Standortkoordinaten** (`config/site.ts`)
   `47.4658° N · 8.2624° O` – bitte exakt bestätigen, sie erscheinen sichtbar.
6. **SVG-Logo und Favicon** – siehe Abschnitt 13.

### Rechtlich zu prüfen

| Ort | Was |
|---|---|
| `app/impressum/page.tsx` | UID-Nummer, MWST-Nummer, Handelsregistereintrag, Haftungsklauseln |
| `app/datenschutz/page.tsx` | Verantwortliche Stelle, Aufbewahrungsdauer, Dienstleisterliste |
| Steuerpreise | Hinweis auf mögliche Mehrkosten bei komplexen Verhältnissen |
| Checkliste und PDF | Hinweis „allgemeine Orientierung, keine Beratung" ist gesetzt |
| Paketfinder | Hinweis „unverbindliche Orientierung, keine Offerte" ist gesetzt |
| Jahreskurs | Bewusst ohne konkrete Fristen, mit Hinweis auf kantonale Abweichungen |

Impressum und Datenschutzerklärung sind Vorlagen mit sichtbaren
`[TODO: …]`-Platzhaltern, die vor dem Aufschalten ersetzt werden müssen.

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
