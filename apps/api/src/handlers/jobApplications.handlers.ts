import { and, desc, eq, sql, type SQL } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

// 

import type { APIRouteHandler } from "@/types";
import { companies, jobApplications, jobs, member, user } from "core/database/schema";

import type {
    AdminRemoveRoute,
    AdminUpdateRoute,
    CheckApplicationRoute,
    CreateRoute,
    GetByIdRoute,
    ListAllRoute,
    ListCompanyRoute,
    ListRoute,
    RemoveRoute,
    UpdateRoute,
} from "@/routes/jobApplications.routes";

// If you need to reference the zod schemas in route typing/middleware, import them here
// (they are already wired into your validator via `c.req.valid(...)` in these handlers)
// import { jobApplicationInsertSchema, jobApplicationUpdateSchema } from "./jobApplications.schema";

// Shape of your auth/session object stored on the context
// (set by upstream auth middleware)
type Session = {
  userId: string;
  activeOrganizationId?: string | null;
};

/**
 * Utilities
 */
const parseIntSafe = (v: string | null, fallback: number) => {
  if (!v) return fallback;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/**
 * 🧭 List ONLY the logged-in user's job applications (optionally scoped by org)
 * Supports basic pagination via `?page=1&limit=20`.
 */
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  console.log("Job applications list request - Session:", session);

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Pagination
  const page = parseIntSafe(c.req.query("page") ?? null, 1);
  const limitRaw = parseIntSafe(c.req.query("limit") ?? null, 20);
  const limit = Math.min(Math.max(limitRaw, 1), 100); // clamp 1..100
  const offset = (page - 1) * limit;

  // Ownership / org scoping
  const baseWhere = session.activeOrganizationId
    ? and(
        eq(jobApplications.userId, session.userId),
        eq(jobApplications.organizationId, session.activeOrganizationId)
      )
    : eq(jobApplications.userId, session.userId);

  // For non-admin users, filter out admin_only applications
  // TODO: Add proper admin role check here
  const isAdmin = false; // Replace with actual admin check
  const finalWhere = isAdmin
    ? baseWhere
    : and(baseWhere, eq(jobApplications.adminAction, "access_company" as typeof jobApplications.adminAction.enumValues[number]));

  // total count
  const countResult = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(jobApplications)
    .where(finalWhere);

  const count = countResult && countResult[0] ? countResult[0].count : 0;

  try {
    const results = await db.query.jobApplications.findMany({
      where: finalWhere,
      limit,
      offset,
      orderBy: [desc(jobApplications.createdAt)],
    });

    console.log("Job applications query results:", results);

    const totalCount = count;
    const totalPages = Math.max(1, Math.ceil(totalCount / Math.max(limit, 1)));

    return c.json(
      {
        data: results,
        meta: {
          totalCount,
          limit,
          currentPage: page,
          totalPages,
        },
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return c.json(
      { message: "Internal server error while fetching job applications" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * 🧭 List ALL job applications (admin access)
 * Supports basic pagination via `?page=1&limit=20`.
 * This endpoint returns all job applications regardless of user/organization.
 */
export const listAll: APIRouteHandler<ListAllRoute> = async (c) => {
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  console.log("All job applications list request - Session:", session);

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // TODO: Add admin role check here
  // For now, we'll allow any authenticated user to access this endpoint
  // You should implement proper admin role checking based on your auth system
  // Example: if (!session.isAdmin) { return c.json({ message: "Forbidden" }, 403); }

  // Pagination
  const page = parseIntSafe(c.req.query("page") ?? null, 1);
  const limitRaw = parseIntSafe(c.req.query("limit") ?? null, 20);
  const limit = Math.min(Math.max(limitRaw, 1), 100); // clamp 1..100
  const offset = (page - 1) * limit;

  // Filters
  const status = c.req.query("status");
  const search = c.req.query("search");

  // Build where conditions
  const whereConditions: (SQL | undefined)[] = [];

  if (status) {
    whereConditions.push(eq(jobApplications.status, status as typeof jobApplications.status.enumValues[number]));
  }

  if (search) {
    // Search in job application fields and user data
    whereConditions.push(
      sql`(
        ${jobApplications.jobId}::text ILIKE ${`%${search}%`} OR
        ${jobApplications.source} ILIKE ${`%${search}%`} OR
        ${jobApplications.coverLetterText} ILIKE ${`%${search}%`} OR
        ${user.name} ILIKE ${`%${search}%`} OR
        ${user.email} ILIKE ${`%${search}%`}
      )`
    );
  }

  const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

  // Get total count with filters
  const countQuery = db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(jobApplications);

  // If we have a search term, we need to join with user table for the count too
  if (search) {
    countQuery.leftJoin(user, eq(jobApplications.userId, user.id));
  }

  const countResult = await countQuery.where(whereClause);

  const count = countResult && countResult[0] ? countResult[0].count : 0;

  try {
    // Use a raw query to join with user table and get user data
    const results = await db
      .select({
        // Job application fields
        id: jobApplications.id,
        organizationId: jobApplications.organizationId,
        userId: jobApplications.userId,
        jobId: jobApplications.jobId,
        roundNo: jobApplications.roundNo,
        status: jobApplications.status,
        adminAction: jobApplications.adminAction,
        mediaId: jobApplications.mediaId,
        applicantProfile: jobApplications.applicantProfile,
        coverLetterText: jobApplications.coverLetterText,
        source: jobApplications.source,
        referralCode: jobApplications.referralCode,
        tags: jobApplications.tags,
        submittedAt: jobApplications.submittedAt,
        createdAt: jobApplications.createdAt,
        updatedAt: jobApplications.updatedAt,
        // User fields
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
      })
      .from(jobApplications)
      .leftJoin(user, eq(jobApplications.userId, user.id))
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(jobApplications.createdAt));

    console.log("All job applications query results:", results);

    // Transform results to include user data in the expected format
    const transformedResults = results.map((result) => ({
      id: result.id,
      organizationId: result.organizationId,
      userId: result.userId,
      jobId: result.jobId,
      roundNo: result.roundNo,
      status: result.status,
      adminAction: result.adminAction,
      mediaId: result.mediaId,
      applicantProfile: result.applicantProfile,
      coverLetterText: result.coverLetterText,
      source: result.source,
      referralCode: result.referralCode,
      tags: result.tags,
      submittedAt: result.submittedAt,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      // Include user data
      user: {
        id: result.userId,
        name: result.userName || result.applicantProfile?.fullName || "Unknown",
        email: result.userEmail || result.applicantProfile?.email || "Not provided",
        image: result.userImage,
      },
    }));

    const totalCount = count;
    const totalPages = Math.max(1, Math.ceil(totalCount / Math.max(limit, 1)));

    return c.json(
      {
        data: transformedResults,
        meta: {
          totalCount,
          limit,
          currentPage: page,
          totalPages,
        },
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error fetching all job applications:", error);
    return c.json(
      { message: "Internal server error while fetching all job applications" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * 🧭 List job applications for the company (company access)
 * Supports basic pagination via `?page=1&limit=20`.
 * This endpoint returns job applications for the company's jobs.
 *
 * IMPORTANT: Only shows applications where admin_action = 'access_company'
 * Applications with admin_action = 'admin_only' are hidden from companies
 * and can only be viewed by administrators.
 */
export const listCompany: APIRouteHandler<ListCompanyRoute> = async (c) => {
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  console.log("Company job applications list request - Session:", session);
  console.log("Active Organization ID:", session?.activeOrganizationId);

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Get user's organization ID - either from session or from member table
  let organizationId = session.activeOrganizationId;

  if (!organizationId) {
    console.log("No active organization in session, checking member table for user:", session.userId);

    // Try to get the user's organization from the member table
    const userMember = await db.query.member.findFirst({
      where: eq(member.userId, session.userId),
    });

    if (!userMember) {
      console.log("User is not a member of any organization:", session.userId);
      return c.json(
        { message: "User is not a member of any organization" },
        HttpStatusCodes.FORBIDDEN
      );
    }

    organizationId = userMember.organizationId;
    console.log("Found organization ID from member table:", organizationId);
  }

  // Get the company ID for this organization
  const company = await db.query.companies.findFirst({
    where: eq(companies.organizationId, organizationId),
  });

  if (!company) {
    console.log("No company found for organization:", organizationId);
    return c.json(
      { message: "No company found for this organization" },
      HttpStatusCodes.FORBIDDEN
    );
  }

  console.log("Found company ID:", company.id, "for organization:", organizationId);

  // Pagination
  const page = parseIntSafe(c.req.query("page") ?? null, 1);
  const limitRaw = parseIntSafe(c.req.query("limit") ?? null, 20);
  const limit = Math.min(Math.max(limitRaw, 1), 100); // clamp 1..100
  const offset = (page - 1) * limit;

  // Filters
  const status = c.req.query("status");
  const search = c.req.query("search");
  const jobId = c.req.query("jobId");

  // Build where conditions - filter by jobs that belong to the company and admin_action
  const whereConditions: (SQL | undefined)[] = [
    eq(jobApplications.adminAction, "access_company" as typeof jobApplications.adminAction.enumValues[number]) // Only show applications that companies can access
  ];

  if (status) {
    whereConditions.push(eq(jobApplications.status, status as typeof jobApplications.status.enumValues[number]));
  }

  if (jobId) {
    whereConditions.push(eq(jobApplications.jobId, jobId));
  }

  if (search) {
    // Search in job application fields and user data
    whereConditions.push(
      sql`(
        ${jobApplications.jobId}::text ILIKE ${`%${search}%`} OR
        ${jobApplications.source} ILIKE ${`%${search}%`} OR
        ${jobApplications.coverLetterText} ILIKE ${`%${search}%`} OR
        ${user.name} ILIKE ${`%${search}%`} OR
        ${user.email} ILIKE ${`%${search}%`}
      )`
    );
  }

  const whereClause = and(...whereConditions);

  // Get total count with filters - join with jobs table to filter by company
  const countQuery = db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(jobApplications)
    .leftJoin(jobs, eq(jobApplications.jobId, jobs.id));

  // If we have a search term, we need to join with user table for the count too
  if (search) {
    countQuery.leftJoin(user, eq(jobApplications.userId, user.id));
  }

  // Add company filter to where conditions
  const countWhereConditions: (SQL | undefined)[] = [
    ...whereConditions,
    eq(jobs.companyId, company.id) // Only show applications for jobs belonging to this company
  ];

  const countResult = await countQuery.where(and(...countWhereConditions));

  const count = countResult && countResult[0] ? countResult[0].count : 0;

  try {
    // Use a raw query to join with user table and get user data
    const results = await db
      .select({
        // Job application fields
        id: jobApplications.id,
        organizationId: jobApplications.organizationId,
        userId: jobApplications.userId,
        jobId: jobApplications.jobId,
        roundNo: jobApplications.roundNo,
        status: jobApplications.status,
        adminAction: jobApplications.adminAction,
        mediaId: jobApplications.mediaId,
        applicantProfile: jobApplications.applicantProfile,
        coverLetterText: jobApplications.coverLetterText,
        source: jobApplications.source,
        referralCode: jobApplications.referralCode,
        tags: jobApplications.tags,
        submittedAt: jobApplications.submittedAt,
        createdAt: jobApplications.createdAt,
        updatedAt: jobApplications.updatedAt,
        // User fields
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
      })
      .from(jobApplications)
      .leftJoin(jobs, eq(jobApplications.jobId, jobs.id))
      .leftJoin(user, eq(jobApplications.userId, user.id))
      .where(and(whereClause, eq(jobs.companyId, company.id)))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(jobApplications.createdAt));

    console.log("Company job applications query results:", results);
    console.log("Total count:", count);
    console.log("Where conditions:", whereConditions);
    console.log("Organization ID used:", organizationId);
    console.log("Company ID used:", company.id);
    console.log("Query limit:", limit, "offset:", offset);

    // Debug user data
    if (results.length > 0) {
      console.log("First result user data:", {
        userId: results[0].userId,
        userName: results[0].userName,
        userEmail: results[0].userEmail,
        userImage: results[0].userImage
      });
      console.log("All results user data:", results.map(r => ({
        id: r.id,
        userId: r.userId,
        userName: r.userName,
        userEmail: r.userEmail
      })));
    }

    // Transform results to include user data in the expected format
    const transformedResults = results.map((result) => ({
      id: result.id,
      organizationId: result.organizationId,
      userId: result.userId,
      jobId: result.jobId,
      roundNo: result.roundNo,
      status: result.status,
      adminAction: result.adminAction,
      mediaId: result.mediaId,
      applicantProfile: result.applicantProfile,
      coverLetterText: result.coverLetterText,
      source: result.source,
      referralCode: result.referralCode,
      tags: result.tags,
      submittedAt: result.submittedAt,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      // Include user data
      user: {
        id: result.userId,
        name: result.userName || result.applicantProfile?.fullName || "Unknown",
        email: result.userEmail || result.applicantProfile?.email || "Not provided",
        image: result.userImage,
      },
    }));

    const totalCount = count;
    const totalPages = Math.max(1, Math.ceil(totalCount / Math.max(limit, 1)));

    return c.json(
      {
        data: transformedResults,
        meta: {
          totalCount,
          limit,
          currentPage: page,
          totalPages,
        },
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error fetching company job applications:", error);
    return c.json(
      { message: "Internal server error while fetching company job applications" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * ➕ Create a job application for the logged-in user/org
 * Body is validated upstream (e.g., via `jobApplicationInsertSchema`).
 */
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  const session = c.get("session") as Session | undefined;
  const db = c.get("db");

  console.log("Received job application data:", body);
  console.log("Session:", session);

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const insertData = {
    ...body,
    organizationId: session.activeOrganizationId ?? null,
    userId: session.userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log("Insert data:", insertData);

  // Check if user has already applied to this job
  const existingApplication = await db.query.jobApplications.findFirst({
    where: and(
      eq(jobApplications.userId, session.userId),
      eq(jobApplications.jobId, insertData.jobId)
    ),
  });

  if (existingApplication) {
    return c.json(
      { message: "You have already applied to this job" },
      HttpStatusCodes.CONFLICT
    );
  }

  try {
    const [inserted] = await db
      .insert(jobApplications)
      .values(insertData as typeof jobApplications.$inferInsert)
      .returning();

    console.log("Successfully inserted job application:", inserted);
    return c.json(inserted, HttpStatusCodes.CREATED);
  } catch (error: any) {
    console.error("Database insert error:", error);
    console.error("Error code:", error.code);
    console.error("Error constraint:", error.constraint);
    console.error("Error detail:", error.detail);

    // Check if it's a unique constraint violation
    if (error.code === '23505' && error.constraint === 'job_applications_job_user_round_uq') {
      return c.json(
        { message: "You have already applied to this job" },
        HttpStatusCodes.CONFLICT
      );
    }

    // Re-throw other errors
    throw error;
  }
};

/**
 * 🔍 Check if user has applied to a specific job
 */
export const checkApplication: APIRouteHandler<CheckApplicationRoute> = async (c) => {
  const { jobId } = c.req.valid("param");
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const application = await db.query.jobApplications.findFirst({
    where: and(
      eq(jobApplications.userId, session.userId),
      eq(jobApplications.jobId, jobId)
    ),
  });

  return c.json({
    hasApplied: !!application,
    application: application || undefined,
  }, HttpStatusCodes.OK);
};

/**
 * 🔍 Get one (must belong to the logged-in user)
 */
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = session.activeOrganizationId
    ? and(
        eq(jobApplications.id, String(id)),
        eq(jobApplications.userId, session.userId),
        eq(jobApplications.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(jobApplications.id, String(id)),
        eq(jobApplications.userId, session.userId)
      );

  const rec = await db.query.jobApplications.findFirst({ where });

  if (!rec) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(rec, HttpStatusCodes.OK);
};

/**
 * ✏️ Update (only your own row)
 * Body is validated upstream (e.g., via `jobApplicationUpdateSchema`).
 */
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");

  const updates = c.req.valid("json");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = session.activeOrganizationId
    ? and(
        eq(jobApplications.id, String(id)),
        eq(jobApplications.userId, session.userId),
        eq(jobApplications.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(jobApplications.id, String(id)),
        eq(jobApplications.userId, session.userId)
      );

  const [updated] = await db
    .update(jobApplications)
    .set({
      ...(updates as Partial<typeof jobApplications.$inferInsert>),
      updatedAt: new Date(),
    })
    .where(where)
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

/**
 * 🔧 Admin Update (allows updating adminAction)
 */
export const adminPatch: APIRouteHandler<AdminUpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const updates = c.req.valid("json");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // TODO: Add proper admin role check here
  // For now, we'll allow any authenticated user to access this endpoint
  // You should implement proper admin role checking based on your auth system
  // Example: if (!session.isAdmin) { return c.json({ message: "Forbidden" }, 403); }

  const [updated] = await db
    .update(jobApplications)
    .set({
      ...(updates as Partial<typeof jobApplications.$inferInsert>),
      updatedAt: new Date(),
    })
    .where(eq(jobApplications.id, String(id)))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

/**
 * 🗑️ Delete (only your own row)
 */
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const where = session.activeOrganizationId
    ? and(
        eq(jobApplications.id, String(id)),
        eq(jobApplications.userId, session.userId),
        eq(jobApplications.organizationId, session.activeOrganizationId)
      )
    : and(
        eq(jobApplications.id, String(id)),
        eq(jobApplications.userId, session.userId)
      );

  const [deleted] = await db.delete(jobApplications).where(where).returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

/**
 * 🗑️ Admin Delete (allows admins to delete any job application)
 */
export const adminRemove: APIRouteHandler<AdminRemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const session = c.get("session") as Session | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // TODO: Add proper admin role check here
  // For now, we'll allow any authenticated user to access this endpoint
  // You should implement proper admin role checking based on your auth system
  // Example: if (!session.isAdmin) { return c.json({ message: "Forbidden" }, 403); }

  const [deleted] = await db.delete(jobApplications).where(eq(jobApplications.id, String(id))).returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
