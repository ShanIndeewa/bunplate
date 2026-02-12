declare const router: import("@hono/zod-openapi").OpenAPIHono<import("../types").APIBindings, {
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
                    updatedAt: string | null;
                    createdAt: string | null;
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
                    description: string | null;
                    website: string | null;
                    location: string | null;
                    firstName: string;
                    lastName: string | null;
                    currentPosition: string | null;
                    DOB: string | null;
                    currentWorkplace: string | null;
                    additionalInfo: string | null;
                    tagline: string | null;
                    headline: string | null;
                    about: string | null;
                    profilePhotoUrl: string | null;
                    bannerPhotoUrl: string | null;
                    linkedinUrl: string | null;
                    githubUrl: string | null;
                    portfolioUrl: string | null;
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
                    description: string | null;
                    website: string | null;
                    location: string | null;
                    firstName: string;
                    lastName: string | null;
                    currentPosition: string | null;
                    DOB: string | null;
                    currentWorkplace: string | null;
                    additionalInfo: string | null;
                    tagline: string | null;
                    headline: string | null;
                    about: string | null;
                    profilePhotoUrl: string | null;
                    bannerPhotoUrl: string | null;
                    linkedinUrl: string | null;
                    githubUrl: string | null;
                    portfolioUrl: string | null;
                };
            };
            output: {
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
                updatedAt: string | null;
                createdAt: string | null;
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
                updatedAt: string | null;
                createdAt: string | null;
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
                    description?: string | null | undefined;
                    website?: string | null | undefined;
                    location?: string | null | undefined;
                    firstName?: string | undefined;
                    lastName?: string | null | undefined;
                    currentPosition?: string | null | undefined;
                    DOB?: string | null | undefined;
                    currentWorkplace?: string | null | undefined;
                    additionalInfo?: string | null | undefined;
                    tagline?: string | null | undefined;
                    headline?: string | null | undefined;
                    about?: string | null | undefined;
                    profilePhotoUrl?: string | null | undefined;
                    bannerPhotoUrl?: string | null | undefined;
                    linkedinUrl?: string | null | undefined;
                    githubUrl?: string | null | undefined;
                    portfolioUrl?: string | null | undefined;
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
                    description?: string | null | undefined;
                    website?: string | null | undefined;
                    location?: string | null | undefined;
                    firstName?: string | undefined;
                    lastName?: string | null | undefined;
                    currentPosition?: string | null | undefined;
                    DOB?: string | null | undefined;
                    currentWorkplace?: string | null | undefined;
                    additionalInfo?: string | null | undefined;
                    tagline?: string | null | undefined;
                    headline?: string | null | undefined;
                    about?: string | null | undefined;
                    profilePhotoUrl?: string | null | undefined;
                    bannerPhotoUrl?: string | null | undefined;
                    linkedinUrl?: string | null | undefined;
                    githubUrl?: string | null | undefined;
                    portfolioUrl?: string | null | undefined;
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
                    description?: string | null | undefined;
                    website?: string | null | undefined;
                    location?: string | null | undefined;
                    firstName?: string | undefined;
                    lastName?: string | null | undefined;
                    currentPosition?: string | null | undefined;
                    DOB?: string | null | undefined;
                    currentWorkplace?: string | null | undefined;
                    additionalInfo?: string | null | undefined;
                    tagline?: string | null | undefined;
                    headline?: string | null | undefined;
                    about?: string | null | undefined;
                    profilePhotoUrl?: string | null | undefined;
                    bannerPhotoUrl?: string | null | undefined;
                    linkedinUrl?: string | null | undefined;
                    githubUrl?: string | null | undefined;
                    portfolioUrl?: string | null | undefined;
                };
            };
            output: {
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
                updatedAt: string | null;
                createdAt: string | null;
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
            output: {};
            outputFormat: string;
            status: 204;
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
        };
    };
}, "/">;
export default router;
