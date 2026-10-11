"use client";

import { useTranslations } from "next-intl";
import { tile } from "@/components/ui/tile";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";

const NotFoundPage = () => {
	const t = useTranslations();

	return (
		<div className={cn(tile, "flex flex-col items-start gap-5 p-8 sm:p-10")}>
			<p className="font-bold leading-none text-8xl font-display text-primary-strong">
				404
			</p>
			<h1 className="text-3xl font-bold font-display">Page not found</h1>
			<p className="max-w-md text-muted-foreground">
				{t("notFound.description")}
			</p>
			<Link
				href="/"
				className="inline-flex items-center px-5 text-sm font-semibold rounded-xl min-h-11 bg-primary text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
			>
				{t("notFound.back_home")}
			</Link>
		</div>
	);
};

export default NotFoundPage;
