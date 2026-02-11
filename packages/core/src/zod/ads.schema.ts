import { z } from "zod";
import { id } from "zod/locales";

export const adSelectSchema = z.object({
  // General Info
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
  
    // Ad Meta
    category: z.string().nullable(),
    externalLink: z.string().nullable(),
    placement: z.string(),
    adSize: z.string(),
  
    // Scheduling
    isActive: z.boolean(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
  
    // Stats
    viewCount: z.number(),
    clickCount: z.number(),
  
    // Extra metadata (future-proof)
    metadata: z.json().nullable(),
  
    // Audit
    createdAt: z.date(),
  
});

export const adInsertSchema = adSelectSchema.omit({
  id: true, // auto-generated
  createdAt: true, // auto-generated
  viewCount: true, // defaults to 0
  clickCount: true, // defaults to 0
  userId: true, // set server-side from session
});

export const adUpdateSchema = adSelectSchema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    viewCount: true,
    clickCount: true,
  })
  .partial();

// Types
export type Ad = z.infer<typeof adSelectSchema>;
export type AdInsert = z.infer<typeof adInsertSchema>;
export type AdUpdate = z.infer<typeof adUpdateSchema>;
