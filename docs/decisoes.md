# Registro de decisões e lacunas

Versão da concepção: 0.1.0, em 2026-10-23. “Validada pelo proponente” abaixo significa escolha expressa no caderno, sem aprovação normativa ou revisão técnica presumida.

| ID | Decisão | Estado | Fundamento e consequência |
|---|---|---|---|
| D01 | Identificador oecd_p2, RStudio e remoto amarallr/oecd_p2 | Validada pelo proponente | P00/P07; existência remota ainda não confirmada |
| D02 | Começar por jurisdições fictícias e dados sintéticos | Validada pelo proponente | Sem país real ou exercício escolhido |
| D03 | Monólito modular, biblioteca/CLI local | Proposta | ADR-002; offline e menor operação |
| D04 | Núcleo Python Decimal, R opcional para análise | Proposta | ADR-001; validar protótipo e integração no RStudio |
| D05 | Apache-2.0 para código; CC BY 4.0 para docs/dados originais | Proposta | P09; titularidade, texto e compatibilidade ainda por revisar |
| D06 | Revisão técnica e tributária distintas para mudança material | Proposta | Governança P09; revisores não nomeados |
| D07 | Página HTML/CSS/JS sem backend | Proposta | ADR-003; execução futura F0-web |
| D08 | Snapshots e regras bitemporais sem atualização silenciosa | Proposta | ADR-004; determinismo histórico |
| D09 | Preservar .Rproj existente e consolidar raiz no F0 | Proposta | Evitar mover sessão ativa ou criar projeto duplicado |
| D10 | Reutilizar histórico inicial remoto confirmado | Validada | Repositório público acessível, branch main e commit inicial 468aafcde89147fa31ead7ad767a9d87dd946de8; preservar a ancestralidade |

## Lacunas materiais

| ID | Questão e evidência | Impacto e próximo passo | Competência |
|---|---|---|---|
| L01 | Commentary 2026 tem descrições de cobertura até janeiro e maio | Conferir incorporação por tema; não escolher resumo como regra universal | Curadoria/revisão tributária |
| L02 | IAS 12 consolidada não obtida; PDF redireciona para assinatura | Obter acesso legítimo e validar parágrafos, emendas e adoção aplicáveis | Contabilidade |
| L03 | Nenhum país e exercício real selecionado | Levantar legislação/qualificação antes do piloto | Curadoria nacional |
| L04 | Eleições, transições e orientações não exaustivamente analisadas | Fechar perfil e casos especiais por fonte/período | Revisão tributária |
| L05 | GIR/XSD e intervalo de intercâmbio 16–24/06/2028 por esclarecer | Revisar instrumentos e regras de recepção; bloquear seleção presumida | Declarações/engenharia |
| L06 | Resolvida a consulta remota após criação pelo proponente | Público, acesso de escrita e main confirmados; continuidade documentada em github.md | Mantenedor |
| L07 | Licenças, titulares, revisores e canal reservado não confirmados | Formalizar governança e direitos na liberação | Mantenedores/jurídico |
| L08 | Exemplos oficiais e corpus histórico completos ainda não revisados | Catalogar referências e direitos, derivar esperados independentes | Curadoria/validação |

Riscos principais: falso suporte internacional; perda de rastreabilidade por atualização; mistura de moedas/categorias; vazamento por exemplo/log; dependência de mantenedor único. Controles estão em P01/P04/P07/P08/P09. A pergunta prioritária futura é qual país e exercício justificam um piloto **após** levantamento. Ela não bloqueia os contratos e os casos sintéticos atuais.
