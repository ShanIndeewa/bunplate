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
} from "../../../../../packages/core/src/zod/helpers";

import {
  companyInsertSchema,
  companyQueryParamsSchema,
  companySelectWithRelationsSchema,
  companyTypeInsertSchema,
  companyTypeSchema,
  companyTypeUpdateSchema,
  companyUpdateSchema,
} from "../../../../../packages/core/src/zod/company.schema";

export const tags: string[] = ["Companies"];

/**
 * ================================================================
 * Company Types Routes
 * ================================================================
 */
// List all company types
export const listAllCompanyTypesRoute = createRoute({
  tags,
  summary: "List all company types",
  path: "/types",
  method: "get",
  middleware: [authMiddleware],
  request: { query: queryParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(companyTypeSchema),
      "The list of company types"
    ),
  },
});

// Get my company route
export const getMyCompanyRoute = createRoute({
  tags,
  summary: "Get my company",
  method: "get",
  path: "/my-company",
  middleware: [authMiddleware],
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      companySelectWithRelationsSchema,
      "The company item"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "No company found"
    ),
  },
});

// Create new company type
export const createNewCompanyTypeRoute = createRoute({
  tags,
  summary: "Create new company type",
  method: "post",
  path: "/types",
  middleware: [authMiddleware],
  request: {
    body: jsonContentRequired(
      companyTypeInsertSchema,
      "Company type insert data"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      companyTypeSchema,
      "Created new company type"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Could not create company type"
    ),
  },
});

// Update existing company type
export const updateCompanyTypeRoute = createRoute({
  tags,
  summary: "Update existing company type",
  method: "patch",
  path: "/types/:id",
  middleware: [authMiddleware],
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(
      companyTypeUpdateSchema,
      "Company type update data"
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      companyTypeSchema,
      "The updated company type"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
  },
});

// Delete company type
export const removeCompanyTypeRoute = createRoute({
  tags,
  summary: "Remove company type",
  method: "delete",
  path: "/types/:id",
  middleware: [authMiddleware],
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "The company type deleted"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
  },
});

/**
 * ================================================================
 * Companies Routes
 * ================================================================
 */
// List all companies
export const listAllCompaniesRoute = createRoute({
  tags,
  summary: "List all companies",
  method: "get",
  path: "/",
  middleware: [authMiddleware],
  request: { query: companyQueryParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      getPaginatedSchema(z.array(companySelectWithRelationsSchema)),
      "The list of Companies"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
  },
});

// Create new company
export const createNewCompanyRoute = createRoute({
  tags,
  summary: "Create new Company",
  method: "post",
  path: "/",
  middleware: [authMiddleware],
  request: {
    body: jsonContentRequired(companyInsertSchema, "Create new company"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      companySelectWithRelationsSchema,
      "The company created"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to create"
    ),
  },
});

// Get company by ID
export const getCompanyByIdRoute = createRoute({
  tags,
  summary: "Get company by ID",
  method: "get",
  path: "/:id",
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      companySelectWithRelationsSchema,
      "The company item"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "No company found"
    ),
  },
});

// Update company
export const updateCompanyRoute = createRoute({
  tags,
  summary: "Update company",
  method: "patch",
  path: "/:id",
  middleware: [authMiddleware],
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(companyUpdateSchema, "Company update data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      companySelectWithRelationsSchema,
      "The updated company"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(errorMessageSchema, "Not found"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to update"
    ),
  },
});

// Delete company
export const deleteCompanyRoute = createRoute({
  tags,
  summary: "Delete company",
  method: "delete",
  path: "/:id",
  middleware: [authMiddleware],
  request: { params: stringIdParamSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "The company deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "No company found"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorMessageSchema,
      "Unauthorized access"
    ),
    [HttpStatusCodes.FORBIDDEN]: jsonContent(
      errorMessageSchema,
      "Forbidden access"
    ),
  },
});

// Export company route type definitions
export type ListAllCompaniesRoute = typeof listAllCompaniesRoute;
export type CreateNewCompanyRoute = typeof createNewCompanyRoute;
export type GetCompanyByIdRoute = typeof getCompanyByIdRoute;
export type ListAllCompanyTypesRoute = typeof listAllCompanyTypesRoute;
export type CreateCompanyTypeRoute = typeof createNewCompanyTypeRoute;
export type UpdateCompanyTypeRoute = typeof updateCompanyTypeRoute;
export type RemoveCompanyTypeRoute = typeof removeCompanyTypeRoute;
export type GetMyCompanyRoute = typeof getMyCompanyRoute;
export type UpdateCompanyRoute = typeof updateCompanyRoute;
export type DeleteCompanyRoute = typeof deleteCompanyRoute;
