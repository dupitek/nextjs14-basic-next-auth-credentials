import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(3, {
      message: "Email or username is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    code: z.optional(z.string()),
});

export const ProfileSchema = z.object({
  email: z.optional(z.string().email()),
  username: z.optional(z.string()),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  image: z.optional(z.string())
})