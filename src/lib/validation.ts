import { z } from "zod";

const nonEmptyString = (message: string) => z.string().trim().min(1, message);

export const signUpSchema = z.object({
  email: nonEmptyString("An email is required.").email(
    "Invalid email address.",
  ),
  username: nonEmptyString("Please choose a username.").regex(
    /^[a-zA-Z0-9_-]+$/,
    "Invalid username format.",
  ),
  password: nonEmptyString("Please choose a password.")
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@$%*?&._\-])[A-Za-z\d!@$%*?&._\-]{8,}$/,
      "Password must contain at least an uppercase letter, a number, and a special character.",
    ),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: nonEmptyString("Please choose a username."),
  password: nonEmptyString("Please choose a password."),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: nonEmptyString(
    "You can't submit an empty post. Please write something.",
  ),
});

export const updateUserProfileSchema = z.object({
  displayName: nonEmptyString("Please choose a name.").regex(
    /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/,
    "Please choose a valid first name or alias.",
  ),
  bio: z.string().max(200, "Bio must not exceed 200 characters."),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
