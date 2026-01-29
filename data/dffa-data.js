/**
 * Datenstruktur für das Deutsche Feuerwehr-Fitnessabzeichen (dFFA)
 * Quelle: Deutsche Feuerwehr-Sportföderation e.V. (DFS)
 */

const dFFAData = {
  // Metadaten
  name: 'dFFA',
  fullName: 'Deutsches Feuerwehr-Fitnessabzeichen',
  minAge: 18,
  maxAge: null,

  // Altersklassen-Definitionen
  altersklassen: {
    '18-29': { min: 18, max: 29 },
    '30-34': { min: 30, max: 34 },
    '35-39': { min: 35, max: 39 },
    '40-44': { min: 40, max: 44 },
    '45-49': { min: 45, max: 49 },
    '50-54': { min: 50, max: 54 },
    '55-59': { min: 55, max: 59 },
    '60+': { min: 60, max: null }
  },

  // Leistungstabellen nach Altersklassen und Disziplinen
  leistungstabellen: {
    ausdauer: {
      '5000m': {
        name: '5000m Lauf',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die Leistung kann über eine Distanz von 5000m erbracht werden. Der Lauf wird auf einer geeigneten und vermessenen Strecke durchgeführt. Die Laufstrecke darf nicht verlassen werden. Die Leistungsanforderungen können auf einem Laufband mit einprozentiger Steigung erbracht werden.',
        anforderungen: {
          '18-29': { bronze: 25*60, silber: 22.5*60, gold: 20*60 },
          '30-34': { bronze: 26.5*60, silber: 24*60, gold: 21.5*60 },
          '35-39': { bronze: 28*60, silber: 25.5*60, gold: 23*60 },
          '40-44': { bronze: 29.5*60, silber: 27*60, gold: 24.5*60 },
          '45-49': { bronze: 31*60, silber: 28.5*60, gold: 26*60 },
          '50-54': { bronze: 32.5*60, silber: 30*60, gold: 27.5*60 },
          '55-59': { bronze: 34*60, silber: 31.5*60, gold: 29*60 },
          '60+': { bronze: 35.5*60, silber: 33*60, gold: 30.5*60 }
        }
      },
      'firefighterRun': {
        name: 'Firefighter Run',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Wird der 5000m Lauf in Feuerwehrschutzbekleidung mit Helm, Handschuhen, Atemschutzgerät (ohne Maske, ohne Haltegurt) mit Laufschuhen durchgeführt, erhält jede Altersklasse einen Zeitzuschlag von 2:30 Minuten.',
        anforderungen: {
          '18-29': { bronze: 27.5*60, silber: 25*60, gold: 22.5*60 },
          '30-34': { bronze: 29*60, silber: 26.5*60, gold: 24*60 },
          '35-39': { bronze: 30.5*60, silber: 28*60, gold: 25.5*60 },
          '40-44': { bronze: 32*60, silber: 29.5*60, gold: 27*60 },
          '45-49': { bronze: 33.5*60, silber: 31*60, gold: 28.5*60 },
          '50-54': { bronze: 35*60, silber: 32.5*60, gold: 30*60 },
          '55-59': { bronze: 36.5*60, silber: 34*60, gold: 31.5*60 },
          '60+': { bronze: 38*60, silber: 35.5*60, gold: 33*60 }
        }
      },
      '10000m': {
        name: '10000m Lauf',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die Leistung kann über eine Distanz von 10000m erbracht werden. Der Lauf wird auf einer geeigneten und vermessenen Strecke durchgeführt. Die Laufstrecke darf nicht verlassen werden. Die Leistungsanforderungen können auf einem Laufband mit einprozentiger Steigung erbracht werden.',
        anforderungen: {
          '18-29': { bronze: 51.5*60, silber: 46.5*60, gold: 41.5*60 },
          '30-34': { bronze: 54.5*60, silber: 49.5*60, gold: 44.5*60 },
          '35-39': { bronze: 57.5*60, silber: 52.5*60, gold: 47.5*60 },
          '40-44': { bronze: 60.5*60, silber: 55.5*60, gold: 50.5*60 },
          '45-49': { bronze: 63.5*60, silber: 58.5*60, gold: 53.5*60 },
          '50-54': { bronze: 66.5*60, silber: 61.5*60, gold: 56.5*60 },
          '55-59': { bronze: 69.5*60, silber: 64.5*60, gold: 59.5*60 },
          '60+': { bronze: 72.5*60, silber: 67.5*60, gold: 62.5*60 }
        }
      },
      'halbmarathon': {
        name: 'Halbmarathon',
        einheit: 'distanz',
        lowerIsBetter: false,
        beschreibung: 'Die erfolgreiche Teilnahme an einem Halbmarathon (21,1 km) wird für alle Altersklassen im Bereich Ausdauer als Stufe Silber anerkannt.',
        anforderungen: {
          'alle': { silber: 21.1 }
        }
      },
      'marathon': {
        name: 'Marathon',
        einheit: 'distanz',
        lowerIsBetter: false,
        beschreibung: 'Die erfolgreiche Teilnahme an einem Marathon (42,2 km) wird für alle Altersklassen im Bereich Ausdauer als Stufe Gold anerkannt.',
        anforderungen: {
          'alle': { gold: 42.2 }
        }
      },
      'triathlon': {
        name: 'Triathlon',
        einheit: 'distanz',
        lowerIsBetter: false,
        beschreibung: 'Die erfolgreiche Teilnahme an einem Triathlon wird für alle Altersklassen anerkannt, wenn er mindestens über folgende Strecken [Schwimmen, Radfahren, Laufen] durchgeführt wird:\n\nBronze: 0,5 km Schwimmen, 20 km Radfahren, 5 km Laufen (Kurzdistanz)\nSilber: 1,5 km Schwimmen, 40 km Radfahren, 10 km Laufen (Mitteldistanz)\nGold: 2,0 km Schwimmen, 80 km Radfahren, 20 km Laufen (Langdistanz)',
        anforderungen: {
          'alle': { 
            bronze: '0,5|20|5',
            silber: '1,5|40|10', 
            gold: '2|80|20' 
          }
        }
      },
      '1000mSchwimmen': {
        name: '1000m Schwimmen',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die Distanz beträgt 1000m. Hierbei ist der Schwimmstil nicht vorgeschrieben und kann gewechselt werden. Die Strecke ist ohne Unterbrechung zu bewältigen. Bei der Wende muss der Beckenrand mit einem Körperteil berührt werden. Hilfsmittel sind nicht gestattet. Im Freigewässer ist ein Neoprenanzug zulässig. Bei Abnahmen sowie beim Training hat stets ein Rettungsschwimmer anwesend zu sein.',
        anforderungen: {
          '18-29': { bronze: 26*60, silber: 23*60, gold: 20*60 },
          '30-34': { bronze: 27*60, silber: 24*60, gold: 21*60 },
          '35-39': { bronze: 28*60, silber: 25*60, gold: 22*60 },
          '40-44': { bronze: 29*60, silber: 26*60, gold: 23*60 },
          '45-49': { bronze: 30*60, silber: 27*60, gold: 24*60 },
          '50-54': { bronze: 31*60, silber: 28*60, gold: 25*60 },
          '55-59': { bronze: 32*60, silber: 29*60, gold: 26*60 },
          '60+': { bronze: 33*60, silber: 30*60, gold: 27*60 }
        }
      },
      '20kmRad': {
        name: '20km Radfahren',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die Distanz beträgt 20 km und ist auf einer vermessenen und möglichst ebenen Strecke durchzuführen. Es kann jedes Fahrradmodell ohne Fremdantrieb genutzt werden. Es besteht Helmpflicht. Der Leistungsnachweis kann nicht auf einem Fahrradergometer erbracht werden.',
        anforderungen: {
          '18-29': { bronze: 45*60, silber: 39*60, gold: 34*60 },
          '30-34': { bronze: 47*60, silber: 41*60, gold: 36*60 },
          '35-39': { bronze: 49*60, silber: 43*60, gold: 38*60 },
          '40-44': { bronze: 51*60, silber: 45*60, gold: 40*60 },
          '45-49': { bronze: 53*60, silber: 47*60, gold: 42*60 },
          '50-54': { bronze: 55*60, silber: 49*60, gold: 44*60 },
          '55-59': { bronze: 57*60, silber: 51*60, gold: 46*60 },
          '60+': { bronze: 59*60, silber: 53*60, gold: 48*60 }
        }
      },
      'radmarathon': {
        name: 'Radmarathon',
        einheit: 'distanz',
        lowerIsBetter: false,
        beschreibung: 'Die erfolgreiche Teilnahme an einem Radmarathon wird abhängig von der Strecke für alle Altersklassen im Bereich Ausdauer anerkannt:\n\nBronze: ≥ 130 km\nSilber: ≥ 165 km\nGold: ≥ 200 km',
        anforderungen: {
          'alle': { bronze: 130, silber: 165, gold: 200 }
        }
      }
    },
    kraft: {
      'bankdruecken': {
        name: '40kg Bankdrücken',
        einheit: 'wiederholungen',
        lowerIsBetter: false,
        beschreibung: 'Das Hantelgewicht beträgt einheitlich 40 kg. In Rückenlage auf einer Bank liegend fasst der Bewerber die Hantel beidhändig und fixiert sie auf den gestreckten Armen. Die Füße sollten erhöht aufgestellt oder über dem Körper gehalten werden. Die Übung beginnt mit dem Beugen der Arme bis die Hantel die Brust berührt. Anschließend wird die Hantel bis zur völligen Streckung der Arme nach oben gedrückt. Hilfsmittel sind nicht zulässig. Der Bewerber ist zu sichern.',
        anforderungen: {
          '18-29': { bronze: 15, silber: 30, gold: 50 },
          '30-34': { bronze: 14, silber: 28, gold: 47 },
          '35-39': { bronze: 13, silber: 26, gold: 44 },
          '40-44': { bronze: 12, silber: 24, gold: 41 },
          '45-49': { bronze: 11, silber: 22, gold: 38 },
          '50-54': { bronze: 10, silber: 20, gold: 35 },
          '55-59': { bronze: 9, silber: 18, gold: 32 },
          '60+': { bronze: 8, silber: 16, gold: 29 }
        }
      },
      'klimmziehen': {
        name: 'Klimmziehen',
        einheit: 'wiederholungen',
        lowerIsBetter: false,
        beschreibung: 'Die Übung beginnt aus dem freien Hang mit gestreckten Armen. Es kann wahlweise der Kamm- oder Ristgriff verwendet bzw. zwischen beiden gewechselt werden. Durch Beugen der Arme ist der Körper nach oben zu ziehen bis das Kinn über die Stange reicht. Ohne komplette Streckung der Arme zwischen den Wiederholungen erfolgt keine Zählung. Hilfsmittel sind nicht zulässig.',
        anforderungen: {
          '18-29': { bronze: 7, silber: 10, gold: 16 },
          '30-34': { bronze: 6, silber: 9, gold: 15 },
          '35-39': { bronze: 5, silber: 8, gold: 14 },
          '40-44': { bronze: 4, silber: 7, gold: 13 },
          '45-49': { bronze: 3, silber: 6, gold: 12 },
          '50-54': { bronze: 2, silber: 5, gold: 11 },
          '55-59': { bronze: 2, silber: 4, gold: 10 },
          '60+': { bronze: 2, silber: 3, gold: 9 }
        }
      },
      'beugehang': {
        name: 'Beugehang',
        einheit: 'sekunden',
        lowerIsBetter: false,
        beschreibung: 'Ausgangsposition: Es wird schulterbreit im Kammgriff (Handinnenflächen zeigen zum Gesicht und Daumen nach außen) an der Klimmzugstange gegriffen, so dass sich das Kinn bei ruhiger Körperhaltung oberhalb der Stange befindet. Um eine freihängende Klimmzugbewegung zu vermeiden, wird eine Aufstiegshilfe seitlich zur Verfügung gestellt. Die Zeitmessung beginnt mit Erreichen der Ausgangsposition und endet, wenn sich das Kinn nicht mehr oberhalb der Stange befindet. Die ruhige Körperhaltung ist während des Haltens beizubehalten.',
        anforderungen: {
          '18-29': { bronze: 45, silber: 60, gold: 75 },
          '30-34': { bronze: 42, silber: 56, gold: 70 },
          '35-39': { bronze: 39, silber: 52, gold: 65 },
          '40-44': { bronze: 36, silber: 48, gold: 60 },
          '45-49': { bronze: 33, silber: 44, gold: 55 },
          '50-54': { bronze: 30, silber: 40, gold: 50 },
          '55-59': { bronze: 27, silber: 36, gold: 45 },
          '60+': { bronze: 24, silber: 32, gold: 40 }
        }
      },
      'dummyziehen': {
        name: 'Dummyziehen',
        einheit: 'sekunden',
        lowerIsBetter: true,
        beschreibung: 'Eine Strecke von elf Metern wird auf einem ebenen Untergrund durch zwei Wendemarkierungen (Hütchen oder Wendestangen) festgelegt. Mit einem mindestens 75 kg schweren Dummy soll eine Gesamtstrecke von 66 m rückwärtslaufend zurückgelegt werden, indem die Wendemarkierungen dreimal in Form einer Acht umlaufen werden. Der Bewerber postiert sich zum Start mit geradem Rücken und angehobenem Dummy rücklings zur Laufrichtung an der Start-/Ziellinie. Der Oberkörper des Dummys berührt dabei nicht mehr den Boden. Folgende Varianten können zum Einsatz kommen: Dummy mit Schulterriemen, Dummy mit Nutzung einer Bandschlinge, Alternativgeräte (z.B. Baumstamm mit Griffmöglichkeit).',
        anforderungen: {
          '18-29': { bronze: 60, silber: 50, gold: 40 },
          '30-34': { bronze: 63, silber: 53, gold: 43 },
          '35-39': { bronze: 66, silber: 56, gold: 46 },
          '40-44': { bronze: 69, silber: 59, gold: 49 },
          '45-49': { bronze: 72, silber: 62, gold: 52 },
          '50-54': { bronze: 75, silber: 65, gold: 55 },
          '55-59': { bronze: 78, silber: 68, gold: 58 },
          '60+': { bronze: 81, silber: 71, gold: 61 }
        }
      },
      'endlosleiter': {
        name: 'Endlosleiter',
        einheit: 'meter',
        lowerIsBetter: false,
        beschreibung: 'Für die Übung können alle Modelle von Endlosleitern verwendet werden. Die Übung wird bei mittlerer Steiggeschwindigkeit (ca. 0,35 m/sec) durchgeführt. Der Bewerber steigt in kompletter Feuerwehrschutzbekleidung mit Helm, Handschuhen, Stiefeln, Atemschutzgerät (ohne Maske, ohne Haltegurt). Als anrechenbare Leistung wird die erreichte Steighöhe gewertet, die der Bewerber bis zum Ende der Übung erreicht hat. Die Übung ist beendet, wenn der Bewerber abbricht, die voreingestellte Steighöhe erreicht ist oder die Leiter durch eine Sicherheitseinrichtung (z.B. Lichtschranke) zum Stillstand kommt.',
        anforderungen: {
          '18-29': { bronze: 60, silber: 80, gold: 99 },
          '30-34': { bronze: 60, silber: 80, gold: 99 },
          '35-39': { bronze: 40, silber: 60, gold: 80 },
          '40-44': { bronze: 40, silber: 60, gold: 80 },
          '45-49': { bronze: 30, silber: 40, gold: 60 },
          '50-54': { bronze: 30, silber: 40, gold: 60 },
          '55-59': { bronze: 20, silber: 30, gold: 40 },
          '60+': { bronze: 20, silber: 30, gold: 40 }
        }
      },
      'tfa': {
        name: 'Toughest Firefighter Alive',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die erbrachte Leistung beim Toughest Firefighter Alive wird in Abhängigkeit von der Gesamtzeit anerkannt, wenn an mindestens drei der vier Stationen die vorgegebene Zeit eingehalten wurde. Informationen zum Wettbewerb: www.tfa-germany.de/de/regelwerk-stationen',
        anforderungen: {
          '18-29': { bronze: 16*60, silber: 12*60, gold: 8*60 },
          '30-34': { bronze: 16*60+10, silber: 12*60+10, gold: 8*60+10 },
          '35-39': { bronze: 16*60+20, silber: 12*60+20, gold: 8*60+20 },
          '40-44': { bronze: 16*60+30, silber: 12*60+30, gold: 8*60+30 },
          '45-49': { bronze: 16*60+40, silber: 12*60+40, gold: 8*60+40 },
          '50-54': { bronze: 16*60+50, silber: 12*60+50, gold: 8*60+50 },
          '55-59': { bronze: 17*60, silber: 13*60, gold: 9*60 },
          '60+': { bronze: 17*60+10, silber: 13*60+10, gold: 9*60+10 }
        }
      },
      'combat': {
        name: 'Firefighter Combat Challenge',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die erfolgreiche Teilnahme an der Firefighter Combat Challenge kann im Bereich Kraft anerkannt werden. Regelwerk: www.firefighter-challenge-germany.de/de/challenge/regeln.html',
        anforderungen: {
          '18-29': { bronze: 4*60, silber: 3*60, gold: 2*60 },
          '30-34': { bronze: 4*60+5, silber: 3*60+5, gold: 2*60+5 },
          '35-39': { bronze: 4*60+10, silber: 3*60+10, gold: 2*60+10 },
          '40-44': { bronze: 4*60+15, silber: 3*60+15, gold: 2*60+15 },
          '45-49': { bronze: 4*60+20, silber: 3*60+20, gold: 2*60+20 },
          '50-54': { bronze: 4*60+25, silber: 3*60+25, gold: 2*60+25 },
          '55-59': { bronze: 4*60+30, silber: 3*60+30, gold: 2*60+30 },
          '60+': { bronze: 4*60+35, silber: 3*60+35, gold: 2*60+35 }
        }
      }
    },
    koordination: {
      'parcours': {
        name: 'Parcours',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Der Bewerber startet von der Startlinie aus, durchläuft nach 3m die Slalomstrecke (4 hohe Stangen im Abstand von jeweils 1,80m) und biegt nach rechts ab. Er überwindet das Kastenhindernis (Höhe: 1,10m, Pferd möglich) beliebig und absolviert auf den hintereinander liegenden Matten eine Rolle vorwärts, eine halbe Drehung und eine Rolle rückwärts. Judorollen sind möglich. Danach durchkriecht er das Hindernis (lichte Höhe: max. 0,50m) und biegt nach rechts ab, durchläuft ein zweites Mal die Slalomstrecke und steigt über den Kasten (Höhe: 0,40m) auf den Schwebebalken (Höhe: 0,90m). Er überläuft den Balken (Medizinball in der Mitte muss liegenbleiben) und nimmt am Ende ein 5kg-Gewicht (z.B. Sandsack) auf. Dieses bringt er in einer Hand zum Balkenanfang, macht eine halbe Drehung und transportiert es in der anderen Hand zurück und legt es ab. Auf dem Balken geht er zurück und steigt über den Kasten ab. Kein Springen. Er läuft weiter zum mit drei Medizinbällen (je 5kg) gefüllten Kastenteil 1. Die Bälle bringt er einzeln zum Kastenteil 2 und legt sie dort ab. Anschließend bringt er die Bälle wiederum einzeln zum Kastenteil 3 und von dort abschließend einzeln direkt zurück zum Kastenteil 1.',
        anforderungen: {
          '18-29': { bronze: 1*60+50, silber: 1*60+35, gold: 1*60+20 },
          '30-34': { bronze: 1*60+55, silber: 1*60+40, gold: 1*60+25 },
          '35-39': { bronze: 2*60, silber: 1*60+45, gold: 1*60+30 },
          '40-44': { bronze: 2*60+5, silber: 1*60+50, gold: 1*60+35 },
          '45-49': { bronze: 2*60+10, silber: 1*60+55, gold: 1*60+40 },
          '50-54': { bronze: 2*60+15, silber: 2*60, gold: 1*60+45 },
          '55-59': { bronze: 2*60+20, silber: 2*60+5, gold: 1*60+50 },
          '60+': { bronze: 2*60+25, silber: 2*60+10, gold: 1*60+55 }
        }
      },
      'kombiSchwimmen': {
        name: '200m Kombi-Schwimmen',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Die Schwimmstrecke beträgt 200m und ist in folgendem Ablauf zu absolvieren: Nach einem Startsprung vom Startblock folgt eine Tauchphase mindestens bis zur 15m-Marke. Dann ist übergangslos bis zur 100m-Marke im Freistil und weiter bis zur 150m-Marke in Rückenlage ohne Armtätigkeit (z.B. Arme gekreuzt auf dem Brustkorb) zu schwimmen. Die abschließenden 50m bis zur 200m-Marke sind im Brustschwimmen zu absolvieren. Die Strecke ist ohne Unterbrechung zu bewältigen. Bei der Wende muss der Beckenrand mit mindestens einem Körperteil berührt werden. Hilfsmittel sind nicht gestattet. Bei Abnahmen sowie beim Training hat stets ein Rettungsschwimmer anwesend zu sein.',
        anforderungen: {
          '18-29': { bronze: 5*60, silber: 4*60+15, gold: 3*60+30 },
          '30-34': { bronze: 5*60+15, silber: 4*60+30, gold: 3*60+45 },
          '35-39': { bronze: 5*60+30, silber: 4*60+45, gold: 4*60 },
          '40-44': { bronze: 5*60+45, silber: 5*60, gold: 4*60+15 },
          '45-49': { bronze: 6*60, silber: 5*60+15, gold: 4*60+30 },
          '50-54': { bronze: 6*60+15, silber: 5*60+30, gold: 4*60+45 },
          '55-59': { bronze: 6*60+30, silber: 5*60+45, gold: 5*60 },
          '60+': { bronze: 6*60+45, silber: 6*60, gold: 5*60+15 }
        }
      },
      'kastenBumerang': {
        name: 'Kasten-Bumerang-Test',
        einheit: 'zeit',
        lowerIsBetter: true,
        beschreibung: 'Der Bewerber startet vor der Matte auf Signal des Prüfers mit einer Rolle vorwärts, läuft um den Markierungskegel nach rechts, überspringt ein querliegendes Kastenteil und durchkriecht dieses auf dem Weg zurück zum Markierungskegel. Dieser wird wieder nach rechts umlaufen und der Bewerber balanciert, von links durch eine markierte Gasse kommend, über eine umgedrehte Langbank, die auf einem Kastenoberteil endet. Nach Passieren des Hütchentores geht es wieder zum Markierungskegel, der wiederum nach rechts umlaufen wird, Richtung Kasten (Höhe: 1,10m). Das Gerät muss überwunden werden. Weiter geht es zurück um den Markierungskegel nach rechts zur Matte. Nach kurzem Anschlagen an der Matte wird ein zweiter, dann ein dritter Durchgang durchgeführt, der mit dem Anschlagen an der Matte endet. Die Zeit wird vom Startsignal bis zum letzten Anschlagen an der Matte gestoppt. Alle Geräte sind um ein Quadrat mit einer Seitenlänge von 10m aufgebaut.',
        anforderungen: {
          '18-29': { bronze: 1*60+15, silber: 1*60+5, gold: 55 },
          '30-34': { bronze: 1*60+20, silber: 1*60+10, gold: 60 },
          '35-39': { bronze: 1*60+25, silber: 1*60+15, gold: 1*60+5 },
          '40-44': { bronze: 1*60+30, silber: 1*60+20, gold: 1*60+10 },
          '45-49': { bronze: 1*60+35, silber: 1*60+25, gold: 1*60+15 },
          '50-54': { bronze: 1*60+40, silber: 1*60+30, gold: 1*60+20 },
          '55-59': { bronze: 1*60+45, silber: 1*60+35, gold: 1*60+25 },
          '60+': { bronze: 1*60+50, silber: 1*60+40, gold: 1*60+30 }
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
  module.exports = dFFAData;
}