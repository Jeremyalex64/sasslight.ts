import { NextRequest, NextResponse } from "next/server";
import { deleteProduct, updateProduct } from "@/lib/products";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const { id } = params;
    console.log("DELETE request for product ID:", id);
    const success = deleteProduct(id);

    if (!success) {
      console.log("Product not found:", id);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Product deleted successfully:", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const { id } = params;
    const updates = await request.json();
    console.log("PUT request for product ID:", id, "updates:", updates);
    const updated = updateProduct(id, updates);

    if (!updated) {
      console.log("Product not found for update:", id);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log("Product updated successfully:", id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}
