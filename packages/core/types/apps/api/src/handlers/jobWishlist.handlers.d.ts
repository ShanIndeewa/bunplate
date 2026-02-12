import type { APIRouteHandler } from "./types";
import type { CheckSavedRoute, CreateRoute, GetByIdRoute, ListRoute, RemoveRoute, UpdateRoute } from "./routes/jobWishlist.routes";
export declare const list: APIRouteHandler<ListRoute>;
export declare const create: APIRouteHandler<CreateRoute>;
export declare const getOne: APIRouteHandler<GetByIdRoute>;
export declare const patch: APIRouteHandler<UpdateRoute>;
export declare const checkSaved: APIRouteHandler<CheckSavedRoute>;
export declare const remove: APIRouteHandler<RemoveRoute>;
