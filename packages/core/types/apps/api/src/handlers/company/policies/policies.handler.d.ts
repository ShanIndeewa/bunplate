import type { APIRouteHandler } from "./types";
import type { AddNewCompanyPoliciesRoute, GetCompanyPoliciesRoute, RemoveCompanyPolicyRoute, UpdateCompanyPolicyRoute, UpsertPoliciesToCompanyRoute } from "../../../routes/company/policies.routes";
/**
 * ================================================================
 * Company Policies Handlers
 * ================================================================
 */
export declare const getCompanyPoliciesHandler: APIRouteHandler<GetCompanyPoliciesRoute>;
export declare const upsertPoliciesToCompanyHandler: APIRouteHandler<UpsertPoliciesToCompanyRoute>;
export declare const addNewCompanyPoliciesHandler: APIRouteHandler<AddNewCompanyPoliciesRoute>;
export declare const updateCompanyPolicyHandler: APIRouteHandler<UpdateCompanyPolicyRoute>;
export declare const removeCompanyPolicyHandler: APIRouteHandler<RemoveCompanyPolicyRoute>;
