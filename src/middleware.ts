import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]); // 受保护路由如果未登录，将重定向到登录页面

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
//默认情况下，clerkMiddleware（） 不会保护任何路由。所有路由都是公有的，您必须选择启用路由保护。请参阅 clerkMiddleware（） 参考 来了解如何要求对特定路由进行身份验证。
