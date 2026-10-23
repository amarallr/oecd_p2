# Evidências de validação F0 e F0 web

Este registro acompanha a preparação e implementação da página. Resultados serão preenchidos após executar as verificações; presença do roteiro ou workflow não significa aprovação. Os testes verificam uma demonstração hipotética e não conformidade normativa de um motor tributário.

## Escopo

F0: configuração RStudio, prompts, arquivos de governança/licença e preparação sem dependências externas. F0-web: menu, módulos, etapas, formulário, fórmulas e memória, reset, mensagens acessíveis, conteúdo sem JavaScript, responsividade, links e console.

## Roteiro

Executar `node scripts/verificar-projeto.cjs --web` e `node --test tests/site.test.cjs`. Iniciar o servidor por `node scripts/servir-site.cjs`. O teste real de navegador usa Chromium disponível e CDP local, sem instalar biblioteca ou navegador. Executar `node scripts/testar-navegador.cjs` após iniciar o Chromium com o roteiro de publicação/preview. Screenshots e relatório ficam em `docs/evidencias/`; perfis e logs temporários são ignorados.

Comparar manualmente 100/10/20 → ETR 10%, percentual 5%, excedente 80 e imposto 4; exclusão zero → 5. Testar renda zero/negativa, tributos negativos, exclusão negativa/maior que a renda, vazio, texto, infinito, sintaxe decimal e reset. Verificar telas 360/768/1440 px, zoom 200%, teclado, foco, redução de movimento e página sem scripts.

## Limites

Leitor de tela humano, adoção doméstica, revisão tributária independente e operação gráfica do RStudio precisam de evidência própria; não são inferidos de automação. Deployment e URL só recebem status verificado depois da resposta efetiva do GitHub e inspeção do conteúdo público.
