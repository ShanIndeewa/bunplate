import { MiddlewareHandler } from "hono";

import { getAuth } from "core/auth/setup";

import { APIBindings } from "@/types";

export const authMiddleware: MiddlewareHandler<APIBindings> = async (
  c,
  next
) => {
  try {
    const auth = getAuth();
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    console.log("[auth] cookie:", c.req.raw.headers.get("cookie") ? "present" : "missing", "| session:", session ? "valid" : "null");

    if (!session) {
      c.set("session", null);
      c.set("user", null);
      return next();
    }

    c.set("session", session.session);
    c.set("user", session.user);
    return next();
  } catch (error: any) {
    console.error("[auth] middleware error:", error.message || error);
    c.set("session", null);
    c.set("user", null);
    return next();
  }
};
