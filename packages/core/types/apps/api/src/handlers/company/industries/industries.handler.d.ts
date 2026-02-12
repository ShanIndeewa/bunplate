import type { APIRouteHandler } from "./types";
import type { AddNewIndustryRoute, GetIndustriesRoute, RemoveIndustryRoute, UpdateIndustryRoute } from "../../../routes/company/industries.routes";
export declare const getIndustriesHandler: APIRouteHandler<GetIndustriesRoute>;
export declare const addNewIndustryHandler: APIRouteHandler<AddNewIndustryRoute>;
export declare const updateIndustryHandler: APIRouteHandler<UpdateIndustryRoute>;
export declare const removeIndustryHandler: APIRouteHandler<RemoveIndustryRoute>;
