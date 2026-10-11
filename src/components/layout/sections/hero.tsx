"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { arrowOut, tile, tileLabel, tileLift } from "@/components/ui/tile";
import { CAREER_LIST, SKILL_LIST } from "@/constants";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

const [NOW] = CAREER_LIST;
const ICON = Object.fromEntries(SKILL_LIST.map((s) => [s.name, s.icon]));

// what each layer of the stack covers; names without a logo in SKILL_LIST render as plain chips
const RANGE = [
	{
		layer: "interface",
		items: ["React", "NextJS", "Typescript", "TailwindCSS"],
	},
	{ layer: "services", items: ["Golang", "ConnectRPC", "FastAPI"] },
	{ layer: "ai", items: ["home.ai_streaming", "home.ai_voice"] },
	{ layer: "cloud", items: ["AWS", "Cloudflare", "CI/CD"] },
	{ layer: "mobile", items: ["Android", "Kotlin", "React Native"] },
];

/** Home · about: what I'm building now + the range of the stack, by layer. */
const HeroSection = () => {
	const t = useTranslations();

	return (
		<Cascade id="about" className="grid grid-cols-1 gap-3.5">
			<CascadeItem>
				<a
					href={NOW.url}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						tile,
						tileLift,
						"group flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6",
					)}
				>
					<Image
						src={NOW.logo}
						alt=""
						width={56}
						height={56}
						className="object-cover border size-14 shrink-0 rounded-2xl border-border"
					/>
					<span className="flex flex-col gap-1.5">
						<span className={tileLabel}>{t("home.now_building")}</span>
						<span className="text-xl font-semibold leading-snug font-display">
							{t("home.now_title")}
							<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
						</span>
						<span className="text-sm text-muted-foreground">
							{t("home.now_body")}
						</span>
					</span>
				</a>
			</CascadeItem>

			<CascadeItem className={cn(tile, "flex flex-col gap-4 p-5 sm:p-6")}>
				<span className={tileLabel}>{t("home.range")}</span>
				<dl className="flex flex-col gap-3.5">
					{RANGE.map(({ layer, items }) => (
						<div
							key={layer}
							className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center"
						>
							<dt className="text-sm font-medium text-muted-foreground">
								{t(`home.layers.${layer}`)}
							</dt>
							<dd className="flex flex-wrap gap-2">
								{items.map((item) => (
									<span
										key={item}
										className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-full bg-secondary"
									>
										{ICON[item] && (
											<Image
												src={ICON[item]}
												width={14}
												height={14}
												alt=""
												aria-hidden="true"
											/>
										)}
										{item.startsWith("home.") ? t(item) : item}
									</span>
								))}
							</dd>
						</div>
					))}
				</dl>
			</CascadeItem>
		</Cascade>
	);
};

export default HeroSection;
