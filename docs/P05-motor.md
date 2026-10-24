# Contratos do motor e memória de cálculo

O futuro motor executará somente perfis explicitamente habilitados. Esta especificação contém um exemplo manual e pseudocódigo; nenhuma biblioteca fiscal foi implementada. O primeiro perfil `ordinary_synthetic_v1` é hipotético, com bases já preparadas e sem casos especiais.

## Operações e estados

Na extensão [P12](P12-gir-entrada-conferencia.md), fatos da GIR recebida só alimentam o motor com perfil, cobertura e proveniência explícitos. `declared_arithmetic`, `gir_based` e `independent_sources` distinguem aritmética declarada, recálculo com GIR e com fontes externas conciliadas. O perfil ordinário não se aplica automaticamente aos agregados. A comparação é separada; o motor não altera o declarado e não conclui sem dados ou regra suportada.

| Operação | Entradas e pré-condições | Saída | Erro bloqueante |
|---|---|---|---|
| validate_context | Grupo, período, versões e perfil identificados | Contexto validado | E_CONTEXT / E_PERIOD |
| select_rules | Corpus e pacotes congelados; aplicabilidade resolvida | Grafo de regras versionado | E_RULE_TIME / E_PACK |
| assess_scope | Histórico e classificações suficientes, ou hipótese sintética explícita | Escopo com fundamento ou hipótese | E_SCOPE_DATA |
| resolve_elections | Evidência, vigência e dados da eleição | Rota e requisitos adicionais | E_ELECTION |
| prepare_bases | Fatos, ajustes, moeda e categorias conciliados | Bases por entidade e partição | E_RECONCILIATION |
| calculate_partition | Perfil suportado e nenhuma dependência material pendente | Intermediários e imposto antes de alocação | E_PROFILE / E_VALUE |
| coordinate | Propriedade, cobrança, qualificações e pacotes habilitados | Alocações reconciliadas | E_COORD_UNSUPPORTED |
| explain_and_export | Versões e trilha completas | Memória canônica e relatório | E_TRACE |

Validação e seleção antecedem execução de regras. Testes de safe harbour recebem os dados de que dependem; quando necessário, parte da preparação ocorre antes da decisão da rota. A preparação não autoriza agregar categorias incompatíveis.

Estados de resultado: `outside_scope`, `calculated_zero`, `safe_harbour_applied`, `calculated_nonzero`, `incomplete`, `unsupported`. Campo adicional `mode`: `hypothetical` ou `normative`. O exemplo retorna `calculated_nonzero` com `mode=hypothetical`, mas não uma obrigação de pagar. Falta material de dados produz `incomplete`, valor final null e causas; caso especial excluído produz `unsupported`, nunca zero. Valores intermediários eventualmente disponíveis permanecem identificados como parciais.

## Contrato preliminar do perfil sintético

Entrada JSON projetada:

```json
{
  "schema_version": "0.1.0",
  "profile": "ordinary_synthetic_v1",
  "mode": "hypothetical",
  "jurisdiction": "FICT-A",
  "period_id": "SYNTHETIC-PERIOD-01",
  "currency": "XUM",
  "assumed_in_scope": true,
  "income": "100",
  "adjusted_covered_taxes": "10",
  "substance_exclusion": "20",
  "special_cases": [],
  "assumptions": {"qdmt_treatment": "excluded", "safe_harbours": "excluded", "additional_adjustments": "excluded"}
}
```

O mínimo de 15% é parâmetro fixo do perfil didático, não uma entrada livre. A hipótese de escopo não satisfaz o teste normativo. Dados ausentes, flags desconhecidos ou hipóteses incompatíveis bloqueiam o perfil. Os nomes finais serão fixados pelo schema de F1.

## Pseudocódigo e precisão

```text
validate schema, explicit assumptions and profile
if any required value missing: return incomplete with final_amount=null
if unsupported special case: return unsupported with final_amount=null
parse monetary strings directly as decimals
require finite income > 0; adjusted_taxes >= 0; exclusion >= 0
etr = adjusted_taxes / income
top_up_rate = max(0, Decimal("0.15") - etr)
excess_profit = max(0, income - exclusion)
jurisdictional_top_up_before_allocation = top_up_rate * excess_profit
return hypothetical result with all intermediates and trace
```

Proposta aritmética: contexto decimal de 50 dígitos, entradas com até 30 dígitos totais e 10 casas; detectar valores fora do contrato. Divisões não exatas registram precisão e arredondamento `ROUND_HALF_EVEN`; não arredondar a ETR antes da multiplicação além do contexto explícito. Quantização de apresentação: duas casas para o exemplo, mantida fora do cálculo. Política fiscal de moeda/arredondamento deverá ser própria do pacote revisado. Float binário e conversão intermediária de string por float são proibidos em valores fiscais materiais.

Renda zero/negativa, tributos negativos, ajustes posteriores e categorias separadas não recebem esta fórmula como solução universal; retornam fora do perfil, com referências às candidatas P03. Há condições tributárias especiais a examinar antes de definir outras rotas.

## Memória manual verificável

| Nó | Entrada ou transformação | Valor | Vínculo |
|---|---|---|---|
| M01 | Resultado contábil sintético | 95 | Fato ilustrativo P04 |
| M02 | Ajuste ilustrativo de renda | +5 | Hipótese, não classificação normativa |
| M03 | Renda preparada: 95 + 5 | 100 | M01/M02 |
| M04 | Despesa corrente 12 e ajuste -2 | 10 | Ponte P04 |
| M05 | Exclusão preparada | 20 | Hipótese recebida |
| M06 | ETR = 10 / 100 | 0,10 = 10% | RULE-ORD-01, referência S8 5.1 |
| M07 | Percentual = máximo de 0 e 15% - 10% | 0,05 = 5% | Referência S8 5.2 |
| M08 | Lucro excedente = máximo de 0 e 100 - 20 | 80 | Referência S8 5.2/5.3 |
| M09 | Imposto didático antes de alocação = 0,05 × 80 | **4** | M07/M08; T01 |
| M10 | Contrafactual com exclusão zero: 0,05 × 100 | **5** | T02 |

A exclusão reduz a base excedente em 20 e, neste exemplo, reduz o resultado em 1. Os 4 não são atribuídos a entidade, IIR ou UTPR. O caso omite QDMTT, safe harbours e ajustes adicionais; não representa a fórmula completa de todas as situações.

## Identidade, determinismo e coordenação futura

O envelope contém `run_id`, `created_at`, ator e resultado canônico. O resultado inclui `input_hash`, `code_version`, `corpus_version`, `profile_version`, `pack_versions`, `elections`, `fx_snapshot`, `qualification_snapshot`, intermediários, avisos e reconciliação. UUID e relógio operacional ficam fora do conteúdo canônico. Serializar strings em UTF-8, decimais normalizados, chaves ordenadas, sem espaços opcionais; ordenar listas sem significado de ordem por chave estável, preservando listas ordenadas semanticamente. A versão do algoritmo canônico acompanha o hash SHA-256. Insumos e versões precisam ambos estar identificados.

Na coordenação futura, calcular primeiro por entidade e partição apropriada; depois manter ledger de alocação com origem, destino, mecanismo, versão e valor. Uma mesma parcela não pode ser consumida duas vezes; toda redução exige regra e evidência, não mera subtração por rótulo QDMTT. A soma de alocações e resíduos deve reconciliar o montante relevante. F1 bloqueia essa operação; F2 validará o contrato com dois pacotes fictícios.

Retificação produz nova execução com `supersedes_run_id`, motivo e comparação por regra e valor. O motor não consulta serviços mutáveis durante o cálculo; câmbio e qualificação entram como snapshots.

## Fechamento

Fontes: P05 do caderno e S8 arts. 5.1–5.3 como referência da hipótese. Proposta: decimal, resultado canônico e bloqueio por perfil. Aceite: cálculo manual refazível e contratos/erros especificados; código, teste do motor e revisão de aplicação normativa pendentes.
