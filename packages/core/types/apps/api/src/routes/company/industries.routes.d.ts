import { z } from "zod";
export declare const getIndustriesRoute: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/industries";
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        slug: z.ZodNullable<z.ZodString>;
                        thumbnail: z.ZodNullable<z.ZodString>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
                    }, z.core.$strip>>;
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
    getRoutingPath(): "/industries";
};
export declare const addNewIndustryRoute: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/industries";
    request: {
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        name: z.ZodString;
                        thumbnail: z.ZodNullable<z.ZodString>;
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
                        name: z.ZodString;
                        slug: z.ZodNullable<z.ZodString>;
                        thumbnail: z.ZodNullable<z.ZodString>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
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
        403: {
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
    getRoutingPath(): "/industries";
};
export declare const updateIndustryRoute: {
    tags: string[];
    summary: string;
    method: "put";
    path: "/industries/:id";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        name: z.ZodOptional<z.ZodString>;
                        thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                        name: z.ZodString;
                        slug: z.ZodNullable<z.ZodString>;
                        thumbnail: z.ZodNullable<z.ZodString>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
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
        403: {
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
    getRoutingPath(): "/industries/:id";
};
export declare const removeIndustryRoute: {
    tags: string[];
    summary: string;
    method: "delete";
    path: "/industries/:id";
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
        403: {
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
    getRoutingPath(): "/industries/:id";
};
export type GetIndustriesRoute = typeof getIndustriesRoute;
export type AddNewIndustryRoute = typeof addNewIndustryRoute;
export type UpdateIndustryRoute = typeof updateIndustryRoute;
export type RemoveIndustryRoute = typeof removeIndustryRoute;
