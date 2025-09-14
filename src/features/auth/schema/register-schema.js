import * as Z from "zod";

export const registerSchema = Z.object({
  name: Z.string()
    .min(3, { message: "Name is too short" })
    .max(32, { message: "Name is too long" }),

  email: Z.string()
    .min(3, { message: "Email is too short" })
    .email({ message: "Invalid email address" }),

  password: Z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(64, { message: "Password must be at most 64 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});
