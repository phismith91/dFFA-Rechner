# dFFA Rechner - Deutsches Feuerwehr-Fitnessabzeichen

Ein professioneller Web-Rechner für das Deutsche Feuerwehr-Fitnessabzeichen (dFFA) der Deutschen Feuerwehr-Sportföderation e.V.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🔥 Features

### 1. Anforderungs-Rechner
- Anzeige aller Leistungsanforderungen für eine Altersklasse
- Filterung nach bestimmten Disziplinen
- Übersichtliche Darstellung von Bronze-, Silber- und Gold-Anforderungen
- Detaillierte Beschreibung jeder Disziplin per Info-Button

### 2. Einzelabnahme-Rechner
- Berechnung des erreichten Abzeichens für eine Einzelperson
- Eingabe von erreichten Leistungen in allen drei Kategorien
- Automatische Bewertung nach offiziellen Tabellen
- Anzeige des Gesamtabzeichens (Bronze/Silber/Gold)

### 3. Gruppenabnahme
- Verwaltung mehrerer Personen in einer Gruppe
- Übersichtliche Tabellendarstellung aller Ergebnisse
- Bearbeiten und Löschen von Personen
- CSV-Export für die Weiterverarbeitung
- Automatische Speicherung im Browser (LocalStorage)

## 🏗️ Architektur

Das Projekt ist nach dem **Separation of Concerns** Prinzip aufgebaut:

```
dffa-rechner/
├── index.html              # Haupt-HTML mit UI-Logik
├── css/
│   └── styles.css          # Alle Styles
├── js/
│   ├── calculator.js       # Berechnungs-Engine (Business Logic)
│   ├── state.js            # State Management
│   └── ui.js               # UI-Komponenten
├── data/
│   └── dffa-data.js        # Leistungstabellen & Disziplin-Beschreibungen
└── README.md
```

### Datenschichten

1. **Data Layer** (`dffa-data.js`)
   - Enthält alle offiziellen Leistungstabellen
   - Disziplin-Beschreibungen und Regelungen
   - Einfach erweiterbar und wartbar

2. **Business Logic** (`calculator.js`)
   - Altersklassen-Berechnung
   - Leistungsbewertung
   - Abzeichen-Ermittlung
   - CSV-Export
   - Unabhängig von der UI

3. **State Management** (`state.js`)
   - Zentrale Verwaltung des Anwendungszustands
   - LocalStorage-Integration
   - Observer-Pattern für Updates

4. **UI Layer** (`ui.js`, `index.html`)
   - Rendering-Komponenten
   - Event-Handler
   - User-Interaktionen

## 🚀 Installation & Nutzung

### Lokale Nutzung

1. Repository klonen:
```bash
git clone https://github.com/IHR-USERNAME/dffa-rechner.git
cd dffa-rechner
```

2. In einem Browser öffnen:
```bash
# Mit Python
python -m http.server 8000

# Oder einfach index.html direkt öffnen
```

3. Im Browser aufrufen: `http://localhost:8000`

### GitHub Pages / GitLab Pages

Die Anwendung läuft komplett client-seitig und benötigt **keinen Server**.

**GitHub Pages:**
1. Repository auf GitHub pushen
2. Settings → Pages → Source: main branch
3. URL: `https://IHR-USERNAME.github.io/dffa-rechner/`

**GitLab Pages:**
1. `.gitlab-ci.yml` erstellen:
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
2. URL: `https://IHR-USERNAME.gitlab.io/dffa-rechner/`

### Eigene Domain

1. Repository auf GitHub/GitLab hosten
2. Custom Domain in den Repository-Einstellungen hinzufügen
3. DNS CNAME-Record auf `IHR-USERNAME.github.io` setzen

## 📋 Verwendung

### Anforderungen berechnen
1. Tab "Anforderungen" wählen
2. Geburtsjahr und Abnahmejahr eingeben
3. Optional: Nur bestimmte Disziplinen auswählen
4. "Anforderungen anzeigen" klicken

### Einzelabzeichen berechnen
1. Tab "Einzelrechner" wählen
2. Geburtsjahr und Abnahmejahr eingeben
3. Für jede Kategorie eine Disziplin wählen
4. Erreichte Leistungen eingeben
5. "Abzeichen berechnen" klicken

### Gruppenabnahme durchführen
1. Tab "Gruppenabnahme" wählen
2. Jahr der Abnahme festlegen
3. "Person hinzufügen" klicken
4. Name, Geburtsjahr und Leistungen eingeben
5. Person hinzufügen
6. Weitere Personen hinzufügen oder bearbeiten
7. Optional: Ergebnisse als CSV exportieren

## 🎨 Anpassung

### Eigene Styles
Alle Farben sind als CSS-Variablen in `css/styles.css` definiert:

```css
:root {
  --fire-red: #C41E3A;
  --fire-orange: #FF6B35;
  --fire-yellow: #FFA500;
  /* ... */
}
```

### Neue Disziplinen hinzufügen
Disziplinen können einfach in `data/dffa-data.js` hinzugefügt werden:

```javascript
leistungstabellen: {
  kategorie: {
    'neueDiszi': {
      name: 'Neue Disziplin',
      einheit: 'zeit',  // oder 'wiederholungen', 'meter', etc.
      lowerIsBetter: true,
      beschreibung: 'Beschreibung der Disziplin...',
      anforderungen: {
        '18-29': { bronze: 300, silber: 270, gold: 240 },
        // ...
      }
    }
  }
}
```

## 📊 Datenquellen

Alle Leistungstabellen basieren auf den offiziellen Dokumenten der DFS:
- [dFFA Broschüre 2019](https://dfs-ev.de/wp-content/uploads/2024/05/BROSCHRE2019_AK_1.pdf)
- [Leistungstabellen dFFA](https://dfs-ev.de/wp-content/uploads/2024/05/Leistungstabellen_dFFA.pdf)

**Wichtig:** Für die Altersklasse ist das Geburtsjahr im Jahr der Abnahme entscheidend.

## 🤝 Mitwirken

Contributions sind willkommen! Bitte beachten Sie:

1. Fork des Repositories erstellen
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

### Geplante Features
- [ ] Jugend-Abzeichen Integration
- [ ] Mehrsprachigkeit (EN, FR)
- [ ] Druckansicht für Urkunden
- [ ] Statistik-Dashboard
- [ ] PDF-Export
- [ ] Progressive Web App (PWA)

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz - siehe [LICENSE](LICENSE) Datei für Details.

## ℹ️ Haftungsausschluss

Diese Anwendung ist ein **inoffizielles Hilfsmittel** zur Berechnung der dFFA-Leistungen. Die offiziellen Regelungen und Anforderungen finden Sie auf der Website der [Deutschen Feuerwehr-Sportföderation e.V.](https://dfs-ev.de).

Trotz sorgfältiger Prüfung können keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der Berechnungen übernommen werden. Im Zweifelsfall gelten die offiziellen Bestimmungen der DFS.

## 👨‍💻 Entwickler

Entwickelt mit ❤️ für die Feuerwehr-Community

## 📧 Kontakt

Bei Fragen, Anregungen oder Fehlermeldungen erstellen Sie bitte ein [Issue](https://github.com/IHR-USERNAME/dffa-rechner/issues).

## 🙏 Danksagung

- Deutsche Feuerwehr-Sportföderation e.V. für die Bereitstellung der Leistungstabellen
- Alle Feuerwehrangehörigen, die sich für ihre Fitness einsetzen

---

**⚠️ Hinweis:** Die Prüfung zum dFFA darf nur von autorisierten dFFA-Prüfern abgenommen werden. Diese Anwendung dient ausschließlich der Vorbereitung und Auswertung.