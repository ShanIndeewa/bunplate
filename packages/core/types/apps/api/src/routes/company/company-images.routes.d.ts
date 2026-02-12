import { z } from "zod";
export declare const getCompanyImagesRoute: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/:id/images";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        companyId: z.ZodString;
                        imageUrl: z.ZodString;
                        altText: z.ZodNullable<z.ZodString>;
                        displayOrder: z.ZodNullable<z.ZodNumber>;
                        isThumbnail: z.ZodNullable<z.ZodBoolean>;
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
    getRoutingPath(): "/:id/images";
};
export declare const addNewCompanyImagesRoute: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/images";
    request: {
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        imageUrl: z.ZodString;
                        companyId: z.ZodString;
                        altText: z.ZodNullable<z.ZodString>;
                        displayOrder: z.ZodNullable<z.ZodNumber>;
                        isThumbnail: z.ZodNullable<z.ZodBoolean>;
                    }, z.core.$strip>>;
                };
            };
            description: string;
        };
    };
    responses: {
        201: {
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        imageUrl: z.ZodString;
                        companyId: z.ZodString;
                        altText: z.ZodNullable<z.ZodString>;
                        displayOrder: z.ZodNullable<z.ZodNumber>;
                        isThumbnail: z.ZodNullable<z.ZodBoolean>;
                    }, z.core.$strip>>;
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
    getRoutingPath(): "/images";
};
export declare const updateCompanyImageRoute: {
    tags: string[];
    summary: string;
    method: "put";
    path: "/images/:id";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        imageUrl: z.ZodOptional<z.ZodString>;
                        companyId: z.ZodOptional<z.ZodString>;
                        altText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        displayOrder: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        isThumbnail: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
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
                        companyId: z.ZodString;
                        imageUrl: z.ZodString;
                        altText: z.ZodNullable<z.ZodString>;
                        displayOrder: z.ZodNullable<z.ZodNumber>;
                        isThumbnail: z.ZodNullable<z.ZodBoolean>;
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
    getRoutingPath(): "/images/:id";
};
export declare const removeCompanyImageRoute: {
    tags: string[];
    summary: string;
    method: "delete";
    path: "/images/:id";
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
    getRoutingPath(): "/images/:id";
};
export type AddNewCompanyImagesRoute = typeof addNewCompanyImagesRoute;
export type GetCompanyImagesRoute = typeof getCompanyImagesRoute;
export type UpdateCompanyImageRoute = typeof updateCompanyImageRoute;
export type RemoveCompanyImageRoute = typeof removeCompanyImageRoute;
