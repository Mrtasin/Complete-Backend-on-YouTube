import User from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) throw new ApiError(401, "User not loggedin");

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) throw new ApiError(401, "User not loggedin");

    const user = await User.findById(decoded._id);
    if (!user) throw new ApiError(401, "User not loggedin");

    req.user = user;

    next();
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};

export default isLoggedIn;
