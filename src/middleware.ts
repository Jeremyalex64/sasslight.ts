import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_session";
const PROTECTED_ROUTES = ["/admin", "/add-product"];

function getSecret() {
	const secret = process.env.ADMIN_SECRET || "dev-secret-change-in-production";
	return new TextEncoder().encode(secret);
}

async function isAuthenticated(request: NextRequest) {
	const token = request.cookies.get(COOKIE_NAME)?.value;
	if (!token) return false;

	try {
		const { payload } = await jwtVerify(token, getSecret());
		return payload.role === "admin";
	} catch {
		return false;
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
		const authenticated = await isAuthenticated(request);
		if (!authenticated) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("redirect", pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/add-product/:path*"],
};
