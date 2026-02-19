// job-category.zod.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Adjust the import path to wherever your table is exported from
import { jobCategory } from "core/database/schema"; // or: "@/server/db/schema/job-category"

// Define the job category type enum for validation
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
  "Engineering"
]);

export const jobCategorySelectSchema = createSelectSchema(jobCategory);

export const jobCategoryInsertSchema = createInsertSchema(jobCategory).omit({
  createdAt: true,
  updatedAt: true,
  userId: true, // set server-side from the session
}).extend({
  type: jobCategoryTypeSchema,
});

export type JobTypeInsert = z.infer<typeof jobCategoryInsertSchema>;

export const jobCategoryUpdateSchema = createSelectSchema(jobCategory)
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial()
  .extend({
    type: jobCategoryTypeSchema.optional(),
  });

export type JobCategory = z.infer<typeof jobCategorySelectSchema>;
export type JobCategoryInsert = z.infer<typeof jobCategoryInsertSchema>;
export type JobCategoryUpdate = z.infer<typeof jobCategoryUpdateSchema>;
