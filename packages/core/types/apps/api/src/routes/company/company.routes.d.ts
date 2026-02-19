import { z } from "zod";
export declare const tags: string[];
/**
 * ================================================================
 * Company Types Routes
 * ================================================================
 */
export declare const listAllCompanyTypesRoute: {
    tags: string[];
    summary: string;
    path: "/types";
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
    };
} & {
    getRoutingPath(): "/types";
};
export declare const getMyCompanyRoute: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/my-company";
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        id: z.ZodString;
                        organizationId: z.ZodString;
                        createdBy: z.ZodString;
                        name: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        brandName: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        email: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        logoUrl: z.ZodNullable<z.ZodString>;
                        industryId: z.ZodNullable<z.ZodString>;
                        employeeCount: z.ZodNullable<z.ZodNumber>;
                        status: z.ZodEnum<{
                            active: "active";
                            inactive: "inactive";
                            suspended: "suspended";
                            pending_approval: "pending_approval";
                        }>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
                        branches: z.ZodArray<z.ZodObject<{
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
                        images: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            imageUrl: z.ZodString;
                            altText: z.ZodNullable<z.ZodString>;
                            displayOrder: z.ZodNullable<z.ZodNumber>;
                            isThumbnail: z.ZodNullable<z.ZodBoolean>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        policies: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            policyType: z.ZodString;
                            policyText: z.ZodString;
                            effectiveDate: z.ZodString;
                            isActive: z.ZodBoolean;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        companyType: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        industry: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
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
    };
} & {
    getRoutingPath(): "/my-company";
};
export declare const createNewCompanyTypeRoute: {
    tags: string[];
    summary: string;
    method: "post";
    path: "/types";
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
    getRoutingPath(): "/types";
};
export declare const updateCompanyTypeRoute: {
    tags: string[];
    summary: string;
    method: "patch";
    path: "/types/:id";
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
    getRoutingPath(): "/types/:id";
};
export declare const removeCompanyTypeRoute: {
    tags: string[];
    summary: string;
    method: "delete";
    path: "/types/:id";
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
    };
} & {
    getRoutingPath(): "/types/:id";
};
/**
 * ================================================================
 * Companies Routes
 * ================================================================
 */
export declare const listAllCompaniesRoute: {
    tags: string[];
    summary: string;
    method: "get";
    path: "/";
    request: {
        query: z.ZodObject<{
            page: z.ZodOptional<z.ZodString>;
            limit: z.ZodOptional<z.ZodString>;
            sort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
                asc: "asc";
                desc: "desc";
            }>>>;
            search: z.ZodOptional<z.ZodString>;
            companyType: z.ZodOptional<z.ZodString>;
            industryId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    };
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: z.ZodObject<{
                        data: z.ZodType<{
                            id: string;
                            organizationId: string;
                            createdBy: string;
                            name: string;
                            description: string | null;
                            brandName: string | null;
                            street: string;
                            city: string;
                            state: string;
                            country: string;
                            postalCode: string;
                            phone: string | null;
                            email: string | null;
                            website: string | null;
                            logoUrl: string | null;
                            industryId: string | null;
                            employeeCount: number | null;
                            status: "active" | "inactive" | "suspended" | "pending_approval";
                            createdAt: Date;
                            updatedAt: Date | null;
                            branches: {
                                id: string;
                                companyId: string;
                                branchName: string;
                                street: string;
                                city: string;
                                state: string;
                                country: string;
                                postalCode: string;
                                phone: string | null;
                                email: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            }[];
                            images: {
                                id: string;
                                companyId: string;
                                imageUrl: string;
                                altText: string | null;
                                displayOrder: number | null;
                                isThumbnail: boolean | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            }[];
                            policies: {
                                id: string;
                                companyId: string;
                                policyType: string;
                                policyText: string;
                                effectiveDate: string;
                                isActive: boolean;
                                createdAt: Date;
                                updatedAt: Date | null;
                            }[];
                            companyType: {
                                id: string;
                                name: string;
                                slug: string | null;
                                thumbnail: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            } | null;
                            industry: {
                                id: string;
                                name: string;
                                slug: string | null;
                                thumbnail: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            } | null;
                        }[], unknown, z.core.$ZodTypeInternals<{
                            id: string;
                            organizationId: string;
                            createdBy: string;
                            name: string;
                            description: string | null;
                            brandName: string | null;
                            street: string;
                            city: string;
                            state: string;
                            country: string;
                            postalCode: string;
                            phone: string | null;
                            email: string | null;
                            website: string | null;
                            logoUrl: string | null;
                            industryId: string | null;
                            employeeCount: number | null;
                            status: "active" | "inactive" | "suspended" | "pending_approval";
                            createdAt: Date;
                            updatedAt: Date | null;
                            branches: {
                                id: string;
                                companyId: string;
                                branchName: string;
                                street: string;
                                city: string;
                                state: string;
                                country: string;
                                postalCode: string;
                                phone: string | null;
                                email: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            }[];
                            images: {
                                id: string;
                                companyId: string;
                                imageUrl: string;
                                altText: string | null;
                                displayOrder: number | null;
                                isThumbnail: boolean | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            }[];
                            policies: {
                                id: string;
                                companyId: string;
                                policyType: string;
                                policyText: string;
                                effectiveDate: string;
                                isActive: boolean;
                                createdAt: Date;
                                updatedAt: Date | null;
                            }[];
                            companyType: {
                                id: string;
                                name: string;
                                slug: string | null;
                                thumbnail: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            } | null;
                            industry: {
                                id: string;
                                name: string;
                                slug: string | null;
                                thumbnail: string | null;
                                createdAt: Date;
                                updatedAt: Date | null;
                            } | null;
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
export declare const createNewCompanyRoute: {
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
                        name: z.ZodString;
                        email: z.ZodNullable<z.ZodString>;
                        status: z.ZodEnum<{
                            active: "active";
                            inactive: "inactive";
                            suspended: "suspended";
                            pending_approval: "pending_approval";
                        }>;
                        description: z.ZodNullable<z.ZodString>;
                        brandName: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        logoUrl: z.ZodNullable<z.ZodString>;
                        companyType: z.ZodNullable<z.ZodString>;
                        industryId: z.ZodNullable<z.ZodString>;
                        employeeCount: z.ZodNullable<z.ZodNumber>;
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
                        organizationId: z.ZodString;
                        createdBy: z.ZodString;
                        name: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        brandName: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        email: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        logoUrl: z.ZodNullable<z.ZodString>;
                        industryId: z.ZodNullable<z.ZodString>;
                        employeeCount: z.ZodNullable<z.ZodNumber>;
                        status: z.ZodEnum<{
                            active: "active";
                            inactive: "inactive";
                            suspended: "suspended";
                            pending_approval: "pending_approval";
                        }>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
                        branches: z.ZodArray<z.ZodObject<{
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
                        images: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            imageUrl: z.ZodString;
                            altText: z.ZodNullable<z.ZodString>;
                            displayOrder: z.ZodNullable<z.ZodNumber>;
                            isThumbnail: z.ZodNullable<z.ZodBoolean>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        policies: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            policyType: z.ZodString;
                            policyText: z.ZodString;
                            effectiveDate: z.ZodString;
                            isActive: z.ZodBoolean;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        companyType: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        industry: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
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
    getRoutingPath(): "/";
};
export declare const getCompanyByIdRoute: {
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
                        organizationId: z.ZodString;
                        createdBy: z.ZodString;
                        name: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        brandName: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        email: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        logoUrl: z.ZodNullable<z.ZodString>;
                        industryId: z.ZodNullable<z.ZodString>;
                        employeeCount: z.ZodNullable<z.ZodNumber>;
                        status: z.ZodEnum<{
                            active: "active";
                            inactive: "inactive";
                            suspended: "suspended";
                            pending_approval: "pending_approval";
                        }>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
                        branches: z.ZodArray<z.ZodObject<{
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
                        images: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            imageUrl: z.ZodString;
                            altText: z.ZodNullable<z.ZodString>;
                            displayOrder: z.ZodNullable<z.ZodNumber>;
                            isThumbnail: z.ZodNullable<z.ZodBoolean>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        policies: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            policyType: z.ZodString;
                            policyText: z.ZodString;
                            effectiveDate: z.ZodString;
                            isActive: z.ZodBoolean;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        companyType: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        industry: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
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
export declare const updateCompanyRoute: {
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
                        name: z.ZodOptional<z.ZodString>;
                        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        status: z.ZodOptional<z.ZodEnum<{
                            active: "active";
                            inactive: "inactive";
                            suspended: "suspended";
                            pending_approval: "pending_approval";
                        }>>;
                        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        brandName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        street: z.ZodOptional<z.ZodString>;
                        city: z.ZodOptional<z.ZodString>;
                        state: z.ZodOptional<z.ZodString>;
                        country: z.ZodOptional<z.ZodString>;
                        postalCode: z.ZodOptional<z.ZodString>;
                        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        logoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        companyType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        industryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                        employeeCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
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
                        organizationId: z.ZodString;
                        createdBy: z.ZodString;
                        name: z.ZodString;
                        description: z.ZodNullable<z.ZodString>;
                        brandName: z.ZodNullable<z.ZodString>;
                        street: z.ZodString;
                        city: z.ZodString;
                        state: z.ZodString;
                        country: z.ZodString;
                        postalCode: z.ZodString;
                        phone: z.ZodNullable<z.ZodString>;
                        email: z.ZodNullable<z.ZodString>;
                        website: z.ZodNullable<z.ZodString>;
                        logoUrl: z.ZodNullable<z.ZodString>;
                        industryId: z.ZodNullable<z.ZodString>;
                        employeeCount: z.ZodNullable<z.ZodNumber>;
                        status: z.ZodEnum<{
                            active: "active";
                            inactive: "inactive";
                            suspended: "suspended";
                            pending_approval: "pending_approval";
                        }>;
                        createdAt: z.ZodDate;
                        updatedAt: z.ZodNullable<z.ZodDate>;
                        branches: z.ZodArray<z.ZodObject<{
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
                        images: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            imageUrl: z.ZodString;
                            altText: z.ZodNullable<z.ZodString>;
                            displayOrder: z.ZodNullable<z.ZodNumber>;
                            isThumbnail: z.ZodNullable<z.ZodBoolean>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        policies: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            companyId: z.ZodString;
                            policyType: z.ZodString;
                            policyText: z.ZodString;
                            effectiveDate: z.ZodString;
                            isActive: z.ZodBoolean;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        companyType: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
                        industry: z.ZodNullable<z.ZodObject<{
                            id: z.ZodString;
                            name: z.ZodString;
                            slug: z.ZodNullable<z.ZodString>;
                            thumbnail: z.ZodNullable<z.ZodString>;
                            createdAt: z.ZodDate;
                            updatedAt: z.ZodNullable<z.ZodDate>;
                        }, z.core.$strip>>;
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
    getRoutingPath(): "/:id";
};
export declare const deleteCompanyRoute: {
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
export type ListAllCompaniesRoute = typeof listAllCompaniesRoute;
export type CreateNewCompanyRoute = typeof createNewCompanyRoute;
export type GetCompanyByIdRoute = typeof getCompanyByIdRoute;
export type ListAllCompanyTypesRoute = typeof listAllCompanyTypesRoute;
export type CreateCompanyTypeRoute = typeof createNewCompanyTypeRoute;
export type UpdateCompanyTypeRoute = typeof updateCompanyTypeRoute;
export type RemoveCompanyTypeRoute = typeof removeCompanyTypeRoute;
export type GetMyCompanyRoute = typeof getMyCompanyRoute;
export type UpdateCompanyRoute = typeof updateCompanyRoute;
export type DeleteCompanyRoute = typeof deleteCompanyRoute;
