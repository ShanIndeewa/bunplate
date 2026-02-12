/* eslint-disable prefer-const */
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { APIRouteHandler } from "@/types";
import { industries } from "core/database/schema";
import type {
  AddNewIndustryRoute,
  GetIndustriesRoute,
  RemoveIndustryRoute,
  UpdateIndustryRoute,
} from "../../../routes/company/industries.routes";

// Extend session type to include activeOrganizationId from auth schema
type SessionWithOrg = {
  activeOrganizationId?: string | null;
  [key: string]: unknown;
};

// List all industries
export const getIndustriesHandler: APIRouteHandler<GetIndustriesRoute> = async (
  c
) => {
  const db = c.get("db");
  const industries = await db.query.industries.findMany();
  return c.json(industries, HttpStatusCodes.OK);
};

// Add new industry
export const addNewIndustryHandler: APIRouteHandler<
  AddNewIndustryRoute
> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (!(session as SessionWithOrg).activeOrganizationId) {
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );
  }

  const [insertedIndustry] = await db
    .insert(industries)
    .values(body)
    .returning();
  return c.json(insertedIndustry, HttpStatusCodes.CREATED);
};

// Update industry
export const updateIndustryHandler: APIRouteHandler<
  UpdateIndustryRoute
> = async (c) => {
  const params = c.req.valid("param");
  const body = c.req.valid("json");
  const session = c.get("session");
  const db = c.get("db");
  const user = c.get("user");

  if (!session || !user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (!(session as SessionWithOrg).activeOrganizationId) {
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );
  }

  const [updatedIndustry] = await db
    .update(industries)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(industries.id, params.id))
    .returning();

  if (!updatedIndustry) {
    return c.json({ message: "Industry not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(updatedIndustry, HttpStatusCodes.OK);
};

// Remove industry
export const removeIndustryHandler: APIRouteHandler<
  RemoveIndustryRoute
> = async (c) => {
  const params = c.req.valid("param");
  const session = c.get("session");
  const user = c.get("user");
  const db = c.get("db");

  if (!session || !user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (!(session as SessionWithOrg).activeOrganizationId) {
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );
  }

  const [deletedIndustry] = await db
    .delete(industries)
    .where(eq(industries.id, params.id))
    .returning();

  if (!deletedIndustry) {
    return c.json({ message: "Industry not found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(
    { message: "Industry deleted successfully" },
    HttpStatusCodes.OK
  );
};
