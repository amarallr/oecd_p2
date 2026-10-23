# Governança aberta e licenciamento

A governança deve permitir estudo, revisão e contribuição sem exigir dados reais, contratação de serviço ou autorização individual para usos permitidos pela licença escolhida. Custos de implantação e manutenção existem mesmo com código gratuito. Nenhuma afiliação à OCDE, IFRS ou governo é presumida pelo nome ou pelos documentos.

## Licenças propostas

| Opção | Característica relevante | Avaliação para o projeto |
|---|---|---|
| Apache-2.0 | Licença permissiva com disposições expressas de patentes e atribuição | Recomendação inicial para código; conferir dependências e titulares antes de aplicar |
| MIT | Permissiva e curta, preservando aviso e licença | Alternativa simples; avaliar adequação institucional e tratamento de patentes |
| Copyleft | Pode condicionar distribuição de derivados à preservação de liberdades | Avaliar por licença concreta e modo de integração; texto GPLv3 não acessado nesta rodada |

Fontes verificadas: [Apache](https://www.apache.org/licenses/LICENSE-2.0.html) e [MIT](https://opensource.org/license/mit). A compatibilidade com dependências futuras não pode ser declarada antes de inventário. Nenhuma licença deve discriminar país, atividade ou posição política. A proposta de código é Apache-2.0; documentação original e dados sintéticos têm proposta CC BY 4.0, cujo texto e titularidade ainda exigem verificação na adoção. Não foi aplicado um LICENSE definitivo nesta concepção.

Normas e materiais de terceiros não herdam a licença do projeto. Avaliar direitos por documento; preferir links e referências a redistribuição integral. Não atribuir uma licença universal a todo material OCDE/IFRS. Marca, nome e eventuais sinais institucionais são questão separada da licença de código.

## Papéis e decisões

| Papel | Responsabilidade | Impedimento de aprovação isolada |
|---|---|---|
| Mantenedor | Revisar integração, releases e documentação | Não atestar sozinho regra tributária que implementou |
| Curador normativo | Corpus, vigências e rastreabilidade | Não presumir aplicação doméstica sem evidência |
| Revisor tributário | Validar interpretação, períodos e casos | Declarar conflito de interesse e abster-se quando necessário |
| Revisor técnico | Determinismo, segurança e testes | Revisão adicional para mudança material de cálculo |
| Responsável nacional | Diferenças domésticas e suporte do pacote | Não declarar qualificação sem evidência externa |

Fluxo proposto: issue ou RFC descreve problema e fontes → discussão pública sem dados reais → interpretação e ADR se necessários → implementação/testes → revisão por competências → decisão fundamentada → release. Divergências jurídicas ficam registradas com opções e alcance; sem solução, a capacidade permanece bloqueada. Divergência técnica sem impacto jurídico pode ser decidida pelo mantenedor com justificativa e possibilidade de revisão por outro mantenedor.

Mudança em imposto, vigência, classificação ou mecanismo exige revisão tributária e técnica por pessoas/competências distintas. Alteração editorial não adquire esse gate. Formar ao menos dois mantenedores para reduzir dependência individual; buscar financiamento e cooperação com divulgação de conflitos, sem prioridade exclusiva sobre o corpus.

## Documentos de repositório e contribuição

F0 deverá preparar README, CONTRIBUTING, GOVERNANCE, CODE_OF_CONDUCT, SECURITY, CHANGELOG e matriz de suporte. CONTRIBUTING explicará clone, ambiente RStudio/terminal, branch e PR, testes apropriados e vínculo com requisito. Propor atestado de autoria e direito de contribuir, com mecanismo definitivo a decidir; não exigir cessão de dados reais.

SECURITY deverá oferecer canal reservado **real e verificado** antes da publicação operacional; nenhum endereço é inventado aqui. Enquanto não houver canal, não solicitar detalhes sensíveis em issues públicas. Publicar correções com versões afetadas e mitigação sem expor contribuintes. O código de conduta terá procedimentos, responsáveis e recurso definidos antes de anunciar sua operação.

Idiomas: português inicial e glossário inglês; preparar versões en/pt com versão fonte e revisão de tradução. Tradução não altera interpretação jurídica. Repositório canônico pretendido: amarallr/oecd_p2; projeto .Rproj é conveniência de desenvolvimento, não dependência de uso.

## Fechamento

Fontes: S18/S19; S20 inacessível; P09. Decisões propostas: D05/D06. Lacunas: titulares/licenças, inventário de dependências, revisores nomeados e canal reservado. Aceite: modelo de manutenção, licenças comparadas e fluxo definidos; concessão efetiva de licença e capacidade de distribuição verificada pendentes.
