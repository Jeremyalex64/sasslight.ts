import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get bindings via OpenNext's Cloudflare context
    const { env } = getCloudflareContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r2 = (env as any).CACHE_BUCKET;
    if (!r2) {
      console.error("CACHE_BUCKET binding not found");
      return NextResponse.json(
        { error: "R2 bucket binding not configured" },
        { status: 500 },
      );
    }

    // Read file as ArrayBuffer (no Buffer needed)
    const bytes = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;

    // Upload to R2
    await r2.put(fileName, bytes, {
      httpMetadata: { contentType: file.type },
    });

    // Build a public URL using the R2_PUBLIC_URL var
    const publicBase = (env as any).R2_PUBLIC_URL;
    if (!publicBase) {
      return NextResponse.json({
        fileName,
        warning:
          "Upload succeeded but R2_PUBLIC_URL is not set. Configure it in wrangler.toml.",
      });
    }

    const url = `${publicBase.replace(/\/$/, "")}/${fileName}`;
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
