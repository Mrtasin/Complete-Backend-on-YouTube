import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  isVerify,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), registerUser);
userRoutes.post("/verify/:token", isVerify);
userRoutes.post("/login", loginUser);

export default userRoutes;
