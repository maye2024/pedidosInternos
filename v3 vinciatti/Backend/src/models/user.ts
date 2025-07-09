import sequelize from "../database/connection";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    'User', 
    {
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        lastname: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, unique:true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        credential: {type: DataTypes.STRING, unique:true, allowNull: false},
        role: {type: DataTypes.ENUM, values: ['admin', 'user'], defaultValue: 'user', allowNull: false},
        status: {type: DataTypes.INTEGER, allowNull: false},

    },
    
);