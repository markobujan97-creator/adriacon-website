# Adriacon Treuhand GmbH – Website

Website der Adriacon Treuhand GmbH, Täfernstrasse 4, 5405 Baden-Dättwil.

Gebaut mit **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS** und **Framer Motion**.
Vorbereitet für den Betrieb auf **Vercel**.

Enthaltene Werkzeuge:

- **Adriacon Kursfinder** – mehrstufiger Paket- und Preisrechner
- **Adriacon Business Radar** – visuelle Standortbestimmung als Selbsteinschätzung
- **Ihr Jahreskurs** – interaktives Jahresrad der administrativen Themen

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
10. [Texte anpassen](#10-texte-anpassen)
11. [Logo und Bilder austauschen](#11-logo-und-bilder-austauschen)
12. [Projektstruktur](#12-projektstruktur)
13. [Offene TODOs](#13-offene-todos)
14. [Typische Fehler und Lösungen](#14-typische-fehler-und-lösungen)

---

## 1. Voraussetzungen

| Werkzeug | Version | Wozu |
|---|---|---|
| **Node.js** | 20 oder neuer (empfohlen: 22 LTS) | Führt das Projekt aus |
| **npm** | wird mit Node.js mitgeliefert | Installiert die Bausteine |
| **Git** | aktuell | Für den Upload zu GitHub |
| **GitHub-Konto** | – | Speichert den Programmcode |
| **Vercel-Konto** | – | Veröffentlicht die Website |

Node.js herunterladen: <https://nodejs.org> (Variante „LTS" wählen).

Prüfen, ob alles installiert ist – im Terminal bzw. in der Eingabeaufforderung:

```bash
node -v
npm -v
git --version
```

---

## 2. Installation und lokaler Start

```bash
# 1. In den Projektordner wechseln
cd adriacon-web

# 2. Alle Bausteine installieren (dauert beim ersten Mal 1–3 Minuten)
npm install

# 3. Entwicklungsserver starten
npm run dev
```

Danach im Browser öffnen: **<http://localhost:3000>**

Änderungen an Dateien erscheinen sofort im Browser. Beenden mit `Strg + C` im Terminal.

> **Hinweis zu `package-lock.json`**
> Diese Datei ist nicht im Repository enthalten, weil sie nur beim tatsächlichen
> Installieren entsteht. Sie wird beim ersten `npm install` automatisch erzeugt.
> Checken Sie sie danach mit ein – das sorgt für reproduzierbare Builds.
> Vercel funktioniert auch ohne diese Datei.

---

## 3. Produktions-Build

```bash
# Testet, ob die Website fehlerfrei gebaut werden kann
npm run build

# Startet die gebaute Website lokal
npm start
```

Weitere nützliche Befehle:

```bash
npm run typecheck   # Prüft alle TypeScript-Typen
npm run lint        # Prüft den Code auf Stilfehler
npm run test        # Führt die Preis-Unit-Tests aus (29 Prüfungen)
```

`npm run build` sollte immer fehlerfrei durchlaufen, bevor Sie etwas zu GitHub hochladen.

---

## 4. Upload zu GitHub

### Variante A – über die GitHub-Website (ohne Kommandozeile)

1. Auf <https://github.com/new> ein neues Repository anlegen, z. B. `adriacon-web`.
2. Sichtbarkeit **Private** wählen.
3. **Keine** Häkchen bei „Add a README", „Add .gitignore" oder „Choose a license".
4. Auf „Create repository" klicken.
5. Auf der folgenden Seite auf **„uploading an existing file"** klicken.
6. Den **Inhalt** des Ordners `adriacon-web` hineinziehen – nicht den Ordner selbst.
   Falls bereits ein Ordner `node_modules` oder `.next` existiert: **nicht** hochladen.
7. Unten auf „Commit changes" klicken.

### Variante B – über die Kommandozeile

```bash
cd adriacon-web
git init
git add .
git commit -m "Erste Version der Adriacon-Website"
git branch -M main
git remote add origin https://github.com/IHR-BENUTZERNAME/adriacon-web.git
git push -u origin main
```

Die Datei `.gitignore` sorgt dafür, dass `node_modules`, `.next`, `.vercel` und alle
echten `.env`-Dateien **nicht** hochgeladen werden. Nur `.env.example` wird eingecheckt –
sie enthält bewusst keine echten Schlüssel.

---

## 5. Verbindung mit Vercel

1. Auf <https://vercel.com> mit dem GitHub-Konto anmelden.
2. **Add New… → Project** wählen.
3. Das Repository `adriacon-web` auswählen und auf **Import** klicken.
4. Vercel erkennt Next.js automatisch. Diese Werte sind bereits korrekt:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: (leer lassen)
   - Install Command: `npm install`
5. Unter **Environment Variables** die Werte aus Abschnitt 6 eintragen.
6. Auf **Deploy** klicken. Nach etwa zwei Minuten ist die Website online.

Ab jetzt gilt: Jeder neue Commit auf dem Branch `main` löst automatisch eine neue
Veröffentlichung aus.

---

## 6. Environment Variables

Einzutragen in Vercel unter **Settings → Environment Variables**.

| Variable | Pflicht? | Umgebungen | Beispielwert |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **ja** | Production, Preview, Development | `https://www.adriacon.ch` |
| `RESEND_API_KEY` | optional | Production, Preview | `re_...` |
| `CONTACT_FROM_EMAIL` | optional | Production, Preview | `Adriacon Website <website@adriacon.ch>` |
| `CONTACT_TO_EMAIL` | optional | Production, Preview | `info@adriacon.ch` |

**Wichtig:**

- Nach dem Eintragen oder Ändern einer Variable ist ein **Redeployment nötig**.
  In Vercel: **Deployments → oberster Eintrag → ⋯ → Redeploy**.
- Variablen mit dem Präfix `NEXT_PUBLIC_` sind im Browser sichtbar. Legen Sie dort
  niemals Geheimnisse ab.
- `RESEND_API_KEY` niemals in den Code oder in `.env.example` schreiben.

**Lokal** legen Sie eine Datei `.env.local` an (wird nicht eingecheckt):

```bash
cp .env.example .env.local
```

### Demo-Modus des Kontaktformulars

Sind `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` und `CONTACT_TO_EMAIL` **nicht** gesetzt,
läuft das Formular im **Demo-Modus**:

- Die Website baut und deployt normal, der Build schlägt **nicht** fehl.
- Absendende erhalten eine Erfolgsmeldung.
- Die Anfrage wird in der Serverkonsole protokolliert (in Vercel unter „Logs" sichtbar).
- Es wird **keine E-Mail versendet**.

So können Sie die Seite sofort veröffentlichen und den E-Mail-Versand später ergänzen.

---

## 7. Kontaktformular einrichten

Das Formular verschickt E-Mails über **Resend** (<https://resend.com>). Kostenloses
Kontingent: 3'000 E-Mails pro Monat, ausreichend für eine Firmenwebsite.

1. Bei Resend registrieren.
2. Unter **Domains** die Domain `adriacon.ch` hinzufügen.
3. Die angezeigten DNS-Einträge (SPF, DKIM) beim Domain-Anbieter eintragen.
4. Warten, bis Resend die Domain als „Verified" anzeigt.
5. Unter **API Keys** einen Schlüssel erzeugen und kopieren.
6. In Vercel als `RESEND_API_KEY` eintragen.
7. `CONTACT_FROM_EMAIL` auf eine Adresse Ihrer verifizierten Domain setzen.
8. `CONTACT_TO_EMAIL` auf `info@adriacon.ch` setzen.
9. Redeployment auslösen und das Formular auf der Live-Seite testen.

**Alternative:** Wenn Sie lieber Formspree oder einen anderen Dienst nutzen, tauschen
Sie den Versandteil in `app/api/kontakt/route.ts` aus. Validierung, Honeypot und
Ratenbegrenzung bleiben davon unberührt.

### Eingebauter Spam-Schutz

- **Honeypot-Feld** – ein für Menschen unsichtbares Feld; füllt ein Bot es aus, wird die
  Anfrage stillschweigend verworfen.
- **Ratenbegrenzung** – maximal 5 Anfragen pro Minute und IP-Adresse.
- **Doppelte Validierung** – im Browser und nochmals auf dem Server.

---

## 8. Domain adriacon.ch verbinden

1. In Vercel das Projekt öffnen → **Settings → Domains**.
2. `adriacon.ch` eintragen und bestätigen. Danach `www.adriacon.ch` ergänzen.
3. Vercel zeigt die benötigten DNS-Einträge an. Diese beim Domain-Anbieter setzen:
   - `adriacon.ch` → **A-Record** auf `76.76.21.21`
   - `www.adriacon.ch` → **CNAME** auf `cname.vercel-dns.com`
4. Die DNS-Änderung braucht meist wenige Minuten, gelegentlich bis zu 24 Stunden.
5. In Vercel eine der beiden Adressen als Hauptdomain festlegen; die andere wird
   automatisch weitergeleitet.
6. `NEXT_PUBLIC_SITE_URL` auf die gewählte Hauptdomain setzen und neu deployen.

Das TLS-Zertifikat stellt Vercel automatisch aus.

> **Achtung beim Umstellen:** Die bestehende WordPress-Seite bleibt erreichbar, bis
> die DNS-Einträge geändert sind. Planen Sie die Umstellung bewusst und sichern Sie
> vorher die alten Inhalte.

---

## 9. Preise anpassen

**Alle** Preise stehen an einer einzigen Stelle:

```
config/pricing.ts
```

Dort ändern Sie Paketpreise, Zuschläge, Gründungspreise und Stundensätze. Kursfinder,
Preisbereich und Tests lesen automatisch aus dieser Datei – Sie müssen nichts anderes
anfassen.

Beispiel:

```ts
kmu: {
  name: 'ADRIACON KMU',
  minEmployees: 4,
  maxEmployees: 15,
  monthlyBasePrice: 780,   // ← hier den Preis ändern
  includedPayrollRecipients: 15,
  existingClientsOnly: false,
},
```

Nach jeder Preisänderung prüfen:

```bash
npm run test
```

Die Tests in `tests/pricing.test.ts` enthalten fest hinterlegte Erwartungswerte. Wenn Sie
Preise bewusst ändern, passen Sie die entsprechenden Erwartungswerte im Test mit an.

### Berechnungsreihenfolge

Die Logik in `lib/calculatePrice.ts` rechnet in dieser Reihenfolge:

```
Grundpaket (nach Anzahl Mitarbeitenden)
+ Belege:         ceil(max(0, Belege − 150) / 100) × 80
+ Bankkonten:     max(0, Konten − 2) × 40
+ Lohn:           max(0, Lohnempfänger − Paketgrenze) × 22
+ Kostenstellen:  Anzahl × 120
+ effektive MWST: 60
+ Papierbelege:   Grundpreis × 0,35   (nur auf den Grundpreis)
+ Fremdwährung:   90
= monatlicher Orientierungswert
```

Fest verankerte Regeln:

- **ADRIACON CFO** wird niemals automatisch empfohlen. Bei hohem Beratungsbedarf
  erscheint der Hinweis auf eine persönliche Standortbestimmung.
- **Privatpersonen** erhalten keinen Listenpreis, sondern eine persönliche Einschätzung.
- **Mehrere Gesellschaften** lösen den Hinweis „Separate Offerte erforderlich" aus.

---

## 10. Texte anpassen

| Was | Datei |
|---|---|
| Adresse, Telefon, E-Mail, Öffnungszeiten, Social Media | `config/site.ts` |
| Navigation und Wegpunkte | `config/site.ts` |
| Leistungen, Herausforderungen, Ablauf, Team, FAQ | `config/content.ts` |
| Paketbeschriebe und Gründungspaket | `config/pricing.ts` |
| Fragen des Kursfinders | `components/calculator/Kursfinder.tsx` |
| Radar-Fragen und Empfehlungen | `lib/radar.ts` |
| Themen des Jahreskurses | `lib/jahreskurs.ts` |
| Seitentitel, Beschreibung, SEO | `app/layout.tsx` |
| Impressum | `app/impressum/page.tsx` |
| Datenschutzerklärung | `app/datenschutz/page.tsx` |

Alle Texte sind auf Schweizer Hochdeutsch verfasst („ss" statt „ß", Anrede „Sie").

---

## 11. Logo und Bilder austauschen

Alle Bilder liegen unter `public/`. Ersetzen Sie eine Datei, indem Sie die neue Datei
**exakt gleich benennen** und die alte überschreiben.

| Datei | Inhalt | Status |
|---|---|---|
| `public/brand/adriacon-signet.png` | Signet, farbig (helle Flächen) | vorhanden |
| `public/brand/adriacon-signet-weiss.png` | Signet, weiss (dunkle Flächen) | vorhanden |
| `public/brand/adriacon-logo-vertikal.png` | Vollständiges Logo mit Schriftzug | vorhanden |
| `public/team/leon-soprek.jpg` | Porträt Leon Šoprek | vorhanden |
| `public/team/marko-bujan.jpg` | Porträt Marko Bujan | vorhanden |
| `public/team/adriacon-team-buero.jpg` | Büroaufnahme beider Geschäftsführer | vorhanden |
| `public/images/mysteuerhelfer-app.png` | App-Ansicht MySteuerhelfer | vorhanden, eingebunden |
| `public/images/treppe-aufwaerts.jpg` | Architekturmotiv Treppe | vorhanden, **derzeit nicht eingebunden** – bewusst freigelassen, kann bei Bedarf als Bildmotiv ergänzt werden |

**Empfohlen zu ergänzen:**

| Datei | Wozu |
|---|---|
| `public/brand/adriacon-logo.svg` | SVG-Version des Logos – gestochen scharf auf allen Bildschirmen |
| `public/og-image.jpg` | Vorschaubild für LinkedIn und WhatsApp, 1200 × 630 Pixel |
| `public/favicon.ico` | Browser-Symbol |

Nach dem Hinzufügen einer SVG-Version passen Sie `components/ui/Logo.tsx` an.
Für das Vorschaubild passen Sie den Abschnitt `openGraph.images` in `app/layout.tsx` an.

Bilder vor dem Hochladen möglichst auf sinnvolle Grössen bringen (Porträts etwa
1000 × 1000 Pixel). Next.js optimiert sie danach automatisch.

---

## 12. Projektstruktur

```
adriacon-web/
├── app/
│   ├── layout.tsx              Schriften, Metadaten, strukturierte Daten
│   ├── page.tsx                Startseite (setzt alle Abschnitte zusammen)
│   ├── globals.css             Designsystem, Raster, Druck- und Bewegungsregeln
│   ├── sitemap.ts              sitemap.xml
│   ├── robots.ts               robots.txt
│   ├── api/kontakt/route.ts    Formularempfang, Validierung, E-Mail-Versand
│   ├── impressum/page.tsx
│   └── datenschutz/page.tsx
│
├── components/
│   ├── layout/                 Header, Footer, Rechtsseiten-Hülle
│   ├── ui/                     Logo, Kurslinie, Überschriften, Animationen, Tooltip
│   ├── sections/               Alle Abschnitte der Startseite
│   ├── calculator/             Kursfinder mit Fortschritt, Eingaben, Ergebnis
│   ├── radar/                  Business Radar mit Radar-Diagramm
│   ├── jahreskurs/             Jahresrad
│   └── forms/                  Kontaktformular und Lead-Formular
│
├── config/
│   ├── pricing.ts              ALLE Preise – einzige Quelle der Wahrheit
│   ├── site.ts                 Stammdaten und Navigation
│   └── content.ts              Redaktionelle Inhalte
│
├── lib/
│   ├── calculatePrice.ts       Preisberechnung
│   ├── radar.ts                Radar-Dimensionen und Auswertung
│   ├── jahreskurs.ts           Jahresthemen
│   ├── format.ts               Schweizer Zahlenformat, Kantone, Monate
│   └── contactSchema.ts        Validierungsregeln der Formulare
│
├── types/index.ts              Typdefinitionen
├── tests/pricing.test.ts       29 Unit Tests der Preislogik
└── public/                     Logos, Teamfotos, Bilder
```

### Designsystem

| Farbe | Hex | Einsatz |
|---|---|---|
| Ink | `#0A1F30` | Text, Hero, Ablauf-Abschnitt |
| Brand Deep | `#14405F` | Schaltflächen, aktive Zustände |
| Adriacon Blue | `#3B87C6` | Akzente, aus dem Logo |
| Sky | `#8FC9EE` | Helles Logo-Blau auf dunklen Flächen |
| Paper | `#FBFCFD` | Grundfläche |
| Bistre | `#8A6A4A` | Raster-, Koordinaten- und Trennlinien |

Schriften über `next/font` (werden mitgeliefert, kein Aufruf zu Google beim Seitenbesuch):
**Newsreader** (Überschriften), **Inter Tight** (Fliesstext), **IBM Plex Mono** (Wegpunkte,
Koordinaten, Preise).

---

## 13. Offene TODOs

Im Code sind alle offenen Punkte mit `TODO` markiert. So finden Sie sie:

```bash
grep -rn "TODO" app components config lib
```

### Inhaltlich zu klären

1. **Stundensatz bei nicht digitalem Belegfluss** (`config/pricing.ts`)
   Gilt weiterhin CHF 165.– pro Stunde oder der allgemeine Satz von CHF 119.–?
   Der Wert liegt im Code, wird auf der Website aber bewusst nicht prominent gezeigt.
2. **„Mystery-Helper" im Paket ADRIACON KMU** (`config/pricing.ts`)
   In der Preisliste steht „Mystery-Helper für die gesamte Belegschaft". Ich gehe davon
   aus, dass die App **MySteuerhelfer** gemeint ist, und habe sie so benannt. Bitte
   bestätigen.
3. **Koordinaten des Standorts** (`config/site.ts`)
   Aktuell 47.4658° N / 8.2624° O. Bitte exakt bestätigen – sie erscheinen sichtbar im
   Hero, im Footer und im Abschnitt „Über uns".
4. **Preise für Privatpersonen**
   In der Preisliste fehlen Preise für Steuererklärungen von Privatpersonen. Der
   Kursfinder zeigt deshalb bewusst keinen Preis, sondern eine persönliche Einschätzung.
   Sobald Preise feststehen, können sie ergänzt werden.
5. **Vorschaubild und SVG-Logo** – siehe Abschnitt 11.

### Rechtlich zu prüfen

| Ort | Was |
|---|---|
| `app/impressum/page.tsx` | UID-Nummer, MWST-Nummer, Handelsregistereintrag, Haftungs- und Urheberrechtsklauseln |
| `app/datenschutz/page.tsx` | Verantwortliche Stelle, Aufbewahrungsdauer, Liste der Dienstleister, Auftragsbearbeitungsverträge |
| Kursfinder-Ergebnis | Der Hinweis „unverbindliche Preisorientierung, keine Offerte" ist bereits gesetzt – bitte durch eine Fachperson bestätigen lassen |
| Business Radar | Kennzeichnung als reine Selbsteinschätzung ohne Bonitäts- oder Unternehmensbewertung – bitte bestätigen lassen |
| Jahreskurs | Bewusst ohne konkrete Fristen. Der Hinweis auf kantonale Abweichungen ist gesetzt – bitte bestätigen lassen |

**Wichtig:** Impressum und Datenschutzerklärung sind Vorlagen und ersetzen keine
rechtliche Prüfung. Beide Seiten enthalten sichtbare `[TODO: …]`-Platzhalter, die vor
dem Aufschalten ersetzt werden müssen.

### Bewusst nicht erfunden

Es wurden **keine** Kundenzahlen, Bewertungen, Auszeichnungen, Zertifizierungen,
Partnerschaften, Gründungsjahre oder Lebensläufe erfunden. Alle Angaben stammen aus der
bestehenden Website adriacon.ch oder aus der gelieferten Preisliste.

---

## 14. Typische Fehler und Lösungen

**`npm install` bricht ab**
Node.js-Version prüfen mit `node -v`. Es wird Version 20 oder neuer benötigt.
Danach `node_modules` und `package-lock.json` löschen und erneut `npm install` ausführen.

**`npm run build` meldet einen TypeScript-Fehler**
Die Meldung nennt Datei und Zeile. Häufigste Ursache: Beim Bearbeiten von
`config/content.ts` oder `config/pricing.ts` wurde ein Komma oder eine Klammer entfernt.

**Vercel-Deployment schlägt fehl**
In Vercel unter „Deployments" das fehlgeschlagene Deployment öffnen und die Build-Logs
lesen. Meist fehlt eine Environment Variable oder es liegt derselbe Fehler vor, den auch
`npm run build` lokal zeigen würde. Deshalb immer zuerst lokal bauen.

**Kontaktformular sendet keine E-Mails**
Prüfen Sie in dieser Reihenfolge:
1. Sind alle drei Variablen in Vercel gesetzt?
2. Wurde nach dem Setzen ein Redeployment ausgelöst?
3. Ist die Domain bei Resend als „Verified" markiert?
4. Stimmt `CONTACT_FROM_EMAIL` mit der verifizierten Domain überein?
In den Vercel-Logs erscheint bei fehlender Konfiguration die Meldung
`[kontakt] Kein Versanddienst konfiguriert`.

**Bilder werden nicht angezeigt**
Gross- und Kleinschreibung prüfen. Unter Windows funktioniert `Logo.png` statt `logo.png`
lokal, auf dem Server von Vercel jedoch nicht. Alle Dateinamen in diesem Projekt sind
konsequent kleingeschrieben.

**Änderungen erscheinen nicht im Browser**
Entwicklungsserver mit `Strg + C` beenden, den Ordner `.next` löschen und `npm run dev`
neu starten.

**Schriften sehen falsch aus**
Beim ersten Start lädt Next.js die Schriften herunter. Dafür wird einmalig eine
Internetverbindung benötigt. Danach werden sie lokal ausgeliefert.

---

## Barrierefreiheit und Performance

Berücksichtigt sind:

- semantisches HTML mit korrekter Überschriftenhierarchie
- „Zum Inhalt springen"-Link für Tastaturbedienung
- sichtbare Fokus-Zustände auf allen bedienbaren Elementen
- vollständige Tastaturbedienung von Kursfinder, Radar und Jahresrad
- `prefers-reduced-motion` – alle Animationen werden abgeschaltet
- feste Bildabmessungen zur Vermeidung von Layout-Sprüngen
- Server Components überall dort, wo keine echte Interaktivität nötig ist
- Druckstile für die Ergebnisansicht des Kursfinders

---

## Lizenz und Rechte

Der Programmcode gehört der Adriacon Treuhand GmbH.
Logo, Teamfotos und Markeninhalte sind Eigentum der Adriacon Treuhand GmbH und dürfen
nicht ohne Zustimmung verwendet werden.
