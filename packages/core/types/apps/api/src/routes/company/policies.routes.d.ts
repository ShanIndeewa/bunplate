import { z } from "zod";
export declare const getCompanyPoliciesRoute: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/:id/policies";
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
                        policyType: z.ZodString;
                        policyText: z.ZodString;
                        effectiveDate: z.ZodString;
                        isActive: z.ZodBoolean;
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
    getRoutingPath(): "/:id/policies";
};
export declare const upsertPoliciesToCompanyRoute: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/:id/policies";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        isActive: z.ZodBoolean;
                        companyId: z.ZodString;
                        policyType: z.ZodString;
                        policyText: z.ZodString;
                        effectiveDate: z.ZodString;
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
                        id: z.ZodString;
                        companyId: z.ZodString;
                        policyType: z.ZodString;
                        policyText: z.ZodString;
                        effectiveDate: z.ZodString;
                        isActive: z.ZodBoolean;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
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
    getRoutingPath(): "/:id/policies";
};
export declare const addNewCompanyPoliciesRoute: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/policies";
    request: {
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodArray<z.ZodObject<{
                        isActive: z.ZodBoolean;
                        companyId: z.ZodString;
                        policyType: z.ZodString;
                        policyText: z.ZodString;
                        effectiveDate: z.ZodString;
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
                        id: z.ZodString;
                        companyId: z.ZodString;
                        policyType: z.ZodString;
                        policyText: z.ZodString;
                        effectiveDate: z.ZodString;
                        isActive: z.ZodBoolean;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
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
    getRoutingPath(): "/policies";
};
export declare const updateCompanyPolicyRoute: {
    tags: string[];
    summary: string;
    method: "put";
    path: "/policies/:id";
    request: {
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: {
            required: boolean;
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        isActive: z.ZodOptional<z.ZodBoolean>;
                        companyId: z.ZodOptional<z.ZodString>;
                        policyType: z.ZodOptional<z.ZodString>;
                        policyText: z.ZodOptional<z.ZodString>;
                        effectiveDate: z.ZodOptional<z.ZodString>;
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
                        policyType: z.ZodString;
                        policyText: z.ZodString;
                        effectiveDate: z.ZodString;
                        isActive: z.ZodBoolean;
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
    getRoutingPath(): "/policies/:id";
};
export declare const removeCompanyPolicyRoute: {
    tags: string[];
    summary: string;
    method: "delete";
    path: "/policies/:id";
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
    getRoutingPath(): "/policies/:id";
};
export type GetCompanyPoliciesRoute = typeof getCompanyPoliciesRoute;
export type UpsertPoliciesToCompanyRoute = typeof upsertPoliciesToCompanyRoute;
export type AddNewCompanyPoliciesRoute = typeof addNewCompanyPoliciesRoute;
export type UpdateCompanyPolicyRoute = typeof updateCompanyPolicyRoute;
export type RemoveCompanyPolicyRoute = typeof removeCompanyPolicyRoute;
