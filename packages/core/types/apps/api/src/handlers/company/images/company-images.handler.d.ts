import type { APIRouteHandler } from "./types";
import type { AddNewCompanyImagesRoute, GetCompanyImagesRoute, RemoveCompanyImageRoute, UpdateCompanyImageRoute } from "../../../routes/company/company-images.routes";
/**
 * ================================================================
 * Company images Handlers
 * ================================================================
 */
export declare const getCompanyImagesHandler: APIRouteHandler<GetCompanyImagesRoute>;
export declare const addNewCompanyImagesHandler: APIRouteHandler<AddNewCompanyImagesRoute>;
export declare const updateCompanyImageHandler: APIRouteHandler<UpdateCompanyImageRoute>;
export declare const removeCompanyImageHandler: APIRouteHandler<RemoveCompanyImageRoute>;
