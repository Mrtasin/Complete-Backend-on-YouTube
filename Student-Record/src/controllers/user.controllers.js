import User from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import fileUplodeOnCloudinary from "../utils/cloudinary.js";
import sendingEmail from "../utils/sendingEmail.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password, dpt } = req.body;

    if (
      [fullname, username, email, password, dpt].some(
        (element) => element?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const allreadyRegisterUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (allreadyRegisterUser) throw new ApiError(401, "Allready Register User");

    const avatarPath = req.file?.path;

    const avatar = await fileUplodeOnCloudinary(avatarPath);

    const user = await User.create({
      fullname,
      email,
      password,
      username,
      dpt,
      avatar: {
        url: avatar ? avatar.url : "https://placehold.co/600x400/orange/white",
      },
    });

    const token = user.generateVerificationToken();

    const options = {
      name: fullname,
      instructions: "Prss button for verification user",
      email: email,
      route: "verify",
      token: token,
      subject: "Email Verification",
    };

    await sendingEmail(options);

    const completeUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!completeUser) throw new ApiError(500, "Error for user register");

    // user.password = undefined;
    // user.refreshToken = undefined;

    return res
      .status(201)
      .json(new ApiResponse(201, "User register successfully", user));
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(username || email) || !password)
      throw new ApiError(400, "All fieleds are required");

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError(404, "Not found user");

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) throw new ApiError(401, "Password is invalid");

    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    await user.save();

    user.refreshToken = undefined;
    user.password = undefined;

    return res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .json(new ApiResponse(200, "User login successfully", user));
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};
const logoutUser = async (req, res) => {
  try {
    req.cookies.accessToken = "";
    req.cookies.refreshToken = "";

    return res
      .status(200)
      .json(new ApiResponse(200, "User Logout Successfully", req.user));
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};
const isVerify = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) throw new ApiError(400, "Token is required");

    const user = await User.findOne({
      $and: [
        { verificationToken: token },
        { verificationExpiry: { $gte: Date.now() } },
      ],
    }).select("-password -refreshToken");
    if (!user) throw new ApiError(401, "Token is invalid");

    user.isVerified = true;
    user.verificationExpiry = undefined;
    user.verificationToken = undefined;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Email verification successfully", user));
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};

const getProfile = async (req, res) => {
  try {
    if (!req.user) throw new ApiError(401, "User not loggedin");

    return res
      .status(200)
      .json(new ApiResponse(200, "Get Profile Successfully", req.user));
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};

export { registerUser, loginUser, logoutUser, isVerify, getProfile };
