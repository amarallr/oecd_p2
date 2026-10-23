# Ambiente observado e preparação futura

Atualização posterior: o repositório foi criado pelo proponente e o acesso autenticado está confirmado. Consulte [GitHub](github.md). As observações de 404 abaixo descrevem a inspeção inicial, anterior à criação; não são o status atual.

Inspeção em 2026-10-23. Base observada: diretório de trabalho fornecido pelo usuário; caminhos do projeto permanecem relativos. A base contém `tmp/`, `.Rproj.user/` e `oecd_p2.Rproj`. Não havia `.git` nem subdiretório oecd_p2 antes desta entrega. `git rev-parse --show-toplevel` informou que a base não era repositório.

| Item | Evidência observada | Limite |
|---|---|---|
| Git | 2.55.0.windows.4 | Não havia remotes/histórico local a listar |
| R | Rscript executou R 4.5.1, 2025-06-13 ucrt | Startup avisou falhas em categorias LC_* com C.UTF-8; execução simples concluiu |
| RStudio | Executável encontrado, versão 2024.04.0+735 | Não aberto/controlado nem validado interativamente nesta rodada |
| Node | Executável incluído no RStudio, versão de arquivo 18.19.1 | Usado para organizar e verificar artefatos, não como dependência do motor |
| Python | Nome python.exe encontrado como alias WindowsApps | Runtime funcional não confirmado; não afirmar instalado |
| GitHub CLI | gh não encontrado no PATH | Conector GitHub utilizado na leitura remota |
| GitHub autenticado | Conector identificou amarallr | Não prova acesso a todos os repositórios da conta |
| Repositório alvo | get_repo amarallr/oecd_p2 retornou 404 | Pode significar inexistência ou inacessibilidade |
| Listagem acessível | Retornou outros dois repositórios da conta | Não prova ausência do alvo fora do escopo do conector |

O `.Rproj` existente usa RestoreWorkspace No, SaveWorkspace No e Encoding UTF-8; AlwaysSaveHistory é Default. F0 propõe No para histórico e consolidará uma única raiz, preservando arquivo/sessão existente. Nesta rodada não houve instalação, inicialização renv, abertura no RStudio, criação de remoto, commit, push, CI ou publicação. A concepção fica em `oecd_p2/` para preparar a raiz futura, sem duplicar `.Rproj`.

## Roteiro de preparação

1. Inspecionar base, projeto, Git e remoto; resolver acesso ao alvo. Havendo histórico remoto, clonar/reutilizar primeiro e reconciliar os documentos, sem histórico inicial independente.
2. Consolidar uma única raiz oecd_p2; ajustar projeto RStudio após preservar os arquivos existentes. Documentar abertura pelo menu Open Project e alternativa via terminal.
3. Confirmar Python real e versão suportada pela arquitetura aprovada; criar ambiente isolado e dependências declaradas. Para componentes R efetivos, inicializar renv, revisar ativação, gerar lock e restaurar de clone limpo. Não assumir um lock preparado como prova de restauração.
4. Documentar comandos disponíveis somente após implementá-los. Rodar exemplos sintéticos e testes compatíveis com a fase; via Rscript para código R. Não relatar teste de motor antes de F1.
5. Revisar `.gitignore`, arquivos e diff; criar commit convencional; sincronizar o remoto confirmado conforme políticas, abrindo PR se necessário; registrar branch/hash/remoto.
6. F0-web: servidor estático em localhost e testes P08/P11; publicação Pages com URL efetivamente verificada.

Bloqueio remoto específico: L06. Commit, branch e hash remoto não existem nesta entrega. A ausência de sincronização está explícita; não houve tentativa de substituir origin nem criar repositório duplicado.
