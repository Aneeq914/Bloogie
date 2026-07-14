import mongoose, { Schema } from "mongoose";
import { AllBlogProps } from "@/type";

const blogSchema: Schema<AllBlogProps> = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    image: {
      type: String,
      required: [true, "Blog Image is Required"],
    },
    shortDescription: {
      type: String,
      required: [true, "ShortDescription is required"],
      minLength: 10,
      maxLength: 150,
    },
    longDescription: {
      type: String,
      required: [true, "LongDescription is required"],
      minLength: 100,
    },

    publishedAt: {
      type: Date,
      required: [true, " PublishedAt is required"],
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
