import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 50, 25],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
  },
  // Production optimizations
  compress: true,
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Remove React prop types in production
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ["@portabletext/react", "@sanity/client"],
    optimizeServerReact: true,
  },
  // Reduce output size
  output: "standalone",
  // Disable source maps in production to reduce payload
  productionBrowserSourceMaps: false,
  // Additional payload reduction
  poweredByHeader: false,
  generateEtags: true,
  // Turbopack config
  turbopack: {},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
