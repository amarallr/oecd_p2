# Carta do projeto

O projeto propõe um framework aberto que permita compartilhar contratos e métodos de revisão, mantendo explícitas as diferenças nacionais e temporais. Seu propósito público é reduzir duplicação técnica e tornar o cálculo inspecionável. O nome técnico é `oecd_p2`; Open Pillar Two Framework é o nome descritivo provisório.

## Resultados e limites

O framework abrange domínio, regras, contratos, motor, pacotes, validação e governança. O motor executa regras determinísticas; os adaptadores traduzem entradas e saídas; uma aplicação organiza a experiência de uso. A GIR é uma obrigação informacional que requer adaptador próprio. A página explicativa é uma apresentação pública e não executa apuração normativa.

O primeiro perfil será hipotético e ordinário, com jurisdições fictícias e dados sintéticos. Não inclui apuração nacional, transmissão de declarações, coordenação completa IIR/UTPR/QDMTT, estruturas especiais, cálculo de todos os ajustes ou assessoria tributária. STTR permanece fora do motor GloBE; eventual módulo futuro terá base jurídica e contrato separados.

Princípios de projeto: código aberto, neutralidade institucional, operação local e soberana, memória de cálculo exportável, reprodutibilidade, acessibilidade e minimização de dados. O benefício de reutilização depende da manutenção e da revisão das regras; não significa legislação uniforme.

## Pessoas e jornadas

| Persona | Jornada | Evidência de sucesso |
|---|---|---|
| Responsável por dados | Importar, validar, conciliar, corrigir | Cada agregado remonta à origem e cada erro indica o campo |
| Especialista tributário | Selecionar perfil e período, revisar eleições e fontes | Toda interpretação material tem revisão identificada |
| Contribuinte ou pesquisador | Simular e comparar hipóteses | Relatório distingue hipótese, incompletude e resultado calculado |
| Auditor | Refazer cálculo e comparar retificações | Insumos congelados e memória reproduzem o resultado |
| Desenvolvedor nacional | Instalar pacote, testar diferenças, exportar | Contrato e compatibilidade independem de fornecedor |
| Leitor iniciante | Entender conceitos e explorar exemplo | Reproduz 4 e identifica as limitações da demonstração |

As jornadas convergem em preparar dados → selecionar contexto → calcular dentro da cobertura → revisar → explicar → exportar. Um bloqueio em uma jurisdição não impede a documentação das demais, mas impede uma conclusão definitiva do grupo se afetar materialmente a coordenação.

## Coordenação e conclusão

O [índice](../README.md) registra o mapa e as dependências P00–P11. A coordenação cuida de escopo e decisões; curadoria normativa lidera P02/P03/P06; contabilidade e engenharia de dados lideram P04; engenharia lidera P05/P07/P11; revisores independentes lideram P08; mantenedores e assessoria jurídica lideram P09. São competências propostas, sem nomeações presumidas.

Indicadores propostos: 100% dos resultados declarados suportados ligados a regras e testes revisados; 100% dos casos materiais não cobertos bloqueados; repetição canônica idêntica; reconciliação integral sem diferenças inexplicadas; demonstrador 100/10/20 reproduzindo 4; site navegável por teclado e em tela de 360 px. Os indicadores não foram medidos nesta concepção.

Prioridades: resolver divergências do corpus; definir exercício e piloto real somente após levantamento; especificar dados antes do motor; preparar F0 e F0-web sem antecipar produção. As decisões, riscos e perguntas estão no [registro](decisoes.md). O plano imediato de P02 é inventariar fontes, localizar os dispositivos do perfil, estabelecer aplicabilidade doméstica e submeter a matriz temporal à revisão.

## Fechamento

Fontes: caderno v0.3 e [catálogo](../sources/catalogo.md), S1/S2. Decisões propostas: D01–D08. Lacunas: L01–L08. Aceite da concepção: visão, jornadas, limites, dependências, competências e indicadores definidos; revisão humana e liberação de suporte normativo pendentes. P11 especifica a página e P10 delimita sua execução futura.
