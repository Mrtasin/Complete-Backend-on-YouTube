import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  getProfile,
  isVerify,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middleware/user.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), registerUser);
userRoutes.post("/verify/:token", isVerify);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", isLoggedIn, logoutUser);
userRoutes.get("/me", isLoggedIn, getProfile);

export default userRoutes;
