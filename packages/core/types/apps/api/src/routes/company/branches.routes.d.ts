import { z } from "zod";
export declare const getCompanyBranchesRoute: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/:id/branches";
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
                        branchName: z.ZodString;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        email: z.ZodNullable<z.ZodString>;
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
    getRoutingPath(): "/:id/branches";
};
export declare const upsertBranchesToCompanyRoute: {
    tags: string[];
    summary: string;
    path: "/:id/branches";
    method: "post";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        email: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        companyId: z.ZodString;
                        branchName: z.ZodString;
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
                        email: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        companyId: z.ZodString;
                        branchName: z.ZodString;
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
    getRoutingPath(): "/:id/branches";
};
export type GetCompanyBranchesRoute = typeof getCompanyBranchesRoute;
export type UpsertBranchesToCompanyRoute = typeof upsertBranchesToCompanyRoute;
