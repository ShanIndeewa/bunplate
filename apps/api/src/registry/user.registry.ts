// user.router.ts
import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "./user.handlers";
import * as routes from "../routes/user.routes";

const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  // Register static route before the dynamic '/:id' to avoid collisions with '/count'
  .openapi(routes.count, handlers.count)
  .openapi(routes.getById, handlers.getOne);

export default router;
