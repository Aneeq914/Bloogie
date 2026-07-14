import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter Valid Email Address")),
  password: z
    .string().min(1,'Password Field Empty')
    .min(8, "Password is atleast 8 Characters Long")
    .max(20, "Password no longer than 20 Characters"),
});
