// ad.routes.ts
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
  adSelectSchema as ad,
  adInsertSchema,
  adUpdateSchema,
} from "../../../../packages/core/src/zod/ads.schema";

const tags = ["Ad"];

/**
 * List current user's ads
 */
export const list = createRoute({
  tags,
  summary: "List ads (current user)",
  path: "/",
  method: "get",
  request: {
    // Reuse shared pagination + search/sort query if your helper supports it
    // Example fields often include: page, limit, q, sort, order, etc.
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(ad)),
      "The list of ads for the logged-in user"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

/**
 * Get an ad by ID (owned by current user)
 */
export const getById = createRoute({
  tags,
  summary: "Get ad by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ad, "The ad item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Ad not found"
    ),
  },
});

/**
 * Create an ad (owned by current user)
 */
export const create = createRoute({
  tags,
  summary: "Create ad",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(adInsertSchema, "Create ad payload"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(ad, "The created ad"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

/**
 * Update an ad (owned by current user)
 */
export const update = createRoute({
  tags,
  summary: "Update ad",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(adUpdateSchema, "Update ad payload"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ad, "The updated ad"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

/**
 * Delete an ad (owned by current user)
 */
export const remove = createRoute({
  tags,
  summary: "Delete ad",
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
