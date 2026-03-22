# dFFA-Rechner – Qualitäts-Audit v1

**Audit durchgeführt:** 2026-03-22
**Auditor:** GitHub Copilot – Audit Skill
**Basis:** Direktes Code-Reading aller Quelldateien
**Scope:** `index.html`, `css/styles.css`, `js/ui.js`, `js/calculator.js`, `js/state.js`

---

## Anti-Patterns Verdict

### Ergebnis: TEILWEISE BESTANDEN – ein gravierender AI-Slop-Treffer

Das Grunddesign ist solide und authentisch feuerwehr-konform (Rot, Bebas Neue, cleane Cards). **Aber**: Der Varianten-Selektor (`variant-selector`) verwendet `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` – die paradebeispielhafte "AI Vibe Coding Purple Gradient". Diese verletzt das Designsystem komplett und hat null Bezug zur Feuerwehr-Identität.

Weitere AI-Slop-Indikatoren: Schwerlast-`!important` auf Badge-Silber (Spezifitätsprobleme), Inline-Styles über das gesamte HTML.

---

## Executive Summary

| Metrik | Wert |
|--------|------|
| Gesamt Issues | 14 |
| Critical | 2 |
| High | 4 |
| Medium | 5 |
| Low | 3 |
| Qualitäts-Score | **76/100** |

### Top 3 kritische Probleme

1. **Purple Gradient auf `.variant-selector`** – Komplett off-brand, AI-Slop-Warnsignal
2. **XSS-Risiko in `renderInfoButton`** – `escapeHtml` escaped keine Single Quotes; onclick-Attribute brechen bei Apostrophen in Texten
3. **Modal ohne ARIA-Attribute** – `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-label` fehlen

---

## Detailed Findings by Severity

### CRITICAL ISSUES

#### Issue #1: Purple Gradient – Off-Brand Anti-Pattern
- **Fundstelle:** `css/styles.css` – `.variant-selector`
- **Code:** `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- **Severity:** CRITICAL
- **Category:** Theming / Anti-Pattern
- **Impact:** Zerstört die visuelle Kohärenz. Die Design-Tokens (`--fire-red`, `--gray-*`) werden ignoriert. Hard-coded Farben außerhalb des Systems.
- **Recommendation:** Ersetze mit `var(--gray-50)` + `border: 2px solid var(--fire-red)`. Label, Select und Focus-State anpassen.
- **Suggested command:** `/normalize`

#### Issue #2: XSS / Broken JS in `renderInfoButton`
- **Fundstelle:** `js/ui.js:44`
- **Severity:** CRITICAL
- **Category:** Security / Correctness
- **Code:**
  ```javascript
  `onclick="showModal('${this.escapeHtml(title)}', '${this.escapeHtml(description)}')"`
  ```
- **Problem:** `escapeHtml` escaped keine Single Quotes (`'`). Bei Apostrophen im Text (z.B. `"Liegestütz (klassisch)"` oder deutschen Beschreibungen mit `'`) bricht der JS-String.
- **Impact:** Funktionsfehler bei bestimmten Disziplinbeschreibungen; potenzially broken onclick.
- **Recommendation:** Data-Attribute statt Inline-onclick nutzen.
- **Suggested command:** `/harden`

---

### HIGH SEVERITY ISSUES

#### Issue #3: Modal ohne ARIA-Attribute
- **Fundstelle:** `index.html:228-238`
- **Severity:** HIGH
- **Category:** Accessibility (WCAG 2.1 SC 4.1.2)
- **Problem:** `#infoModal` fehlt `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modalTitle"`. Close-Button fehlt `aria-label`.
- **Impact:** Screen-Reader-Nutzer erkennen den Dialog nicht als solchen.
- **WCAG:** SC 4.1.2 (Name, Role, Value)
- **Suggested command:** `/harden`

#### Issue #4: Nav-Tabs ohne ARIA-Rollen
- **Fundstelle:** `index.html:30-38`
- **Severity:** HIGH
- **Category:** Accessibility (WCAG 2.1 SC 4.1.2)
- **Problem:** `<nav>` fehlt `role="tablist"`. Buttons fehlen `role="tab"` und `aria-selected`.
- **Suggested command:** `/harden`

#### Issue #5: `switchView` nutzt impliziten globalen `event`
- **Fundstelle:** `index.html` – `function switchView(viewName)`
- **Severity:** HIGH
- **Category:** Correctness / Brittle Code
- **Problem:** `event.target.classList.add('active')` greift auf das implizite globale `event`-Objekt zurück – nicht zuverlässig und deprecated.
- **Suggested command:** `/harden`

#### Issue #6: Formular-Labels ohne `for`-Attribut
- **Fundstelle:** `js/ui.js` – `renderGroupPersonForm()`
- **Severity:** HIGH
- **Category:** Accessibility (WCAG 1.3.1)
- **Problem:** `<label>Name</label>` und `<label>Geburtsjahr</label>` sind nicht mit den Inputs verknüpft.
- **Suggested command:** `/harden`

---

### MEDIUM SEVERITY ISSUES

#### Issue #7: Fehlende `:focus-visible` Styles auf Interaktions-Elementen
- **Fundstelle:** `css/styles.css`
- **Severity:** MEDIUM
- **Category:** Accessibility (WCAG 2.4.7)
- **Problem:** `.info-btn`, `.action-btn`, `.modal-close` haben nur `:hover` Styles, keine Focus-Indikatoren.
- **Suggested command:** `/harden`

#### Issue #8: Doppelter `@media (max-width: 1024px)` Block
- **Fundstelle:** `css/styles.css` – zwei separate Blöcke
- **Severity:** MEDIUM
- **Category:** Maintainability
- **Suggested command:** `/normalize`

#### Issue #9: Silber-Badge mit 5× `!important`
- **Fundstelle:** `css/styles.css` – `.badge-silver`
- **Severity:** MEDIUM
- **Category:** CSS Specificity / Maintainability
- **Problem:** 5 `!important`-Overrides zeigen ein Spezifitätsproblem.
- **Suggested command:** `/normalize`

#### Issue #10: Inline Styles im HTML
- **Fundstelle:** `index.html` – 15+ `style="display: none;"` und `style="margin: ..."`
- **Severity:** MEDIUM
- **Category:** Maintainability
- **Suggested command:** `/normalize`

#### Issue #11: `overflow: visible` auf `.group-table-container` (Desktop)
- **Fundstelle:** `css/styles.css`
- **Severity:** MEDIUM
- **Category:** Visual Bug
- **Problem:** `border-radius` Clipping funktioniert nicht mit `overflow: visible`. Der Tabellen-Container hat abgerundete Ecken die nicht greifen.

---

### LOW SEVERITY ISSUES

#### Issue #12: Version-String veraltet
- **Fundstelle:** `index.html` – Footer
- **Content:** "Version 1.0 | Stand: Januar 2026"
- **Severity:** LOW

#### Issue #13: `badge-silber` Alias-Klassen redundant
- **Fundstelle:** `css/styles.css`
- **Severity:** LOW
- **Problem:** Sowohl `badge-silver` als auch `badge-silber` definiert – kein einheitliches Benennungsschema.

#### Issue #14: Modal ohne Fokus-Trap
- **Fundstelle:** `index.html` – Modal-Handling
- **Severity:** LOW
- **Problem:** Tab kann aus dem offenen Modal heraus navigieren.

---

## Positive Findings

- ✅ Solides Designsystem mit CSS-Variablen (`--fire-red`, `--gray-*`, Badge-Farben)
- ✅ `prefers-reduced-motion` Guard vorhanden
- ✅ Print-Styles vorhanden
- ✅ Responsive Breakpoints für 1024px, 768px, 480px
- ✅ `lang="de"` korrekt gesetzt
- ✅ `rel="noopener"` auf externen Links
- ✅ `escapeHtml` bei User-Input im Group-Table (Name-Zelle)
- ✅ Google Fonts mit `display=swap` lädt nicht blockierend
- ✅ `dFFAUI.escapeHtml` schützt User-Input in Tabellenzellen
- ✅ Klare Trennung: Calculator-Logik vs. UI-Rendering vs. State

---

## Empfehlungen nach Priorität

| Priorität | Issue | Befehl |
|-----------|-------|--------|
| 🔴 1 | Variant-Selector Gradient entfernen | `/normalize` |
| 🔴 2 | `renderInfoButton` auf data-Attribute umstellen | `/harden` |
| 🟠 3 | Modal ARIA-Attribute hinzufügen | `/harden` |
| 🟠 4 | Nav-Tabs `role="tab"` + `aria-selected` | `/harden` |
| 🟠 5 | `switchView` ohne impliziten `event` | `/harden` |
| 🟠 6 | Label `for`-Attribute in Gruppenformular | `/harden` |
| 🟡 7 | `:focus-visible` auf Buttons/Modals | `/harden` |
| 🟡 8 | Doppelten `@media`-Block zusammenführen | `/normalize` |
