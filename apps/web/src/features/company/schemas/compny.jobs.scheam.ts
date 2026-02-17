import { z } from "zod";

// -------------------
// Job schema matching API response
// -------------------
export const job = z.object({
  id: z.string(),
  companyId: z.string(),
  jobCategoryId: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  location: z.string().nullable(),
  type: z.enum(["full_time", "part_time", "contract", "internship"]),
  salaryMin: z.preprocess(
    (val) => (val ? Number(val) : null),
    z.number().nullable()
  ),
  salaryMax: z.preprocess(
    (val) => (val ? Number(val) : null),
    z.number().nullable()
  ),
  experienceRequired: z.string().nullable(),
  skills: z.preprocess((val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") return [val];
    return [];
  }, z.array(z.string())),
  numberOfVacancies: z.number(),
  status: z.enum(["open", "closed", "paused"]),
  isRemote: z.boolean(),
  postedAt: z.string(),
  closingDate: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  company: z.object({
    id: z.string(),
    organizationId: z.string().optional(),
    createdBy: z.string().optional(),
    name: z.string(),
    description: z.string().nullable().optional(),
    brandName: z.string().nullable().optional(),
    street: z.string().nullable().optional(),
    city: z.string(),
    state: z.string().nullable().optional(),
    country: z.string(),
    postalCode: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    logoUrl: z.string().nullable().optional(),
    companyType: z.string().nullable().optional(),
    industryId: z.string().nullable().optional(),
    employeeCount: z.number().optional(),
    status: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  jobCategory: z.object({
    id: z.string(),
    userId: z.string(),
    keyword: z.string(),
    description: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type Job = z.infer<typeof job>;
