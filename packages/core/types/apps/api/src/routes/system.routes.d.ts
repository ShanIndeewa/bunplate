export declare const checkUserType: {
    tags: string[];
    summary: string;
    path: "/check-user-type";
    method: "get";
    responses: {
        200: {
            content: {
                "application/json": {
                    schema: import("zod").ZodObject<{
                        userType: import("zod").ZodEnum<{
                            user: "user";
                            companyOwner: "companyOwner";
                            systemAdmin: "systemAdmin";
                        }>;
                    }, import("better-auth").$strip>;
                };
            };
            description: string;
        };
        401: {
            content: {
                "application/json": {
                    schema: import("zod").ZodObject<{
                        message: import("zod").ZodString;
                    }, import("better-auth").$strip>;
                };
            };
            description: string;
        };
    };
} & {
    getRoutingPath(): "/check-user-type";
};
export type CheckUserTypeRoute = typeof checkUserType;
