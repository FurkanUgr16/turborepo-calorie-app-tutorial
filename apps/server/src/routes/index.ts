import { type Hono } from "hono";
import authRouter from "./auth";
import profileRouter from "./profile";
import mealRouter from "./meal";

export const registerRoutes = (app: Hono) => {
  app.route("/", authRouter);
  app.route("/api", profileRouter);
  app.route("/api/meals", mealRouter);
};
