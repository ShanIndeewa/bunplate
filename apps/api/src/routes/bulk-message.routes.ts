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
    bulkMessageBulkImportSchema,
    bulkMessageInsertSchema,
    bulkMessageSchema,
    bulkMessageUpdateSchema,
} from "../../../../packages/core/src/zod/bulk-message.schema";

const tags: string[] = ["bulk-message"];

// List route definition
export const list = createRoute({
  tags,
  summary: "List all bulk messages",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(bulkMessageSchema)),
      "The list of bulk message items"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      errorMessageSchema,
      "Invalid request"
    ),
  },
});

// Get by ID route definition
export const getById = createRoute({
  tags,
  summary: "Get bulk message by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      bulkMessageSchema,
      "The bulk message item"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Bulk message not found"
    ),
  },
});

// Create bulk message route definition
export const create = createRoute({
  tags,
  summary: "Create bulk message",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      bulkMessageInsertSchema,
      "Create bulk message"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      bulkMessageSchema,
      "The bulk message created"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Bulk message not created"
    ),
  },
});

// Update bulk message route definition
export const update = createRoute({
  tags,
  summary: "Update bulk message",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      bulkMessageUpdateSchema,
      "Update bulk message details schema"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      bulkMessageUpdateSchema,
      "The bulk message item"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Delete bulk message route definition
export const remove = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["bulk-message"],
  summary: "Delete a bulk message",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    204: {
      description: "No Content",
    },
    401: jsonContent(errorMessageSchema, "Unauthorized"),
    404: jsonContent(errorMessageSchema, "Not Found"),
  },
});

// Bulk import route definition
export const bulkImport = createRoute({
  tags,
  summary: "Bulk import bulk messages",
  method: "post",
  path: "/bulk-import",
  request: {
    body: jsonContentRequired(
      bulkMessageBulkImportSchema,
      "Bulk import bulk messages"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.object({
        message: z.string(),
        count: z.number(),
        records: z.array(bulkMessageSchema),
      }),
      "The bulk messages imported successfully"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      z.object({
        message: z.string(),
        error: z.string().optional(),
      }),
      "Validation error"
    ),
  },
});


// Export types
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
export type BulkImportRoute = typeof bulkImport;
