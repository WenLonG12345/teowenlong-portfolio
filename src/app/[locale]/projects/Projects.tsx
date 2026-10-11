"use client";

import { ArrowUpRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { OriginBadge } from "@/components/ui/origin-badge";
import { arrowOut, tile, tileLift } from "@/components/ui/tile";
import { ALL_PROJECTS as ALL, type PROJECT_LIST } from "@/constants";
import { cn } from "@/utils/cn";

type Category = keyof typeof PROJECT_LIST | "all";

const CATEGORIES = ["project.freelance", "project.works", "project.opensource"];

const ProjectsClient = () => {
	const t = useTranslations();
	const locale = useLocale();
	const [filter, setFilter] = useState<Category>("all");
	const shown =
		filter === "all" ? ALL : ALL.filter((p) => p.category === filter);

	return (
		<div className="flex flex-col gap-8">
			<header className="flex flex-col gap-3">
				<h1 className="text-4xl font-bold tracking-tight font-display md:text-5xl">
					{t("project.title")}
				</h1>
				<p className="max-w-[56ch] text-muted-foreground">
					{t("project.lede")}
				</p>
			</header>

			<fieldset className="flex flex-wrap gap-2">
				<legend className="sr-only">{t("project.filter")}</legend>
				{["all", ...CATEGORIES].map((c) => {
					const active = filter === c;
					const count =
						c === "all"
							? ALL.length
							: ALL.filter((p) => p.category === c).length;
					return (
						<button
							key={c}
							type="button"
							aria-pressed={active}
							onClick={() => setFilter(c)}
							className={cn(
								"relative inline-flex items-center gap-2 px-4 text-sm font-medium rounded-full min-h-10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
								active
									? "text-primary-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							{/* one pill glides between filters */}
							{active && (
								<motion.span
									layoutId="filter-pill"
									transition={{ type: "spring", bounce: 0, duration: 0.4 }}
									className="absolute inset-0 rounded-full bg-primary"
								/>
							)}
							<span className="relative">
								{c === "all" ? t("project.all") : t(c)}
							</span>
							<span className="relative font-mono text-xs opacity-70">
								{count}
							</span>
						</button>
					);
				})}
			</fieldset>

			<motion.ul layout className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
				<AnimatePresence mode="popLayout" initial={false}>
					{shown.map((project) => {
						const body = (
							<>
								<div className="relative overflow-hidden aspect-16/10 bg-muted">
									<Image
										src={project.imageUrl}
										alt={project.alt}
										fill
										sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
										className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
									/>
									<OriginBadge category={project.category} />
									{!project.link && (
										<span className="absolute top-3 right-3 px-2.5 py-1 text-xs rounded-full bg-card/90 text-muted-foreground">
											{t("project.private")}
										</span>
									)}
								</div>
								<div className="flex flex-col flex-1 gap-3 p-4">
									<p className="font-semibold">
										{project.name}
										{project.link && (
											<ArrowUpRightIcon
												aria-hidden="true"
												className={arrowOut}
											/>
										)}
									</p>
									<p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
										{locale === "zh"
											? (project.summary_zh ?? project.summary)
											: project.summary}
									</p>
									<div className="flex flex-wrap gap-1.5 mt-auto">
										{project.tech.slice(0, 4).map((tech) => (
											<span
												key={tech}
												className="px-2.5 py-1 text-xs rounded-full bg-secondary"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</>
						);
						return (
							<motion.li
								key={project.name}
								layout
								initial={{ opacity: 0, scale: 0.96 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.96 }}
								transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							>
								{project.link ? (
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
										{body}
									</a>
								) : (
									<div
										className={cn(tile, "flex flex-col h-full overflow-hidden")}
									>
										{body}
									</div>
								)}
							</motion.li>
						);
					})}
				</AnimatePresence>
			</motion.ul>
		</div>
	);
};

export default ProjectsClient;
