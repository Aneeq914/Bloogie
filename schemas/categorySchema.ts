import { z } from "zod";

export const categorySchema = z.object({
  categoriesTitle: z.string().trim().min(1, "Category title is required"),
});
