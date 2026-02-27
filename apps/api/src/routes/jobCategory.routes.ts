// job-category.routes.ts
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
    jobCategorySelectSchema as jobCategory,
    jobCategoryInsertSchema,
    jobCategoryUpdateSchema,
} from "../../../../packages/core/src/zod/jobCategory.schema";

const tags = ["JobCategory"];

// List current user's job categories
export const list = createRoute({
  tags,
  summary: "List job categories (current user)",
  path: "/",
  method: "get",
  middleware: [authMiddleware],
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobCategory)),
      "The list of job categories for the logged-in user"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get all job categories (admin or public)
export const listAll = createRoute({
  tags,
  summary: "List all job categories",
  path: "/all",
  method: "get",
  middleware: [authMiddleware],
  request: {
    query: queryParamsSchema, // optional pagination/filtering
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobCategory)),
      "The list of all job categories"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get all available job category types
export const getTypes = createRoute({
  tags,
  summary: "Get all available job category types",
  path: "/types",
  method: "get",
  middleware: [authMiddleware],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.string()),
      "The list of all available job category types"
    ),
  },
});

// Get by ID (owned by current user)
export const getById = createRoute({
  tags,
  summary: "Get job category by ID",
  method: "get",
  path: "/:id",
  middleware: [authMiddleware],
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(jobCategory, "The job category item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "JobCategory not found"
    ),
  },
});

// Create (owned by current user)
export const create = createRoute({
  tags,
  summary: "Create job category",
  method: "post",
  path: "/",
  middleware: [authMiddleware],
  request: {
    body: jsonContentRequired(
      jobCategoryInsertSchema,
      "Create job category payload"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      jobCategory,
      "The created job category"
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
  summary: "Update job category",
  method: "patch",
  path: "/:id",
  middleware: [authMiddleware],
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      jobCategoryUpdateSchema,
      "Update job category payload"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(jobCategory, "The updated job category"),
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
  summary: "Delete job category",
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
export type ListAllRoute = typeof listAll;
export type GetTypesRoute = typeof getTypes;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
