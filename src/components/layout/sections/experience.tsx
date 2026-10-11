"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { arrowNext } from "@/components/ui/tile";
import { CAREER_LIST } from "@/constants";
import { Link } from "@/i18n/routing";
import { Cascade, CascadeItem } from "@/utils/motion-div";

// the internship stays on /about; home shows the roles that carry the story, current first
const ROLES = CAREER_LIST.filter((c) => c.highlight);

// "Aug 2025 - Jun 2026" → "2025—2026"; months live on /about
const years = (period: string) =>
	period
		.replace(/[A-Za-z]+ (\d{4})/g, "$1")
		.replace(/\s*-\s*/, "—")
		.replace("Present", "now");

/** Home · experience: a timeline, not tiles — the one section that breaks the card rhythm. */
const ExperienceSection = () => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<section id="experience" className="flex flex-col gap-6">
			<h2 className="text-2xl font-bold font-display">
				{t("home.experience")}
			</h2>
			<Cascade className="flex flex-col">
				{ROLES.map((role) => (
					<CascadeItem
						key={role.title}
						// hairline from this logo down to the next one
						className="relative pb-9 pl-16 last:pb-0 after:absolute after:top-14 after:bottom-3 after:left-5 after:w-px after:bg-border last:after:hidden"
					>
						<Image
							src={role.logo}
							alt=""
							width={40}
							height={40}
							className="absolute top-0 left-0 object-cover border size-10 rounded-xl border-border bg-card"
						/>
						<Link
							href="/about"
							className="flex flex-col gap-1.5 rounded-lg group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
						>
							<span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
								<span className="font-semibold transition-colors group-hover:text-primary-strong">
									{role.title}
									<ArrowRightIcon aria-hidden="true" className={arrowNext} />
								</span>
								<span className="font-mono text-xs text-muted-foreground">
									{years(role.period)}
								</span>
							</span>
							<span className="text-[13px] text-muted-foreground">
								{role.role}
							</span>
							<span className="mt-1 text-[15px] text-foreground/85">
								{role.metric && (
									<span className="mr-1.5 text-xl font-bold font-display text-primary-strong">
										{role.metric}
									</span>
								)}
								{locale === "zh" ? role.highlight_zh : role.highlight}
							</span>
							<span className="font-mono text-xs text-muted-foreground">
								{role.skills.slice(0, 4).join(" · ")}
							</span>
						</Link>
					</CascadeItem>
				))}
			</Cascade>
			<Link
				href="/about"
				className="self-start text-sm font-semibold group hover:text-primary-strong"
			>
				{t("home.full_experience")}
				<ArrowRightIcon aria-hidden="true" className={arrowNext} />
			</Link>
		</section>
	);
};

export default ExperienceSection;
