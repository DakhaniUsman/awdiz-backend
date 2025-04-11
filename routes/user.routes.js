import { Router } from "express";
import { Users } from "../controllers/user.controllers.js";

const UserRoutes = Router();

UserRoutes.get("/get-user", Users)

export default UserRoutes;