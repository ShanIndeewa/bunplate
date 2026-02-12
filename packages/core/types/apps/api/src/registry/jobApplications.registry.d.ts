declare const router: import("@hono/zod-openapi").OpenAPIHono<import("../types").APIBindings, {
    "/": {
        $get: {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                data: {
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
                    submittedAt: string | null;
                    createdAt: string;
                    updatedAt: string;
                    applicantProfile?: {
                        [x: string]: import("hono/utils/types").JSONValue;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | null | undefined;
                }[];
                meta: {
                    currentPage: number;
                    limit: number;
                    totalCount: number;
                    totalPages: number;
                };
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/all": {
        $get: {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                data: {
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
                    submittedAt: string | null;
                    createdAt: string;
                    updatedAt: string;
                    applicantProfile?: {
                        [x: string]: import("hono/utils/types").JSONValue;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | null | undefined;
                }[];
                meta: {
                    currentPage: number;
                    limit: number;
                    totalCount: number;
                    totalPages: number;
                };
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        };
    };
} & {
    "/company": {
        $get: {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                    jobId?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                    jobId?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                    jobId?: string | undefined;
                };
            };
            output: {
                data: {
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
                    submittedAt: string | null;
                    createdAt: string;
                    updatedAt: string;
                    applicantProfile?: {
                        [x: string]: import("hono/utils/types").JSONValue;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | null | undefined;
                }[];
                meta: {
                    currentPage: number;
                    limit: number;
                    totalCount: number;
                    totalPages: number;
                };
            };
            outputFormat: "json";
            status: 200;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    status?: string | undefined;
                    search?: string | undefined;
                    jobId?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    jobId: string;
                    coverLetterText: string | null;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    jobId: string;
                    coverLetterText: string | null;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                };
            };
            output: {
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
                submittedAt: string | null;
                createdAt: string;
                updatedAt: string;
                applicantProfile?: {
                    [x: string]: import("hono/utils/types").JSONValue;
                    fullName?: string | undefined;
                    email?: string | undefined;
                    phone?: string | undefined;
                    address?: string | undefined;
                    linkedin?: string | null | undefined;
                    portfolio?: string | null | undefined;
                } | null | undefined;
            };
            outputFormat: "json";
            status: 201;
        } | {
            input: {
                json: {
                    jobId: string;
                    coverLetterText: string | null;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 409;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
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
                submittedAt: string | null;
                createdAt: string;
                updatedAt: string;
                applicantProfile?: {
                    [x: string]: import("hono/utils/types").JSONValue;
                    fullName?: string | undefined;
                    email?: string | undefined;
                    phone?: string | undefined;
                    address?: string | undefined;
                    linkedin?: string | null | undefined;
                    portfolio?: string | null | undefined;
                } | null | undefined;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/check/:jobId": {
        $get: {
            input: {
                param: {
                    jobId: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    jobId: string;
                };
            };
            output: {
                hasApplied: boolean;
                application?: {
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
                    submittedAt: string | null;
                    createdAt: string;
                    updatedAt: string;
                    applicantProfile?: {
                        [x: string]: import("hono/utils/types").JSONValue;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | null | undefined;
                } | undefined;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id": {
        $patch: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                };
            };
            output: {
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
                submittedAt: string | null;
                createdAt: string;
                updatedAt: string;
                applicantProfile?: {
                    [x: string]: import("hono/utils/types").JSONValue;
                    fullName?: string | undefined;
                    email?: string | undefined;
                    phone?: string | undefined;
                    address?: string | undefined;
                    linkedin?: string | null | undefined;
                    portfolio?: string | null | undefined;
                } | null | undefined;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/admin": {
        $patch: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                    adminAction?: "admin_only" | "access_company" | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                    adminAction?: "admin_only" | "access_company" | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                    adminAction?: "admin_only" | "access_company" | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn" | undefined;
                    coverLetterText?: string | null | undefined;
                    mediaId?: unknown;
                    tags?: string[] | undefined;
                    source?: string | null | undefined;
                    referralCode?: string | null | undefined;
                    applicantProfile?: {
                        [x: string]: unknown;
                        fullName?: string | undefined;
                        email?: string | undefined;
                        phone?: string | undefined;
                        address?: string | undefined;
                        linkedin?: string | null | undefined;
                        portfolio?: string | null | undefined;
                    } | undefined;
                    adminAction?: "admin_only" | "access_company" | undefined;
                };
            };
            output: {
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
                submittedAt: string | null;
                createdAt: string;
                updatedAt: string;
                applicantProfile?: {
                    [x: string]: import("hono/utils/types").JSONValue;
                    fullName?: string | undefined;
                    email?: string | undefined;
                    phone?: string | undefined;
                    address?: string | undefined;
                    linkedin?: string | null | undefined;
                    portfolio?: string | null | undefined;
                } | null | undefined;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: 204;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        };
    };
} & {
    "/:id/admin": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: 204;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        };
    };
}, "/">;
export default router;
