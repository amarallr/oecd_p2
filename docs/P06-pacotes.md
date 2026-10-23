# Contrato de pacotes nacionais

Um pacote declara capacidades e diferenças em relação ao núcleo. Parâmetros são valores previstos pelo contrato; substituições alteram decisões; extensões acrescentam etapas; apresentação e obrigação declarativa são camadas próprias. Nenhuma dessas categorias pode alterar silenciosamente uma execução histórica.

## Manifestos ilustrativos

Os manifestos abaixo são exemplos de contrato para F2. Não são pacotes executáveis, leis ou regras oficiais.

```json
{
  "pack_id": "fict_a",
  "jurisdiction_id": "FICT-A",
  "fictional": true,
  "software_version": "0.1.0-design",
  "legal_version": null,
  "translation_version": "pt-0.1",
  "compatible_core": ">=0.1.0 <0.2.0",
  "period_profile": "SYNTHETIC-PERIOD-01",
  "legal_valid_from": null,
  "legal_valid_to": null,
  "domestic_sources": [],
  "maintainer_role": "fictional-pack-maintainer",
  "elections": [],
  "capabilities": {"ordinary_demo": "planned", "dmtt": "unsupported", "iir": "unsupported", "utpr": "unsupported"},
  "qualification": {"status": "not_applicable", "official_evidence": null},
  "test_ids": ["T20", "T23"],
  "review_status": "proposed"
}
```

Segundo manifesto: `pack_id=fict_b`, `jurisdiction_id=FICT-B`, demais campos com o mesmo contrato e `period_profile=SYNTHETIC-PERIOD-01`. Diferença hipotética para testar extensão: `presentation_decimal_places=0` em FICT-B e 2 em FICT-A; altera somente a apresentação, nunca o valor canônico. Um cenário F2 separado deverá especificar diferenças sintéticas de alocação e resultados manuais antes de habilitar mecanismos. Esta concepção não inventa percentuais de legislação para fazê-lo.

## Compatibilidade e seleção

O resolvedor verifica versão de contrato, intervalo de núcleo, assinatura ou hash revisado, jurisdição, períodos e capacidades. Pacote real exige fontes domésticas, vigência jurídica e responsável identificados. Pacote fictício só é aceito em `mode=hypothetical`; nunca fornece default nacional. Falta de pacote real retorna não suportado, não herança genérica.

| Jurisdição | Período | Capacidade prevista | Situação atual |
|---|---|---|---|
| FICT-A | SYNTHETIC-PERIOD-01 | Contrato didático e apresentação | Apenas exemplo especificado |
| FICT-B | SYNTHETIC-PERIOD-01 | Diferença de apresentação e contrato F2 | Apenas exemplo especificado |
| Países reais | Não selecionado | DMTT/QDMTT, IIR, UTPR, GIR | Não suportado |

Para grupos multinacionais, carregar pacotes de localização e de cobrança, regra de coordenação e estrutura de propriedade em um único snapshot. Rejeitar conflito de capacidades e períodos; registrar o pacote que fundamenta cada decisão. DMTT não implica QDMTT: a qualificação externa tem evidência, escopo e calendário separados.

## Adoção e segurança

Checklist de adoção: identificar lei e regulamentos; mapear diferenças do núcleo; confirmar vigências; verificar qualificação oficial quando necessária; listar eleições; publicar matriz de capacidades; criar casos de dupla incidência e lacunas; revisar por especialistas; fixar dependências e pacote; validar instalação offline; liberar versão com notas de mudança.

Extensões declarativas devem usar schema limitado e validação. Código adicional só entra após revisão, testes e empacotamento confiável; não executar código arbitrário de manifestos nem instalar automaticamente do navegador. Dados permanecem sob controle do operador; distribuição não exige serviço central. Tradução não altera regra jurídica e tem versão separada.

## Fechamento

Fontes: P06/P01 e S13; leis nacionais ainda não selecionadas. Decisão proposta: manifesto com dimensões separadas e sem fallback nacional. Aceite: contrato, dois exemplos fictícios, compatibilidade e checklist definidos; pacotes executáveis, diferenças tributárias de F2 e revisão nacional pendentes.
