import { type Hono } from "hono";
import authRouter from "./auth";
import profileRouter from "./profile";
import mealRouter from "./meal";

export const registerRoutes = (app: Hono) => {
  return app
    .route("/", authRouter)
    .route("/api", profileRouter)
    .route("/api/meals", mealRouter);
};
