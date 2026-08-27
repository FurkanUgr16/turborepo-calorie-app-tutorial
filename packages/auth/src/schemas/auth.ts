import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().trim().min(1, "Email is required"),
  password: z.string().trim().min(8),
});

export const registerSchema = z.object({
  fullName: z.string().min(1),
  email: z.email().trim().min(1, "Email is required"),
  password: z.string().trim().min(8),
  terms: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: z.email().trim().min(1, "Email is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
