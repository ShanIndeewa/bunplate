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
  userProject,
  userProjectInsertSchema,
  userProjectUpdateSchema,
} from "../../../../packages/core/src/zod/userProject.schema";

const tags = ["UserProject"];

// List current user's projects
export const list = createRoute({
  tags,
  summary: "List user projects (current user)",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(userProject)),
      "The list of user projects for the logged-in user"
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
  summary: "Get user project by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userProject, "The user project item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "UserProject not found"
    ),
  },
});

// Create (owned by current user)
export const create = createRoute({
  tags,
  summary: "Create user project",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      userProjectInsertSchema,
      "Create user project payload"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      userProject,
      "The created user project"
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
  summary: "Update user project",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      userProjectUpdateSchema,
      "Update user project payload"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userProject, "The updated user project"),
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
  summary: "Delete user project",
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
