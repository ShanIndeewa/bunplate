import { createAPIRouter } from "@/lib/setup-api";
import { OpenAPI } from "@/types";

import { BASE_PATH } from "@/lib/constants";

import index from "../routes/index.route";
import tasks from "./tasks.registry";
import ads from "./ads.registry";
import article from "./article.registry";
import bulkMessage from "./bulk-message.registry";
import company from "./company.registry";
import jobApplicationReviews from "./jobApplicationReviews.registry";
import jobApplications from "./jobApplications.registry";
import jobCategory from "./jobCategory.registry";
import jobs from "./jobs.registry";
import jobWishlist from "./jobWishlist.registry";
import media from "./media.registry";
import notifications from "./notifications.registry";
import system from "./system.registry";
import user from "./user.registry";
import userEducation from "./userEducation.registry";
import userProfile from "./userProfile.registry";
import userProject from "./userProject.registry";
import userRecommendation from "./userRecommendation.registry";
import userSkill from "./userSkill.registry";
import wishlist from "./wishlist.registry";

export function registerRoutes(app: OpenAPI) {
  const registeredApp = app
    .route("/", index)
    .route("/tasks", tasks)
    .route("/ads", ads)
    .route("/article", article)
    .route("/bulk-message", bulkMessage)
    .route("/companies", company)
    .route("/jobapplicationreviews", jobApplicationReviews)
    .route("/jobapplication", jobApplications)
    .route("/jobcategory", jobCategory)
    .route("/jobs", jobs)
    .route("/job-wishlist", jobWishlist)
    .route("/media", media)
    .route("/notifications", notifications)
    .route("/system", system)
    .route("/userlist", user)
    .route("/usereducation", userEducation)
    .route("/userprofile", userProfile)
    .route("/userproject", userProject)
    .route("/userrecommendation", userRecommendation)
    .route("/userskill", userSkill)
    .route("/wishlists", wishlist);

  return registeredApp;
}

// Standalone router instance and type export for RPC
export const router = registerRoutes(createAPIRouter().basePath(BASE_PATH));

export type Router = typeof router;
