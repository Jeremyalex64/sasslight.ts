import { NextResponse } from "next/server";
import { getAllProducts, addProduct } from "@/lib/products";
import { requireAdmin } from "@/lib/auth";
import type { ProductInput } from "@/lib/types";

export async function GET() {
	const products = await getAllProducts();
	return NextResponse.json(products);
}

export async function POST(request: Request) {
	try {
		await requireAdmin();
	} catch {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = (await request.json()) as ProductInput;

		if (!body.name || !body.description || !body.price || !body.imageUrl || !body.affiliateLink) {
			return NextResponse.json({ error: "All fields are required" }, { status: 400 });
		}

		const product = await addProduct(body);
		return NextResponse.json(product, { status: 201 });
	} catch {
		return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
	}
}
