import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[^0-9]*$/, { message: 'Name should not contain numbers' }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address (e.g., john@example.com)"),
  age: z
    .number()
    .min(20, "Age must be at least 20")
    .int("Age must be a whole number"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/[@#$&]/, { message: 'Password must contain at least one special character (@, #, $, &)' }),
  linkedInUrl: z
    .string()
    .regex(
      /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/,
      { message: 'LinkedIn URL must be a valid profile link (e.g., https://www.linkedin.com/in/username/)' }
    ),
});

export const loginSchema = z.object({

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address (e.g., john@example.com)"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(/[@#$&]/, { message: 'Password must contain at least one special character (@, #, $, &)' }),
});

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  otp: z
    .string()
    .min(1, "Verification code is required")
    .length(3, "Verification code must be 3 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers")
});

export const productSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" }),
  price: z
    .number()
    .min(0, { message: "Price cannot be negative" }),
  description: z
    .string()
    .optional(),
  stock: z
    .number()
    .min(0, { message: "Stock cannot be negative" }),
  category: z
    .string()
    .optional(),
  rating: z
    .number()
    .min(0)
    .optional(),
  image: z
    .string()
    .optional(),
});

export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
export type ProductData = z.infer<typeof productSchema>;