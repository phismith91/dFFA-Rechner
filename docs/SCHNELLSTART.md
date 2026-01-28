# 🚀 Schnellstart-Anleitung

## Option 1: Direkt im Browser öffnen (Einfachste Methode)

1. ZIP-Datei herunterladen und entpacken
2. Datei `index.html` im Browser öffnen (Doppelklick)
3. Fertig! 🎉

## Option 2: Lokaler Webserver (Empfohlen)

### Mit Python:
```bash
cd dffa-rechner
python -m http.server 8000
```
Dann öffnen: `http://localhost:8000`

### Mit Node.js (npx):
```bash
cd dffa-rechner
npx serve
```

### Mit PHP:
```bash
cd dffa-rechner
php -S localhost:8000
```

## Option 3: GitHub Pages (Öffentlich)

1. GitHub Repository erstellen
2. Alle Dateien hochladen
3. Settings → Pages → Source: main branch
4. Fertig! URL: `https://DEIN-USERNAME.github.io/dffa-rechner/`

## Option 4: GitLab Pages

1. GitLab Repository erstellen
2. Datei `.gitlab-ci.yml` erstellen:

```yaml
pages:
  stage: deploy
  script:
    - mkdir -p public
    - cp -r * public/
  artifacts:
    paths:
      - public
  only:
    - main
```

3. Code pushen
4. URL: `https://DEIN-USERNAME.gitlab.io/dffa-rechner/`

## Eigene Domain verbinden

### Bei GitHub Pages:
1. Repository Settings → Pages → Custom domain
2. Domain eingeben (z.B. `dffa.deine-domain.de`)
3. Bei deinem DNS-Provider CNAME-Record erstellen:
   - Name: `dffa` (oder was du möchtest)
   - Ziel: `DEIN-USERNAME.github.io`
4. Warten bis DNS propagiert (kann bis 24h dauern)

### Bei GitLab Pages:
1. Settings → Pages → New Domain
2. Domain eingeben
3. DNS konfigurieren wie angegeben

## Erste Schritte mit der App

### 1. Anforderungen anzeigen
- Tab "Anforderungen" öffnen
- Geburtsjahr eingeben (z.B. 1990)
- Abnahmejahr eingeben (z.B. 2026)
- "Anforderungen anzeigen" klicken
- ✅ Siehst du alle Leistungstabellen!

### 2. Einzelabzeichen berechnen
- Tab "Einzelrechner" öffnen
- Geburtsjahr und Abnahmejahr eingeben
- Disziplinen auswählen (eine pro Kategorie)
- Leistungen eingeben
- "Abzeichen berechnen" klicken
- ✅ Siehst du dein erreichtes Abzeichen!

### 3. Gruppenabnahme
- Tab "Gruppenabnahme" öffnen
- "Person hinzufügen" klicken
- Name und Daten eingeben
- Person hinzufügen
- Weitere Personen hinzufügen
- Optional: CSV exportieren
- ✅ Alle Ergebnisse in einer Tabelle!

## Tipps & Tricks

### Info-Buttons nutzen
Jede Disziplin hat einen ℹ️ Button mit detaillierter Beschreibung der Ausführung.

### Daten bleiben gespeichert
Die Gruppenabnahme speichert automatisch im Browser. Beim nächsten Besuch sind alle Daten noch da!

### CSV-Export
Perfekt für Excel oder Google Sheets:
1. Gruppenabnahme durchführen
2. "Als CSV exportieren" klicken
3. Datei öffnet sich automatisch

### Mobile Nutzung
Die App funktioniert perfekt auf Smartphones und Tablets!

## Problemlösung

### App lädt nicht?
- Stelle sicher, dass alle Dateien im gleichen Ordner sind
- Prüfe ob JavaScript aktiviert ist
- Versuche es mit einem anderen Browser

### Berechnungen falsch?
- Prüfe das eingegebene Geburtsjahr
- Stelle sicher, dass das Abnahmejahr korrekt ist
- Für die Altersklasse zählt das Alter im Abnahmejahr!

### LocalStorage funktioniert nicht?
- Prüfe Browser-Einstellungen (Cookies/Datenschutz)
- Im Inkognito-Modus werden Daten nicht gespeichert

## Support

Bei Problemen:
1. README.md lesen
2. PROJEKT-DOKUMENTATION.md konsultieren
3. GitHub Issue erstellen

## Nächste Schritte

- [ ] Eigene Domain verbinden
- [ ] Feuerwehr-Logo hinzufügen
- [ ] In sozialen Medien teilen
- [ ] Feedback sammeln
- [ ] Features erweitern

Viel Erfolg! 🔥💪