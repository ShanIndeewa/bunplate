import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "../handlers/company/company.handler";
import * as routes from "../routes/company/company.routes";

import * as imageHandlers from "../handlers/company/images/company-images.handler";
import * as imageRoutes from "../routes/company/company-images.routes";

import * as branchesHandlers from "../handlers/company/branches/branches.handler";
import * as branchesRoutes from "../routes/company/branches.routes";

import * as industriesHandlers from "../handlers/company/industries/industries.handler";
import * as industriesRoutes from "../routes/company/industries.routes";

import * as policyHandlers from "../handlers/company/policies/policies.handler";
import * as policyRoutes from "../routes/company/policies.routes";

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
