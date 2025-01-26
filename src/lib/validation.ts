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
  mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachments."),
});

export const updateUserProfileSchema = z.object({
  displayName: nonEmptyString("Please choose a name.").regex(
    /^(?=.{1,18}$)[A-ZÀ-ÖØ-ÝŁ][a-zà-öø-ÿł]*(?:[’'][a-zà-öø-ÿł]+)?(?: [A-ZÀ-ÖØ-ÝŁ][a-zà-öø-ÿł]*(?:[’'][a-zà-öø-ÿł]+)?)*$/u,
    "Please enter a valid name or alias - with a maximum of 18 letters.",
  ),

  bio: z.string().max(200, "Bio must not exceed 200 characters."),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createCommentSchema = z.object({
  content: nonEmptyString("Please write a comment."),
});
