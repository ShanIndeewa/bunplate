declare const router: import("@hono/zod-openapi").OpenAPIHono<import("../types").APIBindings, {
    "/:id": {
        $patch: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    email?: string | null | undefined;
                    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
                    description?: string | null | undefined;
                    brandName?: string | null | undefined;
                    street?: string | undefined;
                    city?: string | undefined;
                    state?: string | undefined;
                    country?: string | undefined;
                    postalCode?: string | undefined;
                    phone?: string | null | undefined;
                    website?: string | null | undefined;
                    logoUrl?: string | null | undefined;
                    companyType?: string | null | undefined;
                    industryId?: string | null | undefined;
                    employeeCount?: number | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    email?: string | null | undefined;
                    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
                    description?: string | null | undefined;
                    brandName?: string | null | undefined;
                    street?: string | undefined;
                    city?: string | undefined;
                    state?: string | undefined;
                    country?: string | undefined;
                    postalCode?: string | undefined;
                    phone?: string | null | undefined;
                    website?: string | null | undefined;
                    logoUrl?: string | null | undefined;
                    companyType?: string | null | undefined;
                    industryId?: string | null | undefined;
                    employeeCount?: number | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    email?: string | null | undefined;
                    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
                    description?: string | null | undefined;
                    brandName?: string | null | undefined;
                    street?: string | undefined;
                    city?: string | undefined;
                    state?: string | undefined;
                    country?: string | undefined;
                    postalCode?: string | undefined;
                    phone?: string | null | undefined;
                    website?: string | null | undefined;
                    logoUrl?: string | null | undefined;
                    companyType?: string | null | undefined;
                    industryId?: string | null | undefined;
                    employeeCount?: number | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    email?: string | null | undefined;
                    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
                    description?: string | null | undefined;
                    brandName?: string | null | undefined;
                    street?: string | undefined;
                    city?: string | undefined;
                    state?: string | undefined;
                    country?: string | undefined;
                    postalCode?: string | undefined;
                    phone?: string | null | undefined;
                    website?: string | null | undefined;
                    logoUrl?: string | null | undefined;
                    companyType?: string | null | undefined;
                    industryId?: string | null | undefined;
                    employeeCount?: number | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    email?: string | null | undefined;
                    status?: "active" | "inactive" | "suspended" | "pending_approval" | undefined;
                    description?: string | null | undefined;
                    brandName?: string | null | undefined;
                    street?: string | undefined;
                    city?: string | undefined;
                    state?: string | undefined;
                    country?: string | undefined;
                    postalCode?: string | undefined;
                    phone?: string | null | undefined;
                    website?: string | null | undefined;
                    logoUrl?: string | null | undefined;
                    companyType?: string | null | undefined;
                    industryId?: string | null | undefined;
                    employeeCount?: number | null | undefined;
                };
            };
            output: {
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
                createdAt: string;
                updatedAt: string | null;
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
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                images: {
                    id: string;
                    companyId: string;
                    imageUrl: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                policies: {
                    id: string;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                    isActive: boolean;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                companyType: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
                industry: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/my-company": {
        $get: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {};
            output: {
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
                createdAt: string;
                updatedAt: string | null;
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
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                images: {
                    id: string;
                    companyId: string;
                    imageUrl: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                policies: {
                    id: string;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                    isActive: boolean;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                companyType: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
                industry: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
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
                createdAt: string;
                updatedAt: string | null;
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
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                images: {
                    id: string;
                    companyId: string;
                    imageUrl: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                policies: {
                    id: string;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                    isActive: boolean;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                companyType: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
                industry: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/types": {
        $get: {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                id: string;
                name: string;
                slug: string | null;
                thumbnail: string | null;
                createdAt: string;
                updatedAt: string | null;
            }[];
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/": {
        $get: {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                    companyType?: string | undefined;
                    industryId?: string | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                    companyType?: string | undefined;
                    industryId?: string | undefined;
                };
            };
            output: {
                data: {
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
                    createdAt: string;
                    updatedAt: string | null;
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
                        createdAt: string;
                        updatedAt: string | null;
                    }[];
                    images: {
                        id: string;
                        companyId: string;
                        imageUrl: string;
                        altText: string | null;
                        displayOrder: number | null;
                        isThumbnail: boolean | null;
                        createdAt: string;
                        updatedAt: string | null;
                    }[];
                    policies: {
                        id: string;
                        companyId: string;
                        policyType: string;
                        policyText: string;
                        effectiveDate: string;
                        isActive: boolean;
                        createdAt: string;
                        updatedAt: string | null;
                    }[];
                    companyType: {
                        id: string;
                        name: string;
                        slug: string | null;
                        thumbnail: string | null;
                        createdAt: string;
                        updatedAt: string | null;
                    } | null;
                    industry: {
                        id: string;
                        name: string;
                        slug: string | null;
                        thumbnail: string | null;
                        createdAt: string;
                        updatedAt: string | null;
                    } | null;
                }[];
                meta: {
                    currentPage: number;
                    limit: number;
                    totalCount: number;
                    totalPages: number;
                };
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/": {
        $post: {
            input: {
                json: {
                    name: string;
                    email: string | null;
                    status: "active" | "inactive" | "suspended" | "pending_approval";
                    description: string | null;
                    brandName: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    website: string | null;
                    logoUrl: string | null;
                    companyType: string | null;
                    industryId: string | null;
                    employeeCount: number | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    name: string;
                    email: string | null;
                    status: "active" | "inactive" | "suspended" | "pending_approval";
                    description: string | null;
                    brandName: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    website: string | null;
                    logoUrl: string | null;
                    companyType: string | null;
                    industryId: string | null;
                    employeeCount: number | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    name: string;
                    email: string | null;
                    status: "active" | "inactive" | "suspended" | "pending_approval";
                    description: string | null;
                    brandName: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    website: string | null;
                    logoUrl: string | null;
                    companyType: string | null;
                    industryId: string | null;
                    employeeCount: number | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                json: {
                    name: string;
                    email: string | null;
                    status: "active" | "inactive" | "suspended" | "pending_approval";
                    description: string | null;
                    brandName: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    website: string | null;
                    logoUrl: string | null;
                    companyType: string | null;
                    industryId: string | null;
                    employeeCount: number | null;
                };
            };
            output: {
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
                createdAt: string;
                updatedAt: string | null;
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
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                images: {
                    id: string;
                    companyId: string;
                    imageUrl: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                policies: {
                    id: string;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                    isActive: boolean;
                    createdAt: string;
                    updatedAt: string | null;
                }[];
                companyType: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
                industry: {
                    id: string;
                    name: string;
                    slug: string | null;
                    thumbnail: string | null;
                    createdAt: string;
                    updatedAt: string | null;
                } | null;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/types": {
        $post: {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                id: string;
                name: string;
                slug: string | null;
                thumbnail: string | null;
                createdAt: string;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/types/:id": {
        $patch: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                id: string;
                name: string;
                slug: string | null;
                thumbnail: string | null;
                createdAt: string;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/types/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/images": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                id: string;
                companyId: string;
                imageUrl: string;
                altText: string | null;
                displayOrder: number | null;
                isThumbnail: boolean | null;
                createdAt: string;
                updatedAt: string | null;
            }[];
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/images": {
        $post: {
            input: {
                json: {
                    imageUrl: string;
                    companyId: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    imageUrl: string;
                    companyId: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    imageUrl: string;
                    companyId: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                json: {
                    imageUrl: string;
                    companyId: string;
                    altText: string | null;
                    displayOrder: number | null;
                    isThumbnail: boolean | null;
                }[];
            };
            output: {
                imageUrl: string;
                companyId: string;
                altText: string | null;
                displayOrder: number | null;
                isThumbnail: boolean | null;
            }[];
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/images/:id": {
        $put: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    imageUrl?: string | undefined;
                    companyId?: string | undefined;
                    altText?: string | null | undefined;
                    displayOrder?: number | null | undefined;
                    isThumbnail?: boolean | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    imageUrl?: string | undefined;
                    companyId?: string | undefined;
                    altText?: string | null | undefined;
                    displayOrder?: number | null | undefined;
                    isThumbnail?: boolean | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    imageUrl?: string | undefined;
                    companyId?: string | undefined;
                    altText?: string | null | undefined;
                    displayOrder?: number | null | undefined;
                    isThumbnail?: boolean | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    imageUrl?: string | undefined;
                    companyId?: string | undefined;
                    altText?: string | null | undefined;
                    displayOrder?: number | null | undefined;
                    isThumbnail?: boolean | null | undefined;
                };
            };
            output: {
                id: string;
                companyId: string;
                imageUrl: string;
                altText: string | null;
                displayOrder: number | null;
                isThumbnail: boolean | null;
                createdAt: string;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/images/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/branches": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
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
                createdAt: string;
                updatedAt: string | null;
            }[];
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/branches": {
        $post: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    email: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    companyId: string;
                    branchName: string;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    email: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    companyId: string;
                    branchName: string;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    email: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    companyId: string;
                    branchName: string;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    email: string | null;
                    street: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phone: string | null;
                    companyId: string;
                    branchName: string;
                }[];
            };
            output: {
                email: string | null;
                street: string;
                city: string;
                state: string;
                country: string;
                postalCode: string;
                phone: string | null;
                companyId: string;
                branchName: string;
            }[];
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/industries": {
        $get: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {};
            output: {
                id: string;
                name: string;
                slug: string | null;
                thumbnail: string | null;
                createdAt: string;
                updatedAt: string | null;
            }[];
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/industries": {
        $post: {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                json: {
                    name: string;
                    thumbnail: string | null;
                };
            };
            output: {
                id: string;
                name: string;
                slug: string | null;
                thumbnail: string | null;
                createdAt: string;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/industries/:id": {
        $put: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    name?: string | undefined;
                    thumbnail?: string | null | undefined;
                };
            };
            output: {
                id: string;
                name: string;
                slug: string | null;
                thumbnail: string | null;
                createdAt: string;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/industries/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id/policies": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                id: string;
                companyId: string;
                policyType: string;
                policyText: string;
                effectiveDate: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string | null;
            }[];
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/policies": {
        $post: {
            input: {
                json: {
                    isActive: boolean;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 500;
        } | {
            input: {
                json: {
                    isActive: boolean;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 401;
        } | {
            input: {
                json: {
                    isActive: boolean;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                }[];
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 403;
        } | {
            input: {
                json: {
                    isActive: boolean;
                    companyId: string;
                    policyType: string;
                    policyText: string;
                    effectiveDate: string;
                }[];
            };
            output: {
                id: string;
                companyId: string;
                policyType: string;
                policyText: string;
                effectiveDate: string;
                isActive: boolean;
                createdAt: string;
                updatedAt: string | null;
            }[];
            outputFormat: "json";
            status: 201;
        };
    };
}, "/">;
export default router;
