import { z } from "zod";

export const signupSchema = z.object({
  fname: z.string().trim().min(1, "First name is required"),
  lname: z.string().trim().min(1, "Last name is required"),
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .regex(
      /^[A-Z][A-Za-z_]*$/,
      "Username must start with a capital letter and use only letters or underscores",
    ),
  email: z.string().pipe(z.email("Enter a valid email address").lowercase()),
  userType: z.enum(["author", "user"]),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be 20 characters or fewer"),
});
