/* eslint-disable prefer-const */
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { APIRouteHandler } from "@/types";


import { toKebabCase } from "core/zod";
import { companies, companyTypes } from "core/database/schema";

import type {
  CreateCompanyTypeRoute,
  CreateNewCompanyByAdminRoute,
  CreateNewCompanyRoute,
  DeleteCompanyRoute,
  GetCompanyByIdRoute,
  GetMyCompanyRoute,
  ListAllCompaniesRoute,
  ListAllCompanyTypesRoute,
  RemoveCompanyTypeRoute,
  UpdateCompanyRoute,
  UpdateCompanyTypeRoute,
} from "./company.routes";

import type { CompanySelectType } from "core/database/schema";

/**
 * ================================================================
 * Company Types Handlers
 * ================================================================
 */

// List all company types
export const listCompanyTypesHandler: APIRouteHandler<
  ListAllCompanyTypesRoute
> = async (c) => {
  const db = c.get("db");
  const allCompanyTypes = await db.query.companyTypes.findMany({});
  return c.json(allCompanyTypes, HttpStatusCodes.OK);
};

// Create new company type
export const createCompanyTypeHandler: APIRouteHandler<
  CreateCompanyTypeRoute
> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  if (user.role !== "admin")
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [inserted] = await db
    .insert(companyTypes)
    .values({ ...body, slug: toKebabCase(body.name) })
    .returning();

  if (!inserted)
    return c.json(
      { message: "Could not create company type" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// Update existing company type
export const updateCompanyTypeHandler: APIRouteHandler<
  UpdateCompanyTypeRoute
> = async (c) => {
  const params = c.req.valid("param");
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");
  const db = c.get("db");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  if (user.role !== "admin")
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [updated] = await db
    .update(companyTypes)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(companyTypes.id, params.id))
    .returning();

  if (!updated)
    return c.json(
      { message: "Company type does not exist" },
      HttpStatusCodes.NOT_FOUND
    );

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete company type
export const removeCompanyTypeHandler: APIRouteHandler<
  RemoveCompanyTypeRoute
> = async (c) => {
  const db = c.get("db");
  const params = c.req.valid("param");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  if (user.role !== "admin")
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [deleted] = await db
    .delete(companyTypes)
    .where(eq(companyTypes.id, params.id))
    .returning();

  if (!deleted)
    return c.json(
      { message: "Company type does not exist" },
      HttpStatusCodes.NOT_FOUND
    );

  return c.json(
    { message: "Company type deleted successfully" },
    HttpStatusCodes.OK
  );
};

/**
 * ================================================================
 * Companies Handlers
 * ================================================================
 */

// List all companies
export const listAllCompaniesHandler: APIRouteHandler<
  ListAllCompaniesRoute
> = async (c) => {
  const db = c.get("db");
  const {
    page = "1",
    limit = "10",
    sort = "desc",
    search,
    companyType,
    industryId,
  } = c.req.valid("query");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  const query = db.query.companies.findMany({
    limit: limitNum,
    offset,
    where: (fields, { ilike, and, eq }) => {
      const conditions = [];
      if (search) conditions.push(ilike(fields.name, `%${search}%`));
      if (companyType) conditions.push(eq(fields.companyType, companyType));
      if (industryId) conditions.push(eq(fields.industryId, industryId));
      return conditions.length ? and(...conditions) : undefined;
    },
    orderBy: (fields) =>
      sort.toLowerCase() === "asc" ? fields.createdAt : desc(fields.createdAt),
    with: {
      branches: true,
      images: true,
      policies: true,
      companyType: true,
      industry: true,
    },
  });

  const totalCountQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(companies)
    .where(() => {
      const conditions = [];
      if (search) conditions.push(ilike(companies.name, `%${search}%`));
      if (companyType) conditions.push(eq(companies.companyType, companyType));
      if (industryId) conditions.push(eq(companies.industryId, industryId));
      return conditions.length ? and(...conditions) : undefined;
    });

  const [companyEntries, _totalCount] = await Promise.all([
    query,
    totalCountQuery,
  ]);
  const totalCount = _totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / limitNum);

  return c.json(
    {
      data: companyEntries,
      meta: { currentPage: pageNum, totalPages, totalCount, limit: limitNum },
    },
    HttpStatusCodes.OK
  );
};

// Create new company
export const createNewCompanyHandler: APIRouteHandler<
  CreateNewCompanyRoute
> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  if (user.role === "user" && !session.activeOrganizationId)
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [inserted] = await db
    .insert(companies)
    .values({
      name: body.name,
      street: body.street,
      city: body.city,
      state: body.state,
      country: body.country,
      postalCode: body.postalCode,
      description: body.description ?? null,
      status: body.status ?? "active",
      brandName: body.brandName ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      website: body.website ?? null,
      logoUrl: body.logoUrl ?? null,
      companyType: body.companyType ?? null,
      industryId: body.industryId ?? null,
      employeeCount: body.employeeCount ?? null,
      organizationId: session.activeOrganizationId!,
      createdBy: user.id,
    })
    .returning();

  if (!inserted)
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  return c.json(inserted as CompanySelectType, HttpStatusCodes.CREATED);
};

// Create new company by admin
export const createNewCompanyByAdminHandler: APIRouteHandler<
  CreateNewCompanyByAdminRoute
> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  if (user.role !== "admin")
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [inserted] = await db
    .insert(companies)
    .values({
      name: body.name,
      street: body.street,
      city: body.city,
      state: body.state,
      country: body.country,
      postalCode: body.postalCode,
      description: body.description ?? null,
      status: body.status ?? "active",
      brandName: body.brandName ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      website: body.website ?? null,
      logoUrl: body.logoUrl ?? null,
      companyType: body.companyType ?? null,
      industryId: body.industryId ?? null,
      employeeCount: body.employeeCount ?? null,
      organizationId: body.organizationId ?? null,
      createdBy: body.createdBy ?? user.id,
    })
    .returning();

  if (!inserted)
    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  return c.json(inserted as CompanySelectType, HttpStatusCodes.CREATED);
};

// Get company by ID
export const getCompanyByIdHandler: APIRouteHandler<
  GetCompanyByIdRoute
> = async (c) => {
  const db = c.get("db");
  const params = c.req.valid("param");

  const company = await db.query.companies.findFirst({
    where: (fields, { eq }) => eq(fields.id, params.id),
    with: {
      branches: true,
      images: true,
      policies: true,
      companyType: true,
      industry: true,
    },
  });

  if (!company)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );

  return c.json(company as CompanySelectType, HttpStatusCodes.OK);
};

// ✅ Get my company (newly added)
export const getMyCompanyHandler: APIRouteHandler<GetMyCompanyRoute> = async (
  c
) => {
  const db = c.get("db");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  if (!session.activeOrganizationId)
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const company = await db.query.companies.findFirst({
    where: (fields, { eq }) =>
      eq(fields.organizationId, session.activeOrganizationId!),
    with: {
      branches: true,
      images: true,
      policies: true,
      companyType: true,
      industry: true,
    },
  });

  if (!company)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );

  return c.json(company as CompanySelectType, HttpStatusCodes.OK);
};

// Update company handler
export const updateCompanyHandler: APIRouteHandler<UpdateCompanyRoute> = async (
  c
) => {
  const db = c.get("db");
  const params = c.req.valid("param");
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  // Only admins or users belonging to the same organization can update
  const company = await db.query.companies.findFirst({
    where: (fields, { eq }) => eq(fields.id, params.id),
  });

  if (!company)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );

  const isAdmin = user.role === "admin";
  const isOrgOwner =
    session.activeOrganizationId &&
    company.organizationId === session.activeOrganizationId;

  if (!isAdmin && !isOrgOwner)
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [updated] = await db
    .update(companies)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(companies.id, params.id))
    .returning();

  if (!updated)
    return c.json(
      { message: "Failed to update company" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );

  const updatedCompany = await db.query.companies.findFirst({
    where: (fields, { eq }) => eq(fields.id, params.id),
    with: {
      branches: true,
      images: true,
      policies: true,
      companyType: true,
      industry: true,
    },
  });

  return c.json(updatedCompany as CompanySelectType, HttpStatusCodes.OK);
};

// Delete company handler
export const deleteCompanyHandler: APIRouteHandler<DeleteCompanyRoute> = async (
  c
) => {
  const db = c.get("db");
  const params = c.req.valid("param");
  const session = c.get("session");
  const user = c.get("user");

  if (!session || !user) {
    return c.json(
      { message: "Unauthorized access" },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (user.role !== "admin") {
    return c.json({ message: "Forbidden access" }, HttpStatusCodes.FORBIDDEN);
  }

  const [deleted] = await db
    .delete(companies)
    .where(eq(companies.id, params.id))
    .returning();

  if (!deleted) {
    return c.json({ message: "No company found" }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(
    { message: "Company deleted successfully" },
    HttpStatusCodes.OK
  );
};
