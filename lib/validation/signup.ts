import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must not exceed 20 characters"),
  // username: z
  //   .string()
  //   .regex(
  //     /^[a-zA-Z0-9_.-]+$/,
  //     "Username can only contain letters, numbers, underscore, hyphen, or dot"
  //   ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
