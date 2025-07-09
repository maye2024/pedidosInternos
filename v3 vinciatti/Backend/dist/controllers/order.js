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
exports.updateOrder = exports.getOrders = exports.registerOrder = void 0;
const order_1 = require("../models/order");
const product_1 = require("../models/product");
const punto_1 = require("../models/punto");
const user_1 = require("../models/user");
// Registrar una nueva orden
const registerOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, fechaPedido, fechaEntrega, productoId, ventaId, estado, usuarioId, cantidad } = req.body;
        yield order_1.Order.create({
            description,
            fechaPedido,
            fechaEntrega,
            productoId,
            ventaId,
            estado,
            usuarioId,
            cantidad
        });
        res.json({
            msg: `Order for product ${productoId} created successfully`
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerOrder = registerOrder;
// Obtener todas las órdenes
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrders = yield order_1.Order.findAll({
            include: [
                { model: product_1.Product, attributes: ['name'] },
                { model: punto_1.Punto, attributes: ['name'] },
                { model: user_1.User, attributes: ['name', 'lastname'] }
            ]
        });
        res.json({ listOrders });
    }
    catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getOrders = getOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { fechaEntrega, estado } = req.body;
        const order = yield order_1.Order.findByPk(id);
        if (!order) {
            res.status(404).json({ message: "Orden no encontrada" });
            return;
        }
        order.fechaEntrega = fechaEntrega;
        order.estado = estado;
        yield order.save();
        res.json({ message: "Orden actualizada correctamente", order });
    }
    catch (error) {
        console.error("Error al actualizar la orden:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateOrder = updateOrder;
