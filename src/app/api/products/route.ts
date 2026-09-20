import { NextResponse } from "next/server";
import { getProducts, addProduct, type Product } from "@/lib/products";
import { requireAdmin } from "@/src/lib/auth";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Omit<Product, "id" | "createdAt">;

    if (
      !body.name ||
      !body.description ||
      !body.price ||
      !body.image ||
      !body.affiliateLink
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const product = addProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
