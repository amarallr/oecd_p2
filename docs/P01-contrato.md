# Contrato comum de evidência e qualidade

Esta especificação aplica P01 às demais entregas. Identificadores são estáveis; documentação inicial em português e nomes de contratos em inglês. Cada decisão tem estado `proposta`, `validada`, `substituída` ou `bloqueada`. Aprovação técnica é um gate de liberação; trabalhos independentes de concepção podem continuar.

## Requisitos transversais

| ID | Comportamento obrigatório | Evidência e teste de aceite |
|---|---|---|
| REQ-EVID-01 | Usar fonte primária e dispositivo localizável; registrar acesso, edição e jurisdição | Catálogo com campo ausente explicitamente não verificado |
| REQ-TIME-01 | Separar publicação, aplicabilidade jurídica e conhecimento no projeto | Seleção histórica reproduzível, sem atualização silenciosa |
| REQ-TRACE-01 | Ligar fonte, interpretação, requisito, regra, código, teste e resultado | Nenhum resultado suportado com elo material ausente |
| REQ-STATE-01 | Separar cobertura e estado do resultado | Falta de dados ou suporte nunca vira zero |
| REQ-DET-01 | Executar com snapshots e versões fixas, sem consultas mutáveis | Mesmo resultado canônico em repetições e permutações permitidas |
| REQ-DEC-01 | Usar decimal e política explícita de arredondamento | Valores serializados como strings; rejeitar NaN e infinito |
| REQ-DATA-01 | Conservar origem e conciliar agregados | Soma de linhas auditáveis explica cada valor |
| REQ-PRIV-01 | Publicar somente exemplos sintéticos | Revisão dos arquivos, logs e relatórios antes do envio |
| REQ-OPEN-01 | Implantar sem serviço central e respeitar direitos de terceiros | Clone e execução offline após preparação de dependências |
| REQ-UI-01 | Manter página coerente com docs e sem regras normativas duplicadas | Contrato didático explícito e cobertura publicada |
| REQ-GIT-01 | Preservar arquivos, histórico e origin; sincronizar somente remoto confirmado | Diff revisado, commit convencional, hash remoto e branch |
| REQ-ROOT-01 | Usar uma raiz e caminhos relativos | Clone limpo funciona sem diretório pessoal ou .RData |

Fundamento dos requisitos acima: P01 do caderno fornecido. Seu escopo é toda versão do projeto; não são prescrições tributárias. Entradas: artefatos e contexto de execução. Exceção: lacunas bloqueiam apenas a conclusão material dependente. Status atual: especificado, ainda não implementado.

## Contrato de regra e rastreabilidade

Cada ficha inclui `rule_id`, `requirement_id`, `source_id`, `locator`, `interpretation_id`, `valid_from`, `valid_to`, `known_from`, `jurisdiction`, `fiscal_period_predicate`, `inputs`, `output`, `decision`, `election`, `exceptions`, `dependencies`, `errors`, `test_ids`, `coverage_status`, `review_status`. O intervalo de validade é fechado à esquerda e aberto à direita; ausência de data confirmada não significa validade ilimitada.

Os estados de cobertura são `suportado`, `experimental`, `não suportado`, `não aplicável`, `pendente de dados`. São diferentes dos estados de resultado P05 e dos estados de desenvolvimento da página. Uma regra descrita permanece não suportada até implementação, testes e revisão adequados.

A cadeia inicial é S8 → INT-ORD-01 (simplificação do caso fornecido) → REQ-CALC-01 → RULE-ORD-01 → implementação futura F1 → T01/T02 → resultado ainda não executado no motor. A memória manual está em P05. Para mudança normativa, preservar a cadeia antiga e registrar a nova interpretação.

## Controle dos artefatos

Salvar fontes de entrada, prompts separados, decisões, contratos e versão da concepção. Checksum só vale para bytes efetivamente presentes; esta entrega utiliza SHA-256 para os artefatos locais e não inventa hashes dos documentos apenas consultados pelo navegador. Não incorporar credenciais, dados reais, bibliotecas, caches ou sessões RStudio.

## Fechamento

Fonte: P01 integral em [prompts](../prompts/README.md). Decisões propostas: D01–D08. Lacunas materiais: revisão jurídica, suporte real e sincronização. Aceite: contrato documentado e aplicado aos rótulos desta concepção; testes do software e controle Git remoto pendentes.
