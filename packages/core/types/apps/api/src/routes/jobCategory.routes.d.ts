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
                            userId: string;
                            keyword: string;
                            description: string | null;
                            type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                            createdAt: Date | null;
                            updatedAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            userId: string;
                            keyword: string;
                            description: string | null;
                            type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                            createdAt: Date | null;
                            updatedAt: Date | null;
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
                            userId: string;
                            keyword: string;
                            description: string | null;
                            type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                            createdAt: Date | null;
                            updatedAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            userId: string;
                            keyword: string;
                            description: string | null;
                            type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
                            createdAt: Date | null;
                            updatedAt: Date | null;
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
    getRoutingPath(): "/all";
};
export declare const getTypes: {
    tags: string[];
    summary: string;
    path: "/types";
    method: "get";
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodString>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/types";
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
                        userId: z.ZodString;
                        keyword: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        type: z.ZodEnum<{
                            Technology: "Technology";
                            Design: "Design";
                            Marketing: "Marketing";
                            Healthcare: "Healthcare";
                            Education: "Education";
                            Finance: "Finance";
                            Hospitality: "Hospitality";
                            Transportation: "Transportation";
                            Retail: "Retail";
                            Engineering: "Engineering";
                        }>;
                        createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        description: z.ZodNullable<z.ZodString>;
                        keyword: z.ZodString;
                        type: z.ZodEnum<{
                            Technology: "Technology";
                            Design: "Design";
                            Marketing: "Marketing";
                            Healthcare: "Healthcare";
                            Education: "Education";
                            Finance: "Finance";
                            Hospitality: "Hospitality";
                            Transportation: "Transportation";
                            Retail: "Retail";
                            Engineering: "Engineering";
                        }>;
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
                        userId: z.ZodString;
                        keyword: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        type: z.ZodEnum<{
                            Technology: "Technology";
                            Design: "Design";
                            Marketing: "Marketing";
                            Healthcare: "Healthcare";
                            Education: "Education";
                            Finance: "Finance";
                            Hospitality: "Hospitality";
                            Transportation: "Transportation";
                            Retail: "Retail";
                            Engineering: "Engineering";
                        }>;
                        createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        keyword: z.ZodOptional<z.ZodString>;
                        type: z.ZodOptional<z.ZodEnum<{
                            Technology: "Technology";
                            Design: "Design";
                            Marketing: "Marketing";
                            Healthcare: "Healthcare";
                            Education: "Education";
                            Finance: "Finance";
                            Hospitality: "Hospitality";
                            Transportation: "Transportation";
                            Retail: "Retail";
                            Engineering: "Engineering";
                        }>>;
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
                        userId: z.ZodString;
                        keyword: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        type: z.ZodEnum<{
                            Technology: "Technology";
                            Design: "Design";
                            Marketing: "Marketing";
                            Healthcare: "Healthcare";
                            Education: "Education";
                            Finance: "Finance";
                            Hospitality: "Hospitality";
                            Transportation: "Transportation";
                            Retail: "Retail";
                            Engineering: "Engineering";
                        }>;
                        createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
export type ListAllRoute = typeof listAll;
export type GetTypesRoute = typeof getTypes;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
