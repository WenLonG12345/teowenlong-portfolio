"use client";

import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { arrowNext, tile, tileLift } from "@/components/ui/tile";
import { SITE_CONFIG } from "@/constants";
import type { BlogPostMeta } from "@/constants/types";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

/** Home · closing row: latest post + the amber contact tile. */
const WritingSection = ({ post }: { post?: BlogPostMeta }) => {
	const t = useTranslations();

	return (
		<Cascade id="writing" className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
			<CascadeItem className="sm:col-span-2">
				<Link
					href={post ? `/blog/${post.slug}` : "/blog"}
					className={cn(tile, tileLift, "group flex flex-col h-full gap-3 p-6")}
				>
					<span className="text-sm text-muted-foreground">
						{t("home.latest_post")}
					</span>
					<span className="text-xl font-medium leading-snug font-display">
						{post ? post.title : t("home.all_writing")}
						<ArrowRightIcon aria-hidden="true" className={arrowNext} />
					</span>
				</Link>
			</CascadeItem>
			<CascadeItem>
				<a
					href={`mailto:${SITE_CONFIG.contact.email}`}
					className={cn(
						tileLift,
						"group flex flex-col justify-between h-full gap-5 p-6 rounded-2xl bg-primary text-primary-foreground",
					)}
				>
					<span className="flex justify-end">
						<span className="grid shrink-0 rounded-full size-9 place-items-center border transition-colors duration-200 motion-reduce:transition-none border-primary-foreground/30 group-hover:bg-primary-foreground group-hover:text-primary">
							<ArrowRightIcon
								aria-hidden="true"
								className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
							/>
						</span>
					</span>
					<span className="text-2xl font-bold leading-tight font-display">
						{t("home.contact_cta")}
					</span>
				</a>
			</CascadeItem>
		</Cascade>
	);
};

export default WritingSection;
