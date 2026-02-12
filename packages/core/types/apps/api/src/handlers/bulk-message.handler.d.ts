import type { APIRouteHandler } from "./types";
import type { CreateRoute, GetByIdRoute, ListRoute, RemoveRoute, UpdateRoute, BulkImportRoute } from "./routes/bulk-message.routes";
export declare const list: APIRouteHandler<ListRoute>;
export declare const create: APIRouteHandler<CreateRoute>;
export declare const bulkImport: APIRouteHandler<BulkImportRoute>;
export declare const getOne: APIRouteHandler<GetByIdRoute>;
export declare const patch: APIRouteHandler<UpdateRoute>;
export declare const remove: APIRouteHandler<RemoveRoute>;
