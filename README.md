# Open Pillar Two Framework

OECD Minimum Tax Implementation (Pillar Two).

`oecd_p2` é uma proposta de infraestrutura aberta para modelar, calcular, explicar e revisar tributação mínima global. Esta entrega é a concepção v0.1, com corte normativo em **23/10/2026**. O motor, os pacotes nacionais e a página interativa ainda não foram implementados. Não há suporte a obrigações tributárias reais nem endosso institucional.

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

A pasta contém especificações e exemplos de contrato, sem biblioteca de cálculo executável. O arquivo `oecd_p2.Rproj` do diretório-base foi preservado; a consolidação do projeto RStudio na raiz Git será realizada pelo prompt F0. O histórico remoto inicial foi identificado e será preservado na publicação dos artefatos.

Repositório confirmado: [amarallr/oecd_p2](https://github.com/amarallr/oecd_p2), público, branch `main`. O acesso foi confirmado após a criação pelo proponente; o bloqueio inicial de consulta está resolvido. A [atualização do repositório](docs/github.md) registra a continuidade do histórico. A publicação da página permanece pendente; nenhum endereço de site é anunciado como ativo.

Para começar, leia a carta, os contratos e o roadmap neste diretório. Para implementar, execute primeiro [F0](prompts/execucao-F0.md); abra o projeto resultante no RStudio conforme o roteiro de ambiente. Os comandos de restauração, exemplos e testes futuros serão documentados junto da implementação. Não há instalação de dependências necessária para ler esta concepção.

## Participação e licença

A governança propõe revisão técnica e tributária por competências distintas. Exemplos utilizam somente dados sintéticos. Apache-2.0 para código e CC BY 4.0 para documentação e dados sintéticos são recomendações em análise; esta concepção não declara a concessão de licenças pelos titulares nem incorpora textos normativos de terceiros.
