"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const consumeQueue_1 = require("./rebitmq/consumeQueue");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3004;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/users", user_1.router);
app.listen(PORT, async () => {
    console.log("Server is running on http://localhost:" + PORT);
    await (0, consumeQueue_1.setupRabbitMQ)();
});
