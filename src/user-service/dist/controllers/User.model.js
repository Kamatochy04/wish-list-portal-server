"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// import { PrismaClient } from "@prisma/client";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User {
    static async create(dto) {
        const salt = Number(process.env.PASSWORD_SALT) || 9;
        const hashPassword = await bcryptjs_1.default.hash(dto.password, salt);
        const user = {
            id: 1,
            password_hash: hashPassword,
            user_name: dto.userName,
            email: dto.email,
            salt: salt,
        };
        // await redisClient.set(`user:${user.id}`, JSON.stringify(user));
        // await redisClient.set(`user:${user.email}`, JSON.stringify(user));
        return user;
    }
    static async getById(id) {
        // const cachedUser = await redisClient.get(`user:${id}`);
        // if (cachedUser) return JSON.parse(cachedUser);
        return null;
    }
    static async getByEmail(email) {
        // const cachedUser = await redisClient.get(`user:${email}`);
        // if (cachedUser) return JSON.parse(cachedUser) as PrismaUser;
        // const user = await prisma.user.findFirst({
        //   where: {
        //     email,
        //   },
        // });
        // if (user) {
        //   await redisClient.set(`user:${email}`, JSON.stringify(user));
        // }
        return null;
    }
}
exports.User = User;
