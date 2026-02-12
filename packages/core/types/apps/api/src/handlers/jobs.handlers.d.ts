import type { APIRouteHandler } from "./types";
import type { CreateRoute, GetByCompanyIdRoute, GetByIdRoute, ListRoute, RemoveRoute, UpdateRoute } from "./routes/jobs.routes";
export declare const listJobsHandler: APIRouteHandler<ListRoute>;
export declare const getJobsByCompanyIdHandler: APIRouteHandler<GetByCompanyIdRoute>;
export declare const getJobByIdHandler: APIRouteHandler<GetByIdRoute>;
export declare const createJobHandler: APIRouteHandler<CreateRoute>;
export declare const updateJobHandler: APIRouteHandler<UpdateRoute>;
export declare const deleteJobHandler: APIRouteHandler<RemoveRoute>;
