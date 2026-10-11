"use client";

import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
/* Hallmark · component: rail (tile stack) · genre: modern-minimal · design-system: amber custom
 * replaces the Chiang-style line nav: the rail now speaks the same tile language as the bento
 * states: nav row default · hover · focus-visible · active(page) ; icon links default · hover · focus-visible
 */

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
	FaGithub,
	FaLinkedinIn,
	FaMedium,
	FaStackOverflow,
} from "react-icons/fa6";
import { arrowOut, tile } from "@/components/ui/tile";
import { NAV_ITEM_LIST, PROJECT_LIST, SITE_CONFIG } from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/utils/cn";
import ToggleLanguage from "./toggle-language";
import { ToggleTheme } from "./toogle-theme";

const ICONS: Record<string, IconType> = {
	GitHub: FaGithub,
	LinkedIn: FaLinkedinIn,
	"Stack Overflow": FaStackOverflow,
	Medium: FaMedium,
};
const PROFILES = SITE_CONFIG.footer.accounts.filter((a) => ICONS[a.name]);

// only counts we know statically; blog posts come partly from Medium at runtime
const COUNTS: Record<string, number> = {
	"/projects": Object.values(PROJECT_LIST).flat().length,
};

// CSS entrance (not motion): the rail is above the fold and must paint before hydration
const enter = (delay: number) => ({
	style: { animationDelay: `${delay}ms` },
});
const rise = "animate-rise motion-reduce:animate-none";
const focusRing =
	"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Pinned left rail as a stack of tiles: identity, status + CTAs, nav, utility bar. Unpins below lg. */
export const Navbar = () => {
	const t = useTranslations();
	const pathname = usePathname();
	const isHome = pathname === "/";
	const Name = isHome ? "h1" : "p";

	return (
		<header className="flex flex-col gap-3 pt-8 pb-8 lg:sticky lg:top-0 lg:h-dvh lg:w-80 lg:shrink-0 lg:gap-3.5 lg:overflow-y-auto lg:[scrollbar-width:none] lg:pt-20 lg:pb-10">
			{/* identity */}
			<div
				{...enter(0)}
				className={cn(rise, tile, "flex flex-col gap-4 p-5 lg:gap-5 lg:p-6")}
			>
				<div className="flex items-center gap-4 lg:flex-col lg:items-start">
					<Link
						href="/"
						aria-label="Teo Wen Long — home"
						className={cn("shrink-0 rounded-full", focusRing)}
					>
						<Image
							src="/images/profile_picture.png"
							width={64}
							height={64}
							alt=""
							priority
							className="object-cover rounded-full ring-1 ring-border size-12 bg-muted lg:size-16"
						/>
					</Link>
					<div className="min-w-0">
						{/* the name is the page heading on home; subpages own their h1 */}
						<Name className="text-xl font-bold leading-none tracking-tight font-display lg:text-[2rem]">
							<Link href="/">Teo Wen Long</Link>
						</Name>
						<p className="mt-1.5 text-sm font-medium text-primary-strong lg:mt-2 lg:text-base">
							{t("rail.role")}
						</p>
					</div>
				</div>
				<p
					className={cn(
						"text-sm text-muted-foreground",
						!isHome && "hidden lg:block",
					)}
				>
					{t("rail.tagline")}
				</p>
				{/* below lg the status tile folds into this line so the first screen isn't all chrome */}
				{isHome && (
					<p className="flex flex-wrap items-center text-sm gap-x-4 gap-y-1 lg:hidden">
						<span className="inline-flex items-center w-full gap-2 font-semibold text-primary-strong">
							<span className="rounded-full size-2 bg-primary" />
							{t("rail.status")}
						</span>
						<Link
							href={SITE_CONFIG.resume.url}
							target="_blank"
							className={cn("group py-1 font-semibold rounded", focusRing)}
						>
							{t("rail.resume")}
							<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
						</Link>
						<a
							href={`mailto:${SITE_CONFIG.contact.email}`}
							className={cn("py-1 font-semibold rounded", focusRing)}
						>
							{t("rail.email")}
						</a>
					</p>
				)}
			</div>

			{/* status + the two actions a recruiter wants. Amber is the signal (wash, border, dot, text), not the
			    surface: a full amber slab reads brown on the light paper. Résumé is ink so it stays crisp in both themes. */}
			<div
				{...enter(70)}
				className={cn(
					rise,
					"hidden flex-col gap-4 p-5 border rounded-2xl border-primary/30 bg-primary/8 lg:flex",
				)}
			>
				<p className="flex items-center gap-2.5 text-sm font-semibold text-primary-strong">
					<span className="relative flex size-2">
						<span className="absolute inset-0 rounded-full bg-primary/50 animate-ping repeat-[3] motion-reduce:hidden" />
						<span className="relative rounded-full size-2 bg-primary" />
					</span>
					{t("rail.status")}
				</p>
				<div className="grid grid-cols-2 gap-2">
					<Link
						href={SITE_CONFIG.resume.url}
						target="_blank"
						className={cn(
							"group inline-flex items-center justify-center min-h-11 text-sm font-semibold transition-transform duration-200 rounded-xl bg-foreground text-background hover:-translate-y-0.5 active:translate-y-0 motion-reduce:hover:translate-y-0",
							"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
						)}
					>
						{t("rail.resume")}
						<ArrowUpRightIcon aria-hidden="true" className={arrowOut} />
					</Link>
					<a
						href={`mailto:${SITE_CONFIG.contact.email}`}
						className="inline-flex items-center justify-center text-sm font-semibold transition-colors duration-200 border rounded-xl min-h-11 bg-card border-border hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
					>
						{t("rail.email")}
					</a>
				</div>
			</div>

			{/* nav: the active pill slides between rows (layoutId) since the rail persists across routes.
			    Below lg it's a fixed bottom tab bar (sticky can't escape this <header>'s box). */}
			<nav
				{...enter(140)}
				aria-label={t("rail.nav")}
				className={cn(
					rise,
					tile,
					"p-1.5 max-lg:fixed max-lg:inset-x-3 max-lg:bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-lg:z-40 max-lg:bg-card/90 max-lg:shadow-lg max-lg:backdrop-blur-md",
				)}
			>
				<ul className="grid grid-cols-5 gap-0.5 list-none lg:flex lg:flex-col">
					{NAV_ITEM_LIST.map(({ href, label }) => {
						const active = href === "/" ? isHome : pathname.startsWith(href);
						const count = COUNTS[href];
						return (
							<li key={href} className="relative">
								{active && (
									<motion.span
										layoutId="rail-active"
										aria-hidden="true"
										className="absolute inset-0 rounded-xl bg-muted"
										transition={{ type: "spring", bounce: 0, duration: 0.4 }}
									/>
								)}
								<Link
									href={href}
									aria-current={active ? "page" : undefined}
									className={cn(
										"group relative flex items-center justify-center gap-3 px-1 text-xs font-medium whitespace-nowrap transition-colors duration-200 rounded-xl min-h-10 min-[400px]:text-sm lg:justify-start lg:px-3.5",
										focusRing,
										active
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
									)}
								>
									<span
										aria-hidden="true"
										className={cn(
											"hidden w-1 h-4 rounded-full transition-colors lg:block",
											active ? "bg-primary" : "bg-transparent",
										)}
									/>
									{t(label)}
									{/* count and arrow share one right-aligned slot; the arrow takes over on hover / active */}
									<span className="hidden ml-auto lg:grid justify-items-end *:[grid-area:1/1]">
										{count !== undefined && (
											<span
												className={cn(
													"font-mono text-xs tabular-nums text-muted-foreground transition-opacity duration-200",
													active ? "opacity-0" : "group-hover:opacity-0",
												)}
											>
												{count}
											</span>
										)}
										<span
											aria-hidden="true"
											className={cn(
												"transition-[opacity,transform] duration-200 motion-reduce:transition-none",
												active
													? "opacity-100 text-primary-strong"
													: "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
											)}
										>
											<ArrowRightIcon className="size-4" />
										</span>
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* utility bar: every control is the same 36px square, so the row lines up */}
			<div
				{...enter(210)}
				className={cn(rise, "flex items-center gap-1 lg:mt-auto")}
			>
				{PROFILES.map((p) => {
					const Icon = ICONS[p.name];
					return (
						<a
							key={p.url}
							href={p.url}
							target="_blank"
							rel="me noopener noreferrer"
							aria-label={p.name}
							title={p.name}
							className={cn(
								"inline-flex items-center justify-center transition-colors duration-200 rounded-lg size-9 text-muted-foreground hover:bg-muted hover:text-foreground",
								focusRing,
							)}
						>
							<Icon size={17} aria-hidden="true" />
						</a>
					);
				})}
				<span
					aria-hidden="true"
					className="w-px h-5 mx-1.5 ml-auto bg-border"
				/>
				<ToggleTheme />
				<ToggleLanguage />
			</div>
		</header>
	);
};
