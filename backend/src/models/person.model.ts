// Gerar Model para Sequelize usando o type Person
import { sequelize } from "../config/sequelize";
import { Person } from "../interfaces/Person";

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

class PersonModel extends Model<InferAttributes<PersonModel>, InferCreationAttributes<PersonModel>> implements Person {
  declare id: CreationOptional<number>;
  declare name: string;
  declare age: number;
  declare email: string;
  declare phone: string;
  declare address: string;
  declare city: string;
  declare state: string;
  declare country: string;
  declare zip: string;
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "persons",
  }
);