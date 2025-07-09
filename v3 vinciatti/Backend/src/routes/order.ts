import { Router } from "express";
import { getOrders, registerOrder, updateOrder } from "../controllers/order";
import validateToken from "./validateToken";


const router = Router();

router.post("/register", registerOrder)
router.get("/getOrders", validateToken, getOrders)
router.put('/:id', updateOrder);

export default router