import mongoose, { Schema } from "mongoose";
import { CategoryProps } from "@/type";

const CategorySchema: Schema<CategoryProps> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
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
