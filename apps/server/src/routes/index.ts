import { type Hono } from "hono";
import authRouter from "./auth";
import profileRouter from "./profile";
import mealRouter from "./meal";
import insightsRouter from "./insights";
import { analyzeRouter } from "./analyze";

export const registerRoutes = (app: Hono) => {
  return app
    .route("/", authRouter)
    .route("/api", profileRouter)
    .route("/api/meals", mealRouter)
    .route("/api/insights", insightsRouter)
    .route("api/analyze", analyzeRouter);
};
