import sequelize from "../database/connection";
import { DataTypes, Model } from "sequelize";

interface PuntosAttributes {
    id?: number;
    name?: string;
    direccion?: string;
    ciudad?: string;
    telefono?: string;
  }
  
interface PuntosInstance extends Model<PuntosAttributes>, PuntosAttributes {}

export const Punto = sequelize.define(
    'Punto', 
    {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        direccion: {type: DataTypes.STRING, allowNull: false},
        ciudad: {type: DataTypes.STRING, allowNull: false},
        telefono: {type: DataTypes.STRING, allowNull: false},
        status: {type: DataTypes.INTEGER, allowNull: false},
    },
    
);

export {PuntosInstance}