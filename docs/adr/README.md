# Decisões de arquitetura propostas

Todos os ADRs abaixo estão em estado **proposta**, com data 2026-10-23. São escolhas reversíveis de concepção, sujeitas a validação por protótipo e revisão técnica.

| ADR | Contexto | Decisão proposta | Alternativa e consequência | Critério de revisão |
|---|---|---|---|---|
| ADR-001 | Decimal fiscal e uso no RStudio | Núcleo Python Decimal; R para análise opcional | R com biblioteca decimal ou Java/.NET; segunda linguagem implica runtime e ambiente próprios | Executar exemplo com decimal, testar fronteiras e integração CLI no terminal RStudio |
| ADR-002 | Primeiro perfil local e auditável | Monólito modular, biblioteca e CLI, snapshots em arquivos | Serviços adicionam autenticação, rede e operação; reavaliar se concorrência exigir | F1 roda offline sem interface e produz memória integral |
| ADR-003 | Página introdutória de baixo custo | HTML/CSS/JS local sem backend | Framework/build adicionaria dependências sem requisito demonstrado | P11 funciona por teclado, em subdiretório, mobile e sem JS para conteúdo essencial |
| ADR-004 | Histórico tributário reproduzível | Bitemporalidade de regras e snapshots imutáveis | Atualização automática impossibilita reconstrução fiel de execução | Reexecutar snapshot antigo após publicação de novo corpus |

As justificativas e contratos constam em [P07](../P07-arquitetura.md), [P05](../P05-motor.md) e [P02](../P02-corpus.md). Fontes técnicas: S15–S17. Aprovar um ADR não concede suporte jurídico às regras.
