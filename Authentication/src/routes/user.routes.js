import {
  getProfile,
  isVerify,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";

import userLoggedIn from "../middleware/user.middleware.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/verify/:token", isVerify);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile",userLoggedIn, getProfile);

export default userRoutes;
