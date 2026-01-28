const dFFAData = require('../data/dffa-data');
const dFFACalculator = require('./calculator');
const dFFATests = require('./tests');

const calc = new dFFACalculator(dFFAData);
const tests = new dFFATests(calc);

const ok = tests.runAll();
process.exit(ok ? 0 : 1);
