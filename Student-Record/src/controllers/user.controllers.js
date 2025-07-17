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

    const avatarPath = req.file?.avatar;
    console.log(avatarPath);

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
      route: "/verify",
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
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};
const logoutUser = async (req, res) => {
  try {
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};
const isVerify = async (req, res) => {
  try {
  } catch (error) {
    console.error("Internel server Error :-", error.message);

    throw new ApiError(500, "Internel server Error", error);
  }
};

export { registerUser, loginUser, logoutUser, isVerify };
