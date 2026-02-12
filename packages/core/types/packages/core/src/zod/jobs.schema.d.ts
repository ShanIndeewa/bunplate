import { z } from "zod";
export declare const jobsTypeSchema: z.ZodEnum<{
    full_time: "full_time";
    part_time: "part_time";
    contract: "contract";
    internship: "internship";
}>;
export declare const jobsStatusSchema: z.ZodEnum<{
    open: "open";
    closed: "closed";
    paused: "paused";
}>;
export declare const job: z.ZodObject<{
    id: z.ZodString;
    companyId: z.ZodString;
    jobCategoryId: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    location: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<{
        full_time: "full_time";
        part_time: "part_time";
        contract: "contract";
        internship: "internship";
    }>;
    salaryMin: z.ZodNullable<z.ZodString>;
    salaryMax: z.ZodNullable<z.ZodString>;
    experienceRequired: z.ZodNullable<z.ZodString>;
    skills: z.ZodNullable<z.ZodAny>;
    numberOfVacancies: z.ZodNumber;
    status: z.ZodEnum<{
        open: "open";
        closed: "closed";
        paused: "paused";
    }>;
    isRemote: z.ZodBoolean;
    postedAt: z.ZodCoercedDate<unknown>;
    closingDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const jobInsertSchema: z.ZodObject<{
    status: z.ZodEnum<{
        open: "open";
        closed: "closed";
        paused: "paused";
    }>;
    title: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<{
        full_time: "full_time";
        part_time: "part_time";
        contract: "contract";
        internship: "internship";
    }>;
    jobCategoryId: z.ZodNullable<z.ZodString>;
    location: z.ZodNullable<z.ZodString>;
    experienceRequired: z.ZodNullable<z.ZodString>;
    skills: z.ZodNullable<z.ZodAny>;
    isRemote: z.ZodBoolean;
    salaryMin: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    salaryMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    numberOfVacancies: z.ZodDefault<z.ZodNumber>;
    closingDate: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
}, z.core.$strip>;
export declare const jobUpdateSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        open: "open";
        closed: "closed";
        paused: "paused";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        full_time: "full_time";
        part_time: "part_time";
        contract: "contract";
        internship: "internship";
    }>>;
    jobCategoryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    salaryMin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    salaryMax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    experienceRequired: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    skills: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    numberOfVacancies: z.ZodOptional<z.ZodNumber>;
    isRemote: z.ZodOptional<z.ZodBoolean>;
    closingDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export type Job = z.infer<typeof job>;
export type JobInsertType = z.infer<typeof jobInsertSchema>;
export type JobUpdateType = z.infer<typeof jobUpdateSchema>;
