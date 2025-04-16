import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const login = (req: Request, res: Response) => {};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
  } catch (err) {}
};

export const resetPassword = (req: Request, res: Response) => {};
