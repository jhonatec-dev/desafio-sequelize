# Desafio: Sequelize sem sequela 🤯

Let's try to create an API using Docker/Node/TypeScript and Sequelize

# Requisitos:

- Docker
- Não ter amor a vida pra gostar de Sequelize 😶‍🌫️
- Ter esperanças de um futuro melhor ao seguir essas dicas 😇

# Colocando o ambiente pra rodar

1. Clone o projeto

```bash
git clone git@github.com:jhonatec-dev/desafio-sequelize.git
```

2. Na pasta do projeto rode o arquivo docker-compose.yml

```bash
docker compose -f "docker-compose.yml" up -d --build
```

3. Espere com paciência a subir o DB e o BACK 🥸

4. Code como se não houvesse amanhã! 🤓

---
---
---

# Como configurar o Sequelize para Migrations

## 1. Instale o CLI também (além do sequelize e mysql2)

```bash
npm i sequelize-cli
```

## 2. Crie um arquivo `.sequelizerc`

> Aqui ele vai informar pro CLI que dentro da pasta `src/database` é o local onde ele deverá gerar os arquivos
> database.json é o arquivo de configuração, daqui a pouco vamos falar dele

```js
const path = require("path");

module.exports = {
  config: path.resolve("src", "database", "config", "database.json"),
  "models-path": path.resolve("src", "database", "models"),
  "seeders-path": path.resolve("src", "database", "seeders"),
  "migrations-path": path.resolve("src", "database", "migrations"),
};
```

## 4. Inicie o Sequelize

```bash
npx sequelize-cli init
```

## 3. Atualize seu JSON de conexão com o banco

Abra o arquivo `src/database/config/database.json` e atualize as infos de conexão, por exemplo:

```json
{
  "development": {
    "username": "root",
    "password": "root_password",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

## 4. Crie o banco de dados:

Rode para criar o Banco de Dados!

```bash
npx sequelize-cli db:create
```

## 5. Crie sua primeira Migration

Rode o comando de exemplo:

```bash
npx sequelize-cli model:generate --name User --attributes name:string,age:integer
```

Com isso, alguns arquivos serão criados, um na pasta `src/database/migrations` com o nome da tabela users
Outro na pasta `src/database/models` para ser usado mais tarde na aplicação

## 6. Rode as Migrations

Comando:

```bash
npx sequelize-cli db:migrate
```

# O PULO DO GATO ⏏️ 🐈

Provavelmente seu banco estará criado agora, com a tabela(s) da pasta de migrations... Mas quando você chamar na aplicação, a coisa dá erro como se o `HOST` do arquivo `.json` estivesse errado. Mas não está!

O que acontece é que quando for executado na aplicação, a chave `host` deve ter o valor de `'mysql'` e vamos fazer isso manualmente no arquivo `src/database/models/index.js`:

```js
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/database.json")[env];
const db = {};

// Jump of the cat ⏏️ 🐈
// manualmente setar o host de dentro do objeto config como 'mysql''
config.host = "mysql";
// jump finished

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// .... RESTO DO ARQUIVO ....
```

# Usando o model gerado

Agora vamos a um exemplo de código usando o model da pasta `src/database/models`:

```typescript
import { DataTypes } from "sequelize";
import db from "./database/models"; // está no arquivo src/database/models/index.js
import user from "./database/models/user"; // model gerado ao rodar o sequelize-cli model:generate

// método de exemplo já usando um método POST na rota /user
app.post("/user", async (req, res) => {
  const { name, age } = req.body;
  try {
    // padrão do arquivo gerado pelo CLI é receber um objeto do tipo Sequelize e um DataTypes
    const model = user(db.sequelize, DataTypes);
    // usando a instância do Model de Users para salvar no Banco
    const newPerson = await model.create({ name, age });
    res.status(201).send(newPerson);
  } catch (error) {
    res.status(500).send({
      message: "Unable to create a new user",
      error,
    });
  }
});
```

# A P R O V E I T E

## Curtiu? Deixe uma ⭐️ no Repositório pra fortalecer mais conteúdos como esse!
