import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "../handlers/jobApplications.handlers";
import * as routes from "../routes/jobApplications.routes";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.listAll, handlers.listAll)
  .openapi(routes.listCompany, handlers.listCompany)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getById, handlers.getOne)
  .openapi(routes.checkApplication, handlers.checkApplication)
  .openapi(routes.update, handlers.patch)
  .openapi(routes.adminUpdate, handlers.adminPatch)
  .openapi(routes.remove, handlers.remove)
  .openapi(routes.adminRemove, handlers.adminRemove);

export default router;
