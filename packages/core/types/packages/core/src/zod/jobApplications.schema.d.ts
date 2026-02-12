import { z } from "zod";
/** applicant_profile JSONB shape */
export declare const ApplicantProfileSchema: z.ZodOptional<z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    linkedin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    portfolio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>>;
export declare const applicationStatusSchema: z.ZodEnum<{
    draft: "draft";
    submitted: "submitted";
    under_review: "under_review";
    shortlisted: "shortlisted";
    interview_scheduled: "interview_scheduled";
    offer_extended: "offer_extended";
    hired: "hired";
    rejected: "rejected";
    withdrawn: "withdrawn";
}>;
export declare const adminActionSchema: z.ZodEnum<{
    admin_only: "admin_only";
    access_company: "access_company";
}>;
/** SELECT schema (read shape) */
export declare const jobApplication: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
    jobId: z.ZodString;
    roundNo: z.ZodNumber;
    status: z.ZodEnum<{
        draft: "draft";
        submitted: "submitted";
        under_review: "under_review";
        shortlisted: "shortlisted";
        interview_scheduled: "interview_scheduled";
        offer_extended: "offer_extended";
        hired: "hired";
        rejected: "rejected";
        withdrawn: "withdrawn";
    }>;
    adminAction: z.ZodEnum<{
        admin_only: "admin_only";
        access_company: "access_company";
    }>;
    mediaId: z.ZodNullable<z.ZodString>;
    applicantProfile: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        portfolio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
    coverLetterText: z.ZodNullable<z.ZodString>;
    source: z.ZodNullable<z.ZodString>;
    referralCode: z.ZodNullable<z.ZodString>;
    tags: z.ZodNullable<z.ZodAny>;
    submittedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
/** INSERT schema (create shape) */
export declare const jobApplicationInsertSchema: z.ZodObject<{
    jobId: z.ZodString;
    coverLetterText: z.ZodNullable<z.ZodString>;
    mediaId: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodNullable<z.ZodString>>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    referralCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    applicantProfile: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        portfolio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>;
}, z.core.$strip>;
/** UPDATE schema (patch shape) */
export declare const jobApplicationUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        draft: "draft";
        submitted: "submitted";
        under_review: "under_review";
        shortlisted: "shortlisted";
        interview_scheduled: "interview_scheduled";
        offer_extended: "offer_extended";
        hired: "hired";
        rejected: "rejected";
        withdrawn: "withdrawn";
    }>>;
    coverLetterText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    mediaId: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodNullable<z.ZodString>>>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    referralCode: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    applicantProfile: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        portfolio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$strip>;
/** ADMIN UPDATE schema (allows admin to update adminAction) */
export declare const jobApplicationAdminUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        draft: "draft";
        submitted: "submitted";
        under_review: "under_review";
        shortlisted: "shortlisted";
        interview_scheduled: "interview_scheduled";
        offer_extended: "offer_extended";
        hired: "hired";
        rejected: "rejected";
        withdrawn: "withdrawn";
    }>>;
    coverLetterText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    mediaId: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodNullable<z.ZodString>>>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    referralCode: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    applicantProfile: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        fullName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        linkedin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        portfolio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
    adminAction: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        admin_only: "admin_only";
        access_company: "access_company";
    }>>>;
}, z.core.$strip>;
export type JobApplication = z.infer<typeof jobApplication>;
export type JobApplicationInsert = z.infer<typeof jobApplicationInsertSchema>;
export type JobApplicationUpdate = z.infer<typeof jobApplicationUpdateSchema>;
export type JobApplicationAdminUpdate = z.infer<typeof jobApplicationAdminUpdateSchema>;
