import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { jobs } from "@repo/database";

// -------------------
// Select schema (full job object)
// -------------------
export const job = createSelectSchema(jobs);

// -------------------
// Insert schema (used for creating a job)
// Automatically omits fields handled by backend like id, companyId, timestamps
// -------------------
export const jobInsertSchema = createInsertSchema(jobs)
  .omit({
    id: true,
    companyId: true, // will be set automatically from logged-in user
    createdAt: true,
    updatedAt: true,
    postedAt: true, // handled by default
  })
  .extend({
    salaryMin: z.number().nullable().optional(),
    salaryMax: z.number().nullable().optional(),
    numberOfVacancies: z.number().min(1).default(1),
    closingDate: z.preprocess((val) => {
      if (typeof val === "string" && val) return new Date(val);
      return val;
    }, z.date().nullable()), // now string will be converted to Date
  });

// -------------------
// Update schema (partial, for updating a job)
// -------------------
export const jobUpdateSchema = createInsertSchema(jobs)
  .omit({
    id: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
    postedAt: true,
  })
  .partial(); // allow partial updates

// -------------------
// TypeScript types
// -------------------
export type Job = z.infer<typeof job>;
export type JobInsertType = z.infer<typeof jobInsertSchema>;
export type JobUpdateType = z.infer<typeof jobUpdateSchema>;
