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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.User.findAll();
    res.json({ listUsers });
});
exports.getUsers = getUsers;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, password, email, credential, role } = req.body;
    try {
        const user = yield user_1.User.findOne({ where: { [sequelize_1.Op.or]: { email: email, credential: credential } } });
        if (user) {
            res.status(400).json({
                msg: `Usuario ya existe con el email ${email} o el número de identificación ${credential}`
            });
            return;
        }
        console.log("estoy por aquí");
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        yield user_1.User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            role: role,
            status: 1
        });
        res.json({
            msg: `User ${name} ${lastname} create success...`
        });
    }
    catch (error) {
        console.error("Error en el registro:", error);
        res.status(400).json({
            msg: `Existe un error al crear el usuario ${name} ${lastname}`
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ where: { email: email } });
        if (!user) {
            res.status(400).json({
                msg: `Usuario no existe con el email =>${email}`
            });
            return;
        }
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            res.status(400).json({
                msg: `Password Incorrecto => ${password}`
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            email: email,
            role: user.role
        }, process.env.SECRET_KEY || '$78JUJnqH&%Dfnj$D8GXUg', {
            expiresIn: '1d'
        });
        res.json({ token });
    }
    catch (error) {
        console.error("Error en el login", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
    // res.json({
    //     msg: `Inicio de sesion exitoso =>`,
    //     body: req.body
    // })
});
exports.login = login;
