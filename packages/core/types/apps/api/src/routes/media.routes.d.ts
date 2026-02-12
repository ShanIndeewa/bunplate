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
                            url: string;
                            type: "image" | "video" | "audio" | "document";
                            filename: string;
                            size: number;
                            uploadedBy: string | null;
                            createdAt: Date | null;
                            updatedAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            url: string;
                            type: "image" | "video" | "audio" | "document";
                            filename: string;
                            size: number;
                            uploadedBy: string | null;
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
                        url: z.ZodString;
                        type: z.ZodEnum<{
                            image: "image";
                            video: "video";
                            audio: "audio";
                            document: "document";
                        }>;
                        filename: z.ZodString;
                        size: z.ZodNumber;
                        uploadedBy: z.ZodNullable<z.ZodString>;
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
                        type: z.ZodEnum<{
                            image: "image";
                            video: "video";
                            audio: "audio";
                            document: "document";
                        }>;
                        url: z.ZodString;
                        filename: z.ZodString;
                        size: z.ZodNumber;
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
                        url: z.ZodString;
                        type: z.ZodEnum<{
                            image: "image";
                            video: "video";
                            audio: "audio";
                            document: "document";
                        }>;
                        filename: z.ZodString;
                        size: z.ZodNumber;
                        uploadedBy: z.ZodNullable<z.ZodString>;
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
                        url: z.ZodOptional<z.ZodString>;
                        filename: z.ZodOptional<z.ZodString>;
                        size: z.ZodOptional<z.ZodNumber>;
                        uploadedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                        url: z.ZodString;
                        type: z.ZodEnum<{
                            image: "image";
                            video: "video";
                            audio: "audio";
                            document: "document";
                        }>;
                        filename: z.ZodString;
                        size: z.ZodNumber;
                        uploadedBy: z.ZodNullable<z.ZodString>;
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
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
