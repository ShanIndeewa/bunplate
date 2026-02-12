import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import { errorMessageSchema, stringIdParamSchema } from "../../../../../packages/core/src/zod/helpers";;
import { tags } from "./company.routes";
import {
  companyPolicyInsertSchema,
  companyPolicySchema,
  companyPolicyUpdateSchema,
} from "../../../../../packages/core/src/zod/company.schema";

// ==================== Company Policy Routes ====================

// Get all policies for a specific company
export const getCompanyPoliciesRoute = createRoute({
  tags,
  summary: "Get all Company Policies",
  method: "get",
  path: "/:id/policies",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(companyPolicySchema),
      "List of company policies"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to get company policies"
    ),
  },
});

// Upsert policies to a specific company
export const upsertPoliciesToCompanyRoute = createRoute({
  tags,
  summary: "Upsert Policies to Company",
  method: "post",
  path: "/:id/policies",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      z.array(companyPolicyInsertSchema),
      "Policies to upsert"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.array(companyPolicySchema),
      "Upserted company policies"
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
      "Failed to upsert company policies"
    ),
  },
});

// Add new company policies
export const addNewCompanyPoliciesRoute = createRoute({
  tags,
  summary: "Add new Company Policies",
  method: "post",
  path: "/policies",
  request: {
    body: jsonContentRequired(
      z.array(companyPolicyInsertSchema),
      "Policies to insert"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.array(companyPolicySchema),
      "Inserted company policies"
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
      "Failed to create company policies"
    ),
  },
});

// Update a specific company policy
export const updateCompanyPolicyRoute = createRoute({
  tags,
  summary: "Update Company Policy",
  method: "put",
  path: "/policies/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(companyPolicyUpdateSchema, "Update data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      companyPolicySchema,
      "Updated company policy"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Policy not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to update company policy"
    ),
  },
});

// Remove a specific company policy
export const removeCompanyPolicyRoute = createRoute({
  tags,
  summary: "Remove Company Policy",
  method: "delete",
  path: "/policies/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      errorMessageSchema,
      "Company policy removed"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Policy not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to delete company policy"
    ),
  },
});

// ==================== Export types ====================
export type GetCompanyPoliciesRoute = typeof getCompanyPoliciesRoute;
export type UpsertPoliciesToCompanyRoute = typeof upsertPoliciesToCompanyRoute;
export type AddNewCompanyPoliciesRoute = typeof addNewCompanyPoliciesRoute;
export type UpdateCompanyPolicyRoute = typeof updateCompanyPolicyRoute;
export type RemoveCompanyPolicyRoute = typeof removeCompanyPolicyRoute;
