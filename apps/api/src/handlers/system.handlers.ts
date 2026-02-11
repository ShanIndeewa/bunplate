import * as HttpStatusCodes from "stoker/http-status-codes";

import type { APIRouteHandler } from "@/types";


import type { CheckUserTypeRoute } from "@/routes/system.routes";

// check User type handler
export const checkUserTypeHandler: APIRouteHandler<CheckUserTypeRoute> = async (
  c
) => {
  const db = c.get("db");
  try {
    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user) {
      return c.json(
        { message: "Unauthorized access" },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    if (user.role === "admin") {
      return c.json({ userType: "systemAdmin" as const }, HttpStatusCodes.OK);
    }

    if (session.activeOrganizationId) {
      return c.json({ userType: "companyOwner" as const }, HttpStatusCodes.OK);
    }

    // Check user id exists as member in member table
    const userOrg = await db.query.member.findFirst({
      where: (fields, { eq }) => eq(fields.userId, user.id)
    });

    if (userOrg) {
      // Set active organization as created organization
      // const switchRes = await auth.api.setActiveOrganization({
      //   body: {
      //     organizationId: userOrg.organizationId
      //   },
      //   headers: {
      //     cookie: c.req.header("cookie")
      //   }
      // });

      // console.log({ switchRes });

      return c.json({ userType: "companyOwner" as const }, HttpStatusCodes.OK);
    }

    return c.json({ userType: "user" as const }, HttpStatusCodes.OK);
  } catch (error) {
    console.log(error);
    return c.json({ userType: "user" as const }, HttpStatusCodes.OK);
  }
};
