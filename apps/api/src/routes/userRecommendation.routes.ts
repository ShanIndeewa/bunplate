import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import {
  errorMessageSchema,
  getPaginatedSchema,
  queryParamsSchema,
  stringIdParamSchema,
} from "../../../../packages/core/src/zod/helpers";
import {
  userRecommendation,
  userRecommendationInsertSchema,
  userRecommendationUpdateSchema,
} from "../../../../packages/core/src/zod/userRecommendation.schema";

const tags: string[] = ["UserRecommendation"];

// List current user's recommendations
export const list = createRoute({
  tags,
  summary: "List user recommendations (current user)",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(userRecommendation)),
      "The list of user recommendations for the logged-in user"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get by ID (must belong to current user on the server side)
export const getById = createRoute({
  tags,
  summary: "Get userRecommendation by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userRecommendation,
      "The userRecommendation item"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "UserRecommendation not found"
    ),
  },
});

// Create (scoped to current user/org on the server side)
export const create = createRoute({
  tags,
  summary: "Create userRecommendation",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      userRecommendationInsertSchema,
      "Create userRecommendation"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      userRecommendation,
      "The userRecommendation created"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Update (only rows owned by current user)
export const update = createRoute({
  tags,
  summary: "Update userRecommendation",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      userRecommendationUpdateSchema,
      "Update userRecommendation details"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userRecommendation,
      "The updated userRecommendation item"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Delete (only rows owned by current user)
export const remove = createRoute({
  tags,
  summary: "Delete userRecommendation",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "No Content",
    },
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
  },
});

// Export types
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
