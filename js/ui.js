/**
 * UI-Komponenten für die dFFA Rechner Anwendung
 * Alle Rendering-Logik für die Benutzeroberfläche
 */

class dFFAUI {
  constructor(calculator) {
    this.calculator = calculator;
  }

  /**
   * Rendert eine Info-Modal für Disziplin-Beschreibung
   * @param {string} title - Titel der Disziplin
   * @param {string} description - Beschreibung
   * @returns {string} HTML
   */
  renderInfoButton(title, description) {
    return `
      <button class="info-btn" onclick="showModal('${this.escapeHtml(title)}', '${this.escapeHtml(description)}')">
        <span class="info-icon">ℹ️</span>
      </button>
    `;
  }

  /**
   * Erstellt einen Modal-Dialog
   * @param {string} title - Titel
   * @param {string} content - Inhalt
   */
  showModal(title, content) {
    const modal = document.getElementById('infoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = title;
    modalContent.textContent = content;
    modal.classList.add('show');
  }

  /**
   * Schließt den Modal-Dialog
   */
  closeModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('show');
  }

  /**
   * Rendert die Anforderungstabelle
   * @param {string} ageGroup - Altersklasse
   * @param {Array} selectedDisciplines - Ausgewählte Disziplinen
   * @returns {string} HTML
   */
  renderRequirementsTable(ageGroup, selectedDisciplines = null) {
    const requirements = this.calculator.getAllRequirements(ageGroup, selectedDisciplines);
    let html = '';

    for (const [category, disciplines] of Object.entries(requirements)) {
      const categoryInfo = this.calculator.getCategoryInfo(category);
      
      html += `
        <div class="result-category-section">
          <div class="result-category">
            <span class="category-icon">${categoryInfo.icon}</span>
            ${categoryInfo.name}
          </div>
          <div class="result-disciplines">
      `;

      for (const [disciplineKey, data] of Object.entries(disciplines)) {
        html += `
          <div class="result-discipline">
            <div class="discipline-name-with-info">
              <span class="discipline-name">${data.name}</span>
              ${this.renderInfoButton(data.name, data.beschreibung)}
            </div>
            <span class="badge-value badge-bronze">
              ${this.calculator.formatValue(data.anforderungen.bronze, data.einheit)}
            </span>
            ${data.anforderungen.silber ? `
              <span class="badge-value badge-silver">
                ${this.calculator.formatValue(data.anforderungen.silber, data.einheit)}
              </span>
            ` : '<span class="badge-value badge-empty">—</span>'}
            ${data.anforderungen.gold ? `
              <span class="badge-value badge-gold">
                ${this.calculator.formatValue(data.anforderungen.gold, data.einheit)}
              </span>
            ` : '<span class="badge-value badge-empty">—</span>'}
          </div>
        `;
      }

      html += `
          </div>
        </div>
      `;
    }

    return html;
  }

  /**
   * Rendert ein Dropdown zur Disziplinauswahl
   * @param {string} category - Kategorie
   * @param {string} selectedValue - Ausgewählter Wert
   * @param {string} id - Element-ID
   * @returns {string} HTML
   */
  renderDisciplineSelect(category, selectedValue = '', id = '') {
    const disciplines = this.calculator.getDisciplines(category);
    const categoryInfo = this.calculator.getCategoryInfo(category);
    
    let html = `
      <select id="${id}" class="discipline-select" onchange="handleDisciplineChange('${category}', '${id}')">
        <option value="">-- ${categoryInfo.name}-Disziplin wählen --</option>
    `;

    disciplines.forEach(disc => {
      const selected = disc.key === selectedValue ? 'selected' : '';
      html += `<option value="${disc.key}" ${selected}>${disc.name}</option>`;
    });

    html += '</select>';
    return html;
  }

  /**
   * Rendert ein Eingabefeld basierend auf der Disziplin
   * @param {string} category - Kategorie
   * @param {string} discipline - Disziplin-Key
   * @param {string} idPrefix - Prefix für IDs
   * @returns {string} HTML
   */
  renderPerformanceInput(category, discipline, idPrefix = '') {
    if (!discipline) return '';

    const disciplineData = this.calculator.data.leistungstabellen[category][discipline];
    if (!disciplineData) return '';

    const einheit = disciplineData.einheit;

    // Spezialbehandlung für Halbmarathon und Marathon (feste Distanzen)
    if (discipline === 'halbmarathon') {
      return `
        <div class="form-group" style="margin-top: 1rem;">
          <label>
            <input type="checkbox" id="${idPrefix}Completed" checked onchange="document.getElementById('${idPrefix}Value').value = this.checked ? '21.1' : ''">
            Halbmarathon erfolgreich absolviert (21,1 km)
          </label>
          <input type="hidden" id="${idPrefix}Value" value="21.1">
        </div>
      `;
    } else if (discipline === 'marathon') {
      return `
        <div class="form-group" style="margin-top: 1rem;">
          <label>
            <input type="checkbox" id="${idPrefix}Completed" checked onchange="document.getElementById('${idPrefix}Value').value = this.checked ? '42.2' : ''">
            Marathon erfolgreich absolviert (42,2 km)
          </label>
          <input type="hidden" id="${idPrefix}Value" value="42.2">
        </div>
      `;
    }

    if (einheit === 'zeit') {
      return `
        <div class="time-input-group">
          <div class="input-addon" data-unit="min">
            <input type="number" id="${idPrefix}Minutes" class="performance-input"
                   min="0" placeholder="Minuten" />
          </div>
          <div class="input-addon" data-unit="sek">
            <input type="number" id="${idPrefix}Seconds" class="performance-input"
                   min="0" max="59" placeholder="Sekunden" />
          </div>
        </div>
      `;
    } else if (einheit === 'wiederholungen') {
      return `
        <div class="input-addon" data-unit="Wdh.">
          <input type="number" id="${idPrefix}Value" class="performance-input"
                 min="0" placeholder="Anzahl" />
        </div>
      `;
    } else if (einheit === 'sekunden') {
      return `
        <div class="input-addon" data-unit="sek">
          <input type="number" id="${idPrefix}Value" class="performance-input"
                 min="0" placeholder="Sekunden" />
        </div>
      `;
    } else if (einheit === 'meter') {
      return `
        <div class="input-addon" data-unit="m">
          <input type="number" id="${idPrefix}Value" class="performance-input"
                 min="0" placeholder="Meter" />
        </div>
      `;
    } else if (einheit === 'distanz') {
      return `
        <div class="input-addon" data-unit="km">
          <input type="number" id="${idPrefix}Value" class="performance-input"
                 min="0" step="0.1" placeholder="Kilometer" />
        </div>
      `;
    }

    return '';
  }

  /**
   * Rendert das Ergebnis einer Einzelperson
   * @param {Object} result - Berechnungsergebnis
   * @returns {string} HTML
   */
  renderIndividualResult(result) {
    if (result.error) {
      return `<div class="error-message">${result.error}</div>`;
    }

    let html = `
      <h3 class="result-header">
        Altersklasse: ${result.ageGroup} (${result.age} Jahre)
      </h3>
    `;

    // Einzelergebnisse
    for (const [category, detail] of Object.entries(result.details)) {
      const categoryInfo = this.calculator.getCategoryInfo(category);
      
      html += `
        <div class="result-category-section">
          <div class="result-category">
            <span class="category-icon">${categoryInfo.icon}</span>
            ${categoryInfo.name}
          </div>
          <div class="result-disciplines">
            <div class="result-discipline">
              <span class="discipline-name">${detail.disciplineName}</span>
              <span class="performance-value">
                ${this.calculator.formatValue(detail.value, detail.einheit)}
              </span>
              ${detail.badge ? `
                <span class="badge-value badge-${detail.badge}">
                  ${this.capitalizeFirst(detail.badge)}
                </span>
              ` : `
                <span class="badge-value badge-failed">Nicht bestanden</span>
              `}
            </div>
          </div>
        </div>
      `;
    }

    // Gesamtabzeichen
    if (result.finalBadge) {
      const badgeEmojis = { bronze: '🥉', silver: '🥈', gold: '🥇' };
      const badgeNames = { bronze: 'Bronze', silver: 'Silber', gold: 'Gold' };
      
      html += `
        <div class="final-badge ${result.finalBadge}">
          <span class="final-badge-emoji">${badgeEmojis[result.finalBadge]}</span>
          <div class="final-badge-title">${badgeNames[result.finalBadge]}-Abzeichen</div>
          <p class="final-badge-subtitle">Deutsches Feuerwehr-Fitnessabzeichen</p>
        </div>
      `;
    } else {
      html += `
        <div class="final-badge failed">
          <span class="final-badge-emoji">❌</span>
          <div class="final-badge-title">Nicht bestanden</div>
          <p class="final-badge-subtitle">Mindestens eine Disziplin wurde nicht erfolgreich absolviert</p>
        </div>
      `;
    }

    return html;
  }

  /**
   * Rendert die Gruppentabelle
   * @param {Array} groupResults - Array von Gruppenergebnissen
   * @returns {string} HTML
   */
  renderGroupTable(groupResults) {
    if (!groupResults || groupResults.length === 0) {
      return '<p class="empty-message">Noch keine Personen in der Gruppe</p>';
    }

    let html = `
      <div class="group-table-container">
        <table class="group-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Alter</th>
              <th>AK</th>
              <th>Ausdauer</th>
              <th>Leistung</th>
              <th>Wertung</th>
              <th>Kraft</th>
              <th>Leistung</th>
              <th>Wertung</th>
              <th>Koordination</th>
              <th>Leistung</th>
              <th>Wertung</th>
              <th>Abzeichen</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
    `;

    groupResults.forEach(person => {
      const ausdauer = person.details.ausdauer || {};
      const kraft = person.details.kraft || {};
      const koordination = person.details.koordination || {};

      html += `
        <tr data-person-id="${person.id}">
          <td class="name-cell">${this.escapeHtml(person.name)}</td>
          <td>${person.age}</td>
          <td>${person.ageGroup}</td>
          
          <td class="discipline-cell">${ausdauer.disciplineName || '—'}</td>
          <td class="value-cell">
            ${ausdauer.value ? this.calculator.formatValue(ausdauer.value, ausdauer.einheit) : '—'}
          </td>
          <td class="badge-cell">
            ${ausdauer.badge ? `<span class="badge-mini badge-${ausdauer.badge}">${this.capitalizeFirst(ausdauer.badge)}</span>` : '—'}
          </td>
          
          <td class="discipline-cell">${kraft.disciplineName || '—'}</td>
          <td class="value-cell">
            ${kraft.value ? this.calculator.formatValue(kraft.value, kraft.einheit) : '—'}
          </td>
          <td class="badge-cell">
            ${kraft.badge ? `<span class="badge-mini badge-${kraft.badge}">${this.capitalizeFirst(kraft.badge)}</span>` : '—'}
          </td>
          
          <td class="discipline-cell">${koordination.disciplineName || '—'}</td>
          <td class="value-cell">
            ${koordination.value ? this.calculator.formatValue(koordination.value, koordination.einheit) : '—'}
          </td>
          <td class="badge-cell">
            ${koordination.badge ? `<span class="badge-mini badge-${koordination.badge}">${this.capitalizeFirst(koordination.badge)}</span>` : '—'}
          </td>
          
          <td class="final-badge-cell">
            ${person.finalBadge ? `
              <span class="badge-final badge-${person.finalBadge}">
                ${this.capitalizeFirst(person.finalBadge)}
              </span>
            ` : '<span class="badge-failed-mini">❌</span>'}
          </td>
          
          <td class="actions-cell">
            <button class="action-btn edit-btn" onclick="editGroupPerson('${person.id}')" title="Bearbeiten">
              ✏️
            </button>
            <button class="action-btn delete-btn" onclick="deleteGroupPerson('${person.id}')" title="Löschen">
              🗑️
            </button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    return html;
  }

  /**
   * Rendert das Formular zum Hinzufügen einer Person zur Gruppe
   * @param {Object} person - Optional: Personendaten zum Bearbeiten
   * @returns {string} HTML
   */
  renderGroupPersonForm(person = null) {
    const isEdit = person !== null;
    const formTitle = isEdit ? 'Person bearbeiten' : 'Person hinzufügen';
    const buttonText = isEdit ? 'Aktualisieren' : 'Hinzufügen';

    return `
      <div class="group-person-form">
        <h3>${formTitle}</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label>Name</label>
            <input type="text" id="groupPersonName" value="${person?.name || ''}" 
                   placeholder="Max Mustermann" />
          </div>
          <div class="form-group">
            <label>Geburtsjahr</label>
            <input type="number" id="groupPersonBirthYear" value="${person?.birthYear || ''}" 
                   min="1950" max="${new Date().getFullYear()}" placeholder="1990" />
          </div>
        </div>

        <div class="form-group">
          <label>Ausdauer-Disziplin</label>
          ${this.renderDisciplineSelect('ausdauer', person?.performances?.ausdauer?.discipline || '', 'groupAusdauer')}
        </div>
        <div id="groupAusdauerInput" class="performance-input-container"></div>

        <div class="form-group">
          <label>Kraft-Disziplin</label>
          ${this.renderDisciplineSelect('kraft', person?.performances?.kraft?.discipline || '', 'groupKraft')}
        </div>
        <div id="groupKraftInput" class="performance-input-container"></div>

        <div class="form-group">
          <label>Koordinations-Disziplin</label>
          ${this.renderDisciplineSelect('koordination', person?.performances?.koordination?.discipline || '', 'groupKoordination')}
        </div>
        <div id="groupKoordinationInput" class="performance-input-container"></div>

        <div class="form-actions">
          <button class="btn btn-primary" onclick="saveGroupPerson('${person?.id || ''}')">${buttonText}</button>
          ${isEdit ? '<button class="btn btn-secondary" onclick="cancelEditGroupPerson()">Abbrechen</button>' : ''}
        </div>
      </div>
    `;
  }

  /**
   * Helper: Escaped HTML
   * @param {string} text - Text
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Helper: Kapitalisiert ersten Buchstaben
   * @param {string} str - String
   * @returns {string} Kapitalisierter String
   */
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dFFAUI;
}