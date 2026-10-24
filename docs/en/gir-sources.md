# GIR source register

**Language / Idioma:** [English (US)](gir-sources.md) · [Português (Brasil)](../../sources/gir.md)

Sources issued by the OECD/Inclusive Framework; reviewed October 23, 2026. This is a selective reading for project architecture, not a complete legal review or domestic adoption statement.

| Source | Publication/version | Use and limitations |
|---|---|---|
| [GloBE Information Return (Pillar Two) XML Schema, October 2026](https://www.oecd.org/en/publications/globe-information-return-pillar-two-xml-schema-october-2026_1552c9aa-en.html) | October 20, 2026; schema 2.0 | Official page and [guide PDF](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/10/globe-information-return-pillar-two-xml-schema-october-2026_9ed0ae23/1552c9aa-en.pdf), selected pages on version/namespace, correction references and XSD filenames. The XSDs were not downloaded or pinned. |
| [GloBE Information Return, September 2026](https://www.oecd.org/en/publications/tax-challenges-arising-from-the-digitalisation-of-the-economy-globe-information-return-september-2026_0f9da895-en.html) | September 11, 2026 | Selective reporting excerpts; some simplified reporting may not provide enough granularity to reproduce all tax bases. Applies to fiscal years beginning on or after December 31, 2025, as described in that edition. |
| [Guidance on the Use of the GIR XML Schema and Validation Rules for First GIR Filings and Exchanges](https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/global-minimum-tax/guidance-on-the-use-of-globe-information-return-xml-schema-june-2026.pdf) | June 2026; approval noted as June 3; publication day unconfirmed | Early sections distinguish GIR content from XML fields and discuss first-cycle exchanges. Do not generalize to other profiles without review. |
| [GloBE Information Return (Pillar Two) Status Message XML Schema](https://www.oecd.org/en/publications/globe-information-return-pillar-two-status-message-xml-schema_449e3cc3-en.html) | July 30, 2025; exact technical XSD version unverified | Exchange status messages are separate from the declaration and do not establish tax correctness. |
| [GloBE Information Return (Pillar Two) XML Schema](https://www.oecd.org/en/publications/globe-information-return-pillar-two-xml-schema_c594935a-en.html) | January 15, 2025; version 1.0 per the 2026 guide | Earlier edition. Applicability depends on exchange purpose and date, not just the fiscal year. |

The October 2026 guide describes version 1.0 exchanges through June 15, 2028 and version 2.0 from June 25, 2028. The June 16–24 interval remains an unresolved project issue. Domestic filing depends on local requirements. The guide names `GLOBEXML_v2.0.xsd`, `oecdglobetypes_v5.0.xsd` and `isoglobetypes_v1.1.xsd`; their artifacts and dependencies must be verified and hashed before validation. Do not infer a namespace URI from a prefix shown in an example.

No official XSD was downloaded or executed locally; no fixture is claimed to be official or XSD-valid. No hashes of OECD documents are asserted. These gaps block GIR-1 profile validation, but do not block the internal contracts.
