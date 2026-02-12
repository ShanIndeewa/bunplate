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

import { job, jobInsertSchema, jobUpdateSchema } from "../../../../packages/core/src/zod/jobs.schema";

const tags = ["Job"];

// List jobs (optionally paginated)
export const list = createRoute({
  tags,
  summary: "List jobs",
  path: "/",
  method: "get",
  request: {
    query: queryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(job)),
      "The list of jobs"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Get jobs by companyId
export const getByCompanyId = createRoute({
  tags,
  summary: "Get jobs by Company ID",
  method: "get",
  path: "/company/:companyId",
  request: {
    params: z.object({
      companyId: z.string().uuid("Invalid company ID"), // or z.string() if not UUID
    }),
    query: queryParamsSchema, // allow pagination, search, etc.
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(job)),
      "The list of jobs for this company"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "No jobs found for this company"
    ),
  },
});

// Get job by ID
export const getById = createRoute({
  tags,
  summary: "Get job by ID",
  method: "get",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(job, "The job item"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Job not found"
    ),
  },
});

// Create a new job
export const create = createRoute({
  tags,
  summary: "Create a new job",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(jobInsertSchema, "Create job payload"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(job, "The created job"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden"
    ),
  },
});

// Update a job
export const update = createRoute({
  tags,
  summary: "Update a job",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(jobUpdateSchema, "Update job payload"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(job, "The updated job"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden"
    ),
  },
});

// Delete a job
export const remove = createRoute({
  tags,
  summary: "Delete a job",
  method: "delete",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Job deleted successfully"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden"
    ),
  },
});

// Export types
export type ListRoute = typeof list;
export type GetByCompanyIdRoute = typeof getByCompanyId;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
