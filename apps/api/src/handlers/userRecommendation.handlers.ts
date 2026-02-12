import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { userRecommendations } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "@/routes/userRecommendation.routes";

// Shape of your auth/session object stored on the context
type Session = {
  userId: string;
  activeOrganizationId?: string | null;
};

// 🧭 List ONLY the logged-in user's recommendations (optionally scoped by org)
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = session.activeOrganizationId
    ? and(
        eq(userRecommendations.userId, session.userId),
        eq(userRecommendations.organizationId, session.activeOrganizationId)
      )
    : eq(userRecommendations.userId, session.userId);

  const results = await db.query.userRecommendations.findMany({ where });

  const page = 1; // You can wire up real pagination later
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

// ➕ Create a recommendation for the logged-in user/org
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [inserted] = await db
    .insert(userRecommendations)
    .values({
      ...body,
      organizationId: session.activeOrganizationId ?? null,
      userId: session.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// 🔍 Get one (must belong to the logged-in user)
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

  const where = session.activeOrganizationId
    ? and(
        eq(userRecommendations.id, String(id)),
        eq(userRecommendations.userId, session.userId),
        eq(userRecommendations.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(userRecommendations.id, String(id)),
        eq(userRecommendations.userId, session.userId)
      );

  const rec = await db.query.userRecommendations.findFirst({ where });

  if (!rec) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(rec, HttpStatusCodes.OK);
};

// ✏️ Update (only your own row)
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = session.activeOrganizationId
    ? and(
        eq(userRecommendations.id, String(id)),
        eq(userRecommendations.userId, session.userId),
        eq(userRecommendations.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(userRecommendations.id, String(id)),
        eq(userRecommendations.userId, session.userId)
      );

  const [updated] = await db
    .update(userRecommendations)
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
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = session.activeOrganizationId
    ? and(
        eq(userRecommendations.id, String(id)),
        eq(userRecommendations.userId, session.userId),
        eq(userRecommendations.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(userRecommendations.id, String(id)),
        eq(userRecommendations.userId, session.userId)
      );

  const [deleted] = await db
    .delete(userRecommendations)
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
