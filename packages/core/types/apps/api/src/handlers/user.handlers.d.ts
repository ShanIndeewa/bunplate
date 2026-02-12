import type { APIRouteHandler } from "./types";
import type { CountRoute, GetByIdRoute, ListRoute } from "./routes/user.routes";
export declare const list: APIRouteHandler<ListRoute>;
export declare const getOne: APIRouteHandler<GetByIdRoute>;
export declare const count: APIRouteHandler<CountRoute>;
