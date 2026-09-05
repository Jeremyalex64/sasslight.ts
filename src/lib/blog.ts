import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
	{
		slug: "how-to-choose-affiliate-products",
		title: "How to Choose the Best Affiliate Products",
		excerpt:
			"Learn the key criteria for selecting high-converting JVZoo products that align with your audience and niche.",
		content: `Choosing the right affiliate products is the foundation of a successful marketing strategy. Start by understanding your audience's pain points and goals.

Look for products with strong sales pages, proven conversion rates, and generous commission structures. JVZoo makes it easy to browse products by niche, gravity score, and affiliate resources.

Always test products yourself when possible. Authentic recommendations convert far better than generic promotions. Focus on quality over quantity — a few well-chosen offers outperform a cluttered catalog every time.`,
		date: "2026-06-15",
		author: "Admin",
	},
	{
		slug: "jvzoo-affiliate-tips",
		title: "5 JVZoo Affiliate Marketing Tips for Beginners",
		excerpt:
			"New to JVZoo? These five proven strategies will help you launch your first successful affiliate campaign.",
		content: `Getting started with JVZoo affiliate marketing doesn't have to be overwhelming. Here are five tips to accelerate your success:

1. **Pick a niche you know** — Your expertise builds trust with your audience.
2. **Use provided swipe copy** — Most vendors offer email templates and banners.
3. **Build an email list** — Direct communication drives the highest conversions.
4. **Track your links** — Monitor clicks and conversions to optimize campaigns.
5. **Disclose affiliate relationships** — Transparency builds long-term credibility.

Start small, measure results, and scale what works.`,
		date: "2026-06-01",
		author: "Admin",
	},
	{
		slug: "building-trust-with-your-audience",
		title: "Building Trust With Your Audience",
		excerpt:
			"Trust is the currency of affiliate marketing. Here's how to earn it and keep it.",
		content: `In affiliate marketing, your reputation is your most valuable asset. Audiences can spot insincere recommendations instantly.

Share honest reviews — including pros and cons. Only promote products you've researched thoroughly. Provide genuine value through blog posts, tutorials, and free resources before asking for a sale.

When your audience trusts you, conversions follow naturally. Focus on helping people solve problems, and the commissions become a byproduct of real value delivered.`,
		date: "2026-05-20",
		author: "Admin",
	},
];

export function getAllPosts(): BlogPost[] {
	return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((p) => p.slug === slug);
}
