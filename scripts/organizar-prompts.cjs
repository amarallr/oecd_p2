// Organiza o caderno fornecido; não implementa bootstrap, motor ou site.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const source = path.resolve(root, '..', 'tmp', 'OECD_Pillar_2_Prompts_COSTAR_v0_3.txt');
const bytes = fs.readFileSync(source);
const content = bytes.toString('utf8').replace(/^\uFEFF/, '');
const separator = '='.repeat(68);
const heading = new RegExp('^' + separator + '\\r?\\n(P\\d{2}) — ([^\\r\\n]+)\\r?\\n' + separator + '\\r?\\n', 'gm');
const matches = [...content.matchAll(heading)];
if (matches.length !== 12) throw new Error(`Esperados 12 prompts; localizados ${matches.length}`);
const finalBoundary = content.indexOf('\n4. ESTRUTURA INICIAL SUGERIDA');
if (finalBoundary < 0) throw new Error('Fim do caderno não localizado');
function preserve(file, text) {
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') !== text) {
    throw new Error(`Arquivo existente diferente: ${path.basename(file)}`);
  }
  fs.writeFileSync(file, text, 'utf8');
}
const dest = path.join(root, 'prompts');
preserve(path.join(dest, 'caderno-COSTAR-v0_3.txt'), bytes.toString('utf8'));
for (let i = 0; i < matches.length; i++) {
  const end = i + 1 < matches.length ? matches[i + 1].index : finalBoundary;
  preserve(path.join(dest, matches[i][1] + '.txt'), content.slice(matches[i].index, end).trimEnd() + '\n');
}
const orderedMatches = [...matches].sort((a, b) => Number(a[1].slice(1)) - Number(b[1].slice(1)));
const index = '# Prompts originais em ordem numérica\n\n' +
  'Fonte: caderno CO-STAR v0.3 fornecido em 23/10/2026, preservado integralmente em [caderno-COSTAR-v0_3.txt](caderno-COSTAR-v0_3.txt).\n\n' +
  'Aplicar P01 e as diretrizes atualizadas em todas as etapas. A lista está em ordem numérica; dependências de execução estão no roadmap. P08 deve receber a especificação P11 ao revisar a página. Carregar resultados anteriores e [decisões](../docs/decisoes.md). Documentação principal: [Português (Brasil)](../README.md) · [English (US)](../README.en.md).\n\n' +
  orderedMatches.map(m => `- [${m[1]} — ${m[2]}](${m[1]}.txt)`).join('\n') +
  '\n- [P12 — ANÁLISE COMPARATIVA DA GIR DE ENTRADA](P12.txt)\n' +
  '\n\nA concepção não executa automaticamente os prompts futuros [F0](execucao-F0.md), [F0-web](execucao-F0-web.md) e [F1](execucao-F1.md). Eles delimitam os próximos incrementos.\n';
preserve(path.join(dest, 'README.md'), index);
console.log(JSON.stringify({prompts: matches.length, input_sha256: crypto.createHash('sha256').update(bytes).digest('hex')}, null, 2));
