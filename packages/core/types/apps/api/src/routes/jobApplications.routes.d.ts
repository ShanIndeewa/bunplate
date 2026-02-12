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
                            organizationId: string | null;
                            userId: string;
                            jobId: string;
                            roundNo: number;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            adminAction: "admin_only" | "access_company";
                            mediaId: string | null;
                            coverLetterText: string | null;
                            source: string | null;
                            referralCode: string | null;
                            tags: any;
                            submittedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            applicantProfile?: {
                                [x: string]: unknown;
                                fullName?: string | undefined;
                                email?: string | undefined;
                                phone?: string | undefined;
                                address?: string | undefined;
                                linkedin?: string | null | undefined;
                                portfolio?: string | null | undefined;
                            } | null | undefined;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            organizationId: string | null;
                            userId: string;
                            jobId: string;
                            roundNo: number;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            adminAction: "admin_only" | "access_company";
                            mediaId: string | null;
                            coverLetterText: string | null;
                            source: string | null;
                            referralCode: string | null;
                            tags: any;
                            submittedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            applicantProfile?: {
                                [x: string]: unknown;
                                fullName?: string | undefined;
                                email?: string | undefined;
                                phone?: string | undefined;
                                address?: string | undefined;
                                linkedin?: string | null | undefined;
                                portfolio?: string | null | undefined;
                            } | null | undefined;
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
        500: {
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
export declare const listAll: {
    tags: string[];
    summary: string;
    path: "/all";
    method: "get";
    request: {
        query: z.ZodObject<{
            page: z.ZodOptional<z.ZodString>;
            limit: z.ZodOptional<z.ZodString>;
            sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
                asc: "asc";
                desc: "desc";
            }>>>;
            status: z.ZodOptional<z.ZodString>;
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
                            organizationId: string | null;
                            userId: string;
                            jobId: string;
                            roundNo: number;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            adminAction: "admin_only" | "access_company";
                            mediaId: string | null;
                            coverLetterText: string | null;
                            source: string | null;
                            referralCode: string | null;
                            tags: any;
                            submittedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            applicantProfile?: {
                                [x: string]: unknown;
                                fullName?: string | undefined;
                                email?: string | undefined;
                                phone?: string | undefined;
                                address?: string | undefined;
                                linkedin?: string | null | undefined;
                                portfolio?: string | null | undefined;
                            } | null | undefined;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            organizationId: string | null;
                            userId: string;
                            jobId: string;
                            roundNo: number;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            adminAction: "admin_only" | "access_company";
                            mediaId: string | null;
                            coverLetterText: string | null;
                            source: string | null;
                            referralCode: string | null;
                            tags: any;
                            submittedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            applicantProfile?: {
                                [x: string]: unknown;
                                fullName?: string | undefined;
                                email?: string | undefined;
                                phone?: string | undefined;
                                address?: string | undefined;
                                linkedin?: string | null | undefined;
                                portfolio?: string | null | undefined;
                            } | null | undefined;
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
        403: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
        500: {
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
    getRoutingPath(): "/all";
};
export declare const listCompany: {
    tags: string[];
    summary: string;
    path: "/company";
    method: "get";
    request: {
        query: z.ZodObject<{
            page: z.ZodOptional<z.ZodString>;
            limit: z.ZodOptional<z.ZodString>;
            sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
                asc: "asc";
                desc: "desc";
            }>>>;
            status: z.ZodOptional<z.ZodString>;
            search: z.ZodOptional<z.ZodString>;
            jobId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        data: z.ZodType<{
                            id: string;
                            organizationId: string | null;
                            userId: string;
                            jobId: string;
                            roundNo: number;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            adminAction: "admin_only" | "access_company";
                            mediaId: string | null;
                            coverLetterText: string | null;
                            source: string | null;
                            referralCode: string | null;
                            tags: any;
                            submittedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            applicantProfile?: {
                                [x: string]: unknown;
                                fullName?: string | undefined;
                                email?: string | undefined;
                                phone?: string | undefined;
                                address?: string | undefined;
                                linkedin?: string | null | undefined;
                                portfolio?: string | null | undefined;
                            } | null | undefined;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            organizationId: string | null;
                            userId: string;
                            jobId: string;
                            roundNo: number;
                            status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                            adminAction: "admin_only" | "access_company";
                            mediaId: string | null;
                            coverLetterText: string | null;
                            source: string | null;
                            referralCode: string | null;
                            tags: any;
                            submittedAt: Date | null;
                            createdAt: Date;
                            updatedAt: Date;
                            applicantProfile?: {
                                [x: string]: unknown;
                                fullName?: string | undefined;
                                email?: string | undefined;
                                phone?: string | undefined;
                                address?: string | undefined;
                                linkedin?: string | null | undefined;
                                portfolio?: string | null | undefined;
                            } | null | undefined;
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
        403: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
        500: {
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
    getRoutingPath(): "/company";
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
export declare const checkApplication: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/check/:jobId";
    request: {
        params: z.ZodObject<{
            jobId: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        hasApplied: z.ZodBoolean;
                        application: z.ZodOptional<z.ZodObject<{
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
                        }, z.core.$strip>>;
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
    getRoutingPath(): "/check/:jobId";
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
        409: {
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
export declare const adminUpdate: {
    tags: string[];
    summary: string;
    method: "patch";
    path: "/:id/admin";
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
        403: {
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
    getRoutingPath(): "/:id/admin";
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
export declare const adminRemove: {
    tags: string[];
    summary: string;
    method: "delete";
    path: "/:id/admin";
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
        403: {
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
    getRoutingPath(): "/:id/admin";
};
export type ListRoute = typeof list;
export type ListAllRoute = typeof listAll;
export type ListCompanyRoute = typeof listCompany;
export type GetByIdRoute = typeof getById;
export type CheckApplicationRoute = typeof checkApplication;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type AdminUpdateRoute = typeof adminUpdate;
export type RemoveRoute = typeof remove;
export type AdminRemoveRoute = typeof adminRemove;
