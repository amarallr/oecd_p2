// SPDX-License-Identifier: Apache-2.0
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const root = path.resolve(__dirname, '..');
const modulePromise = import(pathToFileURL(path.join(root, 'site/assets/js/demo.js')).href);
const cases = [
  ['T01 padrão', '100', '10', '20', 4, .10, .05, 80],
  ['T02 sem exclusão', '100', '10', '0', 5, .10, .05, 100],
  ['T03 alíquota mínima', '100', '15', '20', 0, .15, 0, 80],
  ['T04 acima da mínima', '100', '20', '20', 0, .20, 0, 80],
  ['T05 exclusão maior que renda', '100', '10', '120', 0, .10, .05, 0],
  ['T06 tributos zero', '100', '0', '20', 12, 0, .15, 80],
  ['decimais em português', '1,25', '0,10', '0,25', .07, .08, .07, 1]
];
for (const [label,income,taxes,exclusion,result,etr,rate,excess] of cases) test(label, async () => {
  const {calculateIllustration} = await modulePromise;
  const actual = calculateIllustration({income,taxes,exclusion});
  assert.equal(actual.valid, true);
  for (const [key,expected] of Object.entries({result,etr,rate,excess})) assert.ok(Math.abs(actual[key] - expected) < 1e-9, `${key}: ${actual[key]} != ${expected}`);
});
for (const invalid of [
  {income:'0'}, {income:'-1'}, {taxes:'-1'}, {exclusion:'-1'}, {income:''}, {taxes:' '}, {exclusion:'abc'},
  {income:'Infinity'}, {taxes:'NaN'}, {income:'1e3'}, {income:'1.000,00'}, {income:'1,000.00'}, {income:'0.001'}, {income:'1000000000'}
]) test(`rejeitar ${JSON.stringify(invalid)}`, async () => {
  const {calculateIllustration} = await modulePromise;
  const actual = calculateIllustration({income:'100',taxes:'10',exclusion:'20',...invalid});
  assert.equal(actual.valid, false); assert.equal(actual.result, null); assert.ok(Object.keys(actual.errors).length);
});
test('metadados coerentes com contratos e estágio real', () => {
  const project = JSON.parse(fs.readFileSync(path.join(root,'site/assets/data/project.json'),'utf8'));
  const html = fs.readFileSync(path.join(root,'site/index.html'),'utf8');
  assert.equal(project.example.manual_expected,'4');
  assert.equal(project.capabilities.fiscal_engine,'planned');
  assert.equal(project.capabilities.real_jurisdictions,'unsupported');
  assert.equal(project.minimum_rate,'0.15');
  assert.ok(html.includes('23/10/2026') && html.includes('FICT-A') && html.includes('Não calcula obrigação real'));
  assert.equal((html.match(/data-module-panel=/g)||[]).length,7);
  assert.equal((html.match(/data-step-panel=/g)||[]).length,7);
  assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/.test(html));
});
