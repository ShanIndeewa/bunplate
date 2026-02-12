import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";


import type { APIRouteHandler } from "@/types";
import { bulkMessage } from "core/database/schema";

import type {
    CreateRoute,
    GetByIdRoute,
    ListRoute,
    RemoveRoute,
    UpdateRoute,
    BulkImportRoute,
} from "@/routes/bulk-message.routes";

// 🔍 List all bulk messages
export const list: APIRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  const results = await db.query.bulkMessage.findMany({});
  const page = 1; // or from query params
  const limit = results.length; // or from query params
  const totalCount = results.length;
  const totalPages = Math.ceil(totalCount / limit);

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
};

// Create new bulk message
export const create: APIRouteHandler<CreateRoute> = async (c) => {
  const db = c.get("db");
  const body = c.req.valid("json");
  const session = c.get("session") as { userId: string; activeOrganizationId?: string | null } | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [inserted] = await db
    .insert(bulkMessage)
    .values({
      userId: session.userId, // Get userId from session
      note: body.note,
      phoneNumber: body.phoneNumber,
      whatsappNumber: body.whatsappNumber,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return c.json(inserted, HttpStatusCodes.CREATED);
};

// Bulk import bulk messages
export const bulkImport: APIRouteHandler<BulkImportRoute> = async (c) => {
  const body = c.req.valid("json");
  const db = c.get("db");
  const session = c.get("session") as { userId: string; activeOrganizationId?: string | null } | undefined;

  if (!session?.userId) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  try {
    // Validate that all records have required fields
    const validatedRecords = body.records.map((record, index) => {
      if (!record.note || !record.phoneNumber || !record.whatsappNumber) {
        throw new Error(`Record ${index + 1} is missing required fields`);
      }
      return {
        userId: session.userId,
        note: record.note,
        phoneNumber: record.phoneNumber,
        whatsappNumber: record.whatsappNumber,
        status: "pending" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Insert all records in a single transaction
    const inserted = await db
      .insert(bulkMessage)
      .values(validatedRecords)
      .returning();

    return c.json(
      {
        message: `Successfully imported ${inserted.length} bulk messages`,
        count: inserted.length,
        records: inserted
      },
      HttpStatusCodes.CREATED
    );
  } catch (error) {
    return c.json(
      {
        message: error instanceof Error ? error.message : "Failed to import bulk messages",
        error: "VALIDATION_ERROR"
      },
      HttpStatusCodes.BAD_REQUEST
    );
  }
};

// 🔍 Get a single bulk message
export const getOne: APIRouteHandler<GetByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");

  const bulkMessageItem = await db.query.bulkMessage.findFirst({
    where: eq(bulkMessage.id, String(id)),
  });

  if (!bulkMessageItem) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(bulkMessageItem, HttpStatusCodes.OK);
};

// Update bulk message
export const patch: APIRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");
  const session = c.get("user");
  const db = c.get("db");

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [updated] = await db
    .update(bulkMessage)
    .set({
      ...(updates.note && { note: updates.note }),
      ...(updates.phoneNumber && { phoneNumber: updates.phoneNumber }),
      ...(updates.whatsappNumber && { whatsappNumber: updates.whatsappNumber }),
      ...(updates.status && {
        status: updates.status as "pending" | "sent" | "failed",
      }),
      updatedAt: new Date(),
    })
    .where(eq(bulkMessage.id, String(id)))
    .returning();

  if (!updated) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(updated, HttpStatusCodes.OK);
};

//  Delete bulk message
export const remove: APIRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const db = c.get("db");
  const session = c.get("user") as { organizationId?: string } | undefined;

  if (!session) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const [deleted] = await db
    .delete(bulkMessage)
    .where(eq(bulkMessage.id, String(id)))
    .returning();

  if (!deleted) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
