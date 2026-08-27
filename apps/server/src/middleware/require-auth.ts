import { auth } from "@calorie-ai-app/auth";
import { createMiddleware } from "hono/factory";
import type { Session, User } from "better-auth/types";

export type AuthEnv = {
  Variables: {
    user: User;
    session: Session;
  };
  Bindings: {
    GOOGLE_GENERATIVE_AI_API_KEY: string;
  };
};

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});
