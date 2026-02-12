declare const router: import("@hono/zod-openapi").OpenAPIHono<import("../types").APIBindings, {
    "/company/:companyId": {
        $get: {
            input: {
                param: {
                    companyId: string;
                };
            } & {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
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
                    companyId: string;
                };
            } & {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
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
                    companyId: string;
                };
            } & {
                query: {
                    page?: string | undefined;
                    limit?: string | undefined;
                    sort?: "asc" | "desc" | undefined;
                    search?: string | undefined;
                };
            };
            output: {
                data: {
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
                    postedAt: string;
                    closingDate: string | null;
                    createdAt: string | null;
                    updatedAt: string | null;
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
                };
            };
            output: {
                data: {
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
                    postedAt: string;
                    closingDate: string | null;
                    createdAt: string | null;
                    updatedAt: string | null;
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
                    status: "open" | "closed" | "paused";
                    title: string;
                    description: string;
                    type: "full_time" | "part_time" | "contract" | "internship";
                    jobCategoryId: string | null;
                    location: string | null;
                    experienceRequired: string | null;
                    skills: any;
                    isRemote: boolean;
                    closingDate: unknown;
                    salaryMin?: number | null | undefined;
                    salaryMax?: number | null | undefined;
                    numberOfVacancies?: number | undefined;
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
                    status: "open" | "closed" | "paused";
                    title: string;
                    description: string;
                    type: "full_time" | "part_time" | "contract" | "internship";
                    jobCategoryId: string | null;
                    location: string | null;
                    experienceRequired: string | null;
                    skills: any;
                    isRemote: boolean;
                    closingDate: unknown;
                    salaryMin?: number | null | undefined;
                    salaryMax?: number | null | undefined;
                    numberOfVacancies?: number | undefined;
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
                    status: "open" | "closed" | "paused";
                    title: string;
                    description: string;
                    type: "full_time" | "part_time" | "contract" | "internship";
                    jobCategoryId: string | null;
                    location: string | null;
                    experienceRequired: string | null;
                    skills: any;
                    isRemote: boolean;
                    closingDate: unknown;
                    salaryMin?: number | null | undefined;
                    salaryMax?: number | null | undefined;
                    numberOfVacancies?: number | undefined;
                };
            };
            output: {
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
                postedAt: string;
                closingDate: string | null;
                createdAt: string | null;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 201;
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
                postedAt: string;
                closingDate: string | null;
                createdAt: string | null;
                updatedAt: string | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
} & {
    "/:id": {
        $patch: {
            input: {
                param: {
                    id: string;
                };
            } & {
                json: {
                    status?: "open" | "closed" | "paused" | undefined;
                    title?: string | undefined;
                    description?: string | undefined;
                    type?: "full_time" | "part_time" | "contract" | "internship" | undefined;
                    jobCategoryId?: string | null | undefined;
                    location?: string | null | undefined;
                    salaryMin?: string | null | undefined;
                    salaryMax?: string | null | undefined;
                    experienceRequired?: string | null | undefined;
                    skills?: any;
                    numberOfVacancies?: number | undefined;
                    isRemote?: boolean | undefined;
                    closingDate?: unknown;
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
                    status?: "open" | "closed" | "paused" | undefined;
                    title?: string | undefined;
                    description?: string | undefined;
                    type?: "full_time" | "part_time" | "contract" | "internship" | undefined;
                    jobCategoryId?: string | null | undefined;
                    location?: string | null | undefined;
                    salaryMin?: string | null | undefined;
                    salaryMax?: string | null | undefined;
                    experienceRequired?: string | null | undefined;
                    skills?: any;
                    numberOfVacancies?: number | undefined;
                    isRemote?: boolean | undefined;
                    closingDate?: unknown;
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
                    status?: "open" | "closed" | "paused" | undefined;
                    title?: string | undefined;
                    description?: string | undefined;
                    type?: "full_time" | "part_time" | "contract" | "internship" | undefined;
                    jobCategoryId?: string | null | undefined;
                    location?: string | null | undefined;
                    salaryMin?: string | null | undefined;
                    salaryMax?: string | null | undefined;
                    experienceRequired?: string | null | undefined;
                    skills?: any;
                    numberOfVacancies?: number | undefined;
                    isRemote?: boolean | undefined;
                    closingDate?: unknown;
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
                    status?: "open" | "closed" | "paused" | undefined;
                    title?: string | undefined;
                    description?: string | undefined;
                    type?: "full_time" | "part_time" | "contract" | "internship" | undefined;
                    jobCategoryId?: string | null | undefined;
                    location?: string | null | undefined;
                    salaryMin?: string | null | undefined;
                    salaryMax?: string | null | undefined;
                    experienceRequired?: string | null | undefined;
                    skills?: any;
                    numberOfVacancies?: number | undefined;
                    isRemote?: boolean | undefined;
                    closingDate?: unknown;
                };
            };
            output: {
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
                postedAt: string;
                closingDate: string | null;
                createdAt: string | null;
                updatedAt: string | null;
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
}, "/">;
export default router;
