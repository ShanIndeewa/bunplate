import { z } from "zod";

/* ======================================================
   Base Article Schema (manual definition)
   (must match your DB columns)
====================================================== */

export const articleSchema = z.object({
  id: z.string(),

  title: z.string().min(1),

  content: z.string().nullable(),

  slug: z.string().nullable(),

  excerpt: z.string().nullable(),

  featuredImage: z.string().nullable(),

  userId: z.string(),

  organizationId: z.string().nullable(),

  createdAt: z.string(), // or z.date() if you use Date objects
  updatedAt: z.string().nullable(),
});

/* ======================================================
   Insert
====================================================== */

export const articleInsertSchema = articleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  organizationId: true,
  userId: true,
});

/* ======================================================
   Update
====================================================== */

export const articleUpdateSchema = articleInsertSchema.partial();

/* ======================================================
   TYPES
====================================================== */

export type Article = z.infer<typeof articleSchema>;

export type ArticleInsertType = z.infer<typeof articleInsertSchema>;

export type ArticleUpdateType = z.infer<typeof articleUpdateSchema>;
