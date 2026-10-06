// import { createClient } from "@sanity/client";

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
// const apiVersion = "2024-01-01";

// /** Public read client — CDN-backed for published content */
// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true,
// });

// /**
//  * Authenticated client — uses SANITY_API_TOKEN for drafts, previews, and writes.
//  * Never expose this client to the browser.
//  */
// export const writeClient = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// });
import { createClient } from "@sanity/client";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

/** Public read client — CDN-backed for published content */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Authenticated client — uses SANITY_API_TOKEN for drafts, previews, and writes.
 * Never expose this client to the browser.
 *
 * IMPORTANT: We initialize this lazily inside a function to ensure the
 * Cloudflare runtime environment (process.env) is populated first.
 */
let _writeClient: ReturnType<typeof createClient> | undefined;

export function getWriteClient() {
  if (!_writeClient) {
    // Access the environment within the request context
    const { env } = getCloudflareContext();

    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: env.SANITY_API_TOKEN, // ✅ Read from the Cloudflare context
    });
  }
  return _writeClient;
}
