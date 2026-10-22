"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "../ui/button";

const REVEAL_MS = 550;

export const ToggleTheme = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	// Avoid hydration mismatch — next-themes resolves theme client-side only
	useEffect(() => setMounted(true), []);

	// resolvedTheme, not theme: with defaultTheme="system" theme is "system", never "dark"
	const isDark = mounted && resolvedTheme === "dark";

	const toggle = () => {
		const next = isDark ? "light" : "dark";
		const root = document.documentElement;

		const apply = () => {
			// Flip the class ourselves so the view-transition snapshot already has
			// the new theme; next-themes applies it in an effect, a frame too late.
			root.classList.toggle("dark", next === "dark");
			root.style.colorScheme = next;
			flushSync(() => setTheme(next));
		};

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (!document.startViewTransition || reduceMotion) {
			apply();
			return;
		}

		// Circle grows out of the toggle button until it covers the viewport.
		const rect = buttonRef.current?.getBoundingClientRect();
		const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
		const y = rect ? rect.top + rect.height / 2 : 0;
		const radius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		const transition = document.startViewTransition(apply);
		transition.ready
			.then(() => {
				root.animate(
					{
						clipPath: [
							`circle(0px at ${x}px ${y}px)`,
							`circle(${radius}px at ${x}px ${y}px)`,
						],
					},
					{
						duration: REVEAL_MS,
						easing: "cubic-bezier(0.4, 0, 0.2, 1)",
						pseudoElement: "::view-transition-new(root)",
					},
				);
			})
			.catch(() => {
				// Transition skipped (e.g. tab hidden): the theme is already applied.
			});
	};

	return (
		<Button
			ref={buttonRef}
			onClick={toggle}
			size="sm"
			variant="ghost"
			className="relative h-9 w-9 p-0 overflow-hidden text-muted-foreground hover:text-foreground"
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{/* render only once mounted, so dark users don't see a moon→sun swap on every load */}
			<AnimatePresence mode="wait" initial={false}>
				{mounted && (
					<motion.span
						key={isDark ? "sun" : "moon"}
						initial={{ rotate: -90, scale: 0, opacity: 0 }}
						animate={{ rotate: 0, scale: 1, opacity: 1 }}
						exit={{ rotate: 90, scale: 0, opacity: 0 }}
						transition={{ duration: 0.18, ease: "easeInOut" }}
						className="absolute inset-0 flex items-center justify-center"
					>
						{isDark ? <LuSun size={18} /> : <LuMoon size={18} />}
					</motion.span>
				)}
			</AnimatePresence>
		</Button>
	);
};
