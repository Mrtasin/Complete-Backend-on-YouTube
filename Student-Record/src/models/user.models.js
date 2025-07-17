import { model, Schema } from "mongoose";
import { UserRoleEnum, UserRoleEnumArray } from "../utils/constent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    refreshToken: String,
    verificationToken: String,
    verificationExpiry: Date,
    resetVerificationToken: String,
    resetVerificationExpiry: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });

  this.refreshToken = token;

  return token;
};

userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(35).toString("hex");
  this.verificationToken = token;
  this.verificationExpiry = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = model("User", userSchema);
export default User;
