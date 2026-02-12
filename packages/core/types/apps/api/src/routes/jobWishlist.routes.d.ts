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
                            jobId: string;
                            organizationId: string | null;
                            jobStatus: "live" | "expired";
                            isApplied: boolean;
                            createdAt: Date | null;
                            updatedAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            userId: string;
                            jobId: string;
                            organizationId: string | null;
                            jobStatus: "live" | "expired";
                            isApplied: boolean;
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
                        jobId: z.ZodString;
                        organizationId: z.ZodNullable<z.ZodString>;
                        jobStatus: z.ZodEnum<{
                            live: "live";
                            expired: "expired";
                        }>;
                        isApplied: z.ZodBoolean;
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
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        organizationId: z.ZodNullable<z.ZodString>;
                        jobId: z.ZodString;
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
                        jobId: z.ZodString;
                        organizationId: z.ZodNullable<z.ZodString>;
                        jobStatus: z.ZodEnum<{
                            live: "live";
                            expired: "expired";
                        }>;
                        isApplied: z.ZodBoolean;
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
        400: {
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
                        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
                        organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        jobStatus: z.ZodOptional<z.ZodEnum<{
                            live: "live";
                            expired: "expired";
                        }>>;
                        isApplied: z.ZodOptional<z.ZodBoolean>;
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
                        jobId: z.ZodString;
                        organizationId: z.ZodNullable<z.ZodString>;
                        jobStatus: z.ZodEnum<{
                            live: "live";
                            expired: "expired";
                        }>;
                        isApplied: z.ZodBoolean;
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
export declare const checkSaved: {
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
                        isSaved: z.ZodBoolean;
                        wishlistItem: z.ZodOptional<z.ZodObject<{
                            id: z.ZodString;
                            jobId: z.ZodString;
                            isApplied: z.ZodBoolean;
                            createdAt: z.ZodString;
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
        200: {
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
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type CheckSavedRoute = typeof checkSaved;
export type RemoveRoute = typeof remove;
