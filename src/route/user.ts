import express from "express";
import { register, resetPassword, login } from "../services/user.services";

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.post("/reset-password", resetPassword);
