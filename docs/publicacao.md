# Execução local e publicação da página

No terminal da raiz do projeto RStudio, execute `node scripts/servir-site.cjs`. Abra `http://127.0.0.1:8000/oecd_p2/`. No Windows sem Node no PATH, execute `powershell -File scripts/servir-site.ps1`. Para outra porta, use `node scripts/servir-site.cjs 8001`. Ctrl+C encerra o servidor. O conteúdo servido é somente a pasta site; abrir por file:// não substitui o teste por servidor.

## GitHub Pages

O workflow `.github/workflows/pages.yml` valida o projeto e o demonstrador, empacota somente site e usa GitHub Pages. Actions estão fixadas pelos commits consultados na preparação, com permissões de escrita apenas no job de deployment. O workflow de verificações é separado do deployment.

Se Pages ainda não estiver habilitado, o proprietário deve abrir Settings → Pages no repositório e selecionar GitHub Actions como fonte. O conector disponível nesta sessão não oferece administração de Pages, e `configure-pages` não habilita automaticamente o serviço usando apenas GITHUB_TOKEN. Nenhum token pessoal deve ser inserido em arquivo, workflow ou log. [Referência oficial do configure-pages](https://github.com/actions/configure-pages/blob/main/action.yml).

Depois de habilitar a fonte, execute o workflow Publicar página explicativa em Actions ou envie alteração no escopo de site. Registre o run, conclusão, commit e `page_url` retornado; confira os recursos públicos e o exemplo 4 em desktop e celular. Não trate a URL esperada como prova de publicação. O README só deve receber o link de site após essa confirmação.

Não há backend, cookies de analytics, cadastro ou coleta dos campos do demonstrador. O GitHub recebe requisições normais de hospedagem estática; o cálculo ocorre no navegador. Não publique dados reais, segredos, perfis de navegador ou caches.

Para QA com Chrome instalado, inicie um perfil temporário isolado em modo headless, com porta de depuração local 9224. Depois execute `node scripts/testar-navegador.cjs`. O teste recebe `P2_TEST_URL` e `P2_CDP_PORT` opcionalmente; o padrão usa o servidor e o subdiretório locais. O perfil não deve ser o perfil pessoal do usuário. Encerre os processos criados para QA após os testes.
