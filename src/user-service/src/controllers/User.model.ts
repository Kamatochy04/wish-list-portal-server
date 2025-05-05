import bcrypt from "bcryptjs";
import { CreateUserDto } from "../dto/createUser.dto";
import { PrismaClient, User as PrismaUser } from "@prisma/client";

import { redisClient } from "../redis/redis";

const prisma = new PrismaClient();

export class User {
  static async create(dto: CreateUserDto): Promise<PrismaUser> {
    const saltRounds = Number(process.env.PASSWORD_SALT) || 10;
    const hashPassword = await bcrypt.hash(dto.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        password_hash: hashPassword,
        user_name: dto.userName,
        email: dto.email,
        salt: saltRounds,
      },
    });
    if (redisClient) {
      await redisClient.set(`user:${user.email}`, JSON.stringify(user));
      await redisClient.set(`user:${user.id}`, JSON.stringify(user));
    }

    return user;
  }

  static async getById(id: number): Promise<PrismaUser | null> {
    if (redisClient) {
      const cachedUser = await redisClient.get(`user:${id}`);
      if (cachedUser) return JSON.parse(cachedUser) as PrismaUser;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user && redisClient) {
      await redisClient.set(`user:${user.id}`, JSON.stringify(user));
      await redisClient.set(`user:${user.email}`, JSON.stringify(user));
    }

    return user;
  }

  static async getByEmail(email: string): Promise<PrismaUser | null> {
    if (redisClient) {
      const cachedUser = await redisClient.get(`user:${email}`);
      if (cachedUser) return JSON.parse(cachedUser) as PrismaUser;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && redisClient) {
      await redisClient.set(`user:${user.email}`, JSON.stringify(user));
      await redisClient.set(`user:${user.id}`, JSON.stringify(user));
    }

    return user;
  }

  static async verifyPassword(
    user: PrismaUser,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, user.password_hash);
  }

  static async update(
    id: number,
    data: Partial<Omit<PrismaUser, "id">>
  ): Promise<PrismaUser> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    if (redisClient) {
      await redisClient.del([`user:${id}`, `user:${updatedUser.email}`]);
      await redisClient.set(`user:${id}`, JSON.stringify(updatedUser));
      await redisClient.set(
        `user:${updatedUser.email}`,
        JSON.stringify(updatedUser)
      );
    }

    return updatedUser;
  }

  static async delete(id: number): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return;

    await prisma.user.delete({ where: { id } });
    if (redisClient) {
      await redisClient.del([`user:${id}`, `user:${user.email}`]);
    }
  }
}
