# Validação da apresentação

Verificação local em 23/10/2026, com Node 18.19.1 e Chrome headless em perfil temporário isolado. Página testada por HTTP em `/oecd_p2/apresentacao.html`, incluindo os caminhos de hospedagem em subdiretório.

O roteiro `scripts/testar-navegador.cjs`, com `P2_TEST_URL` apontando para a apresentação, executou sete grupos de verificações: dez temas e âncoras; modo de slides e teclado; seis camadas selecionáveis; cálculos independentes, entradas inválidas e reset; todos os temas nas larguras 360, 768 e 1440 px; saída por Esc, movimento reduzido e impressão; leitura sem JavaScript. Não houve erros de console ou HTTP. O PDF gerado contém dez páginas. Capturas de desktop, arquitetura, cálculo e celular foram inspecionadas visualmente.

O contrato didático manteve os 22 testes aprovados. A página explicativa principal passou nos 17 checks do roteiro de navegador, além da verificação de estrutura e recursos locais.

O roteiro anterior recebeu correções necessárias para sua execução: Enter passou a incluir o texto do evento de teclado; uma expressão que chamava indevidamente um booleano foi corrigida; o teste de reflow usa viewport CSS equivalente a 200% em vez de `style.zoom`, que não reproduz a alteração de media queries do zoom do navegador.

Os arquivos de QA da apresentação ficam em `tmp/apresentacao-qa/` e não são publicados no site. O CI também preserva esses arquivos como artefatos. Não houve revisão humana com leitor de tela ou validação normativa; testes didáticos não comprovam conformidade tributária. O botão de tela cheia depende das permissões e do suporte do navegador.
