"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { arrowOut, tile, tileLabel, tileLift } from "@/components/ui/tile";
import type { BlogPostMeta } from "@/constants/types";
import { Link } from "@/i18n/routing";
import { getMediumArticles } from "@/utils/api";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

interface BlogClientProps {
	posts: BlogPostMeta[];
}

type Entry = {
	key: string;
	href: string;
	external: boolean;
	image?: string;
	// display-ready, e.g. "Mar 27, 2025"
	date: string;
	title: string;
	description: string;
	tags: string[];
};

const EntryTile = ({ entry }: { entry: Entry }) => {
	const body = (
		<>
			<div className="relative overflow-hidden aspect-16/9 bg-primary/10">
				{entry.image ? (
					<Image
						src={entry.image}
						alt=""
						fill
						sizes="(min-width: 768px) 400px, 100vw"
						className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
					/>
				) : (
					<span className="absolute text-5xl font-bold inset-5 font-display text-primary/40">
						{entry.title.charAt(0)}
					</span>
				)}
			</div>
			<div className="flex flex-col flex-1 gap-2.5 p-5">
				<span className={tileLabel}>{entry.date}</span>
				<span className="text-lg font-medium leading-snug font-display">
					{entry.title}
					{entry.external && (
						<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
					)}
				</span>
				<span className="text-sm text-muted-foreground line-clamp-2">
					{entry.description}
				</span>
				<span className="flex flex-wrap gap-1.5 mt-auto pt-1">
					{entry.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className="px-2.5 py-1 text-xs rounded-full bg-secondary"
						>
							{tag}
						</span>
					))}
				</span>
			</div>
		</>
	);
	const className = cn(
		tile,
		tileLift,
		"group flex flex-col h-full overflow-hidden",
	);

	return entry.external ? (
		<a
			href={entry.href}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
		>
			{body}
		</a>
	) : (
		<Link href={entry.href} className={className}>
			{body}
		</Link>
	);
};

const BlogClient = ({ posts }: BlogClientProps) => {
	const t = useTranslations();

	const articlesQuery = useQuery({
		queryKey: ["articles"],
		queryFn: () =>
			getMediumArticles(process.env.NEXT_PUBLIC_MEDIUM_USERNAME || ""),
	});

	const local: Entry[] = posts.map((post) => ({
		key: post.slug,
		href: `/blog/${post.slug}`,
		external: false,
		image: post.coverImage || undefined,
		date: dayjs(post.date).format("MMM D, YYYY"),
		title: post.title,
		description: post.description,
		tags: post.tags,
	}));
	const medium: Entry[] = (articlesQuery.data ?? []).map((a) => ({
		key: a.url,
		href: a.url,
		external: true,
		image: a.thumbnail || undefined,
		date: a.date,
		title: a.title,
		description: a.description,
		tags: a.categories,
	}));

	return (
		<div className="flex flex-col gap-14">
			<header className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight font-display md:text-5xl">
					{t("blog.title")}
				</h1>
				<p className="max-w-[56ch] text-muted-foreground">{t("blog.lede")}</p>
			</header>

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-bold font-display">
					{t("blog.tab_label")}
				</h2>
				{local.length === 0 ? (
					<p className="text-muted-foreground">{t("blog.empty")}</p>
				) : (
					<Cascade className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
						{local.map((entry) => (
							<CascadeItem key={entry.key}>
								<EntryTile entry={entry} />
							</CascadeItem>
						))}
					</Cascade>
				)}
			</section>

			{/* Medium feed is empty when the username env var is unset — hide the section then */}
			{(articlesQuery.isLoading || medium.length > 0) && (
				<section className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold font-display">
						{t("blog.medium")}
					</h2>
					{articlesQuery.isLoading ? (
						<div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
							{Array.from({ length: 4 }, (_, i) => (
								<div
									key={String(i)}
									className="rounded-2xl bg-muted animate-pulse h-80 motion-reduce:animate-none"
								/>
							))}
						</div>
					) : (
						<Cascade className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
							{medium.map((entry) => (
								<CascadeItem key={entry.key}>
									<EntryTile entry={entry} />
								</CascadeItem>
							))}
						</Cascade>
					)}
				</section>
			)}
		</div>
	);
};

export default BlogClient;
