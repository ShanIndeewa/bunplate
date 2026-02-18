import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import { authMiddleware } from "@/middlewares/auth.middleware";

import {
  errorMessageSchema,
  getPaginatedSchema,
  queryParamsSchema,
  stringIdParamSchema,
} from "../../../../packages/core/src/zod/helpers";
import {
  userProfile,
  userProfileInsertSchema,
  userProfileUpdateSchema,
} from "../../../../packages/core/src/zod/userProfile.schema";

const tags = ["UserProfile"];

// List current user's profiles
export const list = createRoute({
  tags,
  summary: "List user profiles (current user)",
  path: "/",
  method: "get",
  middleware: [authMiddleware],
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(userProfile)),
      "The list of user profiles for the logged-in user"
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
  summary: "Get user profile by ID",
  method: "get",
  path: "/:id",
  middleware: [authMiddleware],
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userProfile, "The user profile item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "UserProfile not found"
    ),
  },
});

// Create (owned by current user)
export const create = createRoute({
  tags,
  summary: "Create user profile",
  method: "post",
  path: "/",
  middleware: [authMiddleware],
  request: {
    body: jsonContentRequired(
      userProfileInsertSchema,
      "Create user profile payload"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      userProfile,
      "The created user profile"
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
  summary: "Update user profile",
  method: "patch",
  path: "/:id",
  middleware: [authMiddleware],
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      userProfileUpdateSchema,
      "Update user profile payload"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userProfile, "The updated user profile"),
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
  summary: "Delete user profile",
  method: "delete",
  path: "/:id",
  middleware: [authMiddleware],
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
