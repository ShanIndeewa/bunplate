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
                            createdAt: Date;
                            updatedAt: Date;
                            status: "pending" | "sent" | "failed";
                            note: string;
                            phoneNumber: string;
                            whatsappNumber: string;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            userId: string;
                            createdAt: Date;
                            updatedAt: Date;
                            status: "pending" | "sent" | "failed";
                            note: string;
                            phoneNumber: string;
                            whatsappNumber: string;
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
        422: {
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
                        createdAt: z.ZodCoercedDate<unknown>;
                        updatedAt: z.ZodCoercedDate<unknown>;
                        status: z.ZodEnum<{
                            pending: "pending";
                            sent: "sent";
                            failed: "failed";
                        }>;
                        note: z.ZodString;
                        phoneNumber: z.ZodString;
                        whatsappNumber: z.ZodString;
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
                        note: z.ZodString;
                        phoneNumber: z.ZodString;
                        whatsappNumber: z.ZodString;
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
                        createdAt: z.ZodCoercedDate<unknown>;
                        updatedAt: z.ZodCoercedDate<unknown>;
                        status: z.ZodEnum<{
                            pending: "pending";
                            sent: "sent";
                            failed: "failed";
                        }>;
                        note: z.ZodString;
                        phoneNumber: z.ZodString;
                        whatsappNumber: z.ZodString;
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
                        note: z.ZodOptional<z.ZodString>;
                        phoneNumber: z.ZodOptional<z.ZodString>;
                        whatsappNumber: z.ZodOptional<z.ZodString>;
                        status: z.ZodOptional<z.ZodEnum<{
                            pending: "pending";
                            sent: "sent";
                            failed: "failed";
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
                        createdAt: z.ZodCoercedDate<unknown>;
                        updatedAt: z.ZodCoercedDate<unknown>;
                        status: z.ZodEnum<{
                            pending: "pending";
                            sent: "sent";
                            failed: "failed";
                        }>;
                        note: z.ZodString;
                        phoneNumber: z.ZodString;
                        whatsappNumber: z.ZodString;
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
export declare const bulkImport: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/bulk-import";
    request: {
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        records: z.ZodArray<z.ZodObject<{
                            note: z.ZodString;
                            phoneNumber: z.ZodString;
                            whatsappNumber: z.ZodString;
                        }, z.core.$strip>>;
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
                        message: z.ZodString;
                        count: z.ZodNumber;
                        records: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            userId: z.ZodString;
                            createdAt: z.ZodCoercedDate<unknown>;
                            updatedAt: z.ZodCoercedDate<unknown>;
                            status: z.ZodEnum<{
                                pending: "pending";
                                sent: "sent";
                                failed: "failed";
                            }>;
                            note: z.ZodString;
                            phoneNumber: z.ZodString;
                            whatsappNumber: z.ZodString;
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
        400: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        message: z.ZodString;
                        error: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/bulk-import";
};
export type ListRoute = typeof list;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
export type BulkImportRoute = typeof bulkImport;
