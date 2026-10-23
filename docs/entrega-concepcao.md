# Evidências da concepção inicial

Atualização posterior: o bloqueio inicial de consulta ao GitHub foi resolvido após criação pelo proponente. Consulte [a atualização do repositório](github.md). As evidências de ausência de Git e remoto abaixo são o registro histórico da primeira entrega.

Entrega v0.1.0, corte normativo 2026-10-23. A execução do caderno produziu concepção e contratos; não executou automaticamente os prompts de implementação futura, em conformidade com a delimitação expressa do próprio caderno.

## Entregas e critérios

| Etapa | Evidência entregue | Aceite de concepção | Gate ainda pendente |
|---|---|---|---|
| P00 | Carta, jornadas, escopo, mapa e indicadores | Objetivos com entregas/dependências definidos | Revisão técnica da carta |
| P01 | Requisitos transversais, ficha e cadeia de rastreabilidade | Contrato aplicado à documentação | Implementação e teste dos controles |
| P02 | Catálogo S1–S20, matriz temporal, conflitos, política e backlog | Inventário inicial e lacunas explícitas; nenhuma regra normativa habilitada | Corpus exaustivo e aplicabilidade revisada |
| P03 | Glossário, relações, 10 regras candidatas e grafo | Casos especiais identificados e resultados vinculáveis | Fichas normativas completas por período/país |
| P04 | Modelo, dicionário, convenções, pontes e qualidade | Agregados ilustrativos explicáveis sem frontend | IAS 12 vigente e schemas/adaptadores executáveis |
| P05 | Contrato, pseudocódigo, erros e memória | Exemplo manual refazível: 4 e comparação 5 | Motor, precisão implementada e testes |
| P06 | Dois manifestos sintéticos, compatibilidade e adoção | Extensões e limites explicitados | Pacotes executáveis e alocação F2 |
| P07 | C4 descritivo, ADRs, interfaces, ameaças e ambiente | Arquitetura independente de UI/serviço proposta | Prova offline e clone limpo; raiz RStudio/Git consolidada |
| P08 | T01–T25, W01–W12 e gate de liberação | Referências manuais, bloqueios e revisão planejados | Execução e revisão independente |
| P09 | Governança, comparação de licenças e contribuição | Papéis e processo definidos como propostas | Titularidade/licença efetiva, responsáveis e canal reservado |
| P11 | Conteúdo, wireframe, componentes, contrato, testes e publicação | Especificação da página completa | HTML/CSS/JS, navegador e deployment F0-web |
| P10 | Fases F0–F5, backlog, dependências e três prompts executáveis | Próximo incremento delimitado e auditável | Execução futura dos incrementos |

Os critérios normativos que exigem levantamento integral, julgamento de aplicabilidade ou revisão humana permanecem pendentes. A entrega não os transforma em aprovados por conter uma tabela de critérios.

## Verificações realizadas

O script [verificar-concepcao.cjs](../scripts/verificar-concepcao.cjs) percorreu os arquivos e confirmou a presença dos 12 prompts P00–P11 e dos 12 documentos correspondentes. Conferiu links relativos e parse de JSON, inclusive blocos JSON dos documentos, sem erros. A cópia integral do caderno é idêntica em bytes ao arquivo de entrada. O script pode ser executado de qualquer diretório porque resolve a raiz a partir de sua própria localização.

Um cálculo independente foi executado com o tipo `System.Decimal` do PowerShell: 10/100 = 0,1; 0,15 - 0,1 = 0,05; 100 - 20 = 80; 0,05 × 80 = **4,00**; com exclusão zero, **5,00**. Isso verifica a aritmética do exemplo, não um motor tributário implementado.

Integridade da entrada: SHA-256 `5c04d2ec12738753ef086ebf766028c6ddc23a5f624b33c23702b5db41d79a8b`. O [manifesto](manifesto-concepcao.json) registra hashes dos arquivos locais, excluindo a si próprio e o relatório gerado. O [relatório](verificacao-concepcao.json) registra a execução mais recente da verificação de artefatos. Hash não substitui versionamento Git nem autentica o conteúdo jurídico das fontes.

Com Node disponível, executar `node scripts/verificar-concepcao.cjs` a partir da raiz do projeto. Nesta máquina foi utilizado o executável Node incluído no RStudio, identificado no ambiente observado; isso não estabelece dependência de Node para o futuro motor. [organizar-prompts.cjs](../scripts/organizar-prompts.cjs) é utilitário desta rodada e espera o arquivo de entrada em `../tmp/`; a cópia integral já entregue permite ler os prompts sem esse arquivo externo.

## Situação de versionamento e publicação

O projeto RStudio preexistente foi preservado. Nenhum arquivo de sessão ou dado real entrou na entrega. Não foram criados motor, site, pacote nacional real, licença definitiva ou lock de dependências fictício.

O conector GitHub autenticado como amarallr retornou 404 para o alvo; a listagem acessível não o revelou, mas não comprova sua inexistência. Como o histórico não foi consultável, não se iniciou outro histórico Git potencialmente divergente. **Branch, commit, push, CI e publicação permanecem pendentes de F0/L06.** A preparação local e o roteiro de continuação estão completos para esta rodada de concepção, com as lacunas jurídicas e técnicas registradas.

Fontes consultadas: [catálogo](../sources/catalogo.md). Decisões propostas e lacunas: [registro](decisoes.md). Próximos incrementos: [F0](../prompts/execucao-F0.md), [F0-web](../prompts/execucao-F0-web.md), [F1](../prompts/execucao-F1.md).
