import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import { errorMessageSchema, stringIdParamSchema } from "../../../../../packages/core/src/zod/helpers";
import { tags } from "./company.routes";
import {
  companyBranchInsertSchema,
  companyBranchSchema,
} from "../../../../../packages/core/src/zod/company.schema";

// Company Branch Routes
export const getCompanyBranchesRoute = createRoute({
  tags,
  summary: "Get all branches of a company",
  method: "get",
  path: "/:id/branches",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(companyBranchSchema),
      "List of company branches"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to fetch branches"
    ),
  },
});

export const upsertBranchesToCompanyRoute = createRoute({
  tags,
  summary: "Upsert branches to a company",
  path: "/:id/branches",
  method: "post",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      z.array(companyBranchInsertSchema),
      "Branches to insert or update"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.array(companyBranchInsertSchema),
      "Inserted or updated company branches"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to create or update branches"
    ),
  },
});

// Export branch routes type definitions
export type GetCompanyBranchesRoute = typeof getCompanyBranchesRoute;
export type UpsertBranchesToCompanyRoute = typeof upsertBranchesToCompanyRoute;
