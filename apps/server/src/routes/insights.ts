import { Hono } from "hono";
import { requireAuth, type AuthEnv } from "@/middleware/require-auth";
import { getWeeklyInsights } from "@/services/insights";

const insightsRouter = new Hono<AuthEnv>().get(
  "/weekly",
  requireAuth,
  async (c) => {
    try {
      const insights = await getWeeklyInsights(c.get("user").id);
      return c.json({ insights });
    } catch (error) {
      return c.json({ error: (error as Error).message }, 500);
    }
  },
);

export default insightsRouter;
