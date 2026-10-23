// SPDX-License-Identifier: Apache-2.0
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const errors = [];
for (const file of ['oecd_p2.Rproj', '.gitignore', '.gitattributes', 'README.md', 'LICENSE', 'NOTICE', 'CONTRIBUTING.md', 'GOVERNANCE.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md', 'CHANGELOG.md', 'config.example.json']) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Arquivo ausente: ${file}`);
}
const project = fs.readFileSync(path.join(root, 'oecd_p2.Rproj'), 'utf8');
for (const line of ['RestoreWorkspace: No', 'SaveWorkspace: No', 'AlwaysSaveHistory: No', 'Encoding: UTF-8']) {
  if (!project.includes(line)) errors.push(`Configuração ausente: ${line}`);
}
const config = JSON.parse(fs.readFileSync(path.join(root, 'config.example.json'), 'utf8'));
if (config.preview.host !== '127.0.0.1' || config.real_taxpayer_data_allowed !== false) errors.push('Configuração de exemplo incompatível');
for (let i = 0; i < 12; i++) if (!fs.existsSync(path.join(root, 'prompts', `P${String(i).padStart(2, '0')}.txt`))) errors.push(`Prompt P${i} ausente`);
if (process.argv.includes('--web')) {
  for (const file of ['site/index.html', 'site/assets/css/styles.css', 'site/assets/js/app.js', 'site/assets/js/demo.js', 'site/assets/data/project.json']) {
    if (!fs.existsSync(path.join(root, file))) errors.push(`Arquivo web ausente: ${file}`);
  }
  const html = fs.readFileSync(path.join(root, 'site/index.html'), 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https?:|mailto:)/.test(target)) continue;
    if (target.startsWith('#')) { if (!html.includes(`id="${target.slice(1)}"`)) errors.push(`Âncora ausente: ${target}`); continue; }
    if (!fs.existsSync(path.resolve(root, 'site', target))) errors.push(`Recurso local ausente: ${target}`);
  }
  if (/https?:\/\//.test(fs.readFileSync(path.join(root, 'site/assets/css/styles.css'), 'utf8'))) errors.push('CSS com dependência externa');
}
const report = { phase: process.argv.includes('--web') ? 'F0-web' : 'F0', node: process.versions.node, errors, engine_implemented: false, dependencies: [] };
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
