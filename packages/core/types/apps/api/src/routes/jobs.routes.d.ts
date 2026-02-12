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
                            companyId: string;
                            jobCategoryId: string | null;
                            title: string;
                            description: string;
                            location: string | null;
                            type: "full_time" | "part_time" | "contract" | "internship";
                            salaryMin: string | null;
                            salaryMax: string | null;
                            experienceRequired: string | null;
                            skills: any;
                            numberOfVacancies: number;
                            status: "open" | "closed" | "paused";
                            isRemote: boolean;
                            postedAt: Date;
                            closingDate: Date | null;
                            createdAt: Date | null;
                            updatedAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            companyId: string;
                            jobCategoryId: string | null;
                            title: string;
                            description: string;
                            location: string | null;
                            type: "full_time" | "part_time" | "contract" | "internship";
                            salaryMin: string | null;
                            salaryMax: string | null;
                            experienceRequired: string | null;
                            skills: any;
                            numberOfVacancies: number;
                            status: "open" | "closed" | "paused";
                            isRemote: boolean;
                            postedAt: Date;
                            closingDate: Date | null;
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
export declare const getByCompanyId: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/company/:companyId";
    request: {
        params: z.ZodObject<{
            companyId: z.ZodString;
        }, z.core.$strip>;
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
                            companyId: string;
                            jobCategoryId: string | null;
                            title: string;
                            description: string;
                            location: string | null;
                            type: "full_time" | "part_time" | "contract" | "internship";
                            salaryMin: string | null;
                            salaryMax: string | null;
                            experienceRequired: string | null;
                            skills: any;
                            numberOfVacancies: number;
                            status: "open" | "closed" | "paused";
                            isRemote: boolean;
                            postedAt: Date;
                            closingDate: Date | null;
                            createdAt: Date | null;
                            updatedAt: Date | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            companyId: string;
                            jobCategoryId: string | null;
                            title: string;
                            description: string;
                            location: string | null;
                            type: "full_time" | "part_time" | "contract" | "internship";
                            salaryMin: string | null;
                            salaryMax: string | null;
                            experienceRequired: string | null;
                            skills: any;
                            numberOfVacancies: number;
                            status: "open" | "closed" | "paused";
                            isRemote: boolean;
                            postedAt: Date;
                            closingDate: Date | null;
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
    getRoutingPath(): "/company/:companyId";
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
                        companyId: z.ZodString;
                        jobCategoryId: z.ZodNullable<z.ZodString>;
                        title: z.ZodString;
                        description: z.ZodString;
                        location: z.ZodNullable<z.ZodString>;
                        type: z.ZodEnum<{
                            full_time: "full_time";
                            part_time: "part_time";
                            contract: "contract";
                            internship: "internship";
                        }>;
                        salaryMin: z.ZodNullable<z.ZodString>;
                        salaryMax: z.ZodNullable<z.ZodString>;
                        experienceRequired: z.ZodNullable<z.ZodString>;
                        skills: z.ZodNullable<z.ZodAny>;
                        numberOfVacancies: z.ZodNumber;
                        status: z.ZodEnum<{
                            open: "open";
                            closed: "closed";
                            paused: "paused";
                        }>;
                        isRemote: z.ZodBoolean;
                        postedAt: z.ZodCoercedDate<unknown>;
                        closingDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        status: z.ZodEnum<{
                            open: "open";
                            closed: "closed";
                            paused: "paused";
                        }>;
                        title: z.ZodString;
                        description: z.ZodString;
                        type: z.ZodEnum<{
                            full_time: "full_time";
                            part_time: "part_time";
                            contract: "contract";
                            internship: "internship";
                        }>;
                        jobCategoryId: z.ZodNullable<z.ZodString>;
                        location: z.ZodNullable<z.ZodString>;
                        experienceRequired: z.ZodNullable<z.ZodString>;
                        skills: z.ZodNullable<z.ZodAny>;
                        isRemote: z.ZodBoolean;
                        salaryMin: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        salaryMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        numberOfVacancies: z.ZodDefault<z.ZodNumber>;
                        closingDate: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
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
                        companyId: z.ZodString;
                        jobCategoryId: z.ZodNullable<z.ZodString>;
                        title: z.ZodString;
                        description: z.ZodString;
                        location: z.ZodNullable<z.ZodString>;
                        type: z.ZodEnum<{
                            full_time: "full_time";
                            part_time: "part_time";
                            contract: "contract";
                            internship: "internship";
                        }>;
                        salaryMin: z.ZodNullable<z.ZodString>;
                        salaryMax: z.ZodNullable<z.ZodString>;
                        experienceRequired: z.ZodNullable<z.ZodString>;
                        skills: z.ZodNullable<z.ZodAny>;
                        numberOfVacancies: z.ZodNumber;
                        status: z.ZodEnum<{
                            open: "open";
                            closed: "closed";
                            paused: "paused";
                        }>;
                        isRemote: z.ZodBoolean;
                        postedAt: z.ZodCoercedDate<unknown>;
                        closingDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
                        status: z.ZodOptional<z.ZodEnum<{
                            open: "open";
                            closed: "closed";
                            paused: "paused";
                        }>>;
                        title: z.ZodOptional<z.ZodString>;
                        description: z.ZodOptional<z.ZodString>;
                        type: z.ZodOptional<z.ZodEnum<{
                            full_time: "full_time";
                            part_time: "part_time";
                            contract: "contract";
                            internship: "internship";
                        }>>;
                        jobCategoryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        salaryMin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        salaryMax: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        experienceRequired: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        skills: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
                        numberOfVacancies: z.ZodOptional<z.ZodNumber>;
                        isRemote: z.ZodOptional<z.ZodBoolean>;
                        closingDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
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
                        jobCategoryId: z.ZodNullable<z.ZodString>;
                        title: z.ZodString;
                        description: z.ZodString;
                        location: z.ZodNullable<z.ZodString>;
                        type: z.ZodEnum<{
                            full_time: "full_time";
                            part_time: "part_time";
                            contract: "contract";
                            internship: "internship";
                        }>;
                        salaryMin: z.ZodNullable<z.ZodString>;
                        salaryMax: z.ZodNullable<z.ZodString>;
                        experienceRequired: z.ZodNullable<z.ZodString>;
                        skills: z.ZodNullable<z.ZodAny>;
                        numberOfVacancies: z.ZodNumber;
                        status: z.ZodEnum<{
                            open: "open";
                            closed: "closed";
                            paused: "paused";
                        }>;
                        isRemote: z.ZodBoolean;
                        postedAt: z.ZodCoercedDate<unknown>;
                        closingDate: z.ZodNullable<z.ZodCoercedDate<unknown>>;
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
    };
} & {
    getRoutingPath(): "/:id";
};
export type ListRoute = typeof list;
export type GetByCompanyIdRoute = typeof getByCompanyId;
export type GetByIdRoute = typeof getById;
export type CreateRoute = typeof create;
export type UpdateRoute = typeof update;
export type RemoveRoute = typeof remove;
