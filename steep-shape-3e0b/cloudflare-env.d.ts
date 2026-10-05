/* Slim Cloudflare Env types for this project.
 * For the full generated file (~500KB+), run: npm run cf-typegen
 */

interface CloudflareEnv {
  PRODUCTS_KV: KVNamespace;
  CACHE_BUCKET: R2Bucket;
  ASSETS: Fetcher;
  IMAGES: unknown;
  WORKER_SELF_REFERENCE: Fetcher;
  ADMIN_PASSWORD?: string;
  ADMIN_SECRET?: string;
  SANITY_API_TOKEN?: string;
  NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
  NEXT_PUBLIC_SANITY_DATASET?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  RESEND_TO_EMAIL?: string;
  R2_ENDPOINT?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  R2_BUCKET_NAME?: string;
  R2_PUBLIC_URL?: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    ADMIN_PASSWORD?: string;
    ADMIN_SECRET?: string;
    SANITY_API_TOKEN?: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID?: string;
    NEXT_PUBLIC_SANITY_DATASET?: string;
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    RESEND_TO_EMAIL?: string;
    R2_ENDPOINT?: string;
    R2_ACCESS_KEY_ID?: string;
    R2_SECRET_ACCESS_KEY?: string;
    R2_BUCKET_NAME?: string;
    R2_PUBLIC_URL?: string;
  }
}
