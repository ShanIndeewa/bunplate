import { and, eq, sql } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";

import { companies, jobs } from "core/database/schema";

import type {
  CreateRoute,
  GetByCompanyIdRoute,
  GetByIdRoute,
  ListRoute,
  RemoveRoute,
  UpdateRoute,
} from "@/routes/jobs.routes";

// List jobs (all companies)
export const listJobsHandler: APIRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  const {
    page = "1",
    limit = "10",
    sort = "desc",
    search,
  } = c.req.valid("query");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  const whereConditions: any[] = [];
  if (search) whereConditions.push(sql`${jobs.title} ilike ${`%${search}%`}`);

  const query = db.query.jobs.findMany({
    limit: limitNum,
    offset,
    where: whereConditions.length ? and(...whereConditions) : undefined,
    orderBy: (fields) =>
      sort === "asc" ? [fields.postedAt] : [sql`${fields.postedAt} DESC`],
    with: { company: true, jobCategory: true },
  });

  const totalCountQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(jobs)
    .where(whereConditions.length ? and(...whereConditions) : undefined);

  const [items, totalRows] = await Promise.all([query, totalCountQuery]);
  const totalCount = totalRows[0]?.count ?? 0;
  const totalPages = Math.ceil(totalCount / limitNum);

  return c.json(
    {
      data: items,
      meta: { currentPage: pageNum, totalPages, totalCount, limit: limitNum },
    },
    HttpStatusCodes.OK
  );
};

// ✅ Get jobs by Company ID
export const getJobsByCompanyIdHandler: APIRouteHandler<
  GetByCompanyIdRoute
> = async (c) => {
  const db = c.get("db");
  const { companyId } = c.req.valid("param");
  const {
    page = "1",
    limit = "10",
    sort = "desc",
    search,
  } = c.req.valid("query");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  const whereConditions: any[] = [eq(jobs.companyId, companyId)];
  if (search) {
    whereConditions.push(sql`${jobs.title} ilike ${`%${search}%`}`);
  }

  const query = db.query.jobs.findMany({
    limit: limitNum,
    offset,
    where: and(...whereConditions),
    orderBy: (fields) =>
      sort === "asc" ? [fields.postedAt] : [sql`${fields.postedAt} DESC`],
    with: { company: true, jobCategory: true },
  });

  const totalCountQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(jobs)
    .where(and(...whereConditions));

  const [items, totalRows] = await Promise.all([query, totalCountQuery]);
  const totalCount = totalRows[0]?.count ?? 0;
  const totalPages = Math.ceil(totalCount / limitNum);

  if (!items.length) {
    return c.json(
      { message: "No jobs found for this company" },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    {
      data: items,
      meta: { currentPage: pageNum, totalPages, totalCount, limit: limitNum },
    },
    HttpStatusCodes.OK
  );
};

// Get job by ID
export const getJobByIdHandler: APIRouteHandler<GetByIdRoute> = async (c) => {
  const params = c.req.valid("param");
  const db = c.get("db");

  const item = await db.query.jobs.findFirst({
    where: eq(jobs.id, params.id),
    with: { company: true, jobCategory: true },
  });

  if (!item)
    return c.json({ message: "Job not found" }, HttpStatusCodes.NOT_FOUND);

  return c.json(item, HttpStatusCodes.OK);
};

// Create a job
export const createJobHandler: APIRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  const session = c.get("session");
  const user = c.get("user");
  const db = c.get("db");

  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  const company = await db.query.companies.findFirst({
    where: eq(companies.createdBy, user.id),
  });

  if (!company)
    return c.json(
      { message: "User has no company" },
      HttpStatusCodes.FORBIDDEN
    );

  const [inserted] = await db
    .insert(jobs)
    .values({
      ...body,
      companyId: company.id,
      postedAt: new Date(),
    } as typeof jobs.$inferInsert)
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// Update job
export const updateJobHandler: APIRouteHandler<UpdateRoute> = async (c) => {
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

  const existingJob = await db.query.jobs.findFirst({
    where: eq(jobs.id, params.id),
    with: { company: true, jobCategory: true },
  });

  if (!existingJob)
    return c.json({ message: "Job not found" }, HttpStatusCodes.NOT_FOUND);

  if (user.role !== "admin" && existingJob.company.createdBy !== user.id)
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  const [updated] = await db
    .update(jobs)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(jobs.id, params.id))
    .returning();

  return c.json(updated, HttpStatusCodes.OK);
};

// Delete job
export const deleteJobHandler: APIRouteHandler<RemoveRoute> = async (c) => {
  const params = c.req.valid("param");
  const session = c.get("session");
  const user = c.get("user");
  const db = c.get("db");
  
  if (!session || !user)
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );

  const existingJob = await db.query.jobs.findFirst({
    where: eq(jobs.id, params.id),
    with: { company: true },
  });

  if (!existingJob)
    return c.json({ message: "Job not found" }, HttpStatusCodes.NOT_FOUND);

  if (user.role !== "admin" && existingJob.company.createdBy !== user.id)
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN
    );

  await db.delete(jobs).where(eq(jobs.id, params.id));

  return c.json({ message: "Job deleted successfully" }, HttpStatusCodes.OK);
};
