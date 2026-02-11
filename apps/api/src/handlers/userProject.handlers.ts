import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { userProjects } from "core/database/schema";

import type {
  CreateRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "@/routes/userProject.routes";

// Session shape placed on ctx by your auth middleware
type Session = {
  userId: string;
  activeOrganizationId?: string | null;
};

// 🔍 List ONLY current user's projects (optionally scoped by org)
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
        eq(userProjects.userId, session.userId),
        eq(userProjects.organizationId, session.activeOrganizationId)
      )
    : eq(userProjects.userId, session.userId);

  const results = await db.query.userProjects.findMany({ where });

  // basic pagination scaffold (replace with real pagination later)
  const page = 1;
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

// ➕ Create new userProject (bound to current user/org)
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
    .insert(userProjects)
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

// 🔎 Get one project (must belong to current user)
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
        eq(userProjects.id, String(id)),
        eq(userProjects.userId, session.userId),
        eq(userProjects.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(userProjects.id, String(id)),
        eq(userProjects.userId, session.userId)
      );

  const project = await db.query.userProjects.findFirst({ where });

  if (!project) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(project, HttpStatusCodes.OK);
};

// ✏️ Update (only own project)
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
        eq(userProjects.id, String(id)),
        eq(userProjects.userId, session.userId),
        eq(userProjects.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(userProjects.id, String(id)),
        eq(userProjects.userId, session.userId)
      );

  const [updated] = await db
    .update(userProjects)
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

// 🗑️ Delete (only own project)
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
        eq(userProjects.id, String(id)),
        eq(userProjects.userId, session.userId),
        eq(userProjects.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(userProjects.id, String(id)),
        eq(userProjects.userId, session.userId)
      );

  const [deleted] = await db.delete(userProjects).where(where).returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
