import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { jobWishlist } from "core/database/schema";

import type {
    CheckSavedRoute,
    CreateRoute,
    GetByIdRoute,
    ListRoute,
    RemoveRoute,
    UpdateRoute,
} from "@/routes/jobWishlist.routes";

// 🔍 List all jobWishlists
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  try {
    const query = c.req.valid("query");
    const session = c.get("session");

    if (!session) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    // Get pagination params
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    // Get user's wishlist items only
    const results = await db.query.jobWishlist.findMany({
      where: (wishlist, { eq }) => eq(wishlist.userId, session.userId),
      limit,
      offset,
    });

    const totalCount = results.length;
    const totalPages = Math.ceil(totalCount / limit);

    return c.json(
      {
        data: results,
        meta: { totalCount, limit, currentPage: page, totalPages },
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error fetching job wishlists:", error);
    return c.json(
      { message: "Internal server error while fetching wishlist" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create a new jobWishlist
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const db = c.get("db");
  try {
    const body = c.req.valid("json");
    const session = c.get("session");

    if (!session) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    // Validate required fields
    if (!body.jobId) {
      return c.json(
        { message: "Job ID is required" },
        HttpStatusCodes.BAD_REQUEST
      );
    }

    // Ensure the wishlist belongs to the current user
    const [inserted] = await db
      .insert(jobWishlist)
      .values({
        ...body,
        userId: session.userId, // force userId from session
      })
      .returning();

    return c.json(inserted, HttpStatusCodes.CREATED);
  } catch (error) {
    console.error("Error creating job wishlist:", error);
    return c.json(
      { message: "Internal server error while creating wishlist" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// 🔍 Get a single jobWishlist by ID
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");

  const found = await db.query.jobWishlist.findFirst({
    where: eq(jobWishlist.id, id),
  });

  if (!found) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(found, HttpStatusCodes.OK);
};

// Update an existing jobWishlist
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("session");
  const db = c.get("db");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Only allow updating wishlist owned by current user
  const [updated] = await db
    .update(jobWishlist)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(jobWishlist.id, id))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

// Check if job is saved by user
export const checkSaved: APIRouteHandler<CheckSavedRoute> = async (c) => {
  const db = c.get("db");
  const { jobId } = c.req.valid("param");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const wishlistItem = await db.query.jobWishlist.findFirst({
    where: (wishlist, { eq, and }) => and(
      eq(wishlist.userId, session.userId),
      eq(wishlist.jobId, jobId)
    ),
  });

  return c.json({
    isSaved: !!wishlistItem,
    wishlistItem: wishlistItem ? {
      id: wishlistItem.id,
      jobId: wishlistItem.jobId,
      isApplied: wishlistItem.isApplied,
      createdAt: wishlistItem.createdAt?.toISOString() || new Date().toISOString(),
    } : undefined,
  }, HttpStatusCodes.OK);
};

// Delete a jobWishlist
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const session = c.get("session");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Only allow deletion if wishlist belongs to current user
  const [deleted] = await db
    .delete(jobWishlist)
    .where(eq(jobWishlist.id, id))
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(
    { message: "Job wishlist deleted successfully" },
    HttpStatusCodes.OK
  );
};
