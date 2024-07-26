import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPBServer } from "@/lib/pb/server";
import { log } from "console";

// For protected pages
// If auth is not valid for matching routes
// Redirect to a redirect path
export function middleware(request: NextRequest) {
  const redirect_path = new URL(request.nextUrl);
  redirect_path.pathname = "/login";

  const cookieStore = cookies();

  const { authStore } = createPBServer(cookieStore);

  if (!authStore.isValid) {
    return NextResponse.redirect(redirect_path);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login route)
     * - / (root path)
     */
    "/",
  ],
};
