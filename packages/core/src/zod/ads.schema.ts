import { z } from "zod";

export const adSelectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  category: z.string().nullable(),
  externalLink: z.string().nullable(),
  placement: z.string(),
  adSize: z.string(),
  isActive: z.boolean(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  viewCount: z.number(),
  clickCount: z.number(),
  metadata: z.any().nullable(),
  createdAt: z.coerce.date(),
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
