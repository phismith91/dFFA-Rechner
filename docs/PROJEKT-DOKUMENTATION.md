# dFFA Rechner - Projekt-Dokumentation

## 📦 Projektstruktur

```
dffa-rechner/
├── index.html                  # Haupt-HTML-Datei (SPA)
├── docs/                       # Projekt-Dokumentation
│   ├── README.md
│   ├── SCHNELLSTART.md
│   ├── TESTS.md
│   ├── PROJEKT-DOKUMENTATION.md
│   └── HTML_DESIGN_AGENT.md
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
   - CSV-Import und CSV-Export für Excel/Sheets
   - Ergebnisse per E-Mail versenden (mailto)
   - Gruppenstatistiken (Teilnehmer, Erfolgsquote, Ø Alter, Abzeichen-Verteilung)
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

5. **App-Controller / Inline-Skripte** (`index.html`)
   - Initialisierung der Views und Event-Handler
   - Gruppenstatistiken, CSV-Import/Export, E-Mail-Versand
   - Validierungen und UI-Interaktionen

## 🎨 Design-System

### Farbpalette
```css
--fire-red: #DC2626;        /* Primärfarbe */
--fire-red-dark: #B91C1C;   /* Hover */
--fire-red-light: #FEE2E2;  /* Hintergründe */

--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

--bronze: #CD7F32;
--silver: #C0C0C0;
--gold: #FFD700;

--success: #10B981;
--error: #EF4444;
--warning: #F59E0B;
```

### Typografie
- **Headlines:** Bebas Neue (Google Fonts)
- **Body:** Work Sans (Google Fonts)
- **Fallback:** System Fonts

### Komponenten
- Cards mit dezenten Schatten
- Tab-Navigation (Anforderungen, Einzelrechner, Gruppenabnahme)
- Badge-System (Bronze/Silber/Gold, Silber mit Verlauf)
- Info-Buttons + Modal-Dialoge (Backdrop Blur)
- Responsive Tabellen mit Horizontal-Scroll

## 📱 Responsive Design

### Breakpoints
- Large: ≥ 1200px (Tabellen ohne feste Breite)
- Desktop: 1024px – 1199px (Tabellen scrollen horizontal)
- Tablet: 768px – 1023px (gestapelte Layouts)
- Mobile: ≤ 767px (kompakte Forms, kleinere Abstände)
- Small: ≤ 480px (optimierte Inputs/Badges)

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
- docs/README.md mit Beispielen

## 📞 Support

Bei Fragen oder Problemen:
1. `docs/README.md` lesen
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