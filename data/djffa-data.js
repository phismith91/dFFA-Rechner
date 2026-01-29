/**
 * Leistungsdaten für das Deutsche Jugendfeuerwehr-Fitnessabzeichen (dJFFA)
 * Quelle: Deutsche Feuerwehr-Sportföderation e.V.
 * Stand: 2019
 */

const dJFFAData = {
  name: 'dJFFA',
  fullName: 'Deutsches Jugendfeuerwehr-Fitnessabzeichen',
  minAge: 10,
  maxAge: 17,

  altersklassen: {
    '10-11': { min: 10, max: 11 },
    '12-13': { min: 12, max: 13 },
    '14-15': { min: 14, max: 15 },
    '16-17': { min: 16, max: 17 }
  },

  leistungstabellen: {
    ausdauer: {
      '12minlauf': {
        name: '12 Minuten Lauf',
        einheit: 'meter',
        lowerIsBetter: false,
        beschreibung: 'Der 12 Minuten Lauf wird auf einer 400 m Laufbahn durchgeführt. Der Bewerber läuft 12 Minuten und bleibt nach Ablauf der Zeit stehen. Die zurückgelegte Strecke wird gewertet.',
        anforderungen: {
          '10-11': { bronze: 1600, silber: 1800, gold: 2200 },
          '12-13': { bronze: 1800, silber: 2000, gold: 2400 },
          '14-15': { bronze: 2000, silber: 2200, gold: 2600 },
          '16-17': { bronze: 2200, silber: 2600, gold: 3000 }
        }
      },
      '200mschwimmen': {
        name: '200 m Schwimmen',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Beim 200 m Schwimmen ist der Schwimmstil nicht vorgeschrieben und kann gewechselt werden. Die Strecke ist ohne Unterbrechung zu bewältigen. Bei der Wende muss der Beckenrand mit einem Körperteil berührt werden. Hilfsmittel sind nicht gestattet.',
        anforderungen: {
          '10-11': { bronze: 450, silber: 380, gold: 305 } // 7:30, 6:20, 5:05 in Sekunden
        }
      },
      '500mschwimmen': {
        name: '500 m Schwimmen',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Beim 500 m Schwimmen ist der Schwimmstil nicht vorgeschrieben und kann gewechselt werden. Die Strecke ist ohne Unterbrechung zu bewältigen. Bei der Wende muss der Beckenrand mit einem Körperteil berührt werden. Hilfsmittel sind nicht gestattet.',
        anforderungen: {
          '12-13': { bronze: 990, silber: 840, gold: 750 },  // 16:30, 14:00, 12:30
          '14-15': { bronze: 930, silber: 780, gold: 690 },  // 15:30, 13:00, 11:30
          '16-17': { bronze: 870, silber: 720, gold: 630 }   // 14:30, 12:00, 10:30
        }
      },
      '3000mlauf': {
        name: '3 000 m Lauf',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Der 3 000 m Lauf wird auf einer geeigneten, flachen und vermessenen Strecke durchgeführt. Die Laufstrecke darf nicht verlassen werden. Die Leistungsanforderungen können auf einem Laufband mit einprozentiger Steigung erbracht werden.',
        anforderungen: {
          '14-15': { bronze: 960, silber: 870, gold: 780 },  // 16:00, 14:30, 13:00
          '16-17': { bronze: 900, silber: 810, gold: 720 }   // 15:00, 13:30, 12:00
        }
      }
    },

    kraft: {
      'liegestuetze': {
        name: 'Liegestütze',
        einheit: 'wiederholungen',
        lowerIsBetter: false,
        beschreibung: 'Der Bewerber nimmt eine Liegestützhaltung vorlings mit gestreckten Armen ein. Die Hände sind dabei auf Höhe der Schultergelenke auf dem Boden aufgestützt. Die Körperhaltung ist gestreckt bei geschlossenen Beinen. Der Bewerber beugt bei gestreckter Körperhaltung die Arme, bis der Ellbogenwinkel 90° beträgt. Anschließend streckt der Bewerber bei gestreckter Körperhaltung die Arme, bis der Ellbogenwinkel 180° beträgt.',
        anforderungen: {
          '10-11': { bronze: 5, silber: 10, gold: 15 },
          '12-13': { bronze: 10, silber: 15, gold: 20 },
          '14-15': { bronze: 15, silber: 20, gold: 30 },
          '16-17': { bronze: 20, silber: 25, gold: 35 }
        }
      },
      'klimmziehen': {
        name: 'Klimmziehen',
        einheit: 'wiederholungen',
        lowerIsBetter: false,
        beschreibung: 'Die Übung beginnt aus dem freien Hang mit gestreckten Armen. Es kann wahlweise der Kamm- oder Ristgriff verwendet bzw. zwischen beiden gewechselt werden. Durch Beugen der Arme ist der Körper nach oben zu ziehen, bis das Kinn über die Stange reicht. Ohne komplette Streckung der Arme zwischen den Wiederholungen erfolgt keine Zählung.',
        anforderungen: {
          '10-11': { bronze: 3, silber: 6, gold: 12 },
          '12-13': { bronze: 4, silber: 7, gold: 13 },
          '14-15': { bronze: 5, silber: 8, gold: 14 },
          '16-17': { bronze: 6, silber: 9, gold: 15 }
        }
      },
      'beugehang': {
        name: 'Beugehang',
        einheit: 'sekunden',
        lowerIsBetter: false,
        beschreibung: 'Ausgangsposition: Es wird schulterbreit im Kammgriff an der Klimmzugstange gegriffen, sodass sich das Kinn bei ruhiger Körperhaltung oberhalb der Stange befindet. Die Zeitmessung beginnt mit Erreichen der Ausgangsposition und endet, wenn sich das Kinn nicht mehr oberhalb der Stange befindet.',
        anforderungen: {
          '10-11': { bronze: 10, silber: 20, gold: 30 },
          '12-13': { bronze: 20, silber: 30, gold: 40 },
          '14-15': { bronze: 30, silber: 40, gold: 50 },
          '16-17': { bronze: 40, silber: 50, gold: 60 }
        }
      }
    },

    koordination: {
      'parcours': {
        name: 'Parcours',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Komplexer Hindernisparcours mit Slalom, Kastenüberwindung, Rollen, Kriechen, Schwebebalken und Medizinballtransport. Detaillierte Beschreibung siehe Broschüre.',
        anforderungen: {
          '10-11': { bronze: 130, silber: 115, gold: 100 },  // 2:10, 1:55, 1:40
          '12-13': { bronze: 125, silber: 110, gold: 95 },   // 2:05, 1:50, 1:35
          '14-15': { bronze: 120, silber: 105, gold: 90 },   // 2:00, 1:45, 1:30
          '16-17': { bronze: 115, silber: 100, gold: 85 }    // 1:55, 1:40, 1:25
        }
      },
      'kastenbumerang': {
        name: 'Kasten-Bumerang-Test',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Der Bewerber startet vor der Matte mit einer Rolle vorwärts, läuft um den Markierungskegel, überspringt ein Kastenteil, durchkriecht es, balanciert über eine Langbank und überwinden einen Kasten (1,10 m). Dies wird dreimal wiederholt.',
        anforderungen: {
          '10-11': { bronze: 95, silber: 85, gold: 75 },   // 1:35, 1:25, 1:15
          '12-13': { bronze: 90, silber: 80, gold: 70 },   // 1:30, 1:20, 1:10
          '14-15': { bronze: 85, silber: 75, gold: 65 },   // 1:25, 1:15, 1:05
          '16-17': { bronze: 80, silber: 70, gold: 60 }    // 1:20, 1:10, 1:00
        }
      }
    }
  },

  // Kategorien-Definitionen
  kategorien: {
    ausdauer: {
      name: 'Ausdauer',
      icon: '⚡',
      beschreibung: 'Messung der aeroben Ausdauerleistung'
    },
    kraft: {
      name: 'Kraft',
      icon: '💪',
      beschreibung: 'Messung der Kraftausdauer und maximalen Kraftfähigkeit'
    },
    koordination: {
      name: 'Koordination',
      icon: '🎯',
      beschreibung: 'Messung der koordinativen Fähigkeiten und Geschicklichkeit'
    }
  }
};

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dJFFAData;
}
