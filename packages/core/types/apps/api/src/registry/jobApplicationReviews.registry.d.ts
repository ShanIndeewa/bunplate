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
                    applicationId: string;
                    reviewerId: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                    comments?: string | null | undefined;
                    rating?: number | null | undefined;
                    attachments?: any;
                    interviewAt?: string | null | undefined;
                    interviewLocation?: string | null | undefined;
                    meetingLink?: string | null | undefined;
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
    "/": {
        $post: {
            input: {
                json: {
                    status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                    applicationId: string;
                    rating?: number | null | undefined;
                    comments?: string | null | undefined;
                    attachments?: any;
                    interviewAt?: unknown;
                    interviewLocation?: string | null | undefined;
                    meetingLink?: string | null | undefined;
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
                    status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                    applicationId: string;
                    rating?: number | null | undefined;
                    comments?: string | null | undefined;
                    attachments?: any;
                    interviewAt?: unknown;
                    interviewLocation?: string | null | undefined;
                    meetingLink?: string | null | undefined;
                };
            };
            output: {
                id: string;
                applicationId: string;
                reviewerId: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                comments?: string | null | undefined;
                rating?: number | null | undefined;
                attachments?: any;
                interviewAt?: string | null | undefined;
                interviewLocation?: string | null | undefined;
                meetingLink?: string | null | undefined;
            };
            outputFormat: "json";
            status: 201;
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
                applicationId: string;
                reviewerId: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                comments?: string | null | undefined;
                rating?: number | null | undefined;
                attachments?: any;
                interviewAt?: string | null | undefined;
                interviewLocation?: string | null | undefined;
                meetingLink?: string | null | undefined;
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
                    applicationId?: string | undefined;
                    rating?: number | null | undefined;
                    comments?: string | null | undefined;
                    attachments?: any;
                    interviewAt?: unknown;
                    interviewLocation?: string | null | undefined;
                    meetingLink?: string | null | undefined;
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
                    applicationId?: string | undefined;
                    rating?: number | null | undefined;
                    comments?: string | null | undefined;
                    attachments?: any;
                    interviewAt?: unknown;
                    interviewLocation?: string | null | undefined;
                    meetingLink?: string | null | undefined;
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
                    applicationId?: string | undefined;
                    rating?: number | null | undefined;
                    comments?: string | null | undefined;
                    attachments?: any;
                    interviewAt?: unknown;
                    interviewLocation?: string | null | undefined;
                    meetingLink?: string | null | undefined;
                };
            };
            output: {
                id: string;
                applicationId: string;
                reviewerId: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "submitted" | "under_review" | "shortlisted" | "interview_scheduled" | "offer_extended" | "hired" | "rejected" | "withdrawn";
                comments?: string | null | undefined;
                rating?: number | null | undefined;
                attachments?: any;
                interviewAt?: string | null | undefined;
                interviewLocation?: string | null | undefined;
                meetingLink?: string | null | undefined;
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
}, "/">;
export default router;
