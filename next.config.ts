import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "sasslight.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [64, 128, 256],
    unoptimized: false,
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "@portabletext/react",
      "@sanity/client",
      "sanity",
      "next-sanity",
    ],
    optimizeServerReact: true,
  },
  output: "standalone",
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,
  turbopack: {},
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
