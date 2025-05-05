import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { userSubscribe } from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, async () => {
  console.log("User server is running on http://localhost:" + PORT);
  userSubscribe();
});
