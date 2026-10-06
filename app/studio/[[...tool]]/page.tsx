import { redirect } from "next/navigation";

// Redirect to externally hosted Sanity Studio
// Replace this URL with your actual external Sanity Studio URL
const EXTERNAL_STUDIO_URL = "https://your-sanity-studio-url.com";

export default function StudioPage() {
  redirect(EXTERNAL_STUDIO_URL);
}
