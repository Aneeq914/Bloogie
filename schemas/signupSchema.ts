import { z } from "zod";

export const signupSchema = z.object({
  fname: z.string().trim().min(1, "First Name Field Empty"),
  lname: z.string().trim().min(1, "Last Name Field Empty"),
  username: z.string().trim().min(1, "Username Field Empty"),
  email: z.string().pipe(z.email("Enter Valid Email Address").lowercase()),
  userType: z.enum(["author", "user"]),
  password: z
    .string()
    .min(1, "Password Field Empty")
    .min(8, "Password is atleast 8 Characters Long")
    .max(20, "Password no longer than 20 Characters"),
});
