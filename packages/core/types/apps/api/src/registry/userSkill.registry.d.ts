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
                    organizationId: string | null;
                    userId: string;
                    skillName: string;
                    proficiency: string | null;
                    updatedAt: string | null;
                    createdAt: string | null;
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
                    skillName: string;
                    proficiency: string | null;
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
                    skillName: string;
                    proficiency: string | null;
                };
            };
            output: {
                id: string;
                organizationId: string | null;
                userId: string;
                skillName: string;
                proficiency: string | null;
                updatedAt: string | null;
                createdAt: string | null;
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
                userId: string;
                skillName: string;
                proficiency: string | null;
                updatedAt: string | null;
                createdAt: string | null;
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
                    skillName?: string | undefined;
                    proficiency?: string | null | undefined;
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
                    skillName?: string | undefined;
                    proficiency?: string | null | undefined;
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
                    skillName?: string | undefined;
                    proficiency?: string | null | undefined;
                };
            };
            output: {
                id: string;
                organizationId: string | null;
                userId: string;
                skillName: string;
                proficiency: string | null;
                updatedAt: string | null;
                createdAt: string | null;
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
