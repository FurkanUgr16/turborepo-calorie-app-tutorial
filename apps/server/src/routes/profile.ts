import { Hono } from "hono";
import { requireAuth, type AuthEnv } from "@/middleware/require-auth";
import { getUserProfile, upsertUserProfile } from "@/services/profile";
import { profileSchema } from "@calorie-ai-app/auth/schemas/profile";

const profileRouter = new Hono<AuthEnv>()
  .post("/user/profile", requireAuth, async (c) => {
    const parserProfile = profileSchema.safeParse(await c.req.json());

    if (!parserProfile.success) {
      return c.json({ error: parserProfile.error }, 400);
    }

    await upsertUserProfile(c.get("user").id, parserProfile.data);
    return c.json({ success: true });
  })
  .get("/user/profile", requireAuth, async (c) => {
    const profile = await getUserProfile(c.get("user").id);

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json({ profile });
  });

export default profileRouter;
