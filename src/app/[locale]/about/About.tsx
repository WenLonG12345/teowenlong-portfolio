"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { tile } from "@/components/ui/tile";
import { SKILL_LIST } from "@/constants";
import { cn } from "@/utils/cn";
import CareerTabs from "./tabs/CareerTabs";
import EducationTabs from "./tabs/EducationTabs";

const AboutClient = () => {
	const t = useTranslations();

	return (
		<div className="flex flex-col gap-14">
			<header className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight font-display md:text-5xl">
					{t("about.title")}
				</h1>
				<p className="max-w-[56ch] text-muted-foreground">{t("about.lede")}</p>
			</header>

			<CareerTabs />

			<section className="flex flex-col gap-4">
				<h2 className="text-2xl font-bold font-display">{t("home.stack")}</h2>
				<ul className={cn(tile, "flex flex-wrap gap-2 p-5")}>
					{SKILL_LIST.map((skill) => (
						<li
							key={skill.name}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-full bg-secondary"
						>
							<Image
								src={skill.icon}
								width={14}
								height={14}
								alt=""
								aria-hidden="true"
							/>
							{skill.name}
						</li>
					))}
				</ul>
			</section>

			<EducationTabs />
		</div>
	);
};

export default AboutClient;
