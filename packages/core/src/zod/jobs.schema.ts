import { z } from "zod";

export const jobsTypeSchema = z.enum([
  "full_time",
  "part_time",
  "contract",
  "internship",
]);

export const jobsStatusSchema = z.enum(["open", "closed", "paused"]);

export const job = z.object({
  id: z.string(),
  companyId: z.string(),
  jobCategoryId: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  location: z.string().nullable(),
  type: jobsTypeSchema,
  salaryMin: z.string().nullable(),
  salaryMax: z.string().nullable(),
  experienceRequired: z.string().nullable(),
  skills: z.any().nullable(),
  numberOfVacancies: z.number(),
  status: jobsStatusSchema,
  isRemote: z.boolean(),
  postedAt: z.coerce.date(),
  closingDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const jobInsertSchema = job
  .omit({
    id: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
    postedAt: true,
  })
  .extend({
    salaryMin: z.number().nullable().optional(),
    salaryMax: z.number().nullable().optional(),
    numberOfVacancies: z.number().min(1).default(1),
    status: jobsStatusSchema.default("open"),
    isRemote: z.boolean().default(false),
    jobCategoryId: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    experienceRequired: z.string().nullable().optional(),
    skills: z.any().nullable().optional(),
    closingDate: z.preprocess((val) => {
      if (typeof val === "string" && val) return new Date(val);
      return val;
    }, z.date().nullable().optional()),
  });

export const jobUpdateSchema = job
  .omit({
    id: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
    postedAt: true,
  })
  .partial();

export type Job = z.infer<typeof job>;
export type JobInsertType = z.infer<typeof jobInsertSchema>;
export type JobUpdateType = z.infer<typeof jobUpdateSchema>;
