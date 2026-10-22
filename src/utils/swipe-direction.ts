// Hand-off between SwipeTabs (sets it right before navigating) and the
// page template (reads it once on mount to pick the slide-in side).
// Module state is enough: both run in the same client bundle, and the
// value is consumed by the very next page mount.

/** 1 = next tab (enter from the right), -1 = previous (enter from the left). */
export type SwipeDirection = 1 | -1;

let pending: SwipeDirection | 0 = 0;

export function setSwipeDirection(dir: SwipeDirection) {
	pending = dir;
}

export function consumeSwipeDirection(): SwipeDirection | 0 {
	const dir = pending;
	pending = 0;
	return dir;
}
