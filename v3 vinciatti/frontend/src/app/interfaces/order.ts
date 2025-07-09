import { Product } from "./product";
import { Punto } from "./punto"
import { User } from "./user"


export interface Order{
    id: number;
    description?: string;
    fechaPedido?: Date;
    fechaEntrega?: Date;
    productoId?: number;
    Product?: Product;
    ventaId?: number;
    Punto?: Punto,
    estado?: 'pendiente' | 'entregado';
    usuarioId?: number;
    User?: User;
    cantidad: number
    fechaHoraPedido?: Date;
}