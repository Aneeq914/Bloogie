import { z } from "zod";

// Every field is optional — a blank one means "leave this as it is". So the
// messages say "cannot be empty", not "is required".
export const profileSchema = z.object({
  fname: z.string().trim().min(1, "First name cannot be empty").optional(),
  lname: z.string().trim().min(1, "Last name cannot be empty").optional(),
  username: z
    .string()
    .trim()
    .min(1, "Username cannot be empty")
    .regex(
      /^[A-Z][A-Za-z_]*$/,
      "Username must start with a capital letter and use only letters or underscores",
    )
    .optional(),
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address"))
    .optional(),
  image: z.string().optional(),
  bio: z
    .string()
    .trim()
    .max(300, "Bio must be 300 characters or fewer")
    .optional(),
});
