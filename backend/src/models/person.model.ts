// Gerar Model para Sequelize usando o type Person
import { sequelize } from "../config/sequelize";
import { User } from "../interfaces/User";

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

class PersonModel extends Model<InferAttributes<PersonModel>, InferCreationAttributes<PersonModel>> implements User {
  declare id: CreationOptional<number>;
  declare name: string;
  declare age: number;
}

PersonModel.init(
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
    tableName: "users",
  }
);



export { PersonModel };
