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
  jobApplicationReview,
  jobApplicationReviewInsertSchema,
  jobApplicationReviewUpdateSchema,
} from "../../../../packages/core/src/zod/jobApplicationReviews.schema";

const tags = ["JobApplicationReview"];

// List reviews
export const list = createRoute({
  tags,
  summary: "List job application reviews",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobApplicationReview)),
      "The list of job application reviews"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get by ID
export const getById = createRoute({
  tags,
  summary: "Get job application review by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      jobApplicationReview,
      "The job application review item"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "JobApplicationReview not found"
    ),
  },
});

// Create
export const create = createRoute({
  tags,
  summary: "Create job application review",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      jobApplicationReviewInsertSchema,
      "Create job application review payload"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      jobApplicationReview,
      "The created job application review"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Update
export const update = createRoute({
  tags,
  summary: "Update job application review",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      jobApplicationReviewUpdateSchema,
      "Update job application review payload"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      jobApplicationReview,
      "The updated job application review"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Delete
export const remove = createRoute({
  tags,
  summary: "Delete job application review",
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
