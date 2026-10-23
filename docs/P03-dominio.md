# Domínio tributário e catálogo de regras

O modelo mantém casos especiais visíveis, mesmo fora do primeiro perfil. Os termos abaixo orientam contratos; sua classificação jurídica depende do corpus e do período. A cadeia de rastreabilidade segue P01 e a cobertura atual está em [suporte](suporte.md).

## Glossário e relações

| Termo em português | Identificador em inglês | Representação no domínio |
|---|---|---|
| Grupo | Group | Conjunto consolidado e sua base contábil |
| Entidade controladora final | Ultimate Parent Entity, UPE | Entidade de referência do grupo e do exercício |
| Entidade constituinte | Constituent Entity, CE | Participante classificado, com histórico de localização |
| Estabelecimento permanente | Permanent Establishment, PE | Unidade relacionada à entidade principal; chave própria |
| Jurisdição | Jurisdiction | Localização para regra e agregação; categoria fictícia separada |
| Entidade excluída | Excluded Entity | Classificação fundamentada, nunca simples remoção da entrada |
| Participação | Ownership Interest | Relação temporal, direitos e percentual, sem assumir identidade entre direitos |
| Exercício fiscal | Fiscal Year | Datas da UPE e mapeamento de períodos locais |
| Renda ou perda GloBE | GloBE Income or Loss | Agregado derivado de contas e ajustes |
| Tributos abrangidos ajustados | Adjusted Covered Taxes | Agregado conciliado, distinto de caixa pago |
| Alíquota efetiva | Effective Tax Rate, ETR | Resultado de base jurisdicional apropriada |
| Exclusão baseada em substância | Substance based Income Exclusion, SBIE | Entrada derivada de regras e eleições próprias |
| Imposto complementar | Top up Tax | Resultado anterior à alocação no demonstrador |
| Regra de inclusão de renda | Income Inclusion Rule, IIR | Capacidade de cobrança a coordenar |
| Regra dos lucros subtributados | Undertaxed Profits Rule, UTPR | Capacidade de cobrança residual a especificar |
| Imposto mínimo doméstico | Domestic Minimum Top up Tax, DMTT | Capacidade doméstica; qualificação não presumida |
| Regime de simplificação | Safe Harbour | Decisão condicionada, temporal e possivelmente eletiva |

Relações: um grupo tem períodos e entidades; uma entidade tem localizações e relações societárias ao longo do tempo; contas originam ajustes e bases; bases são particionadas por `group_id + period_id + jurisdiction_id + aggregation_category`. Categorias especiais não entram silenciosamente na partição ordinária. Proibir compensação indiscriminada entre países.

## Escopo e cobertura

Como referência de base, o art. 1.1 de S8 usa EUR 750 milhões em pelo menos dois dos quatro exercícios anteriores, com ajuste para exercícios diferentes de 12 meses. Esse teste é distinto do de minimis jurisdicional do art. 5.5. Exclusões e reorganizações exigem suas próprias condições. A adoção interna e as orientações posteriores permanecem por verificar.

| rule_id e requisito | Fonte candidata | Entradas e comportamento projetados | Exceções e teste | Estado atual |
|---|---|---|---|---|
| RULE-SCOPE-01 / REQ-SCOPE-01 | S8 1.1; cap. 6 | Histórico de receitas, períodos e estrutura → decisão de escopo | Exercícios especiais e reorganizações; T10–T14 | Não suportado |
| RULE-ENTITY-01 / REQ-ENTITY-01 | S8 cap. 1 e 10 | Classificação, localização e propriedade → população | Excluídas, PE e transparentes; T15 | Não suportado |
| RULE-INCOME-01 / REQ-BASE-01 | S8 cap. 3 | Resultado contábil e ajustes → renda por entidade | Categorias especiais; T16 | Não suportado |
| RULE-TAX-01 / REQ-TAX-01 | S8 cap. 4; S9 | Tributos conciliados → base ajustada | Créditos, CFC, diferidos e perdas; T17 | Não suportado |
| RULE-ORD-01 / REQ-CALC-01 | S8 5.1–5.3 e hipótese P05 | Bases positivas sintéticas → cálculo ordinário ilustrativo | Sem ajustes adicionais ou QDMTT; T01–T09 | Não suportado em software; exemplo manual disponível |
| RULE-SBIE-01 / REQ-SBIE-01 | S8 5.3 e 9.2 | Ativos, folha, período e eleição → exclusão | Percentuais transitórios; T18 | Não suportado; P05 recebe valor já preparado |
| RULE-SH-01 / REQ-SH-01 | S4/S10 e corpus histórico | Elegibilidade, eleições e dados específicos → rota | Não inferir elegibilidade da ETR simples; T19 | Não suportado |
| RULE-COORD-01 / REQ-COORD-01 | S8 cap. 2, S13 e normas internas | Bases, propriedade, qualificação e pacotes → cobrança | Impedir dupla contagem; T20 | Não suportado |
| RULE-SPECIAL-01 / REQ-SPECIAL-01 | S8 caps. 5–7 e orientações | JV, investimento, propriedade parcial, transparência → rotas próprias | Agregação separada; T21 | Não suportado |
| RULE-REVISION-01 / REQ-REVISION-01 | S8 4.6/5.4; P01 | Execução antiga e correção → nova execução e comparação | Preservar original; T22 | Não suportado |

As fichas completas devem usar o contrato P01. Para todas as candidatas: período nacional e eleições específicas `não verificados`; dependências P02/P04; erro padrão `E_RULE_UNSUPPORTED`; saída normativa bloqueada. O primeiro perfil de F1 só poderá habilitar RULE-ORD-01 como **experimental e hipotético**, após testes. Não herda habilitação de nenhuma outra linha.

Grafo proposto: contexto e corpus → escopo e população → eleições e requisitos de dados → bases por entidade → partições de agregação → cálculo → coordenação → memória. Uma eleição pode demandar dados antes da escolha da rota; o grafo não impõe simplificações prematuras.

## Questões de interpretação

Créditos fiscais, CFC, diferidos/recapture, perdas, entidades transparentes, JV, investimentos e participações parciais têm marcadores explícitos na entrada. Sua ocorrência bloqueia o perfil ordinário. Detalhar uma regra sem fonte e período confirmados criaria falsa cobertura; as interpretações ficam em L03/L04. STTR, se desenvolvido, terá catálogo e tratados próprios, sem reutilizar o resultado GloBE como obrigação STTR.

## Fechamento

Fontes: S8 para mapa do domínio; S3/S4/S9/S10/S13 como corpus complementar a revisar. Proposta: partições explícitas e bloqueio conservador do perfil. Aceite: resultados pretendidos e casos especiais têm IDs e testes previstos; validação normativa e fichas de produção pendentes.
