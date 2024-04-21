// Gerar Model para Sequelize usando o type Person
import { sequelize } from "../config/database";
import { Book } from "../interfaces/Book";

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class BookModel
  extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>>
  implements Book
{
  declare id: CreationOptional<number>;
  declare title: string;
  declare userId: number;
}

BookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "Books",
  }
);

export { BookModel };

