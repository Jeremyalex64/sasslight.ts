"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../sanity.config";
import { useEffect } from "react";

export default function StudioPage() {
  useEffect(() => {
    // Add noindex meta tag to prevent SEO indexing
    let metaTag = document.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement;
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "robots";
      document.head.appendChild(metaTag);
    }
    metaTag.content = "noindex, nofollow";
  }, []);

  return <NextStudio config={config} />;
}
