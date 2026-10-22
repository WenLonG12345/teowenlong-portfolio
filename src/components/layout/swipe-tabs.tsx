"use client";

import { useEffect, useRef } from "react";
import { NAV_ITEM_LIST } from "@/constants";
import { usePathname, useRouter } from "@/i18n/routing";
import { setSwipeDirection } from "@/utils/swipe-direction";

/** Edge zone left to the OS / browser back-forward gesture. */
const EDGE_PX = 24;
/** A swipe must travel this share of the viewport width (or MIN_PX)… */
const MIN_SHARE = 0.25;
const MIN_PX = 80;
/** …be clearly sideways… */
const AXIS_RATIO = 1.5;
/** …and be a flick, not a slow drag. */
const MAX_MS = 700;

const MOBILE = "(max-width: 1023px) and (pointer: coarse)";
const IGNORE =
	"input, textarea, select, [contenteditable=''], [contenteditable='true'], [data-no-swipe]";

const TABS = NAV_ITEM_LIST.map((item) => item.href);

function tabIndex(pathname: string): number {
	// Same rule as the tab bar: "/" only on home, prefix match elsewhere,
	// so /blog/some-post counts as the Blog tab.
	return TABS.findIndex((href) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href),
	);
}

/** True when the touch starts inside something that scrolls sideways itself. */
function insideHorizontalScroller(el: Element | null): boolean {
	for (
		let node = el;
		node && node !== document.body;
		node = node.parentElement
	) {
		if (node.scrollWidth > node.clientWidth + 1) {
			const overflowX = getComputedStyle(node).overflowX;
			if (overflowX === "auto" || overflowX === "scroll") return true;
		}
	}
	return false;
}

function nudge(dir: 1 | -1) {
	// End of the row: a small bounce instead of nothing, so the swipe reads as
	// "seen, but there is no further tab".
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	document
		.querySelector("[data-swipe-surface]")
		?.animate(
			[
				{ transform: "translateX(0)" },
				{ transform: `translateX(${-dir * 14}px)` },
				{ transform: "translateX(0)" },
			],
			{ duration: 260, easing: "ease-out" },
		);
}

/**
 * Mobile only: swipe left → next tab, swipe right → previous tab, in the
 * bottom tab bar's order. Renders nothing; listens on the document.
 */
export function SwipeTabs() {
	const pathname = usePathname();
	const router = useRouter();
	const current = tabIndex(pathname);
	// The touch listeners are bound once; read the live tab through a ref.
	const currentRef = useRef(current);
	currentRef.current = current;

	// Prefetch the neighbours so the swipe lands on an already-loaded page.
	useEffect(() => {
		if (current < 0) return;
		for (const i of [current - 1, current + 1]) {
			if (TABS[i]) router.prefetch(TABS[i]);
		}
	}, [current, router]);

	useEffect(() => {
		const mobile = window.matchMedia(MOBILE);
		let start: { x: number; y: number; t: number } | null = null;

		const onStart = (e: TouchEvent) => {
			start = null;
			if (!mobile.matches || e.touches.length !== 1) return;
			const touch = e.touches[0];
			const target = e.target instanceof Element ? e.target : null;
			if (
				touch.clientX < EDGE_PX ||
				touch.clientX > window.innerWidth - EDGE_PX ||
				target?.closest(IGNORE) ||
				insideHorizontalScroller(target)
			)
				return;
			start = { x: touch.clientX, y: touch.clientY, t: e.timeStamp };
		};

		const onEnd = (e: TouchEvent) => {
			if (!start) return;
			const touch = e.changedTouches[0];
			const dx = touch.clientX - start.x;
			const dy = touch.clientY - start.y;
			const elapsed = e.timeStamp - start.t;
			start = null;

			const far =
				Math.abs(dx) >= Math.max(MIN_PX, window.innerWidth * MIN_SHARE);
			const sideways = Math.abs(dx) > Math.abs(dy) * AXIS_RATIO;
			const selecting = !!window.getSelection()?.toString();
			if (!far || !sideways || elapsed > MAX_MS || selecting) return;

			const idx = currentRef.current;
			if (idx < 0) return;
			// Finger moves left → content moves left → the next tab comes in.
			const dir: 1 | -1 = dx < 0 ? 1 : -1;
			const next = TABS[idx + dir];
			if (!next) {
				nudge(dir);
				return;
			}
			setSwipeDirection(dir);
			router.push(next);
		};

		const onCancel = () => {
			start = null;
		};

		document.addEventListener("touchstart", onStart, { passive: true });
		document.addEventListener("touchend", onEnd, { passive: true });
		document.addEventListener("touchcancel", onCancel, { passive: true });
		return () => {
			document.removeEventListener("touchstart", onStart);
			document.removeEventListener("touchend", onEnd);
			document.removeEventListener("touchcancel", onCancel);
		};
	}, [router]);

	return null;
}
