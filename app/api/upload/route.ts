import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    // Use Cloudflare R2 binding
    // @ts-expect-error - Cloudflare R2 binding
    const r2 = env?.CACHE_BUCKET;

    if (!r2) {
      return NextResponse.json(
        { error: "R2 bucket not configured" },
        { status: 500 },
      );
    }

    await r2.put(fileName, buffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Construct public URL for the R2 bucket
    const url = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${fileName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
