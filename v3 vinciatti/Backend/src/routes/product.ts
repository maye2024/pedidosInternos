import { Router } from "express";
import { getProducts, registerProduct, updateProducts, deleteProduct } from "../controllers/product";
import validateToken from "./validateToken";


const router = Router();

router.post("/api/product/register", registerProduct)
router.get("/api/product/getProducts", validateToken, getProducts)
router.put('/api/product/:id', updateProducts);
router.delete('/api/product/:id', deleteProduct);

export default router