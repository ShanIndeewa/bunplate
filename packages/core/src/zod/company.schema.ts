import { z } from "zod";

// ==================== Company Type Schemas ====================
export const companyTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  thumbnail: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type CompanyType = z.infer<typeof companyTypeSchema>;

export const companyTypeInsertSchema = companyTypeSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const companyTypeUpdateSchema = companyTypeSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .partial();

// ==================== Industry Schemas ====================
export const industrySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  thumbnail: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type Industry = z.infer<typeof industrySchema>;

export const industryInsertSchema = industrySchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const industryUpdateSchema = industrySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .partial();

// ==================== Company Schemas ====================
export const companySchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  createdBy: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  brandName: z.string().nullable(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  logoUrl: z.string().nullable(),
  companyType: z.string().nullable(),
  industryId: z.string().nullable(),
  employeeCount: z.number().nullable(),
  status: z.enum(["active", "inactive", "suspended", "pending_approval"]),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type Company = z.infer<typeof companySchema>;

export const companyInsertSchema = companySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  organizationId: z.string().optional(),
  createdBy: z.string().optional(),
});

// Keep alias for backward compatibility
export const companyInsertByAdminSchema = companyInsertSchema;

export const companyUpdateSchema = companySchema
  .omit({
    id: true,
    organizationId: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Branch Schemas ====================
export const companyBranchSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  branchName: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type CompanyBranch = z.infer<typeof companyBranchSchema>;

export const companyBranchInsertSchema = companyBranchSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyBranchUpdateSchema = companyBranchSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Image Schemas ====================
export const companyImageSchema = z.object({
  id: z.string(),
  companyId: z.string(),
  imageUrl: z.string(),
  altText: z.string().nullable(),
  displayOrder: z.number().nullable(),
  isThumbnail: z.boolean().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type CompanyImage = z.infer<typeof companyImageSchema>;

export const companyImageInsertSchema = companyImageSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyImageUpdateSchema = companyImageSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Company Policy Schemas ====================
export const companyPolicySchema = z.object({
  id: z.string(),
  companyId: z.string(),
  policyType: z.string(),
  policyText: z.string(),
  effectiveDate: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});
export type CompanyPolicy = z.infer<typeof companyPolicySchema>;

export const companyPolicyInsertSchema = companyPolicySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const companyPolicyUpdateSchema = companyPolicySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// ==================== Complete Company Select Schema ====================
export const companySelectSchema = companySchema;

export const companySelectWithRelationsSchema = companySelectSchema.extend({
  branches: z.array(companyBranchSchema),
  images: z.array(companyImageSchema),
  policies: z.array(companyPolicySchema),
  companyType: companyTypeSchema.nullable(),
  industry: industrySchema.nullable(),
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
