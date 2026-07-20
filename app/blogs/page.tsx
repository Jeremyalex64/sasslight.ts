import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: 'How to Choose the Right Affiliate Products',
      excerpt: 'Learn the key factors to consider when selecting affiliate products to promote on your platform.',
      date: 'July 15, 2026',
      category: 'Affiliate Marketing',
    },
    {
      id: 2,
      title: 'Maximizing Your Affiliate Revenue',
      excerpt: 'Strategies and tips to increase your affiliate earnings and build a sustainable income stream.',
      date: 'July 10, 2026',
      category: 'Marketing Tips',
    },
    {
      id: 3,
      title: 'Understanding Digital Product Trends',
      excerpt: 'Stay ahead of the curve with insights into the latest digital product trends and consumer behavior.',
      date: 'July 5, 2026',
      category: 'Industry Insights',
    },
    {
      id: 4,
      title: 'Building Trust with Your Audience',
      excerpt: 'Essential practices for establishing credibility and trust with your affiliate marketing audience.',
      date: 'June 28, 2026',
      category: 'Business Growth',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-900">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <button className="text-amber-600 font-medium hover:text-amber-700 transition">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
