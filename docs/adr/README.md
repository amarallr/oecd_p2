# Decisões de arquitetura propostas

Todos os ADRs abaixo estão em estado **proposta**, com data 2026-10-23. São escolhas reversíveis de concepção, sujeitas a validação por protótipo e revisão técnica.

Atualização F0: ADR-002, ADR-003 e ADR-004 orientam a preparação sem antecipar o motor. ADR-001 continua proposto: não há Python funcional confirmado. Para F0/F0-web, Node sem bibliotecas externas executa preview e verificações; não há dependências R a restaurar, portanto renv é não aplicável nesta fase. A página utiliza somente HTML/CSS/JS. O Node de referência em CI fica em `.node-version`, com compatibilidade local desde 18.19.1.

| ADR | Contexto | Decisão proposta | Alternativa e consequência | Critério de revisão |
|---|---|---|---|---|
| ADR-001 | Decimal fiscal e uso no RStudio | Núcleo Python Decimal; R para análise opcional | R com biblioteca decimal ou Java/.NET; segunda linguagem implica runtime e ambiente próprios | Executar exemplo com decimal, testar fronteiras e integração CLI no terminal RStudio |
| ADR-002 | Primeiro perfil local e auditável | Monólito modular, biblioteca e CLI, snapshots em arquivos | Serviços adicionam autenticação, rede e operação; reavaliar se concorrência exigir | F1 roda offline sem interface e produz memória integral |
| ADR-003 | Página introdutória de baixo custo | HTML/CSS/JS local sem backend | Framework/build adicionaria dependências sem requisito demonstrado | P11 funciona por teclado, em subdiretório, mobile e sem JS para conteúdo essencial |
| ADR-004 | Histórico tributário reproduzível | Bitemporalidade de regras e snapshots imutáveis | Atualização automática impossibilita reconstrução fiel de execução | Reexecutar snapshot antigo após publicação de novo corpus |
| [ADR-005](ADR-005-gir-bidirecional.md) | GIR como entrada, saída e fonte de conferência | Ingestão local e exportação separadas; declarado, normalizado e recalculado imutáveis | GIR somente saída impede revisão; serviço institucional anteciparia acesso e infraestrutura | Perfil seguro delimitado, proveniência, ausência de circularidade e história reproduzível; implementação pendente |

As justificativas e contratos constam em [P07](../P07-arquitetura.md), [P05](../P05-motor.md) e [P02](../P02-corpus.md). Fontes técnicas: S15–S17. Aprovar um ADR não concede suporte jurídico às regras.
