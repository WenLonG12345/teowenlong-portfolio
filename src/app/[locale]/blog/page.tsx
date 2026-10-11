import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetadataProps } from "@/constants/types";
import { getMediumArticles } from "@/utils/api";
import { getAllPosts } from "@/utils/blog";
import getQueryClient from "@/utils/getQueryClient";
import BlogClient from "./Blog";

export async function generateMetadata({
	params,
}: MetadataProps): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });

	return {
		title: t("blog.title"),
		description: t("blog.lede"),
		icons: { icon: "/favicon.ico" },
		openGraph: {
			type: "website",
			title: t("blog.title"),
			url: "/blog",
			description: t("blog.lede"),
			images: ["/og_image.png"],
		},
		twitter: {
			card: "summary_large_image",
			title: t("blog.title"),
			site: "/blog",
			description: t("blog.lede"),
			images: ["/og_image.png"],
		},
	};
}

const BlogPage = async () => {
	const posts = getAllPosts();

	const queryClient = getQueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["articles"],
		queryFn: () => getMediumArticles(process.env.MEDIUM_USERNAME || ""),
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<BlogClient posts={posts} />
		</HydrationBoundary>
	);
};

export default BlogPage;
