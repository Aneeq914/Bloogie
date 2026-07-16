import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email address")),
  // Login only checks that a password was typed. Enforcing the signup length
  // rules here would lock out any account whose password predates them, and
  // "must be at least 8 characters" is misleading when the real problem is
  // that the password is simply wrong.
  password: z.string().min(1, "Password is required"),
});
