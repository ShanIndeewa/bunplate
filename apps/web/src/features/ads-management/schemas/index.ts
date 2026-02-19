import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { ad } from "core/database/schema";

// Full row (select) schema — Date objects for timestamps
export const adSchema = createSelectSchema(ad);

// Insert schema — omit server-managed fields
export const adInsertSchema = createInsertSchema(ad).omit({
  id: true,
  userId: true, // set from session on the server
  createdAt: true, // defaultNow() in DB
  viewCount: true, // defaults to 0
  clickCount: true, // defaults to 0
});

// Update schema — same omissions, but everything optional
export const adUpdateSchema = createInsertSchema(ad)
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    viewCount: true,
    clickCount: true,
  })
  .partial();

export type Ad = z.infer<typeof adSchema>;
export type AdInsertType = z.infer<typeof adInsertSchema>;
export type AdUpdateType = z.infer<typeof adUpdateSchema>;


