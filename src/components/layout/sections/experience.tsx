"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { arrowNext, tile, tileLift } from "@/components/ui/tile";
import { CAREER_LIST } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

// the internship stays on /about; home shows the four roles that carry the story
const ROLES = CAREER_LIST.filter((c) => c.highlight);

// "Aug 2025 - Jun 2026" → "2025—2026"; months live on /about
const years = (period: string) =>
	period
		.replace(/[A-Za-z]+ (\d{4})/g, "$1")
		.replace(/\s*-\s*/, "—")
		.replace("Present", "now");

/** Home · experience: one tile per role, one line each; detail lives on /about. */
const ExperienceSection = () => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<section id="experience" className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold font-display">
				{t("home.experience")}
			</h2>
			<Cascade className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
				{ROLES.map((role) => (
					<CascadeItem key={role.title}>
						<Link
							href="/about"
							className={cn(
								tile,
								tileLift,
								"group flex flex-col h-full gap-3.5 p-5",
							)}
						>
							<div className="flex items-center gap-3">
								<Image
									src={role.logo}
									alt=""
									width={40}
									height={40}
									className="object-cover border rounded-lg size-10 border-border"
								/>
								<div className="flex-1 min-w-0">
									<p className="font-semibold transition-colors group-hover:text-primary-strong">
										{role.title}
									</p>
									<p className="text-[13px] text-muted-foreground">
										{role.role}
									</p>
								</div>
								<p className="font-mono text-xs text-muted-foreground shrink-0">
									{years(role.period)}
								</p>
							</div>
							<p className="text-[15px] text-foreground/80">
								{role.metric && (
									<span className="mr-1.5 text-xl font-bold font-display text-primary">
										{role.metric}
									</span>
								)}
								{locale === "zh" ? role.highlight_zh : role.highlight}
							</p>
							<div className="flex flex-wrap gap-1.5 mt-auto">
								{role.skills.slice(0, 3).map((skill) => (
									<span
										key={skill}
										className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary-strong"
									>
										{skill}
									</span>
								))}
							</div>
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
