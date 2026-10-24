// SPDX-License-Identifier: Apache-2.0
// Integridade de artefatos de concepção; não é importador, validador XSD ou motor.
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const fixture=JSON.parse(fs.readFileSync(path.join(root,'examples/gir-review.design.json'),'utf8'));
const source=JSON.parse(fs.readFileSync(path.join(root,'examples/gir-review-synthetic.source.json'),'utf8'));
test('contrato sintético distingue declarado, normalizado e recálculo não executado',()=>{
  assert.equal(fixture.official_gir_format,false);assert.equal(fixture.official_xsd_validated,false);
  const declared=fixture.declared_facts[0],normalized=fixture.normalized_facts[0],run=fixture.recalculation_runs[0],comparison=fixture.comparison_results[0];
  assert.equal(declared.original_lexeme,source.declared.jurisdictional_top_up_before_allocation);
  assert.equal(normalized.declared_fact_id,declared.declared_fact_id);assert.equal(normalized.mapping_id,fixture.field_mappings[0].mapping_id);
  assert.equal(normalized.decimal_value,declared.decimal_value);
  assert.equal(run.execution_status,'not_executed');assert.equal(run.output,null);assert.equal(run.canonical_result_hash,null);
  assert.equal(comparison.execution_status,'not_executed');assert.equal(comparison.result_status,null);assert.equal(comparison.recalculated_value,null);
  assert.equal(fixture.validation_results[0].status,'not_executed');
  assert.equal(fixture.submission_relations[0].target_submission_id,null);assert.equal(fixture.submission_relations[0].status,'pending_reference');
});
test('hashes dos documentos sintéticos correspondem aos bytes preservados',()=>{
  for(const doc of fixture.source_documents){const bytes=fs.readFileSync(path.join(root,doc.local_uri));assert.equal(doc.sha256,crypto.createHash('sha256').update(bytes).digest('hex'));assert.equal(doc.byte_length,bytes.length);}
});
test('referências e proveniência do exemplo não usam saída ou esperado como insumo',()=>{
  const ids=new Set(fixture.source_documents.map(d=>d.document_id));
  for(const declared of fixture.declared_facts){assert.ok(ids.has(declared.document_id));assert.equal(declared.value_state,'present');assert.equal(declared.locator.kind,'json_pointer');assert.equal(declared.context.period_id,'SYNTHETIC-PERIOD-01');}
  for(const submission of fixture.submissions)for(const id of submission.source_document_ids)assert.ok(ids.has(id));
  const run=fixture.recalculation_runs[0];assert.ok(ids.has(run.input_snapshot.document_id));
  assert.notEqual(run.input_snapshot.document_id,fixture.declared_facts[0].document_id);
  assert.deepEqual(run.input_snapshot.field_paths,['/income','/adjusted_covered_taxes','/substance_exclusion']);
  assert.equal(fixture.comparison_results[0].recalculation_run_id,run.recalculation_run_id);
  assert.equal(fixture.comparison_results[0].reconciliation_id,fixture.reconciliation_results[0].reconciliation_id);
});
test('documentação delimita perfis sem suporte e matriz de aceite futuro',()=>{
  const spec=fs.readFileSync(path.join(root,'docs/P12-gir-entrada-conferencia.md'),'utf8');
  for(const token of ['GIR-R01','GIR-R10','GIR-C01','GIR-C06','GIR-0','GIR-6','not_comparable','insufficient_data','unsupported_rule','not_executed'])assert.ok(spec.includes(token));
  assert.equal(fixture.manual_expected_not_engine_output.legal_conclusion,null);
});
test('README, página e slide-mapa distinguem preparação e conferência da GIR',()=>{
  const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
  const page=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
  const deck=fs.readFileSync(path.join(root,'site/apresentacao.html'),'utf8');
  const script=fs.readFileSync(path.join(root,'site/assets/js/apresentacao.js'),'utf8');
  assert.match(readme,/preparar dados e resultados para uma GIR futura/);assert.match(readme,/receber uma GIR disponibilizada localmente/);
  assert.match(page,/Preparar<\/strong>/);assert.match(page,/Conferir<\/strong>/);
  assert.match(deck,/GIR · DOIS FLUXOS/);assert.match(deck,/GIR recebida → preservar e validar/);
  assert.match(script,/GIR: entrada, saída e conferência/);
  assert.match(deck,/ainda não implementados/);
});
test('referências locais da especificação GIR e README existem',()=>{
  for(const relative of ['README.md','docs/P12-gir-entrada-conferencia.md','docs/adr/ADR-005-gir-bidirecional.md','docs/evidencias/gir-concepcao-2026-10-23.md','sources/gir.md','prompts/P12.txt','prompts/execucao-GIR1.md']){
    const sourcePath=path.join(root,relative),text=fs.readFileSync(sourcePath,'utf8');
    for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
      const target=match[1].split('#')[0];if(!target||/^(?:https?:|mailto:)/i.test(target))continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(sourcePath),decodeURIComponent(target))),`${relative}: ${target}`);
    }
  }
});
