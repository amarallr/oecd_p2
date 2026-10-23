# Preparação do projeto F0

A raiz única de trabalho é a pasta `oecd_p2`, que contém `.git` e `oecd_p2.Rproj`. O arquivo do diretório-base foi movido para essa raiz; seu conteúdo anterior foi preservado em uma cópia de segurança fora do repositório, em `tmp/`. A pasta de sessão RStudio anterior não foi movida nem publicada.

Abra `oecd_p2.Rproj` por File → Open Project no RStudio. A sessão não restaura `.RData`, não salva workspace ou histórico automaticamente e usa UTF-8. O arquivo foi preparado e conferido; não afirmamos que a sessão gráfica do usuário tenha sido reaberta. O terminal do projeto deve apontar para a raiz que contém README e package.json.

## Dependências e comandos

As ferramentas atuais usam apenas a biblioteca padrão do Node. Node 18.19.1 foi localizado na distribuição RStudio desta máquina; a versão de referência de CI é 22.15.0, declarada em `.node-version`. Não há bibliotecas npm a instalar, e não se gera lock para dependências inexistentes. R 4.5.1 e Git 2.55.0 estão disponíveis. RStudio 2024.04.0+735 foi identificado pelo executável.

O Python encontrado no PATH é um alias WindowsApps; não foi confirmado runtime funcional. ADR-001 para núcleo Python/Decimal continua proposto para F1. Não há componentes R com dependências de pacotes nesta fase, portanto renv não foi inicializado e nenhum renv.lock artificial foi criado. Se componentes R forem introduzidos, inicializar/registrar/restaurar o ambiente conforme P07 antes de sua liberação.

No terminal com Node no PATH:

```text
node scripts/verificar-projeto.cjs
node --test tests/site.test.cjs
node scripts/servir-site.cjs
```

No Windows, `powershell -File scripts/servir-site.ps1` também procura o Node incluído no RStudio quando `node` não está no PATH. O servidor escuta apenas em localhost; o comando exibe o endereço e Ctrl+C o encerra. Esses comandos não executam um motor fiscal.

Git: `git status`, `git switch -c minha-alteracao`, `git diff`, `git add <arquivos>`, `git commit -m "tipo: descrição"` e `git push -u origin <branch>`. Nunca inclua tokens em comandos, URLs ou arquivos. A raiz foi vinculada ao histórico remoto existente; o transporte da sessão pode usar o conector autenticado se Git direto estiver sem rede.

## Licenciamento e pendências

Após comparar as opções em P09, o material original do projeto adota Apache-2.0, incluindo código, documentação e dados sintéticos. Isso simplifica a distribuição em relação à combinação de licenças antes proposta. Os materiais fornecidos e de terceiros conservam seus direitos, conforme NOTICE; nenhuma revisão jurídica institucional é presumida. Equipe de revisão, canal reservado de segurança e suporte normativo real continuam pendentes.

Validação de clone limpo e evidências web são registradas em [validação web](validacao-web.md). O bootstrap não instala ou antecipa o motor de F1.
