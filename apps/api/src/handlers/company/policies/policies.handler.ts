/* eslint-disable prefer-const */
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { APIRouteHandler } from "@/types";

import { companyPolicies } from "core/database/schema";
import type { CompanyPolicy } from "core/zod";
import type {
  AddNewCompanyPoliciesRoute,
  GetCompanyPoliciesRoute,
  RemoveCompanyPolicyRoute,
  UpdateCompanyPolicyRoute,
  UpsertPoliciesToCompanyRoute,
} from "../../../routes/company/policies.routes";

// Extend session type to include activeOrganizationId from auth schema
type SessionWithOrg = {
  activeOrganizationId?: string | null;
  [key: string]: unknown;
};

/**
 * ================================================================
 * Company Policies Handlers
 * ================================================================
 */

// List all policies for a specific company
export const getCompanyPoliciesHandler: APIRouteHandler<
  GetCompanyPoliciesRoute
> = async (c) => {
  const db = c.get("db");
  const params = c.req.valid("param");

  const allPolicies = await db.query.companyPolicies.findMany({
    where: (fields, { eq }) => eq(fields.companyId, params.id),
  });

  return c.json(allPolicies, HttpStatusCodes.OK);
};

// Upsert policies to a specific company
export const upsertPoliciesToCompanyHandler: APIRouteHandler<
  UpsertPoliciesToCompanyRoute
> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const params = c.req.valid("param");
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

  const currentPolicies = await db.query.companyPolicies.findMany({
    where: (fields, { eq }) => eq(fields.companyId, params.id),
  });

  if (currentPolicies.length > 0) {
    // Delete existing policies before upserting
    await db
      .delete(companyPolicies)
      .where(eq(companyPolicies.companyId, params.id));
  }

  let insertedPolicies: CompanyPolicy[] = [];

  await Promise.all(
    body.map(async (policy) => {
      const _insertedPolicy = await db
        .insert(companyPolicies)
        .values({
          companyId: params.id,
          policyType: policy.policyType,
          policyText: policy.policyText,
          effectiveDate: policy.effectiveDate,
          isActive: policy.isActive ?? true,
        })
        .returning();

      if (_insertedPolicy[0]) {
        insertedPolicies.push(_insertedPolicy[0]);
      }
    })
  );

  return c.json(insertedPolicies, HttpStatusCodes.CREATED);
};

// Add new company policies
export const addNewCompanyPoliciesHandler: APIRouteHandler<
  AddNewCompanyPoliciesRoute
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

  let insertedPolicies: (typeof companyPolicies.$inferSelect)[] = [];

  try {
    await Promise.all(
      body.map(async (policy) => {
        const _insertedPolicy = await db
          .insert(companyPolicies)
          .values({
            companyId: policy.companyId,
            policyType: policy.policyType,
            policyText: policy.policyText,
            effectiveDate: policy.effectiveDate,
            isActive: policy.isActive ?? true,
          })
          .returning();

        if (_insertedPolicy[0]) {
          insertedPolicies.push(_insertedPolicy[0]);
        }
      })
    );

    return c.json(insertedPolicies, HttpStatusCodes.CREATED);
  } catch (error) {
    console.error("Failed to create company policies:", error);
    return c.json(
      { message: "Failed to create company policies" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Update a specific company policy
export const updateCompanyPolicyHandler: APIRouteHandler<
  UpdateCompanyPolicyRoute
> = async (c) => {
  const db = c.get("db");
  const params = c.req.valid("param");
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

  try {
    const updatedPolicy = await db
      .update(companyPolicies)
      .set({
        policyType: body.policyType,
        policyText: body.policyText,
        effectiveDate: body.effectiveDate,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(companyPolicies.id, params.id))
      .returning();

    if (updatedPolicy.length === 0) {
      return c.json({ message: "Policy not found" }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(updatedPolicy[0], HttpStatusCodes.OK);
  } catch (error) {
    console.error("Failed to update company policy:", error);
    return c.json(
      { message: "Failed to update company policy" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Remove a specific company policy
export const removeCompanyPolicyHandler: APIRouteHandler<
  RemoveCompanyPolicyRoute
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

  try {
    const deletedPolicy = await db
      .delete(companyPolicies)
      .where(eq(companyPolicies.id, params.id))
      .returning();

    if (deletedPolicy.length === 0) {
      return c.json({ message: "Policy not found" }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(
      { message: "Company policy removed successfully" },
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Failed to delete company policy:", error);
    return c.json(
      { message: "Failed to delete company policy" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
