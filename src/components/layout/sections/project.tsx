"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { OriginBadge } from "@/components/ui/origin-badge";
import { arrowOut, tile, tileLift } from "@/components/ui/tile";
import {
	ALL_PROJECTS as ALL,
	FEATURED_PROJECTS,
	projectAlt,
} from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import { Cascade, CascadeItem } from "@/utils/motion-div";

const FEATURED = FEATURED_PROJECTS.map((name) =>
	ALL.find((p) => p.name === name),
).filter((p) => p !== undefined);

const STUDIO_URL = "https://www.twlworks.com";

const zoom =
	"object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none";

/** Home · projects: one wide featured tile, three small ones, and the archive tile. */
const ProjectSection = () => {
	const t = useTranslations();
	const locale = useLocale();
	const [lead, ...rest] = FEATURED;
	const caption = (p: (typeof ALL)[number]) =>
		(locale === "zh" ? p.tagline_zh : p.tagline) ?? p.summary;

	return (
		<section id="projects" className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h2 className="text-2xl font-bold font-display">
					{t("home.projects")}
				</h2>
				{/* a quiet note, not a pitch: explains the amber badges without leading with the side business */}
				<p className="text-sm text-muted-foreground">
					{t.rich("home.studio_note", {
						studio: (chunks) => (
							<a
								href={STUDIO_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="font-medium underline group text-foreground decoration-border underline-offset-4 hover:decoration-primary"
							>
								{chunks}
								<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
							</a>
						),
					})}
				</p>
			</div>
			<Cascade className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3">
				<CascadeItem className="sm:col-span-2">
					<a
						href={lead.link}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							tile,
							tileLift,
							"group relative flex items-end h-full min-h-64 overflow-hidden",
						)}
					>
						<Image
							src={lead.imageUrl}
							alt={projectAlt(lead, locale)}
							fill
							sizes="(min-width: 768px) 520px, 100vw"
							className={zoom}
						/>
						<OriginBadge category={lead.category} />
						<div className="relative px-4 py-3 m-3.5 rounded-xl bg-card/95 backdrop-blur-sm">
							<p className="font-semibold">
								{lead.name}
								<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
							</p>
							<p className="text-[13px] text-muted-foreground">
								{caption(lead)}
							</p>
						</div>
					</a>
				</CascadeItem>

				{rest.map((project) => (
					<CascadeItem key={project.name}>
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								tile,
								tileLift,
								"group flex flex-col h-full overflow-hidden",
							)}
						>
							<div className="relative overflow-hidden aspect-16/10">
								<Image
									src={project.imageUrl}
									alt={projectAlt(project, locale)}
									fill
									sizes="(min-width: 768px) 260px, 100vw"
									className={zoom}
								/>
								<OriginBadge category={project.category} />
							</div>
							<div className="px-4 py-3.5">
								<p className="font-semibold">
									{project.name}
									<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
								</p>
								<p className="text-[13px] text-muted-foreground">
									{caption(project)}
								</p>
							</div>
						</a>
					</CascadeItem>
				))}

				<CascadeItem>
					<Link
						href="/projects"
						className={cn(
							tileLift,
							"group flex flex-col justify-between h-full gap-6 p-5 border-[1.5px] border-dashed rounded-2xl border-primary min-h-36",
						)}
					>
						<span className="flex justify-end">
							<span className="grid shrink-0 rounded-full size-9 place-items-center border transition-colors duration-200 motion-reduce:transition-none border-primary/50 text-primary-strong group-hover:bg-primary group-hover:text-primary-foreground">
								<ArrowRightIcon
									aria-hidden="true"
									className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
								/>
							</span>
						</span>
						<span className="text-2xl font-bold leading-tight font-display">
							{t("home.all_projects", { count: ALL.length })}
						</span>
					</Link>
				</CascadeItem>
			</Cascade>
		</section>
	);
};

export default ProjectSection;
