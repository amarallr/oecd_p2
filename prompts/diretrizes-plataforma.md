# Diretrizes atualizadas do projeto

Estas instruções complementam P00–P11 e os roteiros F0, F0-web e F1 com a visão incorporada ao README em 23/10/2026. O caderno CO-STAR v0.3 permanece como fonte histórica; os prompts individuais são versões de trabalho atualizadas.

## Objetivo e módulos

O objetivo de longo prazo é desenvolver uma Plataforma Nacional de Inteligência Tributária Internacional para operacionalização, fiscalização e análise do Pilar 2/GloBE no contexto brasileiro. O Open Pillar Two Framework é a base aberta, auditável, reutilizável e soberana dessa proposta, com componentes adaptáveis a outras jurisdições. Não presuma vínculo, adoção ou endosso institucional da Receita Federal do Brasil ou da OCDE.

| Capacidade futura | Responsabilidade |
|---|---|
| Integração com ERPs | Adaptadores para exportações e interfaces de SAP, Oracle, Microsoft, TOTVS e outros sistemas; balancetes, planos de contas, tributos correntes/diferidos, operações intercompany e consolidações. Validar cada integração antes de prometer cobertura. |
| Normalização e conciliação | Contratos canônicos, mapeamento contábil/GloBE e proveniência por campo, preservando período, moeda, entidade e jurisdição. |
| Motor GloBE | Cálculo determinístico, regras versionadas e memória integral; expansão gradual para QDMTT, IIR, UTPR, exclusões e safe harbours. |
| GIR | Entrada declaratória, saída produzida e fonte de conferência conforme P12. Separar ingestão local, exportação e recepção institucional; declarado, normalizado e recalculado imutáveis. Conteúdo, schema, intercâmbio e recepção doméstica distintos; JSON/CSV internos não são formatos oficiais sem fundamento. |
| SPED e documentos fiscais | Integrações planejadas com ECD, ECF, NF-e, EFD-Contribuições e EFD-ICMS/IPI, conforme disponibilidade, autorização e pertinência dos dados. |
| CbC | Ingestão da Declaração País-a-País e cruzamentos com ERP, SPED e GIR; seus agregados apoiam riscos e não substituem bases GloBE. |
| Inteligência fiscal | Ciência de dados, aprendizado de máquina, grafos societários, indicadores e leitura assistida de notas explicativas e divulgações financeiras, com evidências para revisão humana. |
| Painéis de auditoria | Grupos, ETR por jurisdição, inconsistências, riscos e vínculos documentais, distinguindo indícios de conclusões fiscais fundamentadas. |

A IA não decide obrigação tributária nem valor do imposto no motor normativo. A arquitetura inicial continua sendo biblioteca/CLI local e modular. Kafka, Spark, DuckDB, ClickHouse, Neo4j, FastAPI e ferramentas de IA são possibilidades futuras a justificar por requisitos e ADRs, sem adoção automática. Preserve código aberto e a licença vigente.

## Comunicação e implementação

Mantenha no README: introdução didática ao Pilar 2, objetivo, módulos e diagrama, caminho de implementação e situação real. Explique siglas e use fontes primárias verificadas, com escopo temporal e doméstico explícitos. Esclareça o mínimo de 15% por jurisdição, o enquadramento por receita consolidada, a diferença entre ETR e alíquota nominal, QDMTT/IIR/UTPR, GIR e simplificações. Preserve o exemplo sintético 100/10/20 → 4 com suas hipóteses e exclusões.

O diagrama Mermaid deve conectar fontes de dados, normalização, dados canônicos, regras, motor, memória, GIR, análise de riscos e painéis. Identifique entregas atuais e capacidades futuras e forneça alternativa textual. Não represente o demonstrador como motor operacional nem acrescente ao site dependências apenas para renderizar Mermaid.

Inclua GIR recebida → preservação/validação → declarado/normalizado → conciliação → recálculo quando suportado → comparação, além de motor → GIR produzida. Aritmética declarada não é recálculo independente. Dados insuficientes, perfil não suportado e verificação não executada têm estados próprios; campos materiais sem mapa bloqueiam conclusão. Perfis e fontes oficiais constam em P12 e sources/gir.md; não escolher XSD mais recente automaticamente nem anunciar importador inexistente.

Documentação de concepção, exemplos de contratos e página explicativa estão disponíveis nesta revisão; motor, pacotes nacionais e integrações ainda não estão implementados. Reconfirme esses estados antes de atualizações futuras. A visão ampliada não altera por si só os entregáveis existentes nem autoriza implementar módulos além da etapa solicitada. Registre divergências e proponha sua reconciliação na etapa pertinente.

## Execução e entrega

Quando o usuário digitar `doit`, releia `tmp/doit.txt` na raiz em UTF-8 e execute o conteúdo atual, respeitando as instruções aplicáveis do ambiente. Se ausente ou ilegível, informe o impedimento. Não reutilize uma leitura anterior. `tmp/` permanece ignorado pelo Git; não versionar seu conteúdo automaticamente.

Inspecione o trabalho existente e aplique P01. Nas entregas com commit e sincronização, revise o diff e os arquivos selecionados, execute verificações proporcionais, preserve o histórico e confirme a igualdade entre o commit local e a branch remota. Informe branch, hash e resultado. Não use force push nem descarte alterações existentes.
