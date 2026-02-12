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
                    keyword: string;
                    description: string | null;
                    type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
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
                    keyword: string;
                    description: string | null;
                    type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
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
    "/types": {
        $get: {
            input: {};
            output: string[];
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    description: string | null;
                    keyword: string;
                    type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
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
                    description: string | null;
                    keyword: string;
                    type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                };
            };
            output: {
                id: string;
                userId: string;
                keyword: string;
                description: string | null;
                type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                createdAt: string | null;
                updatedAt: string | null;
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
                keyword: string;
                description: string | null;
                type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                createdAt: string | null;
                updatedAt: string | null;
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
                    description?: string | null | undefined;
                    keyword?: string | undefined;
                    type?: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering" | undefined;
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
                    description?: string | null | undefined;
                    keyword?: string | undefined;
                    type?: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering" | undefined;
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
                    description?: string | null | undefined;
                    keyword?: string | undefined;
                    type?: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering" | undefined;
                };
            };
            output: {
                id: string;
                userId: string;
                keyword: string;
                description: string | null;
                type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
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
