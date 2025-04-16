import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import requestLogger from "./middleware/logger.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api/getAll", (req, res) => {
  res.send({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log("Application started on port: " + PORT);
});
