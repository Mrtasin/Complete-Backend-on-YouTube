import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), userRegister);
