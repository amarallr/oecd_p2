# Open Pillar Two Framework

OECD Minimum Tax Implementation (Pillar Two).

`oecd_p2` é uma infraestrutura aberta em desenvolvimento para modelar, calcular, explicar e revisar tributação mínima global. O corte normativo inicial é **23/10/2026**. O projeto RStudio está preparado em F0; o motor e os pacotes nacionais ainda não foram implementados. Não há suporte a obrigações tributárias reais nem endosso institucional.

## Documentos da concepção

| Etapa | Entrega | Dependências |
|---|---|---|
| P00 | [Carta do projeto](docs/P00-carta.md) | P01 |
| P01 | [Contrato comum](docs/P01-contrato.md) | Caderno v0.3 |
| P02 | [Corpus e temporalidade](docs/P02-corpus.md) | P00 e P01 |
| P03 | [Domínio e regras](docs/P03-dominio.md) | P02 |
| P04 | [Dados e contabilidade](docs/P04-dados.md) | P02 e P03 |
| P05 | [Motor e memória](docs/P05-motor.md) | P02 a P04 |
| P06 | [Pacotes nacionais](docs/P06-pacotes.md) | P02 a P05 |
| P07 | [Arquitetura e ambiente](docs/P07-arquitetura.md) | P02 a P06 |
| P08 | [Validação](docs/P08-validacao.md) | P03 a P07 e P11 |
| P09 | [Governança](docs/P09-governanca.md) | P00 a P08 |
| P11 | [Especificação da página](docs/P11-pagina.md) | P00 a P09 |
| P10 | [Roadmap e próximos prompts](docs/P10-roadmap.md) | P00 a P09 e P11 |

Consulte também [decisões e lacunas](docs/decisoes.md), [fontes verificadas](sources/catalogo.md), [cobertura](docs/suporte.md), [ambiente observado](docs/ambiente.md), [ADRs](docs/adr/README.md), [prompts originais](prompts/README.md) e [evidências da entrega](docs/entrega-concepcao.md).

## Situação técnica

A pasta contém especificações e exemplos de contrato, sem biblioteca de cálculo executável. O arquivo `oecd_p2.Rproj` está na raiz Git, com sessão limpa e UTF-8. Seu conteúdo anterior foi preservado em backup fora do repositório. O histórico remoto inicial foi preservado.

Repositório confirmado: [amarallr/oecd_p2](https://github.com/amarallr/oecd_p2), público, branch `main`. O acesso foi confirmado após a criação pelo proponente; o bloqueio inicial de consulta está resolvido. A [atualização do repositório](docs/github.md) registra a continuidade do histórico. A publicação da página permanece pendente; nenhum endereço de site é anunciado como ativo.

Abra `oecd_p2.Rproj` no RStudio ou use o terminal na raiz. Leia o [guia de preparação F0](docs/ambiente-F0.md). Node 18.19.1 ou superior executa as ferramentas atuais, sem instalar bibliotecas; a versão de referência fica em `.node-version`. O núcleo Python/Decimal permanece decisão de F1. Não há pacotes R dependentes de renv nesta fase.

## Participação e licença

Consulte [CONTRIBUTING](CONTRIBUTING.md), [GOVERNANCE](GOVERNANCE.md), [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md) e [SECURITY](SECURITY.md). Exemplos utilizam somente dados sintéticos. O material original do projeto adota [Apache-2.0](LICENSE); materiais recebidos e de terceiros conservam seus direitos conforme [NOTICE](NOTICE). Não há parecer jurídico institucional ou licença de documentos normativos implícita.
