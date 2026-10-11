"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "../ui/button";

export const ToggleTheme = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch — next-themes resolves theme client-side only
	useEffect(() => setMounted(true), []);

	// resolvedTheme, not theme: with defaultTheme="system" theme is "system", never "dark"
	const isDark = mounted && resolvedTheme === "dark";

	return (
		<Button
			onClick={() => setTheme(isDark ? "light" : "dark")}
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
