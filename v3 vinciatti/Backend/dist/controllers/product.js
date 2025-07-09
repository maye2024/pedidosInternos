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
exports.deleteProduct = exports.updateProducts = exports.getProducts = exports.registerProduct = void 0;
const product_1 = require("../models/product");
const registerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    product_1.Product.create({
        name: name,
        description: description,
        status: 1,
    });
    res.json({
        msg: `Product ${name} create success`
    });
});
exports.registerProduct = registerProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.Product.findAll();
    res.json({ listProducts });
});
exports.getProducts = getProducts;
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const product = yield product_1.Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: "Orden no encontrada" });
            return;
        }
        product.name = name;
        product.description = description;
        yield product.save();
        res.json({ message: "Producto actualizado correctamente", product });
    }
    catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateProducts = updateProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield product_1.Product.findByPk(id);
        if (!producto) {
            res.status(404).json({ message: "Producto no encontrado" });
            return;
        }
        yield producto.destroy();
        res.json({ message: "Producto eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.deleteProduct = deleteProduct;
