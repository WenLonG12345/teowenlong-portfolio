import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/blog";

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts();

	const blogPostEntries: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `https://teowenlong.vercel.app/blog/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	return [
		{
			url: "https://teowenlong.vercel.app",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://teowenlong.vercel.app/about",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://teowenlong.vercel.app/projects",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://teowenlong.vercel.app/blog",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://teowenlong.vercel.app/contact",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		...blogPostEntries,
	];
}
