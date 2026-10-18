import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/products";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Content-Encoding": "gzip",
      },
    });
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
      categories: string[];
    };
    const { name, description, image, affiliateLink, price, categories } = body;

    if (
      !name ||
      !description ||
      !image ||
      !affiliateLink ||
      !price ||
      !categories ||
      categories.length === 0
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
      categories,
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
