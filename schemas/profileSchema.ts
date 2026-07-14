import { z } from "zod";

export const profileSchema = z.object({
  fname: z.string().trim().min(1, "First Name Field Empty").optional(),
  lname: z.string().trim().min(1, "Last Name Field Empty").optional(),
  username: z.string().trim().min(1, "Username Field Empty").optional(),
  email: z.string().trim().pipe(z.email("Enter Valid Email Address")).optional(),
  image : z.string().optional(),
  bio: z.string().trim().max(300, "Bio no longer than 300 Characters").optional(),
});
