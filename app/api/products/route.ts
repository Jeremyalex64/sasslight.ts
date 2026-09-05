import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/products";

export async function GET() {
  try {
    const products = getProducts();
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
    };
    const { name, description, image, affiliateLink, price } = body;

    if (!name || !description || !image || !affiliateLink || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newProduct = addProduct({
      name,
      description,
      image,
      affiliateLink,
      price,
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
