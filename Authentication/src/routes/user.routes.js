import {
  forgotPassword,
  getProfile,
  isVerify,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controllers.js";

import userLoggedIn from "../middleware/user.middleware.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/verify/:token", isVerify);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", userLoggedIn, getProfile);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/reset-password/:token", resetPassword);
userRoutes.get("/logout", userLoggedIn, logoutUser);

export default userRoutes;
