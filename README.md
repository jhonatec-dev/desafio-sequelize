# Desafio: Sequelize sem sequela 🤯

Nesta branch, vamos criar os arquivos na unha com TypeScript 💙

# Requisitos:

- Docker 🐋
- Node 💚
- Não ter amor a vida pra gostar de Sequelize 😶‍🌫️
- Ter esperanças de um futuro melhor ao seguir essas dicas 😇

# Colocando o ambiente pra rodar

1. Clone o projeto

```bash
git clone git@github.com:jhonatec-dev/desafio-sequelize.git
```

2. Na pasta do projeto rode o arquivo `docker-compose.yml`

> É de extrema importância lembrar de informar o nome da base de dados já no arquivo do `docker-compose.yml`

```bash
docker compose up -d --build
```

3. Espere com paciência a subir o DB e o BACK 🥸

4. Code como se não houvesse amanhã! 🤓

---

# Criando os arquivos

## 1. Crie um arquivo para servir de conexão

Criei meu arquivo em `src/config/database.ts`

## 2. Crie sua Model User `src/models/User.model.ts`

Aqui usei a documentação do Sequelize para criar os campos usando como base minha Interface já definida para uso na aplicação

```ts
// Gerar Model para Sequelize usando o type User
import { sequelize } from "../config/database";
import { User } from "../interfaces/User";

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>
  implements User
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare age: number;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
  }
);

export { UserModel };
```

## 3. Crie sua Model Book `src/models/Books.model.ts`

Aqui usei a documentação do Sequelize para criar os campos usando como base minha Interface já definida para uso na aplicação

## 4. Sincronize os models com o banco de dados

No arquivo `src/server.ts` por exemplo, chame a função sequelize.sync() para que os modelos sejam enviados em forma de criação de tabelas para o banco

```ts
import cors from "cors";
import dayjs from "dayjs";
import express, { Application } from "express";
import { BookModel } from "./models/Book.model";
import { UserModel } from "./models/User.model";

// Sincronizando o Sequelize com o banco de dados
import { sequelize } from "./config/database";
sequelize.sync();
UserModel.hasMany(BookModel, { as: "books", foreignKey: "userId" });
BookModel.belongsTo(UserModel, { as: "user", foreignKey: "userId" });

// ... RESTO DO ARQUIVO ...
```

# A P R O V E I T E

## Curtiu? Deixe uma ⭐️ no Repositório pra fortalecer mais conteúdos como esse!
