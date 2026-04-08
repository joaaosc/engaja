# Engaja

Repositorio reorganizado para acomodar a evolucao do sistema de reports em quatro frentes:
digital twin, frontend transacional, API e persistencia.

## Estrutura

```text
apps/
  digital-twin/        App espacial atual, executavel no navegador
  frontend/            Espaco reservado para a futura interface web de produto
packages/
  reports-domain/      Catalogo, normalizacao e seed data compartilhados de reports
services/
  api/                 Espaco reservado para a futura API
  database/            Espaco reservado para schema, migrations e seeds
docs/
  architecture/        Decisoes e convencoes do repositorio
```

## Como rodar

1. Na raiz do projeto, suba um servidor HTTP simples:

   ```bash
   python3 -m http.server 8000
   ```

2. Abra `http://localhost:8000`.

A raiz redireciona automaticamente para `apps/digital-twin/`.

## App atual

O que continua funcionando hoje:

- digital twin 3D da Cidade Universitaria
- leitura e criacao local de ocorrencias no mapa
- filtros por categoria
- lista operacional de ocorrencias
- heatmap geral e por categoria

## Proxima fase

- `packages/reports-domain` deve continuar sendo a origem das regras compartilhadas de reports
- `services/api` sera o ponto de exposicao HTTP quando os dados deixarem de ser locais
- `services/database` concentrara schema, migrations e seeds persistentes
- `apps/frontend` pode evoluir separado do `apps/digital-twin`, consumindo o mesmo dominio de reports

Mais detalhes estao em `docs/architecture/repository.md`.
