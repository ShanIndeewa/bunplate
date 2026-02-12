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
                    userId: string;
                    title: string;
                    description: string | null;
                    imageUrl: string | null;
                    category: string | null;
                    externalLink: string | null;
                    placement: string;
                    adSize: string;
                    isActive: boolean;
                    startDate: string | null;
                    endDate: string | null;
                    viewCount: number;
                    clickCount: number;
                    metadata: any;
                    createdAt: string;
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
                    metadata: any;
                    title: string;
                    description: string | null;
                    imageUrl: string | null;
                    category: string | null;
                    externalLink: string | null;
                    placement: string;
                    adSize: string;
                    isActive: boolean;
                    startDate: unknown;
                    endDate: unknown;
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
                    metadata: any;
                    title: string;
                    description: string | null;
                    imageUrl: string | null;
                    category: string | null;
                    externalLink: string | null;
                    placement: string;
                    adSize: string;
                    isActive: boolean;
                    startDate: unknown;
                    endDate: unknown;
                };
            };
            output: {
                id: string;
                userId: string;
                title: string;
                description: string | null;
                imageUrl: string | null;
                category: string | null;
                externalLink: string | null;
                placement: string;
                adSize: string;
                isActive: boolean;
                startDate: string | null;
                endDate: string | null;
                viewCount: number;
                clickCount: number;
                metadata: any;
                createdAt: string;
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
                userId: string;
                title: string;
                description: string | null;
                imageUrl: string | null;
                category: string | null;
                externalLink: string | null;
                placement: string;
                adSize: string;
                isActive: boolean;
                startDate: string | null;
                endDate: string | null;
                viewCount: number;
                clickCount: number;
                metadata: any;
                createdAt: string;
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
                    metadata?: any;
                    title?: string | undefined;
                    description?: string | null | undefined;
                    imageUrl?: string | null | undefined;
                    category?: string | null | undefined;
                    externalLink?: string | null | undefined;
                    placement?: string | undefined;
                    adSize?: string | undefined;
                    isActive?: boolean | undefined;
                    startDate?: unknown;
                    endDate?: unknown;
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
                    metadata?: any;
                    title?: string | undefined;
                    description?: string | null | undefined;
                    imageUrl?: string | null | undefined;
                    category?: string | null | undefined;
                    externalLink?: string | null | undefined;
                    placement?: string | undefined;
                    adSize?: string | undefined;
                    isActive?: boolean | undefined;
                    startDate?: unknown;
                    endDate?: unknown;
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
                    metadata?: any;
                    title?: string | undefined;
                    description?: string | null | undefined;
                    imageUrl?: string | null | undefined;
                    category?: string | null | undefined;
                    externalLink?: string | null | undefined;
                    placement?: string | undefined;
                    adSize?: string | undefined;
                    isActive?: boolean | undefined;
                    startDate?: unknown;
                    endDate?: unknown;
                };
            };
            output: {
                id: string;
                userId: string;
                title: string;
                description: string | null;
                imageUrl: string | null;
                category: string | null;
                externalLink: string | null;
                placement: string;
                adSize: string;
                isActive: boolean;
                startDate: string | null;
                endDate: string | null;
                viewCount: number;
                clickCount: number;
                metadata: any;
                createdAt: string;
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
