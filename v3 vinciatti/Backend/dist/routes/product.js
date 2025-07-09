"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.post("/api/product/register", product_1.registerProduct);
router.get("/api/product/getProducts", validateToken_1.default, product_1.getProducts);
router.put('/api/product/:id', product_1.updateProducts);
router.delete('/api/product/:id', product_1.deleteProduct);
exports.default = router;
