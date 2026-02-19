import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { getAuth } from "core/auth/setup";

import { APIBindings, OpenAPI } from "@/types";
import { BASE_PATH } from "./constants";
import { getDatabase } from "core/database";
import { logger } from "hono/logger";

// Create a new OpenAPIHono instance with API Bindings
export function createAPIRouter(): OpenAPIHono<APIBindings> {
  return new OpenAPIHono<APIBindings>({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        const errors = result.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        console.error("[validation] Request validation failed:", JSON.stringify(errors));
        return c.json(
          { success: false, errors },
          422
        );
      }
    }
  });
}

// Setup API
export function setupAPI(): OpenAPIHono<APIBindings> {
  const api = createAPIRouter().basePath(BASE_PATH) as OpenAPI;

  // Logging Middleware
  api.use("*", logger());

  // CORS Middleware
  api.use(
    "*",
    cors({
      origin: (origin) => {
        const allowedOrigins = [
          "http://localhost:3000",
          "http://localhost:4000",
          // "https://bunplate-web.vercel.app",
          // "https://bunplate-api.vercel.app"
        ];
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return process.env.CLIENT_URL!;
        return allowedOrigins.includes(origin)
          ? origin
          : process.env.CLIENT_URL!;
      },
      allowHeaders: ["Content-Type", "Authorization", "Cookie"],
      allowMethods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
      exposeHeaders: ["Content-Length", "Set-Cookie"],
      maxAge: 600,
      credentials: true
    })
  );

  // Serve Favicon for fun
  api.use("*", serveEmojiFavicon("🍔"));

  // Inject Database into context
  api.use("*", async (c, next) => {
    const database = getDatabase();
    c.set("db", database);
    await next();
  });

  // Register BetterAuth Routing for API
  api.on(["POST", "GET"], "/auth/*", (c) => {
    const auth = getAuth();
    return auth.handler(c.req.raw);
  });

  // Error Handling Middleware — log full error for debugging
  api.onError((err, c) => {
    console.error("[onError] Unhandled error:", err.message || err);
    console.error("[onError] Stack:", err.stack);
    return c.json(
      { message: err.message || "Internal Server Error" },
      500
    );
  });

  // Not Found Middleware
  api.notFound(notFound);

  return api;
}
