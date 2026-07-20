import mongoose, { Schema } from "mongoose";
import { UserProps } from "@/type";

const UserSchema: Schema<UserProps> = new Schema(
  {
    fname: {
      type: String,
      required: [true, "First Name is Required"],
    },
    lname: {
      type: String,
      required: [true, "Last Name is Required"],
    },
    username: {
      type: String,
      required: [true, "UserName is Required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      trim : true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Passwoed is required"],
      min: 8,
      max: 20,
    },
    userType: {
      default: "user",
      enum: ["user", "author"],
      type: String,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
