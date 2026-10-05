import { client } from "./client";

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: unknown;
  author?: string;
  categories?: string[];
}

export interface BlogPost extends BlogPostListItem {
  content: unknown[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: unknown;
    noIndex?: boolean;
    keywords?: string[];
  };
}

const postListFields = `
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage,
  author,
  categories
`;

const postFields = `
  ${postListFields},
  content,
  seo
`;

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  return client.fetch(
    `*[_type == "blog" && defined(slug.current)] | order(publishedAt desc) {
      ${postListFields}
    }`,
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      ${postFields}
    }`,
    { slug },
  );
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "blog" && defined(slug.current)].slug.current`,
  );
}

export async function getRelatedPosts(
  slug: string,
  categories: string[] = [],
  limit = 3,
): Promise<BlogPostListItem[]> {
  if (categories.length > 0) {
    const related = await client.fetch<BlogPostListItem[]>(
      `*[_type == "blog" && slug.current != $slug && count((categories[@] in $categories)) > 0] | order(publishedAt desc)[0...$limit]{
        ${postListFields}
      }`,
      { slug, categories, limit },
    );

    if (related.length > 0) {
      return related;
    }
  }

  return client.fetch(
    `*[_type == "blog" && slug.current != $slug] | order(publishedAt desc)[0...$limit]{
      ${postListFields}
    }`,
    { slug, limit },
  );
}

export async function getSitemapPosts(): Promise<
  { slug: string; publishedAt: string }[]
> {
  return client.fetch(
    `*[_type == "blog" && defined(slug.current) && !(seo.noIndex == true)]{
      "slug": slug.current,
      publishedAt
    }`,
  );
}
