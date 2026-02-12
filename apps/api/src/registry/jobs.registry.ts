import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "../handlers/jobs.handlers";
import * as routes from "../routes/jobs.routes";

const router = createAPIRouter()
  .openapi(routes.getByCompanyId, handlers.getJobsByCompanyIdHandler)
  .openapi(routes.list, handlers.listJobsHandler)
  .openapi(routes.create, handlers.createJobHandler)
  .openapi(routes.getById, handlers.getJobByIdHandler)
  .openapi(routes.update, handlers.updateJobHandler)
  .openapi(routes.remove, handlers.deleteJobHandler);

export default router;
