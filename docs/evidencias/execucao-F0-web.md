# Execução da preparação e página interativa

Em 23/10/2026, o F0 foi preparado e sincronizado no commit `3ed3bb1767758382f3d619528ee3b45d5d5b4673`. A implementação inicial F0-web está em `1055fbc7d8f4f820860698486afcb14f2503e0f9`; o gate de navegador antes de deployment está em `f5a85431618ff18e58a64b0a59a7d3803e8e8810`.

| Verificação | Resultado observado |
|---|---|
| Projeto, recursos e âncoras locais | Sem erros |
| Contrato do demonstrador | 22 testes aprovados, nenhum reprovado |
| Extração limpa de git archive | Preparação e 22 testes aprovados |
| Clone local por transporte Git | Bloqueado pelo sandbox Windows; não declarado aprovado |
| Chrome local | Bloqueado por negação de canais IPC; sem validação visual local |
| CI de navegador | Workflow preparado; aguardando execução registrada |
| GitHub Pages | Workflow preparado; habilitação e deployment ainda não verificados |

O F0 não abriu a sessão gráfica do RStudio nem implementou o motor. O F0-web contém todos os arquivos e interações locais; sua liberação pública depende da validação de navegador e do deployment. O roteiro está em [publicação](../publicacao.md); a validação detalhada está em [validação web](../validacao-web.md).
