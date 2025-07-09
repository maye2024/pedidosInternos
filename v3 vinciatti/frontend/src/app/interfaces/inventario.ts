import { Product } from './product';

export interface Inventario {
    id?: number;
    description: string;
    productoId: number;
    Product?: Product;
    entrada?: number;
    salida?: number;
    saldo?: number;
}
