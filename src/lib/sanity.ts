import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function getAllPosts() {
  const query = `*[_type == "blog" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    coverImage,
    author,
    categories,
    seo
  }`;
  return await client.fetch(query);
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    coverImage,
    author,
    categories,
    seo
  }`;
  return await client.fetch(query, { slug });
}

export async function getPostSlugs() {
  const query = `*[_type == "blog" && !(_id in path("drafts.**"))].slug.current`;
  return await client.fetch(query);
}
