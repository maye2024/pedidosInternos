"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePunto = exports.updatePuntos = exports.getPuntos = exports.registerPunto = void 0;
const punto_1 = require("../models/punto");
const registerPunto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, direccion, ciudad, telefono } = req.body;
    punto_1.Punto.create({
        name: name,
        direccion: direccion,
        ciudad: ciudad,
        telefono: telefono,
        status: 1,
    });
    res.json({
        msg: `Punto ${name} create success`
    });
});
exports.registerPunto = registerPunto;
const getPuntos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPuntos = yield punto_1.Punto.findAll();
    res.json({ listPuntos });
});
exports.getPuntos = getPuntos;
const updatePuntos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, direccion, ciudad, telefono } = req.body;
        const punto = yield punto_1.Punto.findByPk(id);
        if (!punto) {
            res.status(404).json({ message: "Punto no encontrado" });
            return;
        }
        punto.name = name;
        punto.direccion = direccion;
        punto.ciudad = ciudad;
        punto.telefono = telefono;
        yield punto.save();
        res.json({ message: "Punto de venta actualizado correctamente", punto });
    }
    catch (error) {
        console.error("Error al actualizar el punto de venta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updatePuntos = updatePuntos;
const deletePunto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const punto = yield punto_1.Punto.findByPk(id);
        if (!punto) {
            res.status(404).json({ message: "Punto no encontrado" });
            return;
        }
        yield punto.destroy();
        res.json({ message: "Punto de venta eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar el punto de venta:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.deletePunto = deletePunto;
