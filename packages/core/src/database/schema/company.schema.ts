import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { organization, user } from "./auth.schema";

// ==================== ENUMS ====================

export const companyStatusEnum = pgEnum("company_status", [
  "active",
  "inactive",
  "suspended",
  "pending_approval",
]);

// ==================== MASTER TABLES ====================

export const companyTypes = pgTable("company_types", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(), // e.g., Tech, Travel, Real Estate
  slug: varchar("slug", { length: 100 }),
  thumbnail: text("thumbnail"),
  ...timestamps,
});

export const industries = pgTable("industries", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar("name", { length: 100 }).notNull(), // e.g., IT, Hospitality, Finance
  slug: varchar("slug", { length: 100 }),
  thumbnail: text("thumbnail"),
  ...timestamps,
});

// ==================== CORE COMPANY ====================

export const companies = pgTable(
  "companies",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    organizationId: text("organization_id")
      .references(() => organization.id, { onDelete: "cascade" }),
    createdBy: text("created_by")
      .references(() => user.id, { onDelete: "set null" })
      .notNull(),

    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    brandName: varchar("brand_name", { length: 255 }),

    // Address fields
    street: varchar("street", { length: 255 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),

    // Contact info
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }),
    website: varchar("website", { length: 500 }),
    logoUrl: varchar("logo_url", { length: 500 }),

    // Business Details
    companyType: text("company_type").references(() => companyTypes.id, {
      onDelete: "set null",
    }),
    industryId: text("industry_id").references(() => industries.id, {
      onDelete: "set null",
    }),
    employeeCount: integer("employee_count").default(0),

    // Status
    status: companyStatusEnum("status").default("pending_approval").notNull(),

    ...timestamps,
  },
  (table) => [
    index("companies_city_idx").on(table.city),
    index("companies_status_idx").on(table.status),
    index("companies_industry_idx").on(table.industryId),
  ]
);

// ==================== RELATED TABLES ====================

export const companyBranches = pgTable(
  "company_branches",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    companyId: text("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),

    branchName: varchar("branch_name", { length: 255 }).notNull(),
    street: varchar("street", { length: 255 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }),

    ...timestamps,
  },
  (table) => [
    index("company_branches_company_idx").on(table.companyId),
    index("company_branches_city_idx").on(table.city),
  ]
);

export const companyImages = pgTable(
  "company_images",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    companyId: text("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),

    imageUrl: text("image_url").notNull(),
    altText: varchar("alt_text", { length: 255 }),
    displayOrder: integer("display_order").default(0),
    isThumbnail: boolean("is_thumbnail").default(false),

    ...timestamps,
  },
  (table) => [
    index("company_images_company_idx").on(table.companyId),
    index("company_images_display_order_idx").on(table.displayOrder),
  ]
);

export const companyPolicies = pgTable(
  "company_policies",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    companyId: text("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    policyType: varchar("policy_type", { length: 100 }).notNull(), // HR, Privacy, Work From Home, etc.
    policyText: text("policy_text").notNull(),

    effectiveDate: date("effective_date").defaultNow().notNull(),
    isActive: boolean("is_active").default(true).notNull(),

    ...timestamps,
  },
  (table) => [
    index("company_policies_company_idx").on(table.companyId),
    index("company_policies_type_idx").on(table.policyType),
  ]
);

// ==================== RELATIONS ====================

export const companyRelations = relations(companies, ({ many, one }) => ({
  branches: many(companyBranches),
  images: many(companyImages),
  policies: many(companyPolicies),
  companyType: one(companyTypes, {
    fields: [companies.companyType],
    references: [companyTypes.id],
  }),
  industry: one(industries, {
    fields: [companies.industryId],
    references: [industries.id],
  }),
}));

export const companyBranchesRelations = relations(
  companyBranches,
  ({ one }) => ({
    company: one(companies, {
      fields: [companyBranches.companyId],
      references: [companies.id],
    }),
  })
);

export const companyImagesRelations = relations(companyImages, ({ one }) => ({
  company: one(companies, {
    fields: [companyImages.companyId],
    references: [companies.id],
  }),
}));

export const companyPoliciesRelations = relations(
  companyPolicies,
  ({ one }) => ({
    company: one(companies, {
      fields: [companyPolicies.companyId],
      references: [companies.id],
    }),
  })
);
