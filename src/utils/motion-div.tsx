"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import { useEffect, useState } from "react";

export const MotionDiv = motion.div;

export const MotionSection = ({
	children,
	animationProps,
}: {
	children: React.ReactNode;
	animationProps: HTMLMotionProps<"div">;
}) => {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	// Always render a motion.div so the DOM structure is stable across
	// server → hydration → client. Before mount, omit animation props so
	// content is fully visible (no opacity:0 flash). After mount, apply
	// the full animation props.
	const { className, ...motionProps } = animationProps;

	return (
		<motion.div className={className} {...(domLoaded ? motionProps : {})}>
			{children}
		</motion.div>
	);
};
