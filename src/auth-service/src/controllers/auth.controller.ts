import { Router } from "express";

import { Request, Response } from "express";
import { redisPublisher } from "../app";

export interface IUser {
  email: string;
  password: string;
  userName: string;
}

const router = Router();

export const register = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body;

  if (!email || !password || !userName) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    await redisPublisher.publish(
      "user_create",
      JSON.stringify({ email, password, userName })
    );

    res.status(202).json({ message: "Registration request accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export default router;
