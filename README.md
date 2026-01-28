# dFFA Rechner — Deutsches Feuerwehr‑Fitnessabzeichen (dFFA)

Ein leichtgewichtiges, clientseitiges Web‑Tool zur Berechnung und Auswertung des dFFA. Ziel ist es, Prüfern und Sportler:innen eine schnelle Übersicht über Anforderungen, Einzelauswertungen und Gruppenabnahmen zu bieten.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🚀 Kurz & Knapp
- Offline‑fähig: Läuft komplett im Browser (keinen Backend‑Server nötig)
- Einzel- und Gruppenabnahme mit CSV‑Export
- Offizielle Leistungstabellen eingebunden (DFS)
- Speicherung der Gruppen über LocalStorage
- Einfach anpassbar: Disziplinen und Tabellen in `data/dffa-data.js`

---

## 🧩 Features
- Anforderungs‑Ansicht: Alle Leistungen nach Altersklasse und Disziplin
- Einzelrechner: Berechnung des erreichten Abzeichens (Bronze / Silber / Gold)
- Gruppenabnahme: Mehrere Personen verwalten, Ergebnisse exportieren
- Responsive UI: Mobil‑ und Desktop‑optimiert
- Barrierefreiheit: Semantisches HTML und a11y‑Hinweise

---

## 💻 Schnellstart (lokal)
1. Repo klonen
```bash
git clone https://github.com/IHR-USERNAME/dffa-rechner.git
cd dffa-rechner
```
2. Einfach lokal öffnen (kein Build notwendig):
```bash
# Lokalen Webserver starten (empfohlen)
python -m http.server 8000
# oder mit Node.js
npx serve
```
3. Im Browser öffnen: `http://localhost:8000`

---

## 📦 Deployment
Die App ist statisch und kann via GitHub Pages oder GitLab Pages gehostet werden.

GitHub Pages: Settings → Pages → Source: `main` branch → Domain optional

GitLab Pages: Beispiel `.gitlab-ci.yml` (kopieren aus Projekt‑README)

Tipp: Wenn du eine eigene Subdomain (z. B. `dffa.example.de`) verwendest, setze in Cloudflare den DNS‑Eintrag als **CNAME** auf `USERNAME.github.io` bzw. die entsprechenden GitLab‑Ziele — und achte darauf, die Cloudflare‑Proxy‑Option (orange cloud) zu deaktivieren (nur DNS‑only).

---

## 📋 Nutzung
### Anforderungen anzeigen
1. Tab „Anforderungen“ öffnen
2. Geburtsjahr & Abnahmejahr eingeben
3. Disziplinen filtern oder alle anzeigen

### Einzelabzeichen berechnen
1. Tab „Einzelrechner“ öffnen
2. Geburtsjahr & Abnahmejahr eingeben
3. Disziplin auswählen & Leistung eingeben
4. „Abzeichen berechnen“ klicken

### Gruppenabnahme
1. Tab „Gruppenabnahme“ öffnen
2. Jahr der Abnahme wählen
3. Personen hinzufügen (Name, Geburtsjahr, Leistungen)
4. Ergebnisse bearbeiten/exportieren (CSV)

---

## 🔗 Offizielle Quellen
- Broschüre (DFS): https://dfs-ev.de/wp-content/uploads/2024/05/BROSCHRE2019_AK_1.pdf
- Leistungstabellen (DFS): https://dfs-ev.de/wp-content/uploads/2024/05/Leistungstabellen_dFFA.pdf
- DFS Test‑Seite: https://dfs-ev.de/test/

> ⚠️ Diese App ist ein inoffizielles Hilfsmittel. Maßgeblich sind die offiziellen Regelungen der Deutschen Feuerwehr‑Sportföderation e.V.

---

## 🛠 Entwicklung & Anpassung
- Code‑Organisation: `js/` (Logik), `data/` (Tabellen), `css/` (Styles)
- Neue Disziplinen: `data/dffa-data.js` erweitern (siehe bestehende Struktur)
- Styles anpassen: `css/styles.css` (CSS‑Variablen im :root)

### Tests
- `run-tests.js` enthält eine Test‑Suite zur Validierung der Berechnungen
- Bitte Tests ausführen nach Änderungen an `calculator.js` oder `dffa-data.js`

---

## 🤝 Mitmachen
1. Fork → Branch → PR
2. Schreibe aussagekräftige Commit‑Nachrichten
3. Tests hinzufügen/aktualisieren

Gern gesehen: Bugfixes, Tests, Verbesserungen der Barrierefreiheit und Übersetzungen.

---

## 📝 Lizenz
MIT — siehe `LICENSE`

---

## 📬 Kontakt
Issues auf GitHub: https://github.com/IHR-USERNAME/dffa-rechner/issues

---

## 🙏 Danksagung
Danke an die Deutsche Feuerwehr‑Sportföderation e.V. für die Bereitstellung der offiziellen Tabellen und an alle Mitwirkenden.

---

**Hinweis:** Die Abnahme des dFFA darf nur durch autorisierte dFFA‑Prüfer:innen erfolgen. Diese Anwendung dient der Vorbereitung und Auswertung, ersetzt aber keine offizielle Prüfung.
