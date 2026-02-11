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
  userSkill,
  userSkillInsertSchema,
  userSkillUpdateSchema,
} from "../../../../packages/core/src/zod/userSkill.schema";

const tags = ["UserSkill"];

// List current user's skills
export const list = createRoute({
  tags,
  summary: "List user skills (current user)",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(userSkill)),
      "The list of user skills for the logged-in user"
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
  summary: "Get user skill by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userSkill, "The user skill item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "UserSkill not found"
    ),
  },
});

// Create (owned by current user)
export const create = createRoute({
  tags,
  summary: "Create user skill",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      userSkillInsertSchema,
      "Create user skill payload"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(userSkill, "The created user skill"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Update (owned by current user)
export const update = createRoute({
  tags,
  summary: "Update user skill",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      userSkillUpdateSchema,
      "Update user skill payload"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userSkill, "The updated user skill"),
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
  summary: "Delete user skill",
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
