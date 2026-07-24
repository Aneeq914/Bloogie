import mongoose, { Schema } from "mongoose";

const CategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
