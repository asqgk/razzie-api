# Razzie API

API RESTful para leitura dos indicados e vencedores da categoria **Pior Filme** do Golden Raspberry Awards, com foco no cálculo do **menor e maior intervalo entre prêmios consecutivos por produtor**.

---

## 🚀 Tecnologias

- Node.js 22+
- NestJS
- TypeScript
- TypeORM
- SQLite (via sqljs, em memória)
- Jest (e2e)
- pnpm

---

## 📦 Pré-requisitos

- **Node.js** >= 22
- **pnpm**

Instalação do pnpm:

```bash
npm install -g pnpm
```

---

## 📥 Leitura do CSV

Os dados da aplicação são carregados automaticamente a partir de um arquivo CSV localizado em:

```
src/resources/Movielist.csv
```

## ▶️ Como executar o projeto

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Executar a aplicação

```bash
pnpm start:dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 📡 Endpoint principal

### Produtores com maior e menor intervalo entre prêmios

```http
GET /producers/intervals
```

### Exemplo de resposta

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```

---

## 🧪 Testes

### Testes de integração (e2e)

```bash
pnpm test:e2e
```

Os testes e2e utilizam:

- Banco de dados em memória (sqljs)
- Importação do CSV na inicialização da aplicação

---

## 🗂️ Estrutura de pastas (resumida)

```
razzie-api/
├── src/
│   ├── movies/
│   ├── producers/
│   └── app.module.ts
├── test/
│   ├── movies.e2e-spec.ts
│   └── jest-e2e.json
├── README.md
└── package.json
```

---

## 📝 Observações

- Os dados são carregados automaticamente a partir do arquivo CSV ao iniciar a aplicação.
- Apenas filmes vencedores são considerados nos cálculos.
- Produtores com apenas um prêmio não entram no cálculo de intervalos.

---
