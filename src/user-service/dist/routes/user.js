"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", (req, res) => {
    res.send("create");
});
router.delete("/delete", (req, res) => {
    res.send("delete");
});
router.put("/updata", (req, res) => {
    res.send("updata");
});
