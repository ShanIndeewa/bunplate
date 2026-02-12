import { z } from "zod";
/**
 * List current user's ads
 */
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
                            title: string;
                            description: string | null;
                            imageUrl: string | null;
                            category: string | null;
                            externalLink: string | null;
                            placement: string;
                            adSize: string;
                            isActive: boolean;
                            startDate: Date | null;
                            endDate: Date | null;
                            viewCount: number;
                            clickCount: number;
                            metadata: any;
                            createdAt: Date;
                        }[], unknown, z.core.$ZodTypeInternals<{
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
                            startDate: Date | null;
                            endDate: Date | null;
                            viewCount: number;
                            clickCount: number;
                            metadata: any;
                            createdAt: Date;
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
/**
 * Get an ad by ID (owned by current user)
 */
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
                        title: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        imageUrl: z.ZodNullable<z.ZodString>;
                        category: z.ZodNullable<z.ZodString>;
                        externalLink: z.ZodNullable<z.ZodString>;
                        placement: z.ZodString;
                        adSize: z.ZodString;
                        isActive: z.ZodBoolean;
                        startDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        endDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        viewCount: z.ZodNumber;
                        clickCount: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodAny>;
                        createdAt: z.ZodCoercedDate<unknown>;
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
/**
 * Create an ad (owned by current user)
 */
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
                        metadata: z.ZodNullable<z.ZodAny>;
                        title: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        imageUrl: z.ZodNullable<z.ZodString>;
                        category: z.ZodNullable<z.ZodString>;
                        externalLink: z.ZodNullable<z.ZodString>;
                        placement: z.ZodString;
                        adSize: z.ZodString;
                        isActive: z.ZodBoolean;
                        startDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        endDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        title: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        imageUrl: z.ZodNullable<z.ZodString>;
                        category: z.ZodNullable<z.ZodString>;
                        externalLink: z.ZodNullable<z.ZodString>;
                        placement: z.ZodString;
                        adSize: z.ZodString;
                        isActive: z.ZodBoolean;
                        startDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        endDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        viewCount: z.ZodNumber;
                        clickCount: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodAny>;
                        createdAt: z.ZodCoercedDate<unknown>;
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
/**
 * Update an ad (owned by current user)
 */
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
                        metadata: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
                        title: z.ZodOptional<z.ZodString>;
                        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        externalLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        placement: z.ZodOptional<z.ZodString>;
                        adSize: z.ZodOptional<z.ZodString>;
                        isActive: z.ZodOptional<z.ZodBoolean>;
                        startDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
                        endDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
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
                        title: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        imageUrl: z.ZodNullable<z.ZodString>;
                        category: z.ZodNullable<z.ZodString>;
                        externalLink: z.ZodNullable<z.ZodString>;
                        placement: z.ZodString;
                        adSize: z.ZodString;
                        isActive: z.ZodBoolean;
                        startDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        endDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        viewCount: z.ZodNumber;
                        clickCount: z.ZodNumber;
                        metadata: z.ZodNullable<z.ZodAny>;
                        createdAt: z.ZodCoercedDate<unknown>;
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
/**
 * Delete an ad (owned by current user)
 */
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
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
