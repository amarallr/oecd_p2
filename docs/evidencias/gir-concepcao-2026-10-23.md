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
| XSD, importação XML e recálculo | Não executados | Não há XSD fixado, leitor ou motor fiscal nesta entrega |

O workflow de CI executa cobertura de navegador para a página e a apresentação e verifica os testes de contrato. Resultados de workflow e publicação devem ser consultados após o push, antes de afirmar que a versão pública já foi atualizada.

## Implementação e pendências

Implementados nesta rodada: especificação, decisão proposta, fonte de metadados, contratos e exemplo JSON sintético, testes de integridade e explicações nos artefatos públicos. **Não** foram implementados importador, leitor XML, validação XSD, motor GloBE, cruzamentos institucionais ou exportador/transmissor GIR. A fixture não é XML GIR oficial e não deve ser anunciada como validada pela OCDE.

Dependências abertas: fixar legalmente um perfil XSD e hashes de dependências, homologar seletores e cardinalidades, identificar requisitos domésticos e autorização de recepção, prototipar parser seguro/idempotente e confirmar o calendário 16–24/06/2028 registrado em CONFLICT-02. Próxima tarefa delimitada: [prompt GIR-1](../../prompts/execucao-GIR1.md).
