import { z } from "zod";
export declare const jobApplicationReviewSchema: z.ZodObject<{
    id: z.ZodString;
    applicationId: z.ZodString;
    reviewerId: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
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
    comments: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    attachments: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    interviewAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    interviewLocation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meetingLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const jobApplicationReviewInsertSchema: z.ZodObject<{
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
    applicationId: z.ZodString;
    rating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    comments: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    attachments: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    interviewAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    interviewLocation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meetingLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const jobApplicationReviewUpdateSchema: z.ZodObject<{
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
    applicationId: z.ZodOptional<z.ZodString>;
    rating: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    comments: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    attachments: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodAny>>>;
    interviewAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>>;
    interviewLocation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    meetingLink: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strip>;
export type JobApplicationReview = z.infer<typeof jobApplicationReviewSchema>;
export type JobApplicationReviewInsert = z.infer<typeof jobApplicationReviewInsertSchema>;
export type JobApplicationReviewUpdate = z.infer<typeof jobApplicationReviewUpdateSchema>;
