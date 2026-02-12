import type { APIRouteHandler } from "./types";
import type { CreateRoute, GetByIdRoute, GetTypesRoute, ListRoute, RemoveRoute, UpdateRoute } from "./routes/jobCategory.routes";
export declare const list: APIRouteHandler<ListRoute>;
export declare const listAll: APIRouteHandler<ListRoute>;
export declare const getTypes: APIRouteHandler<GetTypesRoute>;
export declare const create: APIRouteHandler<CreateRoute>;
export declare const getOne: APIRouteHandler<GetByIdRoute>;
export declare const patch: APIRouteHandler<UpdateRoute>;
export declare const remove: APIRouteHandler<RemoveRoute>;
