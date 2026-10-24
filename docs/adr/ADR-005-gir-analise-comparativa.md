# ADR-005 — GIR como fonte de entrada e relatório comparativo

Estado: **proposta de arquitetura incorporada à concepção**, 23/10/2026. Requisito autorizado pelo proponente; aprovação normativa e implementação não presumidas.

A GIR era representada principalmente como saída. A declaração recebida deve ser uma fonte de entrada ao lado das fontes contábeis, fiscais e societárias; preparação e núcleo consolidam e cotejam os dados, e o relatório comparativo aparece na etapa de resultados. A [especificação P12](../P12-gir-entrada-conferencia.md) define fronteiras, entidades, segurança, cobertura e implementação gradual.

Decisão: implementar somente o adaptador planejado `gir/ingest` com perfis versionados; manter conteúdo original, fatos declarados, normalizados e resultados recalculados em camadas imutáveis. A preparação inicia cotejamentos com as demais fontes; o núcleo aprofunda comparações e só recalcula com suporte suficiente. A saída é um relatório analítico e evidências. **Não haverá adaptador nem arquivo GIR de saída.** Recepção institucional é externa ao escopo local.

Alternativas: (1) tratar a GIR só como saída impede conferência declaratória; (2) usar diretamente a GIR como única base do motor perde comparação com dados independentes; (3) criar serviço institucional de recepção antecipa autenticação, sigilo e acesso inexistentes. Um arquivo GIR gerado não atende ao resultado solicitado, que é relatório do cotejamento da GIR de entrada com as demais fontes.

Consequências: novos contratos e matriz de cobertura antes do importador; nenhuma seleção automática de XSD mais recente; armazenamento original e snapshots exigem política de retenção e sigilo do operador. Identificação, mapeamento, validação estrutural, consistência, cálculo e aceitação fiscal terão evidências separadas.

Critérios de revisão: GIR-1 rejeita XML hostil e versão incompatível sem perder evidências; GIR-2 demonstra proveniência e campos não mapeados; GIR-4 prova ausência de circularidade; GIR-5 reconstrói uma visão antiga após correção. Nenhum desses critérios é reportado implementado nesta decisão.
