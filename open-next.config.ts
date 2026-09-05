import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // Enable R2 for persistent caching
  incrementalCache: r2IncrementalCache,

  // Optional: Enable cache interception for better cold start performance
  // This is useful for ISR/SSG routes
  enableCacheInterception: true,
});
