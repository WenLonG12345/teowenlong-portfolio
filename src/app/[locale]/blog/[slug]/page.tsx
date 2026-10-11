import dayjs from "dayjs";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { tileLabel } from "@/components/ui/tile";
import { METADATA } from "@/constants";
import { Link } from "@/i18n/routing";
import { getAllPosts, getPostBySlug } from "@/utils/blog";
import { ReadingProgress } from "@/utils/motion-div";
import { jsonLd, PERSON } from "@/utils/seo";
import ShareButtons from "./ShareButtons";

interface BlogPostPageProps {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { slug, locale } = await params;
	const post = await getPostBySlug(slug);
	const t = await getTranslations({ locale });

	if (!post) {
		return { title: t("notFound.description") };
	}

	const path = `/blog/${slug}`;
	const ogImage = `/api/og/blog/${slug}`;
	return {
		title: post.title,
		description: post.description,
		// posts are written once, in English: /zh/blog/* serves the same text, so both point here
		alternates: { canonical: path },
		openGraph: {
			type: "article",
			siteName: METADATA.name,
			url: path,
			title: post.title,
			description: post.description,
			publishedTime: new Date(post.date).toISOString(),
			authors: [METADATA.url],
			tags: post.tags,
			images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [ogImage],
		},
	};
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
	const { slug, locale } = await params;
	const post = await getPostBySlug(slug);
	const t = await getTranslations({ locale });

	if (!post) {
		notFound();
	}

	return (
		<article className="max-w-3xl">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD from local post front matter, `<` escaped in jsonLd()
				dangerouslySetInnerHTML={jsonLd({
					"@type": "BlogPosting",
					headline: post.title,
					description: post.description,
					datePublished: new Date(post.date).toISOString(),
					url: `${METADATA.url}/blog/${post.slug}`,
					mainEntityOfPage: `${METADATA.url}/blog/${post.slug}`,
					image: `${METADATA.url}/api/og/blog/${post.slug}`,
					keywords: post.tags.join(", "),
					inLanguage: "en",
					author: { "@id": PERSON["@id"], name: PERSON.name, url: PERSON.url },
				})}
			/>
			<ReadingProgress />
			<Link
				href="/blog"
				className="inline-flex items-center gap-2 mb-10 text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				<ArrowLeftIcon className="size-4" aria-hidden="true" />
				{t("blog.back")}
			</Link>

			<header className="flex flex-col gap-4 mb-10">
				<span className={tileLabel}>
					{dayjs(post.date).format("MMMM D, YYYY")}
				</span>
				<h1 className="text-4xl font-bold leading-tight tracking-tight font-display md:text-5xl">
					{post.title}
				</h1>
				<p className="text-lg text-muted-foreground">{post.description}</p>
				<div className="flex flex-wrap gap-1.5">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary-strong"
						>
							{tag}
						</span>
					))}
				</div>
				<ShareButtons title={post.title} slug={post.slug} />
			</header>

			{post.coverImage && (
				<div className="relative w-full mb-10 overflow-hidden border h-70 md:h-95 rounded-2xl border-border">
					<Image
						src={post.coverImage}
						alt={post.title}
						fill
						className="object-cover"
						priority
					/>
				</div>
			)}

			<div
				className="prose"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: trusted local markdown content
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>

			<div className="mt-12 pt-8 border-t border-border">
				<ShareButtons title={post.title} slug={post.slug} />
			</div>
		</article>
	);
};

export default BlogPostPage;
