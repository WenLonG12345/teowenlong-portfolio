import dayjs from "dayjs";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { tileLabel } from "@/components/ui/tile";
import { Link } from "@/i18n/routing";
import { getAllPosts, getPostBySlug } from "@/utils/blog";
import { ReadingProgress } from "@/utils/motion-div";
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

	return {
		title: post.title,
		description: post.description,
		icons: { icon: "/favicon.ico" },
		openGraph: {
			type: "article",
			title: post.title,
			url: `/blog/${slug}`,
			description: post.description,
			images: post.coverImage ? [post.coverImage] : ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: post.coverImage ? [post.coverImage] : ["/og_image.png"],
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
