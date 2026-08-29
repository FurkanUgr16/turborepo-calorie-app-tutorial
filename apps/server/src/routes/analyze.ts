import { Hono } from "hono";
import { requireAuth, type AuthEnv } from "@/middleware/require-auth";
import { mealAnalysisRequestSchema } from "@calorie-ai-app/auth/schemas/meal";
import { analyzeMealImage } from "@/services/ai";

export const analyzeRouter = new Hono<AuthEnv>().post(
  "/meal",
  requireAuth,
  async (c) => {
    const parsed = mealAnalysisRequestSchema.safeParse(await c.req.json());

    if (!parsed.success) {
      return c.json({ error: parsed.error }, 400);
    }

    const { image_base64, media_type } = parsed.data;

    try {
      const analysis = await analyzeMealImage(image_base64, media_type);

      return c.json({
        success: true,
        analysis: {
          ...analysis,
          metadata: {
            user_id: c.get("user").id,
            timeStamp: new Date().toISOString(),
            meal_type: analysis.meal_type,
          },
        },
      });
    } catch (error) {
      return c.json(
        { error: error instanceof Error ? error.message : String(error) },
        500,
      );
    }
  },
);
