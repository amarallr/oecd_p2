# Roadmap e passagem à implementação

A revisão de consistência mantém o mesmo perfil em domínio, dados, motor, pacotes, arquitetura, testes e página: hipótese ordinária sintética, sem apoio a obrigação real. A concepção v0.1 oferece contratos e candidatos a regras; não demonstra cobertura normativa integral. P11 está especificado e entra antes de F1 sem depender do motor.

## Fases e critérios de passagem

| Fase | Entradas e entregas | Critério verificável | Dependências e competências | Riscos |
|---|---|---|---|---|
| F0 | Concepção revisada; raiz RStudio/Git, prompts, guias, ambiente e repositório confirmado | Projeto único preparado, dependências aplicáveis restauráveis, remoto e sincronização comprovados ou bloqueio específico | P07/P09; engenharia e mantenedores; revisão do corpus para escopo | Remoto inacessível, raiz existente e licenças pendentes |
| F0-web | P11 e conteúdo revisado → HTML/CSS/JS, exemplo e guia | W01–W12, resultado 4 e deployment/URL verificados ou bloqueio documentado | F0 para Git; frontend/acessibilidade e revisão tributária do texto | Confundir exemplo com suporte fiscal |
| F1 | Perfil fechado e contrato → biblioteca/CLI decimal, memória, dados e bloqueios | T01–T09/T16/T24/T25 e rejeição dos demais; operação offline; suporte experimental publicado | P04/P05/P07/P08; engenharia e revisores | Falsa cobertura de ajustes recebidos prontos |
| F2 | Contrato de coordenação revisado → dois pacotes fictícios e ledger | Esperados manuais, ausência de dupla contagem e reconciliação | F1, P06, T20/T23; especialistas de alocação | Coordenação simplificada parecer regra real |
| F3 | País e exercício selecionados → primeiro pacote real revisado | Corpus doméstico, qualificação quando necessária, revisão independente e cenários oficiais | L01–L04/L08 e F2; juristas/contadores nacionais | Mudança normativa e interpretação não resolvida |
| F4 | Necessidades priorizadas → relatórios de análise GIR × fontes e API/interface | Contratos de comparação, cobertura e evidências versionados; schema, semântica e recepção separados | GIR-1–4; acesso autorizado às demais fontes; operadores e segurança | XML válido ser confundido com análise fiscal concluída |
| F5 | Demanda e capacidade → expansão de casos/países e desempenho | Suporte por capacidade/período comprovado e manutenção financiada | Fases anteriores e governança | Dívida normativa e concentração de mantenedores |

F0 técnico pode avançar enquanto lacunas jurídicas independentes são estudadas. A aprovação técnica de corpus/escopo continua necessária para liberar capacidades normativas; não impede preparar arquivos ou site didático com limites explícitos.

## Backlog priorizado

Esforço relativo é comparativo (P/M/G), sem orçamento ou prazo prometido. A história e seu valor estão resumidos em cada item; fundamento são os prompts fornecidos e as fontes indicadas.

| ID | História e valor | Fundamento | Dependência | Esforço | Aceite e evidência |
|---|---|---|---|---|---|
| B01 | Como mantenedor, reutilizar remoto e raiz para evitar histórias divergentes | P01/P07 | Acesso GitHub | P | Origin, branch, status e histórico registrados |
| B02 | Como desenvolvedor, abrir projeto limpo e restaurar ambiente | P07/S16 | B01, ADR-001 | M | .Rproj único, guia e prova em clone limpo |
| B03 | Como leitor, entender e explorar o projeto | P11 | Conteúdo e F0 técnico | M | Página e evidências W01–W12 |
| B04 | Como curador, resolver divergência temporal do Commentary | P02/S3 | Nenhuma dependência de código | M | Matriz por orientação/dispositivo revisada |
| B05 | Como contador, validar IFRS e preservar histórico de diferidos | P04/S7/S14 | Acesso à norma aplicável | M | Parecer técnico e mapeamento por campo |
| B06 | Como operador, validar dados e conciliar bases | P04 | Contratos revisados | M | Schemas, fixtures, erros e proveniência |
| B07 | Como pesquisador, executar hipótese sem float fiscal | P05/S15 | B02/B06 | M | Biblioteca/CLI e T01–T09 com memória |
| B08 | Como auditor, reproduzir versão e retificação | P01/P05 | B07 | M | Hash canônico e comparação histórica |
| B09 | Como desenvolvedor nacional, testar diferenças explicáveis | P06 | B07/B08 | G | FICT-A/B e ledger de alocação revisado |
| B10 | Como especialista, delimitar país/exercício de piloto real | P02/P03/P06 | Levantamento, não escolha arbitrária | G | Corpus doméstico, qualificação e ficha de suporte |
| B11 | Como analista, obter relatório comparativo GIR de entrada × demais fontes com cobertura e evidências | P07/P12/S6/S11/S12 | GIR-1 a GIR-4 e fontes autorizadas | G | Perfil, regras, diferenças e limitações reproduzíveis; não gerar GIR de saída |
| B12 | Como contribuidor, saber revisar e redistribuir | P09/S18/S19 | Titularidade e licenças | M | Documentos finais e revisão de licenças/dependências |
| B13 | Como mantenedor, publicar versões verificáveis | P08/P09 | Escopo implementado | M | CI, SBOM, release e canal de segurança real |

Caminho crítico para obrigação real: corpus/IFRS e piloto → contratos e interpretação → motor revisado → coordenação → pacote nacional → validação independente. Página e levantamento de fontes são entregas independentes. Custos recorrentes: atualização normativa por país/período, regressões, revisão de dependências, traduções, acessibilidade e atendimento a falhas. Dimensionar equipe e volume antes de estimar calendário ou orçamento.

## Entregas e próximos prompts

### Trilha GIR de ingestão e conferência

A [P12](P12-gir-entrada-conferencia.md) define GIR-0 a GIR-6. Contratos e ingestão não esperam motor completo ou pacote real; somente recálculo depende de perfil de cálculo suportado. Os módulos de importação abaixo não estão implementados.

| Backlog / etapa | Entrega | Dependências e aceite |
|---|---|---|
| B14 / GIR-0 | Contratos, fontes, cobertura e exemplo interno | P12/ADR-005; integridade, sem alegar XSD |
| B15 / GIR-1 | Preservação, leitura segura e estrutura de um perfil | XSD/dependências fixados, parser/runtime; hash/idempotência, versão rejeitada, XXE/DTD e limites |
| B16 / GIR-2 | Mapeamento declarado/normalizado | B15 e seletores revisados; proveniência, ausência e campo material sem mapa |
| B17 / GIR-3 | Consistências internas | B16 e regras revisadas; totais/condições, sem alegar independência |
| B18 / GIR-4 | Comparação e suficiência | B17 + F1 ou perfil posterior suportado; contexto conciliado e independência identificada |
| B19 / GIR-5 | Histórico e correções | B16 e semântica de mensagens homologada; referências, parcialidade e reprodução antiga |
| B20 / GIR-6 | Cruzamentos e relatórios | B17/B19 e acesso autorizado; chaves, cobertura, conceitos e sigilo |

Próximo prompt independente: [GIR-1](../prompts/execucao-GIR1.md). Não antecipa F1, transmissão institucional ou suporte a todas as versões.

Estrutura prevista: raiz com `.Rproj`, `.gitignore`, README e licença adotada; prompts, docs/adr, sources, schemas, core, rules, jurisdictions, adapters, examples, tests, scripts, R e site. A concepção criou somente documentos, prompts e evidências pertinentes, sem pastas vazias para aparentar implementação.

Próximos prompts prontos para execução: [F0](../prompts/execucao-F0.md), [F0-web](../prompts/execucao-F0-web.md) e [F1](../prompts/execucao-F1.md). Eles recebem esta concepção, o registro de decisões e o estado real do workspace. F0 resolve a raiz e o remoto antes de inicializar/sincronizar; F0-web constrói e testa a página; F1 implementa só o perfil sintético. Criar repositório público apenas se ausência estiver comprovada e houver capacidade autenticada, conforme o caderno.

## Pendências para uso em obrigações reais

Faltam escolha de jurisdição e exercício, corpus completo por dispositivo, validação IFRS, licenças adotadas, motor, coordenação, pacotes nacionais, validação independente, cobertura declarada e adaptador/recepção doméstica quando aplicáveis. A existência desta concepção ou de uma página futura não elimina esses gates.

## Fechamento

Fontes: resultados P00–P09/P11 e catálogo. Decisões: identificador e destino definidos pelo proponente; arquitetura, licenças e processos propostos; corpus real, remoto e aplicação nacional com lacunas. Aceite da concepção: fases, backlog, dependências e prompts entregues; implementação, revisão humana e publicação são etapas futuras delimitadas.
