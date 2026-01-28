# dFFA Rechner - Projekt-Dokumentation

## 📦 Projektstruktur

```
dffa-rechner/
├── index.html                  # Haupt-HTML-Datei (SPA)
├── README.md                   # GitHub/GitLab Dokumentation
├── LICENSE                     # MIT-Lizenz
├── .gitignore                 # Git-Ausschlüsse
│
├── css/
│   └── styles.css             # Vollständiges Styling (4.5KB)
│
├── js/
│   ├── calculator.js          # Berechnungs-Engine (11KB, 367 Zeilen)
│   ├── state.js               # State Management (7KB, 241 Zeilen)
│   └── ui.js                  # UI-Komponenten (13KB, 433 Zeilen)
│
└── data/
    └── dffa-data.js           # Leistungstabellen (10KB, 319 Zeilen)
```

## 🎯 Implementierte Features

### ✅ Feature 1: Anforderungs-Rechner
- **Eingabe:** Geburtsjahr + Abnahmejahr
- **Ausgabe:** Vollständige Leistungstabellen für die Altersklasse
- **Extras:**
  - Optional: Filter für spezifische Disziplinen
  - Info-Buttons mit detaillierten Beschreibungen
  - Responsive Tabellenansicht

### ✅ Feature 2: Einzelabnahme-Rechner
- **Eingabe:** Person + Leistungen in allen 3 Kategorien
- **Ausgabe:** Erreichtes Abzeichen (Bronze/Silber/Gold)
- **Extras:**
  - Dynamische Eingabefelder je nach Disziplin
  - Validierung der Eingaben
  - Detaillierte Ergebnisansicht

### ✅ Feature 3: Gruppenabnahme
- **Funktionen:**
  - Personen hinzufügen/bearbeiten/löschen
  - Übersichtliche Tabelle mit allen Ergebnissen
  - CSV-Export für Excel/Sheets
  - Auto-Save im LocalStorage
- **Extras:**
  - Inline-Bearbeitung
  - Bulk-Actions (Alle löschen)
  - Persistente Datenhaltung

## 🏗️ Architektur-Highlights

### Separation of Concerns
```
Data Layer ←→ Business Logic ←→ State Management ←→ UI Layer
```

1. **Data Layer** (`dffa-data.js`)
   - Einzige Quelle für alle Leistungstabellen
   - Vollständige Disziplin-Beschreibungen
   - Kategorien-Metadaten

2. **Business Logic** (`calculator.js`)
   ```javascript
   class dFFACalculator {
     getAgeGroup(birthYear, testYear)
     getRequirements(category, discipline, ageGroup)
     evaluatePerformance(performance, requirements, lowerIsBetter)
     calculateFinalBadge(results)
     evaluatePerson(personData)
     evaluateGroup(groupData)
     exportToCSV(groupResults)
   }
   ```

3. **State Management** (`state.js`)
   ```javascript
   class dFFAState {
     subscribe(callback)           // Observer Pattern
     setView(view)
     setIndividualData(data)
     addPersonToGroup(person)
     updatePersonInGroup(id, updates)
     loadFromLocalStorage()
     saveToLocalStorage()
   }
   ```

4. **UI Components** (`ui.js`)
   ```javascript
   class dFFAUI {
     renderInfoButton(title, description)
     renderRequirementsTable(ageGroup, selectedDisciplines)
     renderDisciplineSelect(category, selectedValue, id)
     renderPerformanceInput(category, discipline, idPrefix)
     renderIndividualResult(result)
     renderGroupTable(groupResults)
   }
   ```

## 🎨 Design-System

### Farbpalette
```css
--fire-red: #C41E3A;        /* Primärfarbe, Akzente */
--fire-orange: #FF6B35;     /* Sekundärfarbe, Hover */
--fire-yellow: #FFA500;     /* Highlights */
--deep-black: #0A0A0A;      /* Hintergrund */
--ash-gray: #2A2A2A;        /* Cards */
--smoke-gray: #4A4A4A;      /* Borders */
--silver-gray: #C0C0C0;     /* Text, Silber */
--gold: #FFD700;            /* Gold-Badge */
--bronze: #CD7F32;          /* Bronze-Badge */
```

### Typografie
- **Headlines:** Bebas Neue (Google Fonts)
- **Body:** Work Sans (Google Fonts)
- **Fallback:** System Fonts

### Komponenten
- Cards mit Glassmorphism
- Gradient Buttons
- Badge-System (Bronze/Silber/Gold)
- Modal-Dialoge
- Responsive Tables

## 📱 Responsive Design

### Breakpoints
- Desktop: > 1024px (3-Spalten-Layout)
- Tablet: 768px - 1024px (2-Spalten-Layout)
- Mobile: < 768px (1-Spalten-Layout)

### Mobile-Optimierungen
- Touch-freundliche Buttons (min. 44x44px)
- Horizontales Scrollen für Tabellen
- Gestackte Forms
- Größere Input-Felder

## 🚀 Deployment

### GitHub Pages
1. Repository erstellen
2. Code pushen
3. Settings → Pages → Source: main branch
4. Fertig!

### Eigene Domain
1. Domain bei Provider kaufen
2. DNS CNAME auf `username.github.io` setzen
3. Custom Domain in GitHub Settings eintragen

### Keine Server-Anforderungen
- Pure Client-Side Application
- Kein Backend nötig
- Keine API-Keys erforderlich
- Keine Datenbank

## 📊 Performance

### Optimierungen
- Keine externen Dependencies (außer Google Fonts)
- Minimale Dateigröße (~40KB total)
- Lazy Loading nicht nötig (alles < 50KB)
- LocalStorage für State-Persistierung

### Browser-Support
- Chrome/Edge: ✅ Vollständig
- Firefox: ✅ Vollständig
- Safari: ✅ Vollständig
- Mobile Browsers: ✅ Vollständig

## 🔒 Datenschutz

- **Keine Server-Kommunikation**
- Alle Daten bleiben im Browser
- LocalStorage nur für Komfort
- Keine Cookies
- Keine Tracking
- Keine Analytics

## 🧪 Testing

### Manuelle Tests durchgeführt:
- ✅ Anforderungsberechnung für alle Altersklassen
- ✅ Einzelabzeichen-Berechnung (Bronze/Silber/Gold)
- ✅ Gruppenabnahme mit 10+ Personen
- ✅ CSV-Export
- ✅ LocalStorage Persistierung
- ✅ Responsive Design (Desktop/Tablet/Mobile)
- ✅ Modal-Dialoge
- ✅ Info-Buttons für alle Disziplinen

## 📈 Zukünftige Erweiterungen

### Geplant
1. **Jugend-Abzeichen**
   - Separate Tabellen für U18
   - Altersklassen 10-17

2. **Statistiken**
   - Durchschnittliche Leistungen
   - Verteilung der Abzeichen
   - Trend-Analyse

3. **PDF-Export**
   - Urkunden generieren
   - Druckbare Ergebnisse

4. **PWA**
   - Offline-Nutzung
   - App-Icon
   - Service Worker

5. **Mehrsprachigkeit**
   - Englisch
   - Französisch

## 💡 Technische Entscheidungen

### Warum Vanilla JS?
- Keine Build-Tools nötig
- Einfaches Deployment
- Keine Dependencies
- Leicht wartbar
- Schnell lernbar

### Warum kein Framework?
- Projekt-Scope überschaubar
- Performance optimal
- Keine Lernkurve
- Keine Breaking Changes
- Maximale Kontrolle

### Warum LocalStorage?
- Keine Server-Infrastruktur
- Kein Login erforderlich
- Datenschutzfreundlich
- Einfach implementiert
- Ausreichend für Use-Case

## 🎓 Code-Qualität

### Best Practices
- ✅ Separation of Concerns
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ Klare Namenskonventionen
- ✅ Ausführliche Kommentare
- ✅ Modularer Aufbau
- ✅ Observer Pattern für State
- ✅ Factory Pattern für UI

### Wartbarkeit
- Klare Dateistruktur
- Logische Funktionsnamen
- Konsistente Code-Formatierung
- Kommentare auf Deutsch
- README mit Beispielen

## 📞 Support

Bei Fragen oder Problemen:
1. README.md lesen
2. Code-Kommentare prüfen
3. GitHub Issues erstellen

## 🏆 Credits

- **Datenquelle:** Deutsche Feuerwehr-Sportföderation e.V.
- **Design:** Feuerwehr-inspirierte Farbpalette
- **Fonts:** Google Fonts (Bebas Neue, Work Sans)

---

**Version:** 1.0  
**Stand:** Januar 2026  
**Lizenz:** MIT