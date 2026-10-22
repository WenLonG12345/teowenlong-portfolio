"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { consumeSwipeDirection } from "@/utils/swipe-direction";

// Re-mounts on every navigation (the rail in layout.tsx does not), so page
// content gets an entrance while the rail stays put. After a mobile swipe the
// page slides in from the side it was swiped from; otherwise the usual rise.
export default function Template({ children }: { children: React.ReactNode }) {
	const [dir] = useState(consumeSwipeDirection);

	if (!dir) {
		return (
			<div className="animate-rise motion-reduce:animate-none">{children}</div>
		);
	}

	return (
		<motion.div
			initial={{ x: dir * 56, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: "spring", bounce: 0, duration: 0.32 }}
		>
			{children}
		</motion.div>
	);
}
