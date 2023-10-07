import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

// export default withClerkMiddleware(() => {
//   //console.log("middleware running...");
//   return NextResponse.next();
// });

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/api/checkout",
    "/api/stripe",
    "/api/conversation",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
