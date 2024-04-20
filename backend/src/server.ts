import cors from "cors";
import express, { Application } from "express";
import { DataTypes } from "sequelize";
import { sequelize } from "./config/sequelize";
import db from "./database/models";
import user from "./database/models/user";
import { PersonModel } from "./models/person.model";

const PORT = 3001;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  // const today = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const today = new Date();
  res.status(200).send({
    message: `Hello, today is ${today}`,
  });
});

app.get("/sequelize", async (req, res) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    res.status(200).send({
      message: "Connection has been established successfully.",
    });

  } catch (error) {
    res.status(500).send({
      message: "Unable to connect to the database",
      error,
    });
  }
});


app.post("/new-user", async (req, res) => {
  const { name, age } = req.body;
  try {
    const newPerson = await PersonModel.create({ name, age });
    res.status(201).send(newPerson);
  } catch (error) {
    res.status(500).send({
      message: "Unable to create a new person",
      error,
    });
  }
})

app.post("/new-migrate", async (req, res) => {
  const { name, age } = req.body;
  try {
    console.log("seq working", sequelize.config)
    console.log("\n\n\n\n")
    console.log("seq not working", db.sequelize.config)

    const model = user(db.sequelize, DataTypes);
    const newPerson = await model.create({name, age})
    res.status(201).send(newPerson);
  } catch (error) {
    res.status(500).send({
      message: "Unable to create a new user",
      error,
    });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
