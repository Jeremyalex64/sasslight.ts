import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/products";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name: string;
      description: string;
      image: string;
      affiliateLink: string;
      price: string;
      category: string;
    };
    const { name, description, image, affiliateLink, price, category } = body;

    if (
      !name ||
      !description ||
      !image ||
      !affiliateLink ||
      !price ||
      !category
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newProduct = await addProduct({
      name,
      description,
      image,
      affiliateLink,
      price,
      category,
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
