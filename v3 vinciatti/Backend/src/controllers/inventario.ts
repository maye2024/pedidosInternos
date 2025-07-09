import { Request, Response } from 'express';
import { Inventario, InventarioInstance } from '../models/inventario';
import { Product } from '../models/product';

// Registrar un nuevo inventario
// export const registerInventario = async(req: Request, res: Response) => {
//     try {
//         const { description, productoId, entrada, salida, saldo } = req.body;

//         await Inventario.create({
//             description,
//             productoId,
//             entrada,
//             salida,
//             saldo
//         });

//         res.json({
//             msg: `Inventario for product ${productoId} created successfully`
//         });
//     } catch (error) {
//         console.error("Error creating inventario:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const registerInventario = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { description, productoId, entrada, salida } = req.body;

        // 1️⃣ Verificar si el producto ya está en el inventario
        const existingInventario = await Inventario.findOne({ where: { productoId } });

        if (existingInventario) {
            res.status(400).json({ message: "El producto ya está registrado en el inventario." });
            return; // 🔴 IMPORTANTE: Agrega return aquí para evitar que continúe ejecutándose
        }

        // 2️⃣ Calcular saldo si no se proporciona
        const saldo = (entrada ?? 0) - (salida ?? 0);

        // 3️⃣ Crear nuevo registro si no existe
        await Inventario.create({
            description,
            productoId,
            entrada,
            salida,
            saldo
        });

        res.status(201).json({
            msg: `Inventario para el producto ${productoId} creado exitosamente`
        });

    } catch (error) {
        console.error("Error al crear inventario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Obtener todos los productos del inventario
export const getInventario = async(req: Request, res: Response) => {
    try {
        const listInventario = await Inventario.findAll({
            include: [
                {model: Product, attributes: ['name']}
            ]
        });
        res.json({ listInventario });
    } catch (error) {
        console.error("Error retrieving inventario:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateInventario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { description, entrada, salida, saldo } = req.body;
  
      const inventario = await Inventario.findByPk(id) as InventarioInstance;
      if (!inventario) {
        res.status(404).json({ message: "Orden no encontrada" });
        return
      }
  
      inventario.description = description;
      inventario.entrada = entrada;
      inventario.salida = salida;
      inventario.saldo = saldo;
      await inventario.save();
  
      res.json({ message: "Inventario actualizado correctamente", inventario });
    } catch (error) {
      console.error("Error al actualizar el inventario:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
};
