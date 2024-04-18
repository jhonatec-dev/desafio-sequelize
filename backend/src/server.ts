import cors from "cors";
import express, { Application } from "express";

const PORT = 3001;

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World Again!");
});

app.listen(PORT, () => {
  console.log(`ÏServer is running on port ${PORT}`);
});
