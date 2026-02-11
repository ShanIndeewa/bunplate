// jobCategory.handlers.ts
import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { jobCategory } from "core/database/schema";

import type {
    CreateRoute,
    GetByIdRoute,
    GetTypesRoute,
    ListRoute,
    RemoveRoute,
    UpdateRoute,
} from "@/routes/jobCategory.routes";

type Session = {
  userId: string;
  activeOrganizationId?: string | null;
};

// 🔍 List ONLY the logged-in user's job categories
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = eq(jobCategory.userId, session.userId);
  const results = await db.query.jobCategory.findMany({ where });

  const page = 1; // todo: real pagination later
  const limit = results.length;
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / Math.max(limit, 1));

  return c.json(
    {
      data: results,
      meta: { totalCount, limit, currentPage: page, totalPages },
    },
    HttpStatusCodes.OK
  );
};

// 🔍 List ALL job categories (admin/public)
export const listAll: APIRouteHandler<ListRoute> = async (c) => {
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  // Optional: enforce admin access
  if (!session?.userId /* || !session.isAdmin */) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Fetch all job categories
  const results = await db.query.jobCategory.findMany();

  const page = 1; // todo: real pagination later
  const limit = results.length;
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / Math.max(limit, 1));

  return c.json(
    {
      data: results,
      meta: { totalCount, limit, currentPage: page, totalPages },
    },
    HttpStatusCodes.OK
  );
};

// 📋 Get all available job category types
export const getTypes: APIRouteHandler<GetTypesRoute> = async (c) => {
  const types = [
    "Technology",
    "Design",
    "Marketing",
    "Healthcare",
    "Education",
    "Finance",
    "Hospitality",
    "Transportation",
    "Retail",
    "Engineering"
  ];

  return c.json(types, HttpStatusCodes.OK);
};

// ➕ Create new job category (bound to current user)
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const now = new Date();

  const [inserted] = await db
    .insert(jobCategory)
    .values({
      ...body,
      userId: session.userId,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔎 Get one (must belong to the logged-in user)
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param"); // now a string (e.g., uuid)
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = and(
    eq(jobCategory.id, id),
    eq(jobCategory.userId, session.userId)
  );
  const category = await db.query.jobCategory.findFirst({ where });

  if (!category) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(category, HttpStatusCodes.OK);
};

// ✏️ Update (only your own row)
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param"); // string
  const updates = c.req.valid("json");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = and(
    eq(jobCategory.id, id),
    eq(jobCategory.userId, session.userId)
  );

  const [updated] = await db
    .update(jobCategory)
    .set({ ...updates, updatedAt: new Date() })
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
  const db = c.get("db");
  const { id } = c.req.valid("param"); // string
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = and(
    eq(jobCategory.id, id),
    eq(jobCategory.userId, session.userId)
  );

  const [deleted] = await db.delete(jobCategory).where(where).returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
