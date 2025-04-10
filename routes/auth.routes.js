import { Router } from "express";
import { Register } from "../controllers/auth.controllers.js";

const AuthRoutes = Router();

AuthRoutes.post("/register", Register)

export default AuthRoutes;