import { z } from "zod";
export declare const companyTypeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodNullable<z.ZodString>;
    thumbnail: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type CompanyType = z.infer<typeof companyTypeSchema>;
export declare const companyTypeInsertSchema: z.ZodObject<{
    name: z.ZodString;
    thumbnail: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const companyTypeUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const industrySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodNullable<z.ZodString>;
    thumbnail: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type Industry = z.infer<typeof industrySchema>;
export declare const industryInsertSchema: z.ZodObject<{
    name: z.ZodString;
    thumbnail: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const industryUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const companySchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    brandName: z.ZodNullable<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    website: z.ZodNullable<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    companyType: z.ZodNullable<z.ZodString>;
    industryId: z.ZodNullable<z.ZodString>;
    employeeCount: z.ZodNullable<z.ZodNumber>;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        suspended: "suspended";
        pending_approval: "pending_approval";
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type Company = z.infer<typeof companySchema>;
export declare const companyInsertSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        suspended: "suspended";
        pending_approval: "pending_approval";
    }>;
    description: z.ZodNullable<z.ZodString>;
    brandName: z.ZodNullable<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    website: z.ZodNullable<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    companyType: z.ZodNullable<z.ZodString>;
    industryId: z.ZodNullable<z.ZodString>;
    employeeCount: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export declare const companyInsertByAdminSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    organizationId: z.ZodString;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        suspended: "suspended";
        pending_approval: "pending_approval";
    }>;
    description: z.ZodNullable<z.ZodString>;
    createdBy: z.ZodString;
    brandName: z.ZodNullable<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    website: z.ZodNullable<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    companyType: z.ZodNullable<z.ZodString>;
    industryId: z.ZodNullable<z.ZodString>;
    employeeCount: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
export declare const companyUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        suspended: "suspended";
        pending_approval: "pending_approval";
    }>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    brandName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    street: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    logoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    companyType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    industryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    employeeCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export declare const companyBranchSchema: z.ZodObject<{
    id: z.ZodString;
    companyId: z.ZodString;
    branchName: z.ZodString;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type CompanyBranch = z.infer<typeof companyBranchSchema>;
export declare const companyBranchInsertSchema: z.ZodObject<{
    email: z.ZodNullable<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    companyId: z.ZodString;
    branchName: z.ZodString;
}, z.core.$strip>;
export declare const companyBranchUpdateSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    street: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    postalCode: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    companyId: z.ZodOptional<z.ZodString>;
    branchName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const companyImageSchema: z.ZodObject<{
    id: z.ZodString;
    companyId: z.ZodString;
    imageUrl: z.ZodString;
    altText: z.ZodNullable<z.ZodString>;
    displayOrder: z.ZodNullable<z.ZodNumber>;
    isThumbnail: z.ZodNullable<z.ZodBoolean>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type CompanyImage = z.infer<typeof companyImageSchema>;
export declare const companyImageInsertSchema: z.ZodObject<{
    imageUrl: z.ZodString;
    companyId: z.ZodString;
    altText: z.ZodNullable<z.ZodString>;
    displayOrder: z.ZodNullable<z.ZodNumber>;
    isThumbnail: z.ZodNullable<z.ZodBoolean>;
}, z.core.$strip>;
export declare const companyImageUpdateSchema: z.ZodObject<{
    imageUrl: z.ZodOptional<z.ZodString>;
    companyId: z.ZodOptional<z.ZodString>;
    altText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    displayOrder: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isThumbnail: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const companyPolicySchema: z.ZodObject<{
    id: z.ZodString;
    companyId: z.ZodString;
    policyType: z.ZodString;
    policyText: z.ZodString;
    effectiveDate: z.ZodString;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export type CompanyPolicy = z.infer<typeof companyPolicySchema>;
export declare const companyPolicyInsertSchema: z.ZodObject<{
    isActive: z.ZodBoolean;
    companyId: z.ZodString;
    policyType: z.ZodString;
    policyText: z.ZodString;
    effectiveDate: z.ZodString;
}, z.core.$strip>;
export declare const companyPolicyUpdateSchema: z.ZodObject<{
    isActive: z.ZodOptional<z.ZodBoolean>;
    companyId: z.ZodOptional<z.ZodString>;
    policyType: z.ZodOptional<z.ZodString>;
    policyText: z.ZodOptional<z.ZodString>;
    effectiveDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const companySelectSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    brandName: z.ZodNullable<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    website: z.ZodNullable<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    companyType: z.ZodNullable<z.ZodString>;
    industryId: z.ZodNullable<z.ZodString>;
    employeeCount: z.ZodNullable<z.ZodNumber>;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        suspended: "suspended";
        pending_approval: "pending_approval";
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
}, z.core.$strip>;
export declare const companySelectWithRelationsSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    createdBy: z.ZodString;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    brandName: z.ZodNullable<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    phone: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    website: z.ZodNullable<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    industryId: z.ZodNullable<z.ZodString>;
    employeeCount: z.ZodNullable<z.ZodNumber>;
    status: z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        suspended: "suspended";
        pending_approval: "pending_approval";
    }>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodNullable<z.ZodDate>;
    branches: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        companyId: z.ZodString;
        branchName: z.ZodString;
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        country: z.ZodString;
        postalCode: z.ZodString;
        phone: z.ZodNullable<z.ZodString>;
        email: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodNullable<z.ZodDate>;
    }, z.core.$strip>>;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        companyId: z.ZodString;
        imageUrl: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        displayOrder: z.ZodNullable<z.ZodNumber>;
        isThumbnail: z.ZodNullable<z.ZodBoolean>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodNullable<z.ZodDate>;
    }, z.core.$strip>>;
    policies: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        companyId: z.ZodString;
        policyType: z.ZodString;
        policyText: z.ZodString;
        effectiveDate: z.ZodString;
        isActive: z.ZodBoolean;
        createdAt: z.ZodDate;
        updatedAt: z.ZodNullable<z.ZodDate>;
    }, z.core.$strip>>;
    companyType: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodNullable<z.ZodString>;
        thumbnail: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodNullable<z.ZodDate>;
    }, z.core.$strip>>;
    industry: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodNullable<z.ZodString>;
        thumbnail: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodNullable<z.ZodDate>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CompanySelectType = z.infer<typeof companySelectWithRelationsSchema>;
export declare const companyQueryParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
    search: z.ZodOptional<z.ZodString>;
    companyType: z.ZodOptional<z.ZodString>;
    industryId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
