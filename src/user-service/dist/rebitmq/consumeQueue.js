"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRabbitMQ = exports.channel = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const User_model_1 = require("../controllers/User.model");
const setupRabbitMQ = async () => {
    try {
        const connection = await amqplib_1.default.connect("amqp://localhost");
        exports.channel = await connection.createChannel();
        await exports.channel.assertQueue("user_created", { durable: false });
        exports.channel.consume("user_created", (msg) => {
            if (msg) {
                const user = JSON.parse(msg.content.toString());
                User_model_1.User.create(user);
                console.log("created");
                exports.channel.ack(msg);
            }
        });
        console.log("RabbitMQ connected in User Service");
    }
    catch (error) {
        console.error("RabbitMQ connection error:", error);
    }
};
exports.setupRabbitMQ = setupRabbitMQ;
