import mongoose, { Schema } from "mongoose";
import { RefreshTokenProps } from "@/type";

const RefreshTokenSchema: Schema<RefreshTokenProps> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const RefreshToken =
  mongoose.models.RefreshToken ||
  mongoose.model("RefreshToken", RefreshTokenSchema);

export default RefreshToken;
