import { registerUser } from "../controllers/user.controllers.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/register", registerUser);

export default userRoutes;
