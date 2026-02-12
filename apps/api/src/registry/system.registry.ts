import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "../handlers/system.handlers";
import * as routes from "../routes/system.routes";

const router = createAPIRouter().openapi(
  routes.checkUserType,
  handlers.checkUserTypeHandler
);

export default router;
