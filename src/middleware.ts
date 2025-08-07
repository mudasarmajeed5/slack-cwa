import { convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
const isPublicPage = createRouteMatcher(["/auth"])

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isPublic = isPublicPage(request);
  if (!isPublic && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/auth")
  }
  if (isPublic && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/")
  }
  // redirect user to some other page if user is authenticated. 
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};