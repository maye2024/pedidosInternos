import {Request, Response} from 'express'
import { Product, ProductInstance } from '../models/product'

export const registerProduct = async(req: Request, res: Response) => {
    const {name, description} = req.body

    Product.create({
        name: name,
        description: description,
        status: 1,
    })

    res.json({
        msg: `Product ${name} create success`
    })

}

export const getProducts = async(req: Request, res: Response) => {
    const listProducts = await Product.findAll();
    res.json({listProducts})
}

export const updateProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
  
      const product = await Product.findByPk(id) as ProductInstance;
      if (!product) {
        res.status(404).json({ message: "Orden no encontrada" });
        return
      }
  
      product.name = name;
      product.description = description;
      await product.save();
  
      res.json({ message: "Producto actualizado correctamente", product });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      const producto = await Product.findByPk(id) as ProductInstance;
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
  
      await producto.destroy();
      
      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
};