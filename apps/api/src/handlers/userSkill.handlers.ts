import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { userSkills } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "@/routes/userSkill.routes";

// Session shape placed on ctx by your auth middleware
type Session = {
  userId: string;
  activeOrganizationId?: string | null;
};

// 🔍 List ONLY the logged-in user's skills (optionally scoped by org)
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
        eq(userSkills.userId, session.userId),
        eq(userSkills.organizationId, session.activeOrganizationId)
      )
    : eq(userSkills.userId, session.userId);

  const results = await db.query.userSkills.findMany({ where });

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

// ➕ Create new userSkill (bound to current user/org)
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

  const now = new Date();

  const [inserted] = await db
    .insert(userSkills)
    .values({
      ...body,
      organizationId: session.activeOrganizationId ?? null,
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
        eq(userSkills.id, String(id)),
        eq(userSkills.userId, session.userId),
        eq(userSkills.organizationId, session.activeOrganizationId)
      )
    : and(eq(userSkills.id, String(id)), eq(userSkills.userId, session.userId));

  const skill = await db.query.userSkills.findFirst({ where });

  if (!skill) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(skill, HttpStatusCodes.OK);
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
        eq(userSkills.id, String(id)),
        eq(userSkills.userId, session.userId),
        eq(userSkills.organizationId, session.activeOrganizationId)
      )
    : and(eq(userSkills.id, String(id)), eq(userSkills.userId, session.userId));

  const [updated] = await db
    .update(userSkills)
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
        eq(userSkills.id, String(id)),
        eq(userSkills.userId, session.userId),
        eq(userSkills.organizationId, session.activeOrganizationId)
      )
    : and(eq(userSkills.id, String(id)), eq(userSkills.userId, session.userId));

  const [deleted] = await db.delete(userSkills).where(where).returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
