import { Request, Response } from 'express';
import { Order, OrderInstance } from '../models/order';
import { Product } from '../models/product';
import { Punto } from '../models/punto';
import { User } from '../models/user';

// Registrar una nueva orden
export const registerOrder = async(req: Request, res: Response) => {
    try {
        const { description, fechaPedido, fechaEntrega, productoId, ventaId, estado, usuarioId, cantidad } = req.body;

        await Order.create({
            description,
            fechaPedido,
            fechaEntrega,
            productoId,
            ventaId,
            estado,
            usuarioId,
            cantidad
        });

        res.json({
            msg: `Order for product ${productoId} created successfully`
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Obtener todas las órdenes
export const getOrders = async(req: Request, res: Response) => {
    try {
        const listOrders = await Order.findAll({
            include: [
                {model: Product, attributes: ['name']},
                {model: Punto, attributes: ['name']},
                {model: User, attributes: ['name', 'lastname']}
            ]
        });
        res.json({ listOrders });
    } catch (error) {
        console.error("Error retrieving orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { fechaEntrega, estado } = req.body;
  
      const order = await Order.findByPk(id) as OrderInstance;
      if (!order) {
        res.status(404).json({ message: "Orden no encontrada" });
        return
      }
  
      order.fechaEntrega = fechaEntrega;
      order.estado = estado;
      await order.save();
  
      res.json({ message: "Orden actualizada correctamente", order });
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
};
