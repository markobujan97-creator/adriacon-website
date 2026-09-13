# Startseite erscheint leer – was zu prüfen ist

Falls die Startseite nach dem Deployment weiss bleibt, lässt sich die Ursache in
wenigen Minuten eingrenzen. Bitte der Reihe nach vorgehen.

## 1. Ist der Build auf Vercel überhaupt durchgelaufen?

Vercel → Projekt → **Deployments**. Steht beim obersten Eintrag **Error** oder
**Failed**, wurde die neue Version nie veröffentlicht.

Deployment anklicken → **Build Logs** → nach `error` suchen und die Meldung
notieren. Genau diese Zeile brauche ich, falls es weiterhin klemmt.

> In der vorherigen Fassung gab es genau so einen Fehler:
> `app/steuererklaerungen/page.tsx: Cannot find name 'seo'`.
> Er brach den Build ab, wodurch gar keine neue Version online ging.
> Er ist behoben.

## 2. Lokal bauen

```bash
npm install
npm run typecheck
npm run build
npm run start
```

`npm run build` zeigt am Ende eine Liste aller Seiten. Dort muss stehen:

```
Route (app)
┌ ○ /
├ ○ /datenschutz
├ ○ /impressum
├ ○ /kontakt
├ ○ /leistungen
├ ○ /pakete
├ ○ /steuererklaerungen
├ ○ /steuererklaerungen/checkliste
├ ○ /tools
└ ○ /ueber-uns
```

Fehlt dort `/`, ist die Datei `app/page.tsx` nicht mit hochgeladen worden.

## 3. Ist `app/page.tsx` im GitHub-Repository?

Auf GitHub in den Ordner `app` navigieren. Die Datei `page.tsx` muss direkt
darin liegen, neben `layout.tsx`. Fehlt sie, liefert die Website unter `/`
nichts aus.

Das passiert beim Hochladen über die GitHub-Weboberfläche gelegentlich, wenn
nicht der **Inhalt** des Projektordners, sondern der Ordner selbst gezogen wird.

## 4. Was der Browser sagt

Startseite öffnen → Rechtsklick → **Untersuchen** → Reiter **Console**.
Rote Meldungen dort notieren.

Zusätzlich im Reiter **Network** die erste Anfrage auf `/` anklicken und den
Statuscode prüfen:

| Status | Bedeutung |
|---|---|
| 200 | Seite wird ausgeliefert, das Problem liegt in der Darstellung |
| 404 | `app/page.tsx` fehlt im Deployment |
| 500 | Fehler beim Rendern, Meldung steht in den Vercel-Logs unter **Functions** |

## 5. Was in dieser Fassung bereits dagegen unternommen wurde

- **Mobilmenü:** Es wird nicht mehr über das `hidden`-Attribut ausgeblendet,
  sondern über eine eindeutige Tailwind-Klasse. Im geschlossenen Zustand hat es
  jetzt garantiert `display: none` und kann den Seiteninhalt unter keinen
  Umständen mehr verdecken.
- **Fehlerseiten:** `app/error.tsx` und `app/global-error.tsx` fangen Fehler ab.
  Statt einer weissen Seite erscheint eine lesbare Meldung mit einer
  Fehlerkennung, die sich in den Vercel-Logs wiederfindet.
- **404-Seite:** `app/not-found.tsx` zeigt bei einer falschen Adresse eine
  Übersicht aller Seiten statt einer leeren Seite.
- **Typprüfung:** Der gesamte Code wurde mit dem TypeScript-Compiler geprüft.
  Es gibt keine Typfehler mehr.

Nach dem Einspielen dieser Fassung sollte bei einem Problem also nie mehr eine
weisse Seite erscheinen, sondern immer eine Meldung, die weiterhilft.
