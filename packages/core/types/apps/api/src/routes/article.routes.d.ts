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
                            title: string;
                            content: string | null;
                            slug: string | null;
                            excerpt: string | null;
                            featuredImage: string | null;
                            userId: string;
                            organizationId: string | null;
                            createdAt: string;
                            updatedAt: string | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            title: string;
                            content: string | null;
                            slug: string | null;
                            excerpt: string | null;
                            featuredImage: string | null;
                            userId: string;
                            organizationId: string | null;
                            createdAt: string;
                            updatedAt: string | null;
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
                        title: z.ZodString;
                        content: z.ZodNullable<z.ZodString>;
                        slug: z.ZodNullable<z.ZodString>;
                        excerpt: z.ZodNullable<z.ZodString>;
                        featuredImage: z.ZodNullable<z.ZodString>;
                        userId: z.ZodString;
                        organizationId: z.ZodNullable<z.ZodString>;
                        createdAt: z.ZodString;
                        updatedAt: z.ZodNullable<z.ZodString>;
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
                        slug: z.ZodNullable<z.ZodString>;
                        title: z.ZodString;
                        excerpt: z.ZodNullable<z.ZodString>;
                        content: z.ZodNullable<z.ZodString>;
                        featuredImage: z.ZodNullable<z.ZodString>;
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
                        title: z.ZodString;
                        content: z.ZodNullable<z.ZodString>;
                        slug: z.ZodNullable<z.ZodString>;
                        excerpt: z.ZodNullable<z.ZodString>;
                        featuredImage: z.ZodNullable<z.ZodString>;
                        userId: z.ZodString;
                        organizationId: z.ZodNullable<z.ZodString>;
                        createdAt: z.ZodString;
                        updatedAt: z.ZodNullable<z.ZodString>;
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
                        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        title: z.ZodOptional<z.ZodString>;
                        excerpt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        featuredImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                        title: z.ZodString;
                        content: z.ZodNullable<z.ZodString>;
                        slug: z.ZodNullable<z.ZodString>;
                        excerpt: z.ZodNullable<z.ZodString>;
                        featuredImage: z.ZodNullable<z.ZodString>;
                        userId: z.ZodString;
                        organizationId: z.ZodNullable<z.ZodString>;
                        createdAt: z.ZodString;
                        updatedAt: z.ZodNullable<z.ZodString>;
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
    method: "delete";
    path: "/:id";
    tags: string[];
    summary: string;
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
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
