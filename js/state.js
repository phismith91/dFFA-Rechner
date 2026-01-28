/**
 * State Management für die dFFA Rechner Anwendung
 * Zentrale Verwaltung des Anwendungszustands
 */

class dFFAState {
  constructor() {
    this.currentView = 'requirements'; // 'requirements', 'individual', 'group'
    this.currentYear = new Date().getFullYear();
    this.selectedDisciplines = {
      ausdauer: [],
      kraft: [],
      koordination: []
    };
    this.individualData = {
      birthYear: null,
      testYear: this.currentYear,
      performances: {
        ausdauer: { discipline: null, value: null },
        kraft: { discipline: null, value: null },
        koordination: { discipline: null, value: null }
      }
    };
    this.groupData = [];
    this.listeners = [];
  }

  /**
   * Registriert einen Listener für State-Änderungen
   * @param {Function} callback - Callback-Funktion
   */
  subscribe(callback) {
    this.listeners.push(callback);
  }

  /**
   * Benachrichtigt alle Listener über State-Änderungen
   */
  notify() {
    this.listeners.forEach(callback => callback(this.getState()));
  }

  /**
   * Gibt den aktuellen State zurück
   * @returns {Object} Aktueller State
   */
  getState() {
    return {
      currentView: this.currentView,
      currentYear: this.currentYear,
      selectedDisciplines: { ...this.selectedDisciplines },
      individualData: JSON.parse(JSON.stringify(this.individualData)),
      groupData: JSON.parse(JSON.stringify(this.groupData))
    };
  }

  /**
   * Setzt die aktuelle Ansicht
   * @param {string} view - Ansichts-ID
   */
  setView(view) {
    this.currentView = view;
    this.notify();
  }

  /**
   * Setzt das aktuelle Jahr
   * @param {number} year - Jahr
   */
  setCurrentYear(year) {
    this.currentYear = year;
    this.individualData.testYear = year;
    this.notify();
  }

  /**
   * Wählt/Deselektiert eine Disziplin für die Anforderungsansicht
   * @param {string} category - Kategorie
   * @param {string} discipline - Disziplin-Key
   * @param {boolean} selected - Ausgewählt oder nicht
   */
  toggleDiscipline(category, discipline, selected) {
    if (selected) {
      if (!this.selectedDisciplines[category].includes(discipline)) {
        this.selectedDisciplines[category].push(discipline);
      }
    } else {
      this.selectedDisciplines[category] = this.selectedDisciplines[category]
        .filter(d => d !== discipline);
    }
    this.notify();
  }

  /**
   * Setzt Daten für die Einzelperson
   * @param {Object} data - Personendaten
   */
  setIndividualData(data) {
    this.individualData = { ...this.individualData, ...data };
    this.notify();
  }

  /**
   * Setzt die Leistung für eine Kategorie (Einzelperson)
   * @param {string} category - Kategorie
   * @param {string} discipline - Disziplin-Key
   * @param {number} value - Leistungswert
   */
  setIndividualPerformance(category, discipline, value) {
    this.individualData.performances[category] = {
      discipline,
      value
    };
    this.notify();
  }

  /**
   * Fügt eine Person zur Gruppe hinzu
   * @param {Object} person - Personendaten
   * @returns {string} ID der Person
   */
  addPersonToGroup(person) {
    const id = `person_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.groupData.push({
      id,
      name: person.name || '',
      birthYear: person.birthYear,
      testYear: person.testYear || this.currentYear,
      performances: {
        ausdauer: { discipline: null, value: null },
        kraft: { discipline: null, value: null },
        koordination: { discipline: null, value: null }
      }
    });
    this.notify();
    return id;
  }

  /**
   * Aktualisiert eine Person in der Gruppe
   * @param {string} id - Personen-ID
   * @param {Object} updates - Zu aktualisierende Felder
   */
  updatePersonInGroup(id, updates) {
    const index = this.groupData.findIndex(p => p.id === id);
    if (index !== -1) {
      this.groupData[index] = { ...this.groupData[index], ...updates };
      this.notify();
    }
  }

  /**
   * Setzt die Leistung einer Person in der Gruppe
   * @param {string} id - Personen-ID
   * @param {string} category - Kategorie
   * @param {string} discipline - Disziplin-Key
   * @param {number} value - Leistungswert
   */
  setGroupPerformance(id, category, discipline, value) {
    const person = this.groupData.find(p => p.id === id);
    if (person) {
      person.performances[category] = { discipline, value };
      this.notify();
    }
  }

  /**
   * Entfernt eine Person aus der Gruppe
   * @param {string} id - Personen-ID
   */
  removePersonFromGroup(id) {
    this.groupData = this.groupData.filter(p => p.id !== id);
    this.notify();
  }

  /**
   * Löscht alle Personen aus der Gruppe
   */
  clearGroup() {
    this.groupData = [];
    this.notify();
  }

  /**
   * Lädt State aus LocalStorage
   */
  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('dffa_state');
      if (saved) {
        const state = JSON.parse(saved);
        this.currentView = state.currentView || this.currentView;
        this.currentYear = state.currentYear || this.currentYear;
        this.selectedDisciplines = state.selectedDisciplines || this.selectedDisciplines;
        this.individualData = state.individualData || this.individualData;
        this.groupData = state.groupData || this.groupData;
        this.notify();
      }
    } catch (e) {
      console.error('Fehler beim Laden des States:', e);
    }
  }

  /**
   * Speichert State in LocalStorage
   */
  saveToLocalStorage() {
    try {
      localStorage.setItem('dffa_state', JSON.stringify(this.getState()));
    } catch (e) {
      console.error('Fehler beim Speichern des States:', e);
    }
  }

  /**
   * Setzt den State zurück
   */
  reset() {
    this.currentView = 'requirements';
    this.selectedDisciplines = {
      ausdauer: [],
      kraft: [],
      koordination: []
    };
    this.individualData = {
      birthYear: null,
      testYear: this.currentYear,
      performances: {
        ausdauer: { discipline: null, value: null },
        kraft: { discipline: null, value: null },
        koordination: { discipline: null, value: null }
      }
    };
    this.groupData = [];
    this.notify();
  }
}

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dFFAState;
}