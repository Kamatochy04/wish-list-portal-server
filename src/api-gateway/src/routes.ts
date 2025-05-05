import { Router } from "express";
import { register } from "./controllers/userControllers";

const router = Router();

router.post("/user/register", register);

export default router;
