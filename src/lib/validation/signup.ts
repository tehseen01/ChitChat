import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must not exceed 25 characters")
    .nonempty("Name is required"),
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "Username can only contain letters, numbers, underscore, hyphen, or dot"
    )
    .nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
