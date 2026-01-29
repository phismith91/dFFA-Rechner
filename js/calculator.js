/**
 * Berechnungs-Engine für das Deutsche Feuerwehr-Fitnessabzeichen (dFFA)
 * Alle Geschäftslogik unabhängig von der UI
 */

class dFFACalculator {
  constructor(data) {
    this.data = data;
    this.variant = data.name || 'dFFA';
  }

  /**
   * Berechnet die Altersklasse basierend auf Geburtsjahr und Abnahmejahr
   * @param {number} birthYear - Geburtsjahr
   * @param {number} testYear - Jahr der Abnahme
   * @returns {string} Altersklasse (z.B. '18-29' oder '60+')
   */
  getAgeGroup(birthYear, testYear) {
    const age = testYear - birthYear;

    if (age < this.data.minAge) return null;
    if (this.data.maxAge !== null && age > this.data.maxAge) return null;

    for (const [ageGroupKey, range] of Object.entries(this.data.altersklassen)) {
      if (range.max === null) {
        if (age >= range.min) return ageGroupKey;
      } else {
        if (age >= range.min && age <= range.max) return ageGroupKey;
      }
    }

    return null;
  }

  /**
   * Berechnet das Alter einer Person im Abnahmejahr
   * @param {number} birthYear - Geburtsjahr
   * @param {number} testYear - Jahr der Abnahme
   * @returns {number} Alter
   */
  getAge(birthYear, testYear) {
    return testYear - birthYear;
  }

  /**
   * Holt die Anforderungen für eine spezifische Disziplin und Altersklasse
   * @param {string} category - Kategorie (ausdauer, kraft, koordination)
   * @param {string} discipline - Disziplin-Key
   * @param {string} ageGroup - Altersklasse
   * @returns {Object} Anforderungen (bronze, silber, gold)
   */
  getRequirements(category, discipline, ageGroup) {
    const disciplineData = this.data.leistungstabellen[category]?.[discipline];
    if (!disciplineData) return null;

    // Für Disziplinen mit 'alle' Altersklassen
    if (disciplineData.anforderungen['alle']) {
      return disciplineData.anforderungen['alle'];
    }

    return disciplineData.anforderungen[ageGroup];
  }

  /**
   * Berechnet alle Anforderungen für eine Altersklasse
   * @param {string} ageGroup - Altersklasse
   * @param {Array} selectedDisciplines - Optional: Array von Disziplin-Keys zum Filtern
   * @returns {Object} Alle Anforderungen gruppiert nach Kategorien
   */
  getAllRequirements(ageGroup, selectedDisciplines = null) {
    const result = {};

    for (const [category, disciplines] of Object.entries(this.data.leistungstabellen)) {
      result[category] = {};

      for (const [disciplineKey, disciplineData] of Object.entries(disciplines)) {
        // Filter nach ausgewählten Disziplinen wenn angegeben
        if (selectedDisciplines && !selectedDisciplines.includes(disciplineKey)) {
          continue;
        }

        const requirements = this.getRequirements(category, disciplineKey, ageGroup);
        if (requirements) {
          result[category][disciplineKey] = {
            name: disciplineData.name,
            einheit: disciplineData.einheit,
            anforderungen: requirements,
            beschreibung: disciplineData.beschreibung
          };
        }
      }
    }

    return result;
  }

  /**
   * Bewertet eine einzelne Leistung und gibt die erreichte Stufe zurück
   * @param {number} performance - Erbrachte Leistung
   * @param {Object} requirements - Anforderungen (bronze, silber, gold)
   * @param {boolean} lowerIsBetter - true wenn niedrigere Werte besser sind (Zeit)
   * @returns {string|null} 'gold', 'silber', 'bronze' oder null
   */
  evaluatePerformance(performance, requirements, lowerIsBetter = true) {
    if (!performance || !requirements) return null;

    if (lowerIsBetter) {
      // Niedrigere Werte sind besser (z.B. Zeit)
      if (requirements.gold && performance <= requirements.gold) return 'gold';
      if (requirements.silber && performance <= requirements.silber) return 'silber';
      if (requirements.bronze && performance <= requirements.bronze) return 'bronze';
    } else {
      // Höhere Werte sind besser (z.B. Wiederholungen, Meter)
      if (requirements.gold && performance >= requirements.gold) return 'gold';
      if (requirements.silber && performance >= requirements.silber) return 'silber';
      if (requirements.bronze && performance >= requirements.bronze) return 'bronze';
    }

    return null;
  }

  /**
   * Berechnet das Gesamtabzeichen basierend auf den drei Kategorie-Leistungen
   * @param {Object} results - Ergebnisse mit den Stufen für jede Kategorie
   * @returns {string|null} 'gold', 'silber', 'bronze' oder null
   */
  calculateFinalBadge(results) {
    const { ausdauer, kraft, koordination } = results;

    // Alle drei Kategorien müssen bestanden sein
    if (!ausdauer || !kraft || !koordination) return null;

    // Für Gold müssen alle drei Gold sein
    if (ausdauer === 'gold' && kraft === 'gold' && koordination === 'gold') {
      return 'gold';
    }

    // Für Silber müssen alle mindestens Silber sein
    const silberOrBetter = ['gold', 'silber'];
    if (silberOrBetter.includes(ausdauer) && 
        silberOrBetter.includes(kraft) && 
        silberOrBetter.includes(koordination)) {
      return 'silber';
    }

    // Für Bronze muss mindestens Bronze in allen sein
    const bronzeOrBetter = ['gold', 'silber', 'bronze'];
    if (bronzeOrBetter.includes(ausdauer) && 
        bronzeOrBetter.includes(kraft) && 
        bronzeOrBetter.includes(koordination)) {
      return 'bronze';
    }

    return null;
  }

  /**
   * Bewertet die komplette Leistung einer Person
   * @param {Object} personData - Personendaten mit Geburtsjahr, Testjahr und Leistungen
   * @returns {Object} Detaillierte Bewertung mit Einzelergebnissen und Gesamtabzeichen
   */
  evaluatePerson(personData) {
    const { birthYear, testYear, performances } = personData;
    
    const ageGroup = this.getAgeGroup(birthYear, testYear);
    if (!ageGroup) {
      return { error: 'Ungültiges Alter für dFFA' };
    }

    const age = this.getAge(birthYear, testYear);
    const results = {
      ageGroup,
      age,
      details: {},
      badges: {},
      finalBadge: null
    };

    // Bewerte jede Kategorie
    for (const [category, performance] of Object.entries(performances)) {
      if (!performance.discipline || performance.value === null || performance.value === undefined) {
        continue;
      }

      const disciplineData = this.data.leistungstabellen[category][performance.discipline];
      if (!disciplineData) continue;

      const requirements = this.getRequirements(category, performance.discipline, ageGroup);
      if (!requirements) continue;

      const badge = this.evaluatePerformance(
        performance.value,
        requirements,
        disciplineData.lowerIsBetter
      );

      results.details[category] = {
        discipline: performance.discipline,
        disciplineName: disciplineData.name,
        value: performance.value,
        einheit: disciplineData.einheit,
        requirements,
        badge
      };

      results.badges[category] = badge;
    }

    // Berechne Gesamtabzeichen
    results.finalBadge = this.calculateFinalBadge(results.badges);

    return results;
  }

  /**
   * Bewertet eine Gruppe von Personen
   * @param {Array} groupData - Array von Personendaten
   * @returns {Array} Array von Bewertungen
   */
  evaluateGroup(groupData) {
    return groupData.map(person => ({
      name: person.name,
      ...this.evaluatePerson(person)
    }));
  }

  /**
   * Validiert eine Zeitangabe (Minuten:Sekunden)
   * @param {number} minutes - Minuten
   * @param {number} seconds - Sekunden
   * @returns {number|null} Gesamtzeit in Sekunden oder null bei Fehler
   */
  validateTime(minutes, seconds) {
    if (minutes < 0 || seconds < 0 || seconds >= 60) return null;
    return minutes * 60 + seconds;
  }

  /**
   * Konvertiert Sekunden in formatierte Zeitangabe
   * @param {number} seconds - Zeit in Sekunden
   * @returns {Object} { minutes, seconds, formatted }
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: mins,
      seconds: secs,
      formatted: `${mins}:${secs.toString().padStart(2, '0')}`
    };
  }

  /**
   * Formatiert einen Wert basierend auf der Einheit
   * @param {number} value - Wert
   * @param {string} einheit - Einheit (zeit, wiederholungen, sekunden, meter, distanz)
   * @returns {string} Formatierter Wert
   */
  formatValue(value, einheit) {
    switch (einheit) {
      case 'zeit':
        const time = this.formatTime(value);
        return `${time.formatted} min`;
      case 'wiederholungen':
        return `${value} Wdh.`;
      case 'sekunden':
        return `${value} sek`;
      case 'meter':
        return `${value} m`;
      case 'distanz':
        return `${value} km`;
      default:
        return String(value);
    }
  }

  /**
   * Gibt alle verfügbaren Disziplinen einer Kategorie zurück
   * @param {string} category - Kategorie (ausdauer, kraft, koordination)
   * @returns {Array} Array von Disziplin-Objekten
   */
  getDisciplines(category) {
    const disciplines = this.data.leistungstabellen[category];
    if (!disciplines) return [];

    return Object.entries(disciplines).map(([key, data]) => ({
      key,
      name: data.name,
      einheit: data.einheit,
      beschreibung: data.beschreibung,
      lowerIsBetter: data.lowerIsBetter
    }));
  }

  /**
   * Gibt Kategorie-Informationen zurück
   * @param {string} category - Kategorie-Key
   * @returns {Object} Kategorie-Informationen
   */
  getCategoryInfo(category) {
    return this.data.kategorien[category];
  }

  /**
   * Gibt alle Altersklassen zurück
   * @returns {Array} Array von Altersklassen
   */
  getAllAgeGroups() {
    return Object.keys(this.data.altersklassen);
  }

  /**
   * Exportiert Gruppenergebnisse als CSV-String
   * @param {Array} groupResults - Gruppenergebnisse
   * @returns {string} CSV-String
   */
  exportToCSV(groupResults) {
    const headers = [
      'Name',
      'Geburtsjahr',
      'Alter',
      'Altersklasse',
      'Ausdauer Disziplin',
      'Ausdauer Leistung',
      'Ausdauer Wertung',
      'Kraft Disziplin',
      'Kraft Leistung',
      'Kraft Wertung',
      'Koordination Disziplin',
      'Koordination Leistung',
      'Koordination Wertung',
      'Gesamtabzeichen'
    ];

    const rows = groupResults.map(person => {
      const ausdauer = person.details.ausdauer || {};
      const kraft = person.details.kraft || {};
      const koordination = person.details.koordination || {};

      return [
        person.name || '',
        person.birthYear || '',
        person.age || '',
        person.ageGroup || '',
        ausdauer.disciplineName || '',
        ausdauer.value ? this.formatValue(ausdauer.value, ausdauer.einheit) : '',
        ausdauer.badge || 'nicht bestanden',
        kraft.disciplineName || '',
        kraft.value ? this.formatValue(kraft.value, kraft.einheit) : '',
        kraft.badge || 'nicht bestanden',
        koordination.disciplineName || '',
        koordination.value ? this.formatValue(koordination.value, koordination.einheit) : '',
        koordination.badge || 'nicht bestanden',
        person.finalBadge || 'nicht bestanden'
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }
}

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dFFACalculator;
}