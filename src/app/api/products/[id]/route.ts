import { NextResponse } from "next/server";
import { removeProduct } from "@/lib/products";
import { requireAdmin } from "@/lib/auth";

export async function DELETE(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		await requireAdmin();
	} catch {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const removed = await removeProduct(id);

	if (!removed) {
		return NextResponse.json({ error: "Product not found" }, { status: 404 });
	}

	return NextResponse.json({ success: true });
}
