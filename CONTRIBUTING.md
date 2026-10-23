# Como contribuir

Leia o [README](README.md), a [governança](GOVERNANCE.md) e a [matriz de suporte](docs/suporte.md). Trabalhe a partir de `main` em uma branch própria. Descreva o problema e a mudança no PR; use commits convencionais, como `docs:`, `feat:` e `fix:`. Relacione alterações tributárias à fonte, interpretação, requisito e cenário. Não envie dados reais, credenciais ou documentos de terceiros sem direitos de redistribuição.

Abra `oecd_p2.Rproj` no RStudio ou use um terminal na raiz. Os componentes atuais usam apenas a biblioteca padrão do Node; não é necessário instalar pacotes npm. Execute `node scripts/verificar-projeto.cjs` e `node --test tests/site.test.cjs` após F0-web. Para alterações de interface, execute também o roteiro de navegador de [validação web](docs/validacao-web.md), quando disponível. Não declare conformidade normativa a partir desses testes.

Os arquivos originais do projeto são disponibilizados conforme [LICENSE](LICENSE). Ao contribuir, confirme que pode licenciar sua contribuição nesses termos. Materiais recebidos e normas de terceiros mantêm seus próprios direitos, conforme [NOTICE](NOTICE). Alterações de valor, vigência, classificação ou cobrança exigem revisão tributária e técnica por competências distintas. Traduções devem apontar a versão do conteúdo original.
