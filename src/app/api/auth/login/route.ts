import { NextResponse } from "next/server";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
	try {
		const { password } = (await request.json()) as { password?: string };

		if (!password) {
			return NextResponse.json({ error: "Password is required" }, { status: 400 });
		}

		const valid = await verifyPassword(password);
		if (!valid) {
			return NextResponse.json({ error: "Invalid password" }, { status: 401 });
		}

		await createSession();
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Login failed" }, { status: 500 });
	}
}

export async function DELETE() {
	await destroySession();
	return NextResponse.json({ success: true });
}
