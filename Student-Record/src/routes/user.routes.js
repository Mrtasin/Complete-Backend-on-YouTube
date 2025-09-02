import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  forgotPassword,
  getProfile,
  isVerify,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controllers.js";
import isLoggedIn from "../middleware/user.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), registerUser);
userRoutes.post("/verify/:token", isVerify);
userRoutes.post("/login", loginUser);
userRoutes.get("/logout", isLoggedIn, logoutUser);
userRoutes.get("/me", isLoggedIn, getProfile);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:token", resetPassword);

export default userRoutes;
