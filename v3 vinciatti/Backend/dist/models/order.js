"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const punto_1 = require("./punto");
const user_1 = require("./user");
exports.Order = connection_1.default.define('Order', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    fechaPedido: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    fechaEntrega: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    productoId: { type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: product_1.Product,
            key: 'id'
        },
        allowNull: false },
    ventaId: { type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: punto_1.Punto,
            key: 'id'
        },
        allowNull: false },
    estado: { type: sequelize_1.DataTypes.ENUM, values: ['pendiente', 'entregado'], defaultValue: 'pendiente', allowNull: false },
    usuarioId: { type: sequelize_1.DataTypes.STRING,
        references: {
            model: user_1.User,
            key: 'credential'
        },
        allowNull: false },
    cantidad: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
});
// Establecer relaciones
exports.Order.belongsTo(product_1.Product, { foreignKey: 'productoId' });
exports.Order.belongsTo(punto_1.Punto, { foreignKey: 'ventaId' });
exports.Order.belongsTo(user_1.User, { foreignKey: 'usuarioId', targetKey: 'credential' });
// Obtener todos los pedidos con los nombres asociados
exports.Order.findAll({
    include: [
        { model: product_1.Product, attributes: ['name'] },
        { model: punto_1.Punto, attributes: ['name'] },
        { model: user_1.User, attributes: ['name', 'lastname'] }
    ]
}).then(orders => {
    console.log("Orders with associated names:", orders);
}).catch(error => {
    console.error("Error fetching orders with associated names:", error);
});
// Sincronizar el modelo con la base de datos
// sequelize.sync()
//     .then(() => {
//         console.log("Order table created successfully!");
//     })
//     .catch(error => {
//         console.error("Error creating Order table:", error);
// });
