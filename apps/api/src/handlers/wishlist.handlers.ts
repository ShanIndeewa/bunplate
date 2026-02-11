// src/modules/wishlist/wishlist.handlers.ts
import { and, eq, sql } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { jobWishlist } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "@/routes/wishlist.routes";

// ---- helpers --------------------------------------------------------------

function toInt(n: unknown, fallback: number) {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : fallback;
}

// ---- Handlers -------------------------------------------------------------

// List all wishlist items (scoped to the authenticated user)
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  const session = c.get("session");
  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // If your queryParamsSchema includes page/limit, pull them from validated query:
  const query = c.req.valid("query") as
    | { page?: number; limit?: number }
    | undefined;
  const page = toInt(query?.page, 1);
  const limit = toInt(query?.limit, 10);
  const offset = (page - 1) * limit;

  // Total count for this user
  const [countRow] = await db
    .select({ count: sql<number>`CAST(count(*) AS int)` })
    .from(jobWishlist)
    .where(eq(jobWishlist.userId, session.userId));

  const totalCount = countRow?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / (limit || 1)));

  const results = await db.query.jobWishlist.findMany({
    where: eq(jobWishlist.userId, session.userId),
    orderBy: (tbl, { desc }) => [desc(tbl.createdAt)],
    limit,
    offset,
  });

  return c.json(
    {
      data: results,
      meta: {
        totalCount,
        limit,
        currentPage: page,
        totalPages,
      },
    },
    HttpStatusCodes.OK
  );
};

// Create new wishlist item (user-scoped)
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  try {
    const [inserted] = await db
      .insert(jobWishlist)
      .values({
        ...body,
        userId: session.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return c.json(inserted, HttpStatusCodes.CREATED);
  } catch (err: unknown) {
    // Handle duplicate (userId, jobId) unique index
    const msg = String(err ?? "");
    if (msg.includes("user_job_unique") || msg.includes("duplicate")) {
      return c.json(
        { message: "This job is already in your wishlist." },
        HttpStatusCodes.NOT_FOUND // Use NOT_FOUND (404) if 409 is not allowed by your route config
      );
    }
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }
};

// Get a single wishlist item (must belong to the user)
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const item = await db.query.jobWishlist.findFirst({
    where: and(
      eq(jobWishlist.id, String(id)),
      eq(jobWishlist.userId, session.userId)
    ),
  });

  if (!item) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(item, HttpStatusCodes.OK);
};

// Update wishlist item (must belong to the user)
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [updated] = await db
    .update(jobWishlist)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(jobWishlist.id, String(id)),
        eq(jobWishlist.userId, session.userId)
      )
    )
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete wishlist item (must belong to the user)
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [deleted] = await db
    .delete(jobWishlist)
    .where(
      and(
        eq(jobWishlist.id, String(id)),
        eq(jobWishlist.userId, session.userId)
      )
    )
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  // 204 No Content; no response body
  c.status(HttpStatusCodes.NO_CONTENT);
  return c.body(null);
};
