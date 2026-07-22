import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  image: z.string().min(1, "Choose a cover image"),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters")
    .max(150, "Short description must be 150 characters or fewer"),
  longDescription: z
    .string()
    .trim()
    .min(100, "Blog content must be at least 100 characters"),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().min(1, "Pick a category"),
});
