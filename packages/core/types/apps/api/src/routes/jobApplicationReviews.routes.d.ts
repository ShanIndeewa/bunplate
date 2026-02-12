import { z } from "zod";
export declare const list: {
    tags: string[];
    summary: string;
    path: "/";
    method: "get";
    request: {
        query: z.ZodObject<{
            page: z.ZodOptional<z.ZodString>;
            limit: z.ZodOptional<z.ZodString>;
            sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
                asc: "asc";
                desc: "desc";
            }>>>;
            search: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        data: z.ZodType<{
                            id: string;
                            applicationId: string;
                            reviewerId: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            comments?: string | null | undefined;
                            rating?: number | null | undefined;
                            attachments?: any;
                            interviewAt?: Date | null | undefined;
                            interviewLocation?: string | null | undefined;
                            meetingLink?: string | null | undefined;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            applicationId: string;
                            reviewerId: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            comments?: string | null | undefined;
                            rating?: number | null | undefined;
                            attachments?: any;
                            interviewAt?: Date | null | undefined;
                            interviewLocation?: string | null | undefined;
                            meetingLink?: string | null | undefined;
                        }[], unknown>>;
                        meta: z.ZodObject<{
                            currentPage: z.ZodNumber;
                            limit: z.ZodNumber;
                            totalCount: z.ZodNumber;
                            totalPages: z.ZodNumber;
                        }, z.core.$strip>;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
        401: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/";
};
export declare const getById: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/:id";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
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
                };
            };
            description: string;
        };
        401: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
        404: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/:id";
};
export declare const create: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/";
    request: {
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
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
                };
            };
            description: string;
        };
    };
    responses: {
        201: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
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
                };
            };
            description: string;
        };
        401: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/";
};
export declare const update: {
    tags: string[];
    summary: string;
    method: "patch";
    path: "/:id";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
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
                };
            };
            description: string;
        };
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
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
                };
            };
            description: string;
        };
        404: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
        401: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/:id";
};
export declare const remove: {
    tags: string[];
    summary: string;
    method: "delete";
    path: "/:id";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        204: {
            description: string;
        };
        401: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
        404: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/:id";
};
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
