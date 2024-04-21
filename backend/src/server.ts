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

// Definindo a porta do servidor
const PORT = 3001;
const app: Application = express();
app.use(express.json());
app.use(cors());

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
    const newBook = await BookModel.create({ title, userId });
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
    const books = await BookModel.findAll();
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
      include: { model: BookModel, as: "books" },
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
