/* eslint-disable prefer-const */
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { APIRouteHandler } from "@/types";


import { companyBranches } from "core/database/schema";
import type {
  GetCompanyBranchesRoute,
  UpsertBranchesToCompanyRoute,
} from "../../../routes/company/branches.routes";

// Extend session type to include activeOrganizationId from auth schema
type SessionWithOrg = {
  activeOrganizationId?: string | null;
  [key: string]: unknown;
};

// List company branches route handler
export const getCompanyBranchesHandler: APIRouteHandler<
  GetCompanyBranchesRoute
> = async (c) => {
  const db = c.get("db");
  const params = c.req.valid("param");

  const allCompanyBranches = await db.query.companyBranches.findMany({
    where(fields, { eq }) {
      return eq(fields.companyId, params.id);
    },
  });

  return c.json(allCompanyBranches, HttpStatusCodes.OK);
};

// Upsert company branches route handler
export const upsertBranchesToCompanyHandler: APIRouteHandler<
  UpsertBranchesToCompanyRoute
> = async (c) => {
  const body = c.req.valid("json");
  const params = c.req.valid("param");
  const session = c.get("session");
  const user = c.get("user");
  const db = c.get("db");

  if (!session || !user) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (!(session as SessionWithOrg).activeOrganizationId) {
    return c.json(
      {
        message: HttpStatusPhrases.FORBIDDEN,
      },
      HttpStatusCodes.FORBIDDEN
    );
  }

  const currentBranches = await db.query.companyBranches.findMany({
    where: (fields, { eq }) => eq(fields.companyId, params.id),
  });

  if (currentBranches.length > 0) {
    // If branches already exist, delete them first
    await db
      .delete(companyBranches)
      .where(eq(companyBranches.companyId, params.id));
  }

  let insertedBranches: any[] = [];

  await Promise.all(
    body.map(async (branch) => {
      const _insertedBranch = await db
        .insert(companyBranches)
        .values({
          companyId: params.id,
          branchName: branch.branchName,
          street: branch.street,
          city: branch.city,
          state: branch.state,
          country: branch.country,
          postalCode: branch.postalCode,
          phone: branch.phone,
          email: branch.email,
        })
        .returning();

      if (_insertedBranch[0]) insertedBranches.push(_insertedBranch[0]);
    })
  );

  return c.json(insertedBranches, HttpStatusCodes.CREATED);
};
