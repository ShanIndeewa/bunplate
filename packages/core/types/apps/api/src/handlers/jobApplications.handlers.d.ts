import type { APIRouteHandler } from "./types";
import type { AdminRemoveRoute, AdminUpdateRoute, CheckApplicationRoute, CreateRoute, GetByIdRoute, ListAllRoute, ListCompanyRoute, ListRoute, RemoveRoute, UpdateRoute } from "./routes/jobApplications.routes";
/**
 * 🧭 List ONLY the logged-in user's job applications (optionally scoped by org)
 * Supports basic pagination via `?page=1&limit=20`.
 */
export declare const list: APIRouteHandler<ListRoute>;
/**
 * 🧭 List ALL job applications (admin access)
 * Supports basic pagination via `?page=1&limit=20`.
 * This endpoint returns all job applications regardless of user/organization.
 */
export declare const listAll: APIRouteHandler<ListAllRoute>;
/**
 * 🧭 List job applications for the company (company access)
 * Supports basic pagination via `?page=1&limit=20`.
 * This endpoint returns job applications for the company's jobs.
 *
 * IMPORTANT: Only shows applications where admin_action = 'access_company'
 * Applications with admin_action = 'admin_only' are hidden from companies
 * and can only be viewed by administrators.
 */
export declare const listCompany: APIRouteHandler<ListCompanyRoute>;
/**
 * ➕ Create a job application for the logged-in user/org
 * Body is validated upstream (e.g., via `jobApplicationInsertSchema`).
 */
export declare const create: APIRouteHandler<CreateRoute>;
/**
 * 🔍 Check if user has applied to a specific job
 */
export declare const checkApplication: APIRouteHandler<CheckApplicationRoute>;
/**
 * 🔍 Get one (must belong to the logged-in user)
 */
export declare const getOne: APIRouteHandler<GetByIdRoute>;
/**
 * ✏️ Update (only your own row)
 * Body is validated upstream (e.g., via `jobApplicationUpdateSchema`).
 */
export declare const patch: APIRouteHandler<UpdateRoute>;
/**
 * 🔧 Admin Update (allows updating adminAction)
 */
export declare const adminPatch: APIRouteHandler<AdminUpdateRoute>;
/**
 * 🗑️ Delete (only your own row)
 */
export declare const remove: APIRouteHandler<RemoveRoute>;
/**
 * 🗑️ Admin Delete (allows admins to delete any job application)
 */
export declare const adminRemove: APIRouteHandler<AdminRemoveRoute>;
