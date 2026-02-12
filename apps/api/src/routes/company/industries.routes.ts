import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import { errorMessageSchema, stringIdParamSchema } from "../../../../../packages/core/src/zod/helpers";;
import { tags } from "./company.routes";
import {
  industryInsertSchema,
  industrySchema,
  industryUpdateSchema,
} from "../../../../../packages/core/src/zod/company.schema";

// Get all industries
export const getIndustriesRoute = createRoute({
  tags,
  summary: "Get all Industries",
  method: "get",
  path: "/industries",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(industrySchema),
      "List of industries"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to get industries"
    ),
  },
});

// Add new industry
export const addNewIndustryRoute = createRoute({
  tags,
  summary: "Add new Industry",
  method: "post",
  path: "/industries",
  request: {
    body: jsonContentRequired(industryInsertSchema, "Industry to insert"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(industrySchema, "Inserted Industry"),
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
      "Failed to create"
    ),
  },
});

// Update industry
export const updateIndustryRoute = createRoute({
  tags,
  summary: "Update Industry",
  method: "put",
  path: "/industries/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(industryUpdateSchema, "Update data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(industrySchema, "Updated Industry"),
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
      "Industry not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to update"
    ),
  },
});

// Remove industry
export const removeIndustryRoute = createRoute({
  tags,
  summary: "Remove Industry",
  method: "delete",
  path: "/industries/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(errorMessageSchema, "Industry removed"),
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
      "Industry not found"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to delete"
    ),
  },
});

// Export route types
export type GetIndustriesRoute = typeof getIndustriesRoute;
export type AddNewIndustryRoute = typeof addNewIndustryRoute;
export type UpdateIndustryRoute = typeof updateIndustryRoute;
export type RemoveIndustryRoute = typeof removeIndustryRoute;
