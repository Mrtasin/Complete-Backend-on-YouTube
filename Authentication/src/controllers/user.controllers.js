import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import crypto from "crypto";

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(401).json({
      message: "All fields are required",
      success: false,
    });
  }

  try {
    const allreadyRegisterdUser = await User.findOne({ email });

    if (allreadyRegisterdUser) {
      return res.status(400).json({
        message: "User allready Registerd",
        success: false,
      });
    }

    const token = crypto.randomBytes(30).toString("hex");

    console.log("Token :- ", token);

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      emailVerificationToken: token,
    });

    if (!newUser) {
      return res.status(401).json({
        message: "User not Registerd",
        success: false,
      });
    }

    // Sending Email

    return res.status(201).json({
      message: "User register successfully",
      success: true,
      user: newUser,
    });


  } catch (error) {
    console.log("Internel server error :- ", error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, name, passsword } = req.body;
};

const logoutUser = async (req, res) => {
  const { email, name, passsword } = req.body;
};

export { registerUser, loginUser, logoutUser };
