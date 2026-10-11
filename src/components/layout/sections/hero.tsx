"use client";

import {
	ArrowUpRightIcon,
	AudioLinesIcon,
	BotIcon,
	CableIcon,
	GlobeIcon,
	type LucideIcon,
	SmartphoneIcon,
	SparklesIcon,
	ZapIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { arrowOut, tile, tileLabel } from "@/components/ui/tile";
import { ALL_PROJECTS, SKILL_LIST } from "@/constants";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

const ICON: Record<string, string> = Object.fromEntries(
	SKILL_LIST.map((s) => [s.name, s.icon]),
);
ICON["React Native"] = ICON.React;
// no logo file for these; a glyph keeps every chip the same shape
const GLYPH: Record<string, LucideIcon> = {
	ConnectRPC: CableIcon,
	FastAPI: ZapIcon,
	"home.ai_streaming": SparklesIcon,
	"home.ai_voice": AudioLinesIcon,
};

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

// outcomes, not tools (that's Range): each kind of work with two real, linked examples
const project = (name: string) => {
	const p = ALL_PROJECTS.find((x) => x.name === name);
	return { name, link: p?.link ?? "" };
};
const BUILD = [
	{
		key: "ai",
		icon: BotIcon,
		examples: [project("ILMUChat"), project("Revocall")],
	},
	{
		key: "web",
		icon: GlobeIcon,
		examples: [project("Astro News Portals"), project("Regal Global")],
	},
	{
		key: "mobile",
		icon: SmartphoneIcon,
		// store listings as linked from ilmu.ai
		examples: [
			{
				name: "ILMUChat Android",
				link: "https://play.google.com/store/apps/details?id=com.ytlailabs.ilmu.chat",
			},
			{
				name: "ILMUChat iOS",
				link: "https://apps.apple.com/app/ilmuchat/id6748936268",
			},
		],
	},
];

/** Home · about: what I build (outcomes) + the range of the stack, by layer. */
const HeroSection = () => {
	const t = useTranslations();

	return (
		<Cascade id="about" className="grid grid-cols-1 gap-3.5">
			<CascadeItem className={cn(tile, "flex flex-col gap-5 p-5 sm:p-6")}>
				<h2 className={tileLabel}>{t("home.build.label")}</h2>
				{/* hairline-divided columns, not nested cards; stacks below md */}
				<div className="grid gap-5 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
					{BUILD.map(({ key, icon: Icon, examples }) => (
						<div
							key={key}
							className="flex flex-col gap-2 max-md:border-t max-md:border-border max-md:pt-5 max-md:first:border-t-0 max-md:first:pt-0 md:px-5 md:first:pl-0 md:last:pr-0"
						>
							<span className="grid mb-1 rounded-xl size-9 place-items-center bg-primary/10 text-primary-strong">
								<Icon aria-hidden="true" className="size-4.5" />
							</span>
							<h3 className="text-lg font-semibold leading-snug font-display">
								{t(`home.build.${key}.title`)}
							</h3>
							<p className="text-sm text-muted-foreground">
								{t(`home.build.${key}.body`)}
							</p>
							<p className="flex flex-wrap pt-1 mt-auto text-sm gap-x-3 gap-y-1">
								{examples.map((p) => (
									<a
										key={p.name}
										href={p.link}
										target="_blank"
										rel="noopener noreferrer"
										className="font-medium rounded group hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
									>
										{p.name}
										<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
									</a>
								))}
							</p>
						</div>
					))}
				</div>
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
								{items.map((item) => {
									const Glyph = GLYPH[item];
									return (
										<span
											key={item}
											className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-full bg-secondary"
										>
											{ICON[item] ? (
												<Image
													src={ICON[item]}
													width={14}
													height={14}
													alt=""
													aria-hidden="true"
												/>
											) : (
												Glyph && (
													<Glyph
														aria-hidden="true"
														className="size-3.5 text-primary-strong"
													/>
												)
											)}
											{item.startsWith("home.") ? t(item) : item}
										</span>
									);
								})}
							</dd>
						</div>
					))}
				</dl>
			</CascadeItem>
		</Cascade>
	);
};

export default HeroSection;
