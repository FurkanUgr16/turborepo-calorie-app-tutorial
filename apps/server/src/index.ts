import { Hono } from "hono";
import { registerMiddleware } from "./middleware";
import { registerRoutes } from "./routes";

import { logger } from "hono/logger";

const app = new Hono().use(logger());

registerMiddleware(app);
registerRoutes(app);

export default app;
