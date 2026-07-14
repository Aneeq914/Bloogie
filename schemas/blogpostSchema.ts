import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z
    .string()
    .min(1, "Author is required")
    .regex(/^[A-Za-z]+(?:[ '.-][A-Za-z]+)*$/, {
      message: "Invalid author name",
    }),
  image: z.string().min(1, "Image is required"),
  shortDescription: z
    .string()
    .min(10, "A Short Description must be added")
    .max(150, "It's a Short Description"),
  longDescription: z.string().min(100, "A Detailed Description must be added"),
  tags: z.string().optional(),
});
