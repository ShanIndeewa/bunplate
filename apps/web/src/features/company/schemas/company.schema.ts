import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import {
  companies,
  companyBranches,
  companyImages,
  companyPolicies,
  companyTypes,
  industries,
} from "@repo/database";

// ==================== Company Type Schemas ====================
export const companyTypeSchema = createSelectSchema(companyTypes);
export type CompanyType = z.infer<typeof companyTypeSchema>;

export const companyTypeInsertSchema = createInsertSchema(companyTypes).omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const companyTypeUpdateSchema = createInsertSchema(companyTypes)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .partial();

// ==================== Industry Schemas ====================
export const industrySchema = createSelectSchema(industries);
export type Industry = z.infer<typeof industrySchema>;

export const industryInsertSchema = createInsertSchema(industries).omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const industryUpdateSchema = createInsertSchema(industries)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .partial();

// ==================== Company Schemas ====================
export const companySchema = createSelectSchema(companies);
export type Company = z.infer<typeof companySchema>;

export const companyInsertSchema = createInsertSchema(companies).omit({
  id: true,
  organizationId: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
});
export type CompanyInsertType = z.infer<typeof companyInsertSchema>;

export const companyUpdateSchema = createInsertSchema(companies)
  .omit({
    id: true,
    organizationId: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Branch Schemas ====================
export const companyBranchSchema = createSelectSchema(companyBranches);
export type CompanyBranch = z.infer<typeof companyBranchSchema>;

export const companyBranchInsertSchema = createInsertSchema(
  companyBranches
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyBranchUpdateSchema = createInsertSchema(companyBranches)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Image Schemas ====================
export const companyImageSchema = createSelectSchema(companyImages);
export type CompanyImage = z.infer<typeof companyImageSchema>;

export const companyImageInsertSchema = createInsertSchema(companyImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyImageUpdateSchema = createInsertSchema(companyImages)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Policy Schemas ====================
export const companyPolicySchema = createSelectSchema(companyPolicies);
export type CompanyPolicy = z.infer<typeof companyPolicySchema>;

export const companyPolicyInsertSchema = createInsertSchema(
  companyPolicies
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ==================== Company Policy Insert Type ====================
export type InsertCompanyPolicyType = z.infer<typeof companyPolicyInsertSchema>;

export const companyPolicyUpdateSchema = createInsertSchema(companyPolicies)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Complete Company Select Schema ====================
export const companySelectSchema = createSelectSchema(companies);

export const companySelectWithRelationsSchema = companySelectSchema.extend({
  branches: z.array(companyBranchSchema),
  images: z.array(companyImageSchema),
  policies: z.array(companyPolicySchema),
});

export type CompanySelectType = z.infer<
  typeof companySelectWithRelationsSchema
>;

// ==================== Query Params Schema ====================
export const companyQueryParamsSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().optional(),
  companyType: z.string().optional(),
  industryId: z.string().optional(),
});
