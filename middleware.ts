import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /studio (and sub-paths) to the hosted Sanity Studio
  if (pathname.startsWith("/studio")) {
    return NextResponse.redirect("https://sasslight2.sanity.studio");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/studio/:path*"],
};
