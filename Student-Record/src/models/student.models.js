import { model, Schema } from "mongoose";

import { StudentGenderEnumArray } from "../utils/constent.js";

const studentSchema = new Schema(
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

    rollno: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    mobileno: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: StudentGenderEnumArray,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    currentsemester: {
      type: Number,
      required: true,
    },

    markssheet: {
      type: [{ url: String, mark: Number }],
      default: [],
    },
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);

export default Student;
