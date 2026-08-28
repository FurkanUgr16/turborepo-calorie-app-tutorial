import { z } from "zod";

export const mealAnalysisRequestSchema = z.object({
  image_base64: z.string().min(1, "Image data is required"),
  media_type: z
    .enum(["image/jpeg", "image/png", "image/webp"])
    .default("image/jpeg"),
});

export type MealAnalysisRequest = z.infer<typeof mealAnalysisRequestSchema>;

export const mealAnalysisResponseSchema = z.object({
  food_items: z.array(
    z.object({
      name: z.string(),
      confidence: z.number().min(0).max(1),
    }),
  ),
  nutrition: z.object({
    calories: z.number(),
    protein_g: z.number(),
    carbs_g: z.number(),
    fat_g: z.number(),
  }),
  portion_estimate: z.string(),
  dietary_tags: z.array(z.string()),
  health_notes: z.string(),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack", "unknown"]),
});

export type MealAnalysisResponse = z.infer<typeof mealAnalysisResponseSchema>;

export const saveMealSchema = z.object({
  food_items: z.array(
    z.object({ name: z.string(), confidence: z.number().min(0).max(1) }),
  ),
  nutrition: z.object({
    calories: z.number(),
    protein_g: z.number(),
    carbs_g: z.number(),
    fat_g: z.number(),
  }),
  portion_estimate: z.string().min(1),
  dietary_tags: z.array(z.string()),
  health_notes: z.string(),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snack", "unknown"]),
  image_url: z.string().optional(),
});

export type SaveMealRequest = z.infer<typeof saveMealSchema>;
