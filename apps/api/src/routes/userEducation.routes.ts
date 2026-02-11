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
  userEducation,
  userEducationInsertSchema,
  userEducationUpdateSchema,
} from "../../../../packages/core/src/zod/userEducation.schema";

const tags = ["UserEducation"];

// List current user's educations
export const list = createRoute({
  tags,
  summary: "List user educations (current user)",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(userEducation)),
      "The list of user educations for the logged-in user"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get by ID (owned by current user)
export const getById = createRoute({
  tags,
  summary: "Get user education by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userEducation, "The user education item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "UserEducation not found"
    ),
  },
});

// Create (owned by current user)
export const create = createRoute({
  tags,
  summary: "Create user education",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      userEducationInsertSchema,
      "Create user education payload"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      userEducation,
      "The created user education"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Update (owned by current user)
export const update = createRoute({
  tags,
  summary: "Update user education",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      userEducationUpdateSchema,
      "Update user education payload"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userEducation,
      "The updated user education"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Delete (owned by current user)
export const remove = createRoute({
  tags,
  summary: "Delete user education",
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
