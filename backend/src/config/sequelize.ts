import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";

configDotenv(); // Load .env file


// Database connection MySql
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
  }
);
