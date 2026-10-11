import { useTranslations } from "next-intl";
import { cn } from "@/utils/cn";

/** Where a project came from, pinned to the top-left of its image. twlworks gets the amber. */
export const OriginBadge = ({ category }: { category: string }) => {
	const t = useTranslations();
	const studio = category === "project.freelance";

	return (
		<>
			{/* screenshots are busy marketing banners; a soft scrim keeps the pills legible */}
			<span
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-linear-to-b from-black/45 to-transparent"
			/>
			<span
				className={cn(
					"absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full",
					studio
						? "bg-primary text-primary-foreground"
						: "bg-card/90 text-muted-foreground",
				)}
			>
				{studio ? "twlworks" : t(category)}
			</span>
		</>
	);
};
