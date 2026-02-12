/* eslint-disable prefer-const */
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { APIRouteHandler } from "@/types";

import { companyImages } from "core/database/schema";
import type {
  AddNewCompanyImagesRoute,
  GetCompanyImagesRoute,
  RemoveCompanyImageRoute,
  UpdateCompanyImageRoute,
} from "../../../routes/company/company-images.routes";

// Extend session type to include activeOrganizationId from auth schema
type SessionWithOrg = {
  activeOrganizationId?: string | null;
  [key: string]: unknown;
};

/**
 * ================================================================
 * Company images Handlers
 * ================================================================
 */

// List company images route handler
export const getCompanyImagesHandler: APIRouteHandler<
  GetCompanyImagesRoute
> = async (c) => {
  const db = c.get("db");
  const params = c.req.valid("param");

  const allCompanyImages = await db.query.companyImages.findMany({
    where: (fields, { eq }) => eq(fields.companyId, params.id),
  });

  return c.json(allCompanyImages, HttpStatusCodes.OK);
};

// Add new company images route handler
export const addNewCompanyImagesHandler: APIRouteHandler<
  AddNewCompanyImagesRoute
> = async (c) => {
  const body = c.req.valid("json");
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

  const insertedImages = await db
    .insert(companyImages)
    .values(body)
    .returning();

  return c.json(insertedImages, HttpStatusCodes.CREATED);
};

// Update company image route handler
export const updateCompanyImageHandler: APIRouteHandler<
  UpdateCompanyImageRoute
> = async (c) => {
  const params = c.req.valid("param");
  const body = c.req.valid("json");
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

  const [updatedImage] = await db
    .update(companyImages)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(companyImages.id, params.id))
    .returning();

  return c.json(updatedImage, HttpStatusCodes.OK);
};

// Remove company image route handler
export const removeCompanyImageHandler: APIRouteHandler<
  RemoveCompanyImageRoute
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

  const [deletedImage] = await db
    .delete(companyImages)
    .where(eq(companyImages.id, params.id))
    .returning();

  if (!deletedImage) {
    return c.json(
      { message: "Image not found" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json({ message: "Company image removed successfully" }, HttpStatusCodes.OK);
};
