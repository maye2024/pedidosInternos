import { DataTypes, Model } from "sequelize";
import {Product } from "./product";
import sequelize from "../database/connection";

interface InventarioAttributes {
    id?: number;
    description?: string;
    productoId: number;
    entrada: number;
    salida: number;
    saldo: number;
  }
  
interface InventarioInstance extends Model<InventarioAttributes>, InventarioAttributes {}

export const Inventario = sequelize.define(
    'Inventario', 
    {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        description: {type: DataTypes.STRING, allowNull: false},
        productoId: {type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            },
             allowNull: false},
        entrada: {type: DataTypes.INTEGER, allowNull: false},
        salida: {type: DataTypes.INTEGER, allowNull: false},
        saldo: {type: DataTypes.INTEGER, allowNull: false},
    },
    
);

// Establecer relaciones
Inventario.belongsTo(Product, { foreignKey: 'productoId' });

// Obtener todos los pedidos con los nombres asociados
Inventario.findAll({
    include: [
        { model: Product, attributes: ['name'] },
    ]
}).then(inventario => {
    console.log("Inventario associated:", inventario);
}).catch(error => {
    console.error("Error fetching inventary with:", error);
});

export {InventarioInstance};