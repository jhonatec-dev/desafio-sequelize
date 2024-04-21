import cors from "cors";
import dayjs from "dayjs";
import express, { Application } from "express";
import { DataTypes } from "sequelize";
// Exportada como configuração pelo sequelize-cli
import db from "./database/models";
// Importando os models para a aplicação
import book from "./database/models/book";
import user from "./database/models/user";

// Definindo a porta do servidor
const PORT = 3001;
const app: Application = express();
app.use(express.json());
app.use(cors());

// Defining the model passing the sequelize instance and the data types
const UserModel = user(db.sequelize, DataTypes);
const BooksModel = book(db.sequelize, DataTypes);
UserModel.hasMany(BooksModel, { as: "books" });
BooksModel.belongsTo(UserModel, { as: "user" });

// Testing the connection
app.get("/", (req, res) => {
  const today = dayjs().format("YYYY-MM-DD HH:mm:ss");
  res.status(200).send({
    message: `Hello, today is ${today}`,
  });
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: "Unable to fetch users",
      error,
    });
  }
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  try {
    const newPerson = await UserModel.create({ name, age });
    res.status(201).send(newPerson);
  } catch (error) {
    res.status(500).send({
      message: "Unable to create a new user",
      error,
    });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, userId } = req.body;
    const newBook = await BooksModel.create({ title, userId });
    res.status(201).send(newBook);
  } catch (error) {
    res.status(500).send({
      message: "Unable to create a new Book",
      error,
    });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await BooksModel.findAll();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({
      message: "Unable to fetch books",
      error,
    });
  }
});

app.get("/report", async (req, res) => {
  try {

    const report = await UserModel.findAll({
      include: { model: BooksModel, as: "books"},
    });
    res.status(200).send(report);
  } catch (error) {
    res.status(500).send({
      message: "Unable to fetch report",
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
