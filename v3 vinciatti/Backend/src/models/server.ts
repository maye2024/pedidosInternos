import express, { Application } from 'express';
import sequelize from '../database/connection';
import rUser from '../routes/user'
import rOrder from '../routes/order'
import rProduct from '../routes/product'
import rPunto from '../routes/punto'
import rInventario from '../routes/inventario'
import { User } from './user';
import { Product } from './product';
import cors from 'cors'
import { Order } from './order';
import { Punto } from './punto';
import { Inventario } from './inventario';

class Server {
    private app: Application;
    private port?: string;
    constructor() {
        //console.log("Mayelli")
        this.app = express();
        this.port = process.env.PORT || '3016';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Está ejecutandose en el puerto "+ this.port);
        })
    }
    
    router(){
        this.app.use(rUser)
        this.app.use(rProduct)
        this.app.use("/api/orders",rOrder)
        this.app.use(rPunto)
        this.app.use(rInventario)
    }

    //encapsular funciones para que sean reutilizadas
    midlewares() {
        this.app.use(express.json())
        this.app.use(cors())
    }

    async DBconnect() {
        try {
            await User.sync();
            await Product.sync();
            //await Order.sync({ force: true });
            await Order.sync();
            await Punto.sync();
            await Inventario.sync();
            await sequelize.authenticate();
            console.log("conexión Exitosa");
        } catch (error) {
            console.log("Error de conexión: ", error)
        }
    }
}

export default Server;