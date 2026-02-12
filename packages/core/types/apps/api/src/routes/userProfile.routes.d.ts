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
                            organizationId: string | null;
                            userId: string;
                            firstName: string;
                            lastName: string | null;
                            currentPosition: string | null;
                            DOB: string | null;
                            currentWorkplace: string | null;
                            description: string | null;
                            additionalInfo: string | null;
                            tagline: string | null;
                            headline: string | null;
                            about: string | null;
                            location: string | null;
                            profilePhotoUrl: string | null;
                            bannerPhotoUrl: string | null;
                            website: string | null;
                            linkedinUrl: string | null;
                            githubUrl: string | null;
                            portfolioUrl: string | null;
                            updatedAt: Date | null;
                            createdAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            organizationId: string | null;
                            userId: string;
                            firstName: string;
                            lastName: string | null;
                            currentPosition: string | null;
                            DOB: string | null;
                            currentWorkplace: string | null;
                            description: string | null;
                            additionalInfo: string | null;
                            tagline: string | null;
                            headline: string | null;
                            about: string | null;
                            location: string | null;
                            profilePhotoUrl: string | null;
                            bannerPhotoUrl: string | null;
                            website: string | null;
                            linkedinUrl: string | null;
                            githubUrl: string | null;
                            portfolioUrl: string | null;
                            updatedAt: Date | null;
                            createdAt: Date | null;
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
                        organizationId: z.ZodNullable<z.ZodString>;
                        userId: z.ZodString;
                        firstName: z.ZodString;
                        lastName: z.ZodNullable<z.ZodString>;
                        currentPosition: z.ZodNullable<z.ZodString>;
                        DOB: z.ZodNullable<z.ZodString>;
                        currentWorkplace: z.ZodNullable<z.ZodString>;
                        description: z.ZodNullable<z.ZodString>;
                        additionalInfo: z.ZodNullable<z.ZodString>;
                        tagline: z.ZodNullable<z.ZodString>;
                        headline: z.ZodNullable<z.ZodString>;
                        about: z.ZodNullable<z.ZodString>;
                        location: z.ZodNullable<z.ZodString>;
                        profilePhotoUrl: z.ZodNullable<z.ZodString>;
                        bannerPhotoUrl: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        linkedinUrl: z.ZodNullable<z.ZodString>;
                        githubUrl: z.ZodNullable<z.ZodString>;
                        portfolioUrl: z.ZodNullable<z.ZodString>;
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        website: z.ZodNullable<z.ZodString>;
                        location: z.ZodNullable<z.ZodString>;
                        firstName: z.ZodString;
                        lastName: z.ZodNullable<z.ZodString>;
                        currentPosition: z.ZodNullable<z.ZodString>;
                        DOB: z.ZodNullable<z.ZodString>;
                        currentWorkplace: z.ZodNullable<z.ZodString>;
                        additionalInfo: z.ZodNullable<z.ZodString>;
                        tagline: z.ZodNullable<z.ZodString>;
                        headline: z.ZodNullable<z.ZodString>;
                        about: z.ZodNullable<z.ZodString>;
                        profilePhotoUrl: z.ZodNullable<z.ZodString>;
                        bannerPhotoUrl: z.ZodNullable<z.ZodString>;
                        linkedinUrl: z.ZodNullable<z.ZodString>;
                        githubUrl: z.ZodNullable<z.ZodString>;
                        portfolioUrl: z.ZodNullable<z.ZodString>;
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
                        organizationId: z.ZodNullable<z.ZodString>;
                        userId: z.ZodString;
                        firstName: z.ZodString;
                        lastName: z.ZodNullable<z.ZodString>;
                        currentPosition: z.ZodNullable<z.ZodString>;
                        DOB: z.ZodNullable<z.ZodString>;
                        currentWorkplace: z.ZodNullable<z.ZodString>;
                        description: z.ZodNullable<z.ZodString>;
                        additionalInfo: z.ZodNullable<z.ZodString>;
                        tagline: z.ZodNullable<z.ZodString>;
                        headline: z.ZodNullable<z.ZodString>;
                        about: z.ZodNullable<z.ZodString>;
                        location: z.ZodNullable<z.ZodString>;
                        profilePhotoUrl: z.ZodNullable<z.ZodString>;
                        bannerPhotoUrl: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        linkedinUrl: z.ZodNullable<z.ZodString>;
                        githubUrl: z.ZodNullable<z.ZodString>;
                        portfolioUrl: z.ZodNullable<z.ZodString>;
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        firstName: z.ZodOptional<z.ZodString>;
                        lastName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        currentPosition: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        DOB: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        currentWorkplace: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        additionalInfo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        tagline: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        headline: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        about: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        profilePhotoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        bannerPhotoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        linkedinUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        githubUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        portfolioUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                        organizationId: z.ZodNullable<z.ZodString>;
                        userId: z.ZodString;
                        firstName: z.ZodString;
                        lastName: z.ZodNullable<z.ZodString>;
                        currentPosition: z.ZodNullable<z.ZodString>;
                        DOB: z.ZodNullable<z.ZodString>;
                        currentWorkplace: z.ZodNullable<z.ZodString>;
                        description: z.ZodNullable<z.ZodString>;
                        additionalInfo: z.ZodNullable<z.ZodString>;
                        tagline: z.ZodNullable<z.ZodString>;
                        headline: z.ZodNullable<z.ZodString>;
                        about: z.ZodNullable<z.ZodString>;
                        location: z.ZodNullable<z.ZodString>;
                        profilePhotoUrl: z.ZodNullable<z.ZodString>;
                        bannerPhotoUrl: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        linkedinUrl: z.ZodNullable<z.ZodString>;
                        githubUrl: z.ZodNullable<z.ZodString>;
                        portfolioUrl: z.ZodNullable<z.ZodString>;
                        updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
                        createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
