# API

API HTTP local para persistencia de reports em arquivo.

## Como rodar

```bash
node services/api/src/server.mjs
```

Por padrao a API sobe em `http://127.0.0.1:3001`.

## Rotas

### `GET /api/reports`

Lista todos os reports persistidos.

Resposta:

```json
{
  "data": [
    {
      "id": "2c4c7f1d-2fd5-4c5f-a39c-5e2b7842647e",
      "title": "Poste apagado na avenida principal",
      "categoryId": "iluminacao",
      "categoryLabel": "Iluminacao",
      "categoryColor": "#f4d35e",
      "description": "Iluminacao comprometida no trajeto entre a Reitoria e o RU central.",
      "locationName": "Av. Pedro Calmon",
      "status": "Em analise",
      "severity": "Media",
      "latitude": -22.8579,
      "longitude": -43.2286,
      "reportedAt": "2026-03-22",
      "createdAt": "2026-03-22T00:00:00.000Z",
      "updatedAt": "2026-03-22T00:00:00.000Z"
    }
  ]
}
```

### `POST /api/reports`

Cria um novo report e persiste em `services/database/data/reports.json`.

Payload enviado:

```json
{
  "title": "Poste apagado perto do CT",
  "categoryId": "iluminacao",
  "description": "Trecho escuro no acesso lateral.",
  "locationName": "Acesso lateral do CT",
  "latitude": -22.8625,
  "longitude": -43.2318
}
```

Campos obrigatorios:

- `title`
- `categoryId`
- `latitude`
- `longitude`

Campos opcionais:

- `description`
- `locationName`

Resposta `201 Created`:

```json
{
  "data": {
    "id": "8bf3d681-bbaa-4d7e-bf58-72729107c02c",
    "title": "Poste apagado perto do CT",
    "categoryId": "iluminacao",
    "categoryLabel": "Iluminacao",
    "categoryColor": "#f4d35e",
    "description": "Trecho escuro no acesso lateral.",
    "locationName": "Acesso lateral do CT",
    "status": "Novo",
    "severity": "Media",
    "latitude": -22.8625,
    "longitude": -43.2318,
    "reportedAt": "2026-04-08",
    "createdAt": "2026-04-08T12:00:00.000Z",
    "updatedAt": "2026-04-08T12:00:00.000Z"
  }
}
```

Erro de validacao:

```json
{
  "error": {
    "code": "validation_error",
    "message": "Payload invalido para criacao de report.",
    "details": [
      "`title` e obrigatorio."
    ]
  }
}
```
