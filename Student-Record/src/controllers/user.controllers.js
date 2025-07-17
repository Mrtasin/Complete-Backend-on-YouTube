import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = async (req, res) => {
  try {
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
