# Evidências da extensão GIR · 23/10/2026

## Resultado

A GIR passou a ser especificada como entrada de conferência e saída futura, em percursos distintos. O documento normativo interno é [P12](../P12-gir-entrada-conferencia.md); a arquitetura foi registrada em [ADR-005](../adr/ADR-005-gir-bidirecional.md). Fontes consultadas e lacunas de XSD estão em [sources/gir.md](../../sources/gir.md).

## Artefatos

- Contratos e trilha de implementação: `docs/P12-gir-entrada-conferencia.md`, `docs/adr/ADR-005-gir-bidirecional.md`, `docs/P04-dados.md`, `docs/P05-motor.md`, `docs/P07-arquitetura.md`, `docs/P08-validacao.md`, `docs/P10-roadmap.md`, `docs/P00-carta.md`, `docs/P11-pagina.md`, `docs/decisoes.md`, `docs/suporte.md` e índice de ADRs.
- Fontes oficiais e cobertura: `sources/gir.md` e `sources/catalogo.md`.
- Prompts: P01, P04, P07, P08, P10, P11, P12, execução GIR-1, índice e diretrizes da plataforma.
- Exemplo não oficial e sintético: `examples/gir-review-synthetic.source.json` e `examples/gir-review.design.json`. Hashes conferem com os bytes locais; sem XSD ou parser.
- Comunicação pública: README, página (`site/index.html`), apresentação (`site/apresentacao.html` e `site/assets/js/apresentacao.js`) e metadados `site/assets/data/project.json`. Ambos os percursos são identificados como planejados.
- Integridade: `tests/gir-design.test.cjs`; checagem de presença e status público em `scripts/verificar-projeto.cjs`; workflow de verificações e Pages.

## Verificações desta rodada

| Verificação | Resultado | Alcance |
|---|---|---|
| `scripts/verificar-projeto.cjs --web` (Node 18.19.1) | Aprovada, sem erros | Preparação e recursos locais; não valida regras fiscais |
| `tests/gir-design.test.cjs` | 6 testes aprovados | Hash/proveniência, não circularidade, ambos os percursos e links; não importa GIR |
| `tests/site.test.cjs` | 22 testes aprovados | Demonstrador JavaScript já existente e metadados |
| Navegador local | Não concluído | Chrome encerrou antes de abrir a porta CDP; navegador e impressão permanecem dependentes do CI |
| CI de verificações e navegador | Sucesso no commit `6feed5e` | [Workflow de verificações](https://github.com/amarallr/oecd_p2/actions/runs/40043129733); incluiu página e apresentação, navegação responsiva e impressão PDF de 11 temas |
| Publicação GitHub Pages | Sucesso no commit `6feed5e`; página retornou HTTP 200 e contém ambos os percursos | [Workflow de publicação](https://github.com/amarallr/oecd_p2/actions/runs/40043129772); [apresentação publicada](https://amarallr.github.io/oecd_p2/apresentacao.html) |
| XSD, importação XML e recálculo | Não executados | Não há XSD fixado, leitor ou motor fiscal nesta entrega |

Os workflows confirmaram o commit publicado. Isso cobre o navegador e a impressão da apresentação, mas não valida conteúdo GIR via XSD, importação XML ou apuração tributária.

## Implementação e pendências

Implementados nesta rodada: especificação, decisão proposta, fonte de metadados, contratos e exemplo JSON sintético, testes de integridade e explicações nos artefatos públicos. **Não** foram implementados importador, leitor XML, validação XSD, motor GloBE, cruzamentos institucionais ou exportador/transmissor GIR. A fixture não é XML GIR oficial e não deve ser anunciada como validada pela OCDE.

Dependências abertas: fixar legalmente um perfil XSD e hashes de dependências, homologar seletores e cardinalidades, identificar requisitos domésticos e autorização de recepção, prototipar parser seguro/idempotente e confirmar o calendário 16–24/06/2028 registrado em CONFLICT-02. Próxima tarefa delimitada: [prompt GIR-1](../../prompts/execucao-GIR1.md).
