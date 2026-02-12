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
                message: string;
            };
            outputFormat: "json";
            status: 422;
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
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    status: "pending" | "sent" | "failed";
                    note: string;
                    phoneNumber: string;
                    whatsappNumber: string;
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
                userId: string;
                createdAt: string;
                updatedAt: string;
                status: "pending" | "sent" | "failed";
                note: string;
                phoneNumber: string;
                whatsappNumber: string;
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
                    note: string;
                    phoneNumber: string;
                    whatsappNumber: string;
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
                    note: string;
                    phoneNumber: string;
                    whatsappNumber: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                json: {
                    note: string;
                    phoneNumber: string;
                    whatsappNumber: string;
                };
            };
            output: {
                id: string;
                userId: string;
                createdAt: string;
                updatedAt: string;
                status: "pending" | "sent" | "failed";
                note: string;
                phoneNumber: string;
                whatsappNumber: string;
            };
            outputFormat: "json";
            status: 201;
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
                    note?: string | undefined;
                    phoneNumber?: string | undefined;
                    whatsappNumber?: string | undefined;
                    status?: "pending" | "sent" | "failed" | undefined;
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
                    note?: string | undefined;
                    phoneNumber?: string | undefined;
                    whatsappNumber?: string | undefined;
                    status?: "pending" | "sent" | "failed" | undefined;
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
                    note?: string | undefined;
                    phoneNumber?: string | undefined;
                    whatsappNumber?: string | undefined;
                    status?: "pending" | "sent" | "failed" | undefined;
                };
            };
            output: {
                id: string;
                userId: string;
                createdAt: string;
                updatedAt: string;
                status: "pending" | "sent" | "failed";
                note: string;
                phoneNumber: string;
                whatsappNumber: string;
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
} & {
    "/bulk-import": {
        $post: {
            input: {
                json: {
                    records: {
                        note: string;
                        phoneNumber: string;
                        whatsappNumber: string;
                    }[];
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
                    records: {
                        note: string;
                        phoneNumber: string;
                        whatsappNumber: string;
                    }[];
                };
            };
            output: {
                message: string;
                count: number;
                records: {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    status: "pending" | "sent" | "failed";
                    note: string;
                    phoneNumber: string;
                    whatsappNumber: string;
                }[];
            };
            outputFormat: "json";
            status: 201;
        } | {
            input: {
                json: {
                    records: {
                        note: string;
                        phoneNumber: string;
                        whatsappNumber: string;
                    }[];
                };
            };
            output: {
                message: string;
                error?: string | undefined;
            };
            outputFormat: "json";
            status: 400;
        };
    };
}, "/">;
export default router;
