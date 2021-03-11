const { jsonSizeAnalysis } = require('./core');
const sample = require('../samples/bigSample1.json');

console.log('start');
console.log(JSON.stringify(jsonSizeAnalysis(sample), null, 2));
console.log('end');