import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { registerUser } from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), registerUser);

export default userRoutes;
