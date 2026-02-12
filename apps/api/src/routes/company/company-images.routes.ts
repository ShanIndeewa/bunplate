import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { z } from "zod";

import { errorMessageSchema, stringIdParamSchema } from "../../../../../packages/core/src/zod/helpers";
import { tags } from "./company.routes";
import {
  companyImageInsertSchema,
  companyImageSchema,
  companyImageUpdateSchema,
} from "../../../../../packages/core/src/zod/company.schema";

// Company Image Routes
export const getCompanyImagesRoute = createRoute({
  tags,
  summary: "Get all Company Images",
  method: "get",
  path: "/:id/images",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(companyImageSchema),
      "List of company images"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorMessageSchema,
      "Failed to get"
    ),
  },
});

export const addNewCompanyImagesRoute = createRoute({
  tags,
  summary: "Add new Company Images",
  method: "post",
  path: "/images",
  request: {
    body: jsonContentRequired(
      z.array(companyImageInsertSchema),
      "Images to insert"
    ),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.array(companyImageInsertSchema),
      "Inserted company images"
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

export const updateCompanyImageRoute = createRoute({
  tags,
  summary: "Update Company Image",
  method: "put",
  path: "/images/:id",
  request: {
    params: stringIdParamSchema,
    body: jsonContentRequired(companyImageUpdateSchema, "Update data"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      companyImageSchema,
      "Updated company image"
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
      "Failed to update"
    ),
  },
});

export const removeCompanyImageRoute = createRoute({
  tags,
  summary: "Remove Company Image",
  method: "delete",
  path: "/images/:id",
  request: {
    params: stringIdParamSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      errorMessageSchema,
      "Company image removed"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      errorMessageSchema,
      "Image not found"
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
      "Failed to delete"
    ),
  },
});

// Export company image routes type definitions
export type AddNewCompanyImagesRoute = typeof addNewCompanyImagesRoute;
export type GetCompanyImagesRoute = typeof getCompanyImagesRoute;
export type UpdateCompanyImageRoute = typeof updateCompanyImageRoute;
export type RemoveCompanyImageRoute = typeof removeCompanyImageRoute;
