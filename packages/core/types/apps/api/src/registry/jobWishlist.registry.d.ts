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
                    userId: string;
                    jobId: string;
                    organizationId: string | null;
                    jobStatus: "live" | "expired";
                    isApplied: boolean;
                    createdAt: string | null;
                    updatedAt: string | null;
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
                    updatedAt: unknown;
                    organizationId: string | null;
                    jobId: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    updatedAt: unknown;
                    organizationId: string | null;
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
                json: {
                    updatedAt: unknown;
                    organizationId: string | null;
                    jobId: string;
                };
            };
            output: {
                id: string;
                userId: string;
                jobId: string;
                organizationId: string | null;
                jobStatus: "live" | "expired";
                isApplied: boolean;
                createdAt: string | null;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 201;
        } | {
            input: {
                json: {
                    updatedAt: unknown;
                    organizationId: string | null;
                    jobId: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 400;
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
                userId: string;
                jobId: string;
                organizationId: string | null;
                jobStatus: "live" | "expired";
                isApplied: boolean;
                createdAt: string | null;
                updatedAt: string | null;
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
                isSaved: boolean;
                wishlistItem?: {
                    id: string;
                    jobId: string;
                    isApplied: boolean;
                    createdAt: string;
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
                    updatedAt?: unknown;
                    organizationId?: string | null | undefined;
                    jobStatus?: "live" | "expired" | undefined;
                    isApplied?: boolean | undefined;
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
                    updatedAt?: unknown;
                    organizationId?: string | null | undefined;
                    jobStatus?: "live" | "expired" | undefined;
                    isApplied?: boolean | undefined;
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
                    updatedAt?: unknown;
                    organizationId?: string | null | undefined;
                    jobStatus?: "live" | "expired" | undefined;
                    isApplied?: boolean | undefined;
                };
            };
            output: {
                id: string;
                userId: string;
                jobId: string;
                organizationId: string | null;
                jobStatus: "live" | "expired";
                isApplied: boolean;
                createdAt: string | null;
                updatedAt: string | null;
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
            status: 200;
        };
    };
}, "/">;
export default router;
