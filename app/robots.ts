import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://sasslight.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/admin", "/api"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
