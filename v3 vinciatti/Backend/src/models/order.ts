import sequelize from "../database/connection";
import { DataTypes, Model } from "sequelize";
import {Product } from "./product"
import {Punto } from "./punto"
import {User } from "./user"

interface OrderAttributes {
    id?: number;
    description: string;
    fechaPedido: Date;
    fechaEntrega?: Date;
    productoId: number;
    ventaId: number;
    estado?: 'pendiente' | 'entregado'; // Usar un tipo literal para ENUM
    usuarioId: string;
    cantidad: number;
  }
  
interface OrderInstance extends Model<OrderAttributes>, OrderAttributes {}

export const Order = sequelize.define<OrderInstance>('Order', 
    {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        description: {type: DataTypes.STRING, allowNull: false},
        fechaPedido: {type: DataTypes.DATE, allowNull: false},
        fechaEntrega: {type: DataTypes.DATE, allowNull: false},
        productoId: {type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            },
             allowNull: false},
        ventaId: {type: DataTypes.INTEGER,
            references: {
                model: Punto,
                key: 'id'
            }
            ,allowNull: false},
        estado: {type: DataTypes.ENUM, values: ['pendiente', 'entregado'], defaultValue: 'pendiente', allowNull: false},
        usuarioId: {type: DataTypes.STRING,
            references: {
                model: User,
                key: 'credential'
            },
            allowNull: false},
        cantidad: {type: DataTypes.INTEGER, allowNull: false}
    },
    
);

// Establecer relaciones
Order.belongsTo(Product, { foreignKey: 'productoId' });
Order.belongsTo(Punto, { foreignKey: 'ventaId' });
Order.belongsTo(User, { foreignKey: 'usuarioId', targetKey: 'credential' });


// Obtener todos los pedidos con los nombres asociados
Order.findAll({
    include: [
        { model: Product, attributes: ['name'] },
        { model: Punto, attributes: ['name'] },
        { model: User, attributes: ['name', 'lastname'] }
    ]
}).then(orders => {
    console.log("Orders with associated names:", orders);
}).catch(error => {
    console.error("Error fetching orders with associated names:", error);
});

export { OrderInstance };
// Sincronizar el modelo con la base de datos
// sequelize.sync()
//     .then(() => {
//         console.log("Order table created successfully!");
//     })
//     .catch(error => {
//         console.error("Error creating Order table:", error);
// });