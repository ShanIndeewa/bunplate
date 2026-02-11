CREATE TYPE "public"."company_status" AS ENUM('active', 'inactive', 'suspended', 'pending_approval');--> statement-breakpoint
CREATE TYPE "public"."job_category_type" AS ENUM('Technology', 'Design', 'Marketing', 'Healthcare', 'Education', 'Finance', 'Hospitality', 'Transportation', 'Retail', 'Engineering');--> statement-breakpoint
CREATE TYPE "public"."jobs_status" AS ENUM('open', 'closed', 'paused');--> statement-breakpoint
CREATE TYPE "public"."jobs_type" AS ENUM('full_time', 'part_time', 'contract', 'internship');--> statement-breakpoint
CREATE TYPE "public"."admin_action" AS ENUM('admin_only', 'access_company');--> statement-breakpoint
CREATE TYPE "public"."application_status" AS ENUM('draft', 'submitted', 'under_review', 'shortlisted', 'interview_scheduled', 'offer_extended', 'hired', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('live', 'expired');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('image', 'video', 'audio', 'document');--> statement-breakpoint
CREATE TABLE "article" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text,
	"user_id" text NOT NULL,
	"title" varchar(200) NOT NULL,
	"slug" varchar(220),
	"excerpt" text,
	"content" text,
	"featured_image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "article_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "bulk_message" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"note" text NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"whatsapp_number" varchar(20) NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text NOT NULL,
	"created_by" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"brand_name" varchar(255),
	"street" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"phone" varchar(20),
	"email" varchar(255),
	"website" varchar(500),
	"logo_url" varchar(500),
	"company_type" text,
	"industry_id" text,
	"employee_count" integer DEFAULT 0,
	"status" "company_status" DEFAULT 'pending_approval' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "company_branches" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" text NOT NULL,
	"branch_name" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"phone" varchar(20),
	"email" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "company_images" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" text NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" varchar(255),
	"display_order" integer DEFAULT 0,
	"is_thumbnail" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "company_policies" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" text NOT NULL,
	"policy_type" varchar(100) NOT NULL,
	"policy_text" text NOT NULL,
	"effective_date" date DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "company_types" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100),
	"thumbnail" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "industries" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100),
	"thumbnail" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "job_category" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"keyword" text NOT NULL,
	"description" text,
	"type" "job_category_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" text NOT NULL,
	"job_category_id" text,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255),
	"type" "jobs_type" NOT NULL,
	"salary_min" numeric(10, 2),
	"salary_max" numeric(10, 2),
	"experience_required" varchar(100),
	"skills" jsonb,
	"number_of_vacancies" integer DEFAULT 1 NOT NULL,
	"status" "jobs_status" DEFAULT 'open'::jobs_status NOT NULL,
	"is_remote" boolean DEFAULT false NOT NULL,
	"posted_at" timestamp DEFAULT now() NOT NULL,
	"closing_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text,
	"user_id" text NOT NULL,
	"job_id" text NOT NULL,
	"round_no" integer DEFAULT 1 NOT NULL,
	"status" "application_status" DEFAULT 'submitted' NOT NULL,
	"admin_action" "admin_action" DEFAULT 'access_company' NOT NULL,
	"resume_id" text,
	"applicant_profile" jsonb,
	"cover_letter_text" text,
	"source" varchar(64),
	"referral_code" varchar(64),
	"tags" jsonb,
	"submitted_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_application_reviews" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" text NOT NULL,
	"status" "application_status" DEFAULT 'under_review' NOT NULL,
	"reviewer_id" text,
	"rating" integer,
	"comments" text,
	"attachments" jsonb,
	"interview_at" timestamp with time zone,
	"interview_location" varchar(256),
	"meeting_link" varchar(512),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobWishlist" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"job_id" text NOT NULL,
	"organization_id" text,
	"job_status" "job_status" DEFAULT 'live' NOT NULL,
	"is_applied" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"type" "media_type" NOT NULL,
	"filename" text NOT NULL,
	"size" integer NOT NULL,
	"uploaded_by" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"metadata" text,
	"notification_type" text NOT NULL,
	"recipient_type" varchar(20) NOT NULL,
	"recipient_id" text,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userProject" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text,
	"user_id" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"project_url" varchar(500),
	"start_date" date,
	"end_date" date,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userSkill" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text,
	"user_id" text NOT NULL,
	"skill_name" varchar(255) NOT NULL,
	"proficiency" varchar(50),
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userRecommendation" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" text,
	"user_id" text NOT NULL,
	"recommender_user_id" text,
	"recommender_name" varchar(255) NOT NULL,
	"recommender_title" varchar(255),
	"text" text,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bulk_message" ADD CONSTRAINT "bulk_message_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_company_type_company_types_id_fk" FOREIGN KEY ("company_type") REFERENCES "public"."company_types"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_industry_id_industries_id_fk" FOREIGN KEY ("industry_id") REFERENCES "public"."industries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_branches" ADD CONSTRAINT "company_branches_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_images" ADD CONSTRAINT "company_images_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "company_policies" ADD CONSTRAINT "company_policies_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_category" ADD CONSTRAINT "job_category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_job_category_id_job_category_id_fk" FOREIGN KEY ("job_category_id") REFERENCES "public"."job_category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_application_reviews" ADD CONSTRAINT "job_application_reviews_application_id_job_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."job_applications"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_application_reviews" ADD CONSTRAINT "job_application_reviews_reviewer_id_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobWishlist" ADD CONSTRAINT "jobWishlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobWishlist" ADD CONSTRAINT "jobWishlist_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobWishlist" ADD CONSTRAINT "jobWishlist_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_uploaded_by_user_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userProject" ADD CONSTRAINT "userProject_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userProject" ADD CONSTRAINT "userProject_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userSkill" ADD CONSTRAINT "userSkill_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userSkill" ADD CONSTRAINT "userSkill_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userRecommendation" ADD CONSTRAINT "userRecommendation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userRecommendation" ADD CONSTRAINT "userRecommendation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userRecommendation" ADD CONSTRAINT "userRecommendation_recommender_user_id_user_id_fk" FOREIGN KEY ("recommender_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "companies_city_idx" ON "companies" USING btree ("city");--> statement-breakpoint
CREATE INDEX "companies_status_idx" ON "companies" USING btree ("status");--> statement-breakpoint
CREATE INDEX "companies_industry_idx" ON "companies" USING btree ("industry_id");--> statement-breakpoint
CREATE INDEX "company_branches_company_idx" ON "company_branches" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "company_branches_city_idx" ON "company_branches" USING btree ("city");--> statement-breakpoint
CREATE INDEX "company_images_company_idx" ON "company_images" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "company_images_display_order_idx" ON "company_images" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "company_policies_company_idx" ON "company_policies" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "company_policies_type_idx" ON "company_policies" USING btree ("policy_type");--> statement-breakpoint
CREATE INDEX "jobs_company_idx" ON "jobs" USING btree ("company_id");--> statement-breakpoint
CREATE UNIQUE INDEX "job_applications_job_user_round_uq" ON "job_applications" USING btree ("job_id","user_id","round_no");--> statement-breakpoint
CREATE INDEX "job_applications_job_idx" ON "job_applications" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "job_applications_user_idx" ON "job_applications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "job_application_reviews_app_idx" ON "job_application_reviews" USING btree ("application_id");--> statement-breakpoint
CREATE INDEX "job_application_reviews_reviewer_idx" ON "job_application_reviews" USING btree ("reviewer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_job_unique" ON "jobWishlist" USING btree ("user_id","job_id");