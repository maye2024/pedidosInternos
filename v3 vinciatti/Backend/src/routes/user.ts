import { Router } from "express";
import { getUsers, login, register } from "../controllers/user";
import validateToken from "./validateToken";



const router = Router();

router.post("/api/user/register", register)
router.post("/api/user/login", login)
router.get("/api/user/getUsers", validateToken,getUsers)

export default router;