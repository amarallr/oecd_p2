# ADR-005 — GIR recebida, produzida e conferida

Estado: **proposta de arquitetura incorporada à concepção**, 23/10/2026. Requisito autorizado pelo proponente; aprovação normativa e implementação não presumidas.

A GIR era representada principalmente como saída. A nova jornada deve permitir analisar uma declaração disponibilizada ao operador, mesmo sem existir motor completo. A [especificação P12](../P12-gir-entrada-conferencia.md) define fronteiras, entidades, segurança, cobertura e implementação gradual.

Decisão: separar adaptadores `gir/ingest` e `gir/export` com perfis versionados; manter conteúdo original, fatos declarados, normalizados e resultados recalculados em camadas imutáveis. Recepção institucional é externa ao primeiro escopo local. Não compartilhar o agregado recalculado como referência declarada. Comparação exige contexto conciliado, suficiência e independência classificada por parcela.

Alternativas: (1) tratar GIR só como saída impede conferência declaratória; (2) usar diretamente GIR como base do motor perde separação entre declarado e apurado; (3) criar serviço institucional de recepção agora antecipa autenticação, sigilo e acesso inexistentes. A alternativa local modular preserva soberania e não adiciona infraestrutura.

Consequências: novos contratos e matriz de cobertura antes do importador; nenhuma seleção automática de XSD mais recente; armazenamento original e snapshots exigem política de retenção e sigilo do operador. Identificação, mapeamento, validação estrutural, consistência, cálculo e aceitação fiscal terão evidências separadas.

Critérios de revisão: GIR-1 rejeita XML hostil e versão incompatível sem perder evidências; GIR-2 demonstra proveniência e campos não mapeados; GIR-4 prova ausência de circularidade; GIR-5 reconstrói uma visão antiga após correção. Nenhum desses critérios é reportado implementado nesta decisão.
