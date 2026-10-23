# Modelo canônico de dados e conciliações

O contrato separa fatos contábeis, interpretações e resultados. Todos os registros desta concepção são sintéticos. O modelo independe do ERP; adaptações IFRS e de outros padrões permitidos preservam sua origem e indicam diferenças para GloBE e para o pacote doméstico.

## Modelo lógico

| Registro e chave | Relações | Campos centrais |
|---|---|---|
| Group, group_id | 1:N FiscalPeriod; 1:N Entity | upe_id, accounting_standard, presentation_currency |
| FiscalPeriod, period_id | N:1 Group | start_date, end_date, local_period_mapping |
| Entity, entity_id | N:1 Group; 1:N Establishment | classification, location_history, functional_currency |
| Ownership, ownership_id | Duas FKs para Entity | parent_id, child_id, rights_type, percentage, valid_from, valid_to |
| Establishment, pe_id | N:1 Entity | location, category, allocation_reference |
| LedgerFact, fact_id | N:1 Entity/period | account_id, amount, currency, source_id, source_line |
| Adjustment, adjustment_id | N:N LedgerFact por tabela de ligação | rule_id, amount, reason, reviewer, evidence_id |
| TaxFact, tax_id | N:1 Entity/period | tax_type, current_or_deferred, expense, paid, payable, origin_period |
| DeferredMovement, movement_id | N:1 TaxFact | opening, additions, reversals, closing, origin_year, recapture_category |
| SubstanceFact, substance_id | N:1 Entity/period | payroll, eligible_asset_base, location, eligibility_evidence |
| Election, election_id | Grupo/jurisdição/entidade conforme regra | election_type, period, validity, decision_evidence |
| Evidence, evidence_id | Referenciável por qualquer fato | document_id, locator, transformation, actor, version |
| FxSnapshot, fx_id | Referenciado pela conversão | pair, date, purpose, rate, source, snapshot_version |
| Run, run_id | N:1 Group/period; imutável | input_hash, corpus_version, packs, profile, result_status |

Identificadores são strings únicas; FKs têm integridade obrigatória. Um fato não pertence simultaneamente a duas entidades sem rateio explícito com soma reconciliada. Relações societárias não admitem ciclos inconsistentes com o perfil. Localizações e direitos não são sobrescritos quando mudam.

## Dicionário e convenções

| Campo ou tipo | Unidade, domínio e precisão proposta | Obrigatoriedade e qualidade |
|---|---|---|
| amount e saldos | Decimal em string ASCII com ponto, até 30 dígitos totais e 10 decimais | Preservar original; overflow bloqueante |
| income | Mesma moeda e escala do agregado | Pode ser negativo no domínio; demonstrador exige positivo |
| expense / paid / payable | Despesa positiva, pagamento positivo, passivo positivo; devoluções identificadas | Campos distintos; não substituir um pelo outro |
| percentage e rate | Fração decimal, como "0.15"; percentuais de propriedade em [0,1] | Não inferir unidade de "15" |
| currency | Código de moeda validado; "XUM" reservado ao exemplo fictício | Nenhuma soma entre moedas diferentes |
| dates | ISO 8601 YYYY-MM-DD | Início anterior ao fim; intervalos jurídicos explícitos |
| value_state | present / missing / unknown / not_applicable | Zero somente com present; null acompanhado de motivo |
| provenance | document_id, account_id, source_line, transformation_id, actor, version | Obrigatória em valor material; falta bloqueia conclusão |
| category | ordinary / special / unresolved | unresolved bloqueia partição de cálculo |

Importação CSV: UTF-8, cabeçalho estável, vírgula separadora, aspas para texto com delimitador; valores decimais com ponto. Exportação localizada é apresentação. JSON: decimais em strings e datas textuais; sem NaN/infinito, chaves duplicadas ou propriedades desconhecidas materiais. A versão maior muda incompatibilidades; versão menor adiciona campos opcionais. Migrações preservam entrada e hash anteriores.

## Pontes de conciliação

Exemplo sintético FICT-A: resultado contábil 95 + ajuste ilustrativo de renda 5 = renda GloBE 100; despesa corrente 12 + ajuste ilustrativo de tributos -2 = tributos ajustados 10. Os ajustes são hipóteses pedagógicas, sem classificação legal inventada. A exclusão 20 é entrada já preparada, não calculada automaticamente de folha ou ativos.

Cada ponte exporta fato original → transformação → ajuste identificado → agregado, em moeda única. Conferir 95 + 5 = 100 e 12 - 2 = 10. Qualquer diferença precisa ser classificada e explicada; não há tolerância arbitrária para ocultar diferença tributária. Conversões conservam moeda funcional, de apresentação, taxa, origem, data e finalidade. Arredondamento para apresentação não altera insumos.

Diferidos têm movimentos por safra e categoria: saldo inicial + constituições - reversões + outros movimentos explicados = saldo final. Manter histórico necessário para perdas, recapture e retificações. Não presumir coincidência entre exercício local e da UPE; o adaptador registra o mapeamento e suas reconciliações.

## IAS 12 e qualidade

S7/S14 confirmam uma exceção temporária ligada a diferidos dos próprios impostos Pillar Two e requisitos de divulgação. O PDF consolidado solicitado redirecionou para acesso por assinatura; a verificação por parágrafo permanece em L02. Como decisão de projeto, manter separados os diferidos de outras origens potencialmente necessários aos ajustes GloBE: a exceção contábil não é um comando para apagar esse histórico.

Erros bloqueantes: chave duplicada, FK ausente, valor inválido, moeda incompatível, origem material ausente, período incompatível e reconciliação inexplicada. Alertas: documento complementar ausente sem impacto material demonstrado, diferença de apresentação justificada e campos opcionais incompletos. Um alerta não pode mascarar uma dependência tributária material.

## Fechamento

Fontes: S7/S14 e corpus S8, além dos requisitos de dados do caderno. Decisão proposta: dados normalizados com proveniência por linha e decimal textual. Aceite: modelo, cardinalidade, domínio, exemplos e controles definidos; schemas executáveis, adaptadores e revisão IFRS vigente pendentes.
