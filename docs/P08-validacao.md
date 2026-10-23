# Estratégia de validação e liberação

Cada recurso declarado suportado precisa de evidência por regra, período e perfil. Os resultados esperados abaixo são derivados manualmente das hipóteses do P05; não foram obtidos de uma função do futuro motor. Nenhum teste de motor ou navegador é declarado executado nesta concepção.

## Catálogo de referência sintético

Todos os valores monetários estão em XUM e os casos T01–T09 pressupõem explicitamente escopo hipotético e ausência das exceções de P05.

| ID | Entradas e premissas | Resultado esperado independente | Cobertura futura |
|---|---|---|---|
| T01 | Renda 100, tributos 10, exclusão 20 | ETR 0,10; percentual 0,05; excedente 80; imposto 4 | Regra, integração e memória |
| T02 | 100, 10, 0 | 0,05 × 100 = 5 | Contrafactual |
| T03 | 100, 15, 20 | Percentual zero; imposto zero calculado | Fronteira da alíquota |
| T04 | 100, 20, 20 | Máximo de 0 e -0,05; imposto 0 | Acima da alíquota |
| T05 | 100, 10, 120 | Excedente máximo de 0 e -20; imposto 0 | Exclusão maior que renda |
| T06 | 100, 0, 20 | 0,15 × 80 = 12 | Tributos zero presentes |
| T07 | 0 ou -1, 10, 20 | Fora do perfil, valor null; nenhuma divisão por zero | Rota não coberta |
| T08 | 100, -1, 20; ou exclusão -1; ou NaN/texto/infinito | Erro de entrada no demonstrador; sem imposto válido | Validação |
| T09 | Tributos ausentes, estado unknown | Incomplete, valor null; não converter para zero | Dados materiais |

## Fronteiras e situações fora do primeiro perfil

| ID | Cenário e fundamento | Esperado e condição de habilitação |
|---|---|---|
| T10 | Receitas históricas [750,750,0,0] milhões EUR; quatro anos de 12 meses, sem exceção; S8 1.1 | Candidato ao teste de base positivo; F1 deve bloquear teste normativo ainda não implementado |
| T11 | [749,750,0,0] sob as mesmas hipóteses | Candidato negativo; F1 não pode declarar outside_scope sem módulo de escopo |
| T12 | Exercício de 6 meses; receita 375 milhões | Limiar proporcional de referência; validar corpus antes de habilitar |
| T13 | Fusão, cisão ou histórico incompleto | Bloqueio de perfil; esperado substantivo depende da regra específica |
| T14 | De minimis e respectivas médias/eleição | Bloqueio F1; não confundir com limiar do grupo |
| T15 | Entidade excluída, PE ou localização não resolvida | Classificação não desaparece; bloqueio de rota ordinária |
| T16 | Ajustes de renda não conciliados ou moedas incompatíveis | Erro bloqueante, sem soma indevida |
| T17 | Créditos, CFC, diferidos, recapture e perdas | Bloqueio por capacidade; resultados substantivos a derivar de fontes revisadas |
| T18 | Ativos/folha, percentuais transitórios e eleição SBIE | F1 recebe exclusão preparada; não inventa derivação |
| T19 | Safe harbour, eleições e transições S4/S10 | Bloqueio explícito sem implementação e prova de elegibilidade |
| T20 | QDMTT/IIR/UTPR com propriedade e dois pacotes fictícios | Bloqueio F1; em F2, alocação manual prévia, soma conciliada e consumo único de parcela |
| T21 | JV, investimento, transparência, propriedade parcial | Partições próprias ou bloqueio; nenhuma mistura ordinária |
| T22 | Retificação de execução encerrada | Novo run, original intacto e diferenças explicadas |
| T23 | Troca fict_a/fict_b | Apresentação pode variar; resultado canônico igual se única diferença for apresentação |
| T24 | Mesmo conjunto de fatos em ordem diferente | Resultado canônico igual, para listas sem significado de ordem |
| T25 | Nova regra publicada após snapshot | Execução antiga reproduzível; nova regra só entra por seleção explícita |

Propriedades condicionais: soma das parcelas igual ao agregado, alocações sem duplicidade, idempotência de serialização e repetibilidade. Não impor monotonicidade econômica global: eleições, transições e regras especiais podem invalidar tal expectativa.

## Revisão e evidências

Cada teste deve registrar regra, fonte, interpretação, período, jurisdição, entrada congelada, esperado manual, revisor distinto do implementador, resultado observado, versão e divergência. Para exemplos oficiais, manter referência e avaliação de direito de uso; a coleção integral de exemplos oficiais permanece em L08. Casos sem esperado normativo verificado podem testar bloqueio, mas não justificar suporte substantivo.

Camadas: testes unitários de regra; contratos de dados/pacotes; integração das pontes; fluxo completo do perfil; regressão entre corpus; comparação histórica. GIR: separar schema, semântica e recepção doméstica, com evidências diferentes.

## Bootstrap, página e CI

F0: preparar clone limpo, abrir projeto, restaurar dependências aplicáveis, usar sessão sem .RData e caminhos pessoais; Rscript não interativo para componentes R. Distinguir arquivo preparado de projeto efetivamente aberto e validado no RStudio. Nesta rodada o arquivo existente foi apenas lido.

Página: W01 menu/âncoras; W02 seleção de todos os módulos por mouse e teclado; W03 avançar/voltar/selecionar etapa, sem autoavanço; W04 reproduzir T01–T08 e restaurar exemplo; W05 erros com labels, foco e anúncio; W06 360/768/1440 px sem overflow horizontal; W07 contraste e foco; W08 conteúdo essencial sem JS; W09 links/fontes; W10 console sem erro e recursos em subdiretório; W11 memória M01–M09 e limitações visíveis; W12 preferência por movimento reduzido. Registrar screenshots e inspeção manual no navegador; teste automático não prova sozinho acessibilidade.

CI proposto para o escopo implementado: validar documentação/links relativos/JSON, depois testes Python e contratos F1, testes web e deployment em jobs separados. Fixar runtimes e actions por revisão; distinguir arquivo workflow, run disparado e run aprovado. Nenhum workflow ou run é reportado existente agora.

Gate de liberação: revisão tributária e técnica independentes, regras críticas cobertas, diferenças explicadas, matriz de suporte atualizada, dados públicos sintéticos, dependências fixadas e artefatos reproduzíveis. Não anunciar conformidade integral à OCDE por cobertura de código.

## Fechamento

Fontes: P08, hipótese P05, S8 e calendário S6. Decisão proposta: esperado independente e bloqueio testável. Aceite: matriz, referência, revisão e gate especificados; testes executáveis, revisão independente e evidência de liberação pendentes.
