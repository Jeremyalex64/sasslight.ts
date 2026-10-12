import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Temporarily disabled to debug CPU timeout
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/studio/:path*"],
};
