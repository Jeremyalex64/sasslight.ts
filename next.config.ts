import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 70, 70, 70, 70, 70, 70, 75],
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     qualities: [100, 70, 70, 70, 70, 70, 70, 75],
//     remotePatterns: [
//       { protocol: "https", hostname: "**" },
//       { protocol: "http", hostname: "**" },
//     ],
//   },
// };

// export default nextConfig;

// // Enable calling `getCloudflareContext()` in `next dev`.
// // See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
// import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// initOpenNextCloudflareForDev();
