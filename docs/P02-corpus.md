# Corpus normativo e versionamento temporal

O [catálogo](../sources/catalogo.md) diferencia publicação identificada, trecho examinado e matéria ainda não verificada. A primeira rodada permite especificar contratos e o demonstrador hipotético; não libera regra nacional para produção.

## Matriz de cobertura normativa

| Tema | Fontes e dispositivos candidatos | Dimensão temporal a resolver | Cobertura atual |
|---|---|---|---|
| Escopo e entidades | S8 cap. 1; comentário S3 | Exercícios da UPE, histórico, reorganizações | Dispositivos de base identificados; revisão pendente |
| Renda e ajustes | S8 cap. 3; S3 e orientações | Período contábil e período tributário | Inventário inicial, sem tradução executável |
| Tributos e diferidos | S8 cap. 4; S9; S7/S14 | Origem, reversão, recapture, emendas | Bloqueado para resultado normativo |
| ETR e caso ordinário | S8 arts. 5.1–5.3 | Percentuais e regras do período | Referência para hipótese sintética de P05 |
| De minimis e separações | S8 arts. 5.5/5.6, caps. 6/7 | Médias, eleições e condições especiais | Não suportado |
| Mecanismos de cobrança | S8 cap. 2; S13 e leis internas | Qualificação, regra e período de cobrança | Sem pacote nacional selecionado |
| Safe harbours e transição | S4, S10 e corpus histórico | Eleições e exercícios alcançados | Documentos localizados, suporte pendente |
| Declaração e intercâmbio | S6/S11/S12 | Exercício, entrega, recepção e intercâmbio | Adaptador futuro, sem XSD validado |

## Registro bitemporal

Uma versão de regra conterá `rule_version`, `source_version`, `published_at`, `legal_valid_from`, `legal_valid_to`, `period_predicate`, `recorded_from`, `recorded_to`, `adoption_source`, `jurisdiction`, `interpretation_id`, `review_id`. A validade jurídica e o momento em que o projeto conhece a regra são dimensões independentes. Publicação é metadado adicional. Datas desconhecidas não passam no seletor normativo.

Para reproduzir uma apuração, selecionar versões válidas para o período jurídico **e** conhecidas no snapshot da execução original. Uma retificação pode usar novo conhecimento, mas gera nova execução vinculada, sem sobrescrever a antiga. Intervalos sobrepostos para uma mesma capacidade exigem resolução explícita; o motor não escolhe automaticamente o documento mais recente.

## Conflitos e qualificação

CONFLICT-01/02 constam no catálogo. Para conflito entre orientação e lei doméstica, registrar as duas fontes, alcance e hipóteses: aplicação da lei, interpretação compatível ou impedimento de conclusão. A decisão pertence à revisão jurídica competente da jurisdição; não há precedência jurídica universal embutida no framework.

O registro de qualificação será separado da lei e do software: `mechanism`, `jurisdiction`, `official_source`, `locator`, `scope`, `conditions`, `applicable_from`, `applicable_to`, `consulted_at`, `snapshot_hash`. IIR, UTPR, DMTT/QDMTT e cada safe harbour terão entradas próprias quando houver evidência oficial. Ausência no Central Record não será tratada como desqualificação. Na rodada atual todos os países reais permanecem não suportados.

## Política de atualização e lacunas

Fluxo: detectar publicação → registrar versão → avaliar temas e períodos afetados → abrir interpretação → dupla revisão → atualizar cenários → explicar diferenças → publicar versão imutável. Correções de segurança podem mudar o software sem alterar regra jurídica; alterações normativas exigem novo corpus e regras. Nunca substituir silenciosamente um snapshot de apuração encerrada.

Backlog: L01 confirmar incorporação temática do Commentary; L02 obter IAS 12 aplicável; L03 selecionar jurisdição/exercício e levantar lei, regulamentação e qualificação; L04 revisar eleições e orientações históricas; L05 mapear GIR, XSD e calendário; L08 conferir exemplos oficiais e direitos. Responsável proposto: curadoria normativa, com revisão jurídica nacional e contábil nos respectivos temas.

## Fechamento

Fontes: S1–S14 no catálogo. Decisão proposta: congelar corpus por versão e bloquear regra com aplicabilidade desconhecida. Aceite atendido: inventário inicial, temporalidade e política definidos; nenhuma regra é declarada normativa suportada. Aceite pendente: corpus completo e revisão por dispositivo para o perfil real escolhido.
