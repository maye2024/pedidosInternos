"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const sequelize_1 = require("sequelize");
exports.Product = connection_1.default.define('Product', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    status: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
