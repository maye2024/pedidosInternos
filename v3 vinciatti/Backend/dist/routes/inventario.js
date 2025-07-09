"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_1 = require("../controllers/inventario");
const validateToken_1 = __importDefault(require("./validateToken"));
const router = (0, express_1.Router)();
router.post("/api/inventario/register", inventario_1.registerInventario);
router.get("/api/inventario/getInventario", validateToken_1.default, inventario_1.getInventario);
router.put('/api/inventario/:id', inventario_1.updateInventario);
exports.default = router;
