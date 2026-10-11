"use client";

import {
	type HTMLMotionProps,
	MotionConfig,
	motion,
	useScroll,
	useSpring,
	type Variants,
} from "motion/react";
import { useEffect, useState } from "react";

export const MotionDiv = motion.div;

/** Honour the OS reduced-motion setting for every motion component below it. */
export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
	<MotionConfig reducedMotion="user">{children}</MotionConfig>
);

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

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const groupVariants: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

/** Bento section: <CascadeItem> children fade up one after another when the group scrolls into view. */
export const Cascade = ({
	className,
	children,
	...props
}: HTMLMotionProps<"div">) => (
	<motion.div
		className={className}
		variants={groupVariants}
		initial="hidden"
		whileInView="show"
		viewport={{ once: true, margin: "-60px" }}
		{...props}
	>
		{children}
	</motion.div>
);

// ponytail: the item is only the entrance wrapper; hover lift lives on the inner tile so the two transforms never fight
export const CascadeItem = ({
	className,
	children,
	...props
}: HTMLMotionProps<"div">) => (
	<motion.div className={className} variants={itemVariants} {...props}>
		{children}
	</motion.div>
);

/** Thin amber bar along the top edge tracking how far the article has been read. */
export const ReadingProgress = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

	return (
		<motion.div
			aria-hidden="true"
			style={{ scaleX }}
			className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
		/>
	);
};
