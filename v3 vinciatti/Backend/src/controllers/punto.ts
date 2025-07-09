import {Request, Response} from 'express'
import { Punto, PuntosInstance } from '../models/punto'

export const registerPunto = async(req: Request, res: Response) => {
    const {name, direccion, ciudad, telefono} = req.body

    Punto.create({
        name: name,
        direccion: direccion,
        ciudad: ciudad,
        telefono: telefono,
        status: 1,
    })

    res.json({
        msg: `Punto ${name} create success`
    })

}

export const getPuntos = async(req: Request, res: Response) => {
    const listPuntos = await Punto.findAll();
    res.json({listPuntos})
}

export const updatePuntos = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, direccion, ciudad, telefono } = req.body;
  
      const punto = await Punto.findByPk(id) as PuntosInstance;
      if (!punto) {
        res.status(404).json({ message: "Punto no encontrado" });
        return
      }
  
      punto.name = name;
      punto.direccion = direccion;
      punto.ciudad = ciudad;
      punto.telefono = telefono;
      await punto.save();
  
      res.json({ message: "Punto de venta actualizado correctamente", punto });
    } catch (error) {
      console.error("Error al actualizar el punto de venta:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deletePunto = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      const punto = await Punto.findByPk(id) as PuntosInstance;
      if (!punto) {
        res.status(404).json({ message: "Punto no encontrado" });
        return;
      }
  
      await punto.destroy();
      
      res.json({ message: "Punto de venta eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el punto de venta:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
