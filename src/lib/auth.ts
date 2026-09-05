import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

function getSecret() {
	const secret = process.env.ADMIN_SECRET || "dev-secret-change-in-production";
	return new TextEncoder().encode(secret);
}

export async function createSession() {
	const token = await new SignJWT({ role: "admin" })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(`${SESSION_DURATION}s`)
		.setIssuedAt()
		.sign(getSecret());

	const cookieStore = await cookies();
	cookieStore.set(COOKIE_NAME, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: SESSION_DURATION,
		path: "/",
	});
}

export async function destroySession() {
	const cookieStore = await cookies();
	cookieStore.delete(COOKIE_NAME);
}

export async function getSession() {
	const cookieStore = await cookies();
	const token = cookieStore.get(COOKIE_NAME)?.value;
	if (!token) return null;

	try {
		const { payload } = await jwtVerify(token, getSecret());
		if (payload.role !== "admin") return null;
		return { role: "admin" as const };
	} catch {
		return null;
	}
}

export async function verifyPassword(password: string) {
	const adminPassword = process.env.ADMIN_PASSWORD ?? "Jerryalex10000###";
	return password === adminPassword;
}

export async function requireAdmin() {
	const session = await getSession();
	if (!session) {
		throw new Error("Unauthorized");
	}
	return session;
}
