"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { arrowOut, tile } from "@/components/ui/tile";
import { CAREER_LIST } from "@/constants";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

/** /about · every role as a full-width tile with its scope and stack. */
const CareerTabs = () => {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<section className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold font-display">
				{t("about.title_career")}
			</h2>
			<Cascade className="flex flex-col gap-3.5">
				{CAREER_LIST.map((career) => (
					<CascadeItem
						key={career.title}
						className={cn(tile, "flex flex-col gap-4 p-5 sm:p-6")}
					>
						<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
							<Image
								src={career.logo}
								alt=""
								width={44}
								height={44}
								className="object-cover border rounded-xl size-11 border-border"
							/>
							<div className="flex-1 min-w-48">
								<a
									href={career.url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold group hover:text-primary-strong"
								>
									{career.title}
									<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
								</a>
								<p className="text-sm text-muted-foreground">{career.role}</p>
							</div>
							<p className="font-mono text-xs text-muted-foreground">
								{career.period}
							</p>
						</div>
						<ul className="flex flex-col gap-2 pl-4 text-[15px] leading-relaxed list-disc marker:text-primary text-foreground/85">
							{(locale === "zh" ? career.job_scope_zh : career.job_scope)?.map(
								(job) => (
									<li key={job}>{job}</li>
								),
							)}
						</ul>
						<div className="flex flex-wrap gap-1.5">
							{career.skills.map((skill) => (
								<span
									key={skill}
									className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary-strong"
								>
									{skill}
								</span>
							))}
						</div>
					</CascadeItem>
				))}
			</Cascade>
		</section>
	);
};

export default CareerTabs;
