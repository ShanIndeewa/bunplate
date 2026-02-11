import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "./company.handler";
import * as routes from "./company.routes";

import * as imageHandlers from "./images/company-images.handler";
import * as imageRoutes from "./images/company-images.routes";

import * as branchesHandlers from "./branches/branches.handler";
import * as branchesRoutes from "./branches/branches.routes";

import * as industriesHandlers from "./industries/industries.handler";
import * as industriesRoutes from "./industries/industries.routes";

import * as policyHandlers from "./policies/policies.handler";
import * as policyRoutes from "./policies/policies.routes";

const router = createAPIRouter()
  // -------------------- Company --------------------
  .openapi(routes.updateCompanyRoute, handlers.updateCompanyHandler)
  .openapi(routes.deleteCompanyRoute, handlers.deleteCompanyHandler)
  .openapi(routes.getMyCompanyRoute, handlers.getMyCompanyHandler)
  .openapi(routes.getCompanyByIdRoute, handlers.getCompanyByIdHandler)
  .openapi(routes.listAllCompanyTypesRoute, handlers.listCompanyTypesHandler)
  .openapi(routes.listAllCompaniesRoute, handlers.listAllCompaniesHandler)
  .openapi(routes.createNewCompanyRoute, handlers.createNewCompanyHandler)
  .openapi(routes.createNewCompanyTypeRoute, handlers.createCompanyTypeHandler)
  .openapi(routes.updateCompanyTypeRoute, handlers.updateCompanyTypeHandler)
  .openapi(routes.removeCompanyTypeRoute, handlers.removeCompanyTypeHandler)

  // -------------------- Company Images --------------------
  .openapi(
    imageRoutes.getCompanyImagesRoute,
    imageHandlers.getCompanyImagesHandler
  )
  .openapi(
    imageRoutes.addNewCompanyImagesRoute,
    imageHandlers.addNewCompanyImagesHandler
  )
  .openapi(
    imageRoutes.updateCompanyImageRoute,
    imageHandlers.updateCompanyImageHandler
  )
  .openapi(
    imageRoutes.removeCompanyImageRoute,
    imageHandlers.removeCompanyImageHandler
  )

  // -------------------- Company Branches --------------------
  .openapi(
    branchesRoutes.getCompanyBranchesRoute,
    branchesHandlers.getCompanyBranchesHandler
  )
  .openapi(
    branchesRoutes.upsertBranchesToCompanyRoute,
    branchesHandlers.upsertBranchesToCompanyHandler
  )

  // -------------------- Industries --------------------
  .openapi(
    industriesRoutes.getIndustriesRoute,
    industriesHandlers.getIndustriesHandler
  )
  .openapi(
    industriesRoutes.addNewIndustryRoute,
    industriesHandlers.addNewIndustryHandler
  )
  .openapi(
    industriesRoutes.updateIndustryRoute,
    industriesHandlers.updateIndustryHandler
  )
  .openapi(
    industriesRoutes.removeIndustryRoute,
    industriesHandlers.removeIndustryHandler
  )

  // -------------------- Company Policies --------------------
  .openapi(
    policyRoutes.getCompanyPoliciesRoute,
    policyHandlers.getCompanyPoliciesHandler
  )
  .openapi(
    policyRoutes.addNewCompanyPoliciesRoute,
    policyHandlers.addNewCompanyPoliciesHandler
  );
export default router;
