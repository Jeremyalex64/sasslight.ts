import { redirect } from "next/navigation";

// Redirect to externally hosted Sanity Studio
const EXTERNAL_STUDIO_URL = "https://livesites.sanity.studio/";

export default function StudioPage() {
  redirect(EXTERNAL_STUDIO_URL);
}
