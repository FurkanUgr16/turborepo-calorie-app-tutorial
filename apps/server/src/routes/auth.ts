import { Hono } from "hono";
import { auth } from "@calorie-ai-app/auth";

const authRouter = new Hono();

authRouter.on(["GET", "POST"], "/api/auth/*", async (c) =>
  auth.handler(c.req.raw),
);

export default authRouter;
