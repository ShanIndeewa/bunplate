import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "../handlers/jobCategory.handlers";
import * as routes from "../routes/jobCategory.routes";

const router = createAPIRouter()
  // Static paths first to avoid /:id swallowing them
  .openapi(routes.list, handlers.list)
  .openapi(routes.listAll, handlers.listAll)
  .openapi(routes.getTypes, handlers.getTypes)
  .openapi(routes.create, handlers.create)
  // Parameterized routes last
  .openapi(routes.getById, handlers.getOne)
  .openapi(routes.update, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
