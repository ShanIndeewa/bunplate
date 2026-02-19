/* eslint-disable prefer-const */
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { APIRouteHandler } from "@/types";


import { toKebabCase } from "core/zod";
import { companies, companyTypes } from "core/database/schema";

import type {
  CreateCompanyTypeRoute,
  CreateNewCompanyRoute,
  DeleteCompanyRoute,
  GetCompanyByIdRoute,
  GetMyCompanyRoute,
  ListAllCompaniesRoute,
  ListAllCompanyTypesRoute,
  RemoveCompanyTypeRoute,
  UpdateCompanyRoute,
  UpdateCompanyTypeRoute,
} from "../../routes/company/company.routes";

import type { CompanySelectType } from "core/zod";

// Extend session type to include activeOrganizationId from auth schema
type SessionWithOrg = {
  activeOrganizationId?: string | null;
  [key: string]: unknown;
};

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

  const companyEntries = await db.query.companies.findMany({
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

  const totalCountResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(companies)
    .where(() => {
      const conditions = [];
      if (search) conditions.push(ilike(companies.name, `%${search}%`));
      if (companyType) conditions.push(eq(companies.companyType, companyType));
      if (industryId) conditions.push(eq(companies.industryId, industryId));
      return conditions.length ? and(...conditions) : undefined;
    });

  const totalCount = totalCountResult[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / limitNum);

  return c.json(
    {
      data: companyEntries as unknown as CompanySelectType[],
      meta: { currentPage: pageNum, totalPages, totalCount, limit: limitNum },
    },
    HttpStatusCodes.OK
  );
};

// Create new company (unified: works for both admin and regular user)
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

  const isAdmin = user.role === "admin";

  // Determine organizationId: admin can pass it in body, regular users use session
  let organizationId: string;
  if (isAdmin && body.organizationId) {
    organizationId = body.organizationId;
  } else if ((session as SessionWithOrg).activeOrganizationId) {
    organizationId = (session as SessionWithOrg).activeOrganizationId!;
  } else {
    return c.json(
      { message: "Organization ID is required. Please set an active organization." },
      HttpStatusCodes.FORBIDDEN
    );
  }

  // Determine createdBy: admin can pass it in body, otherwise use logged-in user
  const createdBy = (isAdmin && body.createdBy) ? body.createdBy : user.id;

  try {
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
        organizationId,
        createdBy,
      })
      .returning();

    if (!inserted)
      return c.json(
        { message: "Failed to create company" },
        HttpStatusCodes.INTERNAL_SERVER_ERROR
      );

    // Re-fetch with relations to match the response schema
    const companyWithRelations = await db.query.companies.findFirst({
      where: (fields, { eq }) => eq(fields.id, inserted.id),
      with: {
        branches: true,
        images: true,
        policies: true,
        companyType: true,
        industry: true,
      },
    });

    return c.json(companyWithRelations as CompanySelectType, HttpStatusCodes.CREATED);
  } catch (error: any) {
    console.error("[create-company] Error:", error.message || error);
    return c.json(
      { message: error.message || "Failed to create company" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
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

  if (!(session as SessionWithOrg).activeOrganizationId)
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const company = await db.query.companies.findFirst({
    where: (fields, { eq }) =>
      eq(fields.organizationId, (session as SessionWithOrg).activeOrganizationId!),
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
    (session as SessionWithOrg).activeOrganizationId &&
    company.organizationId === (session as SessionWithOrg).activeOrganizationId;

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
