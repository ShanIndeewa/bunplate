import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { jobApplicationReviews } from "core/database/schema";

import type {
    CreateRoute,
    GetByIdRoute,
    ListRoute,
    RemoveRoute,
    UpdateRoute,
} from "@/routes/jobApplicationReviews.routes";

// Session shape placed on ctx by your auth middleware
type Session = {
  userId: string;
};

// 🔍 List ONLY the logged-in reviewer's reviews
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = eq(jobApplicationReviews.reviewerId, session.userId);
  const db = c.get("db");

  const results = await db.query.jobApplicationReviews.findMany({ where });

  const page = 1; // wire real pagination later
  const limit = results.length;
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / Math.max(limit, 1));

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

// ➕ Create new review (bound to current reviewer)
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const now = new Date();

  const [inserted] = await db
    .insert(jobApplicationReviews)
    .values({
      ...body,
      reviewerId: session.userId, // Get reviewerId from session
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔎 Get one (must belong to the logged-in reviewer)
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = and(
    eq(jobApplicationReviews.id, String(id)),
    eq(jobApplicationReviews.reviewerId, session.userId)
  );

  const review = await db.query.jobApplicationReviews.findFirst({ where });

  if (!review) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(review, HttpStatusCodes.OK);
};

// ✏️ Update (only your own row)
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = and(
    eq(jobApplicationReviews.id, String(id)),
    eq(jobApplicationReviews.reviewerId, session.userId)
  );

  const [updated] = await db
    .update(jobApplicationReviews)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(where)
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// 🗑️ Delete (only your own row)
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");
  
  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = and(
    eq(jobApplicationReviews.id, String(id)),
    eq(jobApplicationReviews.reviewerId, session.userId)
  );

  const [deleted] = await db
    .delete(jobApplicationReviews)
    .where(where)
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
