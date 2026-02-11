
import { z } from "zod";

import {
  companies,
  companyBranches,
  companyImages,
  companyPolicies,
  companyTypes,
  industries,
} from "../database/schema/company.schema";

// ==================== Company Type Schemas ====================
export const companyTypeSchema = z.object(companyTypes);
export type CompanyType = z.infer<typeof companyTypeSchema>;

export const companyTypeInsertSchema = z.object(companyTypes).omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const companyTypeUpdateSchema = z.object(companyTypes)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .partial();

// ==================== Industry Schemas ====================
export const industrySchema = z.object(industries);
export type Industry = z.infer<typeof industrySchema>;

export const industryInsertSchema = z.object(industries).omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const industryUpdateSchema = z.object(industries)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .partial();

// ==================== Company Schemas ====================
export const companySchema = z.object(companies);
export type Company = z.infer<typeof companySchema>;

export const companyInsertSchema = z.object(companies).omit({
  id: true,
  organizationId: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
});

export const companyUpdateSchema = z.object(companies)
  .omit({
    id: true,
    organizationId: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Branch Schemas ====================
export const companyBranchSchema = z.object(companyBranches);
export type CompanyBranch = z.infer<typeof companyBranchSchema>;

export const companyBranchInsertSchema = z.object(
  companyBranches
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyBranchUpdateSchema = z.object(companyBranches)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Image Schemas ====================
export const companyImageSchema = z.object(companyImages);
export type CompanyImage = z.infer<typeof companyImageSchema>;

export const companyImageInsertSchema = z.object(companyImages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyImageUpdateSchema = z.object(companyImages)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Policy Schemas ====================
export const companyPolicySchema = z.object(companyPolicies);
export type CompanyPolicy = z.infer<typeof companyPolicySchema>;

export const companyPolicyInsertSchema = z.object(
  companyPolicies
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyPolicyUpdateSchema = z.object(companyPolicies)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Complete Company Select Schema ====================
export const companySelectSchema = z.object(companies);

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
