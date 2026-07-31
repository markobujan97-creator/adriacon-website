# Adriacon Treuhand GmbH – Website

Website der Adriacon Treuhand GmbH, Täfernstrasse 4, 5405 Baden-Dättwil.

**Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS** · vorbereitet für **Vercel**.

Acht echte Seiten – kein Onepager:
Start · Leistungen · Pakete · Tools · Über uns · Kontakt · Impressum · Datenschutz

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
9. [Preise und Pakete anpassen](#9-preise-und-pakete-anpassen)
10. [Texte anpassen](#10-texte-anpassen)
11. [Logo und Bilder austauschen](#11-logo-und-bilder-austauschen)
12. [Designsystem](#12-designsystem)
13. [Projektstruktur](#13-projektstruktur)
14. [Offene TODOs](#14-offene-todos)
15. [Typische Fehler und Lösungen](#15-typische-fehler-und-lösungen)

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

---

## 2. Installation und lokaler Start

```bash
cd adriacon-web
npm install     # dauert beim ersten Mal 1–3 Minuten
npm run dev
```

Im Browser öffnen: **<http://localhost:3000>**
Beenden mit `Strg + C`.

> **Zu `package-lock.json`:** Diese Datei entsteht erst beim tatsächlichen
> Installieren und ist deshalb nicht im Repository enthalten. Sie wird beim
> ersten `npm install` automatisch erzeugt – checken Sie sie danach mit ein.
> Vercel deployt auch ohne diese Datei.

---

## 3. Produktions-Build

```bash
npm run build     # muss fehlerfrei durchlaufen
npm start         # gebaute Website lokal starten

npm run typecheck # TypeScript prüfen
npm run lint      # Codestil prüfen
npm run test      # Unit Tests des Paketfinders
```

Bauen Sie immer lokal, bevor Sie etwas zu GitHub hochladen.

---

## 4. Upload zu GitHub

### Variante A – über die GitHub-Website

1. <https://github.com/new> → Name `adriacon-web` → **Private** wählen
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

- Die Website baut und deployt normal, der Build schlägt **nicht** fehl
- Absendende erhalten eine Erfolgsmeldung
- Die Anfrage erscheint in den Vercel-Logs (`[kontakt] Kein Versanddienst konfiguriert`)
- Es wird **keine E-Mail versendet**

So können Sie sofort veröffentlichen und den Versand später ergänzen.

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
5. Eine Adresse als Hauptdomain festlegen, die andere leitet automatisch weiter
6. `NEXT_PUBLIC_SITE_URL` auf die Hauptdomain setzen und neu deployen

Das TLS-Zertifikat stellt Vercel automatisch aus.

> Die bestehende WordPress-Seite bleibt erreichbar, bis die DNS-Einträge geändert
> sind. Sichern Sie vorher die alten Inhalte.

---

## 9. Preise und Pakete anpassen

Alles steht in einer einzigen Datei:

```
config/pricing.ts
```

Dort finden Sie zwei Bereiche:

**`pricingConfig`** – die reinen Zahlen (Paketpreise, Zuschläge, Stundensatz).

**`packageCards`** – die fünf Karten, wie sie auf der Website erscheinen:

```ts
{
  id: 'kmu',
  name: 'ADRIACON KMU',
  audience: 'Unternehmen mit 4 bis 15 Mitarbeitenden',  // eine Zeile
  benefit: 'Löhne laufen im Monatsrhythmus …',          // ein Satz
  price: 'ab CHF 780.–',                                // sichtbar auf der Karte
  priceNote: 'pro Monat',
  includes: [ … ],   // erscheint erst beim Aufklappen
  extras: [ … ],     // erscheint erst beim Aufklappen
  suitedFor: '…',    // erscheint erst beim Aufklappen
}
```

Was auf der geschlossenen Karte steht, ist bewusst kurz. Alles Weitere erscheint
erst auf Klick. Wenn Sie Text ergänzen, ergänzen Sie ihn in `includes`, `extras`
oder `suitedFor` – nicht in `audience` oder `benefit`.

Nach jeder Änderung prüfen:

```bash
npm run test
```

Die Empfehlungslogik des Paketfinders steht in `lib/recommendPackage.ts`.
Fest verankert: **ADRIACON CFO wird nie direkt empfohlen**, und Privatpersonen
erhalten keinen Listenpreis, sondern eine persönliche Einschätzung.

---

## 10. Texte anpassen

| Was | Datei |
|---|---|
| Adresse, Telefon, E-Mail, Öffnungszeiten, Navigation | `config/site.ts` |
| Leistungen, Stufen, Werte, Team, FAQ | `config/content.ts` |
| Pakete, Preise, Zuschläge | `config/pricing.ts` |
| Fragen des Paketfinders | `components/tools/PaketFinder.tsx` |
| Radar-Fragen und Empfehlungen | `lib/radar.ts` |
| Themen des Jahreskurses | `lib/jahreskurs.ts` |
| MySteuerhelfer-Erklärung | `components/tools/MySteuerhelfer.tsx` |
| Seitentitel und SEO je Seite | jeweils `app/<seite>/page.tsx` |
| Impressum, Datenschutz | `app/impressum/`, `app/datenschutz/` |

Alle Texte in Schweizer Hochdeutsch („ss" statt „ß", Anrede „Sie").

---

## 11. Logo und Bilder austauschen

Alle Bilder liegen unter `public/`. Zum Austauschen die neue Datei **exakt gleich
benennen** und die alte überschreiben.

| Datei | Inhalt | Verwendet auf |
|---|---|---|
| `brand/adriacon-signet.png` | Signet farbig | Header |
| `brand/adriacon-signet-weiss.png` | Signet weiss | Footer |
| `brand/adriacon-logo-vertikal.png` | Logo mit Schriftzug | Strukturierte Daten |
| `images/treppe.jpg` | Treppe, Querformat | Startseite Hero |
| `images/treppe-hoch.jpg` | Treppe, Hochformat | Über uns |
| `images/treppe-hero.jpg` | Treppe, 16:9 | Vorschaubild für Social Media |
| `team/leon-soprek.jpg` | Porträt Leon Šoprek | Über uns |
| `team/marko-bujan.jpg` | Porträt Marko Bujan | Über uns |
| `team/adriacon-team-buero.jpg` | Büroaufnahme | Startseite, Über uns |
| `images/mysteuerhelfer-app.png` | App-Ansicht | Tools |

**Noch zu ergänzen:**

| Datei | Wozu |
|---|---|
| `public/brand/adriacon-logo.svg` | SVG-Logo – gestochen scharf auf allen Bildschirmen |
| `public/favicon.ico` | Browser-Symbol |
| Weitere echte Bürobilder | Über-uns-Seite noch persönlicher machen |

Nach dem Hinzufügen eines SVG-Logos `components/ui/Logo.tsx` anpassen.

---

## 12. Designsystem

### Farben

| Rolle | Hex | Einsatz |
|---|---|---|
| **Sky** | `#8CCAEE` | Markenfarbe, Akzente, aktive Zustände |
| **Blue** | `#3884C3` | Markenfarbe, Schaltflächen, Links |
| Blue deep | `#2A6799` | Hover-Zustand |
| Sky light / pale | `#C7E5F6` / `#EAF5FC` | Sehr ruhige Flächen |
| Navy | `#12314A` | Überschriften, CTA-Band |
| Navy deep | `#0C2436` | Footer |
| Ink | `#22333F` | Fliesstext statt hartem Schwarz |
| Ink soft / light | `#4F6473` / `#7C8D99` | Sekundärtext |
| Shell | `#F6F9FB` | Offwhite-Flächen |
| Line | `#DDE6EC` | Trennlinien und Rahmen |

Es kommen keine anderen Farben vor.

### Typografie

- **Jost** (Überschriften, Navigation, Zahlen) – geometrische Grotesk in der
  Tradition von Futura und damit die nächstliegende frei verfügbare Entsprechung
  zu **Glacial Indifference** aus dem Adriacon-Logo
- **Hanken Grotesk** (Fliesstext) – ruhige, gut lesbare Leseschrift

Beide werden über `next/font` beim Erstellen heruntergeladen und vom eigenen
Server ausgeliefert. Beim Seitenbesuch entsteht keine Verbindung zu Google.

### Das Stufenmotiv

Die Treppe ist kein Dekorbild, sondern Struktur:

- **Startseite:** das echte Treppenbild im Hero
- **Abschnitt „So arbeiten wir":** die fünf Stufen steigen auf grossen
  Bildschirmen tatsächlich an – Layout statt Ornament
- **Seitenköpfe und CTA-Band:** eine feine Stufenlinie (`components/ui/StepLine.tsx`)
- **Über uns:** das Treppenbild im Hochformat neben der Haltung „Stufe für Stufe
  statt alles auf einmal"

---

## 13. Projektstruktur

```
adriacon-web/
├── app/
│   ├── layout.tsx           Schriften, Metadaten, Header und Footer
│   ├── page.tsx             Startseite
│   ├── globals.css          Designsystem
│   ├── leistungen/page.tsx
│   ├── pakete/page.tsx
│   ├── tools/page.tsx
│   ├── ueber-uns/page.tsx
│   ├── kontakt/page.tsx     inklusive FAQ und FAQ-Schema
│   ├── impressum/page.tsx
│   ├── datenschutz/page.tsx
│   ├── sitemap.ts · robots.ts
│   └── api/kontakt/route.ts Formularempfang, Validierung, Versand
│
├── components/
│   ├── layout/    Header · Footer · PageHeader · LegalLayout
│   ├── ui/        Logo · StepLine · SectionIntro · Reveal · CtaBand
│   ├── home/      Hero · TrustRow · ServicesOverview · PackagesTeaser
│   │              StepsPreview · ToolsTeaser · AboutTeaser
│   ├── packages/  PackageGrid (aufklappbare Karten)
│   ├── tools/     PaketFinder · BusinessRadar · RadarChart · Jahreskurs
│   │              MySteuerhelfer
│   └── forms/     ContactForm
│
├── config/  pricing.ts · site.ts · content.ts
├── lib/     recommendPackage.ts · radar.ts · jahreskurs.ts · format.ts
│            contactSchema.ts
├── types/   index.ts
├── tests/   pricing.test.ts
└── public/  brand/ · team/ · images/
```

---

## 14. Offene TODOs

Im Code mit `TODO` markiert:

```bash
grep -rn "TODO" app components config lib
```

### Inhaltlich zu klären

1. **Stundensatz bei nicht digitalem Belegfluss** (`config/pricing.ts`) –
   weiterhin CHF 165.– pro Stunde oder der allgemeine Satz von CHF 119.–?
   Der Wert liegt im Code, wird auf der Website aber nicht gezeigt.
2. **„Mystery-Helper" im Paket ADRIACON KMU** (`config/pricing.ts`) – ich gehe
   davon aus, dass die App **MySteuerhelfer** gemeint ist. Bitte bestätigen.
3. **Preise für Privatpersonen** – in der Preisliste nicht enthalten. Der
   Paketfinder zeigt deshalb bewusst keinen Preis, sondern eine persönliche
   Einschätzung.
4. **SVG-Logo und Favicon** – siehe Abschnitt 11.

### Rechtlich zu prüfen

| Ort | Was |
|---|---|
| `app/impressum/page.tsx` | UID-Nummer, MWST-Nummer, Handelsregistereintrag, Haftungsklauseln |
| `app/datenschutz/page.tsx` | Verantwortliche Stelle, Aufbewahrungsdauer, Dienstleisterliste |
| Paketfinder | Hinweis „unverbindliche Orientierung, keine Offerte" ist gesetzt |
| Business Radar | Kennzeichnung als Selbsteinschätzung ohne Bonitätsbewertung |
| Jahreskurs | Bewusst ohne konkrete Fristen, mit Hinweis auf kantonale Abweichungen |

Impressum und Datenschutzerklärung sind Vorlagen mit sichtbaren
`[TODO: …]`-Platzhaltern, die vor dem Aufschalten ersetzt werden müssen.

### Bewusst nicht erfunden

Keine Kundenzahlen, Bewertungen, Auszeichnungen, Zertifizierungen,
Partnerschaften, Gründungsjahre oder Lebensläufe. Alle Angaben stammen von
adriacon.ch oder aus der gelieferten Preisliste.

---

## 15. Typische Fehler und Lösungen

**`npm install` bricht ab**
Node-Version prüfen (`node -v`, mindestens 20). Danach `node_modules` und
`package-lock.json` löschen und erneut installieren.

**`npm run build` meldet einen TypeScript-Fehler**
Die Meldung nennt Datei und Zeile. Häufigste Ursache: beim Bearbeiten von
`config/content.ts` oder `config/pricing.ts` wurde ein Komma oder eine Klammer
entfernt.

**Vercel-Deployment schlägt fehl**
In Vercel unter „Deployments" die Build-Logs lesen. Meist fehlt eine Environment
Variable oder es liegt derselbe Fehler vor, den auch `npm run build` lokal zeigt.

**Kontaktformular sendet keine E-Mails**
1. Alle drei Variablen in Vercel gesetzt?
2. Nach dem Setzen ein Redeployment ausgelöst?
3. Domain bei Resend als „Verified" markiert?
4. Stimmt `CONTACT_FROM_EMAIL` mit der verifizierten Domain überein?

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
- Paketkarten, Paketfinder, Radar und Jahreskurs vollständig mit Tastatur bedienbar
- `prefers-reduced-motion` schaltet alle Animationen ab
- Feste Bildabmessungen, keine Layout-Sprünge
- Server Components überall dort, wo keine Interaktivität nötig ist
- Metadaten, Canonical-URL, Sitemap, robots.txt und strukturierte Daten je Seite

---

## Lizenz und Rechte

Der Programmcode gehört der Adriacon Treuhand GmbH.
Logo, Teamfotos und Markeninhalte sind Eigentum der Adriacon Treuhand GmbH.
