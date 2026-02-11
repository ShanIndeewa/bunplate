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
    jobApplication,
    jobApplicationAdminUpdateSchema,
    jobApplicationInsertSchema,
    jobApplicationUpdateSchema,
} from "../../../../packages/core/src/zod/jobApplications.schema";

const tags: string[] = ["JobApplication"];

// List
export const list = createRoute({
  tags,
  summary: "List job applications (current user)",
  path: "/",
  method: "get",
  request: { query: queryParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobApplication)),
      "The list of job applications for the logged-in user"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// List All
export const listAll = createRoute({
  tags,
  summary: "List all job applications (admin access)",
  path: "/all",
  method: "get",
  request: {
    query: queryParamsSchema.extend({
      status: z.string().optional(),
      search: z.string().optional(),
    })
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobApplication)),
      "The list of all job applications"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden - Admin access required"
    ),
  },
});

// List Company Job Applications
export const listCompany = createRoute({
  tags,
  summary: "List job applications for company (company access)",
  path: "/company",
  method: "get",
  request: {
    query: queryParamsSchema.extend({
      status: z.string().optional(),
      search: z.string().optional(),
      jobId: z.string().optional(),
    })
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(jobApplication)),
      "The list of job applications for the company"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden - Company access required"
    ),
  },
});

// Get by ID
export const getById = createRoute({
  tags,
  summary: "Get job application by ID",
  method: "get",
  path: "/:id",
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(jobApplication, "The job application"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
  },
});

// Check if user has applied to a specific job
export const checkApplication = createRoute({
  tags,
  summary: "Check if user has applied to a job",
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
        hasApplied: z.boolean(),
        application: jobApplication.optional()
      }),
      "Application status for the job"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
  },
});

// Create
export const create = createRoute({
  tags,
  summary: "Create job application",
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(
      jobApplicationInsertSchema,
      "Create job application"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      jobApplication,
      "Created job application"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
  },
});

// Update
export const update = createRoute({
  tags,
  summary: "Update job application",
  method: "patch",
  path: "/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      jobApplicationUpdateSchema,
      "Update job application"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      jobApplication,
      "Updated job application"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
  },
});

// Admin Update
export const adminUpdate = createRoute({
  tags,
  summary: "Admin update job application (includes adminAction)",
  method: "patch",
  path: "/:id/admin",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      jobApplicationAdminUpdateSchema,
      "Admin update job application"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      jobApplication,
      "Updated job application"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden - Admin access required"
    ),
  },
});

// Delete
export const remove = createRoute({
  tags,
  summary: "Delete job application",
  method: "delete",
  path: "/:id",
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "No Content" },
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
  },
});

// Admin Delete
export const adminRemove = createRoute({
  tags,
  summary: "Admin delete job application",
  method: "delete",
  path: "/:id/admin",
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: { description: "No Content" },
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not Found"),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden - Admin access required"
    ),
  },
});

export type ListRoute = typeof list;
export type ListAllRoute = typeof listAll;
export type ListCompanyRoute = typeof listCompany;
export type GetByIdRoute = typeof getById;
export type CheckApplicationRoute = typeof checkApplication;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type AdminUpdateRoute = typeof adminUpdate;
export type RemoveRoute = typeof remove;
export type AdminRemoveRoute = typeof adminRemove;
