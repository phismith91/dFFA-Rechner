# PWA (volle Offline-Fähigkeit) — Design

Datum: 2026-07-11
Status: Approved

## Ziel

dFFA-Rechner als installierbare, voll offline-fähige PWA anbieten. Nach einem
ersten Online-Besuch soll der Rechner ohne Netzverbindung funktionieren (z. B.
im Feuerwehrhaus ohne WLAN). Icon auf Homescreen (Android + iOS), App startet
ohne Browser-Chrome (`display: standalone`).

## Nicht-Ziele

- Kein Push-Messaging, kein Background-Sync
- Kein Update-Banner/Nutzer-Dialog — Updates laufen automatisch im Hintergrund
- PDF-Broschüre (`docs/BROSCHRE2019_innen_AK_1.pdf`, 1.5 MB) wird NICHT precached — externer Referenzinhalt, kein Kernfunktions-Bestandteil
- `test.html` wird NICHT precached — bereits per `robots.txt` von Crawling ausgeschlossen, kein Endnutzer-Pfad

## Architekturentscheidung

Hand-rolled vanilla Service Worker. Kein Workbox, kein PWA-Build-Plugin.

Begründung: Das Projekt ist bewusst build-frei (README: "kein Build
notwendig") und hat aktuell keine Runtime-Abhängigkeiten außer Google Fonts
(CSS) und einem externen Analytics-Script. Ein Cache-Layer für eine
Handvoll statischer Dateien braucht keine Library — Workbox oder ein
Build-Plugin wäre die erste externe Abhängigkeit für ein paar Dutzend Zeilen
Cache-Logik und würde nicht zum Rest der Codebase passen (Test-Framework,
State-Management sind ebenfalls hand-rolled, siehe `js/tests.js`,
`js/state.js`).

## Komponenten

### `manifest.json` (neu, Repo-Root)

```json
{
  "name": "dFFA Rechner",
  "short_name": "dFFA",
  "description": "Rechner für das Deutsche Feuerwehr-Fitnessabzeichen",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#DC2626",
  "lang": "de",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### `icons/icon-192.png`, `icons/icon-512.png` (neu)

Rotes Quadrat (`#DC2626`, abgerundete Ecken) mit zentriertem weißen "F" —
identisches Design zum bestehenden Favicon-SVG in `index.html`. Generiert per
einmaligem Pillow-Skript (Pillow ist lokal bereits installiert, kein
zusätzliches Tool nötig). Die PNGs werden als fertige Artefakte committed,
kein Build-Schritt zur Laufzeit.

### `sw.js` (neu, Repo-Root)

```js
const CACHE_NAME = 'dffa-cache-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css?v=6',
  '/js/calculator.js',
  '/js/state.js',
  '/js/ui.js',
  '/data/dffa-data.js',
  '/data/djffa-data.js',
  '/impressum.html',
  '/datenschutz.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cross-origin (Fonts, Analytics): nicht abfangen, direkt ans Netz
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
```

Cache-first mit Hintergrund-Refresh (stale-while-revalidate): liegt eine
Antwort im Cache, wird sie sofort ausgeliefert; parallel holt der SW die
Version vom Netz und ersetzt den Cache-Eintrag für den nächsten Aufruf.
Fehlt der Cache-Eintrag (z. B. neue Route), wartet der Request auf das
Netzwerk. Ist das Netzwerk nicht erreichbar und kein Cache vorhanden, schlägt
der Request fehl — das betrifft praktisch nur den allerersten Ladevorgang
(inhärent bei jeder PWA, braucht einmalig Netz).

### `index.html` (Ergänzung im `<head>`)

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#DC2626">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
```

Registrierung am Ende des bestehenden `<script>`-Blocks, non-blocking:

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
```

## Update-Verhalten

Cache-Name ist versioniert (`dffa-cache-v1`). Bei Deploys mit
Asset-Änderungen wird die Versionsnummer manuell hochgezählt (gleiche
Konvention wie `styles.css?v=6`), `activate` löscht alte Cache-Versionen.
Kein Update-Dialog — Nutzer bekommt beim nächsten App-Start automatisch die
neue Version aus dem dann aktuellen Cache.

**Wichtig:** Wird `styles.css?v=N` in `index.html` hochgezählt, muss der
gleiche Query-String auch im `CORE_ASSETS`-Eintrag in `sw.js` aktualisiert
werden, zusammen mit `CACHE_NAME` — sonst precacht der Service Worker eine
veraltete CSS-Version.

## Fehlerbehandlung

- `cache.addAll` in `install` schlägt atomar fehl, wenn eine der Core-Dateien
  einen Fehler liefert (z. B. 404). Die Liste ist klein und kontrolliert,
  Risiko gering.
- Cross-origin-Requests (Fonts, Analytics) laufen am SW vorbei — scheitern
  sie offline, bricht nichts: Fonts fallen auf System-Font zurück
  (`font-display: swap` bereits vorhanden), Analytics ist bereits
  `async`/non-blocking (siehe Commit `b00fcab`).

## Testing

Kein automatisiertes Testing für Service-Worker-Verhalten möglich in diesem
Setup (das bestehende Custom-Test-Framework in `js/tests.js` prüft nur
Berechnungslogik). Manueller Testplan, gleiche Machart wie das bestehende
`test.html`:

1. Seite einmal online laden → DevTools ▸ Application ▸ Service Workers:
   Status "activated"?
2. DevTools ▸ Network ▸ Offline aktivieren → Reload → App lädt und
   funktioniert vollständig ohne Netz?
3. DevTools ▸ Application ▸ Manifest: Icons/Name korrekt angezeigt,
   Install-Prompt erscheint in Chrome?
4. `CACHE_NAME` hochzählen, redeployen → alter Cache-Eintrag verschwindet aus
   Application ▸ Cache Storage, neue Assets werden geladen?
