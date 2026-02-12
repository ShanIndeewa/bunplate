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
                    url: string;
                    type: "image" | "video" | "audio" | "document";
                    filename: string;
                    size: number;
                    uploadedBy: string | null;
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
                url: string;
                type: "image" | "video" | "audio" | "document";
                filename: string;
                size: number;
                uploadedBy: string | null;
                createdAt: string | null;
                updatedAt: string | null;
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
                    type: "image" | "video" | "audio" | "document";
                    url: string;
                    filename: string;
                    size: number;
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
                    type: "image" | "video" | "audio" | "document";
                    url: string;
                    filename: string;
                    size: number;
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
                    type: "image" | "video" | "audio" | "document";
                    url: string;
                    filename: string;
                    size: number;
                };
            };
            output: {
                id: string;
                url: string;
                type: "image" | "video" | "audio" | "document";
                filename: string;
                size: number;
                uploadedBy: string | null;
                createdAt: string | null;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 201;
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
                    url?: string | undefined;
                    filename?: string | undefined;
                    size?: number | undefined;
                    uploadedBy?: string | null | undefined;
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
                    url?: string | undefined;
                    filename?: string | undefined;
                    size?: number | undefined;
                    uploadedBy?: string | null | undefined;
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
                    url?: string | undefined;
                    filename?: string | undefined;
                    size?: number | undefined;
                    uploadedBy?: string | null | undefined;
                };
            };
            output: {
                id: string;
                url: string;
                type: "image" | "video" | "audio" | "document";
                filename: string;
                size: number;
                uploadedBy: string | null;
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
