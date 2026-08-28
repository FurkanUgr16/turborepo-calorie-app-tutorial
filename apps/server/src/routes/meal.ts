import { Hono } from "hono";
import { requireAuth, type AuthEnv } from "@/middleware/require-auth";
import {
  createMeal,
  dailySummary,
  getMealsForDate,
  getMealById,
} from "@/services/meal";
import { saveMealSchema } from "@calorie-ai-app/auth/schemas/meal";

const mealRouter = new Hono<AuthEnv>()
  .post("/", requireAuth, async (c) => {
    const parsed = saveMealSchema.safeParse(await c.req.json());

    if (!parsed.success) {
      return c.json({ error: parsed.error }, 400);
    }

    try {
      const saved = await createMeal(c.get("user").id, parsed.data);
      return c.json({ success: true, meal: saved });
    } catch (error) {
      return c.json({ error: (error as Error).message }, 500);
    }
  })
  .get("/", requireAuth, async (c) => {
    const date = c.req.query("date");

    if (!date) {
      return c.json({ error: "Date is required" }, 400);
    }

    const meals = await getMealsForDate(c.get("user").id, date);
    return c.json({ meals });
  })
  .get("/today", requireAuth, async (c) => {
    const date = c.req.query("date") ?? new Date().toISOString().split("T")[0]!;
    const meals = await getMealsForDate(c.get("user").id, date);
    return c.json({ summary: dailySummary(meals), meals });
  })
  .get("/:id", requireAuth, async (c) => {
    const id = c.req.param("id");
    const meal = await getMealById(c.get("user").id, id);

    if (!meal) {
      return c.json({ error: "Meal not found" }, 404);
    }

    return c.json({ meal });
  });

export default mealRouter;
