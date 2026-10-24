// SPDX-License-Identifier: Apache-2.0
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'site/figuras-pilar-dois.html'), 'utf8');
const pt = fs.readFileSync(path.join(root, 'sources/handbook-pilar-dois.md'), 'utf8');
const en = fs.readFileSync(path.join(root, 'docs/en/handbook-figures.md'), 'utf8');
const prompts = fs.readFileSync(path.join(root, 'prompts/diretrizes-handbook.md'), 'utf8');

test('galeria cobre as nove figuras citadas pelo Handbook', () => {
  for (const id of ['1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8','2.1']) {
    assert.ok(html.includes(`Figura ${id}`), `figura ${id} no site`);
    assert.ok(pt.includes(`${id} ·`), `figura ${id} na documentação PT`);
    assert.ok(en.includes(`${id} ·`), `figure ${id} in EN docs`);
  }
});

test('galeria oferece os dois idiomas, crédito, adaptação e fonte original', () => {
  assert.match(html, /Português \(Brasil\)/);
  assert.match(html, /English \(US\)/);
  assert.match(html, /Minimum Tax Implementation Handbook/);
  assert.match(html, /adaptação de uma obra original da OCDE/);
  assert.match(html, /official views of the OECD/);
  assert.match(html, /terms-conditions/);
  assert.match(html, /minimum-tax-implementation-handbook-pillar-two\.pdf/);
});

test('exemplo QDMTT distingue base excedente da base integral', () => {
  assert.match(html, /5% × 75 = 3,75/);
  assert.match(html, /5% × 100 = 5,00/);
  assert.match(prompts, /não chamar de aconselhamento/);
});

test('prompts e README apontam para as figuras e para as diretrizes', () => {
  for (const file of ['prompts/P01.txt','prompts/P02.txt','prompts/P03.txt','prompts/P05.txt','prompts/P11.txt']) {
    assert.match(fs.readFileSync(path.join(root,file),'utf8'), /S1|Handbook/);
  }
  assert.match(fs.readFileSync(path.join(root,'README.md'),'utf8'), /figuras bilíngues/);
  assert.match(fs.readFileSync(path.join(root,'site/apresentacao.html'),'utf8'), /figuras-pilar-dois\.html/);
});
