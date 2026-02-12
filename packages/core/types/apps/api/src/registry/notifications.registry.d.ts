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
                message: string;
            };
            outputFormat: "json";
            status: 422;
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
                    title: string;
                    message: string;
                    metadata: string | null;
                    notificationType: "pending" | "approved";
                    recipientType: string;
                    recipientId: string | null;
                    readAt: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                    metadata: string | null;
                    title: string;
                    message: string;
                    notificationType: "pending" | "approved";
                    recipientType: string;
                    readAt: unknown;
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
                    metadata: string | null;
                    title: string;
                    message: string;
                    notificationType: "pending" | "approved";
                    recipientType: string;
                    readAt: unknown;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                json: {
                    metadata: string | null;
                    title: string;
                    message: string;
                    notificationType: "pending" | "approved";
                    recipientType: string;
                    readAt: unknown;
                };
            };
            output: {
                id: string;
                organizationId: string | null;
                title: string;
                message: string;
                metadata: string | null;
                notificationType: "pending" | "approved";
                recipientType: string;
                recipientId: string | null;
                readAt: string | null;
                createdAt: string;
                updatedAt: string;
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
                organizationId: string | null;
                title: string;
                message: string;
                metadata: string | null;
                notificationType: "pending" | "approved";
                recipientType: string;
                recipientId: string | null;
                readAt: string | null;
                createdAt: string;
                updatedAt: string;
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
                    metadata?: string | null | undefined;
                    title?: string | undefined;
                    message?: string | undefined;
                    notificationType?: "pending" | "approved" | undefined;
                    recipientType?: string | undefined;
                    readAt?: unknown;
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
                    metadata?: string | null | undefined;
                    title?: string | undefined;
                    message?: string | undefined;
                    notificationType?: "pending" | "approved" | undefined;
                    recipientType?: string | undefined;
                    readAt?: unknown;
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
                    metadata?: string | null | undefined;
                    title?: string | undefined;
                    message?: string | undefined;
                    notificationType?: "pending" | "approved" | undefined;
                    recipientType?: string | undefined;
                    readAt?: unknown;
                };
            };
            output: {
                id: string;
                organizationId: string | null;
                title: string;
                message: string;
                metadata: string | null;
                notificationType: "pending" | "approved";
                recipientType: string;
                recipientId: string | null;
                readAt: string | null;
                createdAt: string;
                updatedAt: string;
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
