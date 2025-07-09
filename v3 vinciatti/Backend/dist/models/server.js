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
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../database/connection"));
const user_1 = __importDefault(require("../routes/user"));
const order_1 = __importDefault(require("../routes/order"));
const product_1 = __importDefault(require("../routes/product"));
const punto_1 = __importDefault(require("../routes/punto"));
const inventario_1 = __importDefault(require("../routes/inventario"));
const user_2 = require("./user");
const product_2 = require("./product");
const cors_1 = __importDefault(require("cors"));
const order_2 = require("./order");
const punto_2 = require("./punto");
const inventario_2 = require("./inventario");
class Server {
    constructor() {
        //console.log("Mayelli")
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3016';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Está ejecutandose en el puerto " + this.port);
        });
    }
    router() {
        this.app.use(user_1.default);
        this.app.use(product_1.default);
        this.app.use("/api/orders", order_1.default);
        this.app.use(punto_1.default);
        this.app.use(inventario_1.default);
    }
    //encapsular funciones para que sean reutilizadas
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_2.User.sync();
                yield product_2.Product.sync();
                //await Order.sync({ force: true });
                yield order_2.Order.sync();
                yield punto_2.Punto.sync();
                yield inventario_2.Inventario.sync();
                yield connection_1.default.authenticate();
                console.log("conexión Exitosa");
            }
            catch (error) {
                console.log("Error de conexión: ", error);
            }
        });
    }
}
exports.default = Server;
