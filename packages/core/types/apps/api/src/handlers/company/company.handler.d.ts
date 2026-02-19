import type { APIRouteHandler } from "./types";
import type { CreateCompanyTypeRoute, CreateNewCompanyRoute, DeleteCompanyRoute, GetCompanyByIdRoute, GetMyCompanyRoute, ListAllCompaniesRoute, ListAllCompanyTypesRoute, RemoveCompanyTypeRoute, UpdateCompanyRoute, UpdateCompanyTypeRoute } from "../../routes/company/company.routes";
/**
 * ================================================================
 * Company Types Handlers
 * ================================================================
 */
export declare const listCompanyTypesHandler: APIRouteHandler<ListAllCompanyTypesRoute>;
export declare const createCompanyTypeHandler: APIRouteHandler<CreateCompanyTypeRoute>;
export declare const updateCompanyTypeHandler: APIRouteHandler<UpdateCompanyTypeRoute>;
export declare const removeCompanyTypeHandler: APIRouteHandler<RemoveCompanyTypeRoute>;
/**
 * ================================================================
 * Companies Handlers
 * ================================================================
 */
export declare const listAllCompaniesHandler: APIRouteHandler<ListAllCompaniesRoute>;
export declare const createNewCompanyHandler: APIRouteHandler<CreateNewCompanyRoute>;
export declare const getCompanyByIdHandler: APIRouteHandler<GetCompanyByIdRoute>;
export declare const getMyCompanyHandler: APIRouteHandler<GetMyCompanyRoute>;
export declare const updateCompanyHandler: APIRouteHandler<UpdateCompanyRoute>;
export declare const deleteCompanyHandler: APIRouteHandler<DeleteCompanyRoute>;
