import { getPuntos, registerPunto, updatePuntos, deletePunto } from "../controllers/punto";
import validateToken from "./validateToken";
import { Router } from "express";


const router = Router();

router.post("/api/punto/register", registerPunto)
router.get("/api/punto/getPuntos", validateToken, getPuntos)
router.put('/api/punto/:id', updatePuntos);
router.delete('/api/punto/:id', deletePunto);

export default router