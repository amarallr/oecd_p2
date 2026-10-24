# Especificação da página explicativa interativa

A página deverá explicar o framework, suas camadas, sua auditabilidade e o estágio real do desenvolvimento. Esta é uma especificação para F0-web; HTML, CSS e JavaScript ainda não foram implementados. A leitura é pública, sem cadastro, dados reais, cookies não essenciais, analytics ou serviço externo obrigatório.

## Conteúdo e wireframe

Extensão [P12](P12-gir-entrada-conferencia.md): página e apresentação devem mostrar a GIR recebida como fonte de entrada junto de ERP, SPED, CbC e demais fontes. Etapa 02 preserva, prepara e inicia cotejamentos; etapa 03 aprofunda análises e recálculo possível; etapa 04 apresenta relatório GIR × demais fontes e evidências. A plataforma não gera GIR de saída. Módulos operacionais são planejados; ingestão local não significa recepção institucional. Não criar upload de GIR real no site público. Declaração estruturalmente válida pode continuar incompleta ou não comparável.

| Seção e âncora | Conteúdo | Forma e aceite |
|---|---|---|
| Início, #inicio | oecd_p2, propósito, estágio e atualização | Título claro; status concepção visível; link ao repositório somente com situação correta |
| Conceitos, #conceitos | Framework, motor, pacote, adaptador, página; introdução GloBE | Blocos curtos e glossário; explicar que 15% e limiar não resumem todo o regime |
| Arquitetura, #arquitetura | Núcleo, dados/IFRS, regras, pacotes, memória, testes, interfaces | Botões acessíveis e descrição textual de cada módulo |
| Etapas, #etapas | Contexto, dados, regras/escopo/eleições, bases, cálculo, coordenação, memória | Passos selecionáveis, avanço/retorno e progresso |
| Exemplo, #exemplo | Demonstração ordinária P05 | Três entradas, resultados intermediários, reset e limitações |
| Memória, #memoria | M01–M09 de P05 e ligações | Entradas, ajustes ilustrativos, regra e resultado identificáveis |
| Camadas, #camadas | Comum versus nacional | Tabela com dados/regras comuns e necessidade de validação doméstica |
| Evolução, #roadmap | F0 a F5 de P10 | Mostrar planejado/experimental/implementado com evidência; não confundir especificação com recurso entregue |
| Participação, #participacao | Estudar, revisar, testar e contribuir | Links para documentos existentes; nenhum formulário que simule envio |
| Fontes, #fontes | Bibliografia, corte, versão e limitações | Links oficiais e distinção entre fonte verificada e hipótese |

Wireframe desktop: cabeçalho com nome e menu; introdução com status; conceitos em coluna legível; arquitetura com lista de módulos e painel ao lado; etapas com seletor e explicação; simulador com entradas à esquerda e memória à direita; camadas, roadmap, participação e fontes em sequência. Mobile: mesma ordem em uma coluna; menu com botão de expansão; controles e painel abaixo do módulo selecionado; tabelas convertidas para cartões ou região com alternativa textual. O corpo da página não terá rolagem horizontal.

Não copiar toda documentação para uma tela única: detalhes em `details/summary` ou links. Conteúdo essencial e glossário aparecem no HTML inicial; com falha de JS, módulos e etapas continuam disponíveis como texto, e o exemplo manual 100/10/20 continua legível.

## Componentes e interações

| Componente | Estado, entrada e saída | Critério verificável |
|---|---|---|
| Menu | Fechado/aberto; botão e âncoras | aria-expanded coerente, teclado, foco visível e URL compartilhável |
| Glossário | Lista ou filtro opcional | Siglas explicadas sem depender de hover |
| Seleção de módulo | ID selecionado | Botão Enter/Espaço mostra finalidade, entradas, saídas, dependências e status |
| Fluxo guiado | Índice de 1 a 7 | Avançar/voltar preservam limites; seleção direta; progresso textual; sem autoavanço |
| Formulário didático | Renda, tributos e exclusão | Labels, unidades, validação associada ao campo e atualização após entrada válida |
| Resultado | ETR, percentual, excedente e imposto | Fórmulas e valores intermediários em português; região de anúncio com aria-live polite |
| Reset | Botão Restaurar exemplo | Restabelece 100/10/20, remove erros e anuncia resultado 4 |
| Memória | Nó selecionado | Liga valor a entrada/ajuste/regra, com natureza da evidência |
| Roadmap | Fase e status | Somente fatos de implementação comprovados recebem implementado |

Dados de módulos: núcleo recebe bases e retorna resultados; dados/IFRS recebe contas e retorna fatos conciliados; regras recebe contexto e retorna grafo aplicável; pacotes recebe jurisdição/período e retorna capacidades; memória recebe trilha e retorna evidência exportável; testes recebe cenários e retorna cobertura; interfaces recebe comandos e retorna relatórios. Todos esses módulos do motor aparecem como planejados/não suportados até implementação.

Etapas: contexto recebe grupo/período e registra hipótese; dados recebe fatos e gera validações; seleção recebe corpus/eleições e gera rota; bases recebe ajustes e gera conciliações; cálculo recebe partições e gera intermediários; coordenação recebe propriedade/pacotes e gera alocação quando suportada; memória reúne referências e versões. No demonstrador, contexto e bases são hipóteses e coordenação é omitida explicitamente.

## Contrato do demonstrador

Reutilizar o perfil `ordinary_synthetic_v1` do P05 como referência de intercâmbio futuro, sem acoplar a biblioteca ao DOM. Entradas locais: renda > 0, tributos ajustados ≥ 0 e exclusão ≥ 0. Valores finitos; campos vazios, negativos, NaN/infinito, texto arbitrário e múltiplos separadores são inválidos. Definir no formulário a sintaxe aceita: números sem separador de milhar, ponto ou vírgula para decimal, normalizados antes da validação. Não converter vazio em zero. Definir limite didático explícito e precisão de entrada na implementação, com mensagem correspondente.

A alíquota mínima é fixa em 15%. Cálculo didático: ETR=T/I; percentual=max(0; 0,15−ETR); excedente=max(0; I−S); resultado=percentual×excedente. Em 100/10/20, exibir 10%, 5%, 80 e 4,00 XUM. Mostrar também a comparação com exclusão zero: 5,00 XUM. Nenhuma atribuição automática a entidade, IIR ou UTPR.

Renda nula/negativa ou tributos negativos exigem explicação de cenário fora da cobertura; não usar fórmula ordinária. Um erro limpa ou marca como indisponível o resultado anterior, para não deixá-lo aparentar validade. Entrada negativa de exclusão é inválida; exclusão maior que renda é válida e produz excedente zero no exemplo. Ao digitar, anunciar sem interromper cada tecla; resultado somente após estado válido.

Hipóteses visíveis junto do formulário: grupo hipoteticamente no escopo; bases previamente ajustadas; jurisdição FICT-A; moeda XUM; sem QDMTT, safe harbours, ajustes adicionais, perdas, créditos/diferidos ou estruturas especiais. JavaScript binário poderá ser usado somente para visualização didática com essa limitação visível. O código não é o motor fiscal; integração futura exige decimais textuais e contrato P05/P07.

## Auditabilidade, camadas e participação

Memória recebe valores e fórmulas, mostra M01–M09 e referências S8 arts. 5.1–5.3 como referências localizadas. Ajustes +5 e -2 são metadados sintéticos sem fundamento jurídico atribuído. Não inventar identificadores de apuração oficial, parágrafos ou aprovação.

Tabela de camadas: núcleo comum propõe domínio/contratos/cálculo por perfil; pacote nacional exige lei, vigência, eleições e qualificação; adaptador contábil exige mapeamento da base; GIR exige conteúdo, XSD e regra de recepção. FICT-A/FICT-B sempre rotuladas fictícias. Nenhum país real tem suporte nesta entrega.

Participação: orientar leitura de docs e testes e, após confirmação remota, issues/PRs com dados sintéticos e governança existente. Se o remoto permanecer inacessível, mostrar destino informado e situação pendente, sem links afirmando serviço confirmado. Não prometer canal reservado ainda não configurado. Sem selos ou alegações de endosso.

## Arquivos, acessibilidade e publicação

Estrutura de execução: `site/index.html`, `site/assets/css/styles.css`, `site/assets/js/app.js` e `site/assets/data/` quando útil. HTML5 semântico, CSS e JS separados, recursos locais, fonte do sistema e sem backend. TypeScript, gerador ou biblioteca só mediante ADR que justifique benefício e dependências. Conteúdo estruturado deve ser compartilhado com docs quando isso reduzir divergência; nenhuma lógica normativa duplicada no frontend.

Usar skip link, landmarks, títulos em ordem, labels, mensagens ligadas por aria-describedby, estado inválido e foco destacado. Não depender só de cor ou hover. Preferir botões nativos/details a widgets complexos; abas customizadas exigem navegação completa por teclado. Contraste mínimo proposto WCAG AA: 4,5:1 texto normal e 3:1 texto grande/componentes relevantes. Respeitar prefers-reduced-motion e dispensar animação automática. Fornecer alternativa textual a diagramas.

Validar 360/768/1440 px, zoom, teclado, leitor de tela, console e falha de JS conforme W01–W12 de P08; registrar resultados reais na execução. Links oficiais, data 23/10/2026 e versão da página estarão visíveis. Otimização: sem fontes externas, imagens dispensáveis ou coleta de dados; estabelecer orçamento de recursos na implementação e medir em conexão limitada.

Preview por servidor estático no terminal RStudio conforme P07. Publicação pretendida: Pages com artefato da pasta site; caminhos relativos compatíveis com subdiretório. Inspecionar configuração antes de habilitar; respeitar proteção da branch/ambiente, registrar workflow, run, commit e URL retornada e verificar carregamento público. URL esperada não é evidência de publicação. README só recebe link de site após confirmação.

## Fechamento

Fontes: P11 e P05 do caderno, S8/S17 e catálogo compartilhado. Proposta: site estático progressivamente aprimorado. Aceite de concepção: conteúdo, wireframe, componentes, contrato, estrutura e testes definidos. Aceite de execução: página funcional e publicada permanece pendente de F0-web; nenhum teste de navegador ou deployment foi declarado concluído.
