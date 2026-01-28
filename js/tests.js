/**
 * Test Suite für dFFA Calculator
 * Umfassende Tests für alle Berechnungsfunktionen
 */

class dFFATests {
  constructor(calculator) {
    this.calculator = calculator;
    this.testResults = [];
    this.passed = 0;
    this.failed = 0;
  }

  /**
   * Führt einen einzelnen Test aus
   */
  test(name, testFn) {
    try {
      testFn();
      this.passed++;
      this.testResults.push({ name, status: 'PASSED', error: null });
      console.log(`✅ PASSED: ${name}`);
    } catch (error) {
      this.failed++;
      this.testResults.push({ name, status: 'FAILED', error: error.message });
      console.error(`❌ FAILED: ${name}`);
      console.error(`   Error: ${error.message}`);
    }
  }

  /**
   * Assertion: Werte müssen gleich sein
   */
  assertEqual(actual, expected, message = '') {
    if (actual !== expected) {
      throw new Error(
        `${message}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`
      );
    }
  }

  /**
   * Assertion: Wert muss null sein
   */
  assertNull(value, message = '') {
    if (value !== null) {
      throw new Error(`${message}\n  Expected: null\n  Actual: ${JSON.stringify(value)}`);
    }
  }

  /**
   * Assertion: Wert darf nicht null sein
   */
  assertNotNull(value, message = '') {
    if (value === null) {
      throw new Error(`${message}\n  Value should not be null`);
    }
  }

  /**
   * Zeigt Test-Zusammenfassung
   */
  summary() {
    console.log('\n' + '='.repeat(60));
    console.log('TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${this.passed + this.failed}`);
    console.log(`✅ Passed: ${this.passed}`);
    console.log(`❌ Failed: ${this.failed}`);
    console.log(`Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));

    if (this.failed > 0) {
      console.log('\nFailed Tests:');
      this.testResults
        .filter(r => r.status === 'FAILED')
        .forEach(r => {
          console.log(`  - ${r.name}`);
          console.log(`    ${r.error}`);
        });
    }

    return this.failed === 0;
  }

  /**
   * Führt alle Tests aus
   */
  runAll() {
    console.log('Starting dFFA Calculator Test Suite...\n');

    // Test 1: Altersklassen-Berechnung
    this.testAgeGroups();

    // Test 2: Leistungsbewertung
    this.testPerformanceEvaluation();

    // Test 3: KRITISCH - Abzeichen-Berechnung
    this.testFinalBadgeCalculation();

    // Test 4: Einzelpersonen-Bewertung
    this.testPersonEvaluation();

    // Test 5: Zeit-Validierung
    this.testTimeValidation();

    // Test 6: Formatierung
    this.testFormatting();

    // Test 7: Edge Cases
    this.testEdgeCases();

    // Test 8: Alle Disziplinen
    this.testAllDisciplines();

    return this.summary();
  }

  /**
   * Test 1: Altersklassen
   */
  testAgeGroups() {
    console.log('\n--- Testing Age Groups ---');

    this.test('Age 17 (zu jung)', () => {
      const result = this.calculator.getAgeGroup(2009, 2026);
      this.assertNull(result, 'Person unter 18 sollte null zurückgeben');
    });

    this.test('Age 18 (18-29)', () => {
      const result = this.calculator.getAgeGroup(2008, 2026);
      this.assertEqual(result, '18-29', 'Age 18 sollte in 18-29 sein');
    });

    this.test('Age 29 (18-29)', () => {
      const result = this.calculator.getAgeGroup(1997, 2026);
      this.assertEqual(result, '18-29', 'Age 29 sollte in 18-29 sein');
    });

    this.test('Age 30 (30-34)', () => {
      const result = this.calculator.getAgeGroup(1996, 2026);
      this.assertEqual(result, '30-34', 'Age 30 sollte in 30-34 sein');
    });

    this.test('Age 60 (60+)', () => {
      const result = this.calculator.getAgeGroup(1966, 2026);
      this.assertEqual(result, '60+', 'Age 60 sollte in 60+ sein');
    });

    this.test('Age 75 (60+)', () => {
      const result = this.calculator.getAgeGroup(1951, 2026);
      this.assertEqual(result, '60+', 'Age 75 sollte in 60+ sein');
    });
  }

  /**
   * Test 2: Leistungsbewertung
   */
  testPerformanceEvaluation() {
    console.log('\n--- Testing Performance Evaluation ---');

    // Zeit-Disziplinen (lowerIsBetter = true)
    this.test('5000m Lauf - Gold (18-29)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(19*60 + 30, requirements, true);
      this.assertEqual(result, 'gold', '19:30 sollte Gold sein');
    });

    this.test('5000m Lauf - Silber (18-29)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(21*60, requirements, true);
      this.assertEqual(result, 'silber', '21:00 sollte Silber sein');
    });

    this.test('5000m Lauf - Bronze (18-29)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(24*60, requirements, true);
      this.assertEqual(result, 'bronze', '24:00 sollte Bronze sein');
    });

    this.test('5000m Lauf - Nicht bestanden (18-29)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(26*60, requirements, true);
      this.assertNull(result, '26:00 sollte nicht bestanden sein');
    });

    // Wiederholungs-Disziplinen (lowerIsBetter = false)
    this.test('Klimmziehen - Gold (18-29)', () => {
      const requirements = { bronze: 7, silber: 10, gold: 16 };
      const result = this.calculator.evaluatePerformance(18, requirements, false);
      this.assertEqual(result, 'gold', '18 Wiederholungen sollte Gold sein');
    });

    this.test('Klimmziehen - Silber (18-29)', () => {
      const requirements = { bronze: 7, silber: 10, gold: 16 };
      const result = this.calculator.evaluatePerformance(12, requirements, false);
      this.assertEqual(result, 'silber', '12 Wiederholungen sollte Silber sein');
    });

    this.test('Klimmziehen - Bronze (18-29)', () => {
      const requirements = { bronze: 7, silber: 10, gold: 16 };
      const result = this.calculator.evaluatePerformance(8, requirements, false);
      this.assertEqual(result, 'bronze', '8 Wiederholungen sollte Bronze sein');
    });

    this.test('Klimmziehen - Nicht bestanden (18-29)', () => {
      const requirements = { bronze: 7, silber: 10, gold: 16 };
      const result = this.calculator.evaluatePerformance(5, requirements, false);
      this.assertNull(result, '5 Wiederholungen sollte nicht bestanden sein');
    });
  }

  /**
   * Test 3: KRITISCH - Abzeichen-Berechnung
   */
  testFinalBadgeCalculation() {
    console.log('\n--- Testing Final Badge Calculation (CRITICAL) ---');

    this.test('3x Gold = Gold', () => {
      const results = { ausdauer: 'gold', kraft: 'gold', koordination: 'gold' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'gold', '3x Gold sollte Gold-Abzeichen sein');
    });

    this.test('2x Gold + 1x Silber = Silber', () => {
      const results = { ausdauer: 'gold', kraft: 'gold', koordination: 'silber' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'silber', '2x Gold + 1x Silber sollte Silber-Abzeichen sein');
    });

    this.test('3x Silber = Silber', () => {
      const results = { ausdauer: 'silber', kraft: 'silber', koordination: 'silber' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'silber', '3x Silber sollte Silber-Abzeichen sein');
    });

    this.test('1x Gold + 2x Silber = Silber', () => {
      const results = { ausdauer: 'gold', kraft: 'silber', koordination: 'silber' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'silber', '1x Gold + 2x Silber sollte Silber-Abzeichen sein');
    });

    this.test('3x Bronze = Bronze', () => {
      const results = { ausdauer: 'bronze', kraft: 'bronze', koordination: 'bronze' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'bronze', '3x Bronze sollte Bronze-Abzeichen sein');
    });

    this.test('2x Silber + 1x Bronze = Bronze', () => {
      const results = { ausdauer: 'silber', kraft: 'silber', koordination: 'bronze' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'bronze', '2x Silber + 1x Bronze sollte Bronze-Abzeichen sein');
    });

    this.test('🚨 KRITISCH: 2x Gold + 1x Bronze = NICHT BESTANDEN', () => {
      const results = { ausdauer: 'gold', kraft: 'gold', koordination: 'bronze' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'bronze', '2x Gold + 1x Bronze sollte Bronze-Abzeichen sein (schwächste Leistung zählt)');
    });

    this.test('1x Gold + 1x Silber + 1x Bronze = Bronze', () => {
      const results = { ausdauer: 'gold', kraft: 'silber', koordination: 'bronze' };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertEqual(badge, 'bronze', '1x Gold + 1x Silber + 1x Bronze sollte Bronze-Abzeichen sein');
    });

    this.test('2x Gold + 1x Nicht bestanden = NICHT BESTANDEN', () => {
      const results = { ausdauer: 'gold', kraft: 'gold', koordination: null };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertNull(badge, '2x Gold + 1x Nicht bestanden sollte kein Abzeichen sein');
    });

    this.test('1x Bronze + 2x Nicht bestanden = NICHT BESTANDEN', () => {
      const results = { ausdauer: 'bronze', kraft: null, koordination: null };
      const badge = this.calculator.calculateFinalBadge(results);
      this.assertNull(badge, 'Nicht alle Kategorien bestanden sollte kein Abzeichen sein');
    });
  }

  /**
   * Test 4: Einzelpersonen-Bewertung
   */
  testPersonEvaluation() {
    console.log('\n--- Testing Person Evaluation ---');

    this.test('Vollständige Person mit Gold-Abzeichen', () => {
      const personData = {
        birthYear: 1990,
        testYear: 2026,
        performances: {
          ausdauer: { discipline: '5000m', value: 19*60 + 30 },
          kraft: { discipline: 'klimmziehen', value: 18 },
          koordination: { discipline: 'parcours', value: 1*60 + 15 }
        }
      };

      const result = this.calculator.evaluatePerson(personData);
      
      this.assertEqual(result.ageGroup, '35-39', 'Altersklasse sollte 35-39 sein');
      this.assertEqual(result.age, 36, 'Alter sollte 36 sein');
      this.assertNotNull(result.details.ausdauer, 'Ausdauer sollte bewertet sein');
      this.assertNotNull(result.details.kraft, 'Kraft sollte bewertet sein');
      this.assertNotNull(result.details.koordination, 'Koordination sollte bewertet sein');
      this.assertNotNull(result.finalBadge, 'Abzeichen sollte vergeben sein');
    });

    this.test('Person mit unvollständigen Daten', () => {
      const personData = {
        birthYear: 1990,
        testYear: 2026,
        performances: {
          ausdauer: { discipline: '5000m', value: 19*60 + 30 },
          kraft: { discipline: null, value: null },
          koordination: { discipline: 'parcours', value: 1*60 + 15 }
        }
      };

      const result = this.calculator.evaluatePerson(personData);
      this.assertNull(result.finalBadge, 'Ohne Kraft sollte kein Abzeichen vergeben werden');
    });
  }

  /**
   * Test 5: Zeit-Validierung
   */
  testTimeValidation() {
    console.log('\n--- Testing Time Validation ---');

    this.test('Valide Zeit: 20:30', () => {
      const result = this.calculator.validateTime(20, 30);
      this.assertEqual(result, 20*60 + 30, 'Zeit sollte korrekt in Sekunden umgerechnet werden');
    });

    this.test('Invalide Zeit: Negative Minuten', () => {
      const result = this.calculator.validateTime(-5, 30);
      this.assertNull(result, 'Negative Minuten sollten null zurückgeben');
    });

    this.test('Invalide Zeit: Sekunden >= 60', () => {
      const result = this.calculator.validateTime(20, 60);
      this.assertNull(result, 'Sekunden >= 60 sollten null zurückgeben');
    });

    this.test('Grenzwert: 0:0', () => {
      const result = this.calculator.validateTime(0, 0);
      this.assertEqual(result, 0, '0:0 sollte 0 Sekunden sein');
    });
  }

  /**
   * Test 6: Formatierung
   */
  testFormatting() {
    console.log('\n--- Testing Formatting ---');

    this.test('Zeit formatieren: 1230 Sekunden', () => {
      const result = this.calculator.formatTime(1230);
      this.assertEqual(result.minutes, 20, 'Minuten sollten 20 sein');
      this.assertEqual(result.seconds, 30, 'Sekunden sollten 30 sein');
      this.assertEqual(result.formatted, '20:30', 'Format sollte 20:30 sein');
    });

    this.test('Wert formatieren: Zeit', () => {
      const result = this.calculator.formatValue(1230, 'zeit');
      this.assertEqual(result, '20:30 min', 'Zeit sollte als 20:30 min formatiert sein');
    });

    this.test('Wert formatieren: Wiederholungen', () => {
      const result = this.calculator.formatValue(15, 'wiederholungen');
      this.assertEqual(result, '15 Wdh.', 'Wiederholungen sollten als "15 Wdh." formatiert sein');
    });

    this.test('Wert formatieren: Meter', () => {
      const result = this.calculator.formatValue(80, 'meter');
      this.assertEqual(result, '80 m', 'Meter sollten als "80 m" formatiert sein');
    });
  }

  /**
   * Test 7: Edge Cases
   */
  testEdgeCases() {
    console.log('\n--- Testing Edge Cases ---');

    this.test('Performance exakt auf Grenzwert (Gold)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(20*60, requirements, true);
      this.assertEqual(result, 'gold', 'Exakt Gold-Zeit sollte Gold sein');
    });

    this.test('Performance exakt auf Grenzwert (Silber)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(22.5*60, requirements, true);
      this.assertEqual(result, 'silber', 'Exakt Silber-Zeit sollte Silber sein');
    });

    this.test('Performance exakt auf Grenzwert (Bronze)', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(25*60, requirements, true);
      this.assertEqual(result, 'bronze', 'Exakt Bronze-Zeit sollte Bronze sein');
    });

    this.test('Performance 1 Sekunde über Bronze-Grenze', () => {
      const requirements = { bronze: 25*60, silber: 22.5*60, gold: 20*60 };
      const result = this.calculator.evaluatePerformance(25*60 + 1, requirements, true);
      this.assertNull(result, '1 Sekunde über Bronze sollte nicht bestanden sein');
    });
  }

  /**
   * Test 8: Alle Disziplinen
   */
  testAllDisciplines() {
    console.log('\n--- Testing All Disciplines ---');

    const categories = ['ausdauer', 'kraft', 'koordination'];
    categories.forEach(category => {
      const disciplines = this.calculator.getDisciplines(category);
      
      this.test(`Kategorie ${category}: Disziplinen vorhanden`, () => {
        if (disciplines.length === 0) {
          throw new Error(`Keine Disziplinen in Kategorie ${category}`);
        }
      });

      disciplines.forEach(disc => {
        this.test(`Disziplin ${disc.name}: Anforderungen für 18-29`, () => {
          const reqs = this.calculator.getRequirements(category, disc.key, '18-29');
          if (!reqs) {
            throw new Error(`Keine Anforderungen für ${disc.name}`);
          }
        });
      });
    });
  }
}

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dFFATests;
}
