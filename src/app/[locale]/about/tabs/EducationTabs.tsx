"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { tile } from "@/components/ui/tile";
import { EDUCATION_LIST } from "@/constants";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

/** /about · education as two side-by-side tiles. */
const EducationTabs = () => {
	const t = useTranslations();

	return (
		<section className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold font-display">
				{t("about.title_education")}
			</h2>
			<Cascade className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
				{EDUCATION_LIST.map((education) => (
					<CascadeItem
						key={education.title}
						className={cn(tile, "flex flex-col gap-4 p-5")}
					>
						<div className="flex items-center gap-3">
							<Image
								src={education.logo}
								alt=""
								width={40}
								height={40}
								className="object-cover border rounded-lg size-10 border-border"
							/>
							<div className="min-w-0">
								<a
									href={education.url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-semibold hover:text-primary-strong"
								>
									{education.title}
								</a>
								<p className="font-mono text-xs text-muted-foreground">
									{education.period}
								</p>
							</div>
						</div>
						<p className="text-sm text-foreground/85">{education.role}</p>
						<div className="flex flex-wrap gap-1.5 mt-auto">
							{education.skills.map((skill) => (
								<span
									key={skill}
									className="px-2.5 py-1 text-xs rounded-full bg-secondary"
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

export default EducationTabs;
