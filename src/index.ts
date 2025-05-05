import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import requestLogger from "./common/middleware/logger.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(requestLogger);

app.listen(PORT, () => {
  console.log("Application started on port: " + PORT);
});
