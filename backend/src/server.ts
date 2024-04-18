import cors from "cors";
import dayjs from "dayjs";
import express, { Application } from "express";
import { sequelize } from "./config/sequelize";

const PORT = 3001;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const today = dayjs().format("YYYY-MM-DD HH:mm:ss");
  res.status(200).send({
    message: `Hello, today is ${today}`,
  });
});

app.get("/sequelize", async (req, res) => {
  try {
    await sequelize.authenticate();
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
