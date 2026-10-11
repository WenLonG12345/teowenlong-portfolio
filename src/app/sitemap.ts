import type { MetadataRoute } from "next";
import { METADATA } from "@/constants";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/utils/blog";
import { localePath } from "@/utils/seo";

const PAGES = ["/", "/about", "/projects", "/blog", "/contact"];
const abs = (path: string) => `${METADATA.url}${path === "/" ? "" : path}`;

// No priority/changeFrequency (Google ignores both) and no build-time lastModified on
// static pages: a date that changes every deploy teaches crawlers to ignore it.
export default function sitemap(): MetadataRoute.Sitemap {
	const pages = routing.locales.flatMap((locale) =>
		PAGES.map((path) => ({
			url: abs(localePath(locale, path)),
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((l) => [l, abs(localePath(l, path))]),
				),
			},
		})),
	);

	// posts are English-only; the /zh copies canonicalise to these, so they stay out
	const posts = getAllPosts().map((post) => ({
		url: abs(`/blog/${post.slug}`),
		lastModified: new Date(post.date),
	}));

	return [...pages, ...posts];
}
