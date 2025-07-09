import sequelize from "../database/connection";
import { DataTypes, Model } from "sequelize";


interface ProductAttributes {
    id?: number;
    name?: string;
    description?: string;
  }
  
interface ProductInstance extends Model<ProductAttributes>, ProductAttributes {}

export const Product = sequelize.define(
    'Product', 
    {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.STRING, allowNull: false},
        status: {type: DataTypes.INTEGER, allowNull: false},
    },
    
);

export {ProductInstance}