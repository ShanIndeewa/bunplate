import { createAPIRouter } from "@/lib/setup-api";
import * as handlers from "./jobWishlist.handlers";
import * as routes from "../routes/jobWishlist.routes";


const router = createAPIRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getById, handlers.getOne)
  .openapi(routes.checkSaved, handlers.checkSaved)
  .openapi(routes.update, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
