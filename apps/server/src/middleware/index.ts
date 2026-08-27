import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "@calorie-ai-app/env/server";

export const registerMiddleware = (app: Hono) => {
  app.use(logger()).use(
    "/*",
    cors({
      origin: env.CORS_ORIGIN,
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: [
        "Content-Type",
        "Authorization",
        "expo-origin",
        "x-skip-oauth-proxy",
        "cookie",
      ],
      exposeHeaders: ["set-cookie"],
      credentials: true,
    }),
  );
};
