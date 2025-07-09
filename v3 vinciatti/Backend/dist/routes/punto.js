"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const punto_1 = require("../controllers/punto");
const validateToken_1 = __importDefault(require("./validateToken"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/api/punto/register", punto_1.registerPunto);
router.get("/api/punto/getPuntos", validateToken_1.default, punto_1.getPuntos);
router.put('/api/punto/:id', punto_1.updatePuntos);
router.delete('/api/punto/:id', punto_1.deletePunto);
exports.default = router;
