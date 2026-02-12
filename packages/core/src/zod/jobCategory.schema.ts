import { z } from "zod";

export const jobCategoryTypeSchema = z.enum([
  "Technology",
  "Design",
  "Marketing",
  "Healthcare",
  "Education",
  "Finance",
  "Hospitality",
  "Transportation",
  "Retail",
  "Engineering",
]);

export const jobCategorySelectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  keyword: z.string(),
  description: z.string().nullable(),
  type: jobCategoryTypeSchema,
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const jobCategoryInsertSchema = jobCategorySelectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const jobCategoryUpdateSchema = jobCategorySelectSchema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type JobCategory = z.infer<typeof jobCategorySelectSchema>;
export type JobCategoryInsert = z.infer<typeof jobCategoryInsertSchema>;
export type JobCategoryUpdate = z.infer<typeof jobCategoryUpdateSchema>;
