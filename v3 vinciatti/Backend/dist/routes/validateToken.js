"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headertoken = req.headers['authorization'];
    console.log(headertoken);
    if (headertoken != undefined && headertoken.startsWith('Bearer ')) {
        try {
            const token = headertoken.slice(7);
            jsonwebtoken_1.default.verify(token, process.env['SECRET_KEY'] || '$78JUJnqH&%Dfnj$D8GXUg');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: `Se ha terminado tu sesión`
            });
        }
    }
    else {
        res.status(401).json({
            msg: `Acceso Denegado`
        });
    }
};
exports.default = validateToken;
