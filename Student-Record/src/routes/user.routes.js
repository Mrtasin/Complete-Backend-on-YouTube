import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { isVerify, registerUser } from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), registerUser);
userRoutes.post("/verify/:token", isVerify);

export default userRoutes;
