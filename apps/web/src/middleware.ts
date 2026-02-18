import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

type Session = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    [key: string]: unknown;
  };
  session: {
    userId: string;
    activeOrganizationId?: string | null;
    [key: string]: unknown;
  };
};

const authRoutes = [
  "/signin",
  "/signup",
  "/reset-password",
  "/forgot-password",
  "/email-verified"
];

const protectedRoutes = ["/admin", "/account"];

/**
 * Derive user type directly from the already-fetched session.
 * This avoids a second network call and works reliably in Edge middleware.
 */
function deriveUserType(session: Session): "systemAdmin" | "companyOwner" | "user" {
  if (session.user.role === "admin") return "systemAdmin";
  if (session.session.activeOrganizationId) return "companyOwner";
  return "user";
}

export default async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtectedPath = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (authRoutes.includes(pathname) || isProtectedPath) {
    // Fetch session once — reuse everywhere below
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:4000",
        headers: {
          cookie: request.headers.get("cookie") || ""
        }
      }
    );

    // If Auth route and Already authenticated,
    // Redirect back to appropriate path
    if (authRoutes.includes(pathname) && session) {
      const userType = deriveUserType(session);

      if (userType === "systemAdmin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      return NextResponse.redirect(new URL("/account", request.url));
    }

    // If protected route and Not authenticated,
    // Redirect back to signin
    if (isProtectedPath && !session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // If authenticated, and trying to access '/account'
    if (session && pathname.startsWith("/account")) {
      // Admin users should always go to /admin
      if (session.user.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      /**
       * If user has no active organization, try to set one.
       * Forward the Set-Cookie from the org-switch response so it actually persists.
       */
      if (!session.session.activeOrganizationId) {
        const { data: organizationsList } = await betterFetch(
          "/api/auth/organization/list",
          {
            baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:4000",
            headers: {
              cookie: request.headers.get("cookie") || ""
            }
          }
        );

        const orgId = (organizationsList as any[])?.[0]?.id as string;
        const orgRole = (organizationsList as any[])?.[0]?.role as string;

        if (orgId && orgRole !== "member") {
          const switchRes = await betterFetch(
            "/api/auth/organization/set-active",
            {
              baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:4000",
              headers: {
                cookie: request.headers.get("cookie") || ""
              },
              method: "POST",
              body: { organizationId: orgId }
            }
          );

          // Forward Set-Cookie headers so the browser actually persists the org switch
          const response = NextResponse.next();
          const setCookie = (switchRes as any)?.headers?.get?.("set-cookie");
          if (setCookie) {
            response.headers.set("set-cookie", setCookie);
          }

          console.log(
            `Agent '${session.session.userId}' switched to organization: '${orgId}'`
          );
          return response;
        }
      }
    }

    // If authenticated, and trying to access '/admin'
    if (session && pathname.startsWith("/admin")) {
      // Use the same session we already fetched — no separate getUserType() call
      if (session.user.role === "admin") {
        return NextResponse.next();
      }

      // Non-admin users get sent to /account
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
