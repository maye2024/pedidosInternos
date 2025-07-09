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
exports.updateInventario = exports.getInventario = exports.registerInventario = void 0;
const inventario_1 = require("../models/inventario");
const product_1 = require("../models/product");
// Registrar un nuevo inventario
// export const registerInventario = async(req: Request, res: Response) => {
//     try {
//         const { description, productoId, entrada, salida, saldo } = req.body;
//         await Inventario.create({
//             description,
//             productoId,
//             entrada,
//             salida,
//             saldo
//         });
//         res.json({
//             msg: `Inventario for product ${productoId} created successfully`
//         });
//     } catch (error) {
//         console.error("Error creating inventario:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const registerInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, productoId, entrada, salida } = req.body;
        // 1️⃣ Verificar si el producto ya está en el inventario
        const existingInventario = yield inventario_1.Inventario.findOne({ where: { productoId } });
        if (existingInventario) {
            res.status(400).json({ message: "El producto ya está registrado en el inventario." });
            return; // 🔴 IMPORTANTE: Agrega return aquí para evitar que continúe ejecutándose
        }
        // 2️⃣ Calcular saldo si no se proporciona
        const saldo = (entrada !== null && entrada !== void 0 ? entrada : 0) - (salida !== null && salida !== void 0 ? salida : 0);
        // 3️⃣ Crear nuevo registro si no existe
        yield inventario_1.Inventario.create({
            description,
            productoId,
            entrada,
            salida,
            saldo
        });
        res.status(201).json({
            msg: `Inventario para el producto ${productoId} creado exitosamente`
        });
    }
    catch (error) {
        console.error("Error al crear inventario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.registerInventario = registerInventario;
// Obtener todos los productos del inventario
const getInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listInventario = yield inventario_1.Inventario.findAll({
            include: [
                { model: product_1.Product, attributes: ['name'] }
            ]
        });
        res.json({ listInventario });
    }
    catch (error) {
        console.error("Error retrieving inventario:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getInventario = getInventario;
const updateInventario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { description, entrada, salida, saldo } = req.body;
        const inventario = yield inventario_1.Inventario.findByPk(id);
        if (!inventario) {
            res.status(404).json({ message: "Orden no encontrada" });
            return;
        }
        inventario.description = description;
        inventario.entrada = entrada;
        inventario.salida = salida;
        inventario.saldo = saldo;
        yield inventario.save();
        res.json({ message: "Inventario actualizado correctamente", inventario });
    }
    catch (error) {
        console.error("Error al actualizar el inventario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateInventario = updateInventario;
