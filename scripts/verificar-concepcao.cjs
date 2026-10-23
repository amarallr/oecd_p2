// Verifica artefatos de concepção; não é teste de motor ou navegador.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const files = walk(root);
const errors = [];
let localLinks = 0, jsonFiles = 0, jsonBlocks = 0;
for (const file of files) {
  const data = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) { JSON.parse(data); jsonFiles++; }
  if (!file.endsWith('.md')) continue;
  for (const m of data.matchAll(/\]\(([^)]+)\)/g)) {
    const target = m[1];
    if (/^(https?:|#)/.test(target)) continue;
    localLinks++;
    const p = path.resolve(path.dirname(file), target.split('#')[0]);
    if (!fs.existsSync(p)) errors.push(`Link ausente: ${path.relative(root,file)} -> ${target}`);
  }
  for (const m of data.matchAll(/```json\s*\n([\s\S]*?)```/g)) {
    try { JSON.parse(m[1]); jsonBlocks++; } catch (e) { errors.push(`JSON inválido em ${file}: ${e.message}`); }
  }
}
for (let i = 0; i <= 11; i++) {
  const id = `P${String(i).padStart(2,'0')}`;
  if (!fs.existsSync(path.join(root,'prompts',id+'.txt'))) errors.push('Prompt ausente: '+id);
  if (!files.some(p => path.relative(root,p).startsWith(`docs${path.sep}${id}-`) && p.endsWith('.md'))) errors.push('Entrega ausente: '+id);
}
const input = fs.readFileSync(path.resolve(root,'..','tmp','OECD_Pillar_2_Prompts_COSTAR_v0_3.txt'));
const copy = fs.readFileSync(path.join(root,'prompts','caderno-COSTAR-v0_3.txt'));
if (!input.equals(copy)) errors.push('Caderno original difere da cópia');
const digest = b => crypto.createHash('sha256').update(b).digest('hex');
const outputFiles = new Set(['docs/manifesto-concepcao.json','docs/verificacao-concepcao.json']);
const snapshot = files.filter(f => !outputFiles.has(path.relative(root,f).split(path.sep).join('/'))).map(file => ({
  path: path.relative(root,file).split(path.sep).join('/'),
  sha256: digest(fs.readFileSync(file))
})).sort((a,b) => a.path.localeCompare(b.path,'en'));
const report = {
  version: '0.1.0', normative_cutoff: '2026-10-23',
  scope: 'artifact_integrity_only',
  source_copy_identical: input.equals(copy),
  prompts: 12, delivery_documents: 12, local_links_checked: localLinks,
  json_files_parsed: jsonFiles, json_code_blocks_parsed: jsonBlocks,
  errors, engine_tests_executed: false, browser_tests_executed: false,
  git_commit: null, git_push_verified: false, publication_verified: false
};
fs.writeFileSync(path.join(root,'docs','manifesto-concepcao.json'),JSON.stringify({version:'0.1.0',input_sha256:digest(input),files:snapshot},null,2)+'\n');
fs.writeFileSync(path.join(root,'docs','verificacao-concepcao.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if (errors.length) process.exitCode = 1;
