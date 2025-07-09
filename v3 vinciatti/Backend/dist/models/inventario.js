"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const connection_1 = __importDefault(require("../database/connection"));
exports.Inventario = connection_1.default.define('Inventario', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    productoId: { type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: product_1.Product,
            key: 'id'
        },
        allowNull: false },
    entrada: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    salida: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    saldo: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
// Establecer relaciones
exports.Inventario.belongsTo(product_1.Product, { foreignKey: 'productoId' });
// Obtener todos los pedidos con los nombres asociados
exports.Inventario.findAll({
    include: [
        { model: product_1.Product, attributes: ['name'] },
    ]
}).then(inventario => {
    console.log("Inventario associated:", inventario);
}).catch(error => {
    console.error("Error fetching inventary with:", error);
});
