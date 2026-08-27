import { type Hono } from "hono";
import authRouter from "./auth";
import profileRouter from "./profile";

export const registerRoutes = (app: Hono) => {
  app.route("/", authRouter);
  app.route("/api", profileRouter);
};
