import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().trim().min(1, "Category title is required"),
});
