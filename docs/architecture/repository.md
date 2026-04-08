# Repository Layout

## Objetivo

Separar o que e executavel hoje do que deve ser compartilhado ou evoluir de forma
independente quando o sistema de reports ganhar API, banco e novas interfaces.

## Regras de organizacao

- `apps/` contem experiencias de usuario executaveis.
- `packages/` contem dominio compartilhado, contratos leves, catalogos e seed data.
- `services/` contem backends e persistencia.
- `docs/` registra a arquitetura do repositorio e decisoes estruturais.

## Ownership atual

- `apps/digital-twin`
  App existente de monitoramento espacial.
- `packages/reports-domain`
  Fonte compartilhada de categorias, normalizacoes e seed data de reports.
- `apps/frontend`
  Slot reservado para a futura interface transacional e administrativa.
- `services/api`
  Slot reservado para endpoints, autenticacao, integracoes e orquestracao.
- `services/database`
  Slot reservado para schema, migrations, views, seeds e materializacoes.

## Convencoes para a proxima etapa

- Regras de negocio de reports nao devem nascer dentro de um app especifico.
- Seed data deve ficar perto do dominio compartilhado ate a entrada do banco.
- O digital twin consome o dominio de reports, mas nao o possui.
- A API deve ser a camada que conversa com o banco quando a persistencia entrar.
