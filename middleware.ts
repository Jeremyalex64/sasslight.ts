import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect admin dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const authCookie = request.cookies.get("adminAuth");
    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 2. Redirect /studio (and sub-paths) to the hosted Sanity Studio
  if (pathname.startsWith("/studio")) {
    return NextResponse.redirect("https://sasslight2.sanity.studio");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/studio/:path*"],
};