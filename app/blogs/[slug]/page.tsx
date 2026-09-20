import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import PortableText from "@/src/components/PortableText";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image-url";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: true,
  loading: () => <nav className="h-16 bg-white shadow-sm" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => <footer className="h-16 bg-gray-900" />,
});

export const revalidate = 1800; // Revalidate every 30 minutes

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  content: any[];
  coverImage?: any;
  author?: {
    name: string;
  };
  categories?: string[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `
    *[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      content,
      coverImage,
      author->{name},
      categories
    }
  `;
  const post = await client.fetch(query, { slug });
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} - Sasslight Blog`,
    description: post.excerpt || `Read ${post.title} on Sasslight Blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Sasslight Blog`,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage ? [urlFor(post.coverImage).url()] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Main content - 768px max width */}
            <article className="flex-1 max-w-3xl w-full">
              {post.coverImage && (
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={urlFor(post.coverImage).url()}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <header className="mb-6 sm:mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  {post.categories?.map((category) => (
                    <span
                      key={category}
                      className="text-xs sm:text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  {post.author && <span>By {post.author.name}</span>}
                  <span>•</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </header>

              {post.excerpt && (
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-lg max-w-none">
                <PortableText value={post.content} />
              </div>
            </article>

            {/* Sidebar - 300px width, hidden on mobile, shows on tablet/desktop */}
            <aside className="w-full lg:w-80 space-y-4 sm:space-y-6">
              {/* Ad Space */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="text-center text-gray-400 text-xs sm:text-sm">
                  Advertisement Space
                </div>
                <div className="w-full h-48 sm:h-64 bg-gray-100 rounded mt-2 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    300x250 Ad
                  </span>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Categories
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {post.categories?.map((category) => (
                    <li key={category}>
                      <a
                        href={`/blogs?category=${category}`}
                        className="block text-sm sm:text-base text-gray-600 hover:text-amber-600 transition py-1 sm:py-0"
                        aria-label={`Browse more posts in ${category} category`}
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Related Posts
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="text-gray-400 text-xs sm:text-sm">
                    Related posts will appear here
                  </div>
                </div>
              </div>

              {/* Another Ad Space */}
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="w-full h-48 sm:h-64 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    300x250 Ad
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
