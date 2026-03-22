# dFFA-Rechner – Audit Report v2 (Impeccable)

**Audit durchgeführt:** 2026-03-22 (v2, nach v1-Fixes)  
**Auditor:** GitHub Copilot – Impeccable Audit Skill  
**Basis:** Vollständiges Code-Reading aller Quelldateien + frontend-design Anti-Pattern-Checkliste  
**Scope:** `index.html`, `css/styles.css`, `js/ui.js`, `js/calculator.js`

---

## Anti-Patterns Verdict

### Ergebnis: VERBESSERUNGEN SICHTBAR – neue Befunde auf Impeccable-Level

Die 8 Fixes aus v1 sind korrekt und wirkungsvoll (Purple Gradient entfernt, ARIA hinzugefügt, XSS gepatcht). Der Impeccable-Audit mit dem vollständigen frontend-design-Regelwerk deckt jedoch eine zweite Ebene auf: WCAG-Verstöße bei Touch-Targets und Kontrast, Layout-Anti-Patterns (alles in Cards, alles zentriert) und Desktop-first CSS.

---

## Executive Summary

| Metrik | v1 | v2 |
|--------|----|----|
| Kritisch | 2 → beide gefixt | 2 neue (WCAG) |
| High | 4 → alle gefixt | 3 neue |
| Medium | 5 → 3 gefixt | 4 neue + 2 offen |
| Low | 3 → 1 gefixt | 2 offen + 3 neue |
| **Qualitäts-Score** | **76/100** | **74/100** |

Der Score sinkt leicht, weil der Impeccable-Audit strengere Maßstäbe setzt und WCAG-Verletzungen aufdeckt, die v1 nicht bewertet hat.

### v1-Regressionsstatus

| Fix | Status |
|-----|--------|
| Purple Gradient entfernt | ✅ Verifiziert |
| `renderInfoButton` data-Attribute | ✅ Verifiziert |
| Modal ARIA (`role="dialog"` etc.) | ✅ Verifiziert |
| Nav-Tabs `role="tab"` + `aria-selected` | ✅ Verifiziert |
| `switchView(viewName, tabEl)` | ✅ Verifiziert |
| Label `for`-Attribute Gruppenformular | ✅ Verifiziert |
| `:focus-visible` auf Buttons/Modal | ✅ Verifiziert |
| Doppelten `@media`-Block zusammengeführt | ✅ Verifiziert |

---

## Neue Befunde nach Impeccable-Audit

### CRITICAL

#### Issue #C1: Touch-Targets unter 44×44 px (WCAG 2.5.5)
- **Fundstellen:**
  - `.info-btn` → `width: 24px; height: 24px` (62 % Unterschreitung!)
  - `.action-btn` → `width: 32px; height: 32px` (27 % Unterschreitung)
  - `.modal-close` → `width: 32px; height: 32px` (27 % Unterschreitung)
- **Severity:** CRITICAL – WCAG 2.5.5 Verletzung
- **Impact:** Nutzer mit motorischen Einschränkungen und Touch-Geräte-Nutzer treffen Buttons nicht zuverlässig.
- **Fix:**
  ```css
  .info-btn {
    width: 36px;   /* minimum; besser 44px */
    height: 36px;
    /* Alternativ: touch-area via padding + transparent border vergrößern */
  }
  .action-btn,
  .modal-close {
    width: 44px;
    height: 44px;
  }
  ```
  Oder mit Hit-Area-Trick (visuell klein, tatsächlicher Klickbereich groß):
  ```css
  .info-btn::before {
    content: '';
    position: absolute;
    inset: -10px;  /* vergrößert die klickbare Fläche ohne Layout zu verändern */
  }
  .info-btn { position: relative; }
  ```

#### Issue #C2: Kontrast-Versagen `--gray-400` (#9CA3AF) auf Weiß
- **Fundstellen:**
  - `.badge-empty { color: var(--gray-400) }` – Kontrast 3.0:1 (AA braucht 4.5:1 für kleinen Text)
  - `.input-addon::after` (Unit-Labels) – `color: var(--gray-400)` – 3.0:1 bei 0.875rem
  - `.modal-close { color: var(--gray-400) }` – Interaktives Element, braucht 3.0:1 gegen Hintergrund ✓, aber für Textinhalt problematisch
  - `.stat-label { color: var(--gray-600) }` – 7.4:1 ✅ (Nicht betroffen)
- **Severity:** CRITICAL – WCAG 1.4.3 Verletzung
- **Fix:** Ersetze `--gray-400` (#9CA3AF) durch `--gray-500` (#6B7280) für Text, der Inhalte trägt.
  - `--gray-500` auf Weiß = 4.6:1 ✅ (knapp AA bestanden)
  ```css
  .badge-empty { color: var(--gray-500); }
  .input-addon::after { color: var(--gray-500); }
  .modal-close { color: var(--gray-500); }
  ```

---

### HIGH

#### Issue #H1: Alles zentriert – Layout-Anti-Pattern
- **Fundstellen:**
  - `header { text-align: center }` – H1 + Subtitle zentriert
  - `.stat-card { text-align: center }` – alle Statistik-Karten
  - `.final-badge { text-align: center }` – Ergebnisausgabe
  - `.empty-message { text-align: center }` – Leerzustand
  - `<div style="... text-align: center;">` (Gruppen-Aktions-Bar, inline)
- **Regel:** DON'T: "Center everything — left-aligned text with asymmetric layouts feels more designed"
- **Impact:** Dashboard + Utility-Tool wirkt wie ein generisches AI-Template, keine Designhaltung.
- **Empfehlung:** Header linksbündig mit dem Untertitel als Pair. Stat-Cards: Wert linksbündig fett, Label daneben oder darunter. Final-Badge: weiterhin zentriert OK (es ist ein ausgezeichnetes Ergebnis, Zentrierung ist hier semantisch sinnvoll).

#### Issue #H2: Modals für Disziplin-Info statt Popover
- **Fundstelle:** `renderInfoButton()` in `js/ui.js:40-53`
- **Regel:** DON'T: "Use modals unless there's truly no better alternative — modals are lazy"
- **Problem:** Das ℹ️-Modal ist ein vollständiger Overlay für kurzen Infotext (~2-3 Sätze). Es sperrt den Hintergrund, erfordert explizites Schließen und unterbricht den Flow.
- **Alternative:** Native Popover API:
  ```html
  <button popovertarget="info-liegestuetz" class="info-btn">ℹ️</button>
  <div id="info-liegestuetz" popover class="info-popover">
    Liegestütz: Ausgangsposition...
  </div>
  ```
  Vorteile: Light-dismiss (Klick außen schließt), kein z-index War, kein JS nötig, Accessibility by default.
- **Aufwand:** Mittel (renderInfoButton + showModal/closeModal + CSS + die Modal-HTML-Struktur)

#### Issue #H3: Modal ohne Fokus-Trap (modernisieren)
- **Fundstelle:** `index.html` – Modal-Overlay + `js/ui.js` – showModal/closeModal
- **Problem:** Tab-Taste verlässt das offene Modal. Kein `inert` auf `<main>`, kein nativer `<dialog>`.
- **Moderne Lösung:**
  ```javascript
  // showModal:
  document.querySelector('main').setAttribute('inert', '');
  // closeModal:
  document.querySelector('main').removeAttribute('inert');
  ```
  Oder: Modal in natives `<dialog>` umwandeln und `dialog.showModal()` nutzen (automatischer Fokus-Trap + ESC).

---

### MEDIUM

#### Issue #M1: Reine grau-neutrale Farben ohne Brand-Tinting
- **Fundstelle:** `:root` – `--gray-50: #F9FAFB` bis `--gray-900: #111827`
- **Regel:** DON'T: "Pure gray is dead — add a subtle hint of your brand hue to all neutrals"
- **Problem:** Alle Grautöne sind chromatisch neutral (0 Farbanteil). Der feuerwehr-rote Brand-Ton (`--fire-red: #DC2626`) bleibt isoliert, es gibt keine subkutane Kohärenz der Palette.
- **Empfehlung:** Minimale Warm-Tintung mit einem Hauch Rot/Orange (Feuerwehr-Assoziation):
  ```css
  /* Statt: --gray-100: #F3F4F6  (kalt, steril) */
  /* Nach:  --gray-100: oklch(96% 0.005 30)  (warm getönt, kaum sichtbar aber
             fühlt sich zusammengehöriger an) */
  ```
  Aufwand: gering bei OKLCH-Umstieg, hoch bei manuellem Hex-Tuning.

#### Issue #M2: Desktop-first CSS-Struktur
- **Fundstelle:** `css/styles.css` – Basis-Styles + `@media (max-width: ...)` Queries
- **Regel:** DON'T: "Desktop-first design — start with base styles for mobile, use min-width queries"
- **Problem:** Die gesamte Stylesheet-Architektur ist desktop-first. Responsive Anpassungen via `max-width` überrides. Mobile erhält unnötige Code-Last.
- **Impact:** Auf langsamen mobilen Geräten werden Desktop-Styles geladen und dann überschrieben.
- **Empfehlung:** Langfristig bei Refactoring auf `min-width` umstellen. Kurzzeitig: Keine neuen `max-width`-Blöcke mehr hinzufügen.

#### Issue #M3: `overflow: visible` bricht `border-radius` auf Gruppen-Tabelle
- **Fundstelle:** `css/styles.css` – `.group-table-container { overflow: visible; }`
- **Problem:** `border-radius: 12px` hat keinen visuellen Effekt wenn `overflow: visible`. Die Tabellenecken werden nicht abgeschnitten.
- **In Desktop-Welt:** `overflow: visible` → Tabelle "ragt raus". Erst ab Tablet (`@media max-width: 1024px`) wird `overflow-x: auto` gesetzt.
- **Fix:**
  ```css
  .group-table-container {
    overflow: hidden;   /* War: overflow: visible */
  }
  /* Scroll auf Tablet/Mobile erhalten: */
  @media (max-width: 1024px) {
    .group-table-container {
      overflow-x: auto;
    }
  }
  ```

#### Issue #M4: Hard-coded Hex-Farben außerhalb des Design-Systems
- **Fundstellen:**
  - `.badge-silver { color: #1F2937 }` – sollte `var(--gray-800)` sein
  - `.badge-silver { border: 2px solid #9CA3AF }` – sollte `var(--gray-400)` sein
  - `.badge-gold { color: #1F2937 }` – sollte `var(--gray-800)` sein
  - `.final-badge.silver { border-color: #9CA3AF }` – sollte `var(--gray-400)` sein
- **Impact:** Tokens verlieren ihren Wert wenn Farben direkt verwendet werden. Änderungen am System greifen nicht.

---

### LOW

#### Issue #L1: `badge-silber` Alias-Klassen – Duplikate im Stylesheet
- **Fundstelle:** `css/styles.css` – `.badge-silber` Aliase neben `.badge-silver`
- **Problem:** 7 redundante Selektoren für dieselbe Deklaration. Entweder `silver` oder `silber` — nicht beides.
- **Fix:** In JS/Template-Code prüfen welche Klasse tatsächlich vergeben wird, dann den Alias entfernen.

#### Issue #L2: Keine Skip-Links für Tastatur-Navigation
- **Fundstelle:** `index.html` – Beginn `<body>`
- **Regel:** Interaction-Design Referenz: "Provide skip links for keyboard users"
- **Problem:** Kein `<a href="#main-content" class="skip-link">Zum Inhalt springen</a>`.
- **Impact:** Tastatur-Nutzer müssen Header-Navigation jedes Mal durchfahren.

#### Issue #L3: Kein `<main>` Landmark-Element
- **Fundstelle:** `index.html` – Gesamt-Layout
- **Problem:** Die App-Inhalte sind direkt in `<div class="container">` ohne semantisches `<main>`-Element.
- **WCAG:** 1.3.1 (Info and Relationships) — Landmark-Rollen helfen Screen-Readern.

#### Issue #L4: `transition: all` statt spezifischer Properties
- **Fundstellen:** 8× `transition: all 0.2s ease` im Stylesheet
- **Problem:** `transition: all` animiert alle CSS-Properties inkl. potentieller Layout-Properties. Ineffizient und riskant.
- **Fix:** Spezifisch werden:
  ```css
  /* Statt: transition: all 0.2s ease */
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  ```

#### Issue #L5: Version-String im Footer veraltet
- **Fundstelle:** `index.html` – Footer
- **Content:** `"Version 1.0 | Stand: Januar 2026"` – statisch hard-coded.

#### Issue #L6: `confirm()` Dialog für Varianten-Wechsel
- **Fundstelle:** `index.html` – `handleVariantChange()`
- **Problem:** Natives `window.confirm()` ist nicht stylebar, auf mobilen Geräten unterschiedlich implementiert, und der Text erscheint im Browser-Chrome nicht im App-Design.
- **Empfehlung:** App-eigenes Bestätigungs-Element (z.B. ein Inline-Banner oder Toast mit Undo-Option).

---

## Positive Bewertung (Bestanden)

### Typographie
- ✅ Bebas Neue (Display H1) + Work Sans (Body) – eigenständiges, nicht generisches Font-Pairing
- ✅ `clamp(2.5rem, 6vw, 3.5rem)` auf H1 – fluid
- ✅ Google Fonts mit `display=swap` – nicht render-blockend

### Farbe & Kontrast
- ✅ `--fire-red: #DC2626` konsistent als einziger Brand-Akzent – 60/30/10-Prinzip eingehalten
- ✅ Kein AI-Color-Palette (Cyan, Purple-Gradients)
- ✅ `prefers-reduced-motion` korrekt implementiert
- ✅ `--gray-900: #111827` als Textfarbe – kein reines Schwarz
- ✅ Most text on white: `--gray-700`, `--gray-900` – ausreichend Kontrast

### Layout & Struktur
- ✅ CSS Custom Properties vollständig genutzt
- ✅ Semantisches HTML: `<header>`, `<nav>`, `<footer>`, `role="tablist"`, `role="dialog"`
- ✅ Responsive Breakpoints 1200/1024/768/480px vorhanden
- ✅ `@media print` – Styles für Druckausgabe
- ✅ Tabellen-Layout für Gruppenergebnisse – richtig für tabellarische Daten

### Sicherheit & Korrektheit
- ✅ `escapeHtml()` via `div.textContent` Muster – XSS-sicher
- ✅ `rel="noopener"` auf allen externen Links
- ✅ `data-modal-title/content` statt inline-onclick String-Interpolation
- ✅ `aria-selected` korrekt toggle-t beim Tab-Wechsel
- ✅ `lang="de"` gesetzt

---

## Priorisierungsmatrix

| # | Issue | Severity | Aufwand | Priorität |
|---|-------|----------|---------|-----------|
| C1 | Touch-Targets 44×44px | CRITICAL (WCAG) | Gering | 🔴 Sofort |
| C2 | Kontrast `--gray-400` → `--gray-500` | CRITICAL (WCAG) | Gering | 🔴 Sofort |
| H3 | Modal Focus-Trap (`inert`) | HIGH | Gering | 🟠 Diese Woche |
| M3 | `overflow: visible` → `hidden` | MEDIUM | Gering | 🟠 Diese Woche |
| M4 | Hard-coded Hex in Badge-Styles | MEDIUM | Gering | 🟠 Diese Woche |
| H1 | Header-Zentrierung reduzieren | HIGH | Mittel | 🟡 Nächster Sprint |
| H2 | Info-Popover statt Modal | HIGH | Hoch | 🟡 Nächster Sprint |
| L3 | `<main>` Landmark hinzufügen | LOW | Gering | 🟡 Nächster Sprint |
| L2 | Skip-Links | LOW | Gering | 🟡 Nächster Sprint |
| L1 | `badge-silber` Alias entfernen | LOW | Gering | ⚪ Backlog |
| L4 | `transition: all` → spezifisch | LOW | Mittel | ⚪ Backlog |
| M1 | Brand-getönte Grautöne (OKLCH) | MEDIUM | Hoch | ⚪ Backlog |
| M2 | Desktop-first → Mobile-first | MEDIUM | Sehr hoch | ⚪ Backlog |
| L5 | Version-String aktualisieren | LOW | Trivial | ⚪ Backlog |
| L6 | `confirm()` → App-eigene UI | LOW | Mittel | ⚪ Backlog |

---

## Quick-Win-Paket (< 30 Minuten, sofortiger Effekt)

Die 5 folgenden Fixes haben minimalen Aufwand und maximalem WCAG-Impact:

1. `--gray-400` → `--gray-500` in `.badge-empty`, `.input-addon::after`, `.modal-close`
2. `.action-btn`, `.modal-close` auf `width/height: 44px` setzen
3. `.info-btn` Hit-Area via `::before`-Pseudo-Overlay vergrößern
4. `.group-table-container { overflow: hidden }` (desktop) fixieren
5. `#1F2937`/`#9CA3AF` in Badge-Styles durch `var(--gray-800)`/`var(--gray-400)` ersetzen
