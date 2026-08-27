import { z } from "zod";

export const profileSchema = z.object({
  age: z.coerce
    .number({ error: "Age is required" })
    .int("Age must be a whole number")
    .min(10, "Age must be at least 10")
    .max(120, "Age must be under 120"),
  height: z.coerce
    .number({ error: "Height is required" })
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height must be under 300 cm"),
  weight: z.coerce
    .number({ error: "Weight is required" })
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight must be under 500 kg"),
  goal: z.enum(["lose", "maintain", "gain"], {
    error: "Please select a goal",
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
