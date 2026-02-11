import { createAPIRouter } from "@/lib/setup-api";

// import * as handlers from "../handlers/b.handlers";
import * as routes from "../routes/bulk-message.routes";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getById, handlers.getOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes.update, handlers.patch)
  .openapi(routes.remove, handlers.remove)
  .openapi(routes.bulkImport, handlers.bulkImport);

export default router;
