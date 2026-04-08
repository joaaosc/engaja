# Reports Domain

Camada compartilhada do sistema de reports.

## Conteudo atual

- `src/index.js`: catalogo de categorias e normalizacoes leves
- `seeds/reports.seed.geojson`: dados iniciais usados pelo digital twin

## Papel no repositorio

Este pacote existe para evitar que regras de reports fiquem acopladas ao
`apps/digital-twin`. Quando a API e o frontend entrarem, ambos podem reutilizar
este mesmo dominio como base.
