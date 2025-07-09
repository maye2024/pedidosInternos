import { Router } from "express";
import { getInventario, registerInventario, updateInventario } from "../controllers/inventario";
import validateToken from "./validateToken";


const router = Router();

router.post("/api/inventario/register", registerInventario)
router.get("/api/inventario/getInventario", validateToken, getInventario)
router.put('/api/inventario/:id', updateInventario);

export default router