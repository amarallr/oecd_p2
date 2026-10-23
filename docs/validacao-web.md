# Evidências de validação F0 e F0 web

Este registro acompanha a preparação e implementação da página. Resultados serão preenchidos após executar as verificações; presença do roteiro ou workflow não significa aprovação. Os testes verificam uma demonstração hipotética e não conformidade normativa de um motor tributário.

## Resultados locais da execução

Em 23/10/2026, Node 18.19.1 validou a preparação e os recursos locais sem erros. Os 22 testes passaram, cobrindo fórmulas, limites, sintaxe e metadados. A mesma verificação e os mesmos 22 testes passaram em uma extração limpa de `git archive`, sem arquivos de sessão ou diretório herdado. O clone local por transporte Git foi bloqueado pelo sandbox; a evidência é de extração limpa, não de clone remoto.

O runner `node --test` tentou criar subprocesso, que o sandbox bloqueou com EPERM. A execução direta `node tests/site.test.cjs` usa o mesmo módulo node:test no processo e passou; é o comando documentado e usado em CI.

O servidor respondeu pelo subdiretório local. Chrome foi encontrado, mas o sandbox do Windows negou a criação de canais IPC e o navegador encerrou antes de abrir CDP. Portanto, navegação, revisão visual e acessibilidade no navegador não estão verificadas localmente. O workflow executa esse roteiro em Chromium e preserva capturas e relatório. Até seu run concluir, o estado é pendente, sem alegação de aprovação.

## Escopo

F0: configuração RStudio, prompts, arquivos de governança/licença e preparação sem dependências externas. F0-web: menu, módulos, etapas, formulário, fórmulas e memória, reset, mensagens acessíveis, conteúdo sem JavaScript, responsividade, links e console.

## Roteiro

Executar `node scripts/verificar-projeto.cjs --web` e `node tests/site.test.cjs`. Iniciar o servidor por `node scripts/servir-site.cjs`. O teste real de navegador usa Chromium disponível e CDP local, sem instalar biblioteca ou navegador. Executar `node scripts/testar-navegador.cjs` após iniciar o Chromium com o roteiro de publicação/preview. Screenshots e relatório ficam em `docs/evidencias/`; perfis e logs temporários são ignorados.

Comparar manualmente 100/10/20 → ETR 10%, percentual 5%, excedente 80 e imposto 4; exclusão zero → 5. Testar renda zero/negativa, tributos negativos, exclusão negativa/maior que a renda, vazio, texto, infinito, sintaxe decimal e reset. Verificar telas 360/768/1440 px, zoom 200%, teclado, foco, redução de movimento e página sem scripts.

## Limites

Leitor de tela humano, adoção doméstica, revisão tributária independente e operação gráfica do RStudio precisam de evidência própria; não são inferidos de automação. Deployment e URL só recebem status verificado depois da resposta efetiva do GitHub e inspeção do conteúdo público.
