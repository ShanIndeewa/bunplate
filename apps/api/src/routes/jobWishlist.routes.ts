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
    jobWishlistInsertSchema,
    jobWishlistSchema,
    jobWishlistUpdateSchema,
} from "../../../../packages/core/src/zod/jobWishlist.schema";

const tags: string[] = ["JobWishlist"];

// List all jobWishlist
export const list = createRoute({
  tags,
  summary: "List all jobWishlist items",
  path: "/",
  method: "get",
  request: { query: queryParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobWishlistSchema)),
      "List of jobWishlist items"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Internal server error"
    ),
  },
});

// Get a single jobWishlist by ID
export const getById = createRoute({
  tags,
  summary: "Get jobWishlist by ID",
  method: "get",
  path: "/:id",
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(jobWishlistSchema, "JobWishlist item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "JobWishlist not found"
    ),
  },
});

// Create a new jobWishlist item
export const create = createRoute({
  tags,
  summary: "Create jobWishlist",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      jobWishlistInsertSchema,
      "Schema for creating a jobWishlist item"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      jobWishlistSchema,
      "JobWishlist created successfully"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      errorMessageSchema,
      "Bad request"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Internal server error"
    ),
  },
});

// Update an existing jobWishlist item
export const update = createRoute({
  tags,
  summary: "Update jobWishlist",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      jobWishlistUpdateSchema,
      "Schema for updating jobWishlist"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      jobWishlistSchema,
      "JobWishlist updated successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "JobWishlist not found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Check if job is saved by user
export const checkSaved = createRoute({
  tags,
  summary: "Check if job is saved by user",
  method: "get",
  path: "/check/:jobId",
  request: {
    params: z.object({
      jobId: z.string().uuid("Invalid job ID")
    })
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        isSaved: z.boolean(),
        wishlistItem: z.object({
          id: z.string(),
          jobId: z.string(),
          isApplied: z.boolean(),
          createdAt: z.string(),
        }).optional()
      }),
      "Job save status for the user"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
  },
});

// Delete a jobWishlist item
export const remove = createRoute({
  tags,
  summary: "Delete a jobWishlist item",
  method: "delete",
  path: "/:id",
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "JobWishlist deleted successfully"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(errorMessageSchema, "Unauthorized access"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "JobWishlist not found"),
  },
});

// Export route types
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type CheckSavedRoute = typeof checkSaved;
export type RemoveRoute = typeof remove;
