export interface Product {
	id: string;
	name: string;
	description: string;
	price: string;
	imageUrl: string;
	affiliateLink: string;
	createdAt: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
}

export interface ProductInput {
	name: string;
	description: string;
	price: string;
	imageUrl: string;
	affiliateLink: string;
}
