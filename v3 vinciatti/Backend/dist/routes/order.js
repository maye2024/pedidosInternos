"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../controllers/order");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.post("/register", order_1.registerOrder);
router.get("/getOrders", validateToken_1.default, order_1.getOrders);
router.put('/:id', order_1.updateOrder);
exports.default = router;
