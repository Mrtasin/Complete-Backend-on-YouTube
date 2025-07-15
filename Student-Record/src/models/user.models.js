import { model, Schema } from "mongoose";
import { UserRoleEnum, UserRoleEnumArray } from "../utils/constent.js";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        loaclpath: String,
      },
      default: {
        url: "https://placehold.co/600x400/orange/white",
        loaclpath: "",
      },
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: UserRoleEnumArray,
      default: UserRoleEnum.USER,
    },

    dpt: String,

    verificationToken: String,
    verificationExpiry: Date,
    resetVerificationToken: String,
    resetVerificationExpiry: Date,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
